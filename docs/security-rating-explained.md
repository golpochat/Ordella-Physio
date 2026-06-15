# Security Rating Explained (Like You’re 10 Years Old)

---

## Introduction

### What is a “security rating”?

Imagine you built a treehouse club. You want to know: **How safe is it?**

- Is the ladder strong?
- Is there a lock on the door?
- Can strangers climb in?
- If someone tries to break in, will an alarm go off?

A **security rating** is like a report card for how safe a computer system is. Instead of grades for math and reading, you get grades for things like:

- **Can bad people steal passwords?**
- **Can one clinic peek at another clinic’s patients?**
- **Can a staff member do things only the boss should do?**

Ordella is a **SaaS platform** — that means clinics use it over the internet, like Netflix or Google Classroom, but for running a physiotherapy clinic. Because it holds **real patient information**, security is not optional. It is as important as locking the doors at a real clinic.

### Why does the rating matter?

If security is weak:

- Someone could pretend to be a doctor and read private notes.
- A hacker could guess passwords and get in.
- One clinic could accidentally (or on purpose) see another clinic’s data.

If security is strong:

- Only the right people get in.
- They only see what they are allowed to see.
- If something bad happens, there is a record of who did what.

This document explains **every part** of Ordella’s security in simple words — like you are ten years old — so anyone can understand how we protect the platform, even if they have never written code before.

For the technical version, see [`security-architecture.md`](./security-architecture.md).

---

## 1. Authentication Security (Explain Like a Child)

**Authentication** means answering one question: **“Are you really you?”**

It is like showing your school ID at the door. Security starts here. If we cannot trust *who* you are, nothing else matters.

---

### HttpOnly Cookies

When you log into Ordella, the computer needs to remember you are logged in. One way websites do this is with **cookies** — tiny notes the browser keeps.

A normal cookie is like a note stuck on your backpack that **anyone nearby can read**, including sneaky JavaScript code on a bad website.

An **HttpOnly cookie** is like a note kept **inside a locked pocket** that only the browser’s “trusted server side” can touch. JavaScript — the code that runs games and animations on web pages — **cannot read it**.

**Why we use it for refresh tokens:**

A **refresh token** is a special pass that lets you get a new “daily pass” (access token) without typing your password again. If a bad guy stole that refresh token, they could stay logged in as you for days.

We put the refresh token in an HttpOnly cookie named `ordella-refresh` so:

- Bad scripts on the page cannot grab it.
- It travels only between your browser and our server.
- It is never saved in `localStorage` where malware could find it.

**Simple metaphor:**  
It is like keeping your house key in a safe pocket that pickpockets cannot reach, instead of clipping it to the outside of your bag.

---

### Secure Cookies

A **secure cookie** is a cookie that only travels over **HTTPS** — the locked, encrypted version of the internet.

HTTP is like sending a postcard: anyone handling it could read it.  
HTTPS is like sending a letter in a **sealed, tamper-proof envelope**.

In production, Ordella sets `secure: true` on cookies. That means:

- The cookie is **not sent** on plain `http://` connections.
- It only works on `https://` where traffic is encrypted.

**Simple metaphor:**  
Your secret club password is only whispered through a soundproof tube, never shouted across the playground.

---

### SameSite=Strict

Cookies can sometimes be sent to websites you did not mean to visit. That is how certain tricks work — a bad site tries to use *your* cookies while you are logged in somewhere else.

**SameSite=Strict** means: “Only send this cookie when the user is **directly** on our website — not when they arrive from a random link on another site.”

Ordella uses `sameSite: "strict"` on session and refresh cookies.

**What it stops:**

- A evil website cannot silently use your Ordella login while you browse their page.
- Your cookie stays “loyal” to Ordella’s own pages.

**Simple metaphor:**  
Your school lunch pass only works when **you** walk through **your** school gate — not when a stranger tries to wave it at a different school.

---

### Rotating Refresh Tokens

Every time you use your refresh token to get a new access token, Ordella **throws away the old refresh token** and gives you a brand-new one.

This is called **rotation** — like spinning a new combination on a lock each time you open a safe.

**Why?**

If someone secretly copied your old refresh token yesterday, it **will not work today** because we already retired it.

**What happens step by step:**

1. You log in → you get Access Token A and Refresh Token 1.
2. Access Token A expires (after about 15 minutes).
3. You silently ask for a new one using Refresh Token 1.
4. Server says: “Here is Access Token B and Refresh Token 2. Refresh Token 1 is now **dead**.”
5. If a thief tries Refresh Token 1 again → **rejected**.

