"use client";

import { trackPageView, trackScrollDepth } from "@/lib/analytics";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function resetScrollMarkers() {
  window._scroll25 = false;
  window._scroll50 = false;
  window._scroll75 = false;
  window._scroll90 = false;
}

export default function GA() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!window.gtag) {
      return;
    }

    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    trackPageView(pagePath);
    resetScrollMarkers();
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      if (!window.gtag) {
        return;
      }

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) {
        return;
      }

      const percent = Math.round((scrollTop / docHeight) * 100);

      if (percent >= 25 && !window._scroll25) {
        window._scroll25 = true;
        trackScrollDepth(25);
      }
      if (percent >= 50 && !window._scroll50) {
        window._scroll50 = true;
        trackScrollDepth(50);
      }
      if (percent >= 75 && !window._scroll75) {
        window._scroll75 = true;
        trackScrollDepth(75);
      }
      if (percent >= 90 && !window._scroll90) {
        window._scroll90 = true;
        trackScrollDepth(90);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return null;
}
