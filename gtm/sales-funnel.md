# Ordella Physio — Sales Funnel

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — GTM Activation

---

## Funnel Overview

```
Awareness → Interest → Demo → Trial → Conversion → Expansion
```

| Stage | Goal | Primary metric | Owner |
|-------|------|----------------|-------|
| Awareness | Clinic learns Ordella exists | Website visits, ad impressions | Marketing |
| Interest | Clinic engages with content | Lead form submissions, content downloads | Marketing |
| Demo | Qualified lead sees product | Demos booked, demo completion rate | Sales |
| Trial | Clinic activates tenant | Trial signups, activation rate | Product + CS |
| Conversion | Clinic becomes paying customer | Trial → paid conversion rate | Sales + CS |
| Expansion | Clinic upgrades or adds seats | Upgrade rate, NRR | CS + Sales |

---

## Stage 1: Awareness

### Objective
Put Ordella Physio in front of clinic owners, practice managers, and therapists in target regions.

### Channels
- SEO content (physio practice management, SOAP notes software, clinic billing)
- Google Ads (target: "physio practice management software", "physical therapy scheduling")
- LinkedIn organic + paid (clinic owners, physio professionals)
- Physio conferences and trade shows
- Physio association newsletters and partnerships
- Referral program (existing clinics)

### Assets
- Landing page (`/`)
- Pricing page (`/pricing`)
- Blog posts (placeholder)
- LinkedIn company page
- Product one-pager PDF (from `gtm/positioning.md`)

### Success metrics (placeholder targets)
- 5,000 monthly website visitors (Month 3)
- 2% visitor → lead conversion
- Cost per lead < $50

---

## Stage 2: Interest

### Objective
Convert anonymous visitors into identifiable leads with demonstrated intent.

### Lead magnets

| Magnet | Format | Gate | Audience |
|--------|--------|------|----------|
| **Clinic Operations Checklist** | PDF (8 pages) | Email | Clinic owners |
| **SOAP Note Template Pack** | PDF (5 templates) | Email | Therapists |
| **Physio Software Buyer's Guide** | PDF (12 pages) | Email | Practice managers |
| **ROI Calculator** | Web tool | Email | Clinic owners |
| **AI in Clinical Documentation** | Webinar (30 min) | Registration | Therapists + owners |
| **Enterprise Security Brief** | PDF (6 pages) | Email + company | Enterprise buyers |

### Interest capture points
- `/register` — free trial signup (highest intent)
- `/contact` — demo request form
- `/pricing` — "Contact sales" (Enterprise)
- Blog content CTA — download lead magnet
- Webinar registration landing page

### Lead scoring
Use ICP scoring model from `gtm/ideal-customer-profile.md`. Score ≥ 70 → fast-track to demo.

### Nurture sequence (non-demo leads)
1. **Day 0:** Deliver lead magnet + welcome email
2. **Day 3:** Case study / feature highlight (scheduling)
3. **Day 7:** AI notes feature spotlight
4. **Day 14:** "Start your free trial" CTA
5. **Day 21:** Demo invitation
6. **Day 30:** Last chance trial offer

---

## Stage 3: Demo

### Objective
Show qualified leads the product in a structured 15-minute session and secure trial or Enterprise pilot commitment.

### Demo booking flow

```
Interest signal → Qualification → Calendar booking → Confirmation → Demo → Follow-up
```

#### Step 1: Qualification (form or call)
- Clinic name and website
- Number of therapists
- Current software (if any)
- Primary pain point (scheduling, notes, billing, enterprise)
- Timeline (30 / 60 / 90 days)
- Region

**Disqualify if:** Non-English UI required, inpatient hospital workflow, budget < $30/mo with no growth.

#### Step 2: Calendar booking
- Tool: Calendly / Cal.com (placeholder)
- Slots: 30 minutes (15 min demo + 15 min Q&A)
- Availability: Business hours in UK, US Eastern, AEST
- Confirmation email with:
  - Calendar invite
  - Link to `gtm/demo-script.md` (internal, for sales rep)
  - Pre-demo questionnaire (optional)

#### Step 3: Pre-demo prep (sales rep)
- Review qualification form
- Prepare demo tenant with sample patients and appointments
- Identify 2–3 features to emphasize based on pain points
- Load `gtm/demo-script.md`

#### Step 4: Demo delivery
- Follow `gtm/demo-script.md` (15 min structured flow)
- Record objection handling notes
- End with clear CTA: trial signup or Enterprise discovery call

