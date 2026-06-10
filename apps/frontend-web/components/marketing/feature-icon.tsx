import {
  Activity,
  Bell,
  Calendar,
  CreditCard,
  FileText,
  Settings,
  Users,
} from "@ordella/shared-icons";
import type { FeatureItem } from "@/lib/marketing-content";

const ICON_MAP = {
  calendar: Calendar,
  billing: CreditCard,
  notes: FileText,
  users: Users,
  activity: Activity,
  settings: Settings,
  communication: Bell,
  multitenant: Settings,
} as const;

export function FeatureIcon({ icon }: { icon: FeatureItem["icon"] }) {
  const Icon = ICON_MAP[icon];
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
      <Icon className="h-6 w-6" />
    </div>
  );
}