**Simple metaphor:**  
Each time you ride the subway, you get a new ticket and the old one turns to dust. Photocopying yesterday’s ticket does not work.

---

### Token Reuse Detection

**Token reuse detection** is the alarm that goes off when someone tries to use a refresh token that was **already used and thrown away**.

Think about it: if *you* just rotated your token, and then someone else tries the old one — either:

- You have a bug, or
- **Someone stole your old token and tried to use it.**

In the auth microservice, Ordella treats this as a **possible break-in**:

- All your sessions are killed.
- You must log in again.
- A security diary entry is written: `TOKEN_REUSE_DETECTED`.

**Simple metaphor:**  
If someone tries to enter the building with a visitor badge you already turned in at the front desk, security assumes **someone cloned your badge** and locks down the whole floor.

*(Note: this super-alarm is fully built in one part of our system and is still being strengthened in the clinic backend — that is one reason we are not a perfect 10/10 yet.)*

---

### Session Invalidation

**Session invalidation** means **making your login stop working on purpose**.

This happens when:

- You click **Sign out**.
- Your refresh token expires (after about 7 days of no activity).
- An admin forces everyone to log in again.
- The system detects something suspicious (like token reuse).
- Your password is changed and old sessions are killed.

When a session is invalidated:

- Cookies are cleared.
- Tokens are revoked in the database.
- The **token version number** (`tv`) on your account goes up, which breaks all old access tokens instantly.

**Simple metaphor:**  
The teacher collects all hall passes and issues new ones — your old pass is worthless, even if you still have it in your pocket.

---

### Device / IP Soft Binding

**Soft binding** means we **remember clues** about where and how you logged in — but we do not lock you out just because you switched from Wi-Fi to phone data.

We softly track things like:

- **IP address** — the “return address” of your internet connection.
- **User agent** — which browser and device you use.

**Why?**

- If someone in another country tries your password 50 times, we notice.
- If a refresh token is reused, we can investigate which IP was involved.
- Login attempts are stored with IP + email for brute-force protection.

**“Soft” vs “hard”:**

- **Hard binding** would mean: “You can only log in from this exact laptop forever.” That is annoying when you get a new phone.
- **Soft binding** means: “We watch for weird patterns and slow down or block suspicious tries — but normal device changes are fine.”

**Simple metaphor:**  
The front desk remembers your face and usually waves you in — but if someone wearing a mask keeps saying your name, they call security.

---

## 2. Authorization Security

**Authentication** asks: “Who are you?”  
**Authorization** asks: “Okay, but what are you **allowed** to do?”

You can be a real student (authenticated) but still not allowed in the **teacher’s lounge** (not authorized).

---

### Roles — Your Job Badge

A **role** is your **job title** in the system. Ordella has these main roles:

| Role | Who they are | Portal “building wing” |
|------|--------------|------------------------|
| **Admin** (Clinic Admin) | The clinic boss / manager | `/clinic` |
| **Staff** | Front desk, reception | `/staff` |
| **Therapist** | The physiotherapist treating patients | `/therapist` |
| **Super Admin** (`SYSTEM`) | Platform operator — manages the whole SaaS | `/super-admin` |

**Simple metaphor:**  
Roles are like **color-coded badges** at a hospital:

- Red badge = Doctor
- Blue badge = Nurse
- Green badge = Reception

Everyone is real and logged in — but the badge color decides which doors your card opens.

---

### Permissions — Keys to Different Rooms

A **permission** is a **specific key** to a **specific room**.

Examples in Ordella:

| Permission | What it unlocks |
|------------|-----------------|
| `patient.view` | Look at patient lists and profiles |
| `patient.manage` | Create new patients |
| `notes.write` | Write clinical notes |
| `notes.read` | Read clinical notes |
| `billing.manage` | Handle invoices and payments |
| `appointment.manage` | Schedule and change appointments |
| `user.manage` | Add or remove clinic users |
| `role.manage` | Change who has which role |

A **Staff** member might have `patient.view` but **not** `billing.manage`.  
An **Admin** might have almost all keys.  
A **Therapist** might have `notes.write` for their own patients but not `user.manage`.

**Simple metaphor:**  
Your house key opens the front door. The garage key opens the garage. The safe key opens the safe. Having one does not automatically give you the others.

---

### Why Roles Are Like Job Badges

Roles group permissions together so we do not have to hand out 50 individual keys to every new employee.

When someone is hired as **Staff**, we clip on the Staff badge and the system knows:

- They can see patients (usually).
- They probably cannot delete the whole clinic.
- They should not edit role assignments.

