# Ordella Physio — Post-MTS Roadmap

**Status:** Active  
**MTS Closure Date:** 2026-06-10  
**Prerequisite:** All 21 MTS steps complete — system certified production-ready

This document defines the engineering roadmap following closure of the Master Tracking System (MTS). Each phase builds on the production-ready foundation delivered by the MTS.

---

## Phase Overview

| Phase | Name | Priority | Dependency |
|-------|------|----------|------------|
| 1 | Billing Integration (Stripe) | **DONE** | MTS Step 21 |
| 2 | Messaging System | High (Next) | Phase 1 |
| 3 | Notifications System | High | Phase 2 |
| 4 | Reporting Engine | Medium | Phase 1 |
| 5 | Mobile App (React Native) | Medium | Phase 2, 3 |
| 6 | AI-Assisted Clinical Notes | Medium | Phase 4 |
| 7 | Marketplace Integrations | Low | Phase 1, 4 |
| 8 | Multi-Region Deployment | Low | Phase 7 |
| 9 | Enterprise Features | Low | Phase 8 |

---

## Phase 1: Billing Integration (Stripe)

**Goal:** Production-grade payment processing with full Stripe lifecycle support.

**Scope:**

- Live Stripe keys and webhook verification in production
- Subscription plans tied to tenant billing tiers
- Invoice auto-generation on appointment completion
- Payment retry logic and dunning emails
- PCI-compliant card handling (Stripe Elements)
- Reconciliation dashboard for clinic admins

**Deliverables:**

- Production Stripe configuration in `deploy/production/.env.production`
- Webhook handler hardening in `payment-service`
- Billing portal enhancements in clinic and patient portals
- Stripe test and live mode toggle per environment

**Success Criteria:**

- End-to-end payment from invoice creation to Stripe confirmation
- Webhook events processed reliably with idempotency
- Refund and dispute flows operational

---

## Phase 2: Messaging System

**Goal:** Real-time and asynchronous messaging between patients, therapists, and clinic staff.

**Scope:**

- Thread-based conversations per tenant
- In-portal messaging UI for all role-based portals
- Message persistence in `communication-service`
- Read receipts and unread counts
- Attachment support (linked to storage provider)

**Deliverables:**

- Messaging API endpoints and Prisma schema
- Portal message views (patient, therapist, staff, clinic)
- NATS events for `message.sent` and `message.read`

**Success Criteria:**

- Cross-role messaging within a tenant
- Tenant isolation enforced on all message queries
- Messages delivered in under 2 seconds (in-app)

---

## Phase 3: Notifications System

**Goal:** Unified notification delivery across in-app, email, SMS, and push channels.

**Scope:**

- Notification preferences per user and role
- Event-driven triggers (appointments, billing, messages)
- In-app notification center for all portals
- Digest and real-time delivery modes
- Delivery status tracking and retry

**Deliverables:**

- Notification service extensions in `communication-service`
- Notification bell UI component in `@ordella/ui`
- Portal notification pages wired to live API
- Integration with Phase 2 messaging events

**Success Criteria:**

- Users receive notifications for all configured event types
- Preference opt-out respected per channel
- Delivery audit log queryable by clinic admins

---

## Phase 4: Reporting Engine

**Goal:** Advanced analytics, custom reports, and scheduled exports for clinic and platform operators.

**Scope:**

- Custom report builder (date range, filters, grouping)
- Scheduled CSV/PDF email delivery
- Clinic-level and platform-level dashboards
- KPI tracking: appointments, revenue, patient retention
- Data warehouse preparation (optional BigQuery/Snowflake export)

**Deliverables:**

- Enhanced `reporting-service` query engine
- Grafana dashboard pack for production
- Super admin and clinic admin report UIs
- Cached aggregates via Redis

**Success Criteria:**

- Reports generated in under 10 seconds for 12-month ranges
- Scheduled reports delivered on cron without failure
- Export formats match clinic compliance requirements

---

## Phase 5: Mobile App (React Native)

**Goal:** Native iOS and Android apps for patients and therapists.

