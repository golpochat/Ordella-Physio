export type SuperAdminPortalNavLink = {
  href: string;
  label: string;
};

export const SUPER_ADMIN_PORTAL_NAV: SuperAdminPortalNavLink[] = [
  { href: "/super-admin", label: "Overview" },
  { href: "/super-admin/tenants", label: "Tenants" },
  { href: "/super-admin/users", label: "Users" },
  { href: "/super-admin/roles", label: "Roles" },
  { href: "/super-admin/billing", label: "Billing" },
  { href: "/super-admin/reports", label: "Reports" },
  { href: "/super-admin/system", label: "System" },
  { href: "/super-admin/flags", label: "Feature flags" },
  { href: "/super-admin/settings", label: "Settings" },
  { href: "/super-admin/messages", label: "Messages" },
  { href: "/super-admin/notifications", label: "Notifications" },
  { href: "/super-admin/marketplace", label: "Marketplace" },
  { href: "/super-admin/enterprise", label: "Enterprise" },
];
