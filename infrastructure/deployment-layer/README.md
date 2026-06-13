# Ordella Physio — Deployment Layer

Production-ready deployment scaffolding for the **ordella-physio** monorepo. Supports local development via Docker Compose and staging/production via Kubernetes + Kustomize.

## Structure

```
infrastructure/deployment-layer/
├── docker-compose.full.yml       # Source template for full stack (repo root docker-compose.yml)
├── k8s/
│   ├── base/                     # Shared Kubernetes manifests
│   └── overlays/
│       ├── staging/
│       └── production/
├── scripts/                      # Deployment helpers
├── .env.local.example
├── .env.staging.example
└── .env.production.example
```

## Service Ports

| Service               | Port |
|-----------------------|------|
| api-gateway           | 3049 |
| auth-service          | 3051 |
| tenant-service        | 3052 |
| patient-service       | 3053 |
| appointment-service   | 3054 |
| notes-service         | 3055 |
| billing-service       | 3056 |
| payment-service       | 3057 |
| communication-service | 3058 |
| reporting-service     | 3059 |
| event-bus-service     | 3060 |
| messaging-service     | 3061 |
| notification-service  | 3062 |
| ai-notes-service      | 3063 |
| ai-service            | 3075 |
| ai-training-service   | 3076 |
| frontend-web          | 3010 |

## Local Development (Docker Compose)

### Prerequisites

- Docker Desktop or Docker Engine + Compose v2
- Monorepo built at least once (`pnpm install && pnpm build`)

### Quick Start

```bash
# From repository root
cp infrastructure/deployment-layer/.env.local.example infrastructure/deployment-layer/.env.local

# Lightweight dev (recommended)
./infrastructure/deployment-layer/scripts/deploy-local.sh
# or
docker compose -f docker-compose.dev.yml up -d

# Full stack (all microservices)
docker compose up -d
```

See [docs/docker-rules.md](../../docs/docker-rules.md) for Docker standards.

### Endpoints

| Service        | URL                          |
|----------------|------------------------------|
| API Gateway    | http://localhost:3049        |
| Frontend Web   | http://localhost:3010        |
| Traefik        | http://localhost:80          |
| Grafana        | http://localhost:3030        |
| Prometheus     | http://localhost:9090        |
| Loki           | http://localhost:3100        |

### Stop / Reset

```bash
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.dev.yml down -v   # remove dev volumes
```

## Staging Deployment (Kubernetes)

### Prerequisites

- `kubectl` configured for staging cluster
- Container images pushed to registry (see [Build & Push](#build--push-images))
- Ingress controller (NGINX or Traefik) installed
- External secret manager configured (recommended)

### Deploy

```bash
cd infrastructure/deployment-layer

cp .env.staging.example .env.staging   # reference only — secrets via K8s

./scripts/deploy-staging.sh
# or
kubectl apply -k k8s/overlays/staging
```

### Staging Hostnames

- API: `https://api.staging.ordella-physio.com`
- App: `https://app.staging.ordella-physio.com`

### Verify

```bash
kubectl get pods -n ordella-staging
kubectl get svc -n ordella-staging
kubectl get ingress -n ordella-staging
kubectl rollout status deployment/api-gateway -n ordella-staging
```

## Production Deployment (Kubernetes)

### Deploy

```bash
cd infrastructure/deployment-layer

./scripts/deploy-production.sh
# or
kubectl apply -k k8s/overlays/production
```

Production overlay scales `api-gateway` and `frontend-web` to 3 replicas.

### Production Hostnames

- API: `https://api.ordella-physio.com`
- App: `https://app.ordella-physio.com`

## Build & Push Images

```bash
# Staging (default)
./scripts/build-and-push-images.sh staging

# Production
CONTAINER_REGISTRY=ghcr.io/ordella ./scripts/build-and-push-images.sh production
```

Images are tagged with `{environment}-{git-sha}` and `{environment}`.

Update `k8s/overlays/<env>/kustomization.yaml` `images` section to pin specific tags.

## Secret Management

**Do not commit real secrets.** Base manifests include placeholder `secret-global.yaml` values only.

Recommended approaches:

1. **External Secrets Operator** — sync from Vault, AWS Secrets Manager, or GCP Secret Manager
2. **Sealed Secrets** — encrypt secrets for GitOps workflows
3. **CI/CD injection** — populate secrets at deploy time via pipeline

Replace placeholders in overlay secret files before first deploy, or wire an external secret controller.

Sensitive keys:

- `JWT_SECRET` / `JWT_ACCESS_SECRET`
- `DATABASE_URL` (per-service in production)
- `REDIS_PASSWORD`
- `EMAIL_PROVIDER_API_KEY`
- `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET`

## Scaling Services

```bash
# Scale a deployment manually
kubectl scale deployment api-gateway --replicas=5 -n ordella-production

# Check HPA (add HorizontalPodAutoscaler manifests as needed)
kubectl get hpa -n ordella-production
```

Edit `k8s/overlays/production/kustomization.yaml` `replicas` block for declarative scaling.

## Rollback

```bash
# View rollout history
kubectl rollout history deployment/api-gateway -n ordella-production

# Roll back to previous revision
kubectl rollout undo deployment/api-gateway -n ordella-production

# Roll back to specific revision
kubectl rollout undo deployment/api-gateway --to-revision=2 -n ordella-production
```

## Kustomize Helper

```bash
./scripts/kubectl-apply-all.sh staging
./scripts/kubectl-apply-all.sh production
./scripts/kubectl-apply-all.sh base

# Preview rendered manifests
kubectl kustomize k8s/overlays/staging
```

## Observability

The deployment layer includes scaffold manifests for:

- **Prometheus** — metrics collection
- **Grafana** — dashboards
- **Loki + Promtail** — log aggregation
- **Tempo** — distributed tracing
- **Alertmanager** — alert routing

Mount production config files from `infrastructure/global-metrics-monitoring-layer` and `infrastructure/global-logging-layer` when hardening for real clusters.

## Notes

- Postgres and NATS are included in root `docker-compose.yml` as required dependencies; add managed DB/messaging for K8s production.
- Health probes use `/health` — align probe paths if services expose different endpoints.
- Ingress annotations assume NGINX; switch to Traefik annotations if using the gateway-load-balancer Traefik deployment instead.