**Simple metaphor:**  
At a theme park, “Ride Operator” badge lets you run rides. You do not need a separate sticker for every single button on the control panel — the badge implies the bundle of allowed actions.

---

### Why Permissions Are Like Room Keys

Permissions are **smaller and more exact** than roles.

Maybe one Staff member is trusted with billing and another is not. Permissions let us be precise:

- `billing.manage` = key to the billing office.
- Without it, the billing office door stays locked — even if you are Staff.

**Simple metaphor:**  
Even if you work at the library (role), you might not have the key to the rare-books vault (permission).

---

### UI Hiding — Removing Buttons You Cannot Use

On the website, Ordella **hides menu items and buttons** you are not allowed to use.

If you do not have `billing.manage`:

- You will not see the “Billing” section in the sidebar (or it will be filtered out).
- You will not see a “Delete Invoice” button.

**Important:** UI hiding is **friendly design**, not real security. A clever person could still *try* to call the API directly. That is why we also check on the server (next section).

**Simple metaphor:**  
The school hides the science lab door from kindergartners by not putting it on their map. But the door also has a real lock — hiding alone is not enough.

---

### API Permission Checks — The Real Locks

Every time the app asks the server to do something — “show patients,” “save a note,” “delete a user” — the **server checks permissions again**.

Even if you:

- Hack the webpage.
- Use a tool like Postman or cURL.
- Type a URL directly in the browser.

…the server says: **“Show me your keys.”** No key? **403 Forbidden.**

Functions that do this include:

- `requirePermission("patient.view")` — need this exact key.
- `requireAny(["notes.read", "notes.write"])` — need at least one.
- `requireAll(["billing.manage", "patient.view"])` — need both.

**Simple metaphor:**  
You can draw yourself a fake VIP wristband, but the rollercoaster still scans the **real** ticket at the gate.

---

## 3. Route Guards (Frontend)

The **frontend** is what you see in the browser — pages, buttons, colors. **Route guards** are the bouncers at each **web page door**.

---

### Why Each Portal Has Its Own “Door”

Ordella splits the app into **portals** — separate areas for separate jobs:

- `/clinic` — for Admins
- `/staff` — for Staff
- `/therapist` — for Therapists
- `/super-admin` — for platform Super Admins

Each portal is like a **different wing** of the same hospital building. You should not wander into wings where your badge does not work.

---

### Why You Cannot Walk Into Someone Else’s Area

Imagine a Therapist tries to type `/clinic/billing` in the address bar.

**What happens:**

1. **Edge middleware** (a guard that runs before the page loads) reads your signed session cookie.
2. It sees your role is `THERAPIST`.
3. It knows therapists belong in `/therapist`, not `/clinic`.
4. It **redirects** you back to your own home page — like a hallway sign that says “Employees only beyond this point.”

Staff cannot open Super Admin pages. Admins cannot impersonate therapists without the right role. The system enforces this **before** the page even renders.

**Simple metaphor:**  
You cannot walk into the pilots’ cockpit just because you are on the airplane. The door checks your uniform.

---

### How the System Checks Your Badge Before Letting You In

When you navigate to a protected page:

1. **Cookie check** — Is there a valid signed `ordella-session` cookie?
   - No → go to `/login`.
2. **Tenant check** — Does your session include a clinic (tenant)?
   - Missing (and you are not Super Admin) → go to `/login?reason=missing-tenant`.
3. **Portal check** — Does your role match this URL prefix?
   - Wrong wing → redirect to your portal home.
4. **Page loads** — Only now do you see the dashboard.

On the client side, `AuthBootstrap` and `AppLayout` double-check that you are still logged in with a valid role.

**Simple metaphor:**  
Three doors with three guards: ID check, badge color check, and “is this the right building floor?” check.

---

## 4. API Security

The **API** is how the frontend talks to the backend — like placing orders at a restaurant kitchen window. **API security** means the kitchen only fills orders from people with valid tickets.

---

### `requirePermission`

```text
requirePermission("patient.view")
```

Means: **“You must have the patient.view key to enter.”**

If you do not, the server returns **403 Forbidden** and writes a security diary note: `permission_denied`.

**Example:**  
A therapist tries to list all clinic users without `user.manage` → blocked.

---

### `requireAny`

```text
requireAny(["notes.read", "notes.write"])
```

Means: **“You need at least ONE of these keys — not necessarily both.”**

Good for pages where reading OR writing is enough to proceed.

**Example:**  
A notes endpoint might allow either readers or writers, but not random staff with no notes access at all.

