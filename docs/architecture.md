# Architecture — Ordella Physio

## System Overview

Ordella Physio is a Turborepo monorepo with three frontend apps, nine backend microservices, shared packages, and infrastructure tooling.

```
┌─────────────┐  ┌─────────────┐
│  web :3000  │  │  app :3001  │
│  Marketing  │  │  Dashboard  │
└──────┬──────┘  └──────┬──────┘
       │                │
       └────────┬───────┘
                ▼
       ┌─────────────────┐
       │  API Gateway    │
       │     :4000       │
       └────────┬────────┘
                │
    ┌───────────┼───────────┐
    ▼           ▼           ▼
 auth:4001  tenant:4002  patient:4003
    │           │           │
 appointment  notes     billing
   :4004      :4005      :4006
    │           │           │
 payment    communication  reporting
   :4007      :4008        :4009
```

## Monorepo Layout

| Path | Purpose |
|------|---------|
| `apps/web` | Next.js 14 marketing site |
| `apps/app` | Next.js 14 authenticated dashboard |
| `services/api-gateway` | NestJS API gateway routing to services |
| `services/*` | Domain microservices (Express + TypeScript) |
| `packages/ui` | Shared React UI (Tailwind) |
| `packages/shared` | DTOs, types, event contracts |
| `packages/config` | ESLint, Prettier, TS configs |
| `infrastructure/deployment-layer` | Docker Compose and Kubernetes deployment |
| `infrastructure/gateway-load-balancer` | Traefik load balancer and routing |
| `infrastructure/global-caching-layer` | Redis caching layer |
| `infrastructure/global-logging-layer` | Loki and Promtail logging |
| `infrastructure/global-metrics-monitoring-layer` | Prometheus, Grafana, and Tempo |
| `infrastructure/developer-tooling-layer` | Linting, formatting, and CI templates |

## Service Boundaries

Each microservice owns its domain data and exposes REST APIs. Cross-service communication uses:

1. **Synchronous**: API Gateway → service HTTP calls
2. **Asynchronous** (planned): Domain events via message broker (Redis Streams / RabbitMQ)

### Event Contracts

Defined in `@ordella/shared/events`:

- `appointment.created`, `appointment.cancelled`
- `invoice.created`, `payment.succeeded`
- `reminder.sent`

## Multi-Tenancy

- Every request carries a `tenantId` (from JWT)
- Services enforce tenant scoping at the data layer
- Shared auth service issues tokens with tenant + role claims

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React 18, Tailwind CSS |
| API Gateway | Express, http-proxy-middleware |
| Services | Express, TypeScript |
| Monorepo | Turborepo, pnpm workspaces |
| Database (planned) | PostgreSQL per service or schema-per-tenant |
| Cache (planned) | Redis |
| Payments | Stripe |
| Containerization | Docker, docker-compose |

## Security

- Helmet + CORS on all services
- JWT access tokens (15 min) + refresh tokens (7 days)
- RBAC enforced at gateway and service level
- Secrets via environment variables / external secret store

## Deployment

- **Local**: `pnpm dev` via Turborepo; full stack via `docker compose`
- **Production** (future): Kubernetes with Helm, ingress to gateway, managed PostgreSQL
