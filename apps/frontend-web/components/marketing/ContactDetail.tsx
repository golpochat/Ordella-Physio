import type { ReactNode } from "react";

export type ContactDetailProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

export function ContactDetail({ icon, label, value }: ContactDetailProps) {
  return (
    <div className="flex items-start gap-md">
      <div className="text-3xl text-brand-primary" aria-hidden>
        {icon}
      </div>
      <div>
        <p className="font-display font-semibold text-foreground">{label}</p>
        <p className="text-brand-gray">{value}</p>
      </div>
    </div>
  );
}
