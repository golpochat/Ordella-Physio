# Ordella Physio — Demo Script

**Version:** 1.0  
**Date:** 2026-06-10  
**Duration:** 15 minutes (+ 15 min Q&A)  
**Audience:** Clinic owner, practice manager, or clinical director

---

## Pre-Demo Checklist

- [ ] Review qualification form (therapists, pain points, timeline)
- [ ] Demo tenant loaded with 3 patients, 2 therapists, 5 appointments
- [ ] Sample clinical note and AI draft prepared
- [ ] Marketplace: Google Calendar or Twilio shown as "available to connect"
- [ ] Browser: `http://localhost:3010` (local) or production URL
- [ ] Login: Clinic Admin + Therapist accounts ready
- [ ] Screen share tested; notifications/messaging badge visible

---

## Demo Flow

### Setup (1 min)

**Say:**
> "Thanks for joining. I'll walk you through Ordella Physio in about 15 minutes — scheduling, clinical notes, patient experience, billing, and integrations. Stop me anytime with questions."

**Do:** Open landing page briefly, then log in as Clinic Admin at `/clinic`.

---

### 1. Clinic overview (2 min)

**Show:** Clinic Admin dashboard — today's appointments, notification bell, messaging badge.

**Say:**
> "This is the Clinic Admin portal. Everything you see is scoped to your clinic — your data is isolated from every other clinic on the platform. Notice the clean, English-only interface — no clutter, no generic hospital menus."

**Key talking points:**
- Role-native portals (not one dashboard for everyone)
- Tenant isolation — your clinic's secure workspace
- Real-time notifications and messaging

**Transition:**
> "Let me show you how scheduling works."

---

### 2. Appointments (2 min)

**Show:** Clinic Admin → Appointments → Create appointment. Link patient + therapist + time.

**Say:**
> "Creating an appointment takes seconds. The patient gets a notification automatically. Therapists see it on their calendar. And through our Marketplace, you can sync with Google Calendar — no double entry."

**Key talking points:**
- Multi-therapist scheduling
- Automated patient notifications
- Google Calendar sync (Marketplace)

**Show:** Therapist portal → calendar view (switch login or second tab).

**Say:**
> "Therapists get their own portal — just their patients, their appointments, their notes."

---

### 3. Clinical notes + AI (3 min)

**Show:** Therapist portal → open appointment → Notes → AI assistant.

**Say:**
> "This is where Ordella stands apart. Our AI assistant drafts SOAP notes from appointment context and patient history. But — and this is important — nothing gets saved until the therapist reviews and clicks Accept. AI assists. Therapists decide."

**Do:** Generate SOAP draft → show preview modal → accept → note saved.

**Key talking points:**
- AI-assisted SOAP generation
- Voice-to-note option (mention, demo if time)
- Mandatory therapist review gate
- Structured clinical documentation

**Handle concern:**
> If they ask about AI safety: "We never auto-publish clinical content. Every AI output goes through a preview modal. The therapist must explicitly accept or reject."

---

### 4. Patient experience (2 min)

**Show:** Patient portal (`/patient`) or mobile app screenshot.

**Say:**
> "Patients get their own portal and a mobile app. They see upcoming appointments, receive notifications, and can message the clinic. It's a modern experience — and it reduces phone calls to your front desk."

**Key talking points:**
- Patient portal + Flutter mobile app
- Push notifications
- In-app messaging
- English-only, professional UI

---

### 5. Billing (2 min)

**Show:** Clinic Admin → Billing → subscription plan, invoices.

**Say:**
> "Billing runs on Stripe. You choose Starter, Pro, or Enterprise. Invoices link to appointments. Patients can view billing through the portal. No separate accounting tool needed for day-to-day clinic billing."

**Key talking points:**
- Stripe subscriptions and invoicing
- Plan management (Starter / Pro / Enterprise)
- Patient billing visibility

---

### 6. Marketplace + Enterprise (2 min)

**Show:** Clinic Admin → Marketplace → provider list (Google Calendar, Twilio, Stripe, etc.).

**Say:**
> "The Marketplace lets you connect tools you already use — calendar, SMS, email, storage, exercise platforms — from one admin panel. No custom development."

**Show (if Enterprise prospect):** Clinic Admin → Enterprise → SSO config, audit logs.

