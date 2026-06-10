# Marketplace Service

Third-party integration marketplace for the Ordella Physio platform. Manages provider catalog, tenant-scoped credentials, OAuth flows, API key connections, webhooks, and integration usage logging.

## Port

`3064`

## Database

`ordella_marketplace` (PostgreSQL)

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/marketplace/health` | Health check |
| GET | `/marketplace/providers` | List integration providers |
| GET | `/marketplace/tenant-integrations` | List tenant connections |
| POST | `/marketplace/tenant-integrations/connect` | Start OAuth or save API key |
| POST | `/marketplace/tenant-integrations/disconnect` | Remove tenant connection |
| GET | `/marketplace/oauth/redirect` | OAuth callback (public) |
| GET | `/marketplace/usage-logs` | Integration activity logs |
| POST | `/marketplace/hooks/*` | Internal integration hooks |
| POST | `/marketplace/webhooks/:providerSlug` | External provider webhooks (public) |

## Supported providers

- Google Calendar, Google Drive (OAuth)
- Dropbox, OneDrive, Zoom (OAuth)
- Twilio, SendGrid, Physiotec, MedBridge (API key)
- Stripe Billing (linked via billing service)

## Local development

```bash
cp .env.example .env
pnpm --filter @ordella/marketplace-service prisma:generate
pnpm --filter @ordella/marketplace-service dev
```

Set OAuth client credentials in `.env` for providers you want to test. The OAuth callback URL must point at the API gateway:

`http://localhost:3049/marketplace/oauth/redirect`

## Permissions

- `marketplace.read` — view providers and tenant integrations
- `marketplace.write` — connect, disconnect, and run hooks
- `marketplace.manage` — platform-level management (SYSTEM role)
