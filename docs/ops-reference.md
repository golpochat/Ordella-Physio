# Ordella Physio — Operations Reference Guide

This document contains all essential operational commands for managing the entire Ordella Physio microservices ecosystem. It also includes sample test users for every role in the system.

> **Working directory:** Most local Docker commands assume you are in `infrastructure/deployment-layer`.

```bash
cd infrastructure/deployment-layer
```

---

# 1. Docker Service Management

## Start all services

```bash
cd infrastructure/deployment-layer
docker compose -f docker-compose.local.yml up -d --build
```

Or use the helper script:

```bash
./infrastructure/deployment-layer/scripts/deploy-local.sh
```

## Stop all services

```bash
cd infrastructure/deployment-layer
docker compose -f docker-compose.local.yml down
```

## Restart all services

```bash
cd infrastructure/deployment-layer
docker compose -f docker-compose.local.yml restart
```

## View logs for all services

```bash
cd infrastructure/deployment-layer
docker compose -f docker-compose.local.yml logs -f
```

## View logs for a specific service

```bash
cd infrastructure/deployment-layer
docker compose -f docker-compose.local.yml logs -f <service-name>
```

Example:

```bash
docker compose -f docker-compose.local.yml logs -f api-gateway
```

---

# 2. Build & Rebuild Commands

## Build all services

```bash
cd infrastructure/deployment-layer
docker compose -f docker-compose.local.yml build
```

## Rebuild all services (no cache)

```bash
cd infrastructure/deployment-layer
docker compose -f docker-compose.local.yml build --no-cache
```

## Rebuild + restart everything

```bash
cd infrastructure/deployment-layer
docker compose -f docker-compose.local.yml up -d --build --force-recreate
```

## Rebuild a single service

```bash
cd infrastructure/deployment-layer
docker compose -f docker-compose.local.yml build <service-name>
docker compose -f docker-compose.local.yml up -d --no-deps --force-recreate <service-name>
```

Example:

```bash
docker compose -f docker-compose.local.yml build auth-service
docker compose -f docker-compose.local.yml up -d --no-deps --force-recreate auth-service
```

## Restart a single service

```bash
cd infrastructure/deployment-layer
docker compose -f docker-compose.local.yml restart <service-name>
```

---

# 3. Database Commands

## Local Postgres (Windows note)

Docker Postgres is published on host port **5433** (not 5432) so it does not clash with a native Windows PostgreSQL install.

| Context | Connection |
|---------|------------|
| Inside Docker / `docker compose run` | `postgresql://physio:physio@postgres:5432/<db>?schema=public` |
| From host (psql, Prisma CLI, GUI) | `postgresql://physio:physio@localhost:5433/<db>?schema=public` |

Override the host port with `POSTGRES_HOST_PORT` in your shell or compose env.

## Run Prisma migrations for all services (recommended)

From the **repo root** (works on Windows, macOS, Linux):

```bash
pnpm db:migrate:local
```

Or directly:

```bash
node infrastructure/deployment-layer/scripts/migrate-local-databases.mjs
```

This starts Postgres if needed, waits until it is ready, then runs `prisma migrate deploy` inside each service container.

Manual loop (bash only):

```bash
cd infrastructure/deployment-layer
./scripts/migrate-local-databases.sh
```

## P3005 — database is not empty

If migrate reports that the schema exists but `_prisma_migrations` is missing, either reset volumes (`docker compose down -v` — **destroys data**) or apply the missing SQL manually, for example:

```bash
docker exec -i ordella_local_postgres psql -U physio -d ordella_auth -c \
  'ALTER TABLE users ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN NOT NULL DEFAULT true;'
```

Then re-run `pnpm db:migrate:local`.

## Reset all databases (DANGER)

This stops the stack and **removes all Docker volumes** (Postgres, Redis, NATS, observability data).

```bash
cd infrastructure/deployment-layer
docker compose -f docker-compose.local.yml down -v
docker compose -f docker-compose.local.yml up -d --build
```

Then re-run migrations (see above).

---

# 4. Sample Test Users (For QA & Development)

Below are sample users for every role in the system.  
These accounts are for **local/dev testing only**.

**Sign-in URL:** http://localhost:3010/login  
**Required tenant:** `demo-tenant` (pre-filled on the login form in local Docker)

