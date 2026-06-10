# Ordella Physio — CRM Pipeline

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Clinic Acquisition Pipeline  
**CRM tool (placeholder):** HubSpot or Pipedrive

---

## Pipeline Overview

```
Lead → Contacted → Qualified → Demo Booked → Demo Completed → Trial Started → Trial Active → Converted
```

Each stage has defined entry criteria, exit criteria, owner, and SLA. Deals that fail to progress are marked **Disqualified** or **Nurture** (re-enter at Lead after 90 days).

---

## Stage Definitions

### 1. Lead

| Attribute | Detail |
|-----------|--------|
| **Definition** | Identifiable clinic or contact with no outbound touch yet |
| **Entry** | Form submit, list import, referral, event scan, trial page visit (identified) |
| **Exit** | First outbound contact attempted → **Contacted** |
| **Owner** | SDR (outbound) or Marketing (inbound) |
| **SLA** | First contact within 24 hours (inbound) or 72 hours (outbound list) |

**Required fields:**
- Clinic name
- Contact name + email
- Source / UTM
- Region (UK / US / AU / CA / other)
- Therapist count (estimate)

---

### 2. Contacted

| Attribute | Detail |
|-----------|--------|
| **Definition** | At least one outbound touch delivered (email, LinkedIn, call) |
| **Entry** | Email sent, LinkedIn message sent, or call attempted |
| **Exit** | Qualification criteria met → **Qualified**; or no response after 5 touches → **Nurture** |
| **Owner** | SDR |
| **SLA** | 5-touch sequence completed within 21 days |

**Activities logged:**
- Email opens/clicks
- LinkedIn connection status
- Call outcome (connected / voicemail / no answer)

---

### 3. Qualified

| Attribute | Detail |
|-----------|--------|
| **Definition** | Lead meets ICP and BANT minimum; ready for demo |
| **Entry** | Qualification score ≥ 60 (see `qualification-framework.md`) |
| **Exit** | Demo calendar booked → **Demo Booked**; or disqualified |
| **Owner** | SDR → AE handoff at booking |
| **SLA** | Demo offered within 48 hours of qualification |

**Disqualify if:**
- Non-English UI required
- Inpatient hospital workflow only
- Budget < $30/mo with no growth path
- No decision maker access within 90 days

---

### 4. Demo Booked

| Attribute | Detail |
|-----------|--------|
| **Definition** | Demo scheduled on calendar with confirmed attendee |
| **Entry** | Calendly/Cal.com booking confirmed |
| **Exit** | Demo conducted → **Demo Completed**; or no-show → rebook or **Nurture** |
| **Owner** | AE (Account Executive) |
| **SLA** | Demo within 7 days of booking; reminder sent 24h and 1h before |

**Required fields:**
- Demo date/time (timezone)
- Attendees (name, role)
- Pre-demo questionnaire completed (see `demo-calendar-setup.md`)
- Primary pain point
- Plan fit (Starter / Pro / Enterprise)

---

### 5. Demo Completed

| Attribute | Detail |
|-----------|--------|
| **Definition** | 15-min demo delivered; outcome logged |
| **Entry** | AE marks demo complete in CRM |
| **Exit** | Trial tenant created → **Trial Started**; or follow-up scheduled; or **Nurture** |
| **Owner** | AE |
| **SLA** | Post-demo follow-up email within 1 hour; trial link sent same day |

**Required fields:**
- Demo outcome (trial offered / enterprise discovery / nurture)
- Objections noted
- Next step + date
- Competitor mentioned (if any)

---

### 6. Trial Started

| Attribute | Detail |
|-----------|--------|
| **Definition** | Clinic registered and tenant provisioned; trial clock running |
| **Entry** | `/register` completed with UTM/deal association |
| **Exit** | Activation criteria met → **Trial Active**; or 7 days zero activity → CS outreach |
| **Owner** | AE + CS (shared) |
| **SLA** | Welcome email + onboarding kit within 1 hour |

**Activation criteria (→ Trial Active):**
- ≥ 1 therapist invited
- ≥ 1 patient added
- ≥ 1 appointment created

---

### 7. Trial Active

| Attribute | Detail |
|-----------|--------|
| **Definition** | Clinic using product; activation criteria met |
| **Entry** | Activation criteria met (auto or manual) |
| **Exit** | Paid plan selected → **Converted**; or trial expires → **Nurture** / lost |
| **Owner** | CS (Customer Success) |
| **SLA** | CS check-in on Day 7; conversion CTA on Day 10 |

**Health signals monitored:**
- Weekly logins
- Notes created (Pro trial)
- Integrations connected
- Support tickets

---

