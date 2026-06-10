# Ordella Physio — Renewal Flow

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Sales & Conversion Engine  
**Billing:** Stripe subscriptions (monthly + annual)

---

## Renewal Overview

```
Subscription active → Renewal approaching → Reminders → Auto-renew OR manual renew → Receipt → Expansion ask
```

| Billing cycle | Renewal type | Primary motion |
|---------------|--------------|----------------|
| Monthly | Auto-renew each month | Stripe automatic |
| Annual | Auto-renew on anniversary | Reminder sequence + auto-charge |
| Enterprise | Contract anniversary | CSM-led renewal |

---

## Annual Renewal Reminders

**Trigger:** `subscription.current_period_end` − 30/14/7 days  
**Applies to:** Annual Starter, Annual Pro, Enterprise annual contracts

### Reminder sequence

| Day | Channel | Content |
|-----|---------|---------|
| -30 | Email | "Your annual plan renews on [date]" |
| -14 | Email | Renewal summary + optional incentive |
| -7 | Email + CS task (Pro+) | "Questions before renewal?" |
| -1 | Email | "Renews tomorrow — $[amount]" |
| 0 | Stripe | Auto-charge |
| +1 | Email | Receipt + thank you + referral |

### Day -30 email

**Subject:** [Clinic Name] — annual renewal on [Date]

**Body:**

Hi [First Name],

Your Ordella **[Plan]** annual subscription renews on **[Date]** for **$[Amount]**.

**What's included:** [Plan bullets]  
**Therapists active:** [N] / [limit]

**Manage billing:** {{stripe_portal_link}}

No action needed if your payment method is current — we'll renew automatically.

Ordella Physio

### Day -14 email (with incentive — placeholder)

**Subject:** Renew early and save 5% (optional offer)

**Body:**

Hi [First Name],

Your renewal is in 2 weeks. Renew now and get **5% off** your next year (placeholder campaign).

**Renew:** {{billing_link}}

Ordella Physio

*Finance approval required for discount campaigns.*

---

## Auto-Renew Logic

### Monthly plans

| Step | System |
|------|--------|
| 1 | Stripe invoices on billing anniversary |
| 2 | Charge default payment method |
| 3 | Success → `invoice.paid` webhook → extend access |
| 4 | Failure → dunning (`churn-prevention.md`) |

**Customer communication:** Receipt email only (no pre-reminder for monthly).

### Annual plans

| Step | System |
|------|--------|
| 1 | Reminder sequence -30 to -1 days |
| 2 | Stripe auto-charge on period end |
| 3 | Success → renewal confirmation email |
| 4 | Failure → 14-day dunning; access per grace policy |

### Enterprise contracts

| Step | Owner |
|------|-------|
| -90 days | CSM renewal planning |
| -60 days | Proposal / updated terms |
| -30 days | Signature / PO |
| 0 | Invoice or Stripe custom subscription renew |
| +7 | QBR scheduled |

**Auto-renew:** Per contract clause (default: auto-renew 12 months unless 60-day notice).

---

## Stripe Configuration (placeholder)

| Setting | Value |
|---------|-------|
| `collection_method` | `charge_automatically` |
| `payment_behavior` | `default_incomplete` → retry |
| Smart retries | Enabled |
| Failed payment emails | Stripe + Ordella branded |
| Customer portal | Allow payment method update |
| Proration | On upgrade mid-cycle |

### Webhooks

| Event | Action |
|-------|--------|
| `invoice.upcoming` | Trigger renewal reminder (-7d sync) |
| `invoice.paid` | Renewal success; CRM note |
| `invoice.payment_failed` | Dunning + CS alert |
| `customer.subscription.updated` | Plan change logged |
| `customer.subscription.deleted` | Churn workflow |

---

## Renewal Incentives

| Incentive | Eligibility | Approval |
|-----------|-------------|----------|
| Early annual renew (-14d) | 5% off year 2 | CS Manager |
| Multi-year prepay | 10% off (2-year) | Finance |
| Loyalty (3+ years) | 1 month free on renew | CS Manager |
| Referral at renewal | 1 month free | Auto if referral converts |

**Do not stack** incentives without Finance approval.

---

## Cancellation vs Renewal

### Cancel flow (customer-initiated)

| Step | Action |
|------|--------|
| 1 | Admin requests cancel via portal or email |
| 2 | CS save attempt (churn-prevention playbook) |
| 3 | If confirmed → cancel at period end |
| 4 | Confirmation email with end date |
| 5 | -7 days before end: "Access ends [date]" |

### Retention at renewal

| Signal | Action |
|--------|--------|
| NPS < 7 at renewal | CSM call before charge |
| Payment method expiring | Proactive email -45 days |
| Downgrade viewed in portal | CS outreach |
| Competitor mention in ticket | AE save play |

---

## Renewal Metrics

| Metric | Target |
|--------|--------|
| Gross renewal rate (annual) | > 85% |
| Net renewal rate (after downgrade) | > 80% |
| Payment failure on renewal | < 5% |
| Renewal save rate (cancel attempts) | > 25% |
| Expansion at renewal | 15% add seats or upgrade |

---

## Renewal Dashboard Widgets

| Widget | Definition |
|--------|------------|
| Renewals next 30 days | Count + MRR at risk |
| Renewals next 90 days | Enterprise pipeline |
| Failed renewal payments | Open dunning |
| Renewal rate (trailing 12m) | Logo % |
| Expansion at renewal | MRR added |

---

## Document Cross-References

| Topic | Document |
|-------|----------|
| Payment failure | `churn-prevention.md` |
| Upgrade at renewal | `upgrade-flow.md` |
| Enterprise QBR | `growth/clinic-onboarding-automation/support-escalation-flow.md` |
| Pricing | `gtm/pricing-model.md` |

---

*Companion: `sales-dashboard.md`, `pipeline-analytics.md`, `churn-prevention.md`*
