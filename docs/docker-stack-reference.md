# Ordella Physio — Docker Stack Reference

Complete inventory of containers and images for running the SaaS locally, plus copy-paste commands to start, restart, rebuild, and stop the stack.

> **Related:** [ops-reference.md](./ops-reference.md) (day-to-day ops, test users) · [docker-rules.md](./docker-rules.md) (naming & cleanup policy) · [services-inventory.md](./services-inventory.md) (what each service does)

**Working directory for all commands below:** repository root (`ordella-physio/`).

```powershell
cd "d:\Exclusive projects\ordella-physio"
```

---

## Which compose file?

| Stack | Compose file | Containers | When to use |
|-------|--------------|------------|-------------|
| **Dev (recommended)** | `docker-compose.dev.yml` | **25** (+3 optional) | Daily development, manual QA, portal testing |
| **Full** | `docker-compose.yml` | **46** | Full microservices + AI + observability + Traefik |

Both stacks share the network `ordella-physio-network` and naming prefix `ordella-physio-*`.

**Do not mix stacks carelessly.** Dev uses hostname `db`; full stack uses `postgres`. Running both at once creates orphan containers and DB hostname mismatches.

---

## Prerequisites

### 1. Environment file

```powershell
Copy-Item infrastructure\deployment-layer\.env.local.example infrastructure\deployment-layer\.env.local
# Edit secrets if needed (JWT, Stripe, etc.)
```

`docker-compose.yml` loads `infrastructure/deployment-layer/.env.local` for `frontend-web`.

### 2. Base image (first-time builds)

Service Dockerfiles use `ordella-base:latest`. If builds fail with “ordella-base not found”, build it once (image must exist locally before `docker compose build`).

### 3. Host tools (not in Docker)

| Tool | Purpose |
|------|---------|
| `pnpm` | Host dev, migrations outside containers |
| `stripe listen --forward-to localhost:3049/billing/webhook` | Stripe webhooks for billing tests |

### 4. Key URLs (both stacks)

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3010 |
| API Gateway | http://localhost:3049 |
| Postgres (host) | `localhost:5433` (dev `db` / full `postgres`) |
| Redis | `localhost:6379` |
| Grafana (full stack only) | http://localhost:3030 |
| Traefik (full stack only) | http://localhost:80 |

---

## Dev stack — `docker-compose.dev.yml`

**25 containers** run by default. Covers all portals (clinic, org, pharmacy, staff, patient, super-admin) via microservices.

### Infrastructure (4)

| Compose service | Container name | Image | Host port |
|-----------------|----------------|-------|-----------|
| `db` | `ordella-physio-db` | `postgres:15-alpine` | 5433 |
| `redis` | `ordella-physio-redis` | `redis:7-alpine` | 6379 |
| `nats` | `ordella-physio-nats` | `nats:2.10-alpine` | (internal) |
| `clamav` | `ordella-physio-clamav` | `clamav/clamav:latest` | (internal) |

### Edge (2)

| Compose service | Container name | Image | Host port |
|-----------------|----------------|-------|-----------|
| `api-gateway` | `ordella-physio-api-gateway` | `ordella-physio-api-gateway:latest` | 3049 |
| `frontend` | `ordella-physio-frontend` | `ordella-physio-frontend:latest` | 3010 |

### Core & domain microservices (19)

