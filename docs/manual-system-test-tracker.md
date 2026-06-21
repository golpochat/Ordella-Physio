# Ordella Physio — Manual Full-System Test Tracker

> **Started:** 2026-06-21  
> **Mode:** Microservices (Docker dev stack + `frontend-web` :3010 + API gateway :3049)  
> **Rule:** Stop on failure — fix before continuing. Record every step below.

---

## Test credentials (seeded `demo-tenant`)

| Role | Email | Password | Portal |
|------|-------|----------|--------|
| Super Admin | `superadmin@ordella.dev` | `SuperAdmin123!` | `/super-admin` |
| Clinic Admin | `clinicadmin@ordella.dev` | `ClinicAdmin123!` | `/clinic` |
| Therapist | `therapist@ordella.dev` | `Therapist123!` | `/therapist` |
| Staff | `staff@ordella.dev` | `Staff123!` | `/staff` |
| Pharmacy | `pharmacy@ordella.dev` | `Pharmacy123!` | `/pharmacy` |
| Patient 1 | `patient1@ordella.dev` | `Patient123!` | `/patient` |
| Patient 2 | `patient2@ordella.dev` | `Patient123!` | `/patient` |

**Tenant ID (header/context):** `demo-tenant`  
**Frontend base:** http://localhost:3010  
**API gateway:** http://localhost:3049

---

## Test phases (execution order)

| Phase | Scope | Finish line |
|-------|--------|-------------|
| **0** | Stack preflight (infra, gateway, frontend) | All critical containers up; gateway + frontend reachable |
| **1** | Public marketing (no login) | Home, pricing, contact, blog |
| **2** | Auth surfaces (anonymous) | Login, register, checkout, forgot-password pages load |
| **3** | Authentication (all roles) | Each role logs in and lands on correct portal |
| **4** | Super admin platform | Overview, orgs, tenants, users, billing metrics, provisioning |
| **5** | Organization portal | Org dashboard + org-level billing |
| **6** | Clinic admin — core ops | Patients, appointments, staff, therapists, notes, billing |
| **7** | Role portals | Therapist, staff, patient, pharmacy workflows |
| **8** | Communications | Messaging, notifications |
| **9** | Integrations | Files, marketplace, enterprise SSO, terminals |
| **10** | Reporting & audit | Reports, audit logs |
| **11** | AI platform UI | Clinic AI routes (services mostly not in dev stack) |
| **12** | Direct service health | Per-microservice `/health` via gateway or port |

---

## Results log

