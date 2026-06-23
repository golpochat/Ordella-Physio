# Ordella Physio — Design & UX Consistency Tracker

> **Started:** 2026-06-23  
> **Scope:** `apps/frontend-web` — all portals, CRUD pages, modals, forms, navigation, defaults  
> **Goal:** Consistent layout/spacing, meaningful icons, icon buttons over text links where appropriate, user-friendly validation/auth messages, defaults **EUR / Ireland / English (en-IE)**  
> **Status key:** `OPEN` · `IN PROGRESS` · `DONE` · `WON'T FIX` (with reason) · `DEFERRED`

---

## Summary (audit pass 1 + closure pass)

| Area | Open | Done | Notes |
|------|------|------|-------|
| Layout & spacing | 0 | 12 | Legacy `/dashboard` shell documented; super-admin token documented |
| Page scaffolding | 2 | 6 | DC-P06/P07 deferred (dual card / form class patterns) |
| Icons & navigation | 0 | 9 | Therapist/staff icons split in clinic nav |
| Forms & validation | 1 | 6 | DC-F06 native `<select>` deferred |
| Modals & dropdowns | 0 | 4 | Phase 6 complete |
| Actions (link vs button) | 0 | 5 | Pharmacy CTA on `ListPage`; row actions standardized |
| Currency / locale / country | 0 | 15 | Phase 1 complete |
| Responsiveness | 0 | 3 | Table horizontal scroll on mobile |
| Auth messages | 0 | 3 | Phase 2 complete |

**Platform target defaults:** `currency: EUR` · `country: IE (Ireland)` · `locale: en-IE` · `timezone: Europe/Dublin` (where tenant not set)

**Already aligned (partial):** `lib/platform-formatting.ts` (EUR + en-IE), `SettingsForm` default EUR, checkout `billingCountry: IE`, `lib/pricing-plans.ts` en-IE/EUR, `lib/onboarding-default-config.ts` Ireland VAT.

---

## 1. Layout & shell consistency

| ID | Item | Portals / paths | Issue | Status |
|----|------|-----------------|-------|--------|
| DC-L01 | **Dual navigation systems** | All portals now use `PortalNavigationShell` + `Sidebar` + `portal-navigation.ts` | **DONE** — `AppLayout` removed |
| DC-L02 | **Triple nav config files** | `nav-config.ts` and `sidebar-config.ts` removed; `portal-navigation.ts` is canonical | **DONE** |
| DC-L03 | **User portal custom shell** | `user-portal-shell.tsx` delegates to `PortalNavigationShell` with `NavIcon` sidebar | **DONE** |
| DC-L04 | **Legacy route shells** | `dashboard-shell.tsx` + `portal-shell.tsx` use `createNavConfigFromLinks` | **DONE** — intentional for `/dashboard` role picker |
| DC-L05 | **Content padding token** | `.dashboard-content` in `styles/navigation.css` | **DONE** — user/settings/org on tokens |
| DC-L06 | **Super-admin visual variant** | `super-admin-portal` class in `styles/navigation.css` | **DONE** — `--sa-bg` documented as design token |
| DC-L07 | **Copilot layout** | `app/(copilot)/layout.tsx` | **DONE** — intentional chrome-free layout (comment in file) |
| DC-L08 | **Organization tenants page** | `organization-tenants-panel.tsx` | Migrated to `ListPage` with loading/error | **DONE** |
| DC-L09 | **Settings hub** | `app/(settings)/settings/page.tsx` | Uses `PageHeader` + card grid | **DONE** |
| DC-L10 | **Patient list subsections** | `patient/appointments/page.tsx` | **DONE** — `dashboard-page` + scoped `section h2` styles |
| DC-L11 | **Marketing vs app chrome** | `(marketing)`, `(auth)` | **DONE** — comment in marketing `layout.tsx`; separate chrome is intentional |
| DC-L12 | **Page vertical rhythm** | `.dashboard-page { gap: var(--section-spacing) }` | **DONE** — expanded to patient lists, search, admin revenue, placeholders |

**Reference files:** `components/navigation/PortalNavigationShell.tsx`, `components/navigation/Sidebar.tsx`, `styles/tokens.css`, `styles/dashboard-global.css`

