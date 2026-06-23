# Ordella Physio — Design & UX Consistency Tracker

> **Started:** 2026-06-23  
> **Scope:** `apps/frontend-web` — all portals, CRUD pages, modals, forms, navigation, defaults  
> **Goal:** Consistent layout/spacing, meaningful icons, icon buttons over text links where appropriate, user-friendly validation/auth messages, defaults **EUR / Ireland / English (en-IE)**  
> **Status key:** `OPEN` · `IN PROGRESS` · `DONE` · `WON'T FIX` (with reason) · `DEFERRED`

---

## Summary (audit pass 1)

| Area | Open | Done | Notes |
|------|------|------|-------|
| Layout & spacing | 6 | 6 | Single `Sidebar` shell; user portal unified |
| Page scaffolding | 4 | 4 | **Phase 3** — settings/user/org on `ListPage`/`PageHeader` |
| Icons & navigation | 0 | 9 | **Phase 5 complete** |
| Forms & validation | 2 | 5 | **Phase 2** — unified `form-feedback`; DC-F05 partial |
| Modals & dropdowns | 4 | 0 | Mixed Modal wrappers |
| Actions (link vs button) | 1 | 4 | Row actions standardized; DC-B01 verify on CRUD create CTAs |
| Currency / locale / country | 1 | 12 | **Phase 1 complete** (2026-06-23) |
| Responsiveness | 3 | 0 | User portal padding differs |
| Auth messages | 0 | 3 | **Phase 2 complete** — `auth-ui-messages`, access-denied |

**Platform target defaults:** `currency: EUR` · `country: IE (Ireland)` · `locale: en-IE` · `timezone: Europe/Dublin` (where tenant not set)

**Already aligned (partial):** `lib/platform-formatting.ts` (EUR + en-IE), `SettingsForm` default EUR, checkout `billingCountry: IE`, `lib/pricing-plans.ts` en-IE/EUR, `lib/onboarding-default-config.ts` Ireland VAT.

---

## 1. Layout & shell consistency

| ID | Item | Portals / paths | Issue | Status |
|----|------|-----------------|-------|--------|
| DC-L01 | **Dual navigation systems** | All portals now use `PortalNavigationShell` + `Sidebar` + `portal-navigation.ts` | **DONE** — `AppLayout` removed |
| DC-L02 | **Triple nav config files** | `nav-config.ts` and `sidebar-config.ts` removed; `portal-navigation.ts` is canonical | **DONE** |
| DC-L03 | **User portal custom shell** | `user-portal-shell.tsx` delegates to `PortalNavigationShell` with `NavIcon` sidebar | **DONE** |
| DC-L04 | **Legacy route shells** | `createNavConfigFromLinks` maps meaningful icons by href/label | **PARTIAL** — still legacy shell |
| DC-L05 | **Content padding token** | `.dashboard-content` in `styles/navigation.css` | User portal now uses `dashboard-content`; settings/org panels dropped `space-y-6` wrappers | **PARTIAL** |
| DC-L06 | **Super-admin visual variant** | `super-admin-portal` class in `styles/navigation.css` | Intentional tone difference — document as design token, ensure spacing still matches | OPEN |
| DC-L07 | **Copilot layout** | `app/(copilot)/layout.tsx` | Bare `min-h-screen` — no nav; confirm intentional | OPEN |
| DC-L08 | **Organization tenants page** | `organization-tenants-panel.tsx` | Migrated to `ListPage` with loading/error | **DONE** |
| DC-L09 | **Settings hub** | `app/(settings)/settings/page.tsx` | Uses `PageHeader` + card grid | **DONE** |
| DC-L10 | **Patient list subsections** | `patient/appointments/page.tsx` | Inline `<section><h2>` inside `ListPage` — differs from clinic list pattern | OPEN |
| DC-L11 | **Marketing vs app chrome** | `(marketing)`, `(auth)` | Separate `Navbar`/`Footer` — OK; ensure spacing tokens documented | OPEN |
| DC-L12 | **Page vertical rhythm** | `.dashboard-page { gap: var(--section-spacing) }` | User portal + settings/org profile pages use `dashboard-page` rhythm | **PARTIAL** — legacy routes still on Tailwind |