Run the seed script in [section 5](#5-seed-script-instructions) before first use. Seeds are idempotent — safe to re-run.

| Portal label | Auth role | Email | Password |
|--------------|-----------|-------|----------|
| Super Admin | `SYSTEM` | superadmin@ordella.dev | SuperAdmin123! |
| Clinic Admin | `ADMIN` | clinicadmin@ordella.dev | ClinicAdmin123! |
| Therapist | `THERAPIST` | therapist@ordella.dev | Therapist123! |
| Staff | `STAFF` | staff@ordella.dev | Staff123! |
| Pharmacy | `PHARMACY` | pharmacy@ordella.dev | Pharmacy123! |
| Patient (Sample 1) | `PATIENT` | patient1@ordella.dev | Patient123! |
| Patient (Sample 2) | `PATIENT` | patient2@ordella.dev | Patient123! |

---

## Super Admin
- **Email:** superadmin@ordella.dev  
- **Password:** SuperAdmin123!  
- **Role:** `SYSTEM`  
- **Portal:** `/super-admin`

## Clinic Admin
- **Email:** clinicadmin@ordella.dev  
- **Password:** ClinicAdmin123!  
- **Role:** `ADMIN`  
- **Portal:** `/clinic`

## Therapist
- **Email:** therapist@ordella.dev  
- **Password:** Therapist123!  
- **Role:** `THERAPIST`  
- **Portal:** `/therapist`

## Staff
- **Email:** staff@ordella.dev  
- **Password:** Staff123!  
- **Role:** `STAFF`  
- **Portal:** `/staff`

## Pharmacy
- **Email:** pharmacy@ordella.dev  
- **Password:** Pharmacy123!  
- **Role:** `PHARMACY`  
- **Portal:** `/pharmacy`

## Patient (Sample 1)
- **Email:** patient1@ordella.dev  
- **Password:** Patient123!  
- **Role:** `PATIENT`  
- **Portal:** `/patient`

## Patient (Sample 2)
- **Email:** patient2@ordella.dev  
- **Password:** Patient123!  
- **Role:** `PATIENT`  
- **Portal:** `/patient`

---

# 5. Seed Script Instructions

Seeds create the `demo-tenant` clinic, all auth users above, staff records, and matching patient profiles.

### Seed everything (recommended)

Syncs the auth role enum, then seeds tenant, users, and patient records.

```bash
cd infrastructure/deployment-layer
./scripts/seed-dev-users.sh
```

### Seed step-by-step

```bash
cd infrastructure/deployment-layer

# 0. Ensure auth schema includes PATIENT + PHARMACY roles
docker compose -f docker-compose.local.yml run --rm --no-deps auth-service \
  sh -c "pnpm exec prisma db push --skip-generate"

# 1. Demo clinic + staff records
docker compose -f docker-compose.local.yml run --rm --no-deps tenant-service \
  sh -c "pnpm exec prisma db seed"

# 2. Auth users (all roles)
docker compose -f docker-compose.local.yml run --rm --no-deps auth-service \
  sh -c "pnpm exec prisma db seed"

# 3. Patient profiles (patient1 + patient2)
docker compose -f docker-compose.local.yml run --rm --no-deps patient-service \
  sh -c "pnpm exec prisma db seed"
```

### Seed source files

| Service | Seed file |
|---------|-----------|
| Auth users | `services/auth-service/prisma/seed.ts` |
| Demo tenant + staff | `services/tenant-service/prisma/seed.ts` |
| Patient records | `services/patient-service/prisma/seed.ts` |

After a full database reset (`docker compose down -v`), re-run migrations (section 3) then seed again.

The seed script restarts `auth-service` so the running container picks up the `PATIENT` and `PHARMACY` role enum. If you seed manually, run:

```bash
docker compose -f docker-compose.local.yml up -d --no-deps --force-recreate auth-service
```

---

# 6. Useful Docker Cleanup Commands

## Remove all containers

```bash
docker container prune -f
```

## Remove all images

```bash
docker image prune -a -f
```

## Remove all volumes

```bash
docker volume prune -f
```

## Remove everything (DANGER)

```bash
docker system prune -a --volumes -f
```

---

# 7. Multi-Region Deployment Commands (If applicable)

Run from `deploy/multi-region/`. Replace `CHANGE_ME` values in each `.env.*` file before production use.

## Start EU region

```bash
cd deploy/multi-region
docker compose --env-file .env.eu -f docker-compose.eu.yml up -d --build
```

## Start US region

```bash
cd deploy/multi-region
docker compose --env-file .env.us -f docker-compose.us.yml up -d --build
```

## Start APAC region

```bash
cd deploy/multi-region
docker compose --env-file .env.apac -f docker-compose.apac.yml up -d --build
```

Verify a region after deploy:

```bash
cd deploy/multi-region
./scripts/region-health-check.sh eu   # or us / apac
```

---

# End of File
