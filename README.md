# Ordella Clinic Management System

A multi-tenant, internal-use clinic management platform for Admins, Staff, and Clinicians. Patients do not log in. All operations are performed internally by clinic personnel.

This README provides complete setup instructions for running the project locally, understanding the architecture, and contributing to development.

---

## 🚀 Features
- Multi-tenant architecture
- RBAC (Admin, Staff, Clinician)
- Patient management
- Appointment scheduling
- Therapist workflows
- Billing & payments
- Clinical notes
- Reporting
- PDF statement generation
- Email notifications
- Secure internal-use design

---

## 🏗 Tech Stack
### Backend
- Node.js + TypeScript
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication

### Frontend
- Next.js (App Router)
- React
- TailwindCSS
- ShadCN UI

### Other
- Nodemailer (email)
- PDFKit / Puppeteer (PDF generation)
- Docker (optional)

---

## 📁 Folder Structure
```
/backend
  /src
    /modules
      /auth
      /patients
      /appointments
      /therapists
      /staff
      /billing
      /notes
      /reports
      /notifications
      /rbac
      /statements
    /utils
  prisma/schema.prisma

/apps/frontend-web
  /app
    /clinic
    /staff
    /therapist
    /patient
  /components
  /lib
  /styles

/docs
  master-index.md
```

---

## 🔧 Environment Variables

### Backend `.env`
```
DATABASE_URL="postgresql://user:password@localhost:5432/ordella"
JWT_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret-key"
EMAIL_HOST="smtp.example.com"
EMAIL_USER="your-email"
EMAIL_PASS="your-password"
```

### Frontend `.env.local`
```
NEXT_PUBLIC_APP_URL="http://localhost:3010"
USE_CLINIC_BACKEND=true
CLINIC_BACKEND_INTERNAL_URL="http://localhost:4000"
NEXT_PUBLIC_DEFAULT_TENANT_ID="demo-clinic"
```

---

## 🛠 Backend Setup

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Generate Prisma client
```bash
npx prisma generate
```

### 3. Run database migrations
```bash
npx prisma migrate dev
```

### 4. (Optional) Seed the database
```bash
npm run prisma:seed
```

### 5. Start the backend server
```bash
npm run dev
```

Backend runs at:  
http://localhost:4000

---

## 🎨 Frontend Setup

### 1. Install dependencies
```bash
cd apps/frontend-web
npm install
```

### 2. Start the frontend
```bash
npm run dev
```

Frontend runs at:  
http://localhost:3010

---

## 🧪 Running in Production

### Backend
```bash
npm run build
npm run start
```

### Frontend
```bash
npm run build
npm run start
```

---

## 📊 Database Management

### View Prisma Studio
```bash
npx prisma studio
```

### Reset database
```bash
npx prisma migrate reset
```

---

## 📬 Email Testing (Local)
Use Mailtrap or Ethereal:  
https://mailtrap.io  
https://ethereal.email  

---

## 🧾 Generate Patient Statement (PDF)
Backend endpoints:  
GET /patients/:id/statement/pdf  
POST /patients/:id/statement/email  

---

## 🔐 RBAC Overview
- Admin: Full access  
- Staff: Patient + appointment + billing operations  
- Clinician: Own appointments + notes  
- Patient: No system access  

---

## 🧩 Contributing
1. Fork the repo  
2. Create a feature branch  
3. Commit changes  
4. Open a pull request  

---

## 🐛 Troubleshooting

### Backend not connecting to DB?
- Check DATABASE_URL  
- Ensure PostgreSQL is running  

### Prisma errors?
```bash
npx prisma generate
npx prisma migrate dev
```

### Frontend cannot reach backend?
- Check `CLINIC_BACKEND_INTERNAL_URL` and `USE_CLINIC_BACKEND=true` in `.env.local`

---

## 📄 License
MIT License  

---

## 👨‍💻 Author
Built by Sujan — Ordella Founder & Lead Engineer.