**Reference files:** `components/navigation/PortalNavigationShell.tsx`, `components/navigation/Sidebar.tsx`, `styles/tokens.css`, `styles/dashboard-global.css`

---

## 2. Page scaffolding (headers, lists, CRUD)

| ID | Item | Pattern A (preferred) | Pattern B (inconsistent) | Status |
|----|------|----------------------|--------------------------|--------|
| DC-P01 | **List pages** | `ListPage` + `PageHeader` + table component | User portal list pages, settings AI/providers, org tenants migrated | **PARTIAL** — other portals unchanged |
| DC-P02 | **Page titles** | `PageHeader` / `.page-header` CSS | Settings hub, clinic, search, user portal pages migrated | **PARTIAL** — ~20 legacy pages remain |
| DC-P03 | **Create CTAs** | `ListPage` `action` prop: `Button asChild` + `Link` | Pharmacy: CTA inside `prescription-list.tsx` | OPEN |
| DC-P04 | **Back navigation** | `Button asChild variant="ghost"` + `Link` | AI admin sub-nav: text `Link` only (`ai-admin-nav-link`) | OPEN |
| DC-P05 | **Loading / error** | `PageLoading`, `PageError` from `patient-portal/page-state.tsx` | Some pages inline spinners or custom messages | OPEN |
| DC-P06 | **Card primitive on dashboards** | Pick one: `ui/card` (shared-ui) OR `dashboard/Card` (CSS) | Both used; super-admin settings uses `dashboard/Card` | OPEN |
| DC-P07 | **CRUD create/edit** | `PageHeader` + form component + consistent field wrapper | Tenant/staff forms use `tenant-create-form-*` classes | OPEN |
| DC-P08 | **Placeholder pages** | `dashboard-placeholder.tsx` uses Tailwind h1 | Should use `PageHeader` for consistency | OPEN |

**CRUD coverage (audit):**

| Portal | List | Create | Edit | Notes |
|--------|------|--------|------|-------|
| Clinic | `ListPage` ✓ | `PageHeader` + form ✓ | ✓ | Reference implementation |
| Staff | `ListPage` ✓ | — | detail only | Read-heavy by design |
| Therapist | `ListPage` ✓ | notes create ✓ | — | |
| Patient | `ListPage` partial | — | — | Read-only |
| Pharmacy | `ListPage` ✓ | in list component | — | DC-P03 |
| Organization | `ListPage` ✓ | assign form | — | DC-L08 **DONE** |
| Super-admin | `ListPage` ✓ | ✓ | ✓ | |
| User | `ListPage` ✓ | — | — | DC-P01 **DONE** (this portal) |
| Settings | `PageHeader` / `ListPage` ✓ | — | — | DC-P01 **DONE** (this area) |

---

## 3. Icons & sidebar navigation

