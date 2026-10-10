import "server-only"

type MongoConfig = {
  uri: string
  database: string
  collection: string
}

type EmailConfig = {
  apiKey: string
  from: string
  salesRecipients: string[]
  customerReplyTo: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim()

  if (!value) {
    throw new Error(`Missing required server configuration: ${name}`)
  }

  return value
}

function extractAddress(value: string): string {
  const bracketedAddress = value.match(/<([^<>]+)>/)?.[1]?.trim()
  return bracketedAddress ?? value.trim()
}

export function getMongoConfig(): MongoConfig {
  const database = requiredEnv("MONGODB_DB")
  const collection = requiredEnv("MONGODB_COLLECTION")

  if (!/^[^/\\.$"\s][^/\\$"\s]{0,62}$/.test(database)) {
    throw new Error("MONGODB_DB is not a valid database name")
  }

  if (collection.length > 120 || collection.includes("$") || collection.includes("\0")) {
    throw new Error("MONGODB_COLLECTION is not a valid collection name")
  }

  return {
    uri: requiredEnv("MONGODB_URI"),
    database,
    collection,
  }
}

export function getEmailConfig(): EmailConfig {
  const salesRecipients = requiredEnv("SALES_NOTIFICATION_EMAIL")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean)

  if (
    salesRecipients.length === 0 ||
    salesRecipients.some((address) => !EMAIL_PATTERN.test(extractAddress(address)))
  ) {
    throw new Error("SALES_NOTIFICATION_EMAIL must contain valid email addresses")
  }

  return {
    apiKey: requiredEnv("RESEND_API_KEY"),
    from: requiredEnv("RESEND_FROM"),
    salesRecipients,
    customerReplyTo: salesRecipients[0],
  }
}

export function getOnboardingUrl(): string {
  const configuredUrl = requiredEnv("ONBOARDING_URL")
  let onboardingUrl: URL

  try {
    onboardingUrl = new URL(configuredUrl)
  } catch {
    throw new Error("ONBOARDING_URL must be an absolute URL")
  }

  const localDevelopmentUrl =
    process.env.NODE_ENV !== "production" &&
    (onboardingUrl.hostname === "localhost" || onboardingUrl.hostname === "127.0.0.1")

  if (onboardingUrl.protocol !== "https:" && !localDevelopmentUrl) {
    throw new Error("ONBOARDING_URL must use HTTPS")
  }

  return onboardingUrl.toString()
}