---

### `requireAll`

```text
requireAll(["billing.manage", "patient.view"])
```

Means: **“You must have EVERY key in the list.”**

Stricter — for dangerous or sensitive combo actions.

**Example:**  
“Bill this patient” might require both seeing the patient AND managing billing.

---

### `requireTenant`

```text
requireTenant
```

Means: **“This request must belong to a specific clinic, and that clinic comes from YOUR login — not from anything you typed.”**

The server:

- Reads `tenantId` from your JWT (your login proof).
- **Rejects** if you try to send `tenantId` in the body, URL, or headers.
- Sets `req.tenantId` so all database queries use the right clinic.

**Simple metaphor:**  
You cannot choose which apartment’s mail you read by scribbling a different apartment number on the envelope. The guard uses **your** address only.

---

### Why the Backend Double-Checks Everything

The frontend is like a polite receptionist. The backend is the **vault**.

We never trust the frontend because:

- Hackers can bypass the UI.
- Browser extensions can modify pages.
- Old cached JavaScript might be wrong.

So **every** sensitive API route runs through a chain:

```text
Login proof → Tenant binding → Permission check → Then (and only then) database work
```

**Simple metaphor:**  
The movie ticket guy checks your ticket even if you already showed it to the popcorn seller.

---

### Why Postman and cURL Cannot Bypass Rules

**Postman** and **cURL** are tools that let developers send raw HTTP requests — like knocking on the kitchen window and shouting an order without using the normal menu app.

It does not matter **how** you send the request. The server always asks:

1. **Bearer token** — Are you logged in? Is the JWT valid and not expired?
2. **Token version** — Has this token been revoked?
3. **Tenant** — Which clinic? (From JWT only.)
4. **Permission** — Are you allowed to do this action?

No valid token? **401 Unauthorized.**  
Valid token but wrong permission? **403 Forbidden.**  
Valid token but wrong tenant? **403 or 404** — you see nothing.

**Simple metaphor:**  
Shouting “give me free pizza” at the kitchen door works the same as ordering through the app — you still need to pay.

---

## 5. Tenant Isolation

---

### What Is a Tenant?

A **tenant** is one **customer clinic** using Ordella.

Ordella is **multi-tenant** — many clinics share the same software, like many families living in the same apartment building. Each clinic is a separate **tenant**.

Examples:

- “Demo Clinic” with slug `demo-clinic`
- “Sunny Physio Dublin”
- “Riverdale Sports Rehab”

They all use Ordella, but their data must **never mix**.

---

### Why Each Tenant Has Its Own “Apartment”

In the database, almost every important table row has a `tenantId` column — like an apartment number on every file folder.

When Demo Clinic loads patients, the query is:

```text
“Give me patients WHERE tenantId = Demo Clinic’s ID”
```

Sunny Physio’s patients have a **different** `tenantId`. They never appear in Demo Clinic’s list — not even by accident.

**Simple metaphor:**  
Your diary in your bedroom is not stored on your neighbor’s bookshelf — even though you share the same apartment building.

---

### Why No One Can Peek Into Someone Else’s Apartment

**Cross-tenant access** — Clinic A reading Clinic B’s data — is one of the worst things that can happen in SaaS.

Ordella prevents this with:

1. **JWT binding** — Your login token includes your clinic’s ID.
2. **`requireTenant`** — Rejects fake clinic IDs from the client.
3. **Database queries** — Always filter by `tenantId`.
4. **Unique rules** — Email addresses are unique *per clinic*, not globally (two clinics can both have `admin@clinic.com` with different passwords).
5. **Mismatch detection** — If headers and JWT disagree, request is blocked.

Even a clinic Admin — the most powerful role **inside their clinic** — has **zero power** over another clinic’s data.

**Simple metaphor:**  
Being president of your treehouse club does not make you president of the neighbor’s treehouse.

---

### Why `tenantId` Never Comes From the User

We **never trust** the browser to say “I am working on Clinic X today.”

Hackers could change that value and try to access another clinic.

Instead:

- You log in with email + password + clinic slug.
- Server resolves the real internal UUID.
- That UUID is **baked into your JWT**.
- Every API call inherits it from the token — not from form fields.

If you send `tenantId` in a JSON body or `x-tenant-id` header on protected routes, the server says: **“Nice try. 400 Bad Request.”**

**Simple metaphor:**  
You cannot choose which school’s grades you see by writing a different school name on your homework. The system looks up **your** enrollment.

---

## 6. Audit Logging

---

### Why the System Keeps a Diary

