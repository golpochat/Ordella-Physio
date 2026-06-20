# Billing architecture — Ordella Physio

> **Decision (2026-06-16):** Production billing uses **billing-service + Stripe** when running the Docker/gateway stack. The **clinic monolith** (`backend/`) records platform subscriptions in Postgres for local `USE_CLINIC_BACKEND=true` development without requiring Stripe keys.

## Hybrid billing truth model

Every organization has a required `billingModel`:

| Value | Billing entity | Stripe customer metadata | Subscription owner |
|-------|----------------|--------------------------|-------------------|
| `tenant-level` | Tenant | `tenantId` + `organizationId` | `tenant.subscription` |
| `organization-level` | Organization | `organizationId` only | `organization.subscription` |

**Rules:**

- Tenants inherit billing behavior from their organization; they cannot override `billingModel`.
- Exactly one Stripe customer per billing entity — never both tenant and organization customers for the same workspace.
- Webhooks route to tenant **or** organization based on Stripe customer ownership, never both.
- AI Notes usage (`tenant.usage.aiNotesCount`) is always billed per tenant even under organization-level platform billing.

## UI routing

| billingModel | Platform billing UI | Clinic `/clinic/billing` |
|--------------|---------------------|--------------------------|
| `tenant-level` | `/clinic/billing` | Full subscription + invoices |
| `organization-level` | `/organization/billing` | Read-only “managed by organization” + patient invoices only |

Trial upgrade redirects:

- `tenant-level` → `/clinic/billing/upgrade`
- `organization-level` → `/organization/billing/upgrade`

## Modes

| Mode | Checkout (`/checkout`) | In-portal upgrade | Payment capture |
|------|------------------------|-------------------|-----------------|
| **Gateway + microservices** | BFF → onboarding + Stripe via billing-service | Clinic or organization billing panel | Stripe |
| **Clinic monolith** (`USE_CLINIC_BACKEND=true`) | BFF → `/api/onboarding/checkout/complete` | Limited; DB-only stub | DB-only activation |

## API

- `GET /billing/billing-context` — resolves billing truth for the current tenant (via billing-service → tenant-service).
- `POST /billing/checkout-session` — creates Stripe Checkout for paid onboarding (gateway mode).
- Stripe webhooks: `POST /billing/webhook` (billing-service), routed by customer metadata; syncs tenant lifecycle (`ACTIVE`/`SUSPENDED`) for tenant-level billing.

## Related docs

- [implementation-audit-tracker.md](./implementation-audit-tracker.md)
- [ops-reference.md](./ops-reference.md)

## Removed: subscription-billing-service

`services/subscription-billing/` was **deleted** on 2026-06-20. Plan enforcement and internal usage endpoints live on **billing-service** at `/billing/internal/enforce` and `/billing/internal/usage`. The API gateway still rewrites legacy `/subscription-billing/*` paths to `/billing/*` for backward-compatible clients.

| Legacy | Replacement |
|--------|-------------|
| `POST /subscription-billing/stripe/webhook` | `POST /billing/webhook` |
| `/settings/billing` UI | `/clinic/billing` or `/organization/billing` |
| `subscription-billing-service` DB | `billing-service` + org/tenant billing sync |
