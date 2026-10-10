import "server-only"

import { createHmac } from "node:crypto"
import { isIP } from "node:net"
import { MongoServerError } from "mongodb"

import { getMongoConfig } from "@/lib/server/inquiry-config"
import { getInquiryRateLimitCollection } from "@/lib/server/mongodb"

const WINDOW_MS = 15 * 60 * 1000
const COUNTER_RETENTION_MS = WINDOW_MS * 2
const LIMITS = {
  email: 5,
  ip: 25,
  global: 500,
} as const

type CounterScope = keyof typeof LIMITS

type RateLimitCounter = {
  _id: string
  scope: CounterScope
  count: number
  windowStartedAt: Date
  expiresAt: Date
}

export type InquiryRateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number }

let rateLimitIndexPromise: Promise<string> | undefined

function privateIdentifier(scope: "email" | "ip", value: string): string {
  const { uri } = getMongoConfig()
  return createHmac("sha256", uri).update(`${scope}:${value}`).digest("hex")
}

function isDuplicateKeyError(error: unknown): boolean {
  return error instanceof MongoServerError && error.code === 11000
}

async function ensureRateLimitIndex(): Promise<void> {
  const collection = await getInquiryRateLimitCollection<RateLimitCounter>()

  if (!rateLimitIndexPromise) {
    const initialization = collection.createIndex(
      { expiresAt: 1 },
      { expireAfterSeconds: 0, name: "expire_inquiry_rate_limit_counters" },
    )
    rateLimitIndexPromise = initialization

    void initialization.catch(() => {
      if (rateLimitIndexPromise === initialization) {
        rateLimitIndexPromise = undefined
      }
    })
  }

  await rateLimitIndexPromise
}

function counterId(
  scope: CounterScope,
  identifier: string,
  windowStartedAt: Date,
): string {
  return `${scope}:${windowStartedAt.getTime()}:${identifier}`
}

async function getCounterCount(
  scope: CounterScope,
  identifier: string,
  windowStartedAt: Date,
): Promise<number> {
  const collection = await getInquiryRateLimitCollection<RateLimitCounter>()
  const counter = await collection.findOne(
    { _id: counterId(scope, identifier, windowStartedAt) },
    { projection: { count: 1 } },
  )

  return counter?.count ?? 0
}

async function consumeCounter(
  scope: CounterScope,
  identifier: string,
  limit: number,
  windowStartedAt: Date,
  expiresAt: Date,
): Promise<boolean> {
  const collection = await getInquiryRateLimitCollection<RateLimitCounter>()
  const id = counterId(scope, identifier, windowStartedAt)

  const update = {
    $inc: { count: 1 },
    $setOnInsert: {
      scope,
      windowStartedAt,
      expiresAt,
    },
  }

  try {
    const counter = await collection.findOneAndUpdate(
      { _id: id, count: { $lt: limit } },
      update,
      { upsert: true, returnDocument: "after" },
    )

    return Boolean(counter)
  } catch (error) {
    if (!isDuplicateKeyError(error)) {
      throw error
    }

    const counter = await collection.findOneAndUpdate(
      { _id: id, count: { $lt: limit } },
      { $inc: { count: 1 } },
      { returnDocument: "after" },
    )

    return Boolean(counter)
  }
}

export function getTrustedClientIp(request: Request): string | null {
  if (process.env.VERCEL !== "1") {
    return null
  }

  const forwardedFor = request.headers.get("x-vercel-forwarded-for")
  const clientIp = forwardedFor?.split(",", 1)[0]?.trim()

  return clientIp && isIP(clientIp) ? clientIp.toLowerCase() : null
}

export async function consumeInquiryRateLimit(
  normalizedEmail: string,
  trustedClientIp: string | null,
  now = new Date(),
): Promise<InquiryRateLimitResult> {
  await ensureRateLimitIndex()

  const windowStartMs = Math.floor(now.getTime() / WINDOW_MS) * WINDOW_MS
  const windowEndMs = windowStartMs + WINDOW_MS
  const windowStartedAt = new Date(windowStartMs)
  const expiresAt = new Date(windowEndMs + COUNTER_RETENTION_MS)
  const retryAfterSeconds = Math.max(1, Math.ceil((windowEndMs - now.getTime()) / 1_000))
  const globalCount = await getCounterCount("global", "all", windowStartedAt)

  if (globalCount >= LIMITS.global) {
    return { allowed: false, retryAfterSeconds }
  }

  const emailIdentifier = privateIdentifier("email", normalizedEmail)
  const ipIdentifier = trustedClientIp
    ? privateIdentifier("ip", trustedClientIp)
    : null
  const [emailCount, ipCount] = await Promise.all([
    getCounterCount("email", emailIdentifier, windowStartedAt),
    ipIdentifier
      ? getCounterCount("ip", ipIdentifier, windowStartedAt)
      : Promise.resolve(0),
  ])

  if (emailCount >= LIMITS.email || ipCount >= LIMITS.ip) {
    return { allowed: false, retryAfterSeconds }
  }

  if (ipIdentifier) {
    const ipAllowed = await consumeCounter(
      "ip",
      ipIdentifier,
      LIMITS.ip,
      windowStartedAt,
      expiresAt,
    )

    if (!ipAllowed) {
      return { allowed: false, retryAfterSeconds }
    }
  }

  const emailAllowed = await consumeCounter(
    "email",
    emailIdentifier,
    LIMITS.email,
    windowStartedAt,
    expiresAt,
  )

  if (!emailAllowed) {
    return { allowed: false, retryAfterSeconds }
  }

  const globalAllowed = await consumeCounter(
    "global",
    "all",
    LIMITS.global,
    windowStartedAt,
    expiresAt,
  )

  return globalAllowed ? { allowed: true } : { allowed: false, retryAfterSeconds }
}
