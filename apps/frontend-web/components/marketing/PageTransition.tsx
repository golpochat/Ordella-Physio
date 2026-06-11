"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const TRANSITION_MS = 300;

export type PageTransitionProps = {
  children: ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const childrenRef = useRef(children);
  childrenRef.current = children;

  const [displayChildren, setDisplayChildren] = useState(children);
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const [active, setActive] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      requestAnimationFrame(() => setActive(true));
      return;
    }

    setActive(false);
    setPhase("exit");
    requestAnimationFrame(() => setActive(true));

    const timeout = window.setTimeout(() => {
      setDisplayChildren(childrenRef.current);
      setPhase("enter");
      setActive(false);
      requestAnimationFrame(() => setActive(true));
    }, TRANSITION_MS);

    return () => window.clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    if (phase === "enter" && active) {
      setDisplayChildren(children);
    }
  }, [children, phase, active]);

  return (
    <div
      className={cn(
        phase === "enter" ? "page-fade-enter" : "page-fade-exit",
        active && (phase === "enter" ? "page-fade-enter-active" : "page-fade-exit-active"),
      )}
    >
      {displayChildren}
    </div>
  );
}
