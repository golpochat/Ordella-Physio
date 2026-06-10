# Ordella Physio — Conversion Funnel

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Clinic Acquisition Pipeline

---

## Funnel Model

```
Awareness → Interest → Demo → Trial → Conversion → Expansion
```

Simplified acquisition view:

```
Awareness → Demo → Trial → Conversion
```

| Stage | Definition | Primary owner |
|-------|------------|---------------|
| **Awareness** | Clinic learns Ordella exists | Marketing |
| **Demo** | Qualified clinic sees product live | Sales (AE) |
| **Trial** | Clinic activates tenant and uses product | Product + CS |
| **Conversion** | Clinic becomes paying customer | CS + Sales |

---

## Stage 1: Awareness

### Objective
Generate identifiable interest from ICP clinics.

### Inputs
- SEO, paid ads, content, partnerships, outbound lists
- See `acquisition-channels.md`

### Outputs
- Website visitors
- Lead form submissions
- Content downloads
- Outbound list contacts

### Metrics

| Metric | Definition | Month 1 target | Month 3 target |
|--------|------------|----------------|----------------|
| Website visitors | Unique sessions | 1,500 | 5,000 |
| Visitor → Lead rate | Leads / visitors | 1.5% | 2.0% |
| Leads generated | New CRM leads | 25 | 100 |
| Cost per lead (CPL) | Ad spend / leads | < $60 | < $50 |
| Marketing qualified leads (MQL) | Score ≥ 40 | 15 | 60 |

---

## Stage 2: Demo

### Objective
Convert qualified leads into trial starts or Enterprise discovery.

### Inputs
- Qualified leads (score ≥ 60)
- Inbound demo requests (`/contact`)
- Outbound sequence replies

### Outputs
- Demos booked
- Demos completed
- Trial links sent

### Metrics

| Metric | Definition | Month 1 target | Month 3 target |
|--------|------------|----------------|----------------|
| Qualified leads | Score ≥ 60 | 10 | 40 |
| Demo booking rate | Booked / qualified | 50% | 60% |
| Demo show rate | Completed / booked | 70% | 75% |
| Demo → trial rate | Trials / completed demos | 40% | 50% |
| Demo → Enterprise discovery | Enterprise calls / demos | 10% | 15% |
| Sales cycle (demo → trial) | Median days | 3 | 2 |

### Demo stage KPIs (weekly)

| KPI | Target |
|-----|--------|
| Demos booked | 8 |
| Demos completed | 6 |
| Trials started from demo | 3 |
| No-show rate | < 25% |

---

## Stage 3: Trial

### Objective
Activate clinics and demonstrate value within 14 days.

### Inputs
- Trial signups (`/register`)
- Demo follow-up trial links
- Self-serve inbound

### Outputs
- Activated trials (≥ 1 appointment in 7 days)
- Notes created (Pro)
- Integrations connected

### Activation definition

| Signal | Weight |
|--------|--------|
| ≥ 1 therapist invited | Required |
| ≥ 3 patients added | Required |
| ≥ 1 appointment created | Required (activation threshold) |
| ≥ 1 note created | Pro trial bonus |
| ≥ 1 integration connected | Bonus |

**Trial Active:** All three required signals met.

### Metrics

| Metric | Definition | Month 1 target | Month 3 target |
|--------|------------|----------------|----------------|
| Trials started | New trial tenants | 15 | 50 |
| Trial activation rate | Active / started | 50% | 60% |
| Time to activation | Median days to first appointment | 3 | 2 |
| Trial health (Day 7) | Logins + appointments | 70% healthy | 80% |
| At-risk trials | Zero appointments by Day 7 | < 30% | < 20% |

### Trial stage KPIs (weekly)

| KPI | Target |
|-----|--------|
| New trials | 12 |
| Activations | 7 |
| CS outreach (at-risk) | 100% of at-risk |
| Trial NPS (Day 14 survey) | ≥ 7 |

---

## Stage 4: Conversion

### Objective
Convert active trials to paid Starter or Pro subscriptions (or Enterprise contract).

### Inputs
- Trial Active clinics
- Day 10–14 conversion prompts
- Sales-assisted closes

### Outputs
- Paid subscriptions (Stripe)
- Enterprise contracts

### Metrics

