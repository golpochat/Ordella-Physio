"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@ordella/shared-ui";
import Link from "next/link";
import type { ReactNode } from "react";

export type DropdownItem = {
  label: string;
  onSelect?: () => void;
  href?: string;
  destructive?: boolean;
};

export type DropdownProps = {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: "start" | "center" | "end";
};

const itemClassName = (destructive?: boolean) =>
  cn(
    "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
    "focus:bg-accent focus:text-accent-foreground",
    destructive && "text-destructive focus:text-destructive",
  );

export function Dropdown({ trigger, items, align = "end" }: DropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align={align}
          className={cn(
            "z-50 min-w-[10rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          )}
        >
          {items.map((item) =>
            item.href ? (
              <DropdownMenu.Item key={item.label} asChild>
                <Link href={item.href} className={itemClassName(item.destructive)}>
                  {item.label}
                </Link>
              </DropdownMenu.Item>
            ) : (
              <DropdownMenu.Item
                key={item.label}
                className={itemClassName(item.destructive)}
                onSelect={item.onSelect}
              >
                {item.label}
              </DropdownMenu.Item>
            ),
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
