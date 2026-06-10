export type ClinicPortalNavLink = {
  href: string;
  label: string;
};

export const CLINIC_PORTAL_NAV: ClinicPortalNavLink[] = [
  { href: "/clinic", label: "Overview" },
  { href: "/clinic/therapists", label: "Therapists" },
  { href: "/clinic/patients", label: "Patients" },
  { href: "/clinic/appointments", label: "Appointments" },
  { href: "/clinic/billing", label: "Billing" },
  { href: "/clinic/notes", label: "Notes" },
  { href: "/clinic/staff", label: "Staff" },
  { href: "/clinic/roles", label: "Roles" },
  { href: "/clinic/reports", label: "Reports" },
  { href: "/clinic/messages", label: "Messages" },
  { href: "/clinic/notifications", label: "Notifications" },
  { href: "/clinic/profile", label: "Profile" },
];
