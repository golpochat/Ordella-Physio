# Ordella Physio — Trial Nurture Sequence

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Sales & Conversion Engine  
**Duration:** 14 days (aligned with trial)  
**Trigger:** `trial.registered` or CRM stage Trial Started

---

## Sequence Overview

| Day | Theme | Channel | Skip if |
|-----|-------|---------|---------|
| 1 | Welcome | Email + in-app | — |
| 3 | Feature highlight | Email + tooltip | Feature already used |
| 7 | Success story | Email | Converted |
| 10 | Usage reminder | Email + in-app banner | Converted |
| 13 | Conversion CTA | Email + SMS (opt-in) | Converted |

**Parallel tracks:** Onboarding automation (`growth/clinic-onboarding-automation/`) handles setup tasks; this sequence drives engagement and conversion.

---

## Day 1: Welcome Email

**Trigger:** Trial Started (within 1 hour of registration)  
**Goal:** Orient admin; drive first login and wizard start

**Subject:** Welcome to Ordella Physio, [Clinic Name] — let's get you live

**Body:**

Hi [First Name],

Your **14-day free trial** is active. Most clinics complete setup in under 2 hours.

**Your checklist:**
1. Complete clinic profile → {{profile_link}}
2. Invite your first therapist → {{staff_link}}
3. Add a patient → {{patients_link}}
4. Create your first appointment → {{appointments_link}}

**Clinic Admin portal:** {{portal_link}}  
**Onboarding guide:** {{onboarding_kit_link}}

Questions? Reply to this email or book a 15-min setup call: {{setup_call_link}}

Welcome aboard,  
Ordella Physio Team

### In-app (same day)

- Onboarding wizard modal on first `/clinic` login
- Progress widget visible (0%)

### CRM

- Deal stage: Trial Started
- CS task: none (Day 7 if not activated)

---

## Day 3: Feature Highlight

**Trigger:** Trial Day 3, 09:00 clinic timezone  
**Goal:** Drive patient + appointment creation  
**Skip if:** `onboarding.appointment.created` already true

**Subject:** [Clinic Name] — add patients and book your first appointment

**Body:**

Hi [First Name],

You're 3 days into your trial. Today's focus: **patients and appointments**.

- **Add patients:** {{patients_link}} (or import CSV: {{import_guide_link}})
- **Book an appointment:** {{appointments_link}}

Once your first appointment is booked, your team will see how notifications and calendars work together.

**Pro tip:** Connect Google Calendar in 2 minutes → {{marketplace_link}}

[First Name], need help? {{setup_call_link}}

Ordella Physio

### In-app

- Tooltip on `/clinic/patients`: "Add 3 patients to complete onboarding"
- Dashboard banner if progress < 50%

### Personalization by plan

| Trial plan | Highlight |
|------------|-----------|
| Starter | Scheduling + patient portal |
| Pro | + "Try AI-assisted notes on your first appointment" |

---

## Day 7: Success Story

**Trigger:** Trial Day 7, 09:00 clinic timezone  
**Goal:** Social proof + check-in  
**Skip if:** Converted to paid

**Subject:** How [Similar Clinic] cut note time by 20 minutes per patient

**Body:**

Hi [First Name],

You're one week into your Ordella trial. Clinics like yours tell us the biggest win is **one platform for scheduling, notes, and billing** — no more switching between tools.

> *"We replaced three separate tools with Ordella. Our therapists finish notes faster, and I finally have visibility into clinic performance."*  
> — **[Placeholder Name]**, Owner, **[Placeholder Clinic]**, London

**Your progress:** [X]% onboarding complete · [Y] appointments · [Z] therapists invited

How's it going? Hit reply — we'd love to hear from you.

**Not fully set up yet?** Book a free 30-min onboarding call: {{checkin_link}}

Ordella Physio

### Branching

| Progress | Additional CTA |
|----------|----------------|
| < 70% | Emphasize setup call |
| ≥ 70% | Emphasize plan selection preview |
| Pro trial, 0 notes | Link to AI notes help article |

### CRM

- CS task if progress < 30%
- NPS micro-survey link (optional): "How's your trial? 0–10"

---

## Day 10: Usage Reminder

**Trigger:** Trial Day 10, 09:00 clinic timezone  
**Goal:** Pre-conversion nudge; plan recommendation  
**Skip if:** Converted

**Subject:** 4 days left — here's the right plan for [Clinic Name]

**Body:**

Hi [First Name],

Your trial ends on **[Expiry Date]** (4 days from now).

Based on your clinic ([Therapist Count] therapists), we recommend:

**[Recommended Plan]** — [Price]/month  
[2–3 plan-specific bullets]

| Plan | Price | Therapists |
|------|-------|------------|
| Starter | $49/mo | Up to 2 |
| Pro | $99/mo | Up to 10 |

**Choose your plan:** {{billing_link}}

Your data stays safe — upgrade anytime before trial ends.

Ordella Physio

### In-app banner

**Location:** Clinic Admin dashboard  
**Copy:** "4 days left on your trial. Choose Starter or Pro to keep your clinic running."  
**CTA:** View plans → `/clinic/billing`  
**Dismiss:** Until next login

### CRM

- Deal flag: `conversion_window_open`
- AE task for deals with score ≥ 80

---

## Day 13: Conversion CTA

**Trigger:** Trial Day 13, 09:00 clinic timezone  
**Goal:** Urgent conversion  
**Skip if:** Converted

**Subject:** Last day tomorrow — keep [Clinic Name] on Ordella

**Body:**

Hi [First Name],

Your trial ends **tomorrow**.

Don't lose access to your appointments, patients, and notes.

**Upgrade now (takes 2 minutes):** {{billing_link}}

Questions about plans? Reply or call us: {{sales_phone_placeholder}}

Thank you for trying Ordella Physio,  
[CS Name]

### Optional SMS (opt-in, Day 13)

> [First Name], your Ordella trial ends tomorrow. Upgrade here: {{short_billing_link}} Reply STOP to opt out.

### In-app

- Full-width banner, non-dismissible on Day 13–14
- Modal on login: "Trial ends tomorrow" + CTA

### CRM

- AE + CS joint task for Pro+ trials not converted
- `trial.expiring_24h` event

---

## Sequence Exit Rules

| Event | Action |
|-------|--------|
| Converted to paid | Unenroll all remaining emails |
| Trial extended | Reschedule Day 10–13 relative to new end date |
| Account paused (expired) | Enroll win-back (`churn-prevention.md`) |
| Unsubscribe | Stop marketing; transactional only |

---

## Metrics

| Metric | Target |
|--------|--------|
| Day 1 email open rate | > 50% |
| Day 3 → first appointment (if not done) | +15% lift |
| Day 7 check-in reply rate | > 10% |
| Day 10 billing page visits | > 25% of active trials |
| Day 13 conversion rate | > 15% of still-active trials |

---

*Companion: `conversion-sequence.md`, `trial-activation-flow.md`, `growth/clinic-acquisition/follow-up-automation.md`*
