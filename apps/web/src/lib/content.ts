export const pricingTiers = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    period: "month",
    description: "For solo practitioners getting started.",
    features: [
      "Up to 100 patients",
      "Scheduling & calendar",
      "SOAP notes",
      "Email reminders",
      "Basic reporting",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: 99,
    period: "month",
    description: "For growing clinics with multiple therapists.",
    features: [
      "Unlimited patients",
      "Multi-therapist scheduling",
      "Billing & invoicing",
      "Online payments",
      "Advanced reporting",
      "SMS reminders",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    id: "clinic",
    name: "Clinic",
    price: 199,
    period: "month",
    description: "For multi-location clinics.",
    features: [
      "Everything in Professional",
      "Multi-location support",
      "Role-based access",
      "Custom branding",
      "Priority support",
      "API access",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    period: "custom",
    description: "For large healthcare organizations.",
    features: [
      "Dedicated account manager",
      "Custom integrations",
      "SLA & uptime guarantees",
      "On-premise deployment option",
      "Advanced security & compliance",
      "Training & onboarding",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
] as const;

export const testimonials = [
  {
    quote: "Ordella cut our admin time in half. Scheduling and billing finally live in one place.",
    author: "Dr. Sarah Chen",
    role: "Owner, Peak Performance Physio",
    avatar: "SC",
  },
  {
    quote: "Our therapists love the SOAP notes workflow. Documentation is faster and more consistent.",
    author: "James Morrison",
    role: "Clinical Director, Active Recovery Clinic",
    avatar: "JM",
  },
  {
    quote: "Patient no-shows dropped 30% after we switched to automated reminders.",
    author: "Emily Rodriguez",
    role: "Practice Manager, Motion Health",
    avatar: "ER",
  },
  {
    quote: "The reporting dashboard gives us visibility we never had before. Revenue is up 18%.",
    author: "Michael Park",
    role: "CEO, Restore Physiotherapy Group",
    avatar: "MP",
  },
  {
    quote: "Multi-location support was a game-changer. One platform for all our clinics.",
    author: "Lisa Thompson",
    role: "Operations Lead, BodyWorks Clinics",
    avatar: "LT",
  },
  {
    quote: "Implementation was smooth and the team was incredibly responsive.",
    author: "David Walsh",
    role: "Founder, Walsh Sports Physio",
    avatar: "DW",
  },
] as const;

export const homeFeatures = [
  { title: "Scheduling & Calendar", description: "Smart booking, availability, and blocked slots.", icon: "calendar" },
  { title: "Patient Records", description: "Complete demographics and medical history.", icon: "users" },
  { title: "SOAP Notes", description: "Structured clinical documentation with attachments.", icon: "file-text" },
  { title: "Billing & Invoicing", description: "Generate, issue, and track invoices effortlessly.", icon: "receipt" },
  { title: "Payments", description: "Accept payments and process refunds via Stripe.", icon: "credit-card" },
  { title: "Reporting", description: "Daily metrics, revenue analytics, and performance.", icon: "bar-chart" },
  { title: "Automated Reminders", description: "Email and SMS reminders to reduce no-shows.", icon: "bell" },
] as const;

export const detailedFeatures = [
  {
    id: "scheduling",
    title: "Scheduling & Calendar",
    description: "Manage appointments across therapists with week/day views, availability rules, and blocked slots.",
    icon: "calendar",
  },
  {
    id: "patients",
    title: "Patient Management",
    description: "Centralized patient profiles with demographics, medical records, notes, and billing history.",
    icon: "users",
  },
  {
    id: "notes",
    title: "SOAP Notes",
    description: "Create, edit, and audit structured clinical notes with attachment support.",
    icon: "file-text",
  },
  {
    id: "billing",
    title: "Billing & Payments",
    description: "Invoice generation, line items, payment tracking, and Stripe integration.",
    icon: "credit-card",
  },
  {
    id: "reporting",
    title: "Reporting & Analytics",
    description: "Daily and monthly metrics, appointment analytics, and therapist performance dashboards.",
    icon: "bar-chart",
  },
  {
    id: "communication",
    title: "Communication & Reminders",
    description: "Automated email and SMS reminders, notifications, and patient outreach.",
    icon: "bell",
  },
  {
    id: "locations",
    title: "Multi-location Support",
    description: "Manage multiple clinic locations from a single tenant with location-specific settings.",
    icon: "map-pin",
  },
  {
    id: "access",
    title: "Role-based Access",
    description: "Granular permissions for admins, therapists, staff, and front-desk roles.",
    icon: "shield",
  },
] as const;

export const benefits = [
  { title: "Save time", description: "Automate scheduling, reminders, and billing workflows.", icon: "clock" },
  { title: "Reduce admin work", description: "Less paperwork, fewer manual data entry tasks.", icon: "zap" },
  { title: "Improve patient experience", description: "Seamless booking, reminders, and communication.", icon: "heart" },
  { title: "Increase revenue", description: "Fewer no-shows, faster payments, better insights.", icon: "trending-up" },
] as const;

export const faqItems = [
  {
    question: "Is there a free trial?",
    answer: "Yes. Start with a 14-day free trial — no credit card required.",
  },
  {
    question: "Can I migrate from my current system?",
    answer: "Our team helps you import patient data and configure your clinic during onboarding.",
  },
  {
    question: "Does Ordella support multiple locations?",
    answer: "Yes. Clinic and Enterprise plans include multi-location support with role-based access.",
  },
  {
    question: "Is my data secure?",
    answer: "We use industry-standard encryption, audit trails, and secure cloud infrastructure.",
  },
] as const;
