import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { SiteShell } from "@/components/layout/site-shell";
import { Providers } from "./providers";
import { createMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

export const metadata = createMetadata({
  title: SITE_NAME,
  description: "Modern physiotherapy practice management — scheduling, notes, billing, and patient care in one platform.",
  path: "/",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${display.variable} min-h-screen font-sans antialiased`}>
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
