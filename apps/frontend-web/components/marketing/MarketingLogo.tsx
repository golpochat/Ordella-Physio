import { cn } from "@/lib/cn";

export type MarketingLogoProps = {
  priority?: boolean;
  className?: string;
};

export function MarketingLogo({ priority = false, className }: MarketingLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG logo; avoids Next/Image optimizer issues
    <img
      src="/logo.svg"
      alt="Ordella Physio logo"
      width={160}
      height={32}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      loading={priority ? "eager" : "lazy"}
      className={cn("marketing-logo", className)}
    />
  );
}
