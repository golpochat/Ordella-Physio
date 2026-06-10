# Ordella Physio — Partner Loop

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Growth Flywheel  
**Loop:** Partner promotes → clinics adopt → integrations deepen → partner promotes more

---

## Partner Loop Model

```
Strategic partner → Co-marketing / integration → Clinic signups → Usage of partner integration → Partner value proof → Expanded partnership
```

| Partner type | Primary value to Ordella | Primary value to partner |
|--------------|--------------------------|--------------------------|
| Exercise libraries | Clinical workflow completeness | Distribution to clinics |
| Telehealth | Appointment + video workflow | User base |
| Insurance | Distribution + trust | Digital clinic tooling |
| Physio associations | Credibility + member reach | Member benefit |
| Integration platforms | Marketplace depth | API volume |

---

## Exercise Library Partnerships

### Current / planned integrations (Marketplace)

| Partner | Integration | Status |
|---------|-------------|--------|
| Physiotec | Exercise program sync | Live (`marketplace-service`) |
| MedBridge | Exercise program sync | Live (`marketplace-service`) |

### Partnership motions

| Motion | Detail |
|--------|--------|
| **Integration partnership** | Native Marketplace connector; co-listed |
| **Co-marketing** | Joint blog: "Prescribe exercises from your EMR" |
| **Bundle offer** | Ordella Pro + partner discount (placeholder) |
| **Referral** | Partner refers clinics → revenue share 5% year 1 |

### Co-marketing opportunities

- Webinar: "From assessment to home exercise in one workflow"
- Partner newsletter feature (quarterly)
- Case study: clinic using Ordella + Physiotec
- Conference booth co-sponsorship

---

## Telehealth Provider Partnerships

### Targets (placeholder)

| Partner type | Examples | Integration path |
|--------------|----------|------------------|
| Video conferencing | Zoom (live), Doxy.me | Marketplace OAuth |
| Dedicated telehealth | Physitrack, Coviu | API partnership |
| Calendar + video | Google Meet | Via Google Calendar sync |

### Partnership package

| Element | Offer |
|---------|-------|
| Marketplace listing | Featured "Telehealth" category |
| Workflow | Appointment → Zoom link → patient notification |
| Co-marketing | "Hybrid physio: in-clinic + telehealth on Ordella" |
| Member discount | Partner customers: 10% off Ordella year 1 |

### Integration-based value

```
Ordella appointment → Marketplace Zoom → Patient portal link → Session notes in Ordella
```

**KPI:** % Pro clinics with telehealth integration; telehealth-sourced signups.

---

## Insurance Partners

### Partnership models (placeholder)

| Model | Description | Region |
|-------|-------------|--------|
| **Preferred vendor** | Insurer recommends Ordella to network clinics | UK, AU |
| **Billing integration** | Claims data export (future) | US |
| **Wellness program** | Corporate physio benefit via insurer | UK, US |
| **Credentialing support** | Ordella security brief for insurer audits | All |

### Co-marketing

- Insurer broker newsletter: "Modern practice management for physio networks"
- Joint compliance whitepaper: GDPR, data residency, audit logs
- Insurer portal listing (placeholder)

### Clinic value proposition (co-branded)

> "Ordella is an approved practice platform for [Insurer] network providers — tenant isolation, audit trails, English-only clinical UI."

**Note:** Legal review required for all insurance co-branding.

---

## Local Physio Associations

### Target associations (placeholder)

| Region | Association |
|--------|-------------|
| UK | Chartered Society of Physiotherapy (CSP) |
| US | APTA + state chapters |
| AU | Australian Physiotherapy Association (APA) |
| CA | Canadian Physiotherapy Association |

### Partnership tiers

| Tier | Annual fee (placeholder) | Benefits |
|------|--------------------------|----------|
| **Community** | $2,000 | Newsletter mention, member 15% discount |
| **Gold** | $5,000 | Webinar, logo on site, event booth split |
| **Platinum** | $10,000 | Exclusive category, roundtable, custom onboarding |

### Member offer (standard)

- 15% off first year (Starter or Pro)
- Extended 21-day trial
- Free onboarding webinar for members
- Dedicated member signup URL: `?partner=csp-uk`

### Co-marketing calendar

| Quarter | Activity |
|---------|----------|
| Q1 | Member webinar: AI notes with therapist review |
| Q2 | Conference sponsorship + demo station |
| Q3 | Case study publication in association magazine |
| Q4 | Year-in-review + member survey co-brand |

---

## Integration-Based Partnerships

### Marketplace as partner platform

| Category | Partners | Loop mechanism |
|----------|----------|----------------|
| Calendar | Google | Sync drives stickiness → reviews |
| Comms | Twilio, SendGrid | Usage grows → partner co-sell |
| Storage | Dropbox, Drive, OneDrive | Note attachments → retention |
| Payments | Stripe | Billing native → trust |
| Exercise | Physiotec, MedBridge | Clinical depth → Pro upgrades |

### Partner portal (future)

- Partner applies at `partners.ordella-physio.com`
- SDK + OAuth docs for new integrations
- Co-marketing asset library
- Lead registration for partner-sourced clinics

### Technical partnership requirements

| Requirement | Detail |
|-------------|--------|
| OAuth or API | Documented in `services/marketplace-service` |
| Usage logging | `IntegrationUsageLog` for co-sell proof |
| Support SLA | L2 shared for integration failures |
| Joint roadmap | Quarterly partner sync |

---

## Partner Loop Metrics

| Metric | Target (Month 12) |
|--------|-------------------|
| Active strategic partners | 8 |
| Partner-sourced signups / month | 15 |
| Partner signup → paid | 35% |
| Clinics with ≥ 2 marketplace integrations | 50% of Pro |
| Co-marketing events / quarter | 4 |

---

## Ownership

| Function | Owner |
|----------|-------|
| Association deals | Partnerships Lead |
| Integration partnerships | Product + Partnerships |
| Co-marketing execution | Marketing |
| Partner-sourced pipeline | Sales (inbound lane) |
| Marketplace technical | Engineering |

---

*Companion: `referral-loop.md`, `content-loop.md`, `integrations-setup-flow` in onboarding automation, `gtm/positioning.md`*
