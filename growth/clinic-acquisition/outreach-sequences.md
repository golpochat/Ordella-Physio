# Ordella Physio — Outreach Sequences

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Clinic Acquisition Pipeline  
**ICP:** 2–10 therapist physio clinics, UK / US / AU / CA

---

## Sequence Overview

| Sequence | Steps | Duration | Channel | Owner |
|----------|-------|----------|---------|-------|
| Email (cold outbound) | 5 | 21 days | Email | SDR |
| LinkedIn | 5 | 14 days | LinkedIn | SDR |
| SMS (optional) | 3 | 7 days | SMS (Twilio) | SDR |
| Cold call (optional) | 1 script | Same day as Step 3 email | Phone | SDR |

**Exit conditions (all sequences):**
- Reply → pause sequence, SDR qualifies manually
- Demo booked → move to CRM Demo Booked
- Unsubscribe / opt-out → Disqualified (compliance)
- 5 touches, no reply → Nurture (re-enter in 90 days)

---

## Email Sequence (5 Steps)

**Audience:** Clinic owner or practice manager  
**Personalization tokens:** `[First Name]`, `[Clinic Name]`, `[City]`, `[Therapist Count]`

### Step 1 — Day 0: Problem-aware intro

**Subject:** `[Clinic Name]` — still running scheduling and notes separately?

**Body:**

Hi [First Name],

I came across [Clinic Name] in [City] and wanted to reach out. Most physio clinics we speak with are juggling scheduling in one tool, clinical notes in another, and billing in spreadsheets.

Ordella Physio is a practice platform built specifically for physiotherapy — appointments, SOAP notes (with AI assistance), Stripe billing, patient portal, and a mobile app, all in one place.

Would a 15-minute demo be useful? I can show you how clinics with [Therapist Count] therapists cut admin time and get therapists home earlier.

[Book a demo →] {{demo_link}}

Best,  
[SDR Name]  
Ordella Physio

---

### Step 2 — Day 4: Differentiator (role-native portals)

**Subject:** Re: one platform, every role

**Body:**

Hi [First Name],

Quick follow-up. One thing clinic owners tell us they love about Ordella: every role gets its own portal — therapists, patients, and admins each see exactly what they need. No cluttered dashboard pretending to work for everyone.

We also have AI-assisted SOAP notes — but nothing gets saved until the therapist reviews and accepts it.

[Book a demo →] {{demo_link}}  
Or start a 14-day free trial (no credit card): {{trial_link}}

[SDR Name]

---

### Step 3 — Day 8: Social proof + trial CTA

**Subject:** How physio clinics are cutting note time

**Body:**

Hi [First Name],

Therapists using Ordella's AI note assistant save an average of 15–20 minutes per patient on documentation — with full therapist control over what gets saved.

[Clinic Name] could be up and running in under 2 hours. 14-day free trial, no credit card.

[Start free trial →] {{trial_link}}

Happy to walk you through it live if you prefer: [Book a demo →] {{demo_link}}

[SDR Name]

---

### Step 4 — Day 14: Break-up email

**Subject:** Should I close your file?

**Body:**

Hi [First Name],

I've reached out a few times about Ordella Physio and haven't heard back — totally fine if the timing isn't right.

If you're still evaluating practice management tools, I'm happy to send a 2-page overview instead of more emails. Or if you'd like me to check back in [Quarter/Month], just reply with a date.

[Download overview →] {{one_pager_link}}

Otherwise I'll assume you're all set and won't follow up again.

[SDR Name]

---

### Step 5 — Day 21: Nurture handoff

**Subject:** Resources for [Clinic Name] (no pitch)

**Body:**

Hi [First Name],

Last note from me for now. I'm adding you to our monthly newsletter with physio practice tips — no sales emails unless you reply.

Useful resources:
- Clinic Operations Checklist (PDF): {{checklist_link}}
- SOAP Note Template Pack: {{soap_templates_link}}

If anything changes, I'm at [SDR email].

[SDR Name]

**CRM action:** Move to Nurture. Enroll in monthly newsletter.

---

## LinkedIn Sequence (5 Steps)

**Audience:** Clinic owner, practice manager, or senior therapist  
**Prerequisite:** Connection request accepted

### Step 1 — Day 0: Connection request

**Note (300 char max):**

Hi [First Name] — I work with physio clinics on practice management. Saw [Clinic Name] and thought it'd be worth connecting. Happy to share what we're seeing in the industry — no pitch.