| Metric | Definition | Month 1 target | Month 3 target |
|--------|------------|----------------|----------------|
| Trial → paid conversion | Converted / trial active | 20% | 25% |
| Time to convert | Median days from trial start | 14 | 12 |
| Starter conversions | % of total | 40% | 35% |
| Pro conversions | % of total | 55% | 55% |
| Enterprise conversions | % of total | 5% | 10% |
| MRR added | New MRR from conversions | $1,500 | $6,000 |
| Churn (first 30 days) | Cancelled / converted | < 5% | < 3% |

### Conversion stage KPIs (monthly)

| KPI | Target |
|-----|--------|
| New paying clinics | 10 (Month 3) |
| Net new MRR | $6,000 (Month 3) |
| Average revenue per account (ARPA) | $90 |
| Customer acquisition cost (CAC) | < $500 |
| CAC payback | < 6 months |

---

## Full Funnel Conversion Rates

| Transition | Rate (Month 1) | Rate (Month 3 target) |
|------------|----------------|----------------------|
| Visitor → Lead | 1.5% | 2.0% |
| Lead → Qualified | 20% | 25% |
| Qualified → Demo Booked | 50% | 60% |
| Demo Booked → Completed | 70% | 75% |
| Demo Completed → Trial | 40% | 50% |
| Trial Started → Active | 50% | 60% |
| Trial Active → Converted | 20% | 25% |
| **Lead → Converted (end-to-end)** | **0.8%** | **1.5%** |

### Worked example (Month 3)

```
5,000 visitors
  → 100 leads (2%)
    → 25 qualified (25%)
      → 15 demos booked (60%)
        → 11 demos completed (75%)
          → 6 trials started (50%)
            → 4 trials active (60%)
              → 1 converted (25%)
```

At scale, multiple paths (self-serve trial, referral) improve end-to-end rate.

---

## KPI Dashboard

### North star metric
**Net new paying clinics per month**

### Supporting KPIs

| Category | KPI | Target (Month 3) |
|----------|-----|------------------|
| Volume | New paying clinics | 10 |
| Revenue | Net new MRR | $6,000 |
| Efficiency | CAC | < $500 |
| Efficiency | LTV:CAC ratio | > 3:1 |
| Activation | Trial activation rate | 60% |
| Conversion | Trial → paid rate | 25% |
| Retention | Logo churn (monthly) | < 3% |
| Expansion | Starter → Pro upgrade rate | 15% (6 months) |
| Satisfaction | NPS (converted customers) | ≥ 40 |

### Leading indicators (weekly review)

| Indicator | Green | Yellow | Red |
|-----------|-------|--------|-----|
| Demos booked | ≥ 8 | 4–7 | < 4 |
| Trial activations | ≥ 7 | 3–6 | < 3 |
| At-risk trials | < 20% | 20–30% | > 30% |
| Pipeline value | Growing WoW | Flat | Declining |

---

## Conversion Targets by Plan

| Plan | % of conversions (Month 3) | ARPA (placeholder) | Monthly target |
|------|---------------------------|-------------------|----------------|
| Starter | 35% | $49 | 3–4 clinics |
| Pro | 55% | $99 | 5–6 clinics |
| Enterprise | 10% | $800+ | 1 clinic |

---

## Funnel Optimization Playbook

| Problem | Diagnosis | Action |
|---------|-----------|--------|
| Low visitors | Awareness weak | Increase paid + SEO (`acquisition-channels.md`) |
| Low lead rate | Landing page CTA | A/B test hero, pricing teaser |
| Low qualification rate | Wrong lists | Tighten ICP filters |
| Low demo booking | Weak outreach | Refresh sequences (`outreach-sequences.md`) |
| High no-show | Reminder gaps | Fix calendar setup (`demo-calendar-setup.md`) |
| Low trial start | Weak demo close | AE training on `gtm/demo-script.md` |
| Low activation | Onboarding friction | CS outreach Day 3; onboarding wizard |
| Low conversion | Pricing/value gap | Day 10 call; plan comparison email |
| High churn | Expectation mismatch | Improve qualification + onboarding |

---

## Reporting Cadence

| Report | Frequency | Audience |
|--------|-----------|----------|
| Pipeline snapshot | Weekly | Sales + leadership |
| Funnel conversion report | Weekly | Growth team |
| MRR / conversion dashboard | Monthly | Leadership |
| Cohort analysis (trial → paid) | Monthly | Product + CS |
| Channel attribution | Monthly | Marketing |

---

*Companion: `crm-pipeline.md`, `follow-up-automation.md`, `gtm/sales-funnel.md`*