---

## 2. Page scaffolding (headers, lists, CRUD)

| ID | Item | Pattern A (preferred) | Pattern B (inconsistent) | Status |
|----|------|----------------------|--------------------------|--------|
| DC-P01 | **List pages** | `ListPage` + `PageHeader` + table component | Clinic, staff, therapist, super-admin, user, settings, org on `ListPage` | **DONE** |
| DC-P02 | **Page titles** | `PageHeader` / `.page-header` CSS | Legacy `h1` on `/dashboard`, `/admin/revenue`, clinic search migrated | **DONE** — auth/checkout/marketing/blog keep bespoke titles |
| DC-P03 | **Create CTAs** | `ListPage` `action` prop: `Button asChild` + `Link` | Pharmacy prescriptions CTA moved to `ListPage` | **DONE** |
| DC-P04 | **Back navigation** | `Button asChild variant="ghost"` + `Link` | `AiAdminSectionNav` uses `Button asChild` + `Link` tabs | **DONE** |
| DC-P05 | **Loading / error** | `PageLoading`, `PageError` from `patient-portal/page-state.tsx` | Analytics dashboards use `ListPage`/`PageError` + `FormErrorBanner` | **DONE** |
| DC-P06 | **Card primitive on dashboards** | Pick one: `ui/card` (shared-ui) OR `dashboard/Card` (CSS) | Both used; super-admin settings uses `dashboard/Card` | **DEFERRED** — low risk; migrate incrementally |
| DC-P07 | **CRUD create/edit** | `PageHeader` + form component + consistent field wrapper | Tenant/staff forms use `tenant-create-form-*` classes | **DEFERRED** — forms work; class rename is cosmetic |
| DC-P08 | **Placeholder pages** | `dashboard-placeholder.tsx` uses `PageHeader` | **DONE** |

**CRUD coverage (audit):**

| Portal | List | Create | Edit | Notes |
|--------|------|--------|------|-------|
| Clinic | `ListPage` ✓ | `PageHeader` + form ✓ | ✓ | Reference implementation |
| Staff | `ListPage` ✓ | — | detail only | Read-heavy by design |
| Therapist | `ListPage` ✓ | notes create ✓ | — | |
| Patient | `ListPage` ✓ | — | — | Read-only |
| Pharmacy | `ListPage` ✓ | `ListPage` action CTA ✓ | — | DC-P03 **DONE** |
| Organization | `ListPage` ✓ | assign form | — | DC-L08 **DONE** |
| Super-admin | `ListPage` ✓ | ✓ | ✓ | |
| User | `ListPage` ✓ | — | — | DC-P01 **DONE** |
| Settings | `PageHeader` / `ListPage` ✓ | — | — | DC-P01 **DONE** |

---

## 3. Icons & sidebar navigation

| ID | Item | Issue | Status |
|----|------|-------|--------|
| DC-I01 | **Icon library** | Lucide via `@ordella/shared-icons` / `NavIcon.tsx` — all unified portals use this | **DONE** |
| DC-I02 | **User portal nav** | `NavIcon` + `NavItem` via shared `Sidebar` | **DONE** |
| DC-I03 | **Legacy portal nav** | `createNavConfigFromLinks` resolves icons by href/label | **DONE** |
| DC-I04 | **Icon reuse / ambiguity** | Clinic Therapists → `therapist` (Stethoscope); Staff → `staff` (UserCog) | **DONE** |
| DC-I05 | **Label drift** | Therapist labels unified in `portal-navigation.ts` (`Today's Appointments`) | **DONE** |
| DC-I06 | **Clinic nav completeness** | Clinic/staff/therapist now use full `portal-navigation` sections | **DONE** |
| DC-I07 | **Marketing icons** | Contact page uses Lucide `Mail`, `MapPin`, `Clock` via `ContactDetail` | **DONE** |
| DC-I08 | **Notification area icons** | `NotificationLauncher` — `Bell` icon button + `aria-label`; modal “View all” labeled | **DONE** |
| DC-I09 | **Action icons in tables** | `TableRowActions` on clinic, super-admin, AI, automation, and patient list tables | **DONE** |

