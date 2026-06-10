# Ordella Physio — Churn Prevention

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Sales & Conversion Engine

---

## Churn Types

| Type | Definition | Detection |
|------|------------|-----------|
| **Trial churn** | Trial expires without conversion | `trial.expired` |
| **Logo churn** | Paid subscription cancelled | Stripe `subscription.deleted` |
| **Revenue churn** | Downgrade or seat reduction | Stripe `subscription.updated` |
| **Silent churn** | Paid but inactive (pre-cancel) | Usage signals |
| **Payment churn** | Failed payment → cancel | Stripe `invoice.payment_failed` |

**Target logo churn:** < 3% monthly (paid customers)

---

## Low Usage Alerts

### Usage signals (paid customers)

| Signal | Threshold | Severity |
|--------|-----------|----------|
| No admin login | 14 days | Yellow |
| No admin login | 30 days | Red |
| No appointments created | 30 days | Yellow |
| No therapist login | 21 days | Yellow |
| Onboarding progress stuck | < 50% after 30d paid | Yellow |
| Support tickets spike | 3+ in 7 days | Yellow |

### Trial at-risk (pre-conversion churn)

| Signal | Day | Action |
|--------|-----|--------|
| Progress < 30% | 5 | Email + CS task |
| No appointment | 7 | Setup call offer |
| No login | 10 | Re-engagement email |
| Expiring + low progress | 12 | AE outreach |

### Automated alerts

| Alert | Channel | Recipient |
|-------|---------|-----------|
| Red account | CRM + Slack `#cs-alerts` | CS owner |
| Yellow account | CRM task | CS owner |
| Trial at-risk | CRM + email CS | CS onboarding |

### Re-engagement email (paid, low usage)

**Subject:** [Clinic Name] — need help getting more from Ordella?

**Body:**

Hi [First Name],

We noticed it's been a while since your team used Ordella actively. Common quick wins:

- Connect Google Calendar → {{marketplace_link}}
- Invite therapists who haven't logged in
- Try AI-assisted notes (Pro) → {{help_link}}

**Book a 15-min check-in:** {{checkin_link}}

We're here to help,  
[CS Name]

---

## Payment Failure Alerts

### Stripe dunning flow

| Attempt | Timing | Action |
|---------|--------|--------|
| 1 | Day 0 | Stripe retry + email admin |
| 2 | Day 3 | Stripe retry + email + in-app banner |
| 3 | Day 7 | Stripe retry + CS call task |
| Final | Day 14 | Subscription paused/cancelled per settings |

### Admin email (Day 0)

**Subject:** Action required — payment failed for [Clinic Name]

**Body:**

Hi [First Name],

We couldn't process your subscription payment. Update your payment method to avoid interruption:

**Update billing:** {{stripe_portal_link}}

If you believe this is an error, reply to this email.

Ordella Physio Billing

### In-app banner

> Payment failed. Update your card to keep your clinic running. [Update payment]

### CRM

- Account health → **Red**
- CS task P1 within 4 hours
- AE notified for Enterprise accounts

---

## Renewal Reminders

*See also `renewal-flow.md` for annual contracts.*

### Monthly subscribers

| Event | Reminder |
|-------|----------|
| Auto-renew | Receipt email only (Stripe) |
| Cancel scheduled | 7-day "You'll lose access" email |

### Annual subscribers

| Day relative to renewal | Action |
|-------------------------|--------|
| -30 | Renewal reminder email |
| -14 | Renewal + incentive offer |
| -7 | CS call (Enterprise) |
| 0 | Auto-charge + receipt |
| +1 | Thank you + referral ask |

---

## Re-Engagement Sequences

### Trial expired win-back

**Trigger:** `trial.expired` + not converted  
**Duration:** 30 days

| Day | Channel | Message |
|-----|---------|---------|
| 1 | Email | "Your trial ended — data saved 30 days" |
| 7 | Email | Case study + 10% off first month (placeholder) |
| 14 | Email | "Last chance — data deletion in 16 days" |
| 21 | SDR email | Personal outreach |
| 30 | — | Data policy applies |

### Paid churned win-back

**Trigger:** `subscription.deleted`  
**Duration:** 90 days

| Day | Action |
|-----|--------|
| 0 | Exit survey email (why cancel?) |
| 14 | "What's new" product update |
| 45 | Win-back offer (1 month 50% off — placeholder) |
| 90 | Archive to long nurture |

### Exit survey (Day 0)

**Questions:**
1. Primary reason for leaving?
2. What would bring you back?
3. NPS 0–10

**CRM:** `churn_reason` required for analysis.

---

## Churn Prevention Playbook

| Scenario | Owner | Playbook |
|----------|-------|----------|
| Trial expiring, high usage | CS | Conversion call Day 12 |
| Trial expiring, low usage | CS | Extension + setup call (once) |
| Payment failed | CS | Dunning + card update |
| Paid inactive 30d | CS | Re-engagement email + call |
| Cancel request | CS | Save offer (1 month free — placeholder) |
| Enterprise renewal | CSM | QBR + renewal proposal -60d |

### Save offer rules (placeholder)

| Tenure | Offer |
|--------|-------|
| < 6 months | 1 month 25% off |
| 6–12 months | 1 month free |
| Enterprise | Custom contract refresh |

Requires CS Manager approval.

---

## Churn Metrics

| Metric | Target |
|--------|--------|
| Trial expiry without convert | < 75% (improve via conversion seq) |
| Paid logo churn (monthly) | < 3% |
| Payment failure recovery | > 60% |
| Win-back rate (expired trial) | > 5% |
| NPS (churned survey) | Track; target improve QoQ |

---

## Dashboard Integration

| Widget | Location |
|--------|----------|
| At-risk accounts | `sales-dashboard.md` |
| Payment failures open | CS dashboard |
| Churn MRR this month | Revenue dashboard |
| Churn reasons pie | `pipeline-analytics.md` |

---

*Companion: `renewal-flow.md`, `conversion-sequence.md`, `upgrade-flow.md`*
