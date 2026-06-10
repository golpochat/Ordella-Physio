"use client";

import { ThemeProvider } from "@ordella/ui";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