**Reference:** `components/navigation/NavIcon.tsx`, `lib/portal-navigation.ts`, `components/ui/table-row-actions.tsx`

---

## 4. Forms, inputs, labels, validation

| ID | Item | Current state | Target | Status |
|----|------|---------------|--------|--------|
| DC-F01 | **Form field wrapper** | `FormFieldError` / `FormErrorBanner` in `components/ui/form-feedback.tsx` | Adopt `FormField` shared-ui in new forms | **DONE** (helpers) |
| DC-F02 | **Error CSS: auth** | `styles/form-feedback.css` + auth components use `Form*Banner` | Shared destructive token | **DONE** |
| DC-F03 | **Error CSS: tenant/super-admin** | Renamed to `form-field-error` / `form-error-banner` app-wide | Single class | **DONE** |
| DC-F04 | **Error CSS: appointments** | `form-field-error`, `form-error-banner` + unified CSS | Merge with DC-F03 | **DONE** |
| DC-F05 | **Error CSS: Tailwind inline** | Remaining `text-destructive` only for semantic metrics (failed counts, invoice status colors) | `form-field-error` for validation | **DONE** |
| DC-F06 | **Native `<select>`** | `LoginForm`, some tenant forms use `auth-select` | Prefer `ui/select` (Radix) | **DEFERRED** |
| DC-F07 | **Validation library** | Hand-rolled `validate()` per form | Consider shared zod schemas + consistent messages | **DEFERRED** |

### Auth & permission messages

| ID | Item | Path | Status |
|----|------|------|--------|
| DC-A01 | Login reason banners | `lib/auth-ui-messages.ts` — clearer copy + `access-denied` reason | Review copy for clarity | **DONE** |
| DC-A02 | API error surfacing | `getApiErrorMessage()` + expanded `auth-error-messages.ts` (rate limit) | User-friendly, non-technical | **DONE** |
| DC-A03 | Access denied page | `app/access-denied/page.tsx` — buttons, shared copy, login link | Context + navigation | **DONE** |

---

## 5. Modals & dropdowns

| ID | Item | Paths | Issue | Status |
|----|------|-------|-------|--------|
| DC-M01 | **Modal source** | `ui/modal.tsx` → `@ordella/shared-ui` | Standard | **DONE** |
| DC-M02 | **Confirm patterns** | `clinic-ui/confirm-dialog.tsx` (`ConfirmDialog`, `FormDialog`) | Status/delete confirms migrated; invoice pay/void keeps `Modal` for extra fields | **DONE** |
| DC-M03 | **Feature modals inventory** | `UpgradeModal`, `SaveReportModal`, `TestDeliveryModal`, `ai-preview-modal` | Shared `Modal` shell, `py-4` body, cancel-left footer | **DONE** |
| DC-M04 | **Dropdown menu** | `ui/dropdown.tsx` — `href` renders `Link` | Topbar uses `onSelect` + router; `href` documented for nav-only | **DONE** |

---

## 6. Actions — links vs icon buttons

| ID | Rule | Violations / notes | Status |
|----|------|-------------------|--------|
| DC-B01 | Primary navigation CTA | `Button asChild` + `Link` on list pages (patients, users, pharmacy, workflows, etc.) | **DONE** |
| DC-B02 | Row actions (edit/delete) | Icon `Button` with `aria-label` via `table-row-actions.tsx` | **DONE** |
| DC-B03 | Secondary auth links | `Link` + underline OK for forgot password | **DONE** |
| DC-B04 | AI sub-nav tabs | `AiAdminShell` + `AiAdminSectionNav` use `Button` tab pattern | **DONE** |
| DC-B05 | Dropdown destructive actions | `dropdown.tsx` destructive items use `focus:bg-destructive/10` | **DONE** |

---

## 7. Currency, country, language defaults

**Target:** EUR · Ireland (IE) · English (en-IE) · Europe/Dublin

| ID | File | Current | Target | Status |
|----|------|---------|--------|--------|
| DC-C01–C15 | See Phase 1 | EUR · IE · en-IE · Dublin | Platform defaults | **DONE** |

