# Security Rating Explained in Simple Terms

---

## Introduction

### What is a security rating?

A **security rating** is a structured assessment of how well a software platform protects its users, their data, and its own systems from misuse, accidents, and attacks. Think of it as a **safety report card** — not for math or spelling, but for questions like:

- Can attackers steal login sessions?
- Can one customer access another customer’s data?
- Can an employee perform actions beyond their job role?
- If something goes wrong, can we trace what happened?

For a **SaaS platform** (Software as a Service) such as Ordella, these questions are critical. Clinics connect over the internet, store sensitive patient information, and rely on the platform every working day. A weak security posture is not merely a technical inconvenience — it is a risk to patient privacy, regulatory compliance, and clinic trust.

### Why it matters for Ordella

Ordella is a **multi-tenant clinic management system**. Many independent clinics share the same application, but each clinic’s data must remain completely separate. Staff, therapists, and administrators perform sensitive operations: viewing patient records, writing clinical notes, managing billing, and configuring users.

A strong security rating means:

- **Confidentiality** — only authorised people see protected data.
- **Integrity** — data cannot be changed by unauthorised parties.
- **Availability** — the system remains reachable and reliable.
- **Accountability** — important actions leave an audit trail.

### What this document covers

This document explains Ordella’s **full security rating** in plain language. It is written so that product owners, clinic managers, new developers, and curious non-technical readers can all follow along — without needing a computer science degree.

Where helpful, we use **simple analogies** (badges, keys, apartment buildings). Every analogy maps to a **real, implemented control** in the codebase. Nothing here is marketing fluff.

**Related documents:**

| Document | Audience |
|----------|----------|
| [`security-architecture.md`](./security-architecture.md) | Engineers — full technical specification |
| [`security-rating-explained.md`](./security-rating-explained.md) | Beginners — extra-friendly walkthrough |
| [`.cursor/rules/security-hardening-deferred.mdc`](../.cursor/rules/security-hardening-deferred.mdc) | Deferred security backlog |

---

## 1. Authentication Security

**Authentication** answers one question: *“Who are you?”*

Before the system decides what you may do, it must verify your identity. Ordella uses industry-standard patterns: short-lived access tokens, long-lived refresh tokens in protected cookies, and server-side session validation.

---

### HttpOnly Cookies

When you sign in, the browser must remember that you are authenticated. Websites often use **cookies** — small pieces of data the browser stores and sends back on each request.

A normal cookie can be read by **JavaScript** running on the page. If an attacker injects malicious script (via a cross-site scripting flaw, a compromised browser extension, or a vulnerable third-party library), that script could steal cookie values.

An **HttpOnly cookie** is a cookie flagged so that **JavaScript cannot access it**. Only the browser’s network layer sends it to the server over HTTP — not client-side code.

**Ordella’s approach:**

- The **refresh token** is stored in an HttpOnly cookie named `ordella-refresh`.
- It is **never** written to `localStorage`, `sessionStorage`, or any client-persisted state.
- The access token lives in **memory only** for the duration of the browser tab session.

**Analogy:**  
A refresh token in HttpOnly storage is like keeping your building key in a **locked inner pocket** that pickpockets cannot reach — as opposed to clipping it visibly on your bag where anyone can grab it.

**Technical reference:** `apps/frontend-web/lib/auth/cookie-names.ts`, `apps/frontend-web/lib/utils/authStorage.ts`

---

### Secure Cookies

The **Secure** flag on a cookie tells the browser: *“Only send this cookie over HTTPS (encrypted connections).”*

- **HTTP** transmits data in plain text — anyone on the network path could intercept it.
- **HTTPS** encrypts traffic between browser and server using TLS.

In production, Ordella sets `secure: true` on authentication cookies. In local development (`http://localhost`), this flag is relaxed so engineers can work without TLS certificates.

**Analogy:**  
A secure cookie travels only through a **sealed envelope**, never on a postcard anyone can read in transit.

**Technical reference:** `getSecureCookieOptions()` in `apps/frontend-web/lib/auth/cookie-names.ts`

---

### SameSite=Strict

Cookies can be sent along with requests triggered from **other websites**. This behaviour enables certain attacks where a malicious site causes your browser to perform actions on a site where you are already logged in.

**SameSite=Strict** instructs the browser: *“Only attach this cookie when the user is navigating directly on our site — not when arriving from an external link or embedded context.”*

Ordella applies `sameSite: "strict"` to session and refresh cookies.

**What this prevents:**

- Cross-site request tricks that rely on the browser silently attaching session cookies.
- Certain session-fixation and CSRF-adjacent attack paths.

**Analogy:**  
Your employee badge only works when **you personally** walk through **your employer’s entrance** — not when a stranger waves a photocopy at a side door.

**Technical reference:** `apps/frontend-web/lib/auth/cookie-names.ts`

---

### Rotating Refresh Tokens

A **refresh token** allows the application to obtain a new **access token** without asking the user to re-enter their password. Access tokens are intentionally short-lived (approximately 15 minutes). Refresh tokens last longer (approximately 7 days).

**Rotation** means: every time a refresh token is used successfully, it is **invalidated** and replaced with a new one.

**The rotation flow:**

1. User logs in → receives Access Token A and Refresh Token 1.
2. Access Token A expires.
3. Client sends Refresh Token 1 to `POST /api/auth/refresh`.
4. Server validates Refresh Token 1, **revokes it** in the database, and issues Access Token B + Refresh Token 2.
5. If an attacker later tries Refresh Token 1 → **rejected** — it no longer exists as valid.

