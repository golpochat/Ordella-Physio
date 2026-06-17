# Billing architecture — Ordella Physio

> **Decision (2026-06-16):** Production billing uses **subscription-billing microservice + Stripe** when running the Docker/gateway stack. The **clinic monolith** (`backend/`) records platform subscriptions in Postgres for local `USE_CLINIC_BACKEND=true` development without requiring Stripe keys.

## Modes

| Mode | Checkout (`/checkout`) | In-portal upgrade (`/clinic/billing`) | Payment capture |
|------|--------------------------|---------------------------------------|-----------------|
| **Gateway + microservices** (Docker dev/prod) | BFF → onboarding + **subscription-billing** `/subscription/subscribe` | `ClinicSubscriptionBillingPanel` → subscription-billing + Stripe portal | Stripe (when `STRIPE_SECRET_KEY` set) |
| **Clinic monolith** (`pnpm dev`, `USE_CLINIC_BACKEND=true`) | BFF → `/api/onboarding/checkout/complete` | Subscription panel may be limited; platform state in `PlatformSubscription` | DB-only activation; card validated, not charged |

## User flows

### Trial

1. `/pricing` → `/checkout?intent=trial`
2. CTA → `/register` (if needed) → tenant `TRIALING`
3. Trial banner → `/checkout?intent=checkout` or `/clinic/billing`

### Paid signup

1. `/pricing` → `/checkout?intent=checkout`
2. Register → return to checkout → complete payment
3. Gateway: Stripe subscription via subscription-billing
4. Monolith: `PlatformSubscription` + tenant `ACTIVE`

## Environment

| Variable | Service | Purpose |
|----------|---------|---------|
| `STRIPE_SECRET_KEY` | subscription-billing | Live Stripe API |
| `STRIPE_WEBHOOK_SECRET` | subscription-billing | Webhook verification |
| `FRONTEND_URL` | backend / subscription-billing | Reset links, portal return URLs |

## Webhooks

Stripe webhooks are handled by **subscription-billing** (`stripe-webhook.service.ts`). Tenant status sync (`ACTIVE`, `PAST_DUE`, suspension) should be driven from webhook handlers — verify in deploy checklist.

## Related docs

- [implementation-audit-tracker.md](./implementation-audit-tracker.md)
- [ops-reference.md](./ops-reference.md)
