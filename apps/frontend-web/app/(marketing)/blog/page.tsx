import { BlogPageContent } from "@/components/marketing/BlogPageContent";
import { BLOG_POSTS } from "@/lib/marketing-content";
import { generateSEO, pageUrl } from "../seo";

export const metadata = generateSEO({
  title: "Blog",
  description: "Insights and updates for modern physiotherapy clinics.",
  url: pageUrl("/blog"),
});

export default function BlogPage() {
  return <BlogPageContent posts={BLOG_POSTS} />;
}
