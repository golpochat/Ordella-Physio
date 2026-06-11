import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type FeatureGridProps = {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
  stagger?: boolean;
};

const columnClasses: Record<NonNullable<FeatureGridProps["columns"]>, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function FeatureGrid({
  children,
  columns = 3,
  className,
  stagger = true,
}: FeatureGridProps) {
  return (
    <div
      className={cn(
        "grid gap-xl",
        columnClasses[columns],
        stagger && "animate-stagger",
        className,
      )}
    >
      {children}
    </div>
  );
}
