import type { Metadata } from "next";
import Footer from "@/components/marketing/Footer";
import Navbar from "@/components/marketing/Navbar";
import PageTransition from "@/components/marketing/PageTransition";
import ScrollProgress from "@/components/marketing/ScrollProgress";
import ErrorBoundary from "@/components/marketing/ErrorBoundary";
import ExitIntent from "@/components/marketing/ExitIntent";
import { FunnelTracker } from "./analytics/FunnelTracker";
import { MarketingAnalytics } from "./analytics/MarketingAnalytics";
import { MarketingReliability } from "./analytics/MarketingReliability";
import { siteConfig } from "./seo";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [siteConfig.ogImage],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="marketing-site flex min-h-screen flex-col bg-background">
      <MarketingAnalytics />
      <MarketingReliability />
      <FunnelTracker />
      <ExitIntent />
      <ErrorBoundary>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </ErrorBoundary>
    </div>
  );
}
