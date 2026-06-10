import type { LucideIcon, LucideProps } from "lucide-react";
import { cn } from "../utils/cn";

export type IconProps = LucideProps & {
  icon: LucideIcon;
};

export function Icon({ icon: IconComponent, className, ...props }: IconProps) {
  return <IconComponent className={cn("h-4 w-4 shrink-0", className)} aria-hidden {...props} />;
}
