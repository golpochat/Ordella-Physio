# Architecture — Ordella Physio

## System overview

Ordella Physio is a **pnpm + Turborepo** monorepo. Production traffic is consolidating on a single Next.js app with an optional **clinic monolith** (`backend/`) for local/simple deployments and a **microservice stack** behind **api-gateway** for Docker and scale-out.

```
┌──────────────────────────────────────────────────────────────┐
│  apps/frontend-web :3010                                     │
│  Marketing · Auth/Checkout · Clinic/Therapist/Staff/       │
│  Patient/Pharmacy/Super-admin/Organization portals           │
│  BFF: /api/* → gateway or clinic-backend                      │
└───────────────────────────┬──────────────────────────────────┘
                            │
         ┌──────────────────┴──────────────────┐
         ▼                                     ▼
┌─────────────────┐                 ┌─────────────────────┐
│ clinic-backend  │                 │ api-gateway :3049   │
│ (optional) :4000│                 │ NestJS HTTP proxy   │
│ onboarding,     │                 └──────────┬──────────┘
│ legacy routes   │                            │
└─────────────────┘                 ┌──────────┴──────────┐
                                    ▼                     ▼
                            auth · tenant · patient   billing · org
                            appointment · notes · …   (35+ services)
```

**Billing truth:** platform Stripe subscriptions and webhooks live in **`billing-service`** only. See [billing-architecture.md](./billing-architecture.md). `subscription-billing-service` is deprecated.

**Dual backend switch:** `USE_CLINIC_BACKEND=true` routes many portal BFF calls to the monolith; Docker dev defaults to gateway + microservices. Onboarding in gateway mode is proxied to `CLINIC_BACKEND_URL` (`/api/onboarding/*`).

## Monorepo layout

| Path | Purpose |
|------|---------|
| `apps/frontend-web` | Unified web app (marketing + all portals + BFF) |
| `apps/web`, `apps/app`, `apps/admin-dashboard`, `apps/marketing-site` | **Deprecated** — see each `DEPRECATED.md` |
| `backend/` | Express clinic monolith (onboarding, legacy clinic APIs) |
| `services/api-gateway` | NestJS gateway → microservices |
| `services/*` | Domain microservices (NestJS / Express + Prisma) |
| `packages/shared` | Shared types, billing truth, integrations |
| `packages/config` | Env schemas, service URL config |
| `packages/security`, `packages/validation` | RBAC, guards, Zod DTOs |
| `infrastructure/deployment-layer` | Docker Compose, K8s manifests |
| `docs/` | Architecture, ops, billing, audit tracker |

## Service boundaries

Each microservice owns its database schema (Postgres). Cross-service calls are **synchronous HTTP** via api-gateway. Async domain events use **NATS JetStream** where wired (see `packages/shared` event contracts).

### Key platform services

| Service | Port (Docker) | Responsibility |
|---------|---------------|----------------|
| core-service (auth) | 3051 | Users, JWT, roles |
| tenant-service | 3052 | Tenants, trials, billing context sync |
| billing-service | 3056 | Clinical invoices + **platform Stripe** |
| organization-service | 3066 | Organizations, org-level billing metadata |
| ai-notes-service | 3063 | AI note generation + usage metering |
| file-storage-service | 3071 | Uploads, signed URLs, optional ClamAV |

## Multi-tenancy

- JWT carries `tenantId`, role, and permissions.
- Gateway forwards `x-tenant-id` (and user headers) to services.
- `SYSTEM` role bypasses tenant scoping for super-admin routes.

## Technology stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React 18, Tailwind |
| API gateway | NestJS |
| Services | NestJS / Express, TypeScript, Prisma |
| Monorepo | Turborepo, pnpm workspaces |
| Data | PostgreSQL per service |
| Cache / rate limit | Redis, Upstash (frontend) |
| Payments | Stripe (billing-service) |
| Observability | Prometheus, Grafana, Loki (infra layers) |

## Related docs

- [billing-architecture.md](./billing-architecture.md)
- [ops-reference.md](./ops-reference.md)
- [implementation-audit-tracker.md](./implementation-audit-tracker.md)
- [master-index.md](./master-index.md)
