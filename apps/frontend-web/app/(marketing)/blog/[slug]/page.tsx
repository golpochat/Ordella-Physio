import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS } from "@/lib/marketing-content";
import { generateSEO, pageUrl } from "../../seo";

type BlogPostPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = BLOG_POSTS.find((entry) => entry.slug === params.slug);

  if (!post) {
    return generateSEO({
      title: "Post not found",
      description: "The requested blog post could not be found.",
      url: pageUrl("/blog"),
    });
  }

  return generateSEO({
    title: post.title,
    description: post.excerpt,
    url: pageUrl(`/blog/${post.slug}`),
  });
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = BLOG_POSTS.find((entry) => entry.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/blog">&larr; Back to blog</Link>
        </Button>

        <Badge>{post.category}</Badge>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">{post.title}</h1>
        <p className="mt-4 text-muted-foreground">
          {post.author} &middot; {post.date}
        </p>

        <div className="prose prose-neutral mt-10 max-w-none dark:prose-invert">
          <p className="text-lg text-muted-foreground">{post.excerpt}</p>
          <p>
            This is placeholder blog content for &ldquo;{post.title}&rdquo;. Full articles with
            rich formatting, images, and author bios will be published through the content
            management system in a future release.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </article>
  );
}