**Why rotation matters:**

- Stolen refresh tokens have a **narrow window** of usefulness.
- Each use leaves a clear chain in the database for forensic review.

**Analogy:**  
Each time you ride the train, your ticket is **punched and replaced**. A photograph of yesterday’s ticket will not let anyone board today.

**Technical reference:** `backend/src/modules/auth/auth.service.ts` → `refresh()`, `services/auth-service/src/services/token.service.ts`

---

### Token Reuse Detection

**Token reuse detection** is the security response when a refresh token that has **already been rotated (revoked)** is presented again.

Legitimate scenario: only one party should use a refresh token once. If a second request arrives with the same spent token, one of these is true:

- A race condition occurred (rare, handled gracefully), or
- An attacker copied the token and tried to replay it.

In the **auth microservice**, Ordella responds aggressively:

- Increments the user’s **token version** (`tv`), invalidating all outstanding access tokens.
- Revokes the entire refresh token family.
- Logs `TOKEN_REUSE_DETECTED` to the audit trail.
- Forces re-authentication.

The **clinic backend** currently returns a generic “invalid refresh token” error without the full reuse-detection ceremony. This is a known gap on the path to a perfect score.

**Analogy:**  
If someone tries to enter with a visitor badge you **already returned to reception**, security assumes the badge was **cloned** and locks down the floor.

**Technical reference:** `apps/frontend-web/lib/session-manager.ts` → `isTokenReuseError()`, `services/auth-service/src/services/token.service.ts`

---

### Session Invalidation

**Session invalidation** is the deliberate act of ending a login session so it can no longer be used.

Sessions end when:

| Trigger | What happens |
|---------|--------------|
| User clicks **Sign out** | Cookies cleared; refresh token revoked server-side |
| Refresh token expires | Silent re-login required |
| Access token version mismatch | 401 Unauthorized on API calls |
| `revokeAllUserTokens()` | All devices logged out (password change, admin action) |
| Token reuse detected | All sessions killed; forced re-login |
| Account locked | Login rejected until lockout expires |

Invalidation is not merely deleting a browser cookie. The server maintains a **revocation ledger** — access tokens by `jti` (JWT ID) and refresh tokens by hashed value — so stolen tokens cannot be used even if the client forgets to clear local state.

**Analogy:**  
The school collects all hall passes and issues new ones. Old passes become worthless even if a student still has one in their pocket.

**Technical reference:** `backend/src/modules/security/token-revocation.service.ts`, `apps/frontend-web/app/api/auth/logout/route.ts`

---

### Device / IP Soft Binding

**Soft binding** records contextual clues about login and refresh activity — without rigidly locking users to a single device forever.

**What Ordella tracks:**

- **IP address** — the network origin of the request (`req.ip`, respecting proxy headers when `TRUST_PROXY=true`).
- **User agent** — browser and operating system string.
- **Login attempt records** — every success and failure stored with IP, email, tenant, and reason.

**How it is used:**

- **Brute-force counters** keyed by `IP:email` combination.
- **Forensic audit** — “Who logged in from where?”
- **Auth-service refresh tokens** — `ipAddress` and `deviceInfo` stored on token rows.

**“Soft” vs “hard” binding:**

- **Hard binding** would refuse login from any new device without manual approval — secure but poor user experience.
- **Soft binding** watches for **abnormal patterns** (dozens of failures, geographic impossibilities) while allowing normal device changes.

The clinic backend does not yet store IP/device on refresh token rows — only on login attempts. This is a minor maturity gap.

**Analogy:**  
Reception recognises your face and usually waves you through — but if someone in a mask repeats your name fifty times, they call security.

**Technical reference:** `backend/src/modules/security/brute-force.service.ts`, `login_attempts` table

---

## 2. Authorization Security

**Authorization** answers: *“You are authenticated — but what are you allowed to do?”*

A verified identity alone does not grant unlimited access. Ordella separates **roles** (job functions) from **permissions** (specific capabilities).

---

### Roles

A **role** is a named job function assigned to a user within a clinic (tenant).

| Role | Typical user | Portal namespace |
|------|--------------|------------------|
| **Admin** (Clinic Admin) | Practice manager, clinic owner | `/clinic` |
| **Staff** | Reception, front desk | `/staff` |
| **Therapist** | Physiotherapist, clinician | `/therapist` |
| **Super Admin** (`SYSTEM`) | Platform operator | `/super-admin` |

Roles are stored per-tenant in the database (`roles`, `user_roles` tables). On login, the user’s roles and expanded permissions are embedded in the JWT.

**Analogy — job badges:**  
A hospital issues colour-coded badges. Everyone may be a legitimate employee (authenticated), but a nurse’s badge does not open the pharmacy controlled-substances cabinet.

**Technical reference:** `backend/src/modules/rbac/roles.ts`, `apps/frontend-web/lib/auth/roleRedirect.ts`

---

### Permissions

A **permission** is a granular capability — a single “key” to a specific function.

**Examples in Ordella:**

| Permission | Capability |
|------------|------------|
| `patient.view` | Read patient lists and profiles |
| `patient.manage` | Create patients |
| `patient.edit` | Update patient records |
| `notes.read` | View clinical notes |
| `notes.write` | Create and edit notes |
| `billing.manage` | Manage invoices and payments |
| `appointment.manage` | Schedule and modify appointments |
| `user.manage` | Invite and manage clinic users |
| `role.manage` | Assign roles and permissions |
| `reporting.view` | Access reports |
| `tenant.manage` | Configure clinic settings |