---

### Step 2 — Day 2: Thank you + soft intro

**Message:**

Thanks for connecting, [First Name]. We built Ordella Physio specifically for physio clinics — scheduling, SOAP notes, billing, and patient portal in one platform. If you're ever evaluating tools, happy to share a quick overview. No pressure.

---

### Step 3 — Day 5: Feature spotlight (AI notes)

**Message:**

One feature therapists love: AI-assisted SOAP notes that draft from appointment context — but nothing saves until they review and accept. AI assists, therapists decide.

Worth a 15-min look? {{demo_link}}

---

### Step 4 — Day 9: Trial offer

**Message:**

[First Name] — we offer a 14-day free trial (no credit card). Most clinics are scheduling appointments within the first hour. Want me to send the link?

{{trial_link}}

---

### Step 5 — Day 14: Close loop

**Message:**

I'll leave you in peace after this one, [First Name]. If practice management comes up for [Clinic Name], I'm here. Good luck with the clinic — I know how demanding it is.

**CRM action:** If no reply → Nurture.

---

## SMS Sequence (Optional)

**Prerequisite:** SMS opt-in or existing business relationship. Use Twilio via Marketplace.  
**Compliance:** Include opt-out ("Reply STOP to unsubscribe"). Business hours only.

### Step 1 — Day 0 (after email Step 1, no open)

> Hi [First Name], [SDR Name] from Ordella Physio. Sent you an email about practice management for [Clinic Name]. Worth a quick look? Demo: {{short_demo_link}} Reply STOP to opt out.

### Step 2 — Day 5 (after email Step 3, no reply)

> [First Name] — 14-day free trial for physio clinics. No credit card. Setup in 2 hrs: {{short_trial_link}} Reply STOP to opt out.

### Step 3 — Day 10 (final)

> Last text from me, [First Name]. If timing's wrong, no worries. Email me anytime: [SDR email]. Reply STOP to opt out.

**CRM action:** After Step 3, no reply → email sequence continues; SMS complete.

---

## Cold Call Script (Optional)

**When:** Day 6–8 of email sequence (between Step 2 and Step 3)  
**Duration:** 3–5 minutes  
**Best times:** Tue–Thu, 9–11 AM or 2–4 PM local

### Opening

> "Hi, is this [First Name]? … Great. My name is [SDR Name] from Ordella Physio. I'll be brief — do you have 3 minutes?"

*If no:* "No problem. When's better — tomorrow morning or afternoon?"

### Hook

> "We work with physio clinics that are tired of juggling scheduling, notes, and billing across different tools. I sent you an email earlier this week — wanted to see if that's something [Clinic Name] is dealing with."

### Discovery (pick one)

> "How are you handling clinical notes today — paper, Word, or a software tool?"

> "How many therapists are you running now?"

### Value (30 seconds)

> "Ordella gives every role its own portal — therapists, patients, admins. AI drafts SOAP notes but therapists review everything before it's saved. Billing runs through Stripe. 14-day free trial, no credit card."

### CTA

> "Would a 15-minute demo make sense this week? I can show scheduling and notes in one session."

*Yes:* Book demo, confirm email, send calendar invite.  
*Not now:* "Can I send a trial link? No more calls unless you want them."  
*Hard no:* "Understood. I'll close your file. Thanks for your time."

### CRM logging

Log: connected / voicemail / no answer / wrong number / demo booked / trial sent / disqualified.

---

## Sequence Selection Matrix

| Lead source | Primary sequence | Secondary |
|-------------|------------------|-----------|
| Outbound list | Email → LinkedIn → Call | SMS (if phone available) |
| Inbound form | Email nurture (3 steps) | Call within 24h |
| Referral | Email (1 step thank you) | AE direct call |
| Event lead | Email (2 steps) | LinkedIn |
| Enterprise | Custom (see `gtm/outreach-strategy.md` Template 4) | Discovery call |

---

## Compliance

- Include unsubscribe link in all marketing emails
- Honor opt-outs within 48 hours
- LinkedIn: max 100 connection requests/week
- SMS: opt-in required; STOP handling via Twilio
- Do not claim clinical outcomes in any outreach
- English-only outreach (platform is English-only)

---

*Companion: `acquisition-channels.md`, `crm-pipeline.md`, `follow-up-automation.md`, `gtm/outreach-strategy.md`*
