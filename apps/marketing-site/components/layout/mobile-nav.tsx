"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@ordella/ui";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/content";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <nav className="flex flex-col gap-4 px-6 pb-8" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <DrawerClose key={link.href} asChild>
              <Link href={link.href} className="text-base font-medium">
                {link.label}
              </Link>
            </DrawerClose>
          ))}
          <DrawerClose asChild>
            <Button asChild className="w-full">
              <Link href="/pricing">Start Free Trial</Link>
            </Button>
          </DrawerClose>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
