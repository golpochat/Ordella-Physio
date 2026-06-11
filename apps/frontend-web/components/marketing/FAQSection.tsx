import { cn } from "@/lib/cn";
import { FAQItem } from "@/components/marketing/FAQItem";

export type FAQEntry = {
  q: string;
  a: string;
};

export type FAQSectionProps = {
  title: string;
  items: FAQEntry[];
  className?: string;
};

export function FAQSection({ title, items, className }: FAQSectionProps) {
  return (
    <section className={cn("marketing-container mb-2xl", className)}>
      <h2 className="mb-md font-display text-3xl font-bold text-foreground">{title}</h2>

      <div className="rounded-lg border bg-card px-xl shadow-soft max-sm:px-lg">
        {items.map((item, index) => (
          <FAQItem
            key={item.q}
            question={item.q}
            answer={item.a}
            defaultOpen={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