| Compose service | Container name | Image | Internal port |
|-----------------|----------------|-------|---------------|
| `core-service` | `ordella-physio-core-service` | `ordella-physio-core-service:latest` | 3051 |
| `tenant-service` | `ordella-physio-tenant-service` | `ordella-physio-tenant-service:latest` | 3052 |
| `patient-service` | `ordella-physio-patient-service` | `ordella-physio-patient-service:latest` | 3053 |
| `appointment-service` | `ordella-physio-appointment-service` | `ordella-physio-appointment-service:latest` | 3054 |
| `notes-service` | `ordella-physio-notes-service` | `ordella-physio-notes-service:latest` | 3055 |
| `billing-service` | `ordella-physio-billing-service` | `ordella-physio-billing-service:latest` | 3056 |
| `messaging-service` | `ordella-physio-messaging-service` | `ordella-physio-messaging-service:latest` | 3061 |
| `notification-service` | `ordella-physio-notification-service` | `ordella-physio-notification-service:latest` | 3062 |
| `marketplace-service` | `ordella-physio-marketplace-service` | `ordella-physio-marketplace-service:latest` | 3064 |
| `enterprise-service` | `ordella-physio-enterprise-service` | `ordella-physio-enterprise-service:latest` | 3065 |
| `organization-service` | `ordella-physio-organization-service` | `ordella-physio-organization-service:latest` | 3066 |
| `terminal-service` | `ordella-physio-terminal-service` | `ordella-physio-terminal-service:latest` | 3067 |
| `user-role-service` | `ordella-physio-user-role-service` | `ordella-physio-user-role-service:latest` | 3068 |
| `staff-service` | `ordella-physio-staff-service` | `ordella-physio-staff-service:latest` | 3069 |
| `audit-service` | `ordella-physio-audit-service` | `ordella-physio-audit-service:latest` | 3070 |
| `file-storage-service` | `ordella-physio-file-storage-service` | `ordella-physio-file-storage-service:latest` | 3071 |
| `notification-provider-service` | `ordella-physio-notification-provider-service` | `ordella-physio-notification-provider-service:latest` | 3072 |
| `reporting-service` | `ordella-physio-reporting-service` | `ordella-physio-reporting-service:latest` | 3059 |
| `pharmacy-service` | `ordella-physio-pharmacy-service` | `ordella-physio-pharmacy-service:latest` | 3085 |

### Commented out in dev (enable manually in compose)

| Service | Notes |
|---------|-------|
| `search-index-service` | Uncomment block in `docker-compose.dev.yml` |

### Not in dev compose (only in full stack)

`payment-service`, `communication-service`, all `ai-*` services, `event-bus-service`, `auth-service` (dev uses `core-service` instead), observability, Traefik.

Gateway env still lists URLs for payment/communication; those routes 502 until the services are added or full stack is used.

---

## Optional profile — monolith clinic backend

**+3 containers** when onboarding/register needs the Express monolith at `:4000`.

| Compose service | Container name | Image | Host port |
|-----------------|----------------|-------|-----------|
| `clinic-backend-db` | `ordella-clinic-backend-db` | `postgres:16-alpine` | 5434 |
| `clinic-backend` | `ordella-clinic-backend` | `ordella-clinic-backend:latest` | 4000 |
| `clinic-backend-backup-cron` | `ordella-clinic-backend-backup-cron` | `node:22-alpine` | — |

```powershell
docker compose -f docker-compose.dev.yml --profile clinic-backend up -d clinic-backend-db clinic-backend
```

---

## Full stack — `docker-compose.yml`

**46 containers** — every microservice, AI plane, file scanning, observability, and Traefik.

### Infrastructure (3)

| Compose service | Container name | Image | Host port |
|-----------------|----------------|-------|-----------|
| `postgres` | `ordella-physio-postgres` | `postgres:15-alpine` | 5433 |
| `redis` | `ordella-physio-redis` | `redis:7-alpine` | 6379 |
| `nats` | `ordella-physio-nats` | `nats:2.10` | 4222 |

### Edge (3)

| Compose service | Container name | Image | Host port |
|-----------------|----------------|-------|-----------|
| `api-gateway` | `ordella-physio-api-gateway` | `ordella-physio-api-gateway:latest` | 3049 |
| `frontend-web` | `ordella-physio-frontend-web` | `ordella-physio-frontend-web:latest` | 3010 |
| `gateway-load-balancer` | `ordella-physio-traefik` | `traefik:v3.3` | 80, 8082 |

### Platform & clinical microservices (22)

