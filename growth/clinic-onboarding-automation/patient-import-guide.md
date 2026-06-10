# Ordella Physio — Patient Import Guide

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Clinic Onboarding Automation  
**Portal:** `/clinic/patients`  
**Owner:** Clinic Admin

---

## Import Methods

| Method | Best for | Volume | Availability |
|--------|----------|--------|--------------|
| Manual entry | New clinics, < 20 patients | 1 at a time | **Live** |
| CSV bulk upload | Migration, 20–500 patients | Batch | **Planned** (Growth Phase engineering) |
| Migration support | Enterprise, 500+ patients | Custom | Enterprise CS |

---

## CSV Import Template

### File format

- **Encoding:** UTF-8
- **Delimiter:** Comma (`,`)
- **Header row:** Required (row 1)
- **Max file size:** 5 MB (placeholder)
- **Max rows per upload:** 500 (placeholder)

### Template columns

| Column | Required | Format | Example | Notes |
|--------|----------|--------|---------|-------|
| `first_name` | Yes | Text, 1–100 chars | Jane | |
| `last_name` | Yes | Text, 1–100 chars | Smith | |
| `email` | Yes | Valid email | jane.smith@email.com | Unique per tenant |
| `phone` | Yes | E.164 or local | +447911123456 | |
| `date_of_birth` | No | YYYY-MM-DD | 1985-03-15 | |
| `gender` | No | male / female / other / prefer_not_to_say | female | |
| `address_line1` | No | Text | 12 High Street | |
| `address_line2` | No | Text | Flat 2 | |
| `city` | No | Text | London | |
| `state_region` | No | Text | Greater London | |
| `postal_code` | No | Text | SW1A 1AA | |
| `country` | No | ISO 3166-1 alpha-2 | GB | |
| `primary_therapist_email` | No | Email | therapist@clinic.com | Must match existing staff |
| `external_id` | No | Text | PMS-12345 | For migration dedup |
| `notes` | No | Text | Referred by Dr. Jones | Admin-only, not clinical |
| `portal_invite` | No | true / false | true | Send invite email on import |

### Sample CSV

```csv
first_name,last_name,email,phone,date_of_birth,gender,address_line1,city,postal_code,country,primary_therapist_email,portal_invite
Jane,Smith,jane.smith@email.com,+447911123456,1985-03-15,female,12 High Street,London,SW1A 1AA,GB,emma@physioclinic.com,true
John,Doe,john.doe@email.com,+447911654321,1972-11-20,male,45 Oak Avenue,Manchester,M1 2AB,GB,emma@physioclinic.com,true
```

### Download

**Template file (placeholder):** `/clinic/patients/import/template.csv`  
**Documentation link in-app:** "Download CSV template" on import page.

---

## Bulk Upload Instructions

### Step-by-step (planned UI flow)

| Step | Action | Path |
|------|--------|------|
| 1 | Open patient import | `/clinic/patients/import` |
| 2 | Download CSV template | Template button |
| 3 | Fill template in Excel / Google Sheets | Offline |
| 4 | Validate locally (see rules below) | — |
| 5 | Upload CSV file | Drag-and-drop or file picker |
| 6 | Preview validation results | System shows errors/warnings |
| 7 | Fix errors or download error report | Re-upload if needed |
| 8 | Confirm import | Submit |
| 9 | Review import summary | X created, Y skipped, Z errors |
| 10 | Send portal invites | Bulk or per `portal_invite` column |

### Import modes

| Mode | Behavior |
|------|----------|
| **Create only** | Skip rows where email already exists |
| **Update existing** | Match on `email` or `external_id`; update fields |
| **Upsert** | Create or update (Enterprise migration) |

### Post-import automation

| Event | Action |
|-------|--------|
| `onboarding.patients.imported` | Update clinic onboarding progress |
| `portal_invite=true` | Queue patient welcome emails |
| Import > 100 rows | CS notification for review |

---

## Data Validation Rules

### Hard errors (row rejected)

| Rule | Field | Message |
|------|-------|---------|
| Required field empty | `first_name`, `last_name`, `email`, `phone` | "Required field missing" |
| Invalid email format | `email` | "Invalid email address" |
| Duplicate email in file | `email` | "Duplicate email in CSV" |
| Email exists in tenant | `email` | "Patient already exists" (create-only mode) |
| Invalid date format | `date_of_birth` | "Use YYYY-MM-DD" |
| Invalid gender value | `gender` | "Must be male, female, other, or prefer_not_to_say" |
| Therapist email not found | `primary_therapist_email` | "Therapist not found in clinic" |
| Row exceeds char limits | Any | "Field exceeds maximum length" |
| Invalid country code | `country` | "Use ISO 3166-1 alpha-2" |

### Warnings (row imported with flag)

| Rule | Field | Message |
|------|-------|---------|
| Missing date of birth | `date_of_birth` | "DOB recommended for clinical records" |
| Missing address | address fields | "Address incomplete" |
| Phone not E.164 | `phone` | "Phone normalized to E.164" |
| No primary therapist | `primary_therapist_email` | "No therapist assigned" |
| `portal_invite` false | — | "No portal invite sent" |

### PHI handling

- CSV uploads transmitted over TLS only
- Files deleted from temp storage within 24 hours after import
- Import audit log retained (who, when, row count) — Enterprise audit log
- Do not include clinical notes or diagnoses in CSV — admin demographic data only

---

## Manual Entry (current live path)

| # | Step | Path |
|---|------|------|
| 1 | Click Add patient | `/clinic/patients/create` |
| 2 | Enter required fields | Form |
| 3 | Assign therapist | Dropdown |
| 4 | Save | Submit |
| 5 | Send portal invite | Email action |

**Onboarding minimum:** 3 patients manually for trial activation.

---

## Migration Support (Enterprise)

| Volume | Process |
|--------|---------|
| 500+ patients | Open migration ticket with CS |
| Deliverables | Field mapping doc, test import, full import, verification report |
| Timeline | 5–10 business days (placeholder) |
| Fee | From $499 (see `gtm/pricing-model.md`) |

**Required from clinic:**
- Export from current PMS (CSV or Excel)
- Signed data processing agreement (if applicable)
- Verification contact at clinic

---

## Troubleshooting

| Issue | Resolution |
|-------|------------|
| Upload fails | Check UTF-8 encoding; remove special characters |
| Many duplicate errors | Switch to upsert mode or clean source data |
| Therapist not found | Invite therapist before import |
| Portal invites not sent | Check `portal_invite` column; verify email service (SendGrid) |
| Import stuck | Contact support@ordella-physio.com — reference import job ID |

---

## Onboarding Integration

| Milestone | Progress |
|-----------|----------|
| First patient created (manual or import) | +15% (`patient` step) |
| ≥ 3 patients in tenant | Trial health signal: green |
| Import ≥ 20 patients | Skip manual patient emails — use bulk invite |

---

*Companion: `clinic-admin-checklist.md`, `automated-onboarding-flow.md`, `support-escalation-flow.md`*
