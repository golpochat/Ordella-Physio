# Ordella Physio — Demo Calendar Setup

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Clinic Acquisition Pipeline  
**Tool (placeholder):** Calendly or Cal.com

---

## Demo Session Format

| Attribute | Value |
|-----------|-------|
| **Duration** | 30 minutes (15 min demo + 15 min Q&A) |
| **Demo length** | 15 minutes (see `gtm/demo-script.md`) |
| **Host** | AE (Account Executive) |
| **Format** | Video call (Zoom / Google Meet) |
| **Recording** | Optional — with attendee consent |
| **Follow-up** | Trial link sent within 1 hour |

---

## Demo Availability Blocks

### Time zones covered

| Region | Timezone | Business hours (local) |
|--------|----------|------------------------|
| UK / Ireland | GMT / BST | 09:00 – 17:00 |
| US East | EST / EDT | 09:00 – 17:00 |
| US West | PST / PDT | 09:00 – 17:00 |
| Australia | AEST / AEDT | 09:00 – 17:00 |
| Canada | EST / PST | 09:00 – 17:00 |

### Weekly availability grid (placeholder)

| Day | UK (GMT) | US East (EST) | US West (PST) | AU (AEST) |
|-----|----------|---------------|---------------|-----------|
| Monday | 10:00, 14:00 | 10:00, 15:00 | 11:00, 14:00 | — |
| Tuesday | 10:00, 14:00 | 10:00, 15:00 | 11:00, 14:00 | 10:00 |
| Wednesday | 10:00, 14:00 | 10:00, 15:00 | 11:00, 14:00 | 10:00 |
| Thursday | 10:00, 14:00 | 10:00, 15:00 | 11:00, 14:00 | 10:00 |
| Friday | 10:00 only | 10:00 only | 10:00 only | — |
| Saturday | — | — | — | — |
| Sunday | — | — | — | — |

### Booking rules

| Rule | Setting |
|------|---------|
| Minimum notice | 4 hours |
| Maximum advance | 21 days |
| Buffer between demos | 15 minutes |
| Max demos per AE per day | 4 |
| Max demos per AE per week | 16 |
| Round-robin | Enabled when multiple AEs |

### Blackout dates

- Public holidays per region (UK, US, AU bank holidays)
- Company all-hands days
- Conference travel (block AE calendar manually)

---

## Booking Link Structure

### URL format

```
https://calendly.com/ordella-physio/demo
  ?utm_source={source}
  &utm_medium={medium}
  &utm_campaign={campaign}
  &utm_content={content}
```

### Event types

| Event | Slug | Audience | Duration |
|-------|------|----------|----------|
| Standard demo | `/demo` | Starter / Pro ICP | 30 min |
| Enterprise discovery | `/enterprise-discovery` | 10+ therapists, SSO needs | 45 min |
| Quick intro | `/intro` | Low-intent inbound | 15 min |

### CRM integration

| Trigger | CRM action |
|---------|------------|
| Booking created | Deal → Demo Booked; create calendar event |
| Booking rescheduled | Update deal; send new reminders |
| Booking cancelled | Deal → Qualified; CS task to re-engage |
| No-show (15 min past start) | Deal → Qualified; no-show sequence |

### Embed locations

| Page | CTA | Link |
|------|-----|------|
| `/contact` | Book a demo | `/demo` |
| `/pricing` Enterprise card | Contact sales | `/enterprise-discovery` |
| Email sequences | Book a demo | `/demo` + UTM |
| Post-trial (at-risk) | Setup call | `/intro` |

---

## Pre-Demo Questionnaire

Displayed on booking confirmation page (required before confirm) or as first email after booking.

### Questions