| Compose service | Container name | Image | Port |
|-----------------|----------------|-------|------|
| `auth-service` | `ordella-physio-auth-service` | `ordella-physio-auth-service:latest` | 3051 |
| `tenant-service` | `ordella-physio-tenant-service` | `ordella-physio-tenant-service:latest` | 3052 |
| `patient-service` | `ordella-physio-patient-service` | `ordella-physio-patient-service:latest` | 3053 |
| `appointment-service` | `ordella-physio-appointment-service` | `ordella-physio-appointment-service:latest` | 3054 |
| `notes-service` | `ordella-physio-notes-service` | `ordella-physio-notes-service:latest` | 3055 |
| `billing-service` | `ordella-physio-billing-service` | `ordella-physio-billing-service:latest` | 3056 |
| `payment-service` | `ordella-physio-payment-service` | `ordella-physio-payment-service:latest` | 3057 |
| `communication-service` | `ordella-physio-communication-service` | `ordella-physio-communication-service:latest` | 3058 |
| `reporting-service` | `ordella-physio-reporting-service` | `ordella-physio-reporting-service:latest` | 3059 |
| `event-bus-service` | `ordella-physio-event-bus-service` | `ordella-physio-event-bus-service:latest` | 3060 |
| `messaging-service` | `ordella-physio-messaging-service` | `ordella-physio-messaging-service:latest` | 3061 |
| `notification-service` | `ordella-physio-notification-service` | `ordella-physio-notification-service:latest` | 3062 |
| `marketplace-service` | `ordella-physio-marketplace-service` | `ordella-physio-marketplace-service:latest` | 3064 |
| `enterprise-service` | `ordella-physio-enterprise-service` | `ordella-physio-enterprise-service:latest` | 3065 |
| `organization-service` | `ordella-physio-organization-service` | `ordella-physio-organization-service:latest` | 3066 |
| `terminal-service` | `ordella-physio-terminal-service` | `ordella-physio-terminal-service:latest` | 3067 |
| `user-role-service` | `ordella-physio-user-role-service` | `ordella-physio-user-role-service:latest` | 3068 |
| `staff-service` | `ordella-physio-staff-service` | `ordella-physio-staff-service:latest` | 3069 |
| `audit-service` | `ordella-physio-audit-service` | `ordella-physio-audit-service:latest` | 3070 |
| `file-storage-service` | `ordella-physio-file-storage-service` | `ordella-physio-file-storage-service:latest` | 3071 |
| `notification-provider-service` | `ordella-physio-notification-provider-service` | `ordella-physio-notification-provider-service:latest` | 3072 |
| `search-index-service` | `ordella-physio-search-index-service` | `ordella-physio-search-index-service:latest` | 3073 |

> **Gap:** `pharmacy-service` is in **dev** compose but **not** in full `docker-compose.yml` yet.

### AI plane (11)

| Compose service | Container name | Image | Port |
|-----------------|----------------|-------|------|
| `ai-notes-service` | `ordella-physio-ai-notes-service` | `ordella-physio-ai-notes-service:latest` | 3063 |
| `ai-service` | `ordella-physio-ai-service` | `ordella-physio-ai-service:latest` | 3075 |
| `ai-training-service` | `ordella-physio-ai-training-service` | `ordella-physio-ai-training-service:latest` | 3076 |
| `ai-monitoring-service` | `ordella-physio-ai-monitoring-service` | `ordella-physio-ai-monitoring-service:latest` | 3077 |
| `ai-deploy-service` | `ordella-physio-ai-deploy-service` | `ordella-physio-ai-deploy-service:latest` | 3078 |
| `feature-flags-service` | `ordella-physio-feature-flags-service` | `ordella-physio-feature-flags-service:latest` | 3079 |
| `ai-gateway-service` | `ordella-physio-ai-gateway-service` | `ordella-physio-ai-gateway-service:latest` | 3080 |
| `ai-cost-service` | `ordella-physio-ai-cost-service` | `ordella-physio-ai-cost-service:latest` | 3081 |
| `ai-security-service` | `ordella-physio-ai-security-service` | `ordella-physio-ai-security-service:latest` | 3082 |
| `ai-observability-service` | `ordella-physio-ai-observability-service` | `ordella-physio-ai-observability-service:latest` | 3083 |
| `ai-agents-service` | `ordella-physio-ai-agents-service` | `ordella-physio-ai-agents-service:latest` | 3084 |

### Security & observability (8)

| Compose service | Container name | Image | Host port |
|-----------------|----------------|-------|-----------|
| `clamav` | `ordella-physio-clamav` | `clamav/clamav:latest` | 3310 |
| `loki` | `ordella-physio-loki` | `grafana/loki:2.9.4` | 3100 |
| `promtail` | `ordella-physio-promtail` | `grafana/promtail:2.9.4` | — |
| `grafana` | `ordella-physio-grafana` | `grafana/grafana:10.4.2` | 3030 |
| `prometheus` | `ordella-physio-prometheus` | `prom/prometheus:v2.51.2` | 9090 |
| `alertmanager` | `ordella-physio-alertmanager` | `prom/alertmanager:v0.27.0` | 9093 |
| `tempo` | `ordella-physio-tempo` | `grafana/tempo:2.4.1` | 3200 |

