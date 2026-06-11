import { cn } from "@/lib/cn";

export const marketingCardClass = cn(
  "marketing-card card-tilt rounded-lg bg-card p-xl shadow-soft",
  "transition-all duration-200 hover:-translate-y-1 hover:shadow-medium",
);

export const marketingGridCards = "grid grid-cols-1 gap-lg md:grid-cols-2 lg:grid-cols-3";
export const marketingGridCardsLarge = "grid grid-cols-1 gap-2xl lg:grid-cols-2";
export const marketingGridCardsCompact = "grid grid-cols-1 gap-lg sm:grid-cols-2 lg:grid-cols-3";

export const marketingHeading = {
  h1: "font-display text-5xl font-bold leading-tight text-foreground",
  h2: "font-display text-4xl font-bold leading-tight text-foreground",
  h3: "font-display text-2xl font-semibold leading-normal text-foreground",
  h4: "font-display text-xl font-semibold leading-normal text-foreground",
  subtitle: "max-w-2xl text-lg leading-relaxed text-brand-gray",
  body: "leading-relaxed text-brand-gray",
} as const;

export const marketingSectionClass = {
  hero: "marketing-container py-3xl",
  major: "marketing-container py-2xl",
  sub: "marketing-container py-xl",
} as const;

export const marketingButtonPrimaryClass = cn(
  "btn-lift ripple scale-soft rounded-md px-xl py-md font-semibold shadow-soft",
  "bg-brand-primary text-white",
);

export const marketingButtonSecondaryClass = cn(
  "btn-lift ripple rounded-md border border-brand-primary px-xl py-md font-semibold shadow-soft",
  "bg-white text-brand-primary",
);
