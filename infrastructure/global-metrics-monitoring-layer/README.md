# Global Metrics & Monitoring Layer

Centralized metrics, alerting, dashboards, and distributed tracing for the **ordella-physio** cluster using **Prometheus**, **Alertmanager**, **Grafana**, and **Tempo**.

## Quick start

```bash
cd infrastructure/global-metrics-monitoring-layer

# Ensure the shared Docker network exists
# docker compose -f ../../infrastructure/deployment-layer/docker-compose.local.yml up -d

docker compose up -d
```

| Service | URL | Purpose |
|---------|-----|---------|
| Grafana (metrics) | http://localhost:3031 | Dashboards & SLO views |
| Prometheus | http://localhost:9090 | Metrics store & query |
| Alertmanager | http://localhost:9093 | Alert routing |
| Tempo | http://localhost:3200 | Trace query API |
| OTLP HTTP | http://localhost:4318 | Trace ingestion |
| OTLP gRPC | localhost:4317 | Trace ingestion |

Default Grafana credentials: `admin` / `GRAFANA_ADMIN_PASSWORD` from `.env`.

> **Note:** Logging Grafana runs on port **3030** (`global-logging-layer`). This metrics Grafana uses **3031** to avoid conflicts.

## Architecture

```
Microservices (/metrics) ──► Prometheus ──► Grafana
                                │
                                ▼
                          Alertmanager ──► email (placeholder)

Microservices (OTLP) ──► Tempo ──► Grafana (traces ↔ metrics ↔ logs)
```

## How services expose metrics

Ordella services using `@ordella/observability` should expose a Prometheus endpoint at **`/metrics`** with standardized metric names:

| Metric | Type | Description |
|--------|------|-------------|
| `http_requests_total` | counter | Total HTTP requests (`service`, `method`, `status_code`, `tenantId`) |
| `http_requests_errors_total` | counter | Failed requests |
| `http_request_duration_seconds` | histogram | Request latency buckets |
| `event_bus_messages_total` | counter | Published/consumed events |
| `event_bus_consumer_lag` | gauge | NATS consumer lag |
| `process_cpu_seconds_total` | counter | Node.js process CPU |
| `process_resident_memory_bytes` | gauge | RSS memory |

### Example labels

```text
http_requests_total{service="patient-service", method="GET", status_code="200", tenantId="tenant_abc"}
```

## How to send traces (OTLP)

Configure `@ordella/observability` or OpenTelemetry SDK in each service:

```env
OTEL_EXPORTER_OTLP_ENDPOINT=http://ordella-tempo:4318
OTEL_SERVICE_NAME=patient-service
```

From the host:

```env
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
```

Propagate **`correlationId`** as a span attribute for cross-signal correlation with logs (Loki) and metrics (Prometheus exemplars).

## Prometheus scrape targets

Configured in `prometheus/prometheus.yml`:

| Job | Target | Notes |
|-----|--------|-------|
| api-gateway | `api-gateway:3049` | Per load-balancer spec |
| auth-service | `auth-service:3051` | |
| tenant → event-bus | `3052–3060` | All microservices |
| gateway-load-balancer | `traefik:8082` | Traefik metrics entrypoint |
| redis | `redis-exporter:9121` | Via redis-exporter sidecar |
| node-exporter | `node-exporter:9100` | Host metrics placeholder |

Align container ports with `infrastructure/deployment-layer` when deploying — update `prometheus.yml` if internal ports differ.

## Recording rules

`prometheus/rules/recording-rules.yml` pre-aggregates:

- `service:http_requests_total:rate1m`
- `service:http_request_errors_total:rate1m`
- `service:http_request_duration_seconds:p95` / `:p99`
- `service:http_error_rate:ratio1m`
- `service:process_cpu_seconds_total:rate5m`
- `service:process_resident_memory_bytes:avg`
- `service:event_bus_messages_total:rate1m`
- `service:event_bus_consumer_lag:max`

## Alerts

`prometheus/rules/alert-rules.yml`:

| Alert | Condition |
|-------|-----------|
| `HighErrorRate` | Error ratio > 5% for 5m |
| `HighLatencyP95` | P95 > 1s for 5m |
| `HighLatencyP99` | P99 > 2s for 5m |
| `ServiceDown` | `up == 0` for 2m |
| `RedisDown` | redis-exporter unreachable |
| `EventBusLagHigh` | Consumer lag > 1000 |
| `GatewayLoadBalancerDown` | Traefik metrics down |

Alertmanager routes by `service` with email placeholder to `alerts@example.com`.

## Dashboards

| Dashboard | UID | Focus |
|-----------|-----|-------|
| Service Overview | `ordella-service-overview` | Global health, error rate, latency, volume |
| API Gateway Metrics | `ordella-api-gateway-metrics` | Traffic, 4xx/5xx, upstream latency |
| Microservices Metrics | `ordella-microservices-metrics` | Per-service CPU, memory, rates |
| Infrastructure Metrics | `ordella-infra-metrics` | Redis, event bus, load balancer |
| Tracing Overview | `ordella-tracing-overview` | Tempo search, correlationId lookup |

## Interpreting key SLO panels

| Panel | Good | Investigate when |
|-------|------|------------------|
| Error Rate | < 1% | > 5% sustained (alert fires) |
| P95 Latency | < 300ms | > 1s sustained |
| Services Up | All green | Any service down > 2m |
| Event Bus Lag | Near 0 | > 1000 messages |
| Redis Memory | Stable trend | Sharp growth / OOM |

## Adding a new alert

1. Edit `prometheus/rules/alert-rules.yml`
2. Reload Prometheus: `curl -X POST http://localhost:9090/-/reload`
3. Verify in Alertmanager UI: http://localhost:9093

## Adding a new dashboard

1. Create JSON in `grafana/dashboards/`
2. Set unique `"uid"`
3. `docker compose restart grafana`

## Tempo retention

Traces retained for **48 hours** (`tempo/tempo.yml` → `block_retention: 48h`).

## Stop / remove

```bash
docker compose down        # keep volumes
docker compose down -v     # remove prometheus, grafana, tempo data
```

## Related infrastructure

| Layer | Port | Purpose |
|-------|------|---------|
| `global-logging-layer` | Grafana 3030, Loki 3100 | Logs |
| `global-caching-layer` | Redis 6379 | Cache / queues |
| `gateway-load-balancer` | 80/443 | Ingress |

Link Tempo → Loki in Grafana when both stacks run by adding a Loki datasource to this Grafana instance or use a unified Grafana in production.
