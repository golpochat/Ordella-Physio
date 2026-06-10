export const SITE_NAME = "Ordella Physio";
export const SITE_DESCRIPTION =
  "Modern physiotherapy practice management — scheduling, clinical notes, billing, payments, and patient care in one platform.";

export const SUPPORT_EMAIL = "support@ordella.com";
export const SALES_EMAIL = "sales@ordella.com";

export const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_LINKS = {
  product: [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/legal/privacy", label: "Privacy Policy" },
    { href: "/legal/terms", label: "Terms of Service" },
  ],
} as const;

export const FEATURES = [
  {
    title: "Patient Management",
    description: "Centralized profiles, medical history, and care plans for every patient.",
    icon: "users",
  },
  {
    title: "Smart Scheduling",
    description: "Availability, blocked slots, and automated reminders reduce no-shows.",
    icon: "calendar",
  },
  {
    title: "Clinical Notes",
    description: "SOAP notes, progress tracking, and secure attachments in one workflow.",
    icon: "file-text",
  },
  {
    title: "Billing & Invoicing",
    description: "Generate invoices, apply tax rates, and track outstanding balances.",
    icon: "receipt",
  },
  {
    title: "Payments",
    description: "Collect payments online with refunds and reconciliation built in.",
    icon: "credit-card",
  },
  {
    title: "Communication",
    description: "Email and SMS notifications, reminders, and patient messaging.",
    icon: "message-square",
  },
  {
    title: "Reporting",
    description: "Daily and monthly metrics with exportable insights for your clinic.",
    icon: "bar-chart",
  },
  {
    title: "Multi-tenant",
    description: "Manage multiple locations and staff with role-based access control.",
    icon: "building",
  },
] as const;

export const PRICING_TIERS = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 49,
    yearlyPrice: 470,
    description: "For solo practitioners getting started.",
    features: ["Up to 2 therapists", "500 patients", "Appointments & notes", "Email support"],
    highlighted: false,
  },
  {
    id: "professional",
    name: "Professional",
    monthlyPrice: 129,
    yearlyPrice: 1238,
    description: "For growing clinics that need full operations.",
    features: [
      "Up to 10 therapists",
      "Unlimited patients",
      "Billing & payments",
      "Communication suite",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: 299,
    yearlyPrice: 2870,
    description: "For multi-location practices at scale.",
    features: [
      "Unlimited therapists",
      "Multi-location",
      "Advanced reporting",
      "Custom integrations",
      "Dedicated success manager",
    ],
    highlighted: false,
  },
] as const;

export const TESTIMONIALS = [
  {
    quote: "Ordella transformed how we run our clinic. Scheduling and billing are finally in sync.",
    author: "Dr. Sarah Mitchell",
    role: "Clinical Director, Peak Physio",
    rating: 5,
  },
  {
    quote: "Our therapists love the SOAP notes workflow. Documentation time dropped by 40%.",
    author: "James Okonkwo",
    role: "Owner, Restore Movement",
    rating: 5,
  },
  {
    quote: "Patient reminders alone paid for the subscription within the first month.",
    author: "Emily Chen",
    role: "Practice Manager, Align Health",
    rating: 5,
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Is there a free trial?",
    answer: "Yes. Every plan includes a 14-day free trial with full access to core features.",
  },
  {
    question: "Can I migrate from another system?",
    answer: "Our team provides guided migration support for patient records and appointment history.",
  },
  {
    question: "Is patient data secure?",
    answer: "Ordella uses encryption in transit and at rest with tenant-isolated data storage.",
  },
  {
    question: "Do you support multiple locations?",
    answer: "Professional and Enterprise plans support multiple locations under one tenant.",
  },
] as const;

export const STATS = [
  { label: "Clinics onboarded", value: "500+" },
  { label: "Appointments managed", value: "2M+" },
  { label: "Patient satisfaction", value: "98%" },
  { label: "Uptime SLA", value: "99.9%" },
] as const;

export const INTEGRATIONS = [
  "Stripe",
  "Twilio",
  "Google Calendar",
  "Xero",
  "Mailchimp",
  "Zapier",
] as const;

export const MODULE_FEATURES = [
  { slug: "patients", title: "Patients", description: "Profiles, medical records, and search." },
  { slug: "appointments", title: "Appointments", description: "Calendar, availability, and blocked slots." },
  { slug: "notes", title: "Notes", description: "SOAP notes and clinical documentation." },
  { slug: "billing", title: "Billing", description: "Invoices, items, and tax rates." },
  { slug: "payments", title: "Payments", description: "Online payments and refunds." },
  { slug: "communication", title: "Communication", description: "Notifications and reminders." },
  { slug: "reporting", title: "Reporting", description: "Dashboards and exportable metrics." },
] as const;

export const TEAM = [
  { name: "Alex Rivera", role: "CEO & Co-founder" },
  { name: "Priya Sharma", role: "CTO & Co-founder" },
  { name: "Marcus Lee", role: "Head of Product" },
  { name: "Nina Kowalski", role: "Head of Customer Success" },
] as const;

export const TIMELINE = [
  { year: "2022", title: "Founded", description: "Ordella started with a mission to modernize physio ops." },
  { year: "2023", title: "First 100 clinics", description: "Launched billing and payments modules." },
  { year: "2024", title: "Multi-tenant platform", description: "Expanded to enterprise multi-location support." },
  { year: "2025", title: "Global reach", description: "Serving clinics across UK, EU, and APAC." },
] as const;
