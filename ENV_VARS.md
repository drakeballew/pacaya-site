Environment variables required for contact/newsletter verification and notifications

- `EMAILABLE_API_URL` — Emailable verification endpoint (e.g. https://api.emailable.io/v1/verify). Should accept JSON { email }.
- `EMAILABLE_API_KEY` — Emailable API key used in an Authorization Bearer header.

Note on Emailable
- The repository uses Emailable's HTTP GET verify endpoint pattern. Example:
  `https://api.emailable.com/v1/verify?email=drake@pacaya.io&api_key=test_...`
  Set `EMAILABLE_API_URL` to the base verify URL (without query params) and `EMAILABLE_API_KEY` to your key.
- `MAILERLITE_API_URL` — MailerLite webhook URL or API endpoint to receive notifications (optional). The server posts JSON { type: 'contact'|'newsletter', payload }.
- `MAILERLITE_API_KEY` — API key for MailerLite if required by your endpoint (optional).

MailerLite-specific
- `MAILERLITE_API_KEY` — required to call MailerLite's official API (connect.mailerlite.com).
- `MAILERLITE_SUBSCRIBERS_URL` — MailerLite subscribers endpoint (defaults to `https://connect.mailerlite.com/api/subscribers`).
MailerLite-specific
- `MAILERLITE_API_KEY` — required to call MailerLite's official API (connect.mailerlite.com).
- `MAILERLITE_SUBSCRIBERS_URL` — MailerLite subscribers endpoint (defaults to `https://connect.mailerlite.com/api/subscribers`).
- `MAILERLITE_NEWSLETTER_GROUP_ID` — Group ID to add newsletter subscribers to (optional).
- `MAILERLITE_CONTACT_FORM_GROUP_ID` — Group ID to add contact form submissions to (optional).
- `ADD_CONTACT_TO_MAILERLITE` — optional flag (`true`) to add contact form emails as subscribers automatically.

Notes
- The server endpoints are:
  - `/api/contact` — accepts the full contact form payload and will verify the email before forwarding to `MAILERLITE_API_URL`.
  - `/api/newsletter` — accepts `{ email }` and will verify the email before forwarding to `MAILERLITE_API_URL`.
   - `/api/contact` — accepts the full contact form payload and will verify the email before optionally adding the email as a subscriber (if `ADD_CONTACT_TO_MAILERLITE=true`).
   - `/api/newsletter` — accepts `{ email }` and will verify the email before adding it as a subscriber.

Set these in your environment (e.g., in Vercel or your `.env.local`) before deploying.
