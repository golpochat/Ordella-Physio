"use client";

import { cn } from "@/lib/cn";

export type BlogCategoryProps = {
  categories: string[];
  active: string;
  onSelect: (category: string) => void;
};

export function BlogCategory({ categories, active, onSelect }: BlogCategoryProps) {
  return (
    <div
      className="mb-xl flex flex-wrap gap-sm"
      role="group"
      aria-label="Filter articles by category"
    >
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelect(category)}
          aria-pressed={active === category}
          className={cn(
            "btn-lift ripple cursor-pointer rounded-md border px-brand-md py-xs transition",
            active === category
              ? "border-brand-primary bg-brand-primary text-white"
              : "border-brand-gray/30 text-brand-gray hover:border-brand-primary hover:text-brand-primary",
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
