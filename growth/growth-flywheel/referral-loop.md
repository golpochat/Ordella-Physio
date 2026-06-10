# Ordella Physio — Referral Loop

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Growth Flywheel  
**Loop:** Happy customers → refer → new clinics → more happy customers

---

## Referral Loop Model

```
Delighted clinic/therapist → Share referral link → New clinic signs up → Converts → Reward issued → Advocate reinforces loop
```

| Stage | Owner | Automation |
|-------|-------|------------|
| Identify advocates | CS (NPS ≥ 8) | CRM rule |
| Prompt referral | Email + in-app | Day 30 post-conversion |
| Track attribution | UTM + referral code | CRM + Stripe metadata |
| Reward fulfillment | Finance + billing | Stripe credit webhook |
| Report | Growth | Flywheel dashboard |

**Target:** 10% of paying clinics refer ≥ 1 clinic per year; 40% referral → conversion.

---

## Clinic Referral Incentives

### Program: "Refer a Clinic"

| Element | Detail |
|---------|--------|
| **Referrer reward** | 1 month free subscription (placeholder) |
| **Referee reward** | 1 month free on first paid month (placeholder) |
| **Eligibility (referrer)** | Paid Starter or Pro; active ≥ 30 days; NPS ≥ 7 |
| **Eligibility (referee)** | New tenant; not existing customer |
| **Cap** | 12 referrals per clinic per year |

### Tiered rewards (annual)

| Referrals converted | Bonus |
|---------------------|-------|
| 1 | 1 month free |
| 3 | + $100 account credit |
| 5 | Upgrade to Pro for 3 months (Starter referrers) |
| 10 | "Ordella Advocate" badge + conference ticket (placeholder) |

### Clinic admin experience

| Touchpoint | Content |
|------------|---------|
| `/clinic/billing` | "Refer a clinic" card with unique link |
| Day 30 email | Referral CTA after NPS ≥ 8 |
| Quarterly newsletter | Top referrers leaderboard |

**Referral link format:**
```
https://ordella-physio.com/register?ref={clinic_referral_code}&utm_source=referral&utm_medium=clinic
```

---

## Therapist Referral Incentives

### Program: "Therapist Advocate"

| Element | Detail |
|---------|--------|
| **Audience** | Therapists on active clinics; locums opening new practices |
| **Reward** | $50 gift card per converted clinic (placeholder) |
| **Eligibility** | Referred clinic completes first paid month |
| **Mechanic** | Personal code: `THERAPIST-{shortId}` |

### Therapist touchpoints

| Channel | When |
|---------|------|
| `/therapist` dashboard | "Know a clinic that needs Ordella?" (footer) |
| Post-note milestone | In-app: "50 notes created — share Ordella" |
| CPD webinar | Verbal CTA + QR code |

### Dual attribution

If therapist refers and their current clinic also refers same lead:
- Clinic referral takes precedence for subscription credit
- Therapist receives reduced reward ($25) or thank-you only (policy TBD)

---

## Automated Referral Tracking

### Data model (placeholder)

| Field | Storage |
|-------|---------|
| `referral_code` | tenant-service / user profile |
| `referred_by_tenant_id` | tenant metadata |
| `referred_by_user_id` | registration payload |
| `referral_source` | `clinic` / `therapist` / `partner` |
| `referral_status` | `pending` / `trial` / `converted` / `rewarded` |

### Event pipeline

| Event | Action |
|-------|--------|
| `register` with `?ref=` | Store attribution on tenant |
| `trial.registered` | CRM: referral deal linked |
| `billing.subscription.created` | Status → `converted`; queue reward |
| `referral.reward.issued` | Email both parties; CRM note |

### CRM integration

| CRM field | Value |
|-----------|-------|
| `lead_source` | Referral |
| `referring_tenant` | Company lookup |
| `referral_code` | UTM/ref param |
| Deal stage on convert | Trigger reward workflow |

### Fraud prevention

| Rule | Action |
|------|--------|
| Same email domain self-referral | Block |
| Referrer = referee tenant | Block |
| Convert + cancel within 30 days | Claw back reward |
| Duplicate referral code abuse | Rate limit + manual review |

---

## Referral Rewards Fulfillment

### Clinic reward (1 month free)

| Step | System |
|------|--------|
| 1 | Referee first payment succeeds |
| 2 | Wait 30 days (no churn) |
| 3 | Apply Stripe coupon or invoice credit to referrer |
| 4 | Email: "Your referral reward is applied" |

### Therapist reward ($50 gift card)

| Step | System |
|------|--------|
| 1 | Referee first payment + 30 days |
| 2 | CS validates therapist attribution |
| 3 | Issue gift card via Tremendous/Rewardful (placeholder) |
| 4 | Email therapist with redemption link |

### Professional referrer (accountant/consultant)

| Model | Payout |
|-------|--------|
| Revenue share | 10% first-year MRR (placeholder) |
| One-time | $200 per converted clinic |
| Payout trigger | 90 days active + Finance approval |

---

## Referral Marketing Assets

| Asset | Use |
|-------|-----|
| Referral landing page | `/refer` — explains program |
| Email template (referrer → peer) | Copy-paste intro |
| One-pager PDF | "Why we use Ordella" |
| Social share cards | LinkedIn, email signature |

---

## Metrics

| Metric | Month 3 target | Month 12 target |
|--------|----------------|-----------------|
| % clinics with ≥ 1 referral sent | 15% | 25% |
| Referral signups / month | 5 | 20 |
| Referral → paid conversion | 40% | 45% |
| % new MRR from referrals | 10% | 20% |
| CAC via referral | < $40 | < $30 |

---

*Companion: `partner-loop.md`, `flywheel-dashboard.md`, `flywheel-kpis.md`, `growth/clinic-acquisition/acquisition-channels.md`*