### 8. Converted

| Attribute | Detail |
|-----------|--------|
| **Definition** | Paid subscription active (Starter, Pro, or Enterprise contract signed) |
| **Entry** | Stripe subscription created or Enterprise contract executed |
| **Exit** | N/A — handoff to CS for onboarding and expansion |
| **Owner** | CS |
| **SLA** | Onboarding sequence started within 24 hours (see `follow-up-automation.md`) |

**Required fields:**
- Plan (Starter / Pro / Enterprise)
- MRR / ACV
- Conversion date
- Sales cycle length (days from Lead)

---

## Movement Rules

### Forward movement

| From | To | Trigger | Automated? |
|------|-----|---------|------------|
| Lead | Contacted | First email/LinkedIn/call logged | Manual |
| Contacted | Qualified | Qualification score ≥ 60 | Manual (SDR) |
| Qualified | Demo Booked | Calendar booking confirmed | Auto (Calendly → CRM) |
| Demo Booked | Demo Completed | AE marks complete | Manual |
| Demo Completed | Trial Started | Register with deal ID / UTM | Auto (Stripe webhook) |
| Trial Started | Trial Active | Activation criteria met | Auto (product events) |
| Trial Active | Converted | Stripe subscription active | Auto (Stripe webhook) |

### Backward / lateral movement

| From | To | Trigger |
|------|-----|---------|
| Any | Nurture | No response after full sequence; not disqualified |
| Any | Disqualified | Fails ICP or BANT minimum |
| Nurture | Lead | Re-engagement campaign after 90 days |
| Demo Booked | Qualified | No-show, rebook failed twice |
| Trial Active | Demo Completed | Trial expired, win-back attempt |

### Auto-progression (product events → CRM)

| Event | CRM action |
|-------|------------|
| `trial.registered` | Create/update deal → Trial Started |
| `trial.therapist_invited` | Update activation score |
| `trial.appointment_created` | If criteria met → Trial Active |
| `billing.subscription_created` | → Converted |
| `trial.expired` | → Nurture + CS task |

*Product events: implement via webhook to CRM (Growth Phase engineering).*

---

## Owner Responsibilities

| Role | Stages owned | Weekly quota (placeholder) |
|------|--------------|---------------------------|
| **Marketing** | Lead (inbound) | 50 MQLs |
| **SDR** | Lead → Contacted → Qualified | 30 contacted, 10 qualified |
| **AE** | Qualified → Demo Booked → Demo Completed | 8 demos, 5 trials started |
| **CS** | Trial Started → Trial Active → Converted | 15 active trials, 25% conversion |
| **Sales Manager** | Pipeline review, forecasting | Weekly pipeline meeting |

### Handoff rules

| Handoff | From → To | Criteria |
|---------|-----------|----------|
| MQL → SDR | Marketing → SDR | Inbound lead score ≥ 40 |
| SQL → AE | SDR → AE | Qualified + demo booked |
| Trial → CS | AE → CS | Trial Started |
| Customer → CS | AE/CS → CS | Converted (ongoing account) |

### SLA escalation

| Breach | Escalation |
|--------|------------|
| Inbound lead > 24h no contact | SDR manager |
| Qualified > 48h no demo offer | AE manager |
| Demo no-show | AE rebook within 48h |
| Trial Day 7 no activation | CS manager outreach |
| Trial Day 13 no conversion conversation | AE + CS joint call |

---

## Pipeline Metrics

| Metric | Formula | Target (placeholder) |
|--------|---------|---------------------|
| Lead → Contacted | Contacted / Leads | 80% |
| Contacted → Qualified | Qualified / Contacted | 25% |
| Qualified → Demo Booked | Demo Booked / Qualified | 60% |
| Demo Booked → Demo Completed | Completed / Booked (show rate) | 75% |
| Demo Completed → Trial Started | Trials / Demos | 50% |
| Trial Started → Trial Active | Active / Started | 60% |
| Trial Active → Converted | Converted / Active | 25% |
| Overall Lead → Converted | Converted / Leads | 1.5% |

---

## CRM Configuration Checklist

- [ ] Pipeline stages created (8 stages + Nurture + Disqualified)
- [ ] Required fields enforced per stage
- [ ] Calendly/Cal.com integration for Demo Booked
- [ ] Stripe integration for Converted
- [ ] UTM capture on all forms
- [ ] Email sequences linked to stages (`outreach-sequences.md`)
- [ ] Weekly pipeline report dashboard
- [ ] Deal rotting rules (no activity 14 days → alert)

---

*Companion: `qualification-framework.md`, `conversion-funnel.md`, `follow-up-automation.md`*
