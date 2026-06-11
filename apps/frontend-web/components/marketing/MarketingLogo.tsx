import Image from "next/image";
import { cn } from "@/lib/cn";

export type MarketingLogoProps = {
  priority?: boolean;
  className?: string;
};

export function MarketingLogo({ priority = false, className }: MarketingLogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt="Ordella Physio logo"
      width={160}
      height={32}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={cn("h-8 w-auto", className)}
    />
  );
}
