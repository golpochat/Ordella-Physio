import { ScrollReveal } from "@/components/marketing/scroll-reveal";
import { cn } from "@/lib/cn";
import { marketingHeading } from "@/lib/marketing-ui";

export type MarketingPageHeroProps = {
  title: string;
  description: string;
  className?: string;
};

export function MarketingPageHero({ title, description, className }: MarketingPageHeroProps) {
  return (
    <section
      className={cn(
        "marketing-container mb-2xl bg-brand-gradient-hero py-3xl text-center",
        className,
      )}
    >
      <ScrollReveal>
        <h1 className={cn("mb-md", marketingHeading.h1)}>{title}</h1>
        <p className={cn("mx-auto max-w-2xl text-lg", marketingHeading.body)}>{description}</p>
      </ScrollReveal>
    </section>
  );
}