| ID | Phase | Service / area | URL or endpoint | User | Expected outcome | Actual outcome | Status | Notes |
|----|-------|----------------|-----------------|------|------------------|----------------|--------|-------|
| 0.1 | 0 | Frontend | http://localhost:3010 | — | Marketing homepage loads; nav visible (Pricing, Login, etc.); no 5xx | Homepage loaded; nav OK | **PASS** | |
| 0.2 | 0 | API Gateway | http://localhost:3049/health | — | JSON `{ "status": "ok", "service": "api-gateway" }` | Gateway health OK | **PASS** | |
| 0.3 | 0 | Auth (core-service) | http://localhost:3049/auth/health | — | JSON `{ "status": "ok", "service": "auth-service" }`; not 502 | Auth health OK | **PASS** | |
| 0.4 | 0 | Frontend → gateway | http://localhost:3010/login | — | Login form renders; email + password fields | Login form OK | **PASS** | |
| 0.5 | 0 | Docker stack | `docker ps` | — | `frontend`, `api-gateway`, `core-service`, `db`, `redis`, `nats` all Up | All critical containers Up | **PASS** | Phase 0 complete |
| 1.1 | 1 | Marketing — pricing | http://localhost:3010/pricing | — | Pricing page loads; plan tiers visible; no 5xx | Pricing OK | **PASS** | |
| 1.2 | 1 | Marketing — contact | http://localhost:3010/contact | — | "Get in touch" hero; contact form + email `support@ordella.com` | Contact OK | **PASS** | |
| 1.3 | 1 | Marketing — blog | http://localhost:3010/blog | — | Blog index loads; at least one post card/link | Blog OK | **PASS** | |
| 1.4 | 1 | Marketing — nav links | http://localhost:3010 | — | Header links to Pricing, Login work from homepage | Nav OK | **PASS** | Phase 1 complete |
| 2.1 | 2 | Auth — login | http://localhost:3010/login | — | "Log in to your clinic"; email + password fields; link to forgot password | Login OK | **PASS** | |
| 2.2 | 2 | Auth — register | http://localhost:3010/register | — | Registration form; clinic name + admin email fields; no 5xx | "Create your clinic workspace" form; clinic name, admin email, password | **PASS** | Direct URL |
| 2.3 | 2 | Auth — checkout | http://localhost:3010/checkout?plan=pro&cycle=monthly&intent=checkout | — | Checkout page loads; order summary + billing fields visible | Paid checkout OK | **PASS** | |
| 2.4 | 2 | Auth — forgot password | http://localhost:3010/forgot-password | — | "Forgot password" card; email field; "Back to sign in" link | Forgot password OK | **PASS** | |
| 2.2b | 2 | Auth — start trial (bonus) | http://localhost:3010/start-trial | — | Redirects to `/checkout?intent=trial`; Free Trial Overview + €0 today | Matches trial checkout screenshot | **PASS** | Via nav "Start Free Trial" |
| 3.1 | 3 | Login — Super Admin | http://localhost:3010/login | `superadmin@ordella.dev` | Lands on `/super-admin` | OK | **PASS** | |
| 3.2 | 3 | Login — Clinic Admin | http://localhost:3010/login | `clinicadmin@ordella.dev` | Lands on `/clinic`; dashboard loads | OK; console 502 on `/api/tenant/trial`, `/api/tenant/profile` | **PASS*** | Retest 3.2a after fix |
| 3.2a | 3 | Clinic — tenant APIs | http://localhost:3010/clinic | `clinicadmin@ordella.dev` | No 502 on `/api/tenant/profile` or `/api/tenant/trial` | No 502; tenant APIs OK | **PASS** | Fix #1 verified |
| 3.3a | 3 | Therapist — portal APIs | http://localhost:3010/therapist | `therapist@ordella.dev` | Dashboard loads; no 401/502 on patient/appointment/notes | Dashboard OK; clean console | **PASS** | Fix #2 verified |
| 3.4a | 3 | Staff — portal APIs | http://localhost:3010/staff | `staff@ordella.dev` | Dashboard loads; `/staff/reports` accessible; no blocking 401/403 | Dashboard + reports OK; clean console | **PASS** | Fix #3 verified |
| 3.3 | 3 | Login — Therapist | http://localhost:3010/login | `therapist@ordella.dev` | Lands on `/therapist` | Login + dashboard OK after fix | **PASS** | Retest 3.3a |
| 3.4 | 3 | Login — Staff | http://localhost:3010/login | `staff@ordella.dev` | Lands on `/staff` | Login + portal APIs OK after fix | **PASS** | Fix #3 verified via 3.4a |
| 3.5 | 3 | Login — Pharmacy | http://localhost:3010/login | `pharmacy@ordella.dev` | Lands on `/pharmacy` | OK | **PASS** | |
| 3.6 | 3 | Login — Patient | http://localhost:3010/login | `patient1@ordella.dev` | Lands on `/patient` | OK | **PASS** | |
| 4.1 | 4 | Super admin — overview | http://localhost:3010/super-admin | `superadmin@ordella.dev` | Dashboard loads; nav visible; no 5xx or blocking console errors | OK | **PASS** | |
| 4.2 | 4 | Super admin — organizations | http://localhost:3010/super-admin/organizations | `superadmin@ordella.dev` | Organizations list loads; Create organization opens form | OK | **PASS** | Fix #4 verified |
| 4.3 | 4 | Super admin — tenants | http://localhost:3010/super-admin/tenants | `superadmin@ordella.dev` | Tenants list loads (incl. demo-tenant); no 5xx or blocking console errors | OK | **PASS** | |
| 4.4 | 4 | Super admin — users | http://localhost:3010/super-admin/users | `superadmin@ordella.dev` | Users list loads; seeded accounts visible; no 5xx or blocking console errors | OK | **PASS** | |
| 4.5 | 4 | Super admin — billing metrics | http://localhost:3010/super-admin/billing | `superadmin@ordella.dev` | Platform metrics load (MRR, subs, churn); no 5xx or blocking console errors | Metrics OK; amounts shown as `$` (USD hardcoded in UI) | **PASS*** | Currency display ≠ platform EUR default — cosmetic/config debt |
| 4.6 | 4 | Super admin — provisioning | http://localhost:3010/super-admin/provisioning/new | `superadmin@ordella.dev` | Provision workspace wizard loads; no redirect loop or blocking errors | OK | **PASS** | Phase 4 complete |
| 5.1 | 5 | Organization portal — billing | http://localhost:3010/organization/billing | — | Org billing page loads for `ORG_ADMIN` | No seeded org-admin user; org login path not in demo creds | **SKIP** | Phase 5 deferred — seed org admin or complete provisioning first |
| 6.1 | 6 | Clinic — patients | http://localhost:3010/clinic/patients | `clinicadmin@ordella.dev` | Patients list loads; nav link visible | OK | **PASS** | Fix #5 verified |
| 6.2 | 6 | Clinic — appointments | http://localhost:3010/clinic/appointments | `clinicadmin@ordella.dev` | Appointments page loads; no blocking 403 on locations API | OK | **PASS** | Fix #6 verified |
| 6.3 | 6 | Clinic — therapists | http://localhost:3010/clinic/therapists | `clinicadmin@ordella.dev` | Therapists list loads; seeded therapist visible; no blocking console errors | OK | **PASS** | |
| 6.4 | 6 | Clinic — staff | http://localhost:3010/clinic/staff | `clinicadmin@ordella.dev` | Staff list UI loads; no 5xx or blocking console errors | Page OK; empty list (no `staff-service` seed) | **PASS*** | `staff@ordella.dev` auth user exists; `staff_members` table not seeded |
| 6.5 | 6 | Clinic — notes | http://localhost:3010/clinic/notes | `clinicadmin@ordella.dev` | Notes oversight page loads; no 5xx or blocking console errors | Read-only empty state; no create (by design) | **PASS*** | Notes authored in therapist portal; no notes seeded |
| 6.6 | 6 | Clinic — billing | http://localhost:3010/clinic/billing | `clinicadmin@ordella.dev` | Billing page loads; subscription + invoice sections render; no blocking errors | Platform sub `none`; empty invoice lists; Stripe not wired locally | **PASS*** | Expected for demo stack without Stripe keys |
| 7.1 | 7 | Therapist — patients | http://localhost:3010/therapist/patients | `therapist@ordella.dev` | Patients list loads; no access-denied; clean console | OK after fixes #7–7.1c | **PASS** | Session RBAC + TrialBanner + CSP fixes verified |
| 7.2 | 7 | Therapist — notes create | http://localhost:3010/therapist/notes/create | `therapist@ordella.dev` | Create note form loads; patient dropdown + AI assistant visible; no error boundary | OK after fix #7.2 | **PASS** | `useAiTranscribeNote` Zustand selector infinite loop fixed |
| 7.3 | 7 | Therapist — notes list | http://localhost:3010/therapist/notes | `therapist@ordella.dev` | Notes list loads; Create note button visible; empty state or seeded notes; no blocking errors | Empty state OK; Create note visible | **PASS** | |
| 7.4 | 7 | Therapist — appointments (today) | http://localhost:3010/therapist/appointments | `therapist@ordella.dev` | Appointments page loads; Today/Upcoming/Past sections render; no blocking errors | Empty states OK; clean console | **PASS** | `/therapist/today` redirects here |
| 7.5 | 7 | Therapist — schedule (upcoming) | http://localhost:3010/therapist/schedule | `therapist@ordella.dev` | Weekly schedule loads; week navigation works; no blocking errors | Empty week OK; clean console | **PASS** | `/therapist/upcoming` redirects here |
| 7.6 | 7 | Therapist — dashboard | http://localhost:3010/therapist | `therapist@ordella.dev` | Home overview loads; stats + today's appointments; no blocking errors | OK at `/therapist`; `/therapist/dashboard` redirects here | **PASS*** | Canonical dashboard URL is `/therapist` (not `/therapist/dashboard`) |
| 7.7 | 7 | Therapist — profile | http://localhost:3010/therapist/profile | `therapist@ordella.dev` | Profile page loads; therapist details editable or viewable; no blocking errors | OK | **PASS** | |
| 7.8 | 7 | Staff — billing | http://localhost:3010/staff/billing | `staff@ordella.dev` | Billing page loads; invoice list or empty state; no 403 on `/api/billing/invoices` | OK after fix #7.8 | **PASS** | Canonical URL `/staff/billing`; `/staff/billing/invoices` redirects here |
| 7.9 | 7 | Staff — overview | http://localhost:3010/staff | `staff@ordella.dev` | Home overview loads; no blocking errors | OK | **PASS** | `/staff/overview` redirects here |
| 7.10 | 7 | Staff — patients | http://localhost:3010/staff/patients | `staff@ordella.dev` | Patient lookup loads; list visible; no blocking errors | 2 patients; read-only lookup (by design) | **PASS*** | STAFF has `patients.read` only, not `patients.write` |
| 7.11 | 7 | Staff — appointments | http://localhost:3010/staff/appointments | `staff@ordella.dev` | Appointments page loads; Today/Upcoming/Past sections; no blocking errors | Empty states OK; clean console | **PASS** | |
| 7.12 | 7 | Staff — notes | http://localhost:3010/staff/notes | `staff@ordella.dev` | Notes list loads; read-only empty state OK; no blocking errors | Read-only; empty (by design) | **PASS*** | Notes authored in therapist portal |
| 7.13 | 7 | Staff — reports | http://localhost:3010/staff/reports | `staff@ordella.dev` | Reports dashboard loads; read-only UI; no blocking errors | Metrics at 0; read-only generate form; clean console | **PASS*** | STAFF has `reports.read` only |
| 7.14 | 7 | Patient — profile | http://localhost:3010/patient/profile | `patient1@ordella.dev` | Profile loads; read-only viewer; no redirect loop | OK; email shown; other fields empty (read-only) | **PASS*** | `/patient` redirects here; fix #7.14 route guard |
| 7.15 | 7 | Patient — appointments | http://localhost:3010/patient/appointments | `patient1@ordella.dev` | Appointments page loads; empty state OK; no blocking errors | Empty state OK; clean console | **PASS** | |
| 7.16 | 7 | Patient — notes | http://localhost:3010/patient/notes | `patient1@ordella.dev` | Notes list loads; read-only empty state OK | Empty state OK; clean console | **PASS*** | |
| 7.17 | 7 | Patient — billing | http://localhost:3010/patient/billing | `patient1@ordella.dev` | Billing page loads; invoice list or empty state; no blocking errors | Empty state OK; clean console | **PASS*** | |
| 7.18 | 7 | Patient — messages | http://localhost:3010/patient/messages | `patient1@ordella.dev` | Messages UI loads; empty inbox OK | Empty inbox; SSE `/api/messaging/stream` 404 (non-blocking) | **PASS*** | Realtime stream deferred to Phase 8 / messaging-service rebuild |
| 7.19 | 7 | Patient — notifications | http://localhost:3010/patient/notifications | `patient1@ordella.dev` | Notifications page loads; no blocking errors | OK; clean console | **PASS** | |
| 7.20 | 7 | Pharmacy — overview | http://localhost:3010/pharmacy | `pharmacy@ordella.dev` | Dashboard loads; stats cards visible; no blocking errors | OK after fix #7.20 | **PASS** | |
| 7.21 | 7 | Pharmacy — prescriptions | http://localhost:3010/pharmacy/prescriptions | `pharmacy@ordella.dev` | Prescriptions list loads; empty state or seeded Rx | Empty state OK | **PASS** | |
| 7.22 | 7 | Pharmacy — fulfillment | http://localhost:3010/pharmacy/fulfillment | `pharmacy@ordella.dev` | Fulfillment queue loads; no 404 on `/api/pharmacy/fulfillment` | OK after fix #7.20 | **PASS** | |
| 7.23 | 7 | Pharmacy — patients | http://localhost:3010/pharmacy/patients | `pharmacy@ordella.dev` | Patient lookup loads; no blocking errors | OK | **PASS** | |
| 7.24 | 7 | Pharmacy — billing | http://localhost:3010/pharmacy/billing | `pharmacy@ordella.dev` | Billing page loads; empty invoice state OK | Empty state OK | **PASS*** | |
| 7.25 | 7 | Pharmacy — reports | http://localhost:3010/pharmacy/reports | `pharmacy@ordella.dev` | Reports page loads; no blocking errors | OK | **PASS** | |
| 7.26 | 7 | Pharmacy — messages | http://localhost:3010/pharmacy/messages | `pharmacy@ordella.dev` | Messages UI loads; empty inbox OK | Empty inbox; SSE stream 404 (non-blocking) | **PASS*** | Same as 7.18 |
| 7.27 | 7 | Pharmacy — notifications | http://localhost:3010/pharmacy/notifications | `pharmacy@ordella.dev` | Notifications page loads; no blocking errors | OK | **PASS** | |
| 7.28 | 7 | Pharmacy — profile | http://localhost:3010/pharmacy/profile | `pharmacy@ordella.dev` | Profile page loads; no blocking errors | OK | **PASS** | |
| 8.0 | 8 | Messaging — SSE stream | `GET /api/messaging/stream` | `clinicadmin@ordella.dev` | Stream endpoint exists; accepts auth (not 404) | HTTP 408 on short-lived probe (SSE hold-open); route exists | **PASS*** | Expected for non-SSE probe client |
| 8.1 | 8 | Clinic — messages | http://localhost:3010/clinic/messages | `clinicadmin@ordella.dev` | Messages UI loads; messaging APIs OK | OK | **PASS** | |
| 8.2 | 8 | Clinic — notifications | http://localhost:3010/clinic/notifications | `clinicadmin@ordella.dev` | Notifications page loads; no blocking errors | OK | **PASS** | |
| 8.3 | 8 | Settings — notification providers | http://localhost:3010/settings/notifications/providers | `clinicadmin@ordella.dev` | Providers settings page loads; list API 200 | OK after fixes #8.3–8.5 | **PASS** | |
| 8.4 | 8 | Settings — notification analytics | http://localhost:3010/settings/notifications/analytics | `clinicadmin@ordella.dev` | Analytics page loads; analytics API 200 | OK | **PASS** | |
| 8.5 | 8 | Settings — delivery logs | http://localhost:3010/settings/notifications/logs | `clinicadmin@ordella.dev` | Delivery logs page loads; delivery-logs API 200 | OK after fix #8.5 | **PASS** | |
| 8.6 | 8 | Therapist — messages | http://localhost:3010/therapist/messages | `therapist@ordella.dev` | Messages UI loads; no blocking errors | OK | **PASS** | |
| 8.7 | 8 | Therapist — notifications | http://localhost:3010/therapist/notifications | `therapist@ordella.dev` | Notifications page loads | OK | **PASS** | |
| 8.8 | 8 | Staff — messages | http://localhost:3010/staff/messages | `staff@ordella.dev` | Messages UI loads | OK | **PASS** | |
| 8.9 | 8 | Staff — notifications | http://localhost:3010/staff/notifications | `staff@ordella.dev` | Notifications page loads | OK | **PASS** | |
| 8.10 | 8 | Gateway — messaging health | http://localhost:3049/messaging/health | — | 200 | 200 | **PASS** | |
| 8.11 | 8 | Gateway — messaging ready | http://localhost:3049/messaging/ready | — | 200 | 200 | **PASS** | |
| 8.12 | 8 | Gateway — notifications health | http://localhost:3049/notifications/health | — | 200 | 200 | **PASS** | |
| 9.1 | 9 | Gateway — marketplace health | http://localhost:3049/marketplace/health | — | 200 | 200 | **PASS** | |
| 9.2 | 9 | Gateway — enterprise health | http://localhost:3049/enterprise/health | — | 200 | 200 | **PASS** | |
| 9.3 | 9 | Gateway — terminals health | http://localhost:3049/terminals/health | — | 200 | 200 | **PASS** | |
| 9.4 | 9 | Gateway — files health | http://localhost:3049/files/health | — | 200 | 200 | **PASS** | |
| 9.5 | 9 | Clinic — marketplace | http://localhost:3010/clinic/marketplace | `clinicadmin@ordella.dev` | Marketplace UI loads; providers API 200 | OK | **PASS** | |
| 9.6 | 9 | Clinic — enterprise SSO | http://localhost:3010/clinic/enterprise | `clinicadmin@ordella.dev` | Enterprise settings UI loads | OK | **PASS** | |
| 9.7 | 9 | Clinic — terminals | http://localhost:3010/clinic/terminals | `clinicadmin@ordella.dev` | Terminals list loads; terminal API 200 | Empty list OK | **PASS** | |
| 9.8 | 9 | Clinic — register terminal | http://localhost:3010/clinic/terminals/new | `clinicadmin@ordella.dev` | New terminal form loads; no blocking errors | OK | **PASS** | |
| 9.9 | 9 | Clinic — patient attachments | http://localhost:3010/clinic/patients/{id}/attachments | `clinicadmin@ordella.dev` | Attachments page loads; files API 200 | OK after fixes #9.1–9.3 | **PASS** | Patient ID `c3L8xtzMQFQqOm45DMXqEG6O` |
| 9.10 | 9 | API — enterprise SSO | `GET /api/enterprise/sso` | `clinicadmin@ordella.dev` | Feature gate or config UI (403 OK for non-enterprise plan) | 403 "Enterprise plan required" | **PASS*** | Expected for demo tenant without enterprise plan |
| 9.11 | 9 | API — files list | `GET /api/files?patientId=...` | `clinicadmin@ordella.dev` | 200 with empty list or attachments | 200 empty list | **PASS** | After fix #9.3 |