| ID | Item | Issue | Status |
|----|------|-------|--------|
| DC-I01 | **Icon library** | Lucide via `@ordella/shared-icons` / `NavIcon.tsx` — all unified portals use this | **DONE** (documented in tracker) |
| DC-I02 | **User portal nav** | `NavIcon` + `NavItem` via shared `Sidebar` | **DONE** |
| DC-I03 | **Legacy portal nav** | `createNavConfigFromLinks` resolves icons by href/label | **PARTIAL** — legacy routes only |
| DC-I04 | **Icon reuse / ambiguity** | Roles → `settings`, Terminals → `system`, Pharmacy → `inventory` | **PARTIAL** — Therapists/Staff/Users still share `users` |
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
| DC-F05 | **Error CSS: Tailwind inline** | Checkout + auth migrated; some `text-destructive` in dashboards remain | `form-field-error` everywhere | **IN PROGRESS** |
| DC-F06 | **Native `<select>`** | `LoginForm`, some tenant forms use `auth-select` | Prefer `ui/select` (Radix) | OPEN |
| DC-F07 | **Validation library** | Hand-rolled `validate()` per form | Consider shared zod schemas + consistent messages | DEFERRED |

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
| DC-M01 | **Modal source** | `ui/modal.tsx` → `@ordella/shared-ui` | Standard | DONE |
| DC-M02 | **Confirm patterns** | `clinic-ui/confirm-dialog.tsx` (`ConfirmDialog`, `FormDialog`) | Status/delete confirms migrated; invoice pay/void keeps `Modal` for extra fields | **DONE** |
| DC-M03 | **Feature modals inventory** | `UpgradeModal`, `SaveReportModal`, `TestDeliveryModal`, `ai-preview-modal` | Shared `Modal` shell, `py-4` body, cancel-left footer | **DONE** |
| DC-M04 | **Dropdown menu** | `ui/dropdown.tsx` — `href` renders `Link` | Topbar uses `onSelect` + router; `href` documented for nav-only | **DONE** |

---

## 6. Actions — links vs icon buttons

| ID | Rule | Violations / notes | Status |
|----|------|-------------------|--------|
| DC-B01 | Primary navigation CTA | `Button asChild` + `Link` | Generally followed on list pages | OPEN (verify all CRUD) |
| DC-B02 | Row actions (edit/delete) | Icon `Button` with `aria-label` via `table-row-actions.tsx` | **DONE** |
| DC-B03 | Secondary auth links | `Link` + underline OK for forgot password | OK | DONE |
| DC-B04 | AI sub-nav tabs | `AiAdminShell` + `AiAdminSectionNav` use `Button` tab pattern | **DONE** |
| DC-B05 | Dropdown destructive actions | `dropdown.tsx` destructive items use `focus:bg-destructive/10` | **DONE** |

---

## 7. Currency, country, language defaults

**Target:** EUR · Ireland (IE) · English (en-IE) · Europe/Dublin

| ID | File | Current | Target | Status |
|----|------|---------|--------|--------|
| DC-C01 | `lib/formatting.ts` | `DEFAULT_LOCALIZATION`: EUR, `Europe/Dublin`, `DD/MM/YYYY`, `EU`, `en-IE` | EUR · IE · en-IE | **DONE** |
| DC-C02 | `components/tenants/TenantCreateForm.tsx` | `useState(PLATFORM_FALLBACK_CURRENCY)` + `PLATFORM_DEFAULT_TIMEZONE` | EUR | **DONE** |
| DC-C03 | `components/tenants/TenantBillingForm.tsx` | fallback `PLATFORM_FALLBACK_CURRENCY`; country `IE` | EUR · IE | **DONE** |
| DC-C04 | `components/provisioning/FullProvisioningWizard.tsx` | EUR + `Europe/Dublin` defaults | EUR | **DONE** |
| DC-C05 | `components/dashboard/widgets/Revenue.tsx` | `formatPlatformCurrency` | EUR | **DONE** |
| DC-C06 | `components/dashboard/widgets/RevenueByStatusChart.tsx` | `formatPlatformCurrency` | EUR | **DONE** |
| DC-C07 | `components/reports/revenue/RevenueReportTable.tsx` | `formatPlatformCurrency` | EUR | **DONE** |
| DC-C08 | `lib/super-admin-portal-api.ts` | directory map fallback EUR + `Europe/Dublin` | EUR | **DONE** |
| DC-C09 | `lib/platform-formatting.ts` | EUR + en-IE | Reference implementation | DONE |
| DC-C10 | `components/super-admin/settings/SettingsForm.tsx` | default EUR | OK | DONE |
| DC-C11 | `app/(auth)/checkout/page.tsx` | `billingCountry: "IE"` | OK | DONE |
| DC-C12 | `lib/tenant-form-options.ts` | EUR first; Ireland first; `Europe/Dublin` first timezone | EUR · IE | **DONE** |
| DC-C13 | Tenant seed `demo-tenant` | `services/tenant-service/prisma/seed.ts` → EUR, Dublin | EUR · IE | **DONE** |
| DC-C14 | `lib/tenant-billing-form-options.ts` | Ireland first in billing country list | IE | **DONE** |
| DC-C15 | `lib/platform-formatting.ts` | `formatPlatformCurrency`, `PLATFORM_DEFAULT_*` constants | Shared helpers | **DONE** |

