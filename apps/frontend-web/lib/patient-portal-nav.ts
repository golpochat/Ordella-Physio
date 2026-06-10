export type PatientPortalNavLink = {
  href: string;
  label: string;
};

export const PATIENT_PORTAL_NAV: PatientPortalNavLink[] = [
  { href: "/patient", label: "Home" },
  { href: "/patient/appointments", label: "Appointments" },
  { href: "/patient/billing", label: "Billing" },
  { href: "/patient/notes", label: "Notes" },
  { href: "/patient/messages", label: "Messages" },
  { href: "/patient/notifications", label: "Notifications" },
  { href: "/patient/profile", label: "Profile" },
];
