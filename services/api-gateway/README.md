# API Gateway

## Overview
This service is part of the **Ordella Physio** microservices ecosystem.  
It is responsible for handling all domain logic related to **unified HTTP routing, authentication middleware, and downstream service proxying**.

This is the **canonical API Gateway** for the monorepo. All HTTP traffic from frontends and external clients enters through this service.

This service follows:
- **NestJS** modular architecture  
- **CQRS pattern** (commands, events, handlers)  
- **Domain-driven folder structure**  
- **API Gateway integration**  
- **Multi-tenant request context**  

---

## Features
- Core domain logic for request routing and service orchestration
- JWT authentication and tenant header propagation
- Reverse proxy to all downstream microservices
- Swagger/OpenAPI documentation at `/docs`
- Rate limiting, CORS, and request sanitization
- Domain modules: `gateway`, `proxy`, `commands`
- REST endpoints exposed via NestJS controllers
- CQRS command handlers and event emitters
- Integration with:
  - API Gateway
  - Event Bus (NATS JetStream)
  - Redis (global caching layer)
  - Shared `@ordella/*` packages

---

## Tech Stack
- **NestJS**
- **TypeScript**
- **CQRS Module**
- **NATS JetStream** (event-bus-service)
- **Redis** (global caching layer)
- **Prometheus metrics**
- **OpenTelemetry tracing**

---

## Local Development

### Install dependencies
Run from the monorepo root:

```bash
pnpm install
```

### Environment setup

```bash
cp .env.example .env
```

Configure downstream service URLs, JWT secrets, and gateway limits. See [Environment Variables](#environment-variables).

### Run the service

```bash
# From repo root
pnpm --filter @ordella/api-gateway dev

# Or from this directory
pnpm dev
```

Default URL: **http://localhost:3049**  
Swagger UI: **http://localhost:3049/docs**

---

## Project Structure

```
services/api-gateway/
├── src/
│   ├── gateway/        # Route definitions and middleware
│   ├── gateway/proxy/  # HTTP proxy to microservices
│   ├── commands/       # CQRS forward-request handlers
│   ├── app.module.ts
│   └── main.ts
├── Dockerfile
└── package.json
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start in watch mode |
| `pnpm build` | Compile with NestJS |
| `pnpm start` | Run production build |
| `pnpm lint` | Lint source files |
| `pnpm typecheck` | Type-check without emit |
| `pnpm test` | Run unit tests |

---

## Environment Variables

Copy `.env.example` to `.env`. Key variables:

| Variable | Description |
|----------|-------------|
| `PORT` | HTTP port (default `3049`) |
| `JWT_SECRET` | JWT validation secret |
| `AUTH_SERVICE_URL` | Auth service base URL |
| `TENANT_SERVICE_URL` | Tenant service base URL |
| `PATIENT_SERVICE_URL` | Patient service base URL |
| `APPOINTMENT_SERVICE_URL` | Appointment service base URL |
| `NOTES_SERVICE_URL` | Notes service base URL |
| `BILLING_SERVICE_URL` | Billing service base URL |
| `PAYMENT_SERVICE_URL` | Payment service base URL |
| `COMMUNICATION_SERVICE_URL` | Communication service base URL |
| `REPORTING_SERVICE_URL` | Reporting service base URL |
| `GATEWAY_TIMEOUT_MS` | Upstream request timeout |
| `CORS_ORIGIN` | Allowed CORS origins |

---

## Docker & Kubernetes

- **Dockerfile:** `services/api-gateway/Dockerfile`
- **Kubernetes:** `infrastructure/deployment-layer/k8s/base/api-gateway-*.yaml`
- **Image:** `ghcr.io/ordella/api-gateway`

---

## Location

```
services/api-gateway/
```

**Package name:** `@ordella/api-gateway`

> **Note:** Do not recreate an API gateway under `apps/`. All gateway development must happen in this directory.

---

## Related Documentation

- [Deployment Layer](../../infrastructure/deployment-layer/README.md)
- [Global Caching Layer](../../infrastructure/global-caching-layer/README.md)
- [Global Metrics & Monitoring](../../infrastructure/global-metrics-monitoring-layer/README.md)
