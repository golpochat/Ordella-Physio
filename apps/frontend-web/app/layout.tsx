import type { Metadata } from "next";
import { headers } from "next/headers";
import { Providers } from "@/app/providers";
import { getRequestNonce } from "@/lib/security/nonce";
import "@/styles/globals.css";

// Nonces are generated per request in middleware; pages must render dynamically.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ordella Physio",
  description: "Practice management platform for physiotherapy clinics",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.ico" }],
    apple: "/logo-mark.svg",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await headers();
  const nonce = getRequestNonce();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen font-body antialiased" nonce={nonce}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
