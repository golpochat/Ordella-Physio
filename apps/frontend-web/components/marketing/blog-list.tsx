"use client";

import { useMemo, useState } from "react";
import { BlogCard } from "@/components/marketing/BlogCard";
import { BlogCategory } from "@/components/marketing/BlogCategory";
import { BlogPagination } from "@/components/marketing/BlogPagination";
import { BlogSearch } from "@/components/marketing/BlogSearch";
import type { BlogPost } from "@/lib/marketing-content";

const PAGE_SIZE = 6;

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((post) => post.category)))],
    [posts],
  );

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        !normalizedSearch ||
        post.title.toLowerCase().includes(normalizedSearch) ||
        post.excerpt.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="space-y-xl">
      <BlogSearch
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      <BlogCategory
        categories={categories}
        active={activeCategory}
        onSelect={(category) => {
          setActiveCategory(category);
          setPage(1);
        }}
      />

      {paginated.length > 0 ? (
        <div className="grid grid-cols-1 gap-xl md:grid-cols-2 lg:grid-cols-3">
          {paginated.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-brand-gray">No articles match your search.</p>
      )}

      <BlogPagination page={currentPage} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