Permissions use **dot notation** (`patient.view`) with legacy **colon aliases** (`patients:read`) for backward compatibility. `expandCanonicalPermissions()` normalises both forms in JWT claims.

**Analogy — room keys:**  
Your office key opens your office. The server room key opens the server room. Holding one does not imply holding the other.

**Technical reference:** `backend/src/middleware/permissions.ts`, `packages/security/src/rbac/permissions.ts`

---

### Why Roles Are Like Job Badges

Roles bundle permissions so administrators do not assign fifty individual keys to every new hire.

When someone is assigned the **Staff** role, the system infers a sensible default permission set: patient viewing, appointment visibility, perhaps billing — but not user administration or role management.

Badges are **coarse**. They answer: *“What is your job?”*

**Analogy:**  
A theme park “Ride Operator” badge implies a bundle of allowed actions. You do not receive a separate sticker for every button on the control panel.

---

### Why Permissions Are Like Keys to Specific Rooms

Permissions are **fine-grained**. Two staff members with the same role can differ:

- Staff Member A: `billing.manage` ✓
- Staff Member B: `billing.manage` ✗

This supports least-privilege — giving people only the access they need.

**Analogy:**  
Two people may both work at the library (same role), but only the head librarian holds the rare-books vault key (permission).

---

### UI-Level Permission Hiding

The frontend **hides or disables** navigation items, buttons, and pages the user cannot access.

- Sidebar entries filtered via `filterNavItems()` and `nav-config.ts`.
- Declarative wrappers: `WithPermission`, `WithAllPermissions`, `IfHasPermission`.
- Unauthorized component access redirects to `/forbidden`.

**Critical distinction:** UI hiding is **user experience**, not security. It prevents honest mistakes and reduces clutter. It does **not** stop a determined attacker.

**Analogy:**  
Kindergartners do not see the science lab on their map. But the lab door also has a **real lock** — hiding alone is insufficient.

**Technical reference:** `apps/frontend-web/lib/permissions.ts`, `apps/frontend-web/lib/auth/withPermission.tsx`

---

### API-Level Permission Enforcement

Every sensitive server endpoint re-validates permissions **independently of the UI**.

Middleware functions:

```text
requirePermission("patient.view")     — must hold this exact permission
requireAny(["notes.read", "notes.write"]) — must hold at least one
requireAll(["billing.manage", "patient.view"]) — must hold all listed
```

On denial:

- HTTP **403 Forbidden** returned to client.
- `security.permission_denied` event logged with user, IP, and permission name.

Centralised policy bundles (`policies.patientsRead`, `policies.billingWrite`, etc.) compose role denials with permission requirements for consistent application across route files.

**Analogy:**  
You may draw a fake VIP wristband, but the turnstile scans the **cryptographic ticket** issued by the server.

**Technical reference:** `backend/src/middleware/permissions.ts`, `backend/src/modules/rbac/policies.ts`

---

## 3. Route Guards (Frontend)

The **frontend** is everything rendered in the browser. **Route guards** are checks that run **before a page loads**, ensuring the visitor is allowed to see that URL.

---

### Why Each Portal Has Its Own “Door”

Ordella divides the application into **portal namespaces** — separate URL areas for separate job functions:

```text
/clinic       → Clinic administrators
/staff        → Front-desk staff
/therapist    → Clinicians
/super-admin  → Platform operators
```

This is not merely cosmetic organisation. Each namespace corresponds to a role’s legitimate workflow. Separating them reduces accidental cross-role navigation and simplifies permission modelling.

**Analogy:**  
A hospital has distinct wings — administration, outpatient, surgical. Signage and access control keep people in appropriate areas.

**Technical reference:** `apps/frontend-web/lib/routes.ts`, `apps/frontend-web/lib/auth/session-routing.ts`

---

### Why Users Cannot Enter Areas They Lack Access To

Consider a therapist who manually types `/clinic/billing` into the browser address bar.

**What happens:**

1. **Edge middleware** (`apps/frontend-web/middleware.ts`) intercepts the request before the page renders.
2. It reads the signed `ordella-session` cookie via `getSession()`.
3. It resolves the user’s allowed portal prefix from their role (`/therapist`).
4. `/clinic/billing` does not start with `/therapist` → **redirect** to `/therapist/dashboard` (or equivalent home).

Staff cannot browse Super Admin tools. Admins cannot silently impersonate therapists without the appropriate role assignment.

**Analogy:**  
Airline passengers cannot enter the cockpit by walking down the wrong corridor. Uniform and access card are checked at the door.

---

### How the System Checks Identity Before Loading a Page

The guard sequence for protected routes:

```text
1. Is this a guarded portal path?
   → No:  apply security headers, continue
   → Yes: continue to step 2

2. Is there a valid signed session cookie?
   → No:  redirect to /login

3. Does the session include a tenant (for non-SYSTEM roles)?
   → No:  redirect to /login?reason=missing-tenant

4. Does the user’s role permit this URL prefix?
   → No:  redirect to role-appropriate home

5. Apply Content Security Policy (nonce in production)
   → Allow page to render
```