---

## 8. Responsiveness

| ID | Item | Issue | Status |
|----|------|-------|--------|
| DC-R01 | User portal padding | `p-4 sm:p-6` vs dashboard 24px token | User shell now uses `.dashboard-content` padding tokens | **DONE** |
| DC-R02 | Sidebar collapse | User portal now uses shared `Sidebar` + `useUiStore` collapse | **DONE** |
| DC-R03 | Tables on mobile | Horizontal scroll via `dashboard-table-wrap` on `DashboardTable` + portal CSS | **DONE** |

---

## 9. Fix phases (recommended order)

| Phase | Focus | IDs | Rationale |
|-------|-------|-----|-----------|
| **1** | Defaults (EUR/IE/en-IE) | DC-C01–C08, C12–C15 | **DONE** (2026-06-23) |
| **2** | Form/validation CSS unify | DC-F01–F05, DC-A01–A03 | **DONE** (2026-06-23); DC-F05 partial — dashboard `text-destructive` remains |
| **3** | Page scaffolding | DC-P01–P02, DC-L08–L09 | **DONE** (2026-06-23) — settings/user/org; `.portal-page` CSS scope |
| **4** | Navigation unification | DC-L01–L02, DC-I01–I06 | **DONE** (2026-06-23) — single `Sidebar` + `portal-navigation.ts` |
| **5** | Icons & action buttons | DC-I07–I09, DC-B02, DC-B04–B05 | **DONE** (2026-06-23) — shared table actions + AI tab nav |
| **6** | Modals & responsiveness | DC-M02–M04, DC-R03 | **DONE** (2026-06-23) |

---

## Changelog

| Date | Change |
|------|--------|
| 2026-06-23 | **Phase 6 complete** — `ConfirmDialog` migration, `UpgradeModal` on shared Modal, table mobile scroll, Topbar dropdown `onSelect` |
| 2026-06-23 | **Phase 5 follow-up** — remaining AI/automation/patient/billing table row actions migrated; extended `table-row-actions` icons |
| 2026-06-23 | **Phase 5 complete** — `table-row-actions`, AI `AiAdminSectionNav`, marketing Lucide icons, dropdown destructive focus |
| 2026-06-23 | **Phase 4 complete** — unified `PortalNavigationShell`/`Sidebar`; removed `AppLayout`, `nav-config`, `sidebar-config`; user portal + clinic full nav |
| 2026-06-23 | **Phase 3 complete** — `ListPage`/`PageHeader` on user portal, settings, org; `portal-page` CSS; user shell padding |
| 2026-06-23 | **Phase 2 complete** — `form-feedback.css`, `FormFieldError`/`FormErrorBanner`, auth copy, access-denied, bulk class migration |
| 2026-06-23 | **Phase 1 complete** — EUR/IE/en-IE defaults across formatting, forms, widgets, demo seed |
| 2026-06-23 | **Audit pass 1** — Initial inventory across all portals; 62 tracked items; 4 partial DONE |

---

## Probe / manual verify (post-fix)

After each phase, spot-check:

- [ ] Clinic dashboard + patients list/create/edit
- [ ] Therapist + staff portals (sidebar, list spacing)
- [ ] Patient + pharmacy portals
- [ ] Organization + super-admin
- [ ] Settings + user portal
- [ ] Login / checkout / access-denied messages
- [ ] One modal (confirm delete) + one dropdown (profile menu)
- [ ] Mobile width 375px — sidebar + table overflow
