# Ordella Physio — Follow-Up Automation

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Clinic Acquisition Pipeline  
**Automation tool (placeholder):** HubSpot Workflows / Customer.io / SendGrid

---

## Automation Overview

| Sequence | Trigger | Steps | Duration | Owner |
|----------|---------|-------|----------|-------|
| Post-demo follow-up | Demo Completed | 4 | 14 days | AE + automated |
| Trial follow-up | Trial Started | 8 | 14 days | CS + automated |
| Pre-expiry follow-up | Trial Day 10 | 4 | 4 days | CS + automated |
| Post-conversion follow-up | Converted | 6 | 30 days | CS + automated |
| No-show follow-up | Demo no-show | 3 | 7 days | AE + automated |
| Nurture re-engagement | Nurture (90 days) | 3 | 14 days | Marketing |

---

## Post-Demo Follow-Up

**Trigger:** AE marks deal as Demo Completed in CRM  
**Goal:** Trial signup within 48 hours

### Step 1 — Within 1 hour (automated email)

**Subject:** Thanks for the demo, [First Name] — next steps for [Clinic Name]

**Body:**

Hi [First Name],

Great speaking with you today. As discussed:

- **Start your 14-day free trial:** {{trial_link}}
- **Onboarding guide:** {{onboarding_kit_link}}
- **Features we covered:** [auto-filled from CRM pain_point]

I'll check in on [Day + 3] to see how setup is going. Reply anytime with questions.

[AE Name]  
Ordella Physio

**CRM task:** AE adds demo notes within 1 hour.

---

### Step 2 — Day 1 (automated, if no trial)

**Subject:** Quick start: [Clinic Name] on Ordella in 2 hours

**Body:**

Hi [First Name],

Most clinics complete setup in under 2 hours:

1. Register → invite therapists → add patients → create first appointment

Your trial link: {{trial_link}}

Need help? Reply to this email or book a 15-min setup call: {{intro_call_link}}

[AE Name]

---

### Step 3 — Day 3 (automated + AE task)

**Email (if no trial):**

**Subject:** Any questions from the demo?

**Body:**

Hi [First Name],

Wanted to check in — did you get a chance to start the trial? Happy to answer any questions from our demo.

{{trial_link}}

[AE Name]

**CRM task:** AE manual call/email if high-score deal (≥ 80).

---

### Step 4 — Day 7 (automated, if no trial)

**Subject:** Still interested in Ordella for [Clinic Name]?

**Body:**

Hi [First Name],

I'll keep this short — if Ordella isn't the right fit, no worries. If timing is the issue, when should I check back?

Otherwise, your trial is still waiting: {{trial_link}}

[AE Name]

**CRM action:** No trial by Day 7 → move to Nurture or AE closes lost.

---

## Trial Follow-Up

**Trigger:** Stripe/trial webhook → Trial Started  
**Goal:** Activation by Day 7, conversion by Day 14

### Step 1 — Hour 0 (automated welcome)

**Subject:** Welcome to Ordella Physio, [Clinic Name]!

**Body:**

Hi [First Name],

Your 14-day trial is active. Here's your setup checklist:

- [ ] Complete clinic profile
- [ ] Invite your first therapist
- [ ] Add 3 patients
- [ ] Create your first appointment

**Clinic Admin portal:** {{portal_link}}  
**Onboarding guide:** {{onboarding_kit_link}}

Questions? Reply to this email.

Ordella Physio Team

---

### Step 2 — Day 1 (automated)

**Subject:** Step 2: Invite your therapists

**Body:**

Hi [First Name],

Today's goal: invite at least one therapist. They'll get their own portal for appointments and notes.

**Invite staff:** {{staff_invite_link}}

[CS Name]

---

### Step 3 — Day 3 (automated)

**Subject:** Add your first patients

**Body:**

Hi [First Name],

Next step: add patients so you can book appointments.

**Add patients:** {{patients_link}}

Patients can later access their portal at {{patient_portal_link}}.

[CS Name]

---

### Step 4 — Day 5 (automated + CS task if not activated)

**Subject:** Connect your calendar (5 min)

**Body:**

Hi [First Name],

Quick win: connect Google Calendar through our Marketplace so appointments sync automatically.

**Marketplace:** {{marketplace_link}}

[CS Name]

**CRM task (if not activated):** CS calls clinic — offer 15-min setup help.

---

### Step 5 — Day 7 (automated check-in)

**Subject:** How's your first week on Ordella?

**Body:**

Hi [First Name],

You're one week into your trial. How's it going?

- Reply with any questions
- Book a check-in call: {{checkin_link}}
- Read tips: {{onboarding_kit_link}}

[CS Name]

**In-app:** NPS micro-survey (1–10) if activated.

---

### Step 6 — Day 10 (automated — pre-expiry preview)

See Pre-Expiry section below.

---

### Step 7 — Day 12 (automated)

**Subject:** 2 days left on your trial

**Body:**

Hi [First Name],

Your trial ends in 2 days. Choose a plan to keep your data and continue:

| Plan | Price | Best for |
|------|-------|----------|
| Starter | $49/mo | Up to 2 therapists |
| Pro | $99/mo | Up to 10 therapists |

**Choose plan:** {{billing_link}}

[CS Name]

---

### Step 8 — Day 14 (automated)

**Subject:** Your trial ends today

**Body:**

Hi [First Name],

Your trial ends today. Upgrade now to avoid interruption:

**Choose plan:** {{billing_link}}

Your data is retained for 30 days if you need more time.

