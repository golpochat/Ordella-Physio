# subscription-billing-service — Deprecated

**Status:** Deprecated as of 2026-06-17. **Removed from `docker-compose.dev.yml`** (2026-06-20).

## Use instead

| Legacy | Replacement |
| ------ | ----------- |
| `POST /subscription-billing/stripe/webhook` | `POST /billing/webhook` |
| `/subscription-billing/*` | `/billing/*` (gateway rewrites prefix) |
| `subscription-billing-service` DB | `billing-service` + org/tenant billing sync |

See [docs/billing-architecture.md](../../docs/billing-architecture.md).

## Gateway compatibility

The API gateway still accepts `/subscription-billing/*` and rewrites to `billing-service` for backward-compatible clients (frontend `subscriptionBilling` BFF prefix, `@ordella/shared` HTTP clients).

## Removal checklist (before deleting this directory)

- [ ] Remove from `infrastructure/deployment-layer/docker-compose.full.yml`
- [ ] Migrate frontend `subscription-billing-api.ts` callers to `billing` BFF routes
- [ ] Point `@ordella/shared` `SubscriptionBillingHttpClient` default URL at billing-service internal paths
- [ ] Remove workflow-test references to `subscription-billing` stack key
- [ ] Delete `services/subscription-billing/` tree

Do **not** add new features here.
