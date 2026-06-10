# Ordella Physio — Acquisition Channels

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Clinic Acquisition Pipeline  
**Owner:** Growth / Sales

---

## Channel Strategy Overview

Ordella Physio acquires clinics through four channel families: **inbound**, **outbound**, **referral**, and **partnership**. Primary ICP is 2–10 therapist clinics in UK, US, AU, and CA. See `gtm/ideal-customer-profile.md`.

| Family | Priority | CAC target (placeholder) | Payback |
|--------|----------|--------------------------|---------|
| Inbound | High | $30–$60 | 2–4 months |
| Outbound | High | $80–$150 | 3–6 months |
| Referral | High | $20–$40 | 1–2 months |
| Partnership | Medium | $50–$100 | 4–8 months |

---

## Inbound Channels

Clinics discover Ordella and self-initiate contact.

### Organic search (SEO)

| Tactic | Target keywords | Asset | Owner |
|--------|-----------------|-------|-------|
| Landing page optimization | physio practice management software | `/` | Marketing |
| Pricing page | physio clinic billing software | `/pricing` | Marketing |
| Blog content | SOAP notes software, physio scheduling | `/blog` | Marketing |
| Comparison pages | Ordella vs [competitor] | `/compare` (placeholder) | Marketing |

**KPI:** Organic traffic, keyword rankings, visitor → lead conversion (target 2%).

### Paid search (Google Ads)

| Campaign | Keywords | Landing page | Budget (placeholder) |
|----------|----------|--------------|---------------------|
| Brand | ordella physio | `/` | $200/mo |
| Category | physio practice management | `/` | $1,000/mo |
| Feature | physio SOAP notes software | `/` + feature anchor | $500/mo |
| Competitor | [competitor] alternative | `/compare` | $300/mo |

**KPI:** CPC, CPL (< $50), demo booking rate.

### Paid social (LinkedIn, Meta)

| Platform | Audience | Creative | Budget (placeholder) |
|----------|----------|----------|---------------------|
| LinkedIn | Clinic owners, practice managers, physios | Demo CTA, AI notes feature | $800/mo |
| Meta (Facebook/Instagram) | Clinic owner interest groups | Free trial CTA | $400/mo |

**KPI:** CPL, demo bookings, trial signups.

### Content marketing

| Asset | Gate | Funnel stage |
|-------|------|--------------|
| Clinic Operations Checklist (PDF) | Email | Interest |
| SOAP Note Template Pack (PDF) | Email | Interest |
| Physio Software Buyer's Guide (PDF) | Email | Interest |
| Webinar: AI in Clinical Documentation | Registration | Demo prep |
| Enterprise Security Brief (PDF) | Email + company | Enterprise |

**KPI:** Downloads, nurture → demo conversion.

### Product-led inbound

| Entry point | Flow |
|-------------|------|
| `/register` | Self-serve 14-day trial (Starter/Pro) |
| `/pricing` → Start free trial | Plan-specific trial |
| `/contact` | Demo request form |
| App store (future) | Mobile app → clinic discovery |

**KPI:** Trial signups, activation rate (≥ 1 appointment in 7 days).

### Inbound channel ownership

| Role | Responsibility |
|------|----------------|
| Marketing | SEO, paid ads, content, landing pages |
| Product | Trial signup flow, onboarding wizard |
| Sales | Demo requests from `/contact`, inbound enterprise |

---

## Outbound Channels

Sales proactively reaches clinics matching ICP.

### Email outbound

| Segment | Volume (weekly) | Template source |
|---------|-----------------|-----------------|
| Clinic owners (2–10 therapists) | 30–50 personalized | `outreach-sequences.md` |
| Enterprise / clinic groups | 10–15 | `gtm/outreach-strategy.md` Template 4 |
| Re-engagement (dormant leads) | 10–20 | `follow-up-automation.md` |

**Tools:** HubSpot / Pipedrive + email sequencer  
**KPI:** Open rate (> 25%), reply rate (> 5%), demo booked rate (> 2%).

### LinkedIn outbound

| Activity | Volume (weekly) | Template source |
|----------|-----------------|-----------------|
| Connection requests | 30–50 | `outreach-sequences.md` |
| Follow-up messages | 20–30 | `outreach-sequences.md` |
| InMail (paid) | 10–15 | Personalized |

**KPI:** Connection acceptance (> 30%), reply rate (> 8%), demo booked.

### Cold call

| Segment | Volume (weekly) | Script |
|---------|-----------------|--------|
| UK clinics (business hours GMT) | 10–15 | `outreach-sequences.md` |
| US clinics (EST/PST) | 10–15 | Same |
| AU clinics (AEST) | 5–10 | Same |

**KPI:** Connect rate (> 15%), demo booked rate (> 5% of connects).

### Direct mail (optional, low priority)

| Tactic | Audience | Cost |
|--------|----------|------|
| Postcard + QR to trial | Local physio clinics (geo-targeted) | $2–5/piece |

