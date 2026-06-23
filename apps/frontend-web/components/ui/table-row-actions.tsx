"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Check, Copy, Download, Eye, Pencil, Settings, Trash2, X } from "@ordella/shared-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const ACTION_ICONS = {
  view: Eye,
  edit: Pencil,
  delete: Trash2,
  settings: Settings,
  copy: Copy,
  download: Download,
  save: Check,
  cancel: X,
} as const;

export type TableActionIcon = keyof typeof ACTION_ICONS;

export type TableRowActionsProps = {
  children: ReactNode;
  className?: string;
};

export function TableRowActions({ children, className }: TableRowActionsProps) {
  return <div className={cn("table-row-actions", className)}>{children}</div>;
}

export type TableActionLinkProps = {
  href: string;
  label: string;
  icon: TableActionIcon;
};

export function TableActionLink({ href, label, icon }: TableActionLinkProps) {
  const Icon = ACTION_ICONS[icon];

  return (
    <Button asChild variant="ghost" size="icon" aria-label={label}>
      <Link href={href}>
        <Icon className="h-4 w-4" />
      </Link>
    </Button>
  );
}

export type TableActionButtonProps = {
  label: string;
  icon: TableActionIcon;
  onClick: () => void;
  destructive?: boolean;
  disabled?: boolean;
};

export function TableActionButton({
  label,
  icon,
  onClick,
  destructive = false,
  disabled = false,
}: TableActionButtonProps) {
  const Icon = ACTION_ICONS[icon];

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={destructive ? "text-destructive hover:text-destructive" : undefined}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
