# Ordella Physio — Sales Dashboard

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Sales & Conversion Engine  
**Tool (placeholder):** HubSpot CRM + Grafana / Metabase + Super Admin portal

---

## Dashboard Purpose

Single view for Sales, CS, and Leadership to monitor demo → trial → conversion pipeline and revenue health in real time.

**Audiences:**

| Role | Primary views |
|------|---------------|
| AE | Demos, trials, my pipeline |
| CS | Active trials, expiring, at-risk |
| Sales Manager | Team quota, conversion rates |
| Leadership | MRR, funnel, forecast |

---

## Dashboard Sections

### 1. Demo Booked

| Widget | Definition | Source |
|--------|------------|--------|
| Demos booked (WTD/MTD) | Count of CRM Demo Booked → scheduled | CRM |
| Demos booked by source | UTM breakdown | CRM + UTM |
| Upcoming demos (7 days) | Calendar list | Calendly |
| Booking rate | Demo Booked / Qualified | CRM |
| Avg time to book | Qualified → Booked | CRM |

**Alerts:**
- Zero demos booked this week → Slack `#sales`
- Booking rate < 40% → review qualification

---

### 2. Demo Completed

| Widget | Definition | Source |
|--------|------------|--------|
| Demos completed (WTD/MTD) | AE-marked complete | CRM |
| Show rate | Completed / Booked | CRM |
| No-show rate | No-show / Booked | CRM |
| Demo → trial rate | Trials started within 48h / Completed | CRM |
| Avg demo score (optional) | AE feedback form | CRM |

**Drill-down table:**

| Clinic | AE | Date | Outcome | Trial started? | Next step |
|--------|-----|------|---------|----------------|-----------|

---

### 3. Trials Active

| Widget | Definition | Source |
|--------|------------|--------|
| Active trials | CRM Trial Active + product confirmation | CRM + tenant-service |
| New trials (WTD/MTD) | Trial Started | CRM |
| Activation rate | Trial Active / Trial Started | CRM + events |
| Avg onboarding progress % | Mean progress score | tenant onboarding API |
| Trials by plan | Starter vs Pro trial | billing-service |
| Healthy / at-risk / stale | Health segmentation | Rules below |

**Trial health rules:**

| Status | Criteria |
|--------|----------|
| **Healthy** | Progress ≥ 70%, login in last 3 days |
| **At-risk** | Progress < 70% OR no login 5 days |
| **Stale** | Progress < 30% on Day 7+ |

---

### 4. Trials Expiring

| Widget | Definition | Source |
|--------|------------|--------|
| Expiring in 7 days | `trialEndsAt` within 7d | tenant-service |
| Expiring in 3 days | Within 3d | tenant-service |
| Expiring tomorrow | Day 13 cohort | tenant-service |
| Expired (last 7 days) | Trial ended, not converted | CRM |
| Extension granted | Count | CRM |

**Action queue (CS):**

| Priority | Clinic | Days left | Progress | Owner | Action |
|----------|--------|-----------|----------|-------|--------|
| P1 | — | 1 | 80% | CS | Conversion call |
| P2 | — | 3 | 40% | CS | Setup help |

---

### 5. Conversions

| Widget | Definition | Source |
|--------|------------|--------|
| Conversions (WTD/MTD) | CRM Converted | CRM + Stripe |
| Trial → paid rate | Converted / Trial Active (cohort) | CRM |
| Demo → paid rate | Converted / Demo Completed (cohort) | CRM |
| Plan mix | Starter / Pro / Enterprise % | Stripe |
| Avg sales cycle | Lead created → Converted | CRM |
| Conversion by source | UTM attribution | CRM |

**Recent conversions table:**

| Clinic | Plan | MRR | Source | AE | CS | Date |
|--------|------|-----|--------|-----|-----|------|

---

### 6. Revenue Metrics

| Widget | Definition | Source |
|--------|------------|--------|
| **MRR** | Monthly recurring revenue | Stripe |
| **Net new MRR** | New + expansion − churn | Stripe |
| **ARR** | MRR × 12 | Calculated |
| **ARPA** | MRR / paying clinics | Calculated |
| **Churn MRR** | Cancelled subscriptions | Stripe |
| **Expansion MRR** | Upgrades + add-ons | Stripe |
| **Pipeline MRR (weighted)** | Open deals × probability | CRM |
| **Forecast (month)** | Commit + best case | CRM |

**Placeholder Month 3 targets:**

| Metric | Target |
|--------|--------|
| MRR | $6,000 |
| Paying clinics | 60 |
| ARPA | $90 |
| Net new MRR | $2,000/mo |
| Logo churn | < 3%/mo |

---

## Dashboard Layout (wireframe)

```
┌─────────────────────────────────────────────────────────────┐
│  ORDELLA SALES DASHBOARD                    [Week ▼] [AE ▼] │
├──────────────┬──────────────┬──────────────┬────────────────┤
│ Demos booked │ Demos done   │ Show rate    │ Demo→Trial     │
│     12       │      9       │    75%       │     44%        │
├──────────────┴──────────────┴──────────────┴────────────────┤
│ TRIALS ACTIVE: 34   │ EXPIRING (7d): 8   │ CONVERSIONS MTD: 10│
├─────────────────────────────────────────────────────────────┤
│ MRR: $5,400  │ Net new: +$1,200  │ ARPA: $90  │ Churn: -$99 │
├─────────────────────────────────────────────────────────────┤
│ [Expiring trials queue]     │ [At-risk trials]              │
│ [Upcoming demos]            │ [Recent conversions]          │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Sources & Integration

| System | Data | Sync |
|--------|------|------|
| HubSpot / Pipedrive | Pipeline stages, deals | Real-time webhooks |
| Stripe | Subscriptions, MRR, invoices | Webhooks |
| tenant-service | Trial dates, onboarding % | Hourly + events |
| Calendly | Demo schedule | Webhook |
| reporting-service | Aggregated KPIs | Daily batch |
| Super Admin (`/super-admin`) | Cross-tenant view | Internal |

### Key webhooks

| Event | Dashboard update |
|-------|------------------|
| `deal.stage.demo_booked` | Demos booked +1 |
| `deal.stage.converted` | Conversions +1 |
| `stripe.subscription.created` | MRR recalc |
| `trial.expiring_7d` | Expiring queue |
| `onboarding.progress.updated` | Trial health |

---

## Access & Refresh

| Dashboard | Refresh | Access |
|-----------|---------|--------|
| CRM native | Real-time | Sales, CS |
| Grafana revenue | 1 hour | Leadership |
| Super Admin trials | 15 min | Ops, CS lead |
| Weekly email digest | Monday 08:00 GMT | All sales |

---

## Weekly Sales Meeting Agenda (data-driven)

1. Demos booked vs target (8/week)
2. Show rate and no-show actions
3. New trials and activation rate
4. Expiring trials — conversion plan
5. Conversions and MRR vs target
6. At-risk accounts — CS assignments
7. Forecast update

---

*Companion: `pipeline-analytics.md`, `conversion-sequence.md`, `churn-prevention.md`*
