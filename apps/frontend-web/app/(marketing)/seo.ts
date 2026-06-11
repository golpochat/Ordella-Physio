import type { Metadata } from "next";

export const siteConfig = {
  name: "Ordella Physio",
  description:
    "A modern, unified platform for physiotherapy clinics — appointments, notes, billing, messaging, and analytics.",
  url: "https://ordella.com",
  ogImage: "/og-default.png",
  keywords: [
    "physiotherapy software",
    "clinic management",
    "appointments",
    "clinical notes",
    "billing",
    "multi-location",
    "healthcare SaaS",
  ],
};

export function pageUrl(path = ""): string {
  if (!path || path === "/") {
    return siteConfig.url;
  }

  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export type GenerateSEOOptions = {
  title: string;
  description?: string;
  url?: string;
  image?: string;
};

export function generateSEO({
  title,
  description,
  url,
  image,
}: GenerateSEOOptions): Metadata {
  const pageTitle = `${title} | ${siteConfig.name}`;
  const resolvedDescription = description || siteConfig.description;
  const resolvedUrl = url || siteConfig.url;
  const resolvedImage = image || siteConfig.ogImage;

  return {
    title: {
      absolute: pageTitle,
    },
    description: resolvedDescription,
    keywords: siteConfig.keywords,
    alternates: {
      canonical: resolvedUrl,
    },
    openGraph: {
      title: pageTitle,
      description: resolvedDescription,
      url: resolvedUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: resolvedImage,
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_IE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: resolvedDescription,
      images: [resolvedImage],
    },
  };
}

export const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "24",
    priceCurrency: "EUR",
  },
};

export function withJsonLd(metadata: Metadata, jsonLd: Record<string, unknown>): Metadata {
  return {
    ...metadata,
    other: {
      "application/ld+json": JSON.stringify(jsonLd),
    },
  };
}
