import type { LucideIcon } from "lucide-react";
import { Clock, Mail, MapPin } from "@ordella/shared-icons";
import { cn } from "@/lib/cn";

const CONTACT_ICONS = {
  mail: Mail,
  location: MapPin,
  hours: Clock,
} as const;

export type ContactDetailIcon = keyof typeof CONTACT_ICONS;

export type ContactDetailProps = {
  icon: ContactDetailIcon;
  label: string;
  value: string;
};

export function ContactDetail({ icon, label, value }: ContactDetailProps) {
  const Icon = CONTACT_ICONS[icon] as LucideIcon;

  return (
    <div className="flex items-start gap-md">
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand-primary",
        )}
        aria-hidden
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-display font-semibold text-foreground">{label}</p>
        <p className="text-brand-gray">{value}</p>
      </div>
    </div>
  );
}