| # | Question | Type | Required | CRM field |
|---|----------|------|----------|-----------|
| 1 | Clinic name | Text | Yes | `company_name` |
| 2 | Your role | Select: Owner / Practice Manager / Therapist / Other | Yes | `contact_role` |
| 3 | Number of therapists | Select: 1 / 2–5 / 6–10 / 11–25 / 25+ | Yes | `therapist_count` |
| 4 | Number of locations | Select: 1 / 2–3 / 4+ | Yes | `location_count` |
| 5 | Current software (if any) | Text | No | `current_software` |
| 6 | Primary pain point | Select: Scheduling / Clinical notes / Billing / Patient engagement / Integrations / Enterprise (SSO/compliance) / Other | Yes | `pain_point` |
| 7 | Timeline to decide | Select: < 30 days / 30–90 days / 90+ days / Just exploring | Yes | `timeline` |
| 8 | Region | Select: UK / US / Canada / Australia / Other | Yes | `region` |
| 9 | Anything specific to see in the demo? | Textarea | No | `demo_notes` |

### Auto-qualification from questionnaire

| Condition | Action |
|-----------|--------|
| Therapist count 25+ or pain = Enterprise | Route to `/enterprise-discovery` |
| Timeline = 90+ days | Book demo but flag as low urgency |
| Region = Other + non-English note in Q9 | Flag for disqualification review |
| Pain = Clinical notes | AE prep: emphasize AI assistant in demo |

---

## Demo Reminders

### Attendee reminders

| Timing | Channel | Content |
|--------|---------|---------|
| Immediately | Email | Confirmation + calendar invite (.ics) |
| 24 hours before | Email | Reminder + pre-demo questionnaire link (if incomplete) |
| 1 hour before | Email + SMS (opt-in) | Reminder + Zoom/Meet link |
| 5 minutes before | Email (optional) | "We're starting soon" + link |

### Confirmation email template

**Subject:** Your Ordella Physio demo — [Date] at [Time] [Timezone]

**Body:**

Hi [First Name],

Your demo is confirmed:

**Date:** [Date]  
**Time:** [Time] [Timezone]  
**Duration:** 30 minutes  
**Join link:** [Zoom/Meet URL]

We'll cover scheduling, clinical notes, patient portal, billing, and integrations — tailored to [Clinic Name].

**Prepare (optional):** Complete this 2-minute questionnaire so we personalize your demo: [questionnaire_link]

Need to reschedule? [Reschedule link]

See you then,  
[AE Name]  
Ordella Physio

---

### 24-hour reminder template

**Subject:** Tomorrow: Ordella Physio demo at [Time]

**Body:**

Hi [First Name],

Reminder — your Ordella Physio demo is tomorrow at [Time] [Timezone].

[Join link]

If you need to reschedule: [Reschedule link]

[AE Name]

---

### 1-hour reminder template

**Subject:** Starting in 1 hour — Ordella Physio demo

**Body:**

Hi [First Name],

We'll start in 1 hour. Join here: [Join link]

[AE Name]

---

## No-Show Protocol

| Step | Timing | Action |
|------|--------|--------|
| 1 | 5 min past start | AE sends "Running late?" email with join link |
| 2 | 15 min past start | Mark no-show in CRM; Deal → Qualified |
| 3 | Same day | No-show email with rebook link |
| 4 | Day 2 | SDR follow-up call or email |
| 5 | Day 5 | Final rebook attempt |
| 6 | Day 7 | Move to Nurture if no rebook |

**No-show email:**

**Subject:** Missed you today — rebook your Ordella demo?

**Body:**

Hi [First Name],

We had a demo scheduled today but didn't connect. No worries — happens to the best of us.

Pick a new time here: [Rebook link]

Or start a 14-day free trial on your own: [Trial link]

[AE Name]

---

## AE Pre-Demo Prep Checklist

- [ ] Review pre-demo questionnaire
- [ ] Check therapist count and pain point — customize demo emphasis
- [ ] Demo tenant loaded (3 patients, 2 therapists, 5 appointments)
- [ ] AI note draft prepared
- [ ] `gtm/demo-script.md` open
- [ ] Screen share tested
- [ ] CRM deal open for live notes

---

*Companion: `gtm/demo-script.md`, `crm-pipeline.md`, `qualification-framework.md`*
