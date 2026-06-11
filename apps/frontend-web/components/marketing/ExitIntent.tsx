"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/marketing/CtaLink";
import { trackEvent } from "@/lib/analytics";
import { marketingButtonPrimaryClass } from "@/lib/marketing-ui";

const DISMISS_STORAGE_KEY = "ordella_exit_intent_dismissed";

export default function ExitIntent() {
  const [show, setShow] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const dismiss = useCallback(() => {
    sessionStorage.setItem(DISMISS_STORAGE_KEY, "true");
    setShow(false);
    trackEvent("exit_intent_dismissed");
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_STORAGE_KEY) === "true") {
      return;
    }

    const handleLeave = (event: MouseEvent) => {
      if (event.clientY <= 0 && !show) {
        setShow(true);
        trackEvent("exit_intent_shown");
      }
    };

    document.addEventListener("mouseleave", handleLeave);
    return () => document.removeEventListener("mouseleave", handleLeave);
  }, [show]);

  useEffect(() => {
    if (!show) {
      return;
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismiss();
      }
    };

    window.addEventListener("keydown", handleKey);
    dialogRef.current?.focus();

    return () => window.removeEventListener("keydown", handleKey);
  }, [show, dismiss]);

  if (!show) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-md"
      role="presentation"
      onClick={dismiss}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-title"
        tabIndex={-1}
        className="max-w-md rounded-lg bg-card p-2xl text-center shadow-medium"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 id="exit-intent-title" className="mb-md font-display text-2xl font-bold text-foreground">
          Leaving already?
        </h3>
        <p className="mb-xl text-brand-gray">
          Before you go, want to see how Ordella Physio can help your clinic?
        </p>
        <div className="flex flex-col gap-sm sm:flex-row sm:justify-center">
          <Button asChild size="lg" className={marketingButtonPrimaryClass}>
            <CtaLink
              href="/contact"
              location="contact"
              label="Exit intent contact"
              onClick={() => trackEvent("exit_intent_cta")}
            >
              Contact us
            </CtaLink>
          </Button>
          <Button type="button" size="lg" variant="outline" onClick={dismiss}>
            Continue browsing
          </Button>
        </div>
      </div>
    </div>
  );
}
