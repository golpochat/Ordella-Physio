import { cn } from "@/lib/cn";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "muted" | "accent";
};

const variantClasses = {
  default: "bg-background",
  muted: "bg-muted/40",
  accent: "bg-accent/30",
};

export function Section({ children, className, id, variant = "default" }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-28", variantClasses[variant], className)}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}
