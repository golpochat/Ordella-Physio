export type BillingPeriod = "monthly" | "yearly";

export type PricingTier = {
  id: "starter" | "pro" | "enterprise";
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  yearlySavingsLabel?: string;
  features: string[];
  highlighted?: boolean;
  recommended?: boolean;
  cta: string;
  ctaHref: string;
};

export type ComparisonRow = {
  feature: string;
  starter: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
};

export type FeatureItem = {
  title: string;
  description: string;
  icon:
    | "calendar"
    | "billing"
    | "notes"
    | "users"
    | "activity"
    | "settings"
    | "communication"
    | "multitenant";
};

export type SupportedRole = {
  name: string;
  description: string;
};

export type IntegrationItem = {
  name: string;
  description: string;
  category: string;
};

export type SolutionItem = {
  title: string;
  description: string;
  audience: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
};

export type ProductModule = {
  name: string;
  description: string;
};

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    description: "For solo practitioners getting started with digital clinic management.",
    monthlyPrice: "$49",
    yearlyPrice: "$39",
    yearlySavingsLabel: "Save 20% billed yearly",
    features: [
      "Up to 2 therapists",
      "Appointment scheduling",
      "Patient records",
      "Basic billing",
      "Email support",
    ],
    cta: "Start free trial",
    ctaHref: "/register",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing clinics that need advanced workflows and reporting.",
    monthlyPrice: "$99",
    yearlyPrice: "$79",
    yearlySavingsLabel: "Save 20% billed yearly",
    features: [
      "Up to 10 therapists",
      "Clinical notes & templates",
      "Invoicing & payments",
      "Multi-location support",
      "Priority support",
      "Analytics dashboard",
    ],
    highlighted: true,
    recommended: true,
    cta: "Get started",
    ctaHref: "/register",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with custom integrations and compliance needs.",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    features: [
      "Unlimited therapists",
      "Custom integrations",
      "Dedicated account manager",
      "SLA & uptime guarantees",
      "Advanced security & audit logs",
      "On-premise deployment option",
    ],
    cta: "Contact sales",
    ctaHref: "/contact",
  },
];

export const PRICING_COMPARISON_FEATURES: ComparisonRow[] = [
  { feature: "Therapists included", starter: "Up to 2", pro: "Up to 10", enterprise: "Unlimited" },
  { feature: "Appointment scheduling", starter: true, pro: true, enterprise: true },
  { feature: "Patient portal", starter: true, pro: true, enterprise: true },
  { feature: "Clinical notes", starter: false, pro: true, enterprise: true },
  { feature: "Billing & invoicing", starter: "Basic", pro: true, enterprise: true },
  { feature: "Multi-location", starter: false, pro: true, enterprise: true },
  { feature: "Analytics & reporting", starter: false, pro: true, enterprise: true },
  { feature: "Custom integrations", starter: false, pro: false, enterprise: true },
  { feature: "Dedicated support", starter: false, pro: "Priority", enterprise: true },
  { feature: "SLA & uptime guarantees", starter: false, pro: false, enterprise: true },
];

export const PRICING_FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is there a free trial?",
    answer:
      "Yes. Starter and Pro plans include a 14-day free trial with full access to plan features. No credit card is required to start.",
  },
  {
    question: "Can I switch between monthly and yearly billing?",
    answer:
      "You can choose monthly or yearly billing at signup. Yearly plans are billed annually and include a 20% discount compared to monthly pricing.",
  },
  {
    question: "What happens when I outgrow my plan?",
    answer:
      "You can upgrade from Starter to Pro at any time. Our team will help migrate your data seamlessly. Enterprise plans are available for larger organizations.",
  },
  {
    question: "Is there a setup fee?",
    answer:
      "No setup fees for Starter or Pro. Enterprise onboarding includes dedicated implementation support tailored to your organization.",
  },
  {
    question: "Do you offer discounts for nonprofits?",
    answer:
      "We offer special pricing for qualifying nonprofit clinics. Contact our sales team to learn more about available programs.",
  },
];