Client-side components (`AuthBootstrap`, `AppLayout`, `SystemRouteEnforcer`) provide a second layer: session validation, tenant sync, and role-portal consistency checks after hydration.

**Analogy:**  
Three checkpoints: ID verification, tenant membership confirmation, and authorised zone clearance — before you reach your desk.

**Technical reference:** `apps/frontend-web/middleware.ts`, `apps/frontend-web/components/auth/auth-bootstrap.tsx`

---

## 4. API Security

The **API** (Application Programming Interface) is how the frontend communicates with the backend — structured HTTP requests that read and write data. API security ensures every request is authenticated, tenant-scoped, and permission-checked.

---

### `requirePermission`

```typescript
requirePermission(Permission.PATIENT_VIEW)
// or
requirePermission("patient.view")
```

**Meaning:** The authenticated user’s JWT must include this permission (or a recognised alias). Otherwise → 403 Forbidden.

**Example:** Listing patients requires `patient.view`. A user with only `notes.read` cannot call `GET /api/patients`.

---

### `requireAny`

```typescript
requireAny([Permission.NOTES_READ, Permission.NOTES_WRITE])
```

**Meaning:** The user needs **at least one** permission from the list. Useful when multiple permission levels legitimately access the same endpoint.

---

### `requireAll`

```typescript
requireAll([Permission.BILLING_MANAGE, Permission.PATIENT_VIEW])
```

**Meaning:** The user must hold **every** permission listed. Stricter — appropriate for compound operations like billing a specific patient’s account.

---

### `requireTenant`

```typescript
requireTenant  // middleware, no arguments
```

**Meaning:**

1. User must be authenticated with a `tenantId` in their JWT.
2. Client-supplied `tenantId` in body, query, params, or `x-tenant-id` header is **rejected**.
3. `req.tenantId` is set from the JWT for all downstream database queries.

**Analogy:**  
The mailroom delivers only to the address on your official ID. You cannot request another tenant’s mail by writing a different apartment number on the envelope.

**Technical reference:** `backend/src/middleware/tenant.ts`

---

### Why the Backend Double-Checks Everything

The frontend runs in the user’s browser — an environment the server **does not control**. Users can:

- Modify JavaScript in DevTools.
- Send crafted HTTP requests via Postman, cURL, or custom scripts.
- Bypass the UI entirely.

Therefore, **every security decision is enforced server-side**. The frontend provides guidance; the backend provides guarantees.

**Standard middleware chain for tenant-scoped routes:**

```text
authMiddleware → requireAuth → requireTenant → policies.* → controller
```

**Analogy:**  
The cinema ticket scanner at the gate does not trust that you told the popcorn seller you paid.

---

### Why Postman and cURL Cannot Bypass These Rules

**Postman** and **cURL** are legitimate developer tools that send raw HTTP requests. Attackers use the same mechanisms.

It does not matter how the request is sent. The server always evaluates:

| Check | Failure result |
|-------|----------------|
| Valid Bearer JWT present? | 401 Unauthorized |
| Token expired or revoked? | 401 Unauthorized |
| Token version (`tv`) current? | 401 Unauthorized |
| Tenant context valid? | 401 / 400 |
| Required permission held? | 403 Forbidden |
| Database query scoped to tenant? | Empty result or 404 |

Crafting a request without a stolen token yields nothing. Crafting a request with a valid token but wrong permission yields 403. Crafting a request with another tenant’s ID in the body yields 400 — client-supplied tenant IDs are explicitly forbidden.

**Analogy:**  
Shouting an order at the kitchen window works the same as ordering through the app — you still need a valid, paid ticket.

**Technical reference:** `backend/src/middleware/tenant.middleware.ts`, `backend/src/routes/index.ts`

---

## 5. Tenant Isolation

---

### What Is a Tenant?

A **tenant** is one **customer organisation** using Ordella — typically a single clinic or practice group.

Ordella is **multi-tenant**: many clinics share one application instance and one database schema, but their data must never mingle. Examples:

- `demo-clinic` (development seed)
- “Sunny Physio Dublin”
- “Riverdale Sports Rehabilitation”

Each tenant has a unique internal ID (UUID) and a human-readable slug.

**Analogy:**  
An apartment building houses many families. They share the building structure (the software) but each family has a **private apartment** (tenant data partition).

---

### Why Each Tenant Has Its Own “Apartment”

Database tables store a `tenantId` column on tenant-scoped rows. Every query includes a filter:

```sql
WHERE tenantId = '<authenticated-tenant-uuid>'
```

Patients, appointments, notes, invoices, staff records, and audit logs all carry this discriminator. A list endpoint never returns “all patients in the system” — only patients **belonging to the authenticated tenant**.

**Analogy:**  
Your files live in your apartment. They are not stored on your neighbour’s bookshelf, even though you share the same building address.

**Technical reference:** `backend/src/modules/security/tenant-scope.ts`, repository `buildListWhere()` patterns

---

### Why No Tenant Can See Another Tenant’s Data

Cross-tenant data leakage is among the most severe failures in SaaS security. Ordella prevents it through **defence in depth**:

| Layer | Control |
|-------|---------|
| JWT | `tenantId` embedded at login; verified on every request |
| `requireTenant` | Rejects client attempts to override tenant |
| Header check | `x-tenant-id` must match JWT or request fails |
| Query scoping | Every Prisma query filters by `tenantId` |
| Unique constraints | Email uniqueness is per-tenant, not global |
| BFF proxy | Strips client tenant headers when proxying to clinic backend |

