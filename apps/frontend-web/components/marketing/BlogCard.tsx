import Link from "next/link";
import { cn } from "@/lib/cn";
import { marketingCardClass, marketingHeading } from "@/lib/marketing-ui";

export type BlogCardProps = {
  slug?: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
};

function formatBlogDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-IE", { month: "long", year: "numeric" });
}

export function BlogCard({ slug, title, excerpt, date, category }: BlogCardProps) {
  const content = (
    <>
      <div className="mb-xs text-sm font-semibold text-brand-primary">{category}</div>
      <h3 className={cn("mb-sm", marketingHeading.h4)}>{title}</h3>
      <p className={cn("mb-md", marketingHeading.body)}>{excerpt}</p>
      <p className={`text-sm ${marketingHeading.body}`}>{formatBlogDate(date)}</p>
    </>
  );

  if (slug) {
    return (
      <Link href={`/blog/${slug}`} className={cn(marketingCardClass, "block")}>
        {content}
      </Link>
    );
  }

  return <article className={marketingCardClass}>{content}</article>;
}
