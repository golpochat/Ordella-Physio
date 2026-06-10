# Ordella Physio — System Readiness Certificate

**Document ID:** ORD-SRC-2026-001  
**Issue Date:** 2026-06-10  
**Status:** CERTIFIED — PRODUCTION READY  
**MTS Version:** 1.0 (Closed)

---

## System Readiness Declaration

This document certifies that the **Ordella Physio** platform has completed all 21 steps defined in the Master Tracking System (MTS). The platform is architecturally sound, fully deployed to staging and production environments, and ready for live clinical operations subject to organizational sign-off below.

The system meets the following readiness criteria:

- All backend microservices are implemented, containerized, and health-checked.
- The API Gateway routes all service traffic with tenant-aware middleware.
- The unified frontend (`apps/frontend-web`) delivers all role-based portals.
- End-to-end workflows are automated and validated.
- Staging and production deployment stacks are documented and operational.
- Tenant isolation and role-based access control are enforced at the gateway and service layers.
- Observability (metrics, logs, traces) is integrated across the stack.

---

## Summary of Completed MTS Steps

| Step | Deliverable | Status |
|------|-------------|--------|
| 1 | Backend microservices (11 services) | Complete |
| 2 | API Gateway | Complete |
| 3 | Docker Compose unification | Complete |
| 4 | Observability stack | Complete |
| 5 | Tenant-aware auth | Complete |
| 6 | Frontend dashboard scaffolding | Complete |
| 7 | Tenant selection on login/register | Complete |
| 8 | Role-based dashboards | Complete |
| 9 | Marketing website | Complete |
| 10 | Pricing page | Complete |
| 11 | Public landing site | Complete |
| 12 | Patient portal | Complete |
| 13 | Therapist portal | Complete |
| 14 | Clinic admin portal | Complete |
| 15 | Super admin portal | Complete |
| 16 | Pharmacy portal | Complete |
| 17 | Staff portal | Complete |
| 18 | User portal | Complete |
| 19 | Full E2E workflow automation | Complete |
| 20 | Staging deployment | Complete |
| 21 | Production deployment | Complete |

**Total:** 21 / 21 steps complete.

---

## Architecture Overview

Ordella Physio is a **Turborepo monorepo** (pnpm workspaces) comprising frontend applications, NestJS microservices, shared packages, and infrastructure tooling.

```
                         ┌──────────────────────────┐
                         │   Traefik (TLS / ACME)   │
                         └────────────┬─────────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              ▼                       ▼                       ▼
    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
    │  Frontend Web   │    │   API Gateway   │    │     Grafana     │
    │   (Next.js)     │    │    (NestJS)     │    │  Prometheus     │
    └────────┬────────┘    └────────┬────────┘    │  Loki / Tempo   │
             │                      │             └─────────────────┘
             │         ┌────────────┼────────────┐
             │         ▼            ▼            ▼
             │    auth-service  tenant-service  patient-service
             │    appointment   notes-service   billing-service
             │    payment       communication   reporting-service
             │    event-bus-service
             │         │            │            │
             └─────────┴────────────┴────────────┘
                           │            │
                    ┌──────┴──┐   ┌─────┴─────┐
                    │ Postgres │   │ NATS JS   │
                    │ (per-DB) │   │  Redis    │
                    └──────────┘   └───────────┘
```

### Backend Microservices

| Service | Port | Domain |
|---------|------|--------|
| api-gateway | 3049 | Routing, auth middleware, rate limiting |
| auth-service | 3051 | Authentication, JWT, refresh tokens |
| tenant-service | 3052 | Multi-tenant management |
| patient-service | 3053 | Patient records |
| appointment-service | 3054 | Scheduling |
| notes-service | 3055 | Clinical notes |
| billing-service | 3056 | Invoicing |
| payment-service | 3057 | Stripe payments |
| communication-service | 3058 | Email / SMS |
| reporting-service | 3059 | Analytics and exports |
| event-bus-service | 3060 | NATS JetStream events |

### Shared Packages

`@ordella/config`, `@ordella/security`, `@ordella/middleware`, `@ordella/observability`, `@ordella/shared`, `@ordella/ui`, `@ordella/validation`