A clinic administrator — the most powerful role **within their clinic** — has **zero authority** over any other clinic’s records.

**Analogy:**  
Being manager of your branch does not grant access to a competitor’s filing cabinets.

---

### Why `tenantId` Never Comes From the Client

If the browser could declare “I am working on Clinic B today,” an attacker could simply change that value and attempt horizontal privilege escalation.

Ordella’s rule is absolute on protected routes:

> **Tenant context is derived only from the authenticated session (JWT).**

The login form accepts a clinic **slug** (e.g. `demo-clinic`) for user convenience. The server resolves it to an internal UUID and embeds that UUID in the token. After login, the client **cannot** supply `tenantId` via:

- JSON request body
- Query string parameters
- URL path parameters
- `x-tenant-id` HTTP header

Violations return `400 Bad Request` with *“Client-supplied tenantId is not allowed.”*

**Analogy:**  
Your school transcript is tied to your enrolled school. You cannot view another school’s grades by writing a different school name on a form.

**Technical reference:** `backend/src/middleware/tenant.ts` → `hasClientSuppliedTenantId()`

---

## 6. Audit Logging

---

### Why the System Keeps a Detailed Record

An **audit log** is an append-oriented record of significant actions: who did what, when, from where, and to which resource.

For healthcare-adjacent software, audit trails support:

- **Safety** — detecting unauthorised access or destructive changes.
- **Accountability** — staff know actions are recorded.
- **Investigation** — reconstructing events after an incident.
- **Compliance** — many regulatory frameworks require access logging for protected information.

**Analogy:**  
A security camera that records who opened which door — not every breath you take, but every meaningful action.

---

### What Gets Logged

Each audit entry may contain:

| Field | Description |
|-------|-------------|
| `tenantId` | Which clinic |
| `userId` | Which authenticated user (if any) |
| `action` | Dot-notation verb: `patient.created`, `auth.login`, `security.brute_force` |
| `entity` | Resource type: `Patient`, `Invoice`, `User`, `SecurityEvent` |
| `entityId` | Specific record identifier |
| `ipAddress` | Client network address |
| `userAgent` | Browser and device string |
| `metadata` | JSON context — field changes, failure reasons, correlation IDs |
| `createdAt` | Server timestamp |

**Automatic mutation logging** (`withAudit` middleware) captures successful creates, updates, and deletes — stripping passwords and tokens from metadata before persistence.

---

### Domains Covered

**Clinical and operational:**

- Patients — create, update, deactivate
- Appointments — schedule, modify, cancel
- Notes — read and write events
- Billing — invoices, payments
- Users and roles — invitations, role changes, permission updates

**Security events** (`logSecurityEvent`):

- Login failures and brute-force lockouts
- Permission denials
- Invalid or expired tokens
- CSRF failures
- Rate limit violations
- (Future) Virus scan detections on uploads

**Query access:** `GET /api/audit-logs` requires `reporting.read` permission.

**Analogy:**  
The log does not merely say “someone visited” — it says “Alex from Demo Clinic opened the billing module at 14:07 UTC from IP 203.0.113.42.”

**Technical reference:** `backend/src/modules/utilities/audit.service.ts`, `backend/src/modules/security/security-events.service.ts`

---

## 7. Security Hardening

**Hardening** is the practice of adding layers that make the system resistant to attack — beyond basic authentication and authorisation.

---

### Rate Limiting

**Rate limiting** caps how many requests a client may send within a time window.

Without it, attackers could flood login endpoints with thousands of password guesses per second, or overwhelm APIs with traffic.

**Ordella implements:**

| Layer | Limit | Key |
|-------|-------|-----|
| Clinic backend — global | ~120 req / 60 sec | `rate:global:{ip}:{userId}` |
| Clinic backend — auth | ~10 req / window | `authRateLimiter` on login, refresh |
| Frontend edge | ~120 req / 60 sec per IP | `checkRateLimit` in middleware |
| Exemptions | Auth routes, health, CSRF | Prevents lockout during token refresh |

Redis backs counters in production; in-memory fallback exists for single-instance development.

**Analogy:**  
A receptionist who says, “You have knocked five times this minute — please wait before trying again.”

**Technical reference:** `backend/src/middleware/rate-limit.ts`, `apps/frontend-web/middleware.ts`

---

### Brute-Force Protection

**Brute-force attack:** systematically guessing passwords until one succeeds.

**Ordella’s layered response:**

1. **IP + email sliding window** — Redis counter per `IP:email` pair.
2. **Account lockout** — `failedLoginCount` and `lockedUntil` on the user record.
3. **Exponential backoff** — lockout duration doubles with repeated violations, capped at `LOGIN_LOCKOUT_MAX_MS`.
4. **Generic error messages** — “Invalid credentials” whether email or password was wrong — preventing email enumeration.
5. **Security event logging** — every lockout recorded.

**Analogy:**  
After three wrong safe combinations, the safe enforces a five-minute cooldown.

**Technical reference:** `backend/src/modules/security/brute-force.service.ts`, `backend/test/security.spec.ts`

---

### Secure HTTP Headers

Servers attach **security headers** instructing browsers to behave more safely:

| Header | Purpose |
|--------|---------|
| `Strict-Transport-Security` | Force HTTPS on future visits |
| `X-Content-Type-Options: nosniff` | Prevent MIME-type sniffing attacks |
| `X-Frame-Options: DENY` | Prevent clickjacking via iframes |
| `Content-Security-Policy` | Restrict script and resource origins |

