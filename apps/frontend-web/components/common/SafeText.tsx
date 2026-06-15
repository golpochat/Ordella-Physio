import type { ReactNode } from "react";

import { escapeHtml } from "@/lib/escape";

type SafeTextProps = {
  value: string;
  as?: "span" | "p" | "div";
  className?: string;
};

export function SafeText({ value, as = "span", className }: SafeTextProps): ReactNode {
  const Tag = as;
  return <Tag className={className}>{escapeHtml(value)}</Tag>;
}
