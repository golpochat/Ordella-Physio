# Ordella Physio — Investor Technical Brief

**Version:** 1.0  
**Date:** 2026-06-10  
**Classification:** Confidential — For investor and partner review

---

## Executive Summary

Ordella Physio is a multi-tenant SaaS platform for physiotherapy practice management. Built as a **Turborepo monorepo** with **16 NestJS microservices**, a **Next.js** web frontend, and a **Flutter** mobile app, the platform is certified **ready for global scale** following completion of a 21-step MTS lifecycle and 10 Post-MTS milestones.

**Investment thesis:** Vertical SaaS in a fragmented market, with enterprise-grade security, AI differentiation, and multi-region infrastructure from day one of scale.

---

## High-Level Architecture

```
Clients (Web, Mobile)
        │
        ▼
Global CDN + Geo-DNS
        │
        ▼
Regional Traefik (TLS)
        │
   ┌────┴────┐
   ▼         ▼
Frontend   API Gateway (JWT, tenant, region routing)
   │         │
   └────┬────┘
        ▼
16 Microservices ──► PostgreSQL (per-service DBs)
        │
        ▼
NATS JetStream + Redis
        │
        ▼
Observability (Prometheus, Grafana, Loki, Tempo)
```

**Tech stack:** TypeScript, NestJS, Next.js, Flutter, Prisma, PostgreSQL, NATS, Redis, Docker, Traefik, Stripe, OpenAI/Azure OpenAI.

---

## Scalability Strategy

| Layer | Strategy |
|-------|----------|
| Application | Stateless microservices; horizontal scaling per service |
| Database | Per-service databases; read replicas in secondary regions |
| Cache | Regional Redis instances |
| Events | NATS JetStream with regional federation |
| Frontend | CDN edge caching for static assets |
| API | Regional gateways with cross-region tenant routing |
| Mobile | Direct gateway access; FCM for push |

**Bottleneck mitigation:** Async report generation, webhook retry queues, gateway connection pooling, JetStream file storage.

---

## Multi-Region Strategy

- **Primary:** EU-West (London) — all writes
- **Secondary:** US-East — read replica + NATS leaf
- **Optional:** APAC — read replica + NATS leaf
- **Routing:** Tenant `homeRegion` field; gateway proxies cross-region when needed
- **Failover:** Automatic API gateway failover via Cloudflare/Route53; manual DB promotion
- **CDN:** Cloudflare tiered cache + Argo Smart Routing

See: `docs/Multi-Region-Architecture.md`, `deploy/multi-region/`

---

## Security Model

| Control | Implementation |
|---------|----------------|
| Authentication | JWT + optional SSO (SAML, OIDC) |
| Authorization | RBAC with 5 system roles + custom enterprise roles |
| Tenant isolation | Header + JWT claim enforcement at every layer |
| Transport | TLS 1.2+ via Traefik ACME |
| Secrets | Environment/vault; no secrets in code |
| Audit | Enterprise audit + activity logs |
| API access | Scoped API keys with rotation |
| Webhooks | HMAC-SHA256 signatures |

---

## AI Capabilities

**Service:** `ai-notes-service` (port 3063)

- SOAP note generation from appointment context
- Appointment summarization
- Treatment plan suggestions
- Whisper voice-to-note transcription
- Therapist accept/reject workflow (no auto-persist)
- Tenant usage logging and cost tracking
- Provider abstraction: OpenAI or Azure OpenAI

**Differentiation:** AI assists clinicians; humans remain in the loop — critical for healthcare liability and trust.

---

## Marketplace Ecosystem

**Service:** `marketplace-service` (port 3064)

10 launch providers: Google Calendar, Stripe, Dropbox, Google Drive, OneDrive, Twilio, SendGrid, Zoom, Physiotec, MedBridge.

- OAuth and API key connection flows
- Integration hooks: calendar sync, note upload, SMS, email, exercise sync
- Usage logging per tenant
- Webhook receiver for provider events

**Revenue opportunity:** Marketplace transaction fees, premium integration tiers.

---

## Enterprise Features

**Service:** `enterprise-service` (port 3065)

- SSO (SAML 2.0, Azure AD, Google Workspace, generic OAuth2)
- RBAC v2 with custom roles, permission groups, inheritance
- Audit logs (tenant + global)
- Activity logs (login, API, integration events)
- API keys with scopes, rotation, revocation
- Signed webhooks with retry (6 event types)

**Gating:** ENTERPRISE subscription plan — drives ARPU expansion.

---

## Traction Metrics (Placeholder)

| Metric | Value |
|--------|-------|
| MTS steps completed | 21/21 |
| Post-MTS milestones completed | 10/10 |
| Microservices | 16 |
| Web portals | 9 |
| Mobile platforms | iOS + Android (Flutter) |
| Regions deployed | 3 (EU, US, APAC) |
| Integration providers | 10 |

*Replace with live customer and revenue metrics before investor meetings.*

---

## Future Roadmap (Growth Phase)

| Priority | Initiative |
|----------|------------|
| High | Customer acquisition, onboarding automation |
| High | App store launch (iOS/Android) |
| Medium | Advanced analytics and BI dashboards |
| Medium | Telehealth native (Zoom/Teams deep integration) |
| Medium | FHIR/HL7 interoperability |
| Low | Additional marketplace providers |
| Low | Multi-language support (currently English-only by design) |
| Low | White-label / franchise mode |

---

## Team & IP

- **Codebase:** Proprietary monorepo (`ordella-physio`)
- **Documentation:** MTS, Post-MTS roadmap, architecture docs, certificates
- **Infrastructure:** Docker Compose + multi-region configs; K8s scaffolding
- **Certifications:** `docs/System-Readiness-Certificate.md`, `docs/Platform-Readiness-Certificate.md`

---

## Risk Factors

1. **Healthcare compliance** — HIPAA/GDPR require organizational policies beyond engineering controls
2. **AI liability** — Mitigated by therapist review workflow
3. **Multi-region complexity** — Mitigated by EU-primary write model and documented failover
4. **Competition** — Differentiated by vertical focus, AI, marketplace, and enterprise features

---

*For technical due diligence contact: engineering@ordella-physio.com (placeholder)*
