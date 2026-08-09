export const formMessages = {
  newsletterSuccess: "You're on the list. Look for us in your inbox soon.",
  contactSuccess: "Got it. We'll be in touch soon.",
  undeliverableEmail:
    "We couldn't verify that email address. Please double-check and try again.",
  serverError: 'Something went wrong on our end. Please try again in a moment.',
  turnstileError:
    'Security verification expired. Please wait a moment and try again.',
} as const

export type FormApiResponse = {
  ok: boolean
  message: string
}
