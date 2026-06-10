# Software Requirements Specification — Ordella Physio

## 1. Overview

Ordella Physio is a multi-tenant SaaS platform for physiotherapy clinics. It provides practice management including patient records, scheduling, clinical documentation, billing, payments, and analytics.

## 2. Goals

- Enable clinics to manage patients, appointments, and staff across multiple locations
- Provide secure, role-based access for clinic administrators, physiotherapists, and receptionists
- Support SOAP note documentation with file attachments
- Integrate billing and Stripe payments
- Send automated SMS/email appointment reminders
- Deliver actionable reporting and metrics

## 3. User Roles

| Role | Permissions |
|------|-------------|
| Super Admin | Platform-wide tenant management |
| Clinic Admin | Full clinic configuration, staff, billing |
| Physiotherapist | Patients, appointments, notes |
| Receptionist | Scheduling, patient intake |
| Billing | Invoices, payments, reports |

## 4. Functional Requirements

### 4.1 Authentication & Authorization
- Email/password login with JWT access tokens and refresh tokens
- Role-based access control (RBAC) scoped to tenant
- Session refresh without re-authentication

### 4.2 Tenant Management
- Create and manage clinic (tenant) profiles
- Manage multiple locations per clinic
- Invite and assign staff with roles

### 4.3 Patient Management
- CRUD patient demographics and contact info
- Search and filter patients by name, phone, email
- Link patients to appointments, notes, and invoices

### 4.4 Appointments
- Create, reschedule, and cancel appointments
- Provider and location-aware calendar views
- Appointment status workflow: scheduled → confirmed → completed / cancelled / no-show

### 4.5 Clinical Notes
- SOAP-structured notes per visit
- File attachments (PDF, images)
- Immutable audit trail after signing

### 4.6 Billing & Payments
- Generate invoices with line items
- Track payment status
- Stripe payment intent integration

### 4.7 Communications
- SMS and email appointment reminders
- Configurable reminder windows (24h, 2h before)

### 4.8 Reporting
- Dashboard metrics: appointments, revenue, no-shows
- Exportable reports by date range and location

## 5. Non-Functional Requirements

- **Security**: TLS in transit, encrypted secrets, tenant data isolation
- **Availability**: 99.9% uptime target for production
- **Performance**: API p95 < 300ms for read operations
- **Scalability**: Horizontally scalable microservices
- **Compliance**: HIPAA-ready architecture (PHI handling policies TBD)

## 6. Out of Scope (v1)

- Telehealth video visits
- Insurance claim submission (EDI)
- Native mobile apps
