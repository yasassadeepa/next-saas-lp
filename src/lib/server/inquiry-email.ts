import "server-only"

import { Resend } from "resend"

import { getEmailConfig, getOnboardingUrl } from "@/lib/server/inquiry-config"
import type { EmailDeliveryResults, InquiryDocument } from "@/lib/server/inquiries"

type DeliveryResult = EmailDeliveryResults["salesNotification"]

const WEBSITE_URL = "https://closerintellect.ai"
const EMAIL_LOGO_URL = `${WEBSITE_URL}/email-logo.png`

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => HTML_ESCAPES[character])
}

function safeErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message.slice(0, 300)
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message.slice(0, 300)
  }

  return "The email provider rejected the message"
}

function buildCustomerEmailHtml(
  fullName: string,
  inquiryId: string,
  onboardingUrl: string,
): string {
  const firstName = fullName.split(/\s+/, 1)[0] || fullName
  const safeFirstName = escapeHtml(firstName)
  const safeInquiryId = escapeHtml(inquiryId)
  const safeOnboardingUrl = escapeHtml(onboardingUrl)
  const year = new Date().getUTCFullYear()

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title>We received your inquiry</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f4f5;color:#18181b;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      Your Closer Intellect AI inquiry is in. Here is what happens next.
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background-color:#f4f4f5;">
      <tr>
        <td align="center" style="padding:32px 12px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border:1px solid #e4e4e7;border-radius:18px;overflow:hidden;">
            <tr>
              <td style="height:5px;line-height:5px;font-size:0;background-color:#dc2626;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:28px 32px 26px;background-color:#0a0a0a;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td width="78" valign="middle" style="width:78px;padding-right:14px;">
                      <a href="${WEBSITE_URL}" style="text-decoration:none;">
                        <img src="${EMAIL_LOGO_URL}" width="68" height="69" alt="Closer Intellect AI" style="display:block;width:68px;height:69px;border:0;outline:none;text-decoration:none;">
                      </a>
                    </td>
                    <td valign="middle">
                      <div style="font-size:20px;line-height:26px;font-weight:700;color:#ffffff;letter-spacing:-0.2px;">Closer Intellect AI</div>
                      <div style="margin-top:3px;font-size:13px;line-height:19px;color:#a1a1aa;">Intelligence for modern sales teams</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:34px 32px 16px;background-color:#ffffff;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="padding:6px 10px;border:1px solid #fecaca;border-radius:999px;background-color:#fef2f2;color:#b91c1c;font-size:11px;line-height:14px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;">Inquiry received</td>
                  </tr>
                </table>
                <h1 style="margin:22px 0 12px;font-size:30px;line-height:38px;font-weight:700;letter-spacing:-0.6px;color:#18181b;">Thanks, ${safeFirstName}. We&#39;ve got it.</h1>
                <p style="margin:0;font-size:16px;line-height:25px;color:#52525b;">Your inquiry has reached our team. We&#39;ll review what you shared and follow up with the most useful next step for your sales team.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px;background-color:#ffffff;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border:1px solid #e4e4e7;border-radius:14px;background-color:#fafafa;">
                  <tr>
                    <td style="padding:22px 22px 8px;font-size:16px;line-height:22px;font-weight:700;color:#18181b;">What happens next</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 22px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td width="30" valign="top" style="width:30px;padding-top:1px;color:#dc2626;font-size:14px;line-height:22px;font-weight:700;">01</td>
                          <td style="padding-bottom:12px;font-size:14px;line-height:22px;color:#52525b;">Our team reviews your goals and contact details.</td>
                        </tr>
                        <tr>
                          <td width="30" valign="top" style="width:30px;padding-top:1px;color:#dc2626;font-size:14px;line-height:22px;font-weight:700;">02</td>
                          <td style="padding-bottom:12px;font-size:14px;line-height:22px;color:#52525b;">A sales specialist follows up with the right next steps.</td>
                        </tr>
                        <tr>
                          <td width="30" valign="top" style="width:30px;padding-top:1px;color:#dc2626;font-size:14px;line-height:22px;font-weight:700;">03</td>
                          <td style="padding-bottom:12px;font-size:14px;line-height:22px;color:#52525b;">You can continue to account setup whenever you&#39;re ready.</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:16px 32px 12px;background-color:#ffffff;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td align="center" bgcolor="#dc2626" style="border-radius:10px;background-color:#dc2626;">
                      <a href="${safeOnboardingUrl}" style="display:inline-block;padding:14px 24px;color:#ffffff;font-size:16px;line-height:20px;font-weight:700;text-decoration:none;border-radius:10px;">Continue to account setup</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 32px 34px;background-color:#ffffff;">
                <p style="margin:0;text-align:center;font-size:12px;line-height:19px;color:#71717a;">If the button does not work, copy and paste this link:<br><a href="${safeOnboardingUrl}" style="color:#b91c1c;text-decoration:underline;word-break:break-all;">${safeOnboardingUrl}</a></p>
                <p style="margin:24px 0 0;padding-top:22px;border-top:1px solid #e4e4e7;text-align:center;font-size:14px;line-height:22px;color:#52525b;">Have a question? Reply to this email and our sales team will help.</p>
                <p style="margin:10px 0 0;text-align:center;font-size:11px;line-height:17px;color:#a1a1aa;">Inquiry reference: ${safeInquiryId}</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:22px 24px;background-color:#18181b;color:#a1a1aa;font-size:12px;line-height:19px;">
                <p style="margin:0 0 7px;color:#ffffff;font-weight:700;">Closer Intellect AI</p>
                <p style="margin:0 0 9px;">&copy; ${year} Closer Intellect AI. All rights reserved.</p>
                <p style="margin:0;"><a href="${WEBSITE_URL}" style="color:#d4d4d8;text-decoration:underline;">Website</a>&nbsp;&nbsp;&middot;&nbsp;&nbsp;<a href="${WEBSITE_URL}/privacy" style="color:#d4d4d8;text-decoration:underline;">Privacy</a>&nbsp;&nbsp;&middot;&nbsp;&nbsp;<a href="${WEBSITE_URL}/terms" style="color:#d4d4d8;text-decoration:underline;">Terms</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
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
    "What happens next:",
    "1. Our team reviews your goals and contact details.",
    "2. A sales specialist follows up with the right next steps.",
    "3. You can continue to account setup whenever you're ready.",
    "",
    `Continue to account setup: ${onboardingUrl}`,
    "",
    `Inquiry reference: ${inquiryId}`,
    "",
    "Have a question? Reply to this email and our sales team will help.",
    "",
    "Closer Intellect AI",
  ].join("\n")

  const customerHtml = buildCustomerEmailHtml(
    inquiry.fullName,
    inquiryId,
    onboardingUrl,
  )

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
            html: customerHtml,
          },
          `inquiry-${inquiryId}-customer-confirmation-v2`,
        )

  const [salesNotification, customerConfirmation] = await Promise.all([
    salesNotificationPromise,
    customerConfirmationPromise,
  ])

  return { salesNotification, customerConfirmation }
}