### Image count summary

| Stack | Built images (`ordella-physio-*:latest`) | Third-party images | Total containers |
|-------|------------------------------------------|--------------------|------------------|
| Dev default | 21 | 4 (postgres, redis, nats, clamav) | **25** |
| Dev + clinic-backend profile | 22 | 6 (+ postgres:16, node:22-alpine) | **28** |
| Full | 35 | 11 | **46** |

---

## Commands — dev stack (recommended)

### Start everything

```powershell
docker compose -f docker-compose.dev.yml up -d
```

Start **and** build images (first run or after Dockerfile changes):

```powershell
docker compose -f docker-compose.dev.yml up -d --build
```

Helper script (creates `.env.local`, starts stack, runs migrations):

```powershell
bash infrastructure/deployment-layer/scripts/deploy-local.sh
```

Run DB migrations and demo seeds after start:

```powershell
pnpm db:migrate:local
```

Migrations only (skip seeds):

```powershell
node infrastructure/deployment-layer/scripts/migrate-local-databases.mjs --skip-seed
```

Seeds only (stack must be up; idempotent):

```powershell
pnpm db:seed:local
```

### Stop everything

```powershell
docker compose -f docker-compose.dev.yml down
```

Stop and remove volumes (destructive — wipes local DB data):

```powershell
docker compose -f docker-compose.dev.yml down -v
```

### Restart everything (reload running containers)

```powershell
docker compose -f docker-compose.dev.yml restart
```

Recreate containers without rebuilding images (picks up compose env changes):

```powershell
docker compose -f docker-compose.dev.yml up -d --force-recreate
```

### Rebuild everything

Build all images:

```powershell
docker compose -f docker-compose.dev.yml build
```

Rebuild from scratch (no cache):

```powershell
docker compose -f docker-compose.dev.yml build --no-cache
```

Rebuild **and** restart all services:

```powershell
docker compose -f docker-compose.dev.yml up -d --build --force-recreate
```

### Rebuild / restart a single service

```powershell
docker compose -f docker-compose.dev.yml build billing-service
docker compose -f docker-compose.dev.yml up -d --no-deps --force-recreate billing-service
```

```powershell
docker compose -f docker-compose.dev.yml restart billing-service
```

