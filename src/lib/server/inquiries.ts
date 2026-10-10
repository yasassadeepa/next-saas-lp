import "server-only"

import { createHash } from "node:crypto"
import { MongoServerError, ObjectId } from "mongodb"

import { getInquiryCollection } from "@/lib/server/mongodb"

export const MAX_INQUIRY_BODY_BYTES = 16 * 1024

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const COUNTRY_CODE_PATTERN = /^\+[1-9]\d{0,3}$/
const IDEMPOTENCY_KEY_PATTERN = /^[A-Za-z0-9._:-]{8,128}$/
const AUTO_DEDUPLICATION_WINDOW_MS = 10 * 60 * 1000

export const INQUIRY_CONSENT_VERSION = "homepage-contact-sms-v1"
export const INQUIRY_CONSENT_SNAPSHOT = {
  checkboxText:
    "I agree to receive SMS communications and notifications from Closer Intellect AI.",
  disclosureText:
    "By submitting this form, you agree to our Privacy Policy and Terms and Conditions. You can reply STOP to unsubscribe from SMS at any time.",
} as const

export type EmailDeliveryState = {
  status: "pending" | "sent" | "failed"
  attemptedAt?: Date
  providerId?: string
  error?: string
}

export type InquiryInput = {
  fullName: string
  email: string
  company?: string
  phoneCountryCode: string
  phoneNumber: string
  message?: string
  consent: true
  source: "homepage-contact"
}

export type InquiryDocument = InquiryInput & {
  _id: ObjectId
  status: "new"
  createdAt: Date
  updatedAt: Date
  consentAcceptedAt: Date
  consentVersion: typeof INQUIRY_CONSENT_VERSION
  consentTextSnapshot: {
    checkboxText: string
    disclosureText: string
  }
  idempotencyKey: string
  requestFingerprint: string
  deliveryRetryKey?: string
  emails: {
    salesNotification: EmailDeliveryState
    customerConfirmation: EmailDeliveryState
  }
}

export type EmailDeliveryResults = {
  salesNotification: EmailDeliveryState
  customerConfirmation: EmailDeliveryState
}

type ParsedInquiry =
  | { valid: true; value: InquiryInput; honeypotTriggered: boolean }
  | { valid: false; error: string }

let indexPromise: Promise<unknown> | undefined

function normalizeText(value: string, collapseWhitespace = true): string {
  const withoutControlCharacters = value
    .normalize("NFKC")
    .replace(collapseWhitespace ? /[\u0000-\u001F\u007F]/g : /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, " ")
    .trim()

  return collapseWhitespace
    ? withoutControlCharacters.replace(/\s+/g, " ")
    : withoutControlCharacters.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n")
}

function optionalString(
  value: unknown,
  fieldName: string,
  maxLength: number,
  collapseWhitespace = true,
): { value?: string; error?: string } {
  if (value === undefined || value === null || value === "") {
    return {}
  }

  if (typeof value !== "string") {
    return { error: `${fieldName} must be text.` }
  }

  const normalized = normalizeText(value, collapseWhitespace)

  if (normalized.length > maxLength) {
    return { error: `${fieldName} is too long.` }
  }

  return normalized ? { value: normalized } : {}
}

function requiredString(
  value: unknown,
  fieldName: string,
  minLength: number,
  maxLength: number,
): { value?: string; error?: string } {
  if (typeof value !== "string") {
    return { error: `${fieldName} is required.` }
  }

  const normalized = normalizeText(value)

  if (normalized.length < minLength) {
    return { error: `${fieldName} is required.` }
  }

  if (normalized.length > maxLength) {
    return { error: `${fieldName} is too long.` }
  }

  return { value: normalized }
}

