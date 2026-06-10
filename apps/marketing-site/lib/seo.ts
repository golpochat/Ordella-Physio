import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "./content";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
}

type PageMeta = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
};

export function createMetadata({ title, description, path = "", image }: PageMeta): Metadata {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${path}`;
  const desc = description ?? SITE_DESCRIPTION;
  const ogImage = image ?? `${siteUrl}/images/hero/og-default.png`;

  return {
    title: title === SITE_NAME ? title : `${title} | ${SITE_NAME}`,
    description: desc,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    openGraph: {
      title,
      description: desc,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_GB",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