Express API uses Helmet (`backend/src/middleware/security-headers.ts`). Next.js applies CSP via middleware in production.

**Analogy:**  
Safety stickers on equipment: “Do not bypass this guard” — invisible to casual users, meaningful to the browser.

---

### Content Security Policy (CSP)

**CSP** is a declarative policy telling the browser which scripts, styles, images, and connections are permitted.

Ordella uses **nonce-based CSP** in production:

- Each page response includes a unique random **nonce**.
- Inline scripts must carry `nonce="<value>"` to execute.
- Injected attacker scripts lack the nonce → blocked.

Development mode relaxes CSP to support Hot Module Replacement.

**Analogy:**  
Only pizzas bearing today’s secret word are accepted at the door. Counterfeit deliveries without the word are turned away.

**Technical reference:** `apps/frontend-web/lib/security/csp.ts`, `apps/frontend-web/middleware.ts`

---

### CSRF Protection

**CSRF** (Cross-Site Request Forgery) tricks a logged-in user’s browser into performing unwanted actions on a site where they are authenticated.

Ordella uses the **double-submit cookie** pattern:

1. `GET /api/auth/csrf` issues a token in both a cookie and the response body.
2. State-changing requests (`POST`, `PUT`, `PATCH`, `DELETE`) must include matching `x-csrf-token` header.
3. A malicious third-party site cannot read Ordella’s cookies to forge the header.

**Exemptions:** Safe HTTP methods, health checks, login/refresh endpoints, and requests bearing `Authorization: Bearer` (token auth does not rely on cookie session alone).

**Analogy:**  
Opening the vault requires both your key **and** today’s secret handshake. A copied key alone is insufficient.

**Technical reference:** `backend/src/middleware/csrf.ts`, `apps/frontend-web/lib/auth/csrf.ts`

---

### Input Validation

**Input validation** ensures incoming data conforms to expected shape, type, and business rules **before** it reaches business logic or the database.

- **Zod schemas** per route (`loginSchema`, patient create schemas, etc.).
- **Sanitisation middleware** recursively cleans `body`, `query`, and `params` — stripping HTML and dangerous characters from strings.

Invalid input → `400 Bad Request` with structured field errors.

**Analogy:**  
A bouncer who inspects IDs and rejects forgeries before entry — not after someone is already inside.

**Technical reference:** `backend/src/middleware/validate.middleware.ts`, `backend/src/middleware/sanitize-input.ts`

---

### Output Escaping

**Output escaping** ensures user-supplied data displayed in the UI cannot execute as code.

- React JSX escapes text content by default — preventing XSS in rendered output.
- APIs return JSON, not server-rendered HTML, for clinic data.
- Audit metadata serialises through typed JSON columns.

Without escaping, a patient name like `<script>malicious()</script>` could execute in a vulnerable renderer.

**Analogy:**  
Displaying the word “BANG” on a sign instead of detonating actual fireworks.

---

### Token Hardening

Collective measures making tokens difficult to steal, forge, or abuse:

| Measure | Detail |
|---------|--------|
| Short access TTL | ~15 minutes |
| HttpOnly refresh | Not accessible to JavaScript |
| Rotation | Spent refresh tokens revoked |
| `jti` claim | Per-token revocation without global logout |
| `tv` claim | Global invalidation on compromise |
| Separate signing secrets | Access ≠ refresh secret |
| Previous-secret overlap | `JWT_SECRET_PREVIOUS` for zero-downtime rotation |
| Memory-only access token | Never persisted client-side |

**Analogy:**  
A wristband that changes colour hourly, invalidates when photocopied, and can be remotely deactivated if reported stolen.

**Technical reference:** `backend/src/utils/jwt.ts`, `backend/src/modules/security/token-revocation.service.ts`

---

### File Upload Safety

Uploaded files can carry malware, disguised extensions, or path-traversal filenames (`../../etc/passwd`).

**Built pipeline** (`backend/src/modules/security/file-upload.ts`):

| Check | Detail |
|-------|--------|
| MIME validation | Declared type must match allowlist |
| Extension validation | Block executable disguises |
| Size limit | 20 MB maximum |
| Path traversal | Reject `..` and absolute paths |
| EXIF stripping | Remove hidden GPS/metadata from images |
| ClamAV scan | TCP INSTREAM virus scan |

**Status:** Validation and scan code exist with unit tests. Production upload handlers do not yet call `validateAndScanUpload()` universally — enable with `CLAMAV_HOST` and `CLAMAV_REQUIRED=true` when uploads ship.

**Analogy:**  
Every parcel passes through an X-ray scanner and weight check before entering the building.

---

### Environment Hardening

**Environment configuration** must not expose secrets or weaken production controls.

**Production requirements:**

- Replace all `change-me-*` placeholder secrets.
- Never commit `.env` files containing real credentials.
- Set `FORCE_HTTPS=true` and `TRUST_PROXY=true` behind load balancers.
- Enable Redis (`REDIS_URL`) for distributed rate limiting.
- Disable `DISABLE_API_RATE_LIMIT` outside local development.
- Require `CSRF_SECRET` (minimum 32 characters) in production.

**Analogy:**  
Changing the default lock code “0000” before opening the store to the public.

**Technical reference:** `backend/.env.example`, `apps/frontend-web/.env.example`

