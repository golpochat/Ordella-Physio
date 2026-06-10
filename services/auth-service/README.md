# Auth Service

## Overview
This service is part of the **Ordella Physio** microservices ecosystem.  
It is responsible for handling all domain logic related to **authentication, authorization, and user identity**.

This service follows:
- **NestJS** modular architecture  
- **CQRS pattern** (commands, events, handlers)  
- **Domain-driven folder structure**  
- **API Gateway integration**  
- **Multi-tenant request context**  

---

## Features
- Core domain logic for authentication and user identity
- User registration, login, refresh tokens, and password reset
- JWT issuance and validation (access + refresh)
- Email verification and transactional email integration
- Domain modules: `auth`, `users`, `tokens`, `email`, `events`
- REST endpoints exposed via NestJS controllers
- CQRS command handlers and event emitters
- Integration with:
  - API Gateway
  - Event Bus (NATS JetStream)
  - Redis (cache/session)
  - Shared `@ordella/*` packages

---

## Tech Stack
- **NestJS**
- **TypeScript**
- **Prisma** (PostgreSQL)
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

Configure PostgreSQL, NATS, Redis, and JWT secrets. See [Environment Variables](#environment-variables).

### Run the service

```bash
# From repo root
pnpm --filter @ordella/auth-service dev

# Or from this directory
pnpm dev
```

Default URL: **http://localhost:3051**

### Database migrations (Prisma)

```bash
pnpm prisma:generate
pnpm prisma:migrate
```

---

## Project Structure

```
services/auth-service/
├── src/
│   ├── auth/           # Controllers, commands, DTOs, guards, strategies
│   ├── users/          # User repository and service
│   ├── tokens/         # Refresh token persistence
│   ├── email/          # Email templates and delivery
│   ├── events/         # Domain event publishers
│   ├── database/       # Prisma module
│   ├── middleware/
│   ├── app.module.ts
│   └── main.ts
├── prisma/
├── Dockerfile
├── docker-compose.yml
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
| `pnpm prisma:generate` | Generate Prisma client |
| `pnpm prisma:migrate` | Apply local migrations |

---

## Environment Variables

Copy `.env.example` to `.env`. Key variables:

| Variable | Description |
|----------|-------------|
| `PORT` | HTTP port (default `3051`) |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Signing secret for access tokens |
| `NATS_URL` | NATS server for domain events |
| `REDIS_URL` | Redis for caching and sessions |
| `COMMUNICATION_SERVICE_URL` | Email delivery via communication service |

---

## Docker & Kubernetes

- **Dockerfile:** `services/auth-service/Dockerfile`
- **Docker Compose:** `services/auth-service/docker-compose.yml`
- **Kubernetes:** `infrastructure/deployment-layer/k8s/base/auth-service-*.yaml`
- **Image:** `ghcr.io/ordella/auth-service`

---

## Location

```
services/auth-service/
```

**Package name:** `@ordella/auth-service`

---

## Related Documentation

- [Deployment Layer](../../infrastructure/deployment-layer/README.md)
- [Global Caching Layer](../../infrastructure/global-caching-layer/README.md)
- [Global Metrics & Monitoring](../../infrastructure/global-metrics-monitoring-layer/README.md)
