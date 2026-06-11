import { cn } from "@/lib/cn";
import { marketingHeading } from "@/lib/marketing-ui";

export type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
};

export function SectionHeading({ eyebrow, title, description, centered = false }: SectionHeadingProps) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className="mb-sm text-sm font-semibold uppercase tracking-wide text-brand-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className={marketingHeading.h2}>{title}</h2>
      {description ? (
        <p className={cn("mt-md", marketingHeading.subtitle)}>{description}</p>
      ) : null}
    </div>
  );
}
