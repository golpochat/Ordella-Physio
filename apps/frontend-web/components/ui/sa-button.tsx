"use client";

import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export type SaButtonProps = ComponentProps<typeof Button> & {
  tone?: "primary" | "secondary";
};

export function SaButton({ tone = "primary", className, ...props }: SaButtonProps) {
  return (
    <Button
      className={cn(tone === "primary" ? "btn-primary" : "btn-secondary", className)}
      {...props}
    />
  );
}
