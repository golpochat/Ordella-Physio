# Ordella Physio — Qualification Framework

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Clinic Acquisition Pipeline  
**Framework:** BANT + MEDDIC-lite (adapted for SMB physio clinics)

---

## Qualification Overview

Ordella uses a hybrid **BANT** (Budget, Authority, Need, Timeline) framework with **MEDDIC** elements (Metrics, Economic Buyer, Decision Criteria, Decision Process) for Enterprise deals.

| Deal type | Framework | Minimum score to qualify |
|-----------|-----------|---------------------------|
| Starter / Pro (SMB) | BANT + ICP score | 60 / 100 |
| Enterprise | BANT + MEDDIC | 75 / 100 |

Score calculator at end of document.

---

## BANT Criteria

### B — Budget

| Signal | Score | Notes |
|--------|-------|-------|
| Confirmed budget ≥ plan price | 20 | Starter $49/mo, Pro $99/mo (placeholder) |
| Budget exists but not confirmed | 10 | "We have budget for software" |
| No budget, but growth path | 5 | Solo now, hiring therapists |
| No budget, no growth | 0 | Disqualify |

**Placeholder plan prices:** Starter $49/mo · Pro $99/mo · Enterprise custom (min $500/mo)

**Questions to ask:**
- "What are you spending on practice management tools today?"
- "Is there budget allocated for software this quarter?"

---

### A — Authority

| Signal | Score | Notes |
|--------|-------|-------|
| Speaking with owner / economic buyer | 20 | Clinic owner, director, franchise operator |
| Practice manager with purchasing authority | 15 | Can sign or strongly influence |
| Therapist / clinical lead | 10 | Influencer — include in demo, not sole contact |
| Front desk / admin | 0 | Route to decision maker |

**Questions to ask:**
- "Who makes the final decision on practice software?"
- "Will [decision maker] join the demo?"

---

### N — Need

| Signal | Score | Notes |
|--------|-------|-------|
| Active pain with current tools | 20 | Fragmented tools, manual notes, billing gaps |
| Evaluating alternatives | 15 | Contract ending, outgrown current tool |
| Curious but no active pain | 5 | Nurture, not immediate demo |
| No need / happy with current | 0 | Disqualify or long nurture |

**Validated pain points (see `gtm/ideal-customer-profile.md`):**
- Tool fragmentation
- Documentation burden
- Missed appointments / poor reminders
- No clinic visibility (reporting)
- Compliance / SSO (Enterprise)

**Questions to ask:**
- "What's the biggest operational headache in your clinic right now?"
- "How are you handling clinical notes today?"

---

### T — Timeline

| Signal | Score | Notes |
|--------|-------|-------|
| Decision within 30 days | 20 | Contract ending, new clinic opening |
| 30–90 days | 15 | Active evaluation |
| 90+ days / exploring | 5 | Nurture |
| No timeline | 0 | Low priority |

**Questions to ask:**
- "When does your current contract end?"
- "When would you want to be live on a new platform?"

---

## MEDDIC Criteria (Enterprise Only)

### M — Metrics

| Signal | Question |
|--------|----------|
| Quantified pain | "How many hours/week does your team spend on admin?" |
| Success definition | "What would success look like in 90 days?" |

**Example metrics:** Admin hours saved, note completion time, no-show rate reduction.

---

### E — Economic Buyer

| Signal | Action |
|--------|--------|
| Identified | Name, title, email in CRM |
| Engaged | Economic buyer on discovery call or demo |
| Committed | Budget holder approves pilot |

---

### D — Decision Criteria

| Criterion | Ordella answer |
|-----------|----------------|
| Physio-specific workflows | Built for physio, not adapted |
| Security / compliance | Tenant isolation, audit logs, SSO |
| Integration needs | Marketplace (10 providers) + API/webhooks |
| AI safety | Therapist review gate on all AI notes |
| English UI | English-only globally |

**Question:** "What are your must-haves vs nice-to-haves in a platform?"

---

### D — Decision Process

| Stage | Typical Enterprise process |
|-------|---------------------------|
| Discovery | 45-min call, security brief shared |
| Technical eval | IT/security review, SSO test |
| Pilot | 30–90 day pilot, 1–3 locations |
| Procurement | Contract, legal, DPA |
| Rollout | Phased deployment across locations |

**Question:** "Walk me through how software decisions get made at [Group Name]?"

---

### I — Identify Pain (MEDDIC)

Same as BANT Need — documented with quotes in CRM.

---

### C — Champion