An **audit log** is a **diary of important actions** — who did what, when, and from where.

Real clinics keep paper logs too: “Dr. Smith accessed Patient File #42 at 3:15 PM.”

Digital audit logs are the same idea, but automatic and searchable.

**Why bother?**

- **Safety** — If someone deletes a patient record, we know who.
- **Accountability** — Staff know actions are recorded.
- **Investigation** — After a security incident, we can trace what happened.
- **Compliance** — Health data rules often require audit trails.

**Simple metaphor:**  
A security camera that only records *who opened which door* — not every breath you take, but every important move.

---

### What Gets Logged

Each audit entry can include:

| Field | What it means |
|-------|---------------|
| **userId** | Which logged-in person |
| **tenantId** | Which clinic |
| **action** | What happened (`patient.created`, `auth.login`, etc.) |
| **entity** | What type of thing (Patient, Invoice, User…) |
| **entityId** | Which specific record |
| **ipAddress** | Where on the internet they connected from |
| **userAgent** | Browser and device info |
| **timestamp** | Exact date and time |
| **metadata** | Extra details (what changed, before/after) |

---

### Examples of Logged Actions

**Normal clinic work:**

- Patient created, updated, or deactivated
- Appointment scheduled or cancelled
- Clinical note written
- Invoice created, payment recorded
- User invited or role changed

**Security events:**

- Login success and failure
- Brute-force lockout triggered
- Permission denied (someone tried something they should not)
- Invalid or expired token used
- CSRF check failed
- (Future) Virus found in uploaded file

**Simple metaphor:**  
The diary does not just say “someone visited” — it says “Alex from Demo Clinic opened the billing cabinet at 2:07 PM from IP address X.”

---

## 7. Security Hardening

**Hardening** means making the system **tougher** — like adding more locks, thicker walls, and security cameras. Each item below is an extra layer of protection.

---

### Rate Limiting

**Rate limiting** means: **“You can only knock on the door so many times per minute.”**

Without it, a hacker could send **thousands** of login tries per second.

Ordella limits:

- **General API** — about 120 requests per minute per person/IP.
- **Auth endpoints** (login, refresh) — stricter, about 10 per window.
- **Frontend edge** — also rate-limits `/api/*` calls.

**Simple metaphor:**  
A club bouncer who says “You already asked to come in five times this minute — wait outside.”

---

### Brute-Force Protection

**Brute force** means guessing passwords over and over until one works — like trying every key on a keyring.

Ordella fights back with:

1. **IP + email counter** — Too many fails from the same place? Slow down.
2. **Account lockout** — After enough fails, the account is temporarily locked (`lockedUntil`).
3. **Exponential backoff** — Each lockout can last longer than the last.
4. **Generic error message** — We say “Invalid credentials” whether the email or password was wrong — so hackers cannot learn which emails exist.

**Simple metaphor:**  
After three wrong locker combinations, the locker makes you wait five minutes before trying again.

---

### Secure HTTP Headers

When the server sends a web page, it can attach **instruction notes** to the browser:

- **“Do not let other sites embed this page in a frame.”** (Clickjacking protection)
- **“Only load scripts from trusted places.”**
- **“Always use HTTPS in the future.”** (HSTS)

These are **HTTP security headers**. They are invisible to normal users but block whole classes of attacks.

**Simple metaphor:**  
Stickers on your laptop that say “Do not open unknown USB drives” — the laptop still works, but browsers behave more safely.

---

### CSP (Content Security Policy)

**CSP** is a strict **menu** telling the browser which scripts, styles, and images are allowed.

Ordella uses **nonce-based CSP** in production:

- Each page load gets a random secret number (nonce).
- Only scripts with that nonce may run.
- Random injected hacker scripts **will not have the nonce** → blocked.

**Simple metaphor:**  
Only pizzas from **today’s secret word** get delivered. A stranger’s pizza without the word is refused at the door.

---

### CSRF Protection

**CSRF** (Cross-Site Request Forgery) is a trick where a bad website tries to **use your logged-in session** to do something on Ordella while you are not looking — like transferring money or changing your email.

Ordella uses the **double-submit cookie** pattern:

1. Server gives you a CSRF token (in cookie + response).
2. Dangerous requests (POST, PUT, DELETE) must include matching token in a header.
3. A evil site cannot read your cookie to copy the token → request fails.

**Bearer token** API calls skip CSRF because they do not rely on cookies alone.

**Simple metaphor:**  
To open the school safe, you need both your key **and** today’s secret handshake. A thief with only a copied key still fails.