> **Prefer targeted rebuilds** over `build --no-cache` on the whole stack. See [Build hygiene](#build-hygiene-targeted-rebuilds) below.

### Logs

```powershell
docker compose -f docker-compose.dev.yml logs -f
docker compose -f docker-compose.dev.yml logs -f api-gateway
docker compose -f docker-compose.dev.yml logs -f frontend --tail 100
```

### Status

```powershell
docker compose -f docker-compose.dev.yml ps
docker ps --filter "name=ordella-physio" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

---

## Commands — full stack

### Start everything

```powershell
docker compose -f docker-compose.yml up -d --build
```

Migrations (uses `postgres` service name):

```powershell
$env:COMPOSE_FILE = "docker-compose.yml"
node infrastructure/deployment-layer/scripts/migrate-local-databases.mjs
```

### Stop / restart / rebuild

```powershell
docker compose -f docker-compose.yml down
docker compose -f docker-compose.yml restart
docker compose -f docker-compose.yml build
docker compose -f docker-compose.yml up -d --build --force-recreate
```

### Rebuild frontend only (avoids rebuilding all 35 app images)

```powershell
docker compose -f docker-compose.yml build frontend-web
docker compose -f docker-compose.yml up -d --no-deps --force-recreate frontend-web
```

### Logs & status

```powershell
docker compose -f docker-compose.yml logs -f
docker compose -f docker-compose.yml ps
```

---

## Build hygiene (targeted rebuilds)

**Rule:** After code changes, rebuild **only the services that bundle that code**, then recreate those containers. A full `build --no-cache` across 25 services is rarely needed and costs 10–30+ minutes on Windows.

### When `restart` is enough

| Change | Action |
|--------|--------|
| `docker-compose.dev.yml` env vars only | `up -d --no-deps --force-recreate <svc>` |
| Runtime config in mounted `.env` (no image change) | `restart <svc>` |

### When you must `build` + `up --force-recreate`

| Change location | Rebuild these dev services |
|-----------------|---------------------------|
| `apps/frontend-web/**` | `frontend` |
| `services/api-gateway/**` | `api-gateway` |
| `packages/security/**`, `packages/middleware/**`, `packages/config/**` | Every service that imports `@ordella/security` (see table below) |
| `services/auth-service/**` (dev: **core-service**) | `core-service` |
| `services/<name>-service/**` | That compose service name (e.g. `enterprise-service`) |
| Prisma schema in a service | That service (image runs `prisma migrate deploy` on start) |

### Shared-package rebuild matrix (dev compose)

Changes under `packages/security` (RBAC, JWT helpers, guards) affect JWT validation and permission checks in many Nest services. Minimum set after RBAC edits:

| If you changed… | Rebuild at least |
|-----------------|------------------|
| Platform permissions / `resolvePermissions` | `core-service` (issues JWTs) **and** any service returning 403 "Missing required permission" |
| `PermissionGuard` / guards only | Services that enforce the permission (e.g. `enterprise-service`, `billing-service`) |
| Gateway routes / proxy | `api-gateway` |
| BFF / Next API routes | `frontend` |

**Example (enterprise SSO 403 after RBAC fix):**

```powershell
docker compose -f docker-compose.dev.yml build core-service enterprise-service
docker compose -f docker-compose.dev.yml up -d --no-deps --force-recreate core-service enterprise-service
```

Users must **log in again** after `core-service` rebuild so access tokens pick up new `resolvedPermissions`.

### Dev compose service name map

| Folder | Dev compose service | Container |
|--------|---------------------|-----------|
| `services/auth-service` | `core-service` | `ordella-physio-core-service` |
| `services/frontend-web` (app) | `frontend` | `ordella-physio-frontend` |

Do not run `docker compose build auth-service` on the dev stack — that service name does not exist in `docker-compose.dev.yml`.

### Stale-image symptoms

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| 403 "Missing required permission" after RBAC source change | Container still bundles old `@ordella/security` | Rebuild affected service + `core-service`; re-login |
| 502 on a route whose service is in compose | Container not running or crash-loop | `logs -f <svc>`; rebuild if Prisma/binary mismatch |
| UI shows old behavior after frontend fix | `frontend` image not rebuilt | `build frontend` + `up -d --no-deps --force-recreate frontend` |
| `/ready` returns 401/400 | Stale `api-gateway` or downstream image | Rebuild `api-gateway` and the target service |

`restart` alone **does not** pick up TypeScript or Dockerfile changes — you need `build`.

### Windows notes

- Quote paths with spaces: `cd "d:\Exclusive projects\ordella-physio"`.
- Use `docker compose -f docker-compose.dev.yml` (not the full `docker-compose.yml`) for daily dev.
- Host seeds (`pnpm db:seed:local`) are preferred over `docker compose run <svc> prisma db seed` — prod images often lack `prisma/schema.prisma` at the expected path.
- Long builds: rebuild one service at a time; avoid piping `build` to `Select-Object -Last N` if you need the full error log.

### Probe scripts (verify without manual UI)

```powershell
node infrastructure/developer-tooling-layer/scripts/_probe-phase12.mjs
node infrastructure/developer-tooling-layer/scripts/_probe-bl-d-5-enterprise-plan.mjs
```

### Avoid

| Anti-pattern | Why |
|--------------|-----|
| `docker compose build --no-cache` on entire dev stack | Slow; rarely needed |
| Mixing dev + full stack at once | Orphan containers; `db` vs `postgres` hostname clash |
| Rebuilding all services after a one-line frontend change | Wastes time |
| Seeding via `docker compose run` inside service containers | Prisma schema path failures; use `pnpm db:seed:local` |

---

## Cleanup & maintenance

### Weekly Docker cleanup (safe prune)

```powershell
bash scripts/docker-clean.sh
```

Audit non-compliant container/network names:

```powershell
node scripts/docker/audit-orphans.mjs
node scripts/docker/audit-orphans.mjs --prune
```

### Remove orphan containers from mixed stacks

```powershell
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.yml down
docker ps -a --filter "name=ordella"
# docker stop <name> && docker rm <name>   # only for leftovers you recognize
```

### Regenerate Dockerfiles / .dockerignore (after template changes)

```powershell
node scripts/docker/sync-dockerfiles.mjs
node scripts/docker/sync-dockerignore.mjs
```

---

## Platform address lookup (Postcoder / Ideal Postcodes)

Address autocomplete is **platform-wide** (not per clinic). Credentials live in **auth-service** (`core-service`), encrypted at rest. Only **Super Admin** can manage vendors.

| Concern | Where |
|---------|--------|
| Admin UI | http://localhost:3010/super-admin/settings/integrations |
| Encrypted storage | `ordella_auth.platform_integrations` + `platform_runtime_state` |
| BFF routes | `/api/address/config`, `/api/address/suggest`, `/api/address/resolve` |
| No active vendor | Manual address entry only (lookup field hidden) |

### First-time setup (dev stack)

1. Run migrations (includes platform integration tables):

```powershell
node infrastructure/deployment-layer/scripts/migrate-local-databases.mjs
```

2. Rebuild services that changed:

```powershell
docker compose -f docker-compose.dev.yml build core-service frontend
docker compose -f docker-compose.dev.yml up -d --force-recreate core-service frontend
```

3. Log in as super admin → **Settings → Manage address vendors** → pick a provider card → add **Ideal Postcodes** (recommended) or Postcoder profile → **Test connection** → **Activate**.

4. `core-service` needs `PLATFORM_SECRETS_ENCRYPTION_KEY` (32+ chars) — set in compose or `.env`.

### Test connection

| Action | Where |
|--------|--------|
| Test saved profile | **Integrations** → **Test connection** on a profile row |
| Test before save | **Test key before save** on the add-profile form |
| API (super admin) | `POST /auth/platform/integrations/address-lookup/:id/test` or `POST .../address-lookup/test` with `{ vendor, apiKey }` |

Tests run a lightweight Ireland address search against the vendor API and return connected / not connected with a message. Results are not stored in the database.

### Optional env fallback (local dev only)

If the DB has no active vendor, you can set on `frontend`:

```env
ADDRESS_LOOKUP_PROVIDER=ideal_postcodes   # or postcoder
ADDRESS_LOOKUP_API_KEY=ak_...
```

Production should use the Super Admin integrations UI, not env vars.

### Vendor billing models

| Vendor | Suggest | Billable event |
|--------|---------|----------------|
| **Ideal Postcodes** | Free | User **selects** an address (resolve) |
| **Postcoder** | Per request | Each search call |

---

## Quick reference card

| Action | Dev stack | Full stack |
|--------|-----------|------------|
| **Start** | `docker compose -f docker-compose.dev.yml up -d` | `docker compose -f docker-compose.yml up -d` |
| **Start + build** | `docker compose -f docker-compose.dev.yml up -d --build` | `docker compose -f docker-compose.yml up -d --build` |
| **Stop** | `docker compose -f docker-compose.dev.yml down` | `docker compose -f docker-compose.yml down` |
| **Restart all** | `docker compose -f docker-compose.dev.yml restart` | `docker compose -f docker-compose.yml restart` |
| **Rebuild all** | `docker compose -f docker-compose.dev.yml build` then `up -d --force-recreate` | `docker compose -f docker-compose.yml build` then `up -d --force-recreate` |
| **Rebuild one** | `build <svc>` then `up -d --no-deps --force-recreate <svc>` | same pattern |
| **Logs** | `docker compose -f docker-compose.dev.yml logs -f` | `docker compose -f docker-compose.yml logs -f` |
| **Migrations** | `node infrastructure/deployment-layer/scripts/migrate-local-databases.mjs` | `$env:COMPOSE_FILE="docker-compose.yml"; node ...` |

---

## Bash equivalents (Git Bash / WSL / macOS)

```bash
cd "$(git rev-parse --show-toplevel)"

# Dev — start / stop / restart / rebuild
docker compose -f docker-compose.dev.yml up -d --build
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.dev.yml restart
docker compose -f docker-compose.dev.yml build --no-cache
docker compose -f docker-compose.dev.yml up -d --build --force-recreate

# Full stack
docker compose -f docker-compose.yml up -d --build
COMPOSE_FILE=docker-compose.yml node infrastructure/deployment-layer/scripts/migrate-local-databases.mjs
```

---

*Last updated: 2026-06-23*
