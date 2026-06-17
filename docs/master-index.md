# MASTER INDEX DOCUMENT
## Ordella Clinic Management System — Internal‑Use SaaS Architecture Blueprint

> **Live implementation tracker:** [implementation-audit-tracker.md](./implementation-audit-tracker.md) — what is built, what appears on the website, gaps, and phased roadmap (updated 2026-06-16).  
> **Billing:** [billing-architecture.md](./billing-architecture.md) · **JWT rotation:** [runbooks/jwt-rotation.md](./runbooks/jwt-rotation.md)

### 1. SYSTEM OVERVIEW
Ordella is a multi-tenant, internal-use clinic management platform designed for:
- Clinic Admins
- Staff (Reception / Front Desk)
- Clinicians (GP, Nurse, Doctor, Therapist)

Patients do not log in. All operations are performed internally by clinic personnel.

The system supports:
- Patient management
- Appointment scheduling
- Therapist workflows
- Billing & payments
- Notes & clinical documentation
- Reporting
- Notifications
- PDF statement generation

---

### 2. CORE MODULES

#### 2.1 Authentication Module
- JWT-based authentication
- Multi-tenant context extraction
- Role assignment (Admin, Staff, Clinician)
- Session management

#### 2.2 RBAC Module
- Permission maps per role
- Route guards
- Audit logging for sensitive actions

#### 2.3 Patient Module
- Patient CRUD
- Search & filters
- Patient profile viewer
- Appointment history
- Billing history
- Notes history
- Attachments

#### 2.4 Appointment Module
- Appointment CRUD
- Therapist availability
- Conflict detection
- Status transitions
- Calendar views
- Therapist schedule

#### 2.5 Therapist Module
- Therapist CRUD
- Working hours
- Services offered
- Own schedule management

#### 2.6 Staff Module
- Staff CRUD
- Role assignment
- Profile management

#### 2.7 Billing Module
- Invoice creation (manual + auto)
- Payment recording
- Outstanding balance calculation
- Invoice PDF generation

#### 2.8 Notes Module
- Clinical notes
- SOAP notes (optional)
- Attachments
- Session completion

#### 2.9 Reporting Module
- Appointments report
- Revenue report
- Patient activity report
- Export to CSV/PDF

#### 2.10 Notification Module
- Email templates
- Appointment confirmations
- Invoice emails
- Statement delivery

#### 2.11 Patient Statement Module
- Full service history
- Billing summary
- Payment summary
- PDF generation
- Email delivery

---

### 3. DATABASE MODELS (PRISMA)

#### 3.1 Tenant
- id, name, domain, createdAt

#### 3.2 User
- id, tenantId, name, email, phone, role, passwordHash

#### 3.3 Patient
- id, tenantId, name, email, phone, dob, gender, address, createdAt

#### 3.4 Therapist
- id, tenantId, userId, specialties, workingHours

#### 3.5 Appointment
- id, tenantId, patientId, therapistId, service, date, startTime, endTime, status, notes

#### 3.6 Invoice
- id, tenantId, patientId, appointmentId, amount, status, issuedAt

#### 3.7 Payment
- id, invoiceId, amount, method, paidAt

#### 3.8 Note
- id, appointmentId, therapistId, content, createdAt

#### 3.9 AuditLog
- id, userId, action, entity, entityId, timestamp

---

### 4. API ENDPOINT INDEX

#### 4.1 Auth
- POST /auth/login
- POST /auth/logout

#### 4.2 Patients
- GET /patients
- POST /patients
- GET /patients/:id
- PUT /patients/:id
- DELETE /patients/:id

#### 4.3 Appointments
- GET /appointments
- POST /appointments
- GET /appointments/:id
- PUT /appointments/:id
- DELETE /appointments/:id

#### 4.4 Therapists
- GET /therapists
- POST /therapists
- GET /therapists/:id
- PUT /therapists/:id

#### 4.5 Billing
- GET /invoices
- POST /invoices
- POST /payments
- GET /invoices/:id/pdf

#### 4.6 Notes
- POST /appointments/:id/notes
- GET /appointments/:id/notes

#### 4.7 Reports
- GET /reports/appointments
- GET /reports/revenue
- GET /reports/patients

#### 4.8 Patient Statement
- GET /patients/:id/statement/pdf
- POST /patients/:id/statement/email

---

### 5. ROLE-BASED ACCESS CONTROL (RBAC)

#### Admin
- Full access to all modules

#### Staff
- Create/edit patients
- Create/edit appointments
- View billing
- Generate statements
- View notes (read-only)

#### Clinician
- View all patients
- Create/edit own appointments
- Add clinical notes
- Complete sessions

#### Patient
- No system access

---

### 6. FRONTEND ROUTES

#### /clinic (Admin Portal)
- Dashboard, Patients, Appointments, Therapists, Staff, Billing, Reports, Settings

#### /staff (Staff Portal)
- Dashboard, Patients, Appointments, Billing, Reports

#### /therapist (Clinician Portal)
- Schedule, Patients, Notes, Billing (read-only)

#### /patient (Internal Profile Viewer)
- Patient profile, Appointment history, Billing history, Notes (restricted)

---

### 7. WORKFLOW SUMMARY
1. Staff creates patient  
2. Staff schedules appointment  
3. Therapist completes session + notes  
4. Billing generates invoice  
5. Payment recorded  
6. Reports update  
7. Patient statement can be generated + emailed

---

### 8. NOTIFICATION EVENTS
- Appointment confirmation  
- Appointment cancellation  
- Invoice issued  
- Payment received  
- Patient statement delivered

---

### 9. SECURITY & COMPLIANCE
- Multi-tenant isolation  
- RBAC enforcement  
- Audit logging  
- Secure PDF generation  
- Email verification  
- Data encryption at rest & in transit
