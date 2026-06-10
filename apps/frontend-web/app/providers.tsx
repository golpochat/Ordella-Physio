"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";
import { Toaster } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { AuthBootstrap } from "@/components/auth/auth-bootstrap";
import { createAppQueryClient } from "@/lib/query-client";
import { useUiStore } from "@/store/ui.store";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => createAppQueryClient());
  const setCorrelationId = useUiStore((state) => state.setCorrelationId);

  useEffect(() => {
    setCorrelationId(uuidv4());
  }, [setCorrelationId]);

  return (
    <SessionProvider basePath="/api/next-auth">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthBootstrap>{children}</AuthBootstrap>
          <Toaster richColors closeButton position="top-right" />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
