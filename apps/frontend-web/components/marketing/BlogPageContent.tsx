"use client";

import { BlogList } from "@/components/marketing/blog-list";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import type { BlogPost } from "@/lib/marketing-content";

export type BlogPageContentProps = {
  posts: BlogPost[];
};

export function BlogPageContent({ posts }: BlogPageContentProps) {
  return (
    <div className="bg-background pb-2xl pt-2xl">
      <MarketingPageHero
        title="Blog"
        description="Insights, updates, and best practices for modern physiotherapy clinics."
      />

      <section className="marketing-container">
        <BlogList posts={posts} />
      </section>
    </div>
  );
}