export function parseInquiryPayload(payload: unknown): ParsedInquiry {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { valid: false, error: "Invalid inquiry details." }
  }

  const values = payload as Record<string, unknown>
  const website = optionalString(values.website, "Website", 200)

  if (website.error) {
    return { valid: false, error: "Invalid inquiry details." }
  }

  if (website.value) {
    return {
      valid: true,
      honeypotTriggered: true,
      value: {
        fullName: "",
        email: "",
        phoneCountryCode: "+1",
        phoneNumber: "",
        consent: true,
        source: "homepage-contact",
      },
    }
  }

  const fullName = requiredString(values.fullName, "Full name", 2, 100)
  const email = requiredString(values.email, "Email", 3, 254)
  const company = optionalString(values.company, "Company", 120)
  const phoneCountryCode = requiredString(values.phoneCountryCode, "Country code", 2, 5)
  const phoneNumber = requiredString(values.phoneNumber, "Phone number", 7, 30)
  const message = optionalString(values.message, "Message", 2_000, false)

  const firstError = [fullName, email, company, phoneCountryCode, phoneNumber, message].find(
    (field) => field.error,
  )?.error

  if (firstError) {
    return { valid: false, error: firstError }
  }

  const normalizedEmail = email.value!.toLowerCase()
  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    return { valid: false, error: "Enter a valid work email address." }
  }

  if (!COUNTRY_CODE_PATTERN.test(phoneCountryCode.value!)) {
    return { valid: false, error: "Enter a valid phone country code." }
  }

  const phoneDigits = phoneNumber.value!.replace(/\D/g, "")
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    return { valid: false, error: "Enter a valid phone number." }
  }

  if (values.consent !== true) {
    return { valid: false, error: "Consent is required to submit this inquiry." }
  }

  if (values.source !== "homepage-contact") {
    return { valid: false, error: "Invalid inquiry source." }
  }

  return {
    valid: true,
    honeypotTriggered: false,
    value: {
      fullName: fullName.value!,
      email: normalizedEmail,
      ...(company.value ? { company: company.value } : {}),
      phoneCountryCode: phoneCountryCode.value!,
      phoneNumber: phoneNumber.value!,
      ...(message.value ? { message: message.value } : {}),
      consent: true,
      source: "homepage-contact",
    },
  }
}

function hash(value: string): string {
  return createHash("sha256").update(value).digest("hex")
}

function fingerprint(input: InquiryInput): string {
  return hash(
    JSON.stringify([
      input.fullName,
      input.email,
      input.company ?? "",
      input.phoneCountryCode,
      input.phoneNumber,
      input.message ?? "",
      input.source,
      INQUIRY_CONSENT_VERSION,
    ]),
  )
}

export function buildIdempotency(
  input: InquiryInput,
  suppliedKey: string | null,
  now = Date.now(),
): { idempotencyKey: string; requestFingerprint: string } | { error: string } {
  const requestFingerprint = fingerprint(input)

  if (suppliedKey) {
    const normalizedKey = suppliedKey.trim()
    if (!IDEMPOTENCY_KEY_PATTERN.test(normalizedKey)) {
      return { error: "Invalid submission key." }
    }

    return {
      idempotencyKey: `client:${hash(normalizedKey)}`,
      requestFingerprint,
    }
  }

  const timeBucket = Math.floor(now / AUTO_DEDUPLICATION_WINDOW_MS)
  return {
    idempotencyKey: `auto:${timeBucket}:${requestFingerprint}`,
    requestFingerprint,
  }
}

async function ensureIndexes(): Promise<void> {
  const collection = await getInquiryCollection<InquiryDocument>()

  if (!indexPromise) {
    const initialization = Promise.all([
      collection.createIndex(
        { idempotencyKey: 1 },
        { unique: true, name: "unique_inquiry_idempotency_key" },
      ),
      collection.createIndex(
        { deliveryRetryKey: 1 },
        {
          unique: true,
          sparse: true,
          name: "unique_incomplete_inquiry_fingerprint",
        },
      ),
      collection.createIndex({ email: 1, createdAt: -1 }, { name: "inquiry_email_created_at" }),
    ])

    indexPromise = initialization
    void initialization.catch(() => {
      if (indexPromise === initialization) {
        indexPromise = undefined
      }
    })
  }

  await indexPromise
}

function isDuplicateKeyError(error: unknown): boolean {
  return error instanceof MongoServerError && error.code === 11000
}

