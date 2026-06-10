# Ordella Physio — Demo Booking Automation

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Sales & Conversion Engine  
**Tool (placeholder):** Calendly / Cal.com + HubSpot CRM

---

## Automation Overview

```
Qualified lead → Booking link → Pre-demo questionnaire → Confirmation → Reminders → Demo → Outcome routing
                                                                              ↓
                                                                    No-show → Rebook sequence
```

| Step | Automated | Owner |
|------|-----------|-------|
| Link distribution | Yes (UTM-tagged) | Marketing / SDR |
| Booking capture | Yes | Calendly → CRM |
| Questionnaire | Yes (gate or post-book) | Product |
| Reminders | Yes (24h, 1h) | Email + optional SMS |
| No-show detection | Yes (15 min past start) | CRM workflow |
| Trial link post-demo | Yes (if completed) | AE + automation |

**Reference:** `growth/clinic-acquisition/demo-calendar-setup.md`

---

## Automated Demo Booking Link

### Primary links

| Event type | URL | Audience |
|------------|-----|----------|
| Standard demo | `https://calendly.com/ordella-physio/demo` | Starter / Pro ICP |
| Enterprise discovery | `https://calendly.com/ordella-physio/enterprise-discovery` | 10+ therapists, SSO |
| Quick intro | `https://calendly.com/ordella-physio/intro` | Low-intent inbound |

### UTM structure

```
?utm_source={source}
&utm_medium={medium}
&utm_campaign={campaign}
&utm_content={content}
&deal_id={crm_deal_id}
```

| Source examples | Medium |
|-----------------|--------|
| `outbound-email` | `email` |
| `linkedin` | `social` |
| `website-pricing` | `inbound` |
| `referral` | `referral` |

### Distribution points (automated)

| Channel | Trigger | Link |
|---------|---------|------|
| Outreach Step 1 email | SDR sequence | `/demo` + UTM |
| `/contact` form submit | Inbound | Redirect to `/demo` |
| Qualified CRM deal | Workflow | Personalized link in email |
| Post-content download | Nurture | CTA in Day 3 email |
| AE manual | Sales | Copy from CRM deal record |

### CRM integration (on book)

| Field | Populated from |
|-------|----------------|
| Deal stage | → Demo Booked |
| `demo_scheduled_at` | Calendly event |
| `demo_attendees` | Invitee name + email |
| `utm_*` | URL params |
| AE assigned | Round-robin rules |

---

## Pre-Demo Questionnaire

### Placement
**Option A (recommended):** Required on Calendly booking form before confirm.  
**Option B:** Link in confirmation email — must complete before demo.

### Questions

| # | Question | Type | CRM field |
|---|----------|------|-----------|
| 1 | Clinic name | Text | `company_name` |
| 2 | Your role | Select | `contact_role` |
| 3 | Number of therapists | Select: 1 / 2–5 / 6–10 / 11–25 / 25+ | `therapist_count` |
| 4 | Number of locations | Select: 1 / 2–3 / 4+ | `location_count` |
| 5 | Current software | Text | `current_software` |
| 6 | Primary pain point | Select | `pain_point` |
| 7 | Timeline to decide | Select | `timeline` |
| 8 | Region | Select: UK / US / CA / AU / Other | `region` |
| 9 | Anything specific to see? | Textarea | `demo_notes` |

### Auto-routing rules

| Condition | Action |
|-----------|--------|
| Therapists 25+ OR pain = Enterprise | Route to enterprise-discovery event |
| Region = Other + non-English in Q9 | Flag for disqualification review |
| Timeline < 30 days | Priority queue for AE |
| Pain = Clinical notes | AE prep: emphasize AI in demo |

### AE prep packet (auto-generated)

Email to AE 2 hours before demo:
- Questionnaire answers
- Qualification score
- Suggested demo emphasis (`gtm/demo-script.md` sections)
- Trial link pre-filled with UTM

---

## Automated Reminders

### Attendee sequence

| Timing | Channel | Template ID |
|--------|---------|-------------|
| Immediate | Email | `demo-confirm` |
| 24h before | Email | `demo-reminder-24h` |
| 1h before | Email | `demo-reminder-1h` |
| 1h before | SMS (opt-in) | `demo-reminder-sms` |
| 5 min before | Email (optional) | `demo-starting` |

### Confirmation email (automated)

**Subject:** Your Ordella Physio demo — [Date] at [Time] [TZ]

**Includes:**
- Calendar invite (.ics)
- Zoom/Meet join link
- Reschedule link
- Questionnaire link (if incomplete)
- "Add to calendar" button

### AE internal reminder

| Timing | Notification |
|--------|--------------|
| 24h before | CRM task + Slack `#sales` |
| 1h before | Calendar alert |
| At start | CRM deal open — demo in progress |

---

## No-Show Handling

### Detection

| Rule | CRM action |
|------|------------|
| Invitee not joined 5 min past start | AE sends "Running late?" email |
| No join 15 min past start | Mark **No-show**; stage → Qualified |
| AE marks no-show manually | Same |

### Automated no-show sequence

| Step | Timing | Channel | Content |
|------|--------|---------|---------|
| 1 | +15 min | Email | "Missed you — rebook?" + link |
| 2 | +24h | Email + SDR task | Second rebook attempt |
| 3 | +5 days | Email | Final rebook + trial self-serve link |
| 4 | +7 days | CRM | → Nurture if no rebook |

### No-show email template

**Subject:** Missed your Ordella demo — pick a new time?

**Body:**

Hi [First Name],

We had you down for a demo today but didn't connect. No worries — reschedule here: {{rebook_link}}

Or start a 14-day free trial on your own: {{trial_link}}

[AE Name]

### Rebook rules

- Max 2 no-shows before Nurture (unless lead re-engages)
- Second no-show: SDR call attempt before final email
- High-score deals (≥ 80): AE manager outreach on second no-show

---

## Post-Demo Automation

| Outcome | CRM stage | Automated action |
|---------|-----------|------------------|
| Demo completed — trial offered | Demo Completed | Trial link email within 1h |
| Demo completed — Enterprise | Demo Completed | Discovery call booking link |
| Demo completed — not ready | Nurture | Nurture sequence enrollment |
| No-show | Qualified | No-show sequence |

**Trial auto-start:** See `trial-activation-flow.md` — trial link in post-demo email; optional one-click provision if AE checks "Start trial now" in CRM.

---

## Implementation Checklist

- [ ] Calendly events created (demo, enterprise, intro)
- [ ] Round-robin AE assignment configured
- [ ] HubSpot/Pipedrive ↔ Calendly integration
- [ ] UTM passthrough to CRM deal
- [ ] Questionnaire fields mapped to CRM
- [ ] Reminder emails in SendGrid/HubSpot
- [ ] No-show workflow + rebook link
- [ ] AE prep email workflow (2h before)
- [ ] Slack notifications for bookings

---

*Companion: `trial-activation-flow.md`, `growth/clinic-acquisition/demo-calendar-setup.md`, `gtm/demo-script.md`*
