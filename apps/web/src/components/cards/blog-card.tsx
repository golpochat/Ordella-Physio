import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatBlogDate } from "@/lib/format";

type BlogCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
};

export function BlogCard({ slug, title, excerpt, date, author }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <Card className="h-full transition-shadow group-hover:shadow-md">
        <CardHeader>
          <p className="text-xs text-muted-foreground">
            {formatBlogDate(date)} · {author}
          </p>
          <CardTitle className="text-xl group-hover:text-primary">{title}</CardTitle>
          <CardDescription>{excerpt}</CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-sm font-medium text-primary">Read more →</span>
        </CardContent>
      </Card>
    </Link>
  );
}
