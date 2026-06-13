# Docker Rulebook — Strict Project Standards

**Project:** ordella-physio  
**Applies to:** all developers, all services, all environments, all future microservices, and Cursor AI when generating Docker-related code.

---

## 1. PURPOSE

These rules ensure:

- No unnecessary containers are created
- No unnecessary images are created
- No random networks or volumes are created
- All services follow strict naming conventions
- All Dockerfiles follow the same structure
- All compose files follow the same structure
- Local development remains lightweight and fast
- Docker stays clean, predictable, and consistent

This rulebook applies to:

- All developers
- All services
- All environments
- All future microservices
- Cursor AI when generating new code

---

## 2. NAMING CONVENTIONS (MANDATORY)

All names **MUST** follow this pattern:

| Resource | Pattern | Example |
|----------|---------|---------|
| Container | `projectname-servicename` | `ordella-physio-api-gateway` |
| Image (dev) | `projectname-servicename:dev` | `ordella-physio-api-gateway:dev` |
| Image (full stack) | `projectname-servicename:latest` | `ordella-physio-api-gateway:latest` |
| Network | `projectname-network` | `ordella-physio-network` |
| Volume | `projectname-volumename` | `ordella-db-data` |

**Examples:**

- `ordella-physio-api-gateway`
- `ordella-physio-core-service`
- `ordella-physio-frontend`
- `ordella-physio-network`

Third-party images (Postgres, Redis, NATS, etc.) keep upstream tags but **must** use `ordella-physio-*` container names.

**Random names are strictly forbidden**, for example:

- `xg7s9d8f9sdf`
- `hopeful_mclean`
- `quirky_babbage`
- Any compose-generated name without an explicit `container_name`

---

## 3. DOCKERFILE RULES (MANDATORY)

Every service **MUST** use the multi-stage Dockerfile template:

| Stage | Purpose |
|-------|---------|
| **base** | Install dependencies once |
| **build** | Compile TypeScript or build frontend assets |
| **production** | Minimal runtime image only |

**Requirements:**

- Use `node:18-alpine` or similar lightweight base
- Do **not** copy `node_modules` from the host
- Do **not** copy the entire project into the production stage
- Do **not** leave build cache or dev artifacts in the final image
- Final image must be **< 400 MB**

**Regenerate all Dockerfiles** after template changes:

```bash
node scripts/docker/sync-dockerfiles.mjs
```

Build context for this monorepo is always the **repository root** (`./`), with service-specific paths such as `services/<name>/Dockerfile`.

---

## 4. .dockerignore RULES (MANDATORY)

Every service and app directory **MUST** include the standard `.dockerignore`. The repo root `.dockerignore` is authoritative for compose builds.

**Must ignore:**

- `node_modules`
- `dist` / `build`
- `logs` and `*.log`
- `.env`, `.env.local`, `.env.*.local`
- Editor files (`.vscode`, `.idea`)
- OS files (`.DS_Store`, `Thumbs.db`)
- Git (`.git`, `.gitignore`)
- Cache (`.cache`, `.npm`, `.pnpm-store`, `.eslintcache`)
- Docker metadata (`Dockerfile`, `docker-compose.yml`, `docker-compose.dev.yml`)

This prevents bloated images and unnecessary rebuilds.

**Regenerate all `.dockerignore` files:**

```bash
node scripts/docker/sync-dockerignore.mjs
```

---

## 5. COMPOSE RULES (MANDATORY)

### `docker-compose.dev.yml`

**MUST:**

- Run only essential services (see §6)
- Comment out optional services by default
- Use strict naming conventions (§2)
- Use a **single** shared network: `ordella-physio-network`
- Use named volumes only when required (e.g. `ordella-db-data`)
- Never rely on auto-created random networks
- Never rely on auto-created random container names

**MUST NOT:**

- Start the full production stack for daily dev
- Create per-service compose files under `services/` or `apps/`

### `docker-compose.yml`

**MUST:**

- Follow the same structure and naming as dev compose
- Avoid duplication of network/volume definitions
- Declare explicit `container_name` and `image` for every built service
- Use `ordella-physio-network` only — no extra bridge networks

**MUST NOT:**

- Include unnecessary services without clear purpose
- Use unnamed or default Docker networks

Always run compose from the **repository root**:

```bash
docker compose -f docker-compose.dev.yml up -d   # daily dev
docker compose up -d                             # full stack (rare)
```

---

