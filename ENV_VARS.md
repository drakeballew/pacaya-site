Environment variables for form submission (Emailable + MailerLite)

Required
- `EMAILABLE_API_KEY` — Emailable private API key from https://app.emailable.com/api
- `MAILERLITE_API_TOKEN` or `MAILERLITE_API_KEY` — MailerLite API token from Integrations → MailerLite API
- `MAILERLITE_NEWSLETTER_GROUP_ID` — Group ID for newsletter subscribers
- `MAILERLITE_CONTACT_GROUP_ID` or `MAILERLITE_CONTACT_FORM_GROUP_ID` — Group ID for contact form submissions

Optional
- `EMAILABLE_API_URL` — Override Emailable verify endpoint (defaults to `https://api.emailable.com/v1/verify`)
- `MAILERLITE_SUBSCRIBERS_URL` — Override MailerLite subscribers endpoint (defaults to `https://connect.mailerlite.com/api/subscribers`)

Turnstile (human verification)
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — Cloudflare Turnstile site key (public, used in browser)
- `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile secret key (server-only, used to verify tokens)

API routes
- `POST /api/newsletter` — accepts `{ email, turnstileToken }`, verifies Turnstile, then Emailable, then MailerLite
- `POST /api/contact` — accepts `{ name, email, company, phone, message, budget, turnstileToken }`, verifies Turnstile, then Emailable, then MailerLite

MailerLite custom fields for contact form: `name`, `company`, `phone`, `message`, `budget`

Set these in `.env.local` (local) or your hosting provider (e.g. Vercel) before deploying.
