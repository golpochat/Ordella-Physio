export type PharmacyPortalNavLink = {
  href: string;
  label: string;
};

export const PHARMACY_PORTAL_NAV: PharmacyPortalNavLink[] = [
  { href: "/pharmacy", label: "Overview" },
  { href: "/pharmacy/prescriptions", label: "Prescriptions" },
  { href: "/pharmacy/fulfillment", label: "Fulfillment" },
  { href: "/pharmacy/patients", label: "Patients" },
  { href: "/pharmacy/billing", label: "Billing" },
  { href: "/pharmacy/messages", label: "Messages" },
  { href: "/pharmacy/notifications", label: "Notifications" },
  { href: "/pharmacy/reports", label: "Reports" },
  { href: "/pharmacy/profile", label: "Profile" },
];
