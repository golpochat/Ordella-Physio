import type { LucideIcon } from "lucide-react";
import {
  Activity,
  AlertCircle,
  Bell,
  Calendar,
  CreditCard,
  FileText,
  Home,
  MessageCircle,
  Settings,
  User,
  Users,
} from "@ordella/shared-icons";
import { cn } from "@/lib/cn";

export type NavIconName =
  | "dashboard"
  | "users"
  | "calendar"
  | "patients"
  | "clinic"
  | "inventory"
  | "billing"
  | "settings"
  | "logs"
  | "api"
  | "reports"
  | "messages"
  | "notifications"
  | "marketplace"
  | "enterprise"
  | "notes"
  | "flags"
  | "system";

const ICON_MAP: Record<NavIconName, LucideIcon> = {
  dashboard: Home,
  users: Users,
  calendar: Calendar,
  patients: User,
  clinic: Home,
  inventory: FileText,
  billing: CreditCard,
  settings: Settings,
  logs: FileText,
  api: FileText,
  reports: Activity,
  messages: MessageCircle,
  notifications: Bell,
  marketplace: FileText,
  enterprise: Settings,
  notes: FileText,
  flags: AlertCircle,
  system: Activity,
};

export type NavIconProps = {
  name: NavIconName;
  className?: string;
};

export function NavIcon({ name, className }: NavIconProps) {
  const Icon = ICON_MAP[name] ?? Home;

  return (
    <Icon
      className={cn("nav-icon", className)}
      size={20}
      strokeWidth={1.75}
      aria-hidden
    />
  );
}
