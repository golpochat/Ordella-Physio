# Ordella Physio — Retention Loop

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Growth Flywheel  
**Loop:** Active usage → value → renewal → expansion → deeper engagement

---

## Retention Loop Model

```
Onboard → Adopt → Habit → Health monitoring → Intervene if at-risk → Retain → Expand
```

| Phase | Goal | Owner |
|-------|------|-------|
| Adopt | Core features used weekly | CS + product |
| Habit | 3+ users active weekly | CS |
| Expand | Upgrade / add-ons | PLG + sales |
| Renew | Annual/monthly continuation | CS + billing |

**Reference:** `growth/sales-conversion-engine/churn-prevention.md`, `growth/sales-conversion-engine/renewal-flow.md`

---

## Usage Monitoring

### Health score model (0–100)

| Component | Weight | Green | Yellow | Red |
|-----------|--------|-------|--------|-----|
| Admin login (30d) | 20 | ≥ 4 | 1–3 | 0 |
| Therapist WAU / seats | 25 | ≥ 60% | 30–59% | < 30% |
| Appointments (30d) | 20 | ≥ 10 | 3–9 | < 3 |
| Notes (30d) | 15 | ≥ 5 | 1–4 | 0 |
| Integrations connected | 10 | ≥ 1 | 0 | 0 |
| Support sentiment | 10 | No open P1 | 1 ticket | Escalation |

**Account health:** Green ≥ 70 · Yellow 40–69 · Red < 40

### Monitoring cadence

| System | Frequency |
|--------|-----------|
| Health score batch job | Daily |
| CRM sync | Daily |
| CS dashboard refresh | Real-time |
| Leadership rollup | Weekly |

### Data sources

| Service | Signals |
|---------|---------|
| tenant-service | Plan, tenure, onboarding % |
| auth-service | Login frequency |
| appointment-service | Volume trend |
| notes-service | Clinical adoption |
| marketplace-service | Integration depth |
| billing-service | Payment status |
| reporting-service | Aggregated health export |

---

## Low-Usage Alerts

### Alert tiers

| Tier | Condition | Notification |
|------|-----------|--------------|
| **Watch** | Health drops 15 pts in 7d | CRM note |
| **At-risk** | Yellow health 2 consecutive weeks | CS task + email |
| **Critical** | Red health OR payment fail | CS manager + Slack alert |

### Automated low-usage emails

| Trigger | Subject |
|---------|---------|
| Yellow, 0 appointments 14d | "Need help scheduling on Ordella?" |
| Red, paid customer | "We want to help [Clinic Name] succeed" |
| Therapist WAU < 30% | "Get your team active on Ordella" |

### In-app interventions

| Health | Banner |
|--------|--------|
| Yellow | "Complete setup: connect calendar + invite team" |
| Red | "Book a free success call" — prominent CTA |

---

## Re-Engagement Sequences

### Paid customer re-engagement (30-day inactive)

| Day | Channel | Content |
|-----|---------|---------|
| 0 | Email | "We miss you — quick wins inside" |
| 3 | Email | Feature highlight (unused) |
| 7 | CS call task | Personal outreach |
| 14 | Email | Case study + check-in offer |
| 30 | CS manager | Save playbook or churn survey |

### Post-churn win-back

See `churn-prevention.md` — 90-day sequence.

### Trial re-engagement (pre-expiry)

See `trial-nurture-sequence.md` + `conversion-sequence.md`.

---

## Customer Success Check-Ins

### Check-in calendar by segment

| Segment | Touchpoint | Frequency |
|---------|------------|-----------|
| Starter | Email health tips | Monthly (automated) |
| Pro | 15-min check-in call | Quarterly |
| Pro (new, first 90d) | Onboarding call | Day 30 + Day 60 |
| Enterprise | QBR + roadmap | Quarterly |
| Red health (any) | Intervention call | Within 5 business days |

### QBR agenda (Enterprise, 45 min)

1. Usage review vs success criteria
2. Feature adoption gaps
3. Integration health
4. Support ticket review
5. Roadmap preview
6. Renewal timeline (-90d if annual)
7. Referral / case study ask (if NPS ≥ 8)

### CS check-in script (Pro, quarterly)

> "How is the team finding Ordella since we last spoke?"  
> "What's working well? What's frustrating?"  
> "Are you getting value from [AI notes / reporting / marketplace]?"  
> "Any plans to add therapists or locations?"  
> "Can I show you [unused feature] in 5 minutes?"

### Success criteria (per clinic, set at conversion)

| Metric | Example target |
|--------|----------------|
| Therapists active weekly | 80% of seats |
| Appointments / month | Baseline + 10% QoQ |
| Notes per appointment | > 70% |
| Patient portal adoption | > 20% patients |

---

## Retention → Expansion Bridge

| Retention signal | Expansion action |
|----------------|------------------|
| Health green + 3 therapists on Starter | Pro upgrade prompt |
| High AI usage on Pro | AI add-on or annual plan |
| Multi-location request | Enterprise discovery |
| NPS 9–10 | Referral program invite |

---

## Retention Metrics

| Metric | Target |
|--------|--------|
| Gross revenue retention (GRR) | > 90% |
| Net revenue retention (NRR) | > 100% |
| Logo retention (monthly) | > 97% |
| Green health accounts | > 70% |
| Red → green recovery rate | > 40% |
| QBR completion (Enterprise) | 100% |

---

*Companion: `flywheel-kpis.md`, `flywheel-dashboard.md`, `product-led-growth-loop.md`*