**Say:**
> "For clinic groups, Enterprise adds SSO — SAML, Azure AD, Google Workspace — custom roles, audit logs, API keys, and signed webhooks. It's built in, not a professional services project."

**Key talking points:**
- 10 marketplace providers
- Enterprise SSO, RBAC v2, audit logs
- Multi-region deployment (EU, US, APAC)

---

### 7. Close (1 min)

**Say:**
> "That's Ordella Physio — one platform for scheduling, clinical notes, billing, patient engagement, and integrations. Built for physiotherapy, ready to scale from solo practice to clinic group."

**CTA (pick one based on audience):**

| Audience | CTA |
|----------|-----|
| Small clinic | "Start your 14-day free trial — no credit card. I'll send the link right after this call." |
| Growing clinic | "I'd recommend starting on Pro. Trial is 14 days — want me to set up your clinic now?" |
| Enterprise | "Let's schedule a 30-minute discovery call to map your SSO and compliance requirements." |

---

## Key Talking Points (Quick Reference)

| Topic | One-liner |
|-------|-----------|
| Positioning | Built for physio, not adapted from fitness or hospital software |
| Portals | Every role gets its own portal — patient, therapist, admin |
| AI | AI assists documentation; therapists review and approve everything |
| Security | Tenant isolation at the API Gateway; RBAC on every route |
| Scale | Starter → Pro → Enterprise on the same platform |
| Global | Multi-region with English-only UI for consistency |
| Mobile | Flutter app with offline cache and push notifications |
| Trial | 14 days free, no credit card, full plan features |

---

## Objection Handling

### "We already have a system."

> "Totally understand. Most clinics we speak with have something — but it's usually 2–3 tools duct-taped together. The question is whether one platform built for physio would save your team time. Worth a 14-day trial to compare?"

### "AI makes me nervous for clinical notes."

> "That's exactly why we built a review gate. AI drafts the note — you see a preview, edit if needed, and click Accept or Reject. Nothing is saved without your explicit approval. We're not replacing clinical judgment."

### "It's too expensive."

> "Starter is $49 a month for up to 2 therapists — less than most clinics spend on separate scheduling and billing tools. And the 14-day trial is free with no credit card. What's your current monthly spend on software?"

### "We need [specific integration]."

> "Check our Marketplace — we support Google Calendar, Stripe, Twilio, SendGrid, Dropbox, Zoom, and exercise platforms. If it's not there, Enterprise includes API keys and webhooks for custom connections."

### "We're not ready to switch."

> "No rush. Can I send you the onboarding kit and a trial link? Activate when your current contract is up. I'll follow up in [month]."

### "We need non-English UI."

> "Ordella is English-only by design — that ensures a consistent, professional experience globally. If your clinic operates in English, we're a strong fit. If you need multi-language UI, we're transparent that we're not the right product today."

### "What about data security / GDPR / HIPAA?"

> "Every clinic is a fully isolated tenant. TLS everywhere. Enterprise includes audit logs, SSO, and activity tracking. We support multi-region deployment for data residency. I can share our Enterprise Security Brief."

### "How long does setup take?"

> "Most clinics are operational in 2–4 hours — profile, staff, patients, first appointments. We have a step-by-step onboarding kit, and Pro+ customers get a guided setup call."

---

## Closing Script

### Trial close
> "[First Name], based on what you've shared — [pain point] — I think Ordella would save your team real time. Let's get your 14-day trial started. I'll send the link now and check in on [day] to help with setup. Does that work?"

### Demo → second meeting close
> "This sounds like a fit for a deeper look. Let's schedule 30 minutes next week to walk through [specific topic — billing, enterprise, migration]. Does [day/time] work?"

### Enterprise close
> "For a group your size, I'd recommend our Enterprise plan with SSO and audit logs. Let me put together a proposal with pricing based on [X] therapists and [Y] locations. Can we review it on [date]?"

---

## Post-Demo Actions

1. Send thank-you email within 1 hour (see `gtm/outreach-strategy.md` Template 5)
2. Log demo notes in CRM: pain points, objections, next step
3. Send trial link or calendar invite for follow-up
4. Set CRM reminder for Day 3 check-in
5. If no trial activation by Day 5, send onboarding offer

---

*Companion: `gtm/sales-funnel.md`, `gtm/onboarding-flow.md`, `docs/Clinic-Onboarding-Kit.md`*
