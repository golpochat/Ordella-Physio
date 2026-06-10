# Ordella Physio — Flywheel KPIs

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Growth Flywheel

---

## KPI Framework

Six primary flywheel KPIs track compounding growth health. Secondary KPIs support each loop.

**Reporting cadence:** Weekly snapshot · Monthly review · Quarterly targets

---

## Primary KPIs

### 1. Monthly Active Clinics (MAC)

| Attribute | Detail |
|-----------|--------|
| **Definition** | Paying tenants with ≥ 1 admin login in trailing 30 days |
| **Formula** | `COUNT(paid_tenants WHERE admin_login_30d >= 1)` |
| **Why it matters** | Core scale metric — are customers actually using the product? |
| **Owner** | CS + Product |

| Period | Target |
|--------|--------|
| Month 3 | 40 |
| Month 6 | 75 |
| Month 12 | 150 |

**Segmentation:** Starter / Pro / Enterprise · Region · Cohort month

---

### 2. Therapist Activation Rate

| Attribute | Detail |
|-----------|--------|
| **Definition** | % of licensed therapist seats with ≥ 1 login in trailing 30 days |
| **Formula** | `active_therapists_30d / total_therapist_seats` |
| **Why it matters** | Clinical adoption drives retention and expansion |
| **Owner** | CS |

| Period | Target |
|--------|--------|
| Month 3 | 55% |
| Month 6 | 65% |
| Month 12 | 75% |

**Benchmark:** Green health ≥ 60% · Red < 30%

---

### 3. Trial-to-Paid Conversion Rate

| Attribute | Detail |
|-----------|--------|
| **Definition** | % of Trial Active clinics that convert to paid within 30 days of trial start |
| **Formula** | `converted_within_30d / trial_active_cohort` |
| **Why it matters** | Efficiency of acquisition + onboarding + conversion engine |
| **Owner** | Growth + CS |

| Period | Target |
|--------|--------|
| Month 3 | 22% |
| Month 6 | 25% |
| Month 12 | 28% |

**Segmentation:** Demo-sourced vs self-serve · Starter trial vs Pro trial · Region

---

### 4. Referral Rate

| Attribute | Detail |
|-----------|--------|
| **Definition** | % of paying clinics that generate ≥ 1 referred signup in trailing 90 days |
| **Formula** | `clinics_with_referral_signup_90d / paying_clinics` |
| **Why it matters** | Measures advocacy loop strength |
| **Owner** | CS + Marketing |

| Period | Target |
|--------|--------|
| Month 3 | 5% |
| Month 6 | 10% |
| Month 12 | 15% |

**Related:** Referral conversion rate target 40% · Referral MRR 15% of new MRR by Month 12

---

### 5. Churn Rate (Logo)

| Attribute | Detail |
|-----------|--------|
| **Definition** | % of paying clinics that cancel in the month |
| **Formula** | `churned_logos_month / logos_start_of_month` |
| **Why it matters** | Retention loop health |
| **Owner** | CS |

| Period | Target |
|--------|--------|
| Month 3 | < 4% |
| Month 6 | < 3% |
| Month 12 | < 2.5% |

**Related:** Revenue churn · Payment failure recovery > 60%

---

### 6. Net Revenue Retention (NRR)

| Attribute | Detail |
|-----------|--------|
| **Definition** | (Starting MRR + expansion − churn − contraction) / starting MRR for cohort |
| **Formula** | Standard SaaS NRR on trailing 12-month cohort |
| **Why it matters** | Ultimate flywheel outcome — growth without proportional acquisition spend |
| **Owner** | Finance + Growth |

| Period | Target |
|--------|--------|
| Month 6 | 95% |
| Month 12 | 105% |
| Month 18 | 110% |

**NRR > 100%** = expansion exceeds churn (flywheel compounding)

---

## Secondary KPIs by Loop

### Referral loop

| KPI | Month 12 target |
|-----|-----------------|
| Referral signups / month | 20 |
| Referral CAC | < $35 |
| Rewards issued on time | 95% within 14d |

### Partner loop

| KPI | Month 12 target |
|-----|-----------------|
| Partner-sourced signups / month | 15 |
| Active strategic partners | 8 |
| Integration adoption (Pro, ≥ 2) | 50% |

### Content loop

| KPI | Month 12 target |
|-----|-----------------|
| Organic sessions / month | 5,000 |
| Content-sourced trials / month | 25 |
| Case studies live | 6 |

### Community loop

| KPI | Month 12 target |
|-----|-----------------|
| Community members | 1,250 |
| Webinar → trial conversion | 15% |
| Community MAU | 30% |

### PLG loop

| KPI | Month 12 target |
|-----|-----------------|
| Self-serve trial share | 60% |
| Median time to activation | 1 day |
| PLG-attributed upgrades | 25% of Starter→Pro |

### Retention loop

| KPI | Month 12 target |
|-----|-----------------|
| Green health accounts | 75% |
| Red → green recovery | 45% |
| GRR (annual cohort) | 88% |

---

## KPI Scorecard (Monthly)

| KPI | Actual | Target | Status | Trend |
|-----|--------|--------|--------|-------|
| MAC | — | — | — | — |
| Therapist activation | — | — | — | — |
| Trial-to-paid | — | — | — | — |
| Referral rate | — | — | — | — |
| Logo churn | — | — | — | — |
| NRR | — | — | — | — |

**Status:** Green ≥ 100% target · Yellow 80–99% · Red < 80%

---

## Flywheel Health Index (composite)

**Optional composite score (0–100):**

| KPI | Weight |
|-----|--------|
| MAC growth MoM | 15% |
| Therapist activation | 15% |
| Trial-to-paid | 20% |
| Referral rate | 15% |
| Churn (inverse) | 20% |
| NRR | 15% |

**Flywheel spinning fast:** Index ≥ 75  
**Needs attention:** Index 50–74  
**Stalled:** Index < 50

---

## Targets vs Growth Phase Milestones

| Milestone | MAC | MRR | NRR |
|-----------|-----|-----|-----|
| Growth Phase Month 3 | 40 | $6K | 95% |
| Growth Phase Month 6 | 75 | $12K | 100% |
| Growth Phase Month 12 | 150 | $25K | 105% |
| Operational Mode Year 2 | 300 | $50K | 110% |

---

## Data Ownership

| KPI | Source of truth | Reported in |
|-----|-----------------|-------------|
| MAC | reporting-service | Flywheel dashboard |
| Therapist activation | auth-service | Flywheel dashboard |
| Trial-to-paid | CRM + Stripe | Sales + flywheel dashboard |
| Referral rate | CRM | Flywheel dashboard |
| Churn | Stripe | Finance + flywheel dashboard |
| NRR | Stripe | Finance + board deck |

---

*Companion: `flywheel-dashboard.md`, all loop documents in `growth/growth-flywheel/`*