#### Step 5: Post-demo follow-up
- **Within 1 hour:** Thank-you email + trial link + demo recording (if recorded)
- **Day 2:** Check-in — "Any questions?"
- **Day 5:** Case study or relevant feature doc
- **Day 7:** "Your trial is waiting" if not activated

### Demo metrics (placeholder targets)
- 60% demo show rate
- 40% demo → trial activation
- 25% demo → paid conversion (within 30 days)

---

## Stage 4: Trial

### Objective
Get the clinic to activate their tenant, complete onboarding, and experience core value within 14 days.

### Trial activation flow

```
Demo close / self-serve signup → Registration → Tenant creation → Onboarding wizard → First value moment
```

#### Step 1: Registration (`/register`)
- Clinic name, admin name, email, password
- Email verification
- Tenant auto-provisioned (Stripe customer created via NATS)

#### Step 2: Onboarding wizard (first login)
| Step | Action | Time |
|------|--------|------|
| 1 | Confirm clinic profile (name, timezone, currency) | 2 min |
| 2 | Select plan (Starter trial default) | 1 min |
| 3 | Invite first therapist | 3 min |
| 4 | Add first patient | 3 min |
| 5 | Create first appointment | 3 min |
| 6 | (Optional) Connect Google Calendar | 5 min |

**First value moment:** First appointment created with notification sent to patient.

#### Step 3: Onboarding emails (automated)
| Day | Email | Goal |
|-----|-------|------|
| 0 | Welcome + onboarding checklist | Start setup |
| 1 | "Add your team" | Invite therapists |
| 3 | "Create your first note" | Clinical workflow |
| 5 | "Connect your integrations" | Marketplace |
| 7 | "How's your trial going?" | CS check-in |
| 10 | "4 days left" | Urgency |
| 13 | "Last day tomorrow" | Conversion CTA |
| 14 | "Trial ending — choose your plan" | Conversion |

#### Step 4: In-app guidance
- Clinic Admin dashboard: onboarding progress widget (placeholder)
- Contextual tooltips on first visit to key pages
- Link to `gtm/onboarding-flow.md` / `docs/Clinic-Onboarding-Kit.md`

### Trial health signals
| Signal | Healthy | At risk |
|--------|---------|---------|
| Therapists invited | ≥ 1 | 0 |
| Patients added | ≥ 3 | 0 |
| Appointments created | ≥ 1 | 0 |
| Notes created | ≥ 1 (Pro trial) | 0 |
| Logins (7 days) | ≥ 3 | 0–1 |

**At-risk trials:** CS outreach on Day 5 if zero appointments created.

---

## Stage 5: Conversion

### Objective
Convert trial clinics to paid Starter or Pro subscriptions (or Enterprise contract).

### Conversion triggers
- Trial Day 10: In-app upgrade prompt
- Trial Day 13: Email with plan comparison
- Trial Day 14: Account pause warning + "Choose plan" CTA
- Post-trial: 30-day data retention, reactivation email on Day 7 and Day 21

### Conversion paths

| Path | Flow |
|------|------|
| **Self-serve** | Clinic Admin → Billing → Select plan → Stripe checkout |
| **Sales-assisted** | Rep sends Stripe payment link or schedules closing call |
| **Enterprise** | Discovery → Proposal → Contract → Pilot → Production |

### Objection handling at conversion
See `gtm/demo-script.md` objection section.

### Conversion metrics (placeholder targets)
- 25% trial → paid (Starter/Pro)
- 60-day average time to convert
- < 5% involuntary churn (payment failure)

---

## Stage 6: Expansion

### Objective
Grow revenue from existing customers through upgrades, add-ons, and referrals.

### Expansion plays
| Play | Trigger | Action |
|------|---------|--------|
| Starter → Pro | 3+ therapists active | In-app upgrade prompt |
| Pro → Enterprise | SSO/audit inquiry | Sales engagement |
| Add-on: AI notes | High AI usage | Usage-based billing notification |
| Add-on: SMS | Manual reminder pain | Marketplace Twilio setup |
| Referral | NPS ≥ 8 | Referral program email |

---

## Funnel Tooling (Placeholder)

| Function | Tool |
|----------|------|
| CRM | HubSpot / Pipedrive |
| Email automation | HubSpot / Customer.io |
| Demo scheduling | Calendly |
| Analytics | Google Analytics + Mixpanel |
| Trial monitoring | Internal admin dashboard / Super Admin |
| Billing | Stripe |

---

*Companion: `gtm/demo-script.md`, `gtm/outreach-strategy.md`, `gtm/onboarding-flow.md`*
