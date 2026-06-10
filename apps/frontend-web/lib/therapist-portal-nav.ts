export type TherapistPortalNavLink = {
  href: string;
  label: string;
};

export const THERAPIST_PORTAL_NAV: TherapistPortalNavLink[] = [
  { href: "/therapist", label: "Home" },
  { href: "/therapist/appointments", label: "Appointments" },
  { href: "/therapist/patients", label: "Patients" },
  { href: "/therapist/notes", label: "Notes" },
  { href: "/therapist/billing", label: "Billing" },
  { href: "/therapist/messages", label: "Messages" },
  { href: "/therapist/notifications", label: "Notifications" },
  { href: "/therapist/profile", label: "Profile" },
];
