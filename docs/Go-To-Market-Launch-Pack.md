# Ordella Physio — Go-To-Market Launch Pack

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Ready for Growth Phase

---

## Product Positioning

**Ordella Physio** is an all-in-one practice management platform built for physiotherapy clinics — from solo practitioners to multi-location enterprises. It unifies scheduling, clinical notes, billing, patient engagement, and third-party integrations in a single tenant-isolated, multi-region SaaS product.

**Tagline:** *Run your clinic. Care for your patients. Scale without limits.*

**Category:** Vertical SaaS — Healthcare / Physiotherapy Practice Management

---

## Key Differentiators

1. **True multi-tenant isolation** — Every clinic is a secure, isolated tenant with RBAC at the gateway and service layers.
2. **Role-native portals** — Dedicated experiences for patients, therapists, clinic admins, staff, pharmacy, and platform operators — not a one-size-fits-all dashboard.
3. **AI-assisted clinical notes** — SOAP generation, treatment plans, and voice-to-note with mandatory therapist review.
4. **Integrated marketplace** — Google Calendar, Stripe, Twilio, SendGrid, Dropbox, and exercise platforms from one admin panel.
5. **Enterprise-grade controls** — SSO, custom roles, audit logs, API keys, and signed webhooks for large clinic groups.
6. **Global scale** — Multi-region deployment (EU, US, APAC) with geo-routing, CDN, and tenant home-region routing.
7. **Mobile-first patients** — Flutter app with offline cache, push notifications, and full appointment/notes access.
8. **English-only clarity** — Consistent, professional English UI globally — no localization fragmentation.

---

## Feature Overview

| Category | Features |
|----------|----------|
| Scheduling | Appointments, availability, blocked slots, calendar sync |
| Clinical | Notes (SOAP), AI assistant, voice transcription |
| Patients | Portal, records, messaging, notifications |
| Billing | Stripe subscriptions, invoicing, customer portal |
| Communications | In-app messaging, email, SMS |
| Reporting | KPI dashboards, CSV/JSON exports, async reports |
| Integrations | Marketplace (10 providers), webhooks, API keys |
| Enterprise | SSO, RBAC v2, audit/activity logs |
| Platform | Super Admin, multi-region, observability |

---

## Pricing Model (Placeholder)

| Plan | Price (placeholder) | Therapists | Highlights |
|------|---------------------|------------|------------|
| Starter | $49/mo | Up to 2 | Scheduling, patient portal, basic billing |
| Professional | $149/mo | Up to 10 | Notes, reporting, messaging, AI notes |
| Enterprise | Custom | Unlimited | SSO, marketplace, multi-location, API access, SLA |

*Finalize pricing with finance before public launch. Stripe price IDs: `STRIPE_PRICE_STARTER`, `STRIPE_PRICE_PRO`, `STRIPE_PRICE_ENTERPRISE`.*

---

## Target Customer Profiles

### 1. Solo / Small Clinic (Starter)
- 1–2 therapists, single location
- Needs scheduling + billing without IT overhead
- Pain: spreadsheets, disconnected tools

### 2. Growing Practice (Professional)
- 3–10 therapists, possible second location
- Needs clinical notes, reporting, patient engagement
- Pain: scaling admin work, missed follow-ups

### 3. Clinic Group / Enterprise (Enterprise)
- 10+ therapists, multiple locations, compliance requirements
- Needs SSO, audit trails, integrations, API access
- Pain: security audits, custom workflows, regional data

### 4. Platform / Franchise Operator (Super Admin)
- Manages many tenant clinics
- Needs global visibility, billing oversight, feature flags
- Pain: no unified operator console

---

## Sales Pitch Deck Outline

1. **Title** — Ordella Physio: The Modern Physio Practice Platform
2. **Problem** — Fragmented tools, compliance risk, poor patient experience
3. **Solution** — Unified platform with tenant isolation and role-native portals
4. **Demo screenshot** — Clinic Admin dashboard
5. **Scheduling** — Appointments + Google Calendar sync
6. **Clinical workflow** — Notes + AI assistant with therapist review
7. **Patient engagement** — Portal + mobile app + messaging
8. **Billing** — Stripe subscriptions and invoicing
9. **Integrations** — Marketplace overview
10. **Enterprise** — SSO, audit logs, custom roles
11. **Scale** — Multi-region, CDN, 99.9% SLA (enterprise)
12. **Security** — Tenant isolation, TLS, RBAC, audit
13. **Pricing** — Three-tier table
14. **Customer proof** — Case study placeholder
15. **CTA** — Start free trial / Book demo

---

## Demo Flow Script

**Duration:** 15 minutes  
**Audience:** Clinic owner or practice manager

### Setup (1 min)
- Open `https://ordella-physio.com` (or local `http://localhost:3010`)
- Log in as Clinic Admin (`/clinic`)

### 1. Clinic overview (2 min)
- Show dashboard: appointments today, notifications, messaging badge
- Highlight English-only, clean UI

### 2. Appointments (2 min)
- Create appointment for a patient
- Show therapist calendar view
- Mention Google Calendar sync (Marketplace)

### 3. Clinical notes + AI (3 min)
- Switch to Therapist portal
- Open appointment → AI assistant
- Generate SOAP note → preview → accept
- Emphasize therapist review requirement

### 4. Patient experience (2 min)
- Show Patient portal or mobile app
- Upcoming appointment, messages, notifications

### 5. Billing (2 min)
- Clinic Admin → Billing
- Show subscription plan, Stripe invoices
- Create invoice flow

### 6. Marketplace + Enterprise (2 min)
- Marketplace: connect Twilio or Google Calendar
- Enterprise (if on plan): SSO config, audit log viewer

### 7. Close (1 min)
- Multi-region, security, mobile app
- CTA: "Start your 14-day trial"

---

## Launch Checklist

- [ ] Production secrets rotated (no `CHANGE_ME` values)
- [ ] Stripe live mode configured
- [ ] DNS + CDN pointing to production/regions
- [ ] `verify-production.sh` passes
- [ ] Sales deck finalized
- [ ] Support email and onboarding kit published
- [ ] App store listings (mobile) submitted

---

*Companion documents: `docs/Clinic-Onboarding-Kit.md`, `docs/Investor-Technical-Brief.md`, `docs/Platform-Readiness-Certificate.md`*
