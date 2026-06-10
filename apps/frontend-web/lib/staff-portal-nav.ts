export type StaffPortalNavLink = {
  href: string;
  label: string;
};

export const STAFF_PORTAL_NAV: StaffPortalNavLink[] = [
  { href: "/staff", label: "Overview" },
  { href: "/staff/appointments", label: "Appointments" },
  { href: "/staff/patients", label: "Patients" },
  { href: "/staff/billing", label: "Billing" },
  { href: "/staff/notes", label: "Notes" },
  { href: "/staff/messages", label: "Messages" },
  { href: "/staff/notifications", label: "Notifications" },
  { href: "/staff/reports", label: "Reports" },
  { href: "/staff/profile", label: "Profile" },
];
