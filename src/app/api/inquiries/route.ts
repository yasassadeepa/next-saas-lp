import { NextResponse } from "next/server"

import { getOnboardingUrl } from "@/lib/server/inquiry-config"
import { sendInquiryEmails } from "@/lib/server/inquiry-email"
import {
  consumeInquiryRateLimit,
  getTrustedClientIp,
} from "@/lib/server/inquiry-rate-limit"
import {
  buildIdempotency,
  InquiryConflictError,
  MAX_INQUIRY_BODY_BYTES,
  parseInquiryPayload,
  recordEmailResults,
  requiredEmailsAccepted,
  saveInquiry,
  type EmailDeliveryResults,
  type EmailDeliveryState,
} from "@/lib/server/inquiries"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type ErrorOptions = {
  retryable?: boolean
  inquiryId?: string
  retryAfterSeconds?: number
}

function jsonError(error: string, status: number, options: ErrorOptions = {}) {
  const headers: Record<string, string> = { "Cache-Control": "no-store" }
  if (options.retryAfterSeconds) {
    headers["Retry-After"] = String(options.retryAfterSeconds)
  }

  return NextResponse.json(
    {
      success: false,
      error,
      ...(options.retryable ? { retryable: true } : {}),
      ...(options.inquiryId ? { inquiryId: options.inquiryId } : {}),
    },
    {
      status,
      headers,
    },
  )
}

function failedDelivery(previous: EmailDeliveryState): EmailDeliveryState {
  if (previous.status === "sent") {
    return previous
  }

  return {
    status: "failed",
    attemptedAt: new Date(),
    error: "Email dispatch could not start",
  }
}

function retryableEmailError(inquiryId: string) {
  return jsonError(
    "Your inquiry was saved, but we could not send all required emails. Please try again.",
    503,
    { retryable: true, inquiryId, retryAfterSeconds: 10 },
  )
}

function isSameOriginRequest(request: Request): boolean {
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return false
  }

  const origin = request.headers.get("origin")
  if (!origin) {
    return true
  }

  try {
    return new URL(origin).origin === new URL(request.url).origin
  } catch {
    return false
  }
}

async function readJson(request: Request): Promise<unknown> {
  const contentLength = Number(request.headers.get("content-length") ?? 0)
  if (Number.isFinite(contentLength) && contentLength > MAX_INQUIRY_BODY_BYTES) {
    throw new PayloadTooLargeError()
  }

  const chunks: Uint8Array[] = []
  let receivedBytes = 0
  const reader = request.body?.getReader()

  if (reader) {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      receivedBytes += value.byteLength
      if (receivedBytes > MAX_INQUIRY_BODY_BYTES) {
        await reader.cancel().catch(() => undefined)
        throw new PayloadTooLargeError()
      }

      chunks.push(value)
    }
  }

  try {
    const bytes = new Uint8Array(receivedBytes)
    let offset = 0
    for (const chunk of chunks) {
      bytes.set(chunk, offset)
      offset += chunk.byteLength
    }

    const body = new TextDecoder("utf-8", { fatal: true }).decode(bytes)
    return JSON.parse(body) as unknown
  } catch {
    throw new InvalidJsonError()
  }
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return jsonError("This submission could not be accepted.", 403)
  }

  const contentType = request.headers.get("content-type")?.toLowerCase() ?? ""
  if (!contentType.startsWith("application/json")) {
    return jsonError("The inquiry must be submitted as JSON.", 415)
  }

  try {
    const payload = await readJson(request)
    const parsed = parseInquiryPayload(payload)

    if (!parsed.valid) {
      return jsonError(parsed.error, 400)
    }

    if (parsed.honeypotTriggered) {
      return jsonError("This submission could not be accepted.", 400)
    }

    const rateLimit = await consumeInquiryRateLimit(
      parsed.value.email,
      getTrustedClientIp(request),
    )

    if (!rateLimit.allowed) {
      return jsonError("Too many inquiries were submitted. Please try again later.", 429, {
        retryable: true,
        retryAfterSeconds: rateLimit.retryAfterSeconds,
      })
    }

    const idempotency = buildIdempotency(
      parsed.value,
      request.headers.get("idempotency-key"),
    )

    if ("error" in idempotency) {
      return jsonError(idempotency.error, 400)
    }

    const redirectUrl = getOnboardingUrl()
    const { inquiry, created } = await saveInquiry(
      parsed.value,
      idempotency.idempotencyKey,
      idempotency.requestFingerprint,
    )

    let persistedInquiry = inquiry

    if (!requiredEmailsAccepted(inquiry)) {
      let emailResults: EmailDeliveryResults

      try {
        emailResults = await sendInquiryEmails(inquiry)
      } catch (emailError) {
        emailResults = {
          salesNotification: failedDelivery(inquiry.emails.salesNotification),
          customerConfirmation: failedDelivery(inquiry.emails.customerConfirmation),
        }

        console.error("Inquiry email dispatch could not start", {
          inquiryId: inquiry._id.toHexString(),
          error: emailError instanceof Error ? emailError.message : "Unknown email error",
        })
      }

      try {
        persistedInquiry = await recordEmailResults(inquiry._id, emailResults)
      } catch (recordingError) {
        console.error("Unable to record inquiry email results", {
          inquiryId: inquiry._id.toHexString(),
          error:
            recordingError instanceof Error ? recordingError.message : "Unknown database error",
        })
        return retryableEmailError(inquiry._id.toHexString())
      }

      if (!requiredEmailsAccepted(persistedInquiry)) {
        console.error("One or more inquiry emails failed", {
          inquiryId: inquiry._id.toHexString(),
          salesNotification: persistedInquiry.emails.salesNotification.status,
          customerConfirmation: persistedInquiry.emails.customerConfirmation.status,
        })
        return retryableEmailError(inquiry._id.toHexString())
      }
    }

    return NextResponse.json(
      {
        success: true,
        inquiryId: inquiry._id.toHexString(),
        redirectUrl,
      },
      {
        status: created ? 201 : 200,
        headers: { "Cache-Control": "no-store" },
      },
    )
  } catch (error) {
    if (error instanceof PayloadTooLargeError) {
      return jsonError("The inquiry is too large.", 413)
    }

    if (error instanceof InvalidJsonError) {
      return jsonError("The inquiry contains invalid JSON.", 400)
    }

    if (error instanceof InquiryConflictError) {
      return jsonError("This submission key has already been used.", 409)
    }

    console.error("Unable to process inquiry", error)
    return jsonError("We could not submit your inquiry. Please try again.", 500)
  }
}

class PayloadTooLargeError extends Error {}
class InvalidJsonError extends Error {}
