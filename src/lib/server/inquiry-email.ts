import "server-only"

import { Resend } from "resend"

import { getEmailConfig, getOnboardingUrl } from "@/lib/server/inquiry-config"
import type { EmailDeliveryResults, InquiryDocument } from "@/lib/server/inquiries"

type DeliveryResult = EmailDeliveryResults["salesNotification"]

function safeErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message.slice(0, 300)
  }

  return "The email provider rejected the message"
}

async function sendEmail(
  resend: Resend,
  payload: Parameters<Resend["emails"]["send"]>[0],
  idempotencyKey: string,
): Promise<DeliveryResult> {
  const attemptedAt = new Date()

  try {
    const response = await resend.emails.send(payload, { idempotencyKey })

    if (response.error || !response.data?.id) {
      return {
        status: "failed",
        attemptedAt,
        error: safeErrorMessage(response.error),
      }
    }

    return {
      status: "sent",
      attemptedAt,
      providerId: response.data.id,
    }
  } catch (error) {
    return {
      status: "failed",
      attemptedAt,
      error: safeErrorMessage(error),
    }
  }
}

export async function sendInquiryEmails(
  inquiry: InquiryDocument,
): Promise<EmailDeliveryResults> {
  const { apiKey, from, salesRecipients, customerReplyTo } = getEmailConfig()
  const onboardingUrl = getOnboardingUrl()
  const resend = new Resend(apiKey)
  const inquiryId = inquiry._id.toHexString()
  const phone = `${inquiry.phoneCountryCode} ${inquiry.phoneNumber}`
  const submittedAt = inquiry.createdAt.toISOString()

  const salesText = [
    "A new website inquiry was submitted.",
    "",
    `Inquiry ID: ${inquiryId}`,
    `Name: ${inquiry.fullName}`,
    `Email: ${inquiry.email}`,
    `Phone: ${phone}`,
    `Company: ${inquiry.company ?? "Not provided"}`,
    `Message: ${inquiry.message ?? "Not provided"}`,
    `Consent: ${inquiry.consent ? "Yes" : "No"}`,
    `Consent accepted: ${inquiry.consentAcceptedAt.toISOString()}`,
    `Consent version: ${inquiry.consentVersion}`,
    `Source: ${inquiry.source}`,
    `Submitted: ${submittedAt}`,
  ].join("\n")

  const customerText = [
    `Hi ${inquiry.fullName},`,
    "",
    "Thanks for contacting Closer Intellect AI. Our team has received your inquiry and will follow up with you shortly.",
    "",
    `Continue to account setup: ${onboardingUrl}`,
    "",
    "Closer Intellect AI",
  ].join("\n")

  const salesNotificationPromise =
    inquiry.emails.salesNotification.status === "sent"
      ? Promise.resolve(inquiry.emails.salesNotification)
      : sendEmail(
          resend,
          {
            from,
            to: salesRecipients,
            replyTo: inquiry.email,
            subject: `New website inquiry from ${inquiry.fullName}`,
            text: salesText,
          },
          `inquiry-${inquiryId}-sales-notification-v1`,
        )

  const customerConfirmationPromise =
    inquiry.emails.customerConfirmation.status === "sent"
      ? Promise.resolve(inquiry.emails.customerConfirmation)
      : sendEmail(
          resend,
          {
            from,
            to: inquiry.email,
            replyTo: customerReplyTo,
            subject: "We received your Closer Intellect AI inquiry",
            text: customerText,
          },
          `inquiry-${inquiryId}-customer-confirmation-v1`,
        )

  const [salesNotification, customerConfirmation] = await Promise.all([
    salesNotificationPromise,
    customerConfirmationPromise,
  ])

  return { salesNotification, customerConfirmation }
}