---

### Input Validation

**Input validation** means checking that data **makes sense** before using it.

Examples:

- Email must look like an email.
- Appointment end time must be after start time.
- Patient age cannot be negative 500.

We use **Zod schemas** — strict checklists for every API input.

**Simple metaphor:**  
A bouncer who checks IDs and says “This is not a real ID format” before letting you in.

---

### Output Escaping

**Output escaping** means when we show user-typed text on screen, we **do not let it become code**.

Without escaping, a hacker might type a patient name like:

```html
<script>stealCookies()</script>
```

React and proper JSON APIs **escape** dangerous characters so it displays as harmless text, not executable script.

**Simple metaphor:**  
Writing “BANG!” on paper instead of actually setting off fireworks.

---

### Token Hardening

**Token hardening** is the collection of rules that make login tokens hard to steal, forge, or reuse:

| Trick | What it does |
|-------|----------------|
| Short access token life (~15 min) | Stolen token expires quickly |
| Long refresh in HttpOnly cookie | Convenient but protected |
| Rotation | Old refresh dies on use |
| `jti` per token | Can revoke one token without kicking everyone out |
| `tv` version number | Password change kills all old tokens |
| Separate secrets | Access and refresh signed with different keys |
| Memory-only access token | JavaScript cannot persist it |

**Simple metaphor:**  
A theme park wristband that changes color every hour, turns invalid if photocopied, and can be deactivated remotely if stolen.

---

### File Upload Safety

When clinics upload files (patient documents, images), bad files could hide **viruses** or **trick paths** like `../../secret.txt`.

Ordella’s upload pipeline (ready but not fully wired everywhere yet) includes:

- **MIME type check** — Is it really a PDF?
- **Extension check** — `.exe` disguised as `.pdf`? Nope.
- **Size limit** — 20 MB max.
- **Path traversal block** — Cannot escape the upload folder.
- **EXIF stripping** — Remove hidden GPS data from photos.
- **ClamAV virus scan** — Scan file content like antivirus software.

**Simple metaphor:**  
Every package goes through an X-ray machine and size scale before entering the building.

---

### Environment Hardening

**Environment** means the secret settings files (`.env`) and server configuration.

Rules for production:

- Replace every `change-me-*` placeholder secret.
- Never commit real passwords to Git.
- Use `FORCE_HTTPS=true` behind load balancers.
- Enable Redis for shared rate limits across multiple servers.
- Disable dev-only flags like `DISABLE_API_RATE_LIMIT`.

**Simple metaphor:**  
Before opening the store, change the default lock code “0000” to a real password.

---

### Database Hardening

The database is the **treasure vault** where patient records live.

Protections:

- **Encrypted backups** — `pg_dump` output encrypted with AES-256 before saving to disk.
- **Backup drill** — Monthly test restore to prove backups actually work.
- **Retention policy** — Old backups deleted after 30 days (configurable).
- **TLS connections** — Database traffic encrypted in production.
- **Foreign keys** — Data relationships enforced; orphans prevented.
- **Least privilege** — App database user should not have superuser powers.

**Simple metaphor:**  
Bank vault with a time-lock, copied keys stored in a separate safe, and monthly fire drills.

---

## 8. Operational Security (Next Layer)

**Operational security** is about watching the system **while it runs** — like smoke alarms and annual doctor checkups.

Building strong locks (Sections 1–7) is not enough if nobody notices when a fire starts.

---

### Error Monitoring

**Error monitoring** (e.g. Sentry) catches when the app **crashes or throws errors** in production.

Instead of users silently seeing a broken page, developers get an alert:

- What broke?
- Which line of code?
- How many users affected?

**Simple metaphor:**  
A smoke alarm that beeps when something is on fire — not when you are just making toast.

---

### Performance Monitoring

**Performance monitoring** tracks **speed** — slow pages, slow database queries, APIs taking too long.

Why is that security?

- Slow systems frustrate users into bad workarounds.
- Sudden slowness can mean an attack (DDoS) or a bug.
- **Correlation IDs** let us trace one user’s request across many services.

**Simple metaphor:**  
A fitness tracker for the server — “Why is your heart rate 200 bpm?”

---

### Health Checks

A **health check** is a simple question the server answers: **“Are you alive and ready?”**

Ordella exposes `GET /api/health` endpoints.

Docker and Kubernetes **ping** this every few seconds. If it fails, the broken container is replaced automatically.

**Simple metaphor:**  
Teacher taking attendance — if you do not say “here,” someone checks on you.

---

### Uptime Monitoring