| Signal | Action |
|--------|--------|
| Internal advocate identified | Therapist or practice manager pushing for Ordella |
| Champion enabled | Provide one-pager, demo recording, ROI calc |
| Champion absent | Risk flag — engage economic buyer directly |

---

## Clinic Qualification Checklist

Use during first call or from pre-demo questionnaire. Check all that apply.

### Firmographic fit

- [ ] Industry: physiotherapy / physical therapy / sports rehab
- [ ] Therapist count: 1–50 (or Enterprise 10+)
- [ ] Location count: 1–10+ (Enterprise 3+)
- [ ] Region: UK, US, Canada, Australia (primary markets)
- [ ] Operates in English (platform is English-only)
- [ ] Outpatient clinic (not inpatient hospital)

### Technographic fit

- [ ] Uses cloud email and basic SaaS today
- [ ] Not locked into multi-year EMR contract (or contract ending < 90 days)
- [ ] Open to Stripe for billing
- [ ] No requirement for non-English UI

### Pain fit

- [ ] Scheduling pain OR clinical notes pain OR billing pain OR patient engagement pain
- [ ] At least one validated pain point documented in CRM
- [ ] (Enterprise) SSO, audit, or multi-location requirement

### Disqualification flags

- [ ] Requires non-English UI → **Disqualify**
- [ ] Inpatient hospital workflow only → **Disqualify**
- [ ] Budget < $30/mo with no growth → **Disqualify**
- [ ] No decision maker access in 90 days → **Nurture**
- [ ] Competitor locked in 2+ year contract → **Nurture** (set reminder)

**Clinic qualified if:** ≥ 8 of 10 firmographic/technographic/pain checks pass AND no disqualification flags.

---

## Therapist Qualification Checklist

Therapists are often influencers, not economic buyers. Use to assess champion potential and demo customization.

### Profile fit

- [ ] Licensed physiotherapist or equivalent
- [ ] 2+ years clinical experience
- [ ] Uses smartphone / comfortable with apps
- [ ] Creates clinical notes regularly (SOAP or equivalent)

### Pain fit

- [ ] Spends 30+ min/day on documentation
- [ ] Frustrated with current note workflow
- [ ] Open to AI-assisted drafting with review control
- [ ] Wants mobile-friendly access between sessions

### Influence fit

- [ ] Voice in tool selection at clinic
- [ ] Will attend demo or trial and provide feedback
- [ ] Willing to champion internally if product fits

### Red flags

- [ ] Opposed to any AI in clinical workflow → address in demo (review gate)
- [ ] No influence on purchasing → route to owner/manager
- [ ] Solo locum with no clinic affiliation → low priority unless opening clinic

**Therapist champion if:** ≥ 6 of 8 checks pass. Invite to demo alongside economic buyer.

---

## Qualification Score Calculator

### SMB (Starter / Pro) — max 100

| Category | Max points | Scoring |
|----------|------------|---------|
| ICP fit (firmographic) | 25 | 5 pts per check (5 checks) |
| BANT — Budget | 20 | See BANT table |
| BANT — Authority | 20 | See BANT table |
| BANT — Need | 20 | See BANT table |
| BANT — Timeline | 15 | See BANT table |

**Thresholds:**
- **≥ 60:** Qualified → offer demo
- **40–59:** Nurture → email sequence
- **< 40:** Disqualify or long nurture

### Enterprise — max 100

| Category | Max points |
|----------|------------|
| ICP fit | 20 |
| BANT (all four) | 40 |
| Economic buyer identified | 15 |
| Decision criteria documented | 10 |
| Champion identified | 10 |
| Pilot timeline agreed | 5 |

**Thresholds:**
- **≥ 75:** Qualified → enterprise discovery call
- **50–74:** Nurture → security brief + follow-up
- **< 50:** Disqualify or partner referral

---

## Qualification Workflow

```
Lead received → SDR reviews ICP checklist → First contact (email/call)
  → BANT discovery (5 min) → Score calculated
    → ≥ 60: Qualified → send demo link
    → 40–59: Nurture → outreach sequence
    → < 40: Disqualify → log reason
```

### CRM fields to capture

| Field | Values |
|-------|--------|
| `qualification_score` | 0–100 |
| `qualification_framework` | BANT / MEDDIC |
| `disqualification_reason` | Text (if applicable) |
| `champion_contact_id` | CRM contact (therapist) |
| `economic_buyer_contact_id` | CRM contact (owner) |
| `pain_point_primary` | Scheduling / Notes / Billing / Engagement / Enterprise |
| `plan_fit` | Starter / Pro / Enterprise |

---

*Companion: `crm-pipeline.md`, `demo-calendar-setup.md`, `gtm/ideal-customer-profile.md`*
