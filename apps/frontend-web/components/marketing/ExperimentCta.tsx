"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import type { CtaLocation } from "@/lib/analytics";
import { CtaLink } from "@/components/marketing/CtaLink";
import Experiment from "@/components/marketing/Experiment";

export type ExperimentCtaVariant = {
  href: string;
  label: string;
  children: string;
  buttonClassName?: string;
  buttonVariant?: "primary" | "outline";
};

export type ExperimentCtaProps = {
  experimentId: string;
  location: CtaLocation;
  variantA: ExperimentCtaVariant;
  variantB: ExperimentCtaVariant;
  size?: "sm" | "lg" | "default";
  className?: string;
};

function renderVariant(
  config: ExperimentCtaVariant,
  location: CtaLocation,
  experimentId: string,
  experimentVariant: "A" | "B",
  size: ExperimentCtaProps["size"],
) {
  return (
    <Button
      asChild
      size={size}
      variant={config.buttonVariant === "outline" ? "outline" : "primary"}
      className={config.buttonClassName}
    >
      <CtaLink
        href={config.href}
        location={location}
        label={config.label}
        experimentId={experimentId}
        experimentVariant={experimentVariant}
      >
        {config.children}
      </CtaLink>
    </Button>
  );
}

export function ExperimentCta({
  experimentId,
  location,
  variantA,
  variantB,
  size = "lg",
  className,
}: ExperimentCtaProps) {
  return (
    <div className={cn(className?.includes("w-full") ? "flex w-full" : "inline-flex", className)}>
      <Experiment
        id={experimentId}
        A={renderVariant(variantA, location, experimentId, "A", size)}
        B={renderVariant(variantB, location, experimentId, "B", size)}
      />
    </div>
  );
}
