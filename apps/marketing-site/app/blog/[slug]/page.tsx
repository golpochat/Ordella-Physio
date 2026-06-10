import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { formatBlogDate } from "@/lib/format";
import { createMetadata } from "@/lib/seo";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

function renderContent(content: string) {
  return content
    .trim()
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph, index) => (
      <p key={index} className="mb-4 leading-relaxed text-muted-foreground">
        {paragraph}
      </p>
    ));
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <Section className="pt-16">
      <article className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link href="/blog">← Back to blog</Link>
        </Button>
        <p className="text-sm text-muted-foreground">
          {formatBlogDate(post.date)} · {post.author}
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold">{post.title}</h1>
        <div className="mt-8 max-w-none">{renderContent(post.content)}</div>
      </article>
    </Section>
  );
}