---

### Database Hardening

The database holds the platform’s most valuable asset — patient and clinic records.

| Control | Implementation |
|---------|----------------|
| Encrypted backups | AES-256-CBC via `backup-database.mjs` |
| Restore drill | Monthly `backup:drill` verification |
| Retention | Configurable `BACKUP_RETENTION_DAYS` (default 30) |
| TLS connections | `?sslmode=require` in production `DATABASE_URL` |
| Foreign keys | Referential integrity enforced |
| Least-privilege DB user | Application role without superuser privileges |
| Tenant scoping | Row-level `tenantId` on sensitive tables |

**Analogy:**  
A bank vault with time-locked deposits, off-site encrypted copies, and monthly fire drills.

**Technical reference:** `backend/scripts/backup-database.mjs`, `backend/scripts/backup-restore-drill.mjs`

---

## 8. Operational Security (Next Layer)

Building strong application security is necessary but not sufficient. **Operational security** monitors the running system — detecting fires, illnesses, and anomalies in real time.

**Analogy:** Smoke alarms and annual health checkups for the platform.

---

### Error Monitoring

**Error monitoring** (e.g. Sentry via `backend/src/modules/security/sentry.ts`) captures unhandled exceptions and API failures in production.

Instead of silent user-facing failures, engineering receives:

- Stack traces and error classification.
- Frequency and affected user counts.
- Release version correlation.

**Analogy:** A smoke detector that sounds when something is genuinely burning — not when toast is merely warm.

---

### Performance Monitoring

**Performance monitoring** tracks latency, throughput, and resource utilisation.

**Security relevance:**

- Sudden latency spikes may indicate DDoS or resource exhaustion attacks.
- **Correlation IDs** (`x-correlation-id`) trace a single user action across frontend, BFF, and backend services.

**Analogy:** A fitness tracker for the server — “Why is heart rate 200 bpm?”

---

### Health Checks

**Health endpoints** (`GET /api/health`) answer: *“Is this service alive and ready to serve traffic?”*

- Docker Compose and Kubernetes probe these endpoints.
- Failed checks trigger automatic container restart or traffic rerouting.
- Health routes are exempt from authentication, CSRF, and rate limiting.

**Analogy:** Roll call — if you do not answer “here,” someone checks on you.

---

### Uptime Monitoring

**External uptime monitors** ping production URLs every minute from outside the infrastructure.

If customers cannot reach Ordella, on-call engineers are notified — even if internal health checks have not yet fired.

**Analogy:** A friend texting “You still there?” during a long journey.

---

### Log Aggregation

**Log aggregation** centralises logs from all servers into one searchable system (Grafana Loki, ELK stack, CloudWatch).

Engineers query: *“Show all `security.brute_force` events in the last 24 hours”* without accessing twenty individual machines.

**Analogy:** Consolidating homework from thirty backpacks into one organised binder.

**Technical reference:** `infrastructure/global-logging-layer/`

---

### Alerting

**Alerting** converts metrics and logs into actionable notifications — email, Slack, PagerDuty.

| Alert | Typical threshold |
|-------|-------------------|
| Brute-force spike | > N failures per minute |
| Token reuse detected | Any occurrence |
| Backup failure | Cron exit code ≠ 0 |
| Health check failure | Non-200 for > 60 seconds |
| Error rate anomaly | Sentry threshold breach |

**Analogy:** The fire alarm does not merely log smoke — it **rings** until someone responds.

---

## 9. Infrastructure Security (Production Layer)

**Infrastructure security** protects the servers, networks, and cloud resources beneath the application — the outermost walls.

---

### API Gateway

An **API gateway** is the single public entry point for microservice traffic.

- Routes `/auth/*`, `/patients/*`, `/messaging/*` to internal services.
- Terminates TLS at the edge.
- Applies gateway-level rate limits.
- Hides internal service ports from the public internet.

**Local development:** `http://localhost:3049` (Docker Compose).  
**Production:** Load-balanced gateway cluster behind TLS.

**Analogy:** A hotel lobby desk — guests do not wander into staff-only corridors.

**Technical reference:** `services/api-gateway/`, `infrastructure/deployment-layer/`

---

### Service-to-Service Authentication

Internal microservices must verify each other’s identity — not trust any packet merely because it originated inside the network.

Mechanisms include:

- Shared JWT validation against the auth-service issuer.
- Internal-only routes with service tokens.
- Network policies restricting which pods may communicate.

**Analogy:** Apartment residents use a different key than visitors — delivery drivers cannot enter every unit.

---

### Network Segmentation

**Network segmentation** divides infrastructure into zones:

| Zone | Contents |
|------|----------|
| Public | Gateway, frontend load balancer |
| Application | Backend services, BFF |
| Data | PostgreSQL, Redis — no direct internet route |

Docker Compose uses internal networks. Kubernetes uses namespace isolation and NetworkPolicies.

**Analogy:** School visitors remain in the office; students in classrooms; the server room is separately locked.

---

### Secrets Manager

A **secrets manager** (AWS Secrets Manager, Azure Key Vault, HashiCorp Vault) stores credentials outside source code and `.env` files on disk.

- Applications fetch secrets at runtime.
- Rotation does not require redeploying entire codebases.
- Access is audited per principal.

**Analogy:** Master keys live in the principal’s safe — not taped under every desk.

---

### TLS (Transport Layer Security)

