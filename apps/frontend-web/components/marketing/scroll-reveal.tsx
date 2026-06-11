"use client";

import type { ReactNode } from "react";
import { cn } from "@ordella/shared-ui";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
};

export function ScrollReveal({ children, className }: ScrollRevealProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-500",
        visible ? "animate-fade-in-up opacity-100" : "translate-y-4 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