---

## Blockers / fixes

| Test ID | Issue | Fix applied | Retest ID |
|---------|-------|-------------|-----------|
| 3.2 | `/api/tenant/profile` + `/api/tenant/trial` → 502 (routed to unavailable clinic-backend in microservices mode) | tenant-service onboarding routes; gateway `/tenants/profile|trial` + legacy `/api/tenant/*` aliases; frontend `CLINIC_BACKEND_INTERNAL_URL` → api-gateway | 3.2a |
| 3.3 | Therapist/staff dashboards: 401 race + notes-service down (502) | notes-service Docker/Prisma fix; `useQueryAuthReady()` on therapist/staff portal hooks | 3.3a, 3.4a |
| 3.4a | Staff `/access-denied` on reports/billing; billing API 403; dashboard blocked by billing errors | Session cookie now includes resolved permissions; middleware role fallback; `billing.read` on STAFF; optional billing on dashboard; TrialBanner gated | 3.4a |
| 4.2 | Create organization + org pages redirect (WithPermission false negative) | `can()` now resolves dot-notation permission values (`organization.manage`, etc.) | 4.2 |
| 5.1 | No `ORG_ADMIN` in demo seed; cannot exercise `/organization/*` login flow | Deferred — add seeded org admin or finish provisioning wizard with known owner creds | 5.x |
| 6.1 | Clinic nav missing Patients/Appointments/etc. (`patient.view` not in `can()`) | Legacy permission aliases + `CLINIC_ADMIN`→`ADMIN` in `roleHasPermission` | 6.1 |
| 6.2 | Appointments 403 on tenant locations list (`location.manage` not in platform ADMIN perms) | GET locations no longer requires `location.manage`; JWT passes `resolvedPermissions`; removed font preload warnings | 6.2 |
| 7.1 | Therapist `/therapist/patients` → access-denied (nav shows link but middleware denies `patients.read`) | Added `patients.read`, `patients.write`, `billing.read` to THERAPIST in `platform-role-permissions.ts` | 7.1a |
| 7.1a | Still access-denied after RBAC fix — session cookie used stale API `permissions` from auth-service | `buildSessionUser` + `useAuth` + refresh now derive permissions from platform RBAC; `/access-denied` added to public routes | 7.1b |
| 7.1b | Therapist dashboard: `billing-context` 403 + CSP error on `token-reuse-detected` login | TrialBanner skips billing-context for non-admins; `DISABLE_NONCE_CSP` for local Docker; clear stale session on token-reuse redirect | 7.1c |
| 7.2 | `/therapist/notes/create` → "Therapist portal error"; React #185 infinite re-render | `useAiTranscribeNote`: replaced unstable Zustand object selector with `getState()` in mutation | 7.2 |
| 7.8 | Staff `/staff/billing` → 403 on `/api/billing/invoices` (JWT missing `billing.read`) | Rebuilt `core-service` + `billing-service` from `docker-compose.dev.yml` with updated `@ordella/security`; billing JWT strategy passes `effectiveRole` + `resolvedPermissions` | 7.8 |
| 7.14 | Patient portal: all nav links redirected to `/patient/profile` (route guard whitelist) | Expanded `ALLOWED_PREFIXES` in `patient-portal-route-guard.tsx`; added `/patient/*` entries to `NAV_PERMISSION_REQUIREMENTS`; rebuilt `frontend-web` | 7.14–7.19 |
| 7.20 | Pharmacy `/pharmacy` + `/pharmacy/fulfillment` → 404 on `GET /api/pharmacy/fulfillment` (stale image) | Rebuilt `pharmacy-service` from `docker-compose.dev.yml` (FulfillmentController now deployed) | 7.20–7.22 |
| 8.3 | `/settings/notifications/*` → `/forbidden` for clinic admin (`ADMIN` maps to `CLINIC_ADMIN`; missing from `/settings` route access) | Added `CLINIC_ADMIN` to `ROUTE_ROLE_ACCESS["/settings"]` in `rbac.ts` | 8.3–8.5 |
| 8.4 | Providers page React error boundary (`roleHasMappedPermission` crash on unmapped `notification.send`) | Guard in `role-permission-map.ts`; platform check in `can()`; simplified providers page actions (no nested `IfHasPermission`) | 8.3 |
| 8.5 | `GET /api/notification-providers/delivery-logs` → 500 (`delivery_logs.updatedAt` schema drift) | Removed `updatedAt` from `DeliveryLog` Prisma model (DB never had column); rebuilt `notification-provider-service` via `docker-compose.dev.yml` (`db` host) | 8.5 |
| 9.1 | `enterprise-service` crash (Prisma Alpine binary mismatch) | Added `binaryTargets` to `enterprise-service/prisma/schema.prisma`; rebuilt via `docker-compose.dev.yml` | 9.2, 9.6 |
| 9.2 | Files BFF routed to unavailable clinic-backend in microservices mode | `gateway-proxy.ts`: proxy files to gateway unless `useClinicBackend()`; added `/files` proxy in api-gateway; `GATEWAY_PATHS.files` → `/files` | 9.9, 9.11 |
| 9.3 | `GET /api/files` → 403 "Missing required permission"; attachments page permission crash | Added `files.view/upload/delete` to platform RBAC; attachments page uses `patients.read` only; rebuilt `core-service` for JWT permissions | 9.9, 9.11 |

