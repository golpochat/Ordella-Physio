# Ordella Physio — Flywheel Dashboard

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Growth Flywheel  
**Tool (placeholder):** Metabase + HubSpot + Grafana + Super Admin

---

## Dashboard Purpose

Unified view of all six growth flywheel loops — measuring compounding growth, not just funnel conversion.

**Audience:** Growth team, Leadership, CS Lead, Marketing, Partnerships

**Refresh:** Daily batch + real-time for PLG and billing events

---

## Flywheel Overview Panel

```
        ┌─────────────┐
        │   CONTENT   │──→ leads
        └──────┬──────┘
               ↓
┌──────────┐  ┌──────────┐  ┌──────────┐
│ PARTNER  │→ │  PRODUCT │→ │ COMMUNITY│
└──────────┘  └────┬─────┘  └────┬─────┘
                   ↓             ↓
              ┌─────────┐   ┌──────────┐
              │RETENTION│←──│ REFERRAL │
              └─────────┘   └──────────┘
                   ↓
              Revenue + NRR
```

**North star:** Net Revenue Retention + Monthly Active Clinics

---

## 1. Referral Metrics

| Widget | Definition | Source |
|--------|------------|--------|
| Referral links generated | Clinics with ≥ 1 share | tenant metadata |
| Referral signups (MTD) | Registrations with `?ref=` | CRM |
| Referral conversions (MTD) | Paid from referral | Stripe + CRM |
| Referral conversion rate | Converted / signups | Calculated |
| Referral MRR | MRR from referral cohort | Stripe |
| Top referrers | Leaderboard (clinics) | CRM |
| Therapist referrals | Count by personal code | CRM |
| Rewards issued (MTD) | Credits + gift cards | Finance |
| Referral CAC | Reward cost / new MRR | Calculated |

**Alerts:** Referral signups drop 50% WoW · Reward fulfillment backlog > 10

---

## 2. Partner Metrics

| Widget | Definition | Source |
|--------|------------|--------|
| Active partners | Signed agreements | Partnerships CRM |
| Partner-sourced signups (MTD) | `?partner=` attribution | CRM |
| Partner → paid rate | Conversion % | CRM + Stripe |
| Partner MRR | Revenue from partner channel | Stripe |
| Marketplace adoption | % Pro with ≥ 2 integrations | marketplace-service |
| Co-marketing events (QTD) | Webinars, newsletters | Marketing calendar |
| Integration usage by partner | API/OAuth call volume | IntegrationUsageLog |
| Partner pipeline | Deals in partner stage | CRM |

**Alerts:** Partner signup rate < 20% · Integration error rate > 5%

---

## 3. Content Metrics

| Widget | Definition | Source |
|--------|------------|--------|
| Organic sessions (MTD) | GA4 | Analytics |
| Blog posts published (MTD) | CMS count | Marketing |
| Keywords top 20 | SEO tool | Semrush/Ahrefs |
| Lead magnet downloads (MTD) | Form submits | CRM |
| Content-sourced leads | UTM content | CRM |
| Content → trial rate | Trials / content leads | CRM |
| Social engagement | LinkedIn impressions + clicks | Social API |
| Case studies published | Live count | CMS |
| Email list growth | Subscribers | ESP |

**Alerts:** Organic traffic -30% MoM · Zero posts published in 2 weeks

---

## 4. Community Metrics

| Widget | Definition | Source |
|--------|------------|--------|
| Therapist community size | Members | LinkedIn/Discord |
| Owner community size | Members | Slack/Circle |
| Monthly active community % | Posted or attended / members | Community platform |
| Webinar registrations (MTD) | Signups | CRM |
| Webinar attendance rate | Attended / registered | Zoom |
| Webinar → trial conversion | Trials within 14d | CRM |
| Challenge participants (QTD) | Enrolled clinics | Product events |
| Community-sourced referrals | Attributed | CRM |

**Alerts:** Webinar attendance < 40% · Community MAU < 15%

---

## 5. PLG Metrics

| Widget | Definition | Source |
|--------|------------|--------|
| Self-serve trials % | Self-serve / all trials | CRM |
| Activation rate (70%+) | Trial Active / Started | Product events |
| Median time to activation | Hours to first appointment | tenant-service |
| PQL count (MTD) | Activation ≥ 70% in trial | CRM |
| Upgrade prompt impressions | In-app events | Analytics |
| Upgrade prompt CTR | Clicks / impressions | Analytics |
| PLG-attributed upgrades | Starter→Pro from prompt | CRM + Stripe |
| AI recommendation CTR | Clicks / impressions | Product analytics |
| Feature discovery completion | % clinics with checklist done | tenant-service |

**Alerts:** Activation rate < 50% · Upgrade CTR < 8%

---

## 6. Retention Metrics

| Widget | Definition | Source |
|--------|------------|--------|
| Monthly Active Clinics (MAC) | Paid + login 30d | Auth + billing |
| Therapist activation rate | Active therapists / seats | Auth |
| Health distribution | Green / yellow / red % | Health score job |
| At-risk accounts | Yellow + red count | CS dashboard |
| Churn MRR (MTD) | Cancelled MRR | Stripe |
| Logo churn rate (MTD) | Churned / start of month logos | Stripe |
| NRR (trailing 12m) | (Start MRR + expansion - churn) / start | Stripe |
| GRR (trailing 12m) | Retained MRR / start MRR | Stripe |
| Payment failure recovery rate | Recovered / failed | Stripe |
| QBR completion (Enterprise) | Held / scheduled | CS calendar |
| Win-back conversions (MTD) | Reactivated churned | CRM |

**Alerts:** Red accounts > 15% · NRR < 95% · Churn spike > 2× avg

---

## Dashboard Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  ORDELLA GROWTH FLYWHEEL                    [Month ▼] [Region ▼] │
├────────────┬────────────┬────────────┬────────────┬──────────────┤
│ MAC: 58    │ NRR: 102%  │ Referral   │ Partner    │ Content      │
│            │            │ MRR: $420  │ signups: 12│ leads: 45    │
├────────────┴────────────┴────────────┴────────────┴──────────────┤
│ PLG: Activation 62% │ Upgrade CTR 12% │ Community: 180 members    │
├──────────────────────────────────────────────────────────────────┤
│ [Referral leaderboard]  [Partner funnel]  [Content performance]  │
│ [Health score dist]     [At-risk queue]   [Flywheel KPI trends]  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Data Integration Map

| Loop | Primary systems |
|------|-----------------|
| Referral | tenant-service, CRM, Stripe |
| Partner | CRM, marketplace-service, partnerships DB |
| Content | GA4, CRM, ESP, CMS |
| Community | Zoom, community platform, CRM |
| PLG | Product analytics, tenant-service, Stripe |
| Retention | Health score pipeline, Stripe, CS CRM |

### Weekly flywheel email (Monday)

Automated digest to `#growth` Slack + leadership:
- MAC, NRR, referral MRR
- Top 3 wins + top 3 risks per loop
- At-risk account count
- Week-over-week deltas

---

## Governance

| Review | Cadence | Attendees |
|--------|---------|-----------|
| Flywheel standup | Weekly | Growth, Marketing, CS |
| Loop deep-dive | Monthly (rotate loop) | Loop owner + leadership |
| KPI target reset | Quarterly | Leadership + Finance |

---

*Companion: `flywheel-kpis.md`, `growth/sales-conversion-engine/sales-dashboard.md`*