**Scope:**

- React Native app in `apps/mobile-app`
- Patient: appointments, notes, billing, messages
- Therapist: schedule, patient list, note entry
- Biometric login and push notifications
- Offline-first appointment viewing

**Deliverables:**

- React Native project scaffold with shared `@ordella/shared` types
- Auth flow with tenant selection
- Core screens for patient and therapist roles
- App Store and Play Store deployment pipeline

**Success Criteria:**

- Feature parity with web portals for core workflows
- Push notifications via Phase 3 system
- API Gateway mobile-optimized rate limits

---

## Phase 6: AI-Assisted Clinical Notes

**Goal:** AI-powered note drafting, summarization, and compliance checking for therapists.

**Scope:**

- LLM integration for note generation from session context
- SOAP note template auto-fill
- Clinical terminology suggestions
- HIPAA-aware prompt handling (no PHI in external logs)
- Therapist review and approval workflow before save

**Deliverables:**

- AI service module or `notes-service` extension
- Therapist portal AI assist UI
- Audit trail for AI-generated content
- Configurable model provider per tenant (OpenAI, Azure, local)

**Success Criteria:**

- Note draft generated in under 5 seconds
- 100% of AI notes require therapist approval before persistence
- No PHI leaked to unauthorized model endpoints

---

## Phase 7: Marketplace Integrations

**Goal:** Third-party integrations marketplace for clinics to extend platform capabilities.

**Scope:**

- Integration catalog (accounting, CRM, telehealth, labs)
- OAuth-based third-party connection flow
- Webhook relay for external systems
- Per-tenant integration enablement by super admin
- Partner API documentation portal

**Deliverables:**

- Integration registry in `tenant-service`
- OAuth connection manager
- Marketplace UI in clinic admin and super admin portals
- SDK for partner developers

**Success Criteria:**

- At least 3 pilot integrations live (e.g., Xero, Zoom, Mailchimp)
- Clinics can self-serve enable/disable integrations
- Integration health visible in super admin dashboard

---

## Phase 8: Multi-Region Deployment

**Goal:** Geographic distribution for latency, compliance, and disaster recovery.

**Scope:**

- Multi-region Postgres replication (read replicas)
- Regional NATS JetStream clusters with bridge
- Geo-routed DNS (Route 53 / Cloudflare)
- Data residency controls per tenant (EU, US, APAC)
- Cross-region failover runbooks

**Deliverables:**

- Region-specific compose overlays or Kubernetes manifests
- Tenant region assignment in `tenant-service`
- Updated `deploy/production` multi-region guide
- DR drill procedure and RTO/RPO documentation

**Success Criteria:**

- p99 API latency under 200ms in target regions
- Failover drill completed with under 15-minute RTO
- Tenant data residency policy enforced

---

## Phase 9: Enterprise Features

**Goal:** Features required for large clinic groups and healthcare networks.

**Scope:**

- SSO (SAML 2.0 / OIDC) for enterprise tenants
- Custom branding per tenant (white-label)
- Advanced RBAC with custom roles and permissions
- SLA monitoring and dedicated support tier
- Audit log export for compliance (HIPAA, GDPR)
- Dedicated infrastructure option (single-tenant deployment)

**Deliverables:**

- SSO integration in `auth-service`
- Tenant branding configuration in `tenant-service`
- Custom role builder in super admin portal
- Enterprise deployment tier in `deploy/production`

**Success Criteria:**

- SSO login operational for pilot enterprise tenant
- White-label branding applied across all portals per tenant
- Audit logs exportable in compliance-ready format

---

## Governance

- Each phase should be tracked in a new engineering tracker or project management tool.
- The MTS file (`ORDella-MTS.md`) remains archived as the historical record of initial platform delivery.
- Phase kickoff requires a brief RFC and sign-off from Engineering Lead and Product Owner.
- Production deployments for each phase follow the existing `deploy/production` workflow.

---

*For the certified system baseline, see [System-Readiness-Certificate.md](./System-Readiness-Certificate.md).*