export const CORE_FEATURES: FeatureItem[] = [
  {
    title: "Smart Scheduling",
    description: "Manage appointments, reminders, and therapist availability in one place.",
    icon: "calendar",
  },
  {
    title: "Patient Management",
    description: "Centralized patient profiles, history, and care pathways.",
    icon: "users",
  },
  {
    title: "Clinical Notes",
    description: "Structured SOAP notes, templates, and secure documentation.",
    icon: "notes",
  },
  {
    title: "Billing & Payments",
    description: "Invoicing, payment tracking, and insurance-ready workflows.",
    icon: "billing",
  },
  {
    title: "Analytics",
    description: "Real-time insights into clinic performance and outcomes.",
    icon: "activity",
  },
  {
    title: "Role-Based Access",
    description: "Tailored dashboards for admins, therapists, staff, and patients.",
    icon: "settings",
  },
];

export const PRODUCT_MODULES: ProductModule[] = [
  { name: "Appointments", description: "Scheduling, calendar sync, and automated reminders." },
  { name: "Patients", description: "Profiles, intake forms, and care history." },
  { name: "Notes", description: "Clinical documentation with templates and audit trails." },
  { name: "Billing", description: "Invoices, payments, and revenue reporting." },
  { name: "Communication", description: "Secure messaging between clinic and patients." },
  { name: "Reporting", description: "Operational and clinical analytics dashboards." },
];

export const SOLUTIONS: SolutionItem[] = [
  {
    title: "For Clinics",
    audience: "Clinic Admins",
    description: "Streamline operations, manage staff, and grow your practice with unified tools.",
  },
  {
    title: "For Therapists",
    audience: "Therapists",
    description: "Focus on patient care with intuitive scheduling, notes, and caseload management.",
  },
  {
    title: "For Patients",
    audience: "Patients",
    description: "Book appointments, view invoices, and access care notes from a simple portal.",
  },
  {
    title: "For Admins",
    audience: "Platform Admins",
    description: "Oversee tenants, monitor system health, and manage organization-wide settings.",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is Ordella Physio?",
    answer:
      "Ordella Physio is a unified practice management platform for physiotherapy clinics. It brings together scheduling, patient records, clinical notes, billing, and role-based portals in one system.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes. All plans include a 14-day free trial with full access to core features. No credit card required to start.",
  },
  {
    question: "Can I migrate from another system?",
    answer:
      "We offer guided migration support on Pro and Enterprise plans. Our team helps import patient data, appointments, and billing history.",
  },
  {
    question: "Is patient data secure?",
    answer:
      "Ordella Physio uses tenant-isolated data storage, encrypted connections, and role-based access controls. Enterprise plans include advanced audit logging and compliance options.",
  },
  {
    question: "Does it support multiple clinic locations?",
    answer:
      "Pro and Enterprise plans support multi-location clinics with centralized administration and per-location reporting.",
  },
  {
    question: "How do patients access their portal?",
    answer:
      "Patients receive an invitation to create an account. They can then book appointments, view invoices, and read shared care notes from their dedicated patient dashboard.",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "welcome-to-ordella",
    title: "Welcome to Ordella Physio",
    excerpt: "Introducing our unified platform for modern physiotherapy practices.",
    date: "2026-01-15",
    author: "Ordella Team",
    category: "Announcements",
  },
  {
    slug: "streamline-clinic-operations",
    title: "5 Ways to Streamline Clinic Operations",
    excerpt: "Practical tips for reducing admin overhead and improving patient experience.",
    date: "2026-02-03",
    author: "Sarah Mitchell",
    category: "Best Practices",
  },
  {
    slug: "role-based-dashboards",
    title: "Why Role-Based Dashboards Matter",
    excerpt: "How tailored workspaces improve efficiency for every member of your clinic.",
    date: "2026-03-10",
    author: "James Chen",
    category: "Product",
  },
];

