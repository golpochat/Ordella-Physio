import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/marketing-content";
import { siteConfig } from "./(marketing)/seo";

const MARKETING_ROUTES = [
  "",
  "/features",
  "/product",
  "/solutions",
  "/pricing",
  "/about",
  "/blog",
  "/faq",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages = MARKETING_ROUTES.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
