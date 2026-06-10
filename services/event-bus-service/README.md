# Event Bus Service

## Overview
This service is part of the **Ordella Physio** microservices ecosystem.  
It is responsible for handling all domain logic related to **asynchronous messaging, NATS JetStream streams, event publishing, and dead-letter handling**.

This service follows:
- **NestJS** modular architecture  
- **CQRS pattern** (commands, events, handlers)  
- **Domain-driven folder structure**  
- **API Gateway integration**  
- **Multi-tenant request context**  

---

## Features
- Core infrastructure for cross-service event-driven communication
- NATS JetStream stream provisioning and schema validation
- Event publishers, subscribers, and replay tooling
- Dead-letter queue handling for failed message processing
- Domain modules: `nats`, `streams`, `publishers`, `subscribers`, `schemas`, `dead-letter`, `replay`
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

Configure NATS and Redis. See [Environment Variables](#environment-variables).

### Run the service

```bash
# From repo root
pnpm --filter @ordella/event-bus-service dev

# Or from this directory
pnpm dev
```

Default URL: **http://localhost:3060**

> Requires a running NATS server with JetStream enabled (see deployment layer Docker Compose).

---

## Project Structure

```
services/event-bus-service/
├── src/
│   ├── nats/           # NATS connection and JetStream client
│   ├── streams/        # Stream configuration and lifecycle
│   ├── publishers/     # Outbound event publishing
│   ├── subscribers/    # Inbound event consumption
│   ├── schemas/        # Event contract validation
│   ├── dead-letter/    # Failed message handling
│   ├── replay/         # Event replay and health endpoints
│   ├── middleware/
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
| `PORT` | HTTP port (default `3060`) |
| `NATS_URL` | NATS server connection string |
| `REDIS_URL` | Redis for caching and coordination |
| `JETSTREAM_REPLICAS` | JetStream stream replica count |
| `JETSTREAM_MAX_AGE_HOURS` | Message retention window |
| `JETSTREAM_MAX_BYTES` | Maximum stream size in bytes |

---

## Docker & Kubernetes

- **Dockerfile:** `services/event-bus-service/Dockerfile`
- **Kubernetes:** `infrastructure/deployment-layer/k8s/base/event-bus-service-*.yaml`
- **Image:** `ghcr.io/ordella/event-bus-service`

---

## Location

```
services/event-bus-service/
```

**Package name:** `@ordella/event-bus-service`

---

## Related Documentation

- [Deployment Layer](../../infrastructure/deployment-layer/README.md)
- [Global Caching Layer](../../infrastructure/global-caching-layer/README.md)
- [Global Metrics & Monitoring](../../infrastructure/global-metrics-monitoring-layer/README.md)