**KPI:** QR scan rate, trial signups attributed.

### Outbound list sources

| Source | Data points | Compliance |
|--------|-------------|------------|
| Google Maps / clinic directories | Name, address, phone, website | Public business data |
| LinkedIn Sales Navigator | Owner, therapist count estimate | LinkedIn ToS |
| Physio association member lists | Verified physio clinics | Partnership agreement |
| Conference attendee lists | Name, clinic, email | Event opt-in |
| Purchased lists | Use only with verified opt-in | GDPR/CAN-SPAM compliant |

### Outbound ownership

| Role | Responsibility |
|------|----------------|
| SDR / Sales | Email, LinkedIn, cold call execution |
| Marketing | List building, email templates, compliance |
| Sales Manager | Quota, coaching, pipeline review |

---

## Referral Channels

Existing clinics and individuals refer new clinics.

### Customer referral program

| Element | Detail |
|---------|--------|
| **Offer** | Referrer: 1 month free. Referee: 1 month free (placeholder) |
| **Eligibility** | Paid Starter or Pro clinic, active ≥ 30 days |
| **Mechanic** | Unique referral link in Clinic Admin (placeholder) |
| **Tracking** | UTM + referral code in CRM |
| **Payout** | Stripe credit or invoice credit |

**KPI:** Referral rate (10% of customers refer), referral → conversion (40%).

### Therapist referral

| Element | Detail |
|---------|--------|
| **Audience** | Therapists who move clinics or consult for multiple practices |
| **Offer** | $50 gift card per converted clinic (placeholder) |
| **Mechanic** | Personal referral code |

### Professional network referral

| Source | Incentive |
|--------|-----------|
| Accountants serving physio clinics | Revenue share (placeholder: 10% first year) |
| Physio equipment vendors | Co-marketing, no cash |
| Clinic consultants | Referral fee per conversion |

### Referral ownership

| Role | Responsibility |
|------|----------------|
| Customer Success | Identify happy customers (NPS ≥ 8), prompt referral |
| Sales | Track referral pipeline in CRM |
| Marketing | Referral landing page, email templates |

---

## Partnership Channels

Strategic partners drive clinic acquisition at scale.

### Physio associations

| Partner type | Example (placeholder) | Model |
|--------------|------------------------|-------|
| National associations | CSP (UK), APA (AU), APTA (US) | Newsletter feature, member discount |
| Regional associations | State/province physio bodies | Event sponsorship, member trial |
| Special interest groups | Sports physio, pelvic health | Targeted webinar co-host |

**Offer:** 15% member discount (first year), co-branded onboarding  
**KPI:** Member signups attributed, cost per acquisition.

### Software / integration partners

| Partner | Integration | Acquisition model |
|---------|-------------|-------------------|
| Google Workspace | Calendar sync (Marketplace) | Co-marketing listing |
| Stripe | Billing (native) | Stripe partner directory |
| Physiotec / MedBridge | Exercise programs (Marketplace) | Partner referral |
| Xero / QuickBooks (future) | Accounting sync | Marketplace cross-promo |

**KPI:** Integration-driven signups, partner-sourced demos.

### Franchise / clinic group operators

| Partner type | Model |
|--------------|-------|
| Physio franchise brands | Enterprise contract, multi-tenant rollout |
| PE-backed clinic roll-ups | Enterprise pilot → portfolio deployment |
| NHS / private hospital physio departments | Enterprise + compliance package |

**KPI:** Enterprise ACV, time to portfolio deployment.

### Education / training providers

| Partner | Model |
|---------|-------|
| Physio universities | Student/clinic graduate trial program |
| CPD course providers | Tool recommendation in course materials |
| New grad networks | Starter plan discount |

**KPI:** New clinic signups from grad cohorts.

### Partnership ownership

| Role | Responsibility |
|------|----------------|
| Partnerships Lead | Association and franchise deals |
| Marketing | Co-marketing assets, event presence |
| Enterprise Sales | Clinic group and franchise contracts |

---

## Channel Mix (Placeholder Targets — Month 3)

| Channel | % of new clinics | Monthly clinics |
|---------|------------------|-----------------|
| Inbound (organic + paid) | 35% | 12 |
| Outbound (email + LinkedIn + call) | 30% | 10 |
| Referral | 20% | 7 |
| Partnership | 15% | 5 |
| **Total** | 100% | **34** |

---

## Channel Attribution

| UTM parameter | Example |
|---------------|---------|
| `utm_source` | google, linkedin, referral, csp-uk |
| `utm_medium` | cpc, email, social, partner |
| `utm_campaign` | physio-pms-q2, webinar-ai-notes |
| `utm_content` | hero-cta, email-step-3 |

All demo bookings and trial signups must carry UTM into CRM. See `crm-pipeline.md`.

---

*Companion: `crm-pipeline.md`, `outreach-sequences.md`, `gtm/acquisition-channels.md` (GTM overview)*
