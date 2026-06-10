import { BlogCard } from "@/components/cards/blog-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import { getAllPosts } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Blog",
  description: "Insights on physiotherapy practice management, clinical workflows, and clinic growth.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Section className="pt-16">
      <SectionHeader
        eyebrow="Blog"
        title="Latest from Ordella"
        description="Tips, guides, and industry insights for physiotherapy clinics."
      />
      {posts.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No posts yet. Check back soon.</p>
      )}
    </Section>
  );
}