**Uptime monitoring** is an external service that asks every minute: **“Is ordella.com responding?”**

If the site is down for customers, the on-call engineer gets paged — even at 3 AM.

**Simple metaphor:**  
A friend texting “You still there?” every hour during a long road trip.

---

### Log Aggregation

**Log aggregation** means collecting logs from **all servers into one searchable place** (like Grafana Loki or ELK).

Instead of SSH-ing into 20 machines, you search: **“Show all `security.brute_force` events today.”**

**Simple metaphor:**  
All class homework turned into one binder instead of scattered in 30 backpacks.

---

### Alerting

**Alerting** turns logs and metrics into **action** — emails, Slack messages, or phone pages when thresholds are crossed.

Example alerts:

- 50 failed logins in one minute → possible attack.
- `TOKEN_REUSE_DETECTED` → possible stolen session.
- Backup job failed → data at risk.
- Health check failed → site down.

**Simple metaphor:**  
The fire alarm does not just record smoke — it **rings** until someone responds.

---

## 9. Infrastructure Security (Production Layer)

**Infrastructure** is the **buildings, roads, and power lines** under the software — servers, networks, cloud accounts. This is the outermost wall around everything.

---

### API Gateway

An **API gateway** is the **front door** of the microservices neighborhood.

All outside traffic goes to one address (e.g. port 3049). The gateway routes:

- `/auth/*` → auth service
- `/patients/*` → patient service
- `/messaging/*` → messaging service

Benefits:

- One place for TLS, rate limits, and routing rules.
- Internal services hide behind the gateway — not directly on the public internet.

**Simple metaphor:**  
A hotel lobby desk — guests never wander into the staff-only kitchen hallway.

---

### Service-to-Service Authentication

Inside the cluster, services sometimes talk to each other. **Service-to-service auth** ensures only **trusted neighbors** can call internal APIs — not random internet strangers.

Methods include:

- Shared JWT validation.
- Internal network policies.
- Dedicated internal routes with service tokens.

**Simple metaphor:**  
Apartment residents use a different key than visitors — delivery drivers cannot enter every unit.

---

### Network Segmentation

**Network segmentation** splits the network into **zones**:

- Public zone — gateway and frontend only.
- Private zone — databases, Redis, internal APIs.
- No direct route from the internet to the database port.

**Simple metaphor:**  
School visitors stay in the office. Students stay in classrooms. The server room is locked separately.

---

### Secrets Manager

A **secrets manager** (AWS Secrets Manager, Azure Key Vault, HashiCorp Vault) stores passwords and API keys **outside** source code.

Developers and servers fetch secrets at runtime — keys rotate without redeploying entire codebases.

**Simple metaphor:**  
School master keys live in the principal’s safe — not taped under every teacher’s desk.

---

### TLS (Transport Layer Security)

**TLS** encrypts data **in transit** — while it travels across the internet.

You know it is working when the browser shows the **padlock** and `https://`.

Without TLS, passwords and patient data are like **postcards** everyone along the route could read.

**Simple metaphor:**  
Speaking through a encrypted walkie-talkie instead of yelling across a crowded playground.

---

### WAF (Web Application Firewall)

A **WAF** is a **security guard** that inspects every HTTP request **before** it reaches your app.

It can block:

- Known attack patterns (SQL injection probes, XSS attempts).
- Bots scanning for vulnerabilities.
- Traffic from banned countries (if configured).

**Simple metaphor:**  
Airport security scanning bags — most people pass through, suspicious items get stopped.

---

### DDoS Protection

**DDoS** (Distributed Denial of Service) is when attackers flood your site with **millions of fake visitors** to knock it offline — like ten thousand people blocking your shop door so real customers cannot enter.

Protection layers:

- **Cloud shield** (AWS Shield, Cloudflare) absorbs huge traffic spikes.
- **Rate limiting** at gateway and app.
- **Redis-backed counters** across many servers.

**Simple metaphor:**  
A crowd-control fence and ticket system so a mob cannot crush the entrance.

---

## 10. Final Rating

### Our Score: **8.7 / 10**

That is a **very strong** security rating — like getting an **A** on a hard exam. Most real-world SaaS products would be happy here. We are not perfect yet, which is why it is not 10/10.

---

### Why 8.7 Is “Very Strong”

Here is what we do **really well** (these earned most of the points):