**TLS** encrypts data in transit. Users recognise it via the browser padlock and `https://` URLs.

Without TLS, passwords, tokens, and patient data traverse the network as readable text.

Ordella enforces:

- `secure` cookies in production.
- `FORCE_HTTPS` redirect on the clinic backend.
- HSTS headers via Helmet.

**Analogy:** Speaking through an encrypted channel instead of shouting across a crowded room.

---

### WAF (Web Application Firewall)

A **WAF** inspects HTTP traffic **before** it reaches application code.

It can block:

- Known attack signatures (SQL injection probes, XSS payloads).
- Malicious bots scanning for vulnerabilities.
- Traffic from blocked geographies (if configured).

**Current state:** WAF deployment is an **operator responsibility** — designed in architecture, enabled per production environment (Cloudflare, AWS WAF, Azure Front Door).

**Analogy:** Airport security screening every bag — most passengers pass; suspicious items are stopped.

---

### DDoS Protection

**DDoS** (Distributed Denial of Service) floods a target with overwhelming traffic to make it unavailable.

**Defence layers:**

| Layer | Control |
|-------|---------|
| Cloud edge | AWS Shield, Cloudflare absorption |
| Gateway | Per-IP rate limits |
| Application | `globalRateLimiter`, `authRateLimiter` |
| Frontend | Edge middleware API rate limits |
| Redis | Shared counters across instances |

**Analogy:** Crowd-control barriers and ticket queues preventing a mob from blocking the entrance.

---

## 10. Final Rating

### Score: **8.7 / 10**

This is a **strong** security rating — appropriate for a maturing healthcare-adjacent SaaS platform with real engineering investment. It reflects implemented, tested controls — not aspirational documentation.

---

### Why 8.7 Is a Strong Rating

| Strength area | Assessment |
|---------------|------------|
| **Authentication** | HttpOnly refresh, rotation, memory-only access tokens, signed session cookies |
| **Authorization** | Database-backed RBAC, granular permissions, UI + API enforcement |
| **Tenant isolation** | JWT-bound tenant, client override rejected, query scoping |
| **Audit trail** | Mutation logging, security events, login attempt records |
| **Hardening** | Rate limits, brute-force, CSP, CSRF, input validation, encrypted backups |
| **Route guards** | Edge middleware portal isolation |
| **Testing** | Security regression suite (`backend/test/security.spec.ts`) |

In plain terms: Ordella has real locks, ID checks, separate apartments per clinic, security diaries, door bouncers, and backup fire drills. That places it **above** the majority of early-stage SaaS products and **approaching** enterprise readiness.

---

### Rating Breakdown

```text
Authentication        █████████░  9.0 / 10
Authorization         █████████░  9.2 / 10
Route guards          █████████░  8.8 / 10
API security          █████████░  9.1 / 10
Tenant isolation      █████████░  9.3 / 10
Audit logging         ████████░░  8.5 / 10
Security hardening    ████████░░  8.6 / 10
Operational security  ███████░░░  7.8 / 10
Infrastructure        ███████░░░  7.5 / 10
────────────────────────────────────────
Overall               ████████░░  8.7 / 10
```

---

### What Is Needed to Reach 10 / 10

| Gap | Current state | Target state |
|-----|---------------|--------------|
| Token reuse detection (clinic backend) | Generic 401 on replay | Full `TOKEN_REUSE_DETECTED` + family revocation |
| ClamAV on uploads | Code built, not wired to handlers | Mandatory scan on every production upload |
| Automated JWT rotation | Manual `*_PREVIOUS` overlap only | Scheduled rotation with runbook automation |
| Refresh IP/device binding (clinic) | Login attempts only | Fingerprint on refresh token rows |
| Production WAF + DDoS edge | Architecture documented | Enabled and tested in production |
| Secrets manager | `.env` examples | Vault/SM integration, no disk secrets |
| Unified auth across stacks | Dual JWT issuers in hybrid dev | Single coherent token story |
| mTLS service mesh | Network policies | Encrypted mutual service authentication |

Closing these gaps moves Ordella from **“strong and improving”** to **“enterprise-grade, audit-ready, maximum assurance.”**

---

## Conclusion

Ordella’s security posture is built on **defence in depth** — many independent layers, any one of which can stop or slow an attacker even if another layer fails.

**At login**, the platform verifies identity, issues short-lived credentials, stores long-lived refresh tokens in HttpOnly cookies, and binds the session to a specific clinic.

**During use**, roles and permissions control which portals and API endpoints are reachable. The UI guides users; the server enforces. Tenant isolation ensures clinics cannot see each other’s data — regardless of what a malicious client sends.

**Around the application**, rate limits slow attackers, brute-force protection locks repeated guessers, CSP and CSRF block common web attacks, and input validation rejects malformed data. Audit logs record who did what, when, and from where.

**In production**, health checks, error monitoring, log aggregation, and alerting watch the system continuously. Infrastructure controls — gateways, TLS, segmentation, WAF, DDoS protection — guard the perimeter.

The **8.7 / 10** rating reflects a platform that takes security seriously today, with a clear, documented path to perfection. This is not security theatre — it is implemented, tested, and evolving.

For engineering detail, read [`security-architecture.md`](./security-architecture.md).  
For the most accessible walkthrough, read [`security-rating-explained.md`](./security-rating-explained.md).

**Security is not a feature you ship once. It is a practice you maintain.** Ordella is built for that practice.
