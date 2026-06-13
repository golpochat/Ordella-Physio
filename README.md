# Ordella Physio / Sheba360

Multi-tenant physiotherapy platform with a full **Sheba360 AI** stack — NestJS microservices, API gateway, Next.js portals, Docker Compose, and tenant-aware auth.

## Sheba360 AI Platform

| Layer | Service | Port |
|-------|---------|------|
| Core inference & workflows | `ai-service` | 3075 |
| Training | `ai-training-service` | 3076 |
| Drift monitoring | `ai-monitoring-service` | 3077 |
| Deployment | `ai-deploy-service` | 3078 |
| Feature flags & A/B | `feature-flags-service` | 3079 |
| API gateway & rate limits | `ai-gateway-service` | 3080 |
| Cost & budgets | `ai-cost-service` | 3081 |
| Security & compliance | `ai-security-service` | 3082 |
| Observability & telemetry | `ai-observability-service` | 3083 |
| **Agents & tooling** | **`ai-agents-service`** | **3084** |

### AI Agents (3084)

- Per-tenant agent definitions (model, system prompt, tools, max steps)
- Tool registry: HTTP, internal services, DB query, custom
- Multi-step orchestration with full run logging
- Observability integration (traces + structured logs per step)

**Admin UI:** `/admin/ai/agents`  
**Clinic UI:** `/clinic/ai/agents`

## Local development

```bash
# Lightweight dev stack (recommended)
docker compose -f docker-compose.dev.yml up -d
node infrastructure/deployment-layer/scripts/migrate-local-databases.mjs

# Full stack (all microservices + observability)
docker compose up -d
node infrastructure/deployment-layer/scripts/migrate-local-databases.mjs
```

See [docs/docker-rules.md](docs/docker-rules.md) for Docker naming, rebuild, and cleanup rules.

Frontend: http://localhost:3010  
API gateway: http://localhost:3049

See [docs/ops-reference.md](docs/ops-reference.md) for operations, seeds, and service commands.