---

## Session notes

- Billing E2E: 15/15 passed (2026-06-20) before this manual run.
- Super-admin billing page previously showed Stripe-live metrics ($58 MRR, 7 active subs).
- **Phase 0 complete** (2026-06-21): 0.1–0.5 all PASS.
- **Phase 1 complete** (2026-06-21): 1.1–1.4 all PASS.
- **Phase 2 complete** (2026-06-21): 2.1–2.4 + 2.2b all PASS.
- **Phase 3 complete** (2026-06-21): 3.1–3.6 + 3.2a, 3.3a, 3.4a all PASS.
- **Phase 4 complete** (2026-06-21): 4.1–4.6 all PASS.
- **Phase 5 skipped** (2026-06-21): no seeded `ORG_ADMIN` / org-portal login in demo creds; UI exists at `/organization/billing` but needs provisioned org owner.
- **Phase 6 complete** (2026-06-21): 6.1–6.6 all PASS/PASS* — clinic core ops UI verified under `clinicadmin@ordella.dev`.
- **Phase 7 complete** (2026-06-21): 7.1–7.28 therapist, staff, patient, and pharmacy portal sidebar routes all PASS/PASS*.
- **Phase 8 complete** (2026-06-21): 8.0–8.12 communications — clinic/therapist/staff messages & notifications; settings notification providers/analytics/logs; gateway messaging health OK.
- **Phase 9 complete** (2026-06-21): 9.1–9.11 integrations — marketplace, enterprise SSO UI, terminals, patient attachments/files API; gateway integration health OK; enterprise SSO API 403 expected (PASS*).
- **Next:** Phase 10 — Reporting & audit.
- Login → trial onboarding is a 2-step funnel: `/checkout?intent=trial` first, then `/register` after "Start Free Trial" (not a direct link to `/register`).
