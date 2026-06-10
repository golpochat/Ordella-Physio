import type { Metadata } from "next";
import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from "./constants";

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
  const ogImage = image ?? `${siteUrl}/og-default.png`;

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
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [ogImage],
    },
  };
}