## 6. LOCAL DEVELOPMENT RULES

The local dev environment **MUST**:

- Run only essential services:
  - **frontend** (`ordella-physio-frontend`)
  - **api-gateway** (`ordella-physio-api-gateway`)
  - **1–3 core backend services** (e.g. `ordella-physio-core-service` / auth)
  - **db** (`ordella-physio-db`)
  - **redis** (`ordella-physio-redis`)
- **NOT** run heavy or optional services unless explicitly uncommented in `docker-compose.dev.yml`
- **NOT** run the full production stack locally for routine work

Optional services (tenant, patient, search, notifications, NATS, observability, etc.) stay **commented out** in `docker-compose.dev.yml` until needed.

**Dev URLs:**

- Frontend: http://localhost:3010
- API gateway: http://localhost:3049

---

## 7. BUILD RULES

You **MUST NOT** run:

```bash
docker compose up --build
```

**Unless:**

- A `Dockerfile` changed
- Dependencies changed (`package.json`, `pnpm-lock.yaml`, workspace packages)

**Normal development MUST use:**

```bash
docker compose -f docker-compose.dev.yml up -d
```

Rebuild a **single** service when needed:

```bash
docker compose -f docker-compose.dev.yml build core-service
docker compose -f docker-compose.dev.yml up -d core-service
```

| Change | Action |
|--------|--------|
| Application source only | Host `pnpm dev` or restart container — **no** rebuild |
| `Dockerfile` / `.dockerignore` | `docker compose … build <service>` |
| Lockfile / workspace deps | Rebuild affected services |
| Compose env vars only | `docker compose … up -d` (no `--build`) |

---

## 8. CLEANUP RULES

Developers **MUST** run the cleanup script **weekly** (or after heavy Docker usage):

```bash
./scripts/docker-clean.sh
node scripts/docker/audit-orphans.mjs        # list non-compliant resources
node scripts/docker/audit-orphans.mjs --prune # audit + remove stopped orphans + run cleanup
```

This prevents:

- Image bloat
- Container bloat
- Network bloat
- Volume bloat
- Build cache bloat

The script safely removes **unused** resources only:

- `docker container prune -f`
- `docker image prune -f`
- `docker volume prune -f`
- `docker network prune -f`
- `docker builder prune -f`

Stop stacks first for a fuller cleanup:

```bash
docker compose -f docker-compose.dev.yml down
./scripts/docker-clean.sh
```

---

## 9. FORBIDDEN ACTIONS

The following are **NOT allowed**:

- Running 20–30 services locally for routine development
- Creating random networks (`docker network create …` outside compose)
- Creating random containers (`docker run` without strict naming)
- Using `docker compose up --build` unnecessarily
- Copying `node_modules` from the host into images
- Using large base images when Alpine suffices
- Creating inconsistent Dockerfiles per service
- Creating inconsistent or duplicate compose files
- Per-service `docker-compose.yml` files under `services/` or `apps/`
- `COPY . .` into production stages without multi-stage separation

---

## 10. ACCEPTANCE CRITERIA

The project is considered **Docker-compliant** when:

- [ ] All services follow strict naming (§2)
- [ ] All Dockerfiles follow the multi-stage template (§3)
- [ ] All `.dockerignore` files match the standard (§4)
- [ ] `docker-compose.dev.yml` is lightweight and clean (§5–§6)
- [ ] No unnecessary containers are created
- [ ] No unnecessary images are created
- [ ] No random networks or volumes exist
- [ ] Docker remains clean and predictable
- [ ] Developers run `scripts/docker-clean.sh` regularly (§8)
- [ ] Cursor and other tooling follow these rules automatically

---

## Reference — project files

| File | Role |
|------|------|
| `docker-compose.dev.yml` | Lightweight daily dev stack |
| `docker-compose.yml` | Full local stack (all microservices + observability) |
| `scripts/docker-clean.sh` | Weekly cleanup script |
| `scripts/docker/sync-dockerfiles.mjs` | Regenerate multi-stage Dockerfiles |
| `scripts/docker/sync-dockerignore.mjs` | Regenerate standard `.dockerignore` files |
| `scripts/docker/audit-orphans.mjs` | List/prune Docker resources violating naming rules |
| `infrastructure/deployment-layer/docker-compose.full.yml` | Source for full-stack compose regeneration |

Deployment-specific compose under `deploy/` and `infrastructure/` is allowed for staging/production only and must still follow naming conventions where applicable.
