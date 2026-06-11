"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export type FAQItemProps = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export function FAQItem({ question, answer, defaultOpen = false }: FAQItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-brand-gray/20 py-md">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="ripple cursor-pointer flex w-full items-center justify-between gap-md text-left"
        aria-expanded={open}
      >
        <span className="font-display text-lg font-semibold text-foreground">{question}</span>
        <span className="shrink-0 text-2xl text-brand-primary" aria-hidden>
          {open ? "−" : "+"}
        </span>
      </button>

      <div
        className={cn(
          "grid transition-all duration-200",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <p className="mt-sm leading-relaxed text-brand-gray">{answer}</p>
        </div>
      </div>
    </div>
  );
}
