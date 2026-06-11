import { ProductMockup, type ProductMockupProps } from "@/components/marketing/product-mockup";
import { cn } from "@/lib/cn";

export type ProductModuleProps = {
  title: string;
  description: string;
  reverse?: boolean;
  variant?: ProductMockupProps["variant"];
  className?: string;
};

export function ProductModule({
  title,
  description,
  reverse = false,
  variant = "dashboard",
  className,
}: ProductModuleProps) {
  return (
    <article className={cn("product-module", reverse && "reverse", className)}>
      <div className="product-module-text">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="product-module-image">
        <ProductMockup variant={variant} />
      </div>
    </article>
  );
}