export async function saveInquiry(
  input: InquiryInput,
  idempotencyKey: string,
  requestFingerprint: string,
): Promise<{ inquiry: InquiryDocument; created: boolean }> {
  await ensureIndexes()
  const collection = await getInquiryCollection<InquiryDocument>()

  const existingByIdempotency = await collection.findOne({ idempotencyKey })
  if (existingByIdempotency) {
    if (existingByIdempotency.requestFingerprint !== requestFingerprint) {
      throw new InquiryConflictError()
    }

    return { inquiry: existingByIdempotency, created: false }
  }

  const existingIncomplete = await collection.findOne(
    {
      requestFingerprint,
      $or: [
        { "emails.salesNotification.status": { $ne: "sent" } },
        { "emails.customerConfirmation.status": { $ne: "sent" } },
      ],
    },
    { sort: { createdAt: -1 } },
  )

  if (existingIncomplete) {
    return { inquiry: existingIncomplete, created: false }
  }

  const now = new Date()
  const inquiry: InquiryDocument = {
    _id: new ObjectId(),
    ...input,
    status: "new",
    createdAt: now,
    updatedAt: now,
    consentAcceptedAt: now,
    consentVersion: INQUIRY_CONSENT_VERSION,
    consentTextSnapshot: { ...INQUIRY_CONSENT_SNAPSHOT },
    idempotencyKey,
    requestFingerprint,
    deliveryRetryKey: requestFingerprint,
    emails: {
      salesNotification: { status: "pending" },
      customerConfirmation: { status: "pending" },
    },
  }

  try {
    await collection.insertOne(inquiry)
    return { inquiry, created: true }
  } catch (error) {
    if (!isDuplicateKeyError(error)) {
      throw error
    }

    const existingByKey = await collection.findOne({ idempotencyKey })
    if (existingByKey && existingByKey.requestFingerprint !== requestFingerprint) {
      throw new InquiryConflictError()
    }

    const retryableInquiry =
      existingByKey ??
      (await collection.findOne({ deliveryRetryKey: requestFingerprint })) ??
      (await collection.findOne(
        { requestFingerprint },
        { sort: { createdAt: -1 } },
      ))

    if (!retryableInquiry) {
      throw error
    }

    return { inquiry: retryableInquiry, created: false }
  }
}

export async function recordEmailResults(
  inquiryId: ObjectId,
  results: EmailDeliveryResults,
): Promise<InquiryDocument> {
  const collection = await getInquiryCollection<InquiryDocument>()
  const inquiry = await collection.findOneAndUpdate(
    { _id: inquiryId },
    [
      {
        $set: {
          "emails.salesNotification": {
            $cond: [
              { $eq: ["$emails.salesNotification.status", "sent"] },
              "$emails.salesNotification",
              { $literal: results.salesNotification },
            ],
          },
          "emails.customerConfirmation": {
            $cond: [
              { $eq: ["$emails.customerConfirmation.status", "sent"] },
              "$emails.customerConfirmation",
              { $literal: results.customerConfirmation },
            ],
          },
          updatedAt: "$$NOW",
        },
      },
      {
        $set: {
          deliveryRetryKey: {
            $cond: [
              {
                $and: [
                  { $eq: ["$emails.salesNotification.status", "sent"] },
                  { $eq: ["$emails.customerConfirmation.status", "sent"] },
                ],
              },
              "$$REMOVE",
              "$deliveryRetryKey",
            ],
          },
        },
      },
    ],
    { returnDocument: "after" },
  )

  if (!inquiry) {
    throw new Error("Unable to record inquiry email results")
  }

  return inquiry
}

export function requiredEmailsAccepted(inquiry: InquiryDocument): boolean {
  return (
    inquiry.emails.salesNotification.status === "sent" &&
    inquiry.emails.customerConfirmation.status === "sent"
  )
}

export class InquiryConflictError extends Error {
  constructor() {
    super("The submission key has already been used for different inquiry details")
    this.name = "InquiryConflictError"
  }
}
