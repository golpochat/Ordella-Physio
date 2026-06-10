# Global Logging Layer

Centralized, multi-tenant, distributed logging for the **ordella-physio** cluster using **Loki** (log store), **Promtail** (log shipper), and **Grafana** (log explorer).

## Quick start

```bash
cd infrastructure/global-logging-layer

# Ensure the shared Docker network exists
# docker compose -f ../../infrastructure/deployment-layer/docker-compose.local.yml up -d

docker compose up -d
```

| Service | URL | Purpose |
|---------|-----|---------|
| Grafana | http://localhost:3030 | Log explorer & dashboards |
| Loki | http://localhost:3100 | Log ingestion & query API |
| Promtail | http://localhost:9080 | Shipper metrics / health |

Default Grafana credentials: `admin` / value of `GRAFANA_ADMIN_PASSWORD` in `.env`.

## Architecture

```
Microservices (JSON logs) → Docker stdout → Promtail → Loki → Grafana
                              ↑
                    correlationId, tenantId, service labels
```

## How microservices should log

Emit **structured JSON** to stdout so Promtail pipelines can parse and label logs:

```json
{
  "time": "2026-06-10T12:00:00.000Z",
  "level": "info",
  "message": "Patient created",
  "service": "patient-service",
  "tenantId": "tenant_abc123",
  "correlationId": "550e8400-e29b-41d4-a716-446655440000"
}
```

Ordella services using `@ordella/observability` should include `correlationId` on every request log. Pass the same ID through:

- API Gateway → downstream HTTP calls
- NATS event bus messages
- Background jobs / queue workers

### Recommended labels

| Label | Source |
|-------|--------|
| `service` | Microservice name |
| `tenantId` | Tenant context |
| `correlationId` | Request / event trace ID |
| `level` | `error`, `warn`, `info`, `debug` |
| `container` | Docker container (auto) |
| `router` | Traefik router (auto, if labeled) |

## Query logs in Grafana

1. Open http://localhost:3030
2. Go to **Explore** → datasource **Loki**
3. Example LogQL queries:

```logql
# All errors in the last hour
{cluster="ordella-physio", level="error"}

# Logs for a specific service
{service="billing-service"} | json

# Tenant-isolated view
{tenantId="tenant_abc123"} | json

# Correlation ID drill-down
{correlationId="550e8400-e29b-41d4-a716-446655440000"} | json

# API Gateway errors with JSON parsing
{service="api-gateway", level="error"} | json | line_format "{{.message}}"
```

## Correlation ID tracing

1. Open dashboard **Correlation ID Explorer**
2. Paste a `correlationId` from any log line or HTTP response header (`X-Correlation-Id`)
3. View chronological logs across all services that handled the request

End-to-end path typically includes: `api-gateway` → domain service → `event-bus-service` → async workers.

## Provisioned dashboards

| Dashboard | File | Purpose |
|-----------|------|---------|
| Logs Overview | `logs-overview.json` | Volume, errors, real-time stream, tenant filter |
| Per-Service Logs | `service-logs.json` | Service selector, level filter, error panel |
| Correlation ID Explorer | `correlation-id-tracing.json` | Cross-service trace drill-down |

Dashboards are auto-loaded from `grafana/dashboards/` via provisioning.

## Configuration

| File | Purpose |
|------|---------|
| `loki/loki-config.yml` | Storage, retention (30d), limits, compactor |
| `loki/rules/alert-rules.yml` | Loki ruler alert placeholders |
| `promtail/promtail-config.yml` | Docker log scraping, JSON pipelines, labels |
| `grafana/provisioning/` | Loki datasource + dashboard provisioning |

### Retention & storage

- **Retention:** 30 days (`720h`)
- **Index:** BoltDB Shipper, schema v13, 24h index period
- **Object store:** filesystem under `/loki` volume
- **Compaction:** enabled via compactor

### Promtail jobs

| Job | Source |
|-----|--------|
| `docker-logs` | `/var/lib/docker/containers/*/*-json.log` |
| `microservices` | Docker service discovery via socket |

Pipeline stages: JSON parse → timestamp → label extraction → multiline support.

## Adding a new dashboard

1. Create `grafana/dashboards/my-dashboard.json` (export from Grafana UI or copy an existing file)
2. Set a unique `"uid"` in the JSON
3. Restart Grafana: `docker compose restart grafana`
4. Dashboard appears under folder **Ordella Logging**

## Alert rules

Placeholder rules in `loki/rules/alert-rules.yml`:

- `HighErrorLogRate`
- `ServiceLogSilence`
- `TenantErrorSpike`

Wire to Alertmanager in production by updating `ruler.alertmanager_url` in `loki-config.yml`.

## Health checks

```bash
curl http://localhost:3100/ready
curl http://localhost:9080/ready
```

## Stop / remove

```bash
docker compose down        # keep volumes
docker compose down -v     # remove loki-data and grafana-data
```

## Platform notes

- **Promtail** mounts the Docker socket and container log directory (Linux). On Docker Desktop (Windows/Mac), paths are forwarded by the Docker VM — ensure containers run on the same Docker host.
- Pin images: Loki/Promtail `2.9.4` (BoltDB shipper config). Upgrade to Loki 3.x + TSDB when migrating storage schema.
- Joins network `ordella_physio_backend` to scrape logs from ordella compose services.
