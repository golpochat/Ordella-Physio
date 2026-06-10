# Ordella Physio — Pipeline Analytics

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Sales & Conversion Engine  
**Tool (placeholder):** HubSpot reports + Metabase + `reporting-service`

---

## Analytics Overview

Pipeline analytics measures movement and conversion through the sales funnel, identifies drop-off points, and tracks sales cycle length for forecasting.

```
Lead → Contacted → Qualified → Demo Booked → Demo Completed → Trial Started → Trial Active → Converted
```

**Reference:** `growth/clinic-acquisition/crm-pipeline.md`, `growth/clinic-acquisition/conversion-funnel.md`

---

## Funnel Metrics

### Stage volumes (snapshot)

| Stage | Definition | Month 1 target | Month 3 target |
|-------|------------|----------------|----------------|
| Leads | New identifiable clinics | 25 | 100 |
| Contacted | First touch delivered | 20 | 80 |
| Qualified | Score ≥ 60 | 10 | 40 |
| Demo Booked | Calendar confirmed | 6 | 24 |
| Demo Completed | Demo delivered | 4 | 18 |
| Trial Started | Tenant registered | 3 | 12 |
| Trial Active | Activation ≥ 70% | 2 | 8 |
| Converted | Paid subscription | 1 | 3–10 |

*Month 3 target: 10 conversions/month at scale.*

### Stage conversion rates

| Transition | Formula | Month 1 | Month 3 target |
|------------|---------|---------|----------------|
| Lead → Contacted | Contacted / Leads | 80% | 85% |
| Contacted → Qualified | Qualified / Contacted | 20% | 25% |
| Qualified → Demo Booked | Booked / Qualified | 50% | 60% |
| Demo Booked → Completed | Completed / Booked | 70% | 75% |
| Demo Completed → Trial | Trial / Completed | 40% | 50% |
| Trial Started → Active | Active / Started | 50% | 60% |
| Trial Active → Converted | Converted / Active | 20% | 25% |
| **Lead → Converted** | End-to-end | 0.8% | 1.5% |

### Funnel visualization (Month 3 example)

```
100 Leads
  └─ 80 Contacted (80%)
       └─ 20 Qualified (25%)
            └─ 12 Demo Booked (60%)
                 └─ 9 Demo Completed (75%)
                      └─ 5 Trial Started (50%)
                           └─ 3 Trial Active (60%)
                                └─ 1 Converted (25%)
```

---

## Conversion Rates (Cohort Analysis)

### Cohort dimensions

| Dimension | Use |
|-----------|-----|
| Signup week | Trial → paid by week |
| Source (UTM) | Channel effectiveness |
| Plan trial | Starter vs Pro conversion |
| Region | UK / US / AU / CA |
| Therapist count | ICP segment |
| AE assigned | Rep performance |

### Example cohort table (trial → paid, 14-day window)

| Cohort week | Trials started | Converted (14d) | Rate |
|-------------|----------------|-----------------|------|
| W1 | 12 | 2 | 17% |
| W2 | 15 | 4 | 27% |
| W3 | 18 | 5 | 28% |
| W4 | 14 | 3 | 21% |

### Self-serve vs demo-sourced

| Path | Trials | Conversion rate (target) |
|------|--------|--------------------------|
| Demo → trial | 50% of trials | 30% |
| Self-serve `/register` | 50% of trials | 18% |

---

## Drop-Off Points

### Primary drop-offs (ranked)

| Rank | Drop-off | Typical rate | Root causes | Fixes |
|------|----------|--------------|-------------|-------|
| 1 | Contacted → Qualified | 75–80% fail | Wrong list, no pain, no budget | Tighten ICP; improve outreach |
| 2 | Trial Started → Active | 40–50% fail | No onboarding, admin busy | CS Day 3 call; wizard |
| 3 | Demo Booked → Completed | 25–30% no-show | Calendar conflicts | Reminders; rebook sequence |
| 4 | Trial Active → Converted | 75–80% fail | Price, timing, low usage | Conversion sequence; extension |
| 5 | Qualified → Demo Booked | 40% fail | Slow follow-up | SDR SLA 48h |

### Drop-off diagnostics

| Signal | Investigation |
|--------|---------------|
| High no-show | Reminder deliverability; timezone mismatch |
| Low trial activation | Onboarding friction; invite failures |
| Low conversion with high activation | Pricing; competitor; wrong plan trial |
| High churn post-conversion | Expectation mismatch; onboarding gap |

### Drop-off dashboard widgets

| Widget | Query |
|--------|-------|
| Biggest leak this month | Lowest stage-to-stage % |
| Stale deals | No activity 14+ days by stage |
| Lost reason breakdown | CRM `lost_reason` field |
| Time-in-stage p50/p90 | Days per stage |

---

## Sales Cycle Length

### Definitions

| Metric | Measurement |
|--------|-------------|
| **Lead → Converted** | `converted_at − lead_created_at` |
| **Qualified → Converted** | Excludes top-of-funnel noise |
| **Demo → Converted** | Demo completed → first payment |
| **Trial → Converted** | Trial start → first payment |

### Targets (placeholder)

| Segment | Lead → Converted | Demo → Converted | Trial → Converted |
|---------|------------------|------------------|-------------------|
| Starter SMB | 45 days | 21 days | 14 days |
| Pro SMB | 35 days | 18 days | 12 days |
| Enterprise | 120 days | 90 days | 60 days (pilot) |

### Cycle length by source

| Source | Median days (target) |
|--------|---------------------|
| Inbound | 25 |
| Outbound | 40 |
| Referral | 18 |
| Partnership | 50 |

### Reporting

| Report | Cadence |
|--------|---------|
| Sales cycle trend | Monthly |
| Cycle by AE | Monthly (coaching) |
| Cycle by lost deals | Quarterly (process fix) |

---

## Pipeline Velocity

**Formula:**  
`Velocity = (Open deals × Win rate × Avg deal value) / Sales cycle days`

| Input | Month 3 placeholder |
|-------|---------------------|
| Open qualified+ deals | 30 |
| Win rate | 25% |
| Avg MRR deal | $90 |
| Avg cycle (days) | 35 |
| **Velocity** | ~$19 MRR/day |

---

## Attribution Analytics

| Model | Use |
|-------|-----|
| First-touch | Marketing channel credit |
| Last-touch | Conversion channel credit |
| Multi-touch (linear) | Full journey |

**Required UTM on:** demo links, trial links, registration, Stripe metadata.

---

## Reporting Cadence

| Report | Owner | Audience | Cadence |
|--------|-------|------------|---------|
| Funnel snapshot | RevOps | Sales + leadership | Weekly |
| Cohort conversion | CS | CS + product | Weekly |
| Drop-off analysis | Sales Manager | Sales | Bi-weekly |
| Sales cycle | AE manager | AEs | Monthly |
| Channel ROI | Marketing | Leadership | Monthly |

---

## Implementation Checklist

- [ ] CRM stage history timestamps enabled
- [ ] `lost_reason` + `disqualify_reason` required fields
- [ ] Stripe MRR sync to CRM company record
- [ ] Trial cohort export (tenant-service → warehouse)
- [ ] Metabase funnel dashboard
- [ ] Weekly automated funnel email to `#growth`

---

*Companion: `sales-dashboard.md`, `growth/clinic-acquisition/conversion-funnel.md`, `churn-prevention.md`*
