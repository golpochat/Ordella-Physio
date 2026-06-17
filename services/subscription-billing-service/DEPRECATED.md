# DEPRECATED — subscription-billing-service

> **Superseded by `billing-service`** as of 2026-06-17. See [docs/billing-architecture.md](../../docs/billing-architecture.md).

## Do not use for new work

| Concern | Use instead |
|---------|-------------|
| Platform Stripe subscriptions | `services/billing-service` (`POST /billing/*`) |
| Webhooks | `POST /billing/webhook` (billing-service only in production) |
| Clinic billing UI | `/clinic/billing`, `/organization/billing` |
| Settings billing | Redirects to `/clinic/billing` |

This service remains in Docker compose for backward compatibility during migration. New features must not be added here.