[CS Name]

**CRM action:** Trial expired → Nurture + win-back sequence at Day 21.

---

## Pre-Expiry Follow-Up

**Trigger:** Trial Day 10 (4 days before expiry)  
**Goal:** Conversion before Day 14

### Step 1 — Day 10 (automated email)

**Subject:** 4 days left — here's what to do next

**Body:**

Hi [First Name],

Your trial ends on [Expiry Date]. Based on your usage:

- Therapists: [count]
- Patients: [count]
- Appointments: [count]

**Recommended plan:** [Starter/Pro based on therapist count]

**Upgrade:** {{billing_link}}  
**Questions?** Book a 15-min call: {{checkin_link}}

[CS Name]

---

### Step 2 — Day 11 (automated, if not converted)

**Subject:** Plan comparison for [Clinic Name]

**Body:**

Hi [First Name],

Quick comparison:

| | Starter | Pro |
|---|---------|-----|
| Price | $49/mo | $99/mo |
| Therapists | 2 | 10 |
| AI notes | — | ✓ |
| Reporting | — | ✓ |

**Upgrade:** {{billing_link}}

[CS Name]

---

### Step 3 — Day 12 (CS task)

**CRM task:** CS calls clinic (Pro+ trials) or sends personal email (Starter).

**Talk track:**
- "What's holding you back from choosing a plan?"
- Handle objections (see `gtm/demo-script.md`)
- Offer annual discount (20% savings)

---

### Step 4 — Day 13 (automated — final urgency)

**Subject:** Last day tomorrow — keep [Clinic Name] on Ordella

**Body:**

Hi [First Name],

Your trial ends tomorrow. Upgrade to keep your clinic running without interruption.

**Upgrade now:** {{billing_link}}

[CS Name]

---

## Post-Conversion Follow-Up

**Trigger:** Stripe `subscription.created` webhook → Converted  
**Goal:** Successful onboarding, NPS ≥ 8, referral prompt by Day 30

### Step 1 — Hour 0 (automated)

**Subject:** Welcome to Ordella [Plan Name], [Clinic Name]!

**Body:**

Hi [First Name],

You're officially on Ordella [Starter/Pro/Enterprise]. Thank you.

**Your onboarding checklist:** {{onboarding_readiness_link}}  
**Support:** support@ordella-physio.com

[CS Name]

---

### Step 2 — Day 1 (automated)

**Subject:** Complete your clinic setup

**Body:**

Hi [First Name],

Three things to finish this week:

1. Invite all therapists
2. Import remaining patients
3. Connect Google Calendar (Marketplace)

**Onboarding guide:** {{onboarding_kit_link}}

[CS Name]

---

### Step 3 — Day 7 (automated + CS call for Pro+)

**Subject:** Week 1 check-in

**Body:**

Hi [First Name],

One week in — how's the team finding Ordella?

Reply with feedback or book a call: {{checkin_link}}

[CS Name]

**CRM task (Pro+):** CS onboarding call if not completed.

---

### Step 4 — Day 14 (automated NPS)

**Subject:** Quick question: how are we doing? (1 question)

**Body:**

Hi [First Name],

On a scale of 0–10, how likely are you to recommend Ordella Physio to another physio clinic?

[0] [1] [2] [3] [4] [5] [6] [7] [8] [9] [10]

[CS Name]

**CRM action:** NPS ≤ 6 → CS manager outreach within 24h.

---

### Step 5 — Day 21 (automated — feature expansion)

**Subject:** Features you might not have tried yet

**Body:**

Hi [First Name],

Based on your [Plan] plan, here are features worth exploring:

- [Dynamic: AI notes / Reporting / Marketplace / Enterprise]

**Guide:** {{feature_link}}

[CS Name]

---

### Step 6 — Day 30 (automated — referral prompt)

**Subject:** Know another clinic that needs Ordella?

**Body:**

Hi [First Name],

If you know a physio clinic that could benefit from Ordella, we'd love an intro. Referring clinics get 1 month free (placeholder).

**Refer a clinic:** {{referral_link}}

Thank you for being an early customer.

[CS Name]

---

## No-Show Follow-Up

**Trigger:** Demo marked no-show in CRM

| Step | Timing | Channel |
|------|--------|---------|
| 1 | +15 min | Email with rebook link |
| 2 | +24h | SDR email + call attempt |
| 3 | +5 days | Final rebook email → Nurture |

See `demo-calendar-setup.md` no-show protocol.

---

## Nurture Re-Engagement

**Trigger:** 90 days in Nurture stage

| Step | Day | Content |
|------|-----|---------|
| 1 | 0 | "What's new at Ordella" product update |
| 2 | 7 | Case study or feature spotlight |
| 3 | 14 | Trial CTA — "Ready to revisit?" |

**CRM action:** Re-score lead; if ≥ 60 → offer demo.

---

## Automation Implementation Checklist

- [ ] CRM workflows created for each sequence
- [ ] Stripe webhooks → Trial Started, Converted triggers
- [ ] Product events → activation detection (trial active)
- [ ] UTM + deal ID in all email links
- [ ] Unsubscribe / opt-out on all marketing emails
- [ ] CS task creation rules for at-risk trials
- [ ] NPS survey integrated (Day 14 trial, Day 14 post-conversion)
- [ ] Email templates loaded with personalization tokens
- [ ] Test full sequence in staging before production

---

*Companion: `crm-pipeline.md`, `onboarding-readiness-checklist.md`, `gtm/onboarding-flow.md`*
