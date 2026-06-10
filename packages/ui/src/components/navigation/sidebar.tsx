import * as React from "react";
import { cn } from "../../utils/cn";

export function Sidebar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <aside
      className={cn("flex h-full w-64 flex-col border-r bg-card text-card-foreground", className)}
      {...props}
    />
  );
}

export type SidebarItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  icon?: React.ReactNode;
};

export function SidebarItem({ className, active, icon, children, ...props }: SidebarItemProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

export function Topbar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-14 items-center border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80",
        className,
      )}
      {...props}
    />
  );
}

export function Breadcrumbs({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1 text-sm text-muted-foreground", className)} {...props} />
  );
}

export function BreadcrumbItem({
  className,
  active,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { active?: boolean }) {
  return (
    <span
      className={cn(active ? "font-medium text-foreground" : "hover:text-foreground", className)}
      {...props}
    />
  );
}

export function BreadcrumbSeparator() {
  return <span className="px-1 text-muted-foreground">/</span>;
}
