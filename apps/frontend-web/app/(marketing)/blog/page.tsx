import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/marketing/section-heading";
import { BLOG_POSTS } from "@/lib/marketing-content";

export const metadata: Metadata = {
  title: "Blog — Ordella Physio",
  description: "News, best practices, and product updates from the Ordella Physio team.",
};

export default function BlogPage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          centered
          eyebrow="Blog"
          title="Insights for modern clinics"
          description="Placeholder blog posts. Full content management will be added in a future release."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Card key={post.slug} className="flex flex-col">
              <CardHeader>
                <Badge className="w-fit">{post.category}</Badge>
                <CardTitle className="mt-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardBody className="mt-auto text-sm text-muted-foreground">
                <p>
                  {post.author} &middot; {post.date}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