| Area | Score impact | Why |
|------|--------------|-----|
| Login & cookies | ⭐⭐⭐ | HttpOnly refresh, SameSite strict, secure flag, no refresh in localStorage |
| Token rotation | ⭐⭐⭐ | Refresh tokens rotate and old ones die |
| RBAC + permissions | ⭐⭐⭐ | Roles and fine-grained keys on both UI and API |
| Tenant isolation | ⭐⭐⭐ | Client cannot supply tenantId; all queries scoped |
| Audit logging | ⭐⭐ | Diary of actions + security events |
| Rate limits & brute-force | ⭐⭐ | Redis counters, account lockout, auth rate limits |
| CSP & CSRF | ⭐⭐ | Nonce CSP, double-submit CSRF |
| Encrypted backups | ⭐ | AES-256 backup encryption + restore drill |
| Portal route guards | ⭐⭐ | Edge middleware blocks wrong roles |
| Security tests | ⭐ | Automated regression tests in `security.spec.ts` |

**In kid terms:**  
We have strong locks, ID checks, separate apartments for each clinic, security cameras, a bouncer at the door, and fire drills for backups. That is **better than most treehouse clubs ever built.**

---

### What Is Missing for 10 / 10?

To reach a perfect score, we still need to finish these items:

| Gap | What it means | Kid metaphor |
|-----|---------------|----------------|
| **Token reuse alarm in clinic backend** | Full `TOKEN_REUSE_DETECTED` like auth-service | Cloning detection on every floor, not just the lobby |
| **ClamAV wired to uploads** | Virus scan on every real file upload | X-ray machine actually installed at every entrance (code exists, not hooked up) |
| **Automated JWT key rotation** | Scheduled secret rotation without manual ops | Changing the building master key on a calendar, not only when someone remembers |
| **IP/device binding on refresh (clinic)** | Stronger session fingerprinting | Visitor log with photos, not just names |
| **Production WAF + DDoS edge** | Cloud firewall in front of live traffic | Professional security guard company, not just our own volunteers |
| **Secrets manager in prod** | No `.env` files on servers | Keys in a bank vault, not sticky notes |
| **Full microservice auth unity** | One JWT story across gateway + clinic backend | One ID card works in every wing without confusion |
| **mTLS internal mesh** | Encrypted service-to-service traffic | Whispering between staff rooms, not shouting |

Closing these gaps moves us from **“very strong for a growing SaaS”** to **“enterprise-grade, audit-ready, sleep-well-at-night secure.”**

---

### Rating Breakdown (Simple View)

```text
Authentication     ████████░░  9.0 / 10
Authorization      █████████░  9.2 / 10
Route guards       ████████░░  8.8 / 10
API security       █████████░  9.1 / 10
Tenant isolation   █████████░  9.3 / 10
Audit logging      ████████░░  8.5 / 10
Hardening          ████████░░  8.6 / 10
Operational        ███████░░░  7.8 / 10  (tools ready; prod ops vary by deploy)
Infrastructure     ███████░░░  7.5 / 10  (designed; operator must enable WAF etc.)
─────────────────────────────────────
Overall            ████████░░  8.7 / 10
```

---

## Conclusion

Ordella protects clinic data the way a **well-run hospital** protects patients — not with one magic lock, but with **many layers** that work together.

**When you log in:**

- Your secret refresh pass lives in a **locked cookie pocket** bad scripts cannot read.
- Your access pass expires quickly and renews safely.
- The system remembers who you are and **which clinic** you belong to.

**When you use the app:**

- Your **job badge** (role) decides which wing you enter.
- Your **keys** (permissions) decide which rooms you open.
- Buttons you should not use are hidden — but even if you try tricks, the **server says no**.

**When data is stored:**

- Each clinic lives in its own **apartment** — no peeking at neighbors.
- Important actions are written in a **diary** with time, name, and place.
- Too many wrong password guesses? The door **temporarily locks**.
- Too many knocks per minute? The bouncer **slows people down**.

**When things run in production:**

- **Smoke alarms** (error monitoring) and **checkups** (health checks) watch the system.
- **Security guards** (WAF), **encrypted roads** (TLS), and **crowd fences** (DDoS protection) guard the building from outside.

Our rating of **8.7 out of 10** means we built something **seriously safe** — not a toy app with a password field, but a multi-layered fortress with real engineering behind it. The last 1.3 points are about finishing a few advanced features and turning on production infrastructure that is **designed but depends on deployment**.

If you are a clinic using Ordella, you can trust that we treat your patients’ privacy like treasure. If you are a developer joining the team, read [`security-architecture.md`](./security-architecture.md) for the grown-up version of everything you just learned.

**Stay curious. Stay safe. And never share your password — not even with your cat.** 🐱🔐