---

## 8. Responsiveness

| ID | Item | Issue | Status |
|----|------|-------|--------|
| DC-R01 | User portal padding | User shell uses `.dashboard-content` padding tokens | **DONE** |
| DC-R02 | Sidebar collapse | User portal uses shared `Sidebar` + `useUiStore` collapse | **DONE** |
| DC-R03 | Tables on mobile | Horizontal scroll via `dashboard-table-wrap` on `DashboardTable` + portal CSS | **DONE** |

---

## 9. Fix phases (recommended order)

| Phase | Focus | IDs | Rationale |
|-------|-------|-----|-----------|
| **1** | Defaults (EUR/IE/en-IE) | DC-C01–C08, C12–C15 | **DONE** (2026-06-23) |
| **2** | Form/validation CSS unify | DC-F01–F05, DC-A01–A03 | **DONE** (2026-06-23) |
| **3** | Page scaffolding | DC-P01–P02, DC-L08–L09 | **DONE** (2026-06-23) |
| **4** | Navigation unification | DC-L01–L02, DC-I01–I06 | **DONE** (2026-06-23) |
| **5** | Icons & action buttons | DC-I07–I09, DC-B02, DC-B04–B05 | **DONE** (2026-06-23) |
| **6** | Modals & responsiveness | DC-M02–M04, DC-R03 | **DONE** (2026-06-23) |
| **7** | Tracker closure | Remaining OPEN items | **DONE** (2026-06-23) |

---

## Changelog

| Date | Change |
|------|--------|
| 2026-06-23 | **Tracker closure** — DC-F05, layout/docs, pharmacy CTA, PageHeader migrations, therapist/staff nav icons; manual spot-check (public + 375px login) |
| 2026-06-23 | **Phase 6 complete** — `ConfirmDialog` migration, `UpgradeModal` on shared Modal, table mobile scroll, Topbar dropdown `onSelect` |
| 2026-06-23 | **Phase 5 complete** — `table-row-actions`, AI `AiAdminSectionNav`, marketing Lucide icons |
| 2026-06-23 | **Phase 4 complete** — unified `PortalNavigationShell`/`Sidebar` |
| 2026-06-23 | **Phase 3 complete** — `ListPage`/`PageHeader` on user portal, settings, org |
| 2026-06-23 | **Phase 2 complete** — `form-feedback.css`, auth copy, bulk class migration |
| 2026-06-23 | **Phase 1 complete** — EUR/IE/en-IE defaults |
| 2026-06-23 | **Audit pass 1** — Initial inventory; 62 tracked items |

---

## Probe / manual verify (post-fix)

Spot-check on `http://localhost:3010` (2026-06-23):

- [x] **Login** — form renders; auth copy + field labels OK (`/login`)
- [x] **Access denied** — title, reason copy, Return home link (`/access-denied?reason=forbidden`)
- [x] **Mobile 375px** — login page layout usable; marketing nav collapses to header pattern (CDP emulation)
- [ ] **Clinic dashboard + patients list/create/edit** — requires authenticated session (use `clinicadmin@ordella.dev` per `manual-system-test-tracker.md`)
- [ ] **Therapist + staff portals** — requires role login
- [ ] **Patient + pharmacy portals** — requires role login
- [ ] **Organization + super-admin** — requires role login
- [ ] **Settings + user portal** — requires login
- [ ] **Checkout** — spot-check billing country IE default
- [ ] **Confirm delete modal + profile dropdown** — requires clinic session

**Note:** Authenticated portal checks were not automated (credential entry blocked in browser tooling). Run the unchecked items locally with seeded users from `docs/manual-system-test-tracker.md`.

---

## Deferred backlog (optional future)

| ID | Item | Reason |
|----|------|--------|
| DC-F06 | Native `<select>` → Radix `Select` | Works today; migrate when touching those forms |
| DC-F07 | Shared zod validation | Large refactor; no user-facing bug |
| DC-P06 | Single card primitive | Both patterns stable; pick one during next dashboard refactor |
| DC-P07 | Unify tenant form CSS classes | Cosmetic rename only |
