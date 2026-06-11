import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";
import { marketingHeading } from "@/lib/marketing-ui";

export type HomeSectionProps = {
  title: string;
  titleId?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  centered?: boolean;
};

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function HomeSection({
  title,
  titleId,
  subtitle,
  children,
  className,
  centered = false,
}: HomeSectionProps) {
  const resolvedTitleId = titleId ?? `section-${slugifyTitle(title)}`;

  return (
    <section
      className={cn("marketing-container py-2xl max-sm:py-xl", className)}
      aria-labelledby={resolvedTitleId}
    >
      <ScrollReveal>
        <h2
          id={resolvedTitleId}
          className={cn("mb-md", marketingHeading.h2, centered && "text-center")}
        >
          {title}
        </h2>
        {subtitle ? (
          <p
            className={cn(
              "mb-xl",
              marketingHeading.subtitle,
              centered && "mx-auto text-center",
            )}
          >
            {subtitle}
          </p>
        ) : null}
        {children}
      </ScrollReveal>
    </section>
  );
}
