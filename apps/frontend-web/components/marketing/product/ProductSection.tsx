import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ProductSectionProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  className?: string;
};

export function ProductSection({ title, subtitle, children, className }: ProductSectionProps) {
  return (
    <section className={cn("product-section marketing-container", className)}>
      <h2 className="product-title">{title}</h2>
      <p className="product-subtitle">{subtitle}</p>
      <div className="product-section-content">{children}</div>
    </section>
  );
}