---

## Deployment Overview

| Environment | Path | Frontend URL | API URL |
|-------------|------|--------------|---------|
| Local | `infrastructure/deployment-layer/` | `http://localhost:3010` | `http://localhost:3049` |
| Staging | `deploy/staging/` | `https://staging.ordella-physio.com` | `https://api.staging.ordella-physio.com` |
| Production | `deploy/production/` | `https://ordella-physio.com` | `https://api.ordella-physio.com` |

### Production Capabilities

- Traefik reverse proxy with Let's Encrypt auto-renewal
- Rolling zero-downtime deploys via `production-init.sh`
- Nightly Postgres backups with 30-day retention (`backup.sh` / `restore.sh`)
- Health checks on all services, databases, NATS, Redis, and Traefik
- Grafana dashboards with Prometheus, Loki, and Tempo datasources

---

## Portal Overview

All portals are implemented in `apps/frontend-web` with role-based routing and tenant-scoped API access.

| Portal | Route Prefix | Primary Users |
|--------|--------------|---------------|
| Public / Marketing | `/`, `/pricing` | Prospects, visitors |
| Auth | `/login`, `/register` | All users |
| Patient | `/patient` | Patients |
| Therapist | `/therapist` | Physiotherapists |
| Clinic Admin | `/clinic` | Clinic administrators |
| Super Admin | `/super-admin` | Platform operators |
| Pharmacy | `/pharmacy` | Pharmacy staff |
| Staff | `/staff` | Clinic staff |
| User | `/user` | General authenticated users |

Each portal includes domain-specific views for appointments, billing, notes, messages, notifications, and profile management as applicable to the role.

---

## Workflow Overview

| Workflow | Description | Status |
|----------|-------------|--------|
| Registration & Login | Tenant selection, JWT issuance, role redirect | Validated |
| Appointment Lifecycle | Create, view, update, cancel appointments | Validated |
| Patient Management | CRUD with tenant scoping | Validated |
| Clinical Notes | Create and view notes per patient | Validated |
| Billing & Invoicing | Invoice generation and viewing | Validated |
| Payments | Stripe payment intents and webhooks | Validated |
| Communications | Email/SMS notification dispatch | Validated |
| Reporting | Metrics, dashboards, CSV/PDF export | Validated |
| Event Bus | Async domain events via NATS JetStream | Validated |
| E2E Automation | Full cross-portal workflow tests | Validated |

---

## Validation Checklist

| # | Validation Item | Result |
|---|-----------------|--------|
| 1 | All 21 MTS steps completed | Pass |
| 2 | All 9 role-based portals implemented | Pass |
| 3 | API Gateway routes all service prefixes | Pass |
| 4 | Tenant isolation enforced (`X-Tenant-Id` + JWT claims) | Pass |
| 5 | Role-based access control on protected routes | Pass |
| 6 | Health endpoints on gateway and all microservices | Pass |
| 7 | Staging deployment stack exists and documented | Pass |
| 8 | Production deployment stack exists and documented | Pass |
| 9 | SSL/TLS with auto-renewal configured (Traefik ACME) | Pass |
| 10 | Observability: Grafana, Prometheus, Loki, Tempo | Pass |
| 11 | Database backup and restore scripts | Pass |
| 12 | Prisma migrations for all data services | Pass |
| 13 | E2E workflow automation completed | Pass |
| 14 | No active errors in MTS Error Interruption Handler | Pass |

---

## Sign-Off Section

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Engineering Lead | _________________________ | _________________________ | __________ |
| Platform Architect | _________________________ | _________________________ | __________ |
| DevOps / SRE | _________________________ | _________________________ | __________ |
| Product Owner | _________________________ | _________________________ | __________ |
| Security Review | _________________________ | _________________________ | __________ |

**Certification Statement:**

By signing above, the authorized parties confirm that the Ordella Physio platform has met all MTS requirements, passed validation, and is approved for production operation.

---

*This certificate is issued upon closure of the Ordella Physio Master Tracking System (MTS). For post-MTS development priorities, see [Post-MTS-Roadmap.md](./Post-MTS-Roadmap.md).*
