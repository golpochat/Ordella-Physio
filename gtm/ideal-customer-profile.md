# Ordella Physio — Ideal Customer Profile (ICP)

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — GTM Activation

---

## ICP Summary

**Primary ICP:** Independent physiotherapy clinics with 2–10 therapists, single or dual location, in English-speaking markets, currently using a mix of spreadsheets, generic scheduling tools, and disconnected billing — ready to consolidate onto one platform.

**Secondary ICP:** Clinic groups and franchises (10+ therapists, 3+ locations) requiring SSO, audit trails, and multi-region data residency.

---

## Target Clinic Size

| Segment | Therapists | Locations | Plan fit | Priority |
|---------|------------|-----------|----------|----------|
| Solo practitioner | 1 | 1 | Starter | High (volume) |
| Small clinic | 2–5 | 1 | Starter → Pro | **Primary** |
| Growing practice | 5–10 | 1–2 | Pro | **Primary** |
| Clinic group | 10–50 | 3–10 | Enterprise | High (ACV) |
| Franchise / network | 50+ | 10+ | Enterprise | Medium (long cycle) |

### Firmographic filters

- **Industry:** Physiotherapy, physical therapy, sports rehab, musculoskeletal clinics
- **Revenue (placeholder):** $200K–$5M annual clinic revenue
- **Staff:** At least 1 admin or owner who handles operations
- **Tech maturity:** Uses cloud email, comfortable with SaaS; may not have dedicated IT
- **Decision maker:** Clinic owner, practice manager, or clinical director

---

## Target Therapist Profile

| Attribute | Description |
|-----------|-------------|
| **Role** | Licensed physiotherapist (PT), sports physio, rehab specialist |
| **Experience** | 2–15 years clinical practice |
| **Tech comfort** | Uses smartphone daily; expects modern UX |
| **Pain** | Too much time on documentation; wants faster SOAP notes without sacrificing quality |
| **Influence** | Strong voice in tool selection; demo must win the therapist, not just the owner |
| **Success metric** | More patient-facing hours; fewer after-hours note completion |

### Therapist personas

**"Efficient Emma"** — 5 years experience, 20+ patients/week. Wants AI-assisted notes and voice-to-note. Needs mobile-friendly workflow between sessions.

**"Senior Sam"** — 15 years experience, skeptical of AI. Needs to see therapist review gate, audit trail, and control over what gets saved. Wins on trust messaging.

**"New grad Nina"** — 1–2 years experience. Wants SOAP templates and guidance. Values structured workflows and clear portal navigation.

---

## Target Regions

### Primary launch markets (Phase 1)

| Region | Rationale | Deployment |
|--------|-----------|------------|
| **United Kingdom & Ireland** | Large physio market, English-first, GDPR-aware | EU-West primary |
| **United States** | High SaaS adoption, large PT market | US-East replica |
| **Australia & New Zealand** | Strong physio profession, English-first | APAC optional |
| **Canada** | Similar regulatory landscape to US/UK | US-East or EU-West |

### Expansion markets (Phase 2)

- South Africa, Singapore, UAE (English-speaking healthcare hubs)
- EU markets (Germany, Netherlands) — English UI acceptable for international clinics

### Regional considerations

- Platform UI is **English-only** globally — target clinics that operate in English or serve English-speaking patients.
- Multi-region deployment supports data residency conversations (EU-West, US-East, APAC).
- Stripe availability determines payment launch per country.

---

## Pain Points

### Operational pain

| Pain | Current state | Ordella solution |
|------|---------------|------------------|
| Tool fragmentation | Scheduling in one app, notes in Word, billing in spreadsheets | Single platform, role-native portals |
| Admin overhead | Owner spends 10+ hrs/week on non-clinical tasks | Automated notifications, reporting, Stripe billing |
| Missed appointments | No unified reminder system | SMS/email via Marketplace + notification service |
| Staff onboarding | New therapists struggle with inconsistent tools | Dedicated therapist portal, guided onboarding |

### Clinical pain

| Pain | Current state | Ordella solution |
|------|---------------|------------------|
| Documentation burden | 30–60 min/day on notes | AI-assisted SOAP + voice-to-note |
| Note quality inconsistency | Free-text, no structure | SOAP templates + review workflow |
| Patient context scattered | History across systems | Unified patient record + appointment context |

### Business pain

| Pain | Current state | Ordella solution |
|------|---------------|------------------|
| Revenue leakage | Manual invoicing, missed charges | Stripe billing + appointment-linked invoices |
| No visibility | Can't see clinic KPIs | Reporting engine + dashboards |
| Can't scale | Adding location means new tools | Pro multi-location, Enterprise multi-region |
| Compliance anxiety | No audit trail | Enterprise audit logs + RBAC v2 |

### Patient experience pain

| Pain | Current state | Ordella solution |
|------|---------------|------------------|
| Poor communication | Phone tag, no portal | Patient portal + messaging + mobile app |
| No self-service | Must call to book or check appointments | Patient portal + notifications |
| Disconnected care | No visibility into treatment plan | Notes and appointment history in portal |

---

## Buying Triggers

### High-intent triggers (act now)

| Trigger | Signal | Outreach angle |
|---------|--------|----------------|
| **New clinic opening** | Business registration, hiring therapists | "Start with the right platform from day one" |
| **Software contract ending** | Renewal date approaching | "Switch before renewal — free migration support" |
| **Hiring spike** | 2+ therapist job postings | "Your team has outgrown spreadsheets" |
| **Second location** | New address announced | "Multi-location on one platform" |
| **Compliance audit** | Enterprise prospect mentions GDPR/HIPAA | "Audit logs, SSO, and tenant isolation built in" |
| **Competitor frustration** | Negative reviews of current PMS | "Built for physio, not adapted from fitness software" |

### Medium-intent triggers (nurture)

| Trigger | Signal | Outreach angle |
|---------|--------|----------------|
| Owner LinkedIn post about burnout | Social content | "Reduce admin, not patients" |
| Conference attendance | Physio conference exhibitor/attendee list | "See Ordella at [event]" |
| Google search | "physio practice management software" | SEO + paid landing page |
| Referral from existing clinic | Warm intro | "Clinics like yours are switching" |

### Negative triggers (disqualify)

- Clinic requires non-English UI (platform is English-only)
- Clinic needs hospital inpatient workflows (not physio outpatient)
- Clinic wants on-premise only with no cloud (Enterprise hybrid possible, but flag early)
- Budget below $30/mo with no growth path

---

## ICP Scoring Model (Placeholder)

Score leads 0–100 for prioritization:

| Criterion | Weight | Score guide |
|-----------|--------|-------------|
| Therapist count (5–10) | 25 | 25 = 5–10, 15 = 2–4, 5 = 1 |
| Region (primary market) | 20 | 20 = UK/US/AU, 10 = other English |
| Current tool pain (high) | 20 | 20 = fragmented, 10 = single tool limitations |
| Plan fit (Pro) | 15 | 15 = Pro, 10 = Starter, 5 = Enterprise (long cycle) |
| Decision maker engaged | 10 | 10 = owner replied, 0 = no contact |
| Timeline (30 days) | 10 | 10 = active evaluation, 5 = 90 days, 0 = no timeline |

**Score ≥ 70:** Book demo immediately  
**Score 40–69:** Nurture sequence  
**Score < 40:** Marketing list only

---

*Companion: `gtm/sales-funnel.md`, `gtm/outreach-strategy.md`, `gtm/positioning.md`*
