export type UserPortalNavLink = {
  href: string;
  label: string;
};

export const USER_PORTAL_NAV: UserPortalNavLink[] = [
  { href: "/user", label: "Overview" },
  { href: "/user/appointments", label: "Appointments" },
  { href: "/user/billing", label: "Billing" },
  { href: "/user/notes", label: "Notes" },
  { href: "/user/messages", label: "Messages" },
  { href: "/user/notifications", label: "Notifications" },
  { href: "/user/profile", label: "Profile" },
];