export const TESTIMONIALS = [
  {
    quote: "Ordella Physio transformed how we manage appointments and billing. Our admin time dropped by 40%.",
    author: "Dr. Emily Hart",
    role: "Clinic Director, Hart Physiotherapy",
  },
  {
    quote: "The therapist dashboard is intuitive. I spend less time on paperwork and more time with patients.",
    author: "Mark Sullivan",
    role: "Senior Physiotherapist",
  },
  {
    quote: "Patients love the portal. Booking and invoice access is seamless.",
    author: "Lisa Park",
    role: "Practice Manager, Peak Performance Clinic",
  },
];

export const LANDING_VALUE_PROPOSITION = {
  headline: "One platform. Every role. Zero friction.",
  paragraphs: [
    "Ordella Physio is a cloud-native practice management platform built specifically for physiotherapy clinics. It connects scheduling, clinical documentation, billing, and patient communication in a single, secure workspace.",
    "Each clinic operates in its own isolated environment with dedicated dashboards for admins, therapists, staff, and patients — so everyone sees exactly what they need, nothing they don't.",
    "From solo practitioners to multi-location enterprises, Ordella scales with your practice without forcing you to stitch together disconnected tools.",
  ],
};

export const LANDING_FEATURES: FeatureItem[] = [
  {
    title: "Appointments",
    description: "Smart scheduling, automated reminders, and real-time availability across your clinic.",
    icon: "calendar",
  },
  {
    title: "Billing",
    description: "Invoicing, payment tracking, and revenue reporting built into every patient journey.",
    icon: "billing",
  },
  {
    title: "Notes",
    description: "Structured clinical documentation with templates, audit trails, and secure sharing.",
    icon: "notes",
  },
  {
    title: "Reporting",
    description: "Operational and clinical analytics to understand performance and patient outcomes.",
    icon: "activity",
  },
  {
    title: "Communication",
    description: "Secure messaging and notifications between your clinic team and patients.",
    icon: "communication",
  },
  {
    title: "Multi-Tenant",
    description: "Each clinic gets an isolated, secure environment with its own data and branding.",
    icon: "multitenant",
  },
];

export const SUPPORTED_ROLES: SupportedRole[] = [
  {
    name: "Super Admin",
    description: "Platform-wide oversight, tenant management, and system health monitoring.",
  },
  {
    name: "Clinic Admin",
    description: "Clinic operations, staff management, billing configuration, and reporting.",
  },
  {
    name: "Therapist",
    description: "Personal schedule, patient caseload, clinical notes, and treatment plans.",
  },
  {
    name: "Patient",
    description: "Self-service booking, invoice access, and shared care notes.",
  },
  {
    name: "Staff",
    description: "Front-desk scheduling, check-ins, and day-to-day clinic coordination.",
  },
  {
    name: "Pharmacy",
    description: "Prescription fulfillment, inventory tracking, and clinic integrations.",
  },
];

export const INTEGRATIONS: IntegrationItem[] = [
  {
    name: "Stripe",
    description: "Accept card payments, manage subscriptions, and reconcile invoices automatically.",
    category: "Payments",
  },
  {
    name: "Email & SMS Providers",
    description: "Appointment reminders, password resets, and patient notifications via SendGrid, Twilio, and more.",
    category: "Communication",
  },
  {
    name: "Observability Stack",
    description: "Prometheus, Grafana, and structured logging for uptime monitoring and incident response.",
    category: "Infrastructure",
  },
];

export const LANDING_SCREENSHOTS = [
  { label: "Clinic dashboard overview", span: "large" as const },
  { label: "Appointment calendar", span: "small" as const },
  { label: "Billing & invoicing", span: "small" as const },
  { label: "Patient portal", span: "small" as const },
];

export const TEAM_PLACEHOLDERS = [
  { name: "Alex Rivera", role: "CEO & Co-founder" },
  { name: "Priya Sharma", role: "CTO & Co-founder" },
  { name: "Tom Bradley", role: "Head of Product" },
  { name: "Nina Okonkwo", role: "Head of Customer Success" },
];

export function getTierPrice(tier: PricingTier, period: BillingPeriod): string {
  return period === "yearly" ? tier.yearlyPrice : tier.monthlyPrice;
}

export function getTierPeriodLabel(period: BillingPeriod): string {
  return period === "yearly" ? "/month, billed yearly" : "/month";
}
