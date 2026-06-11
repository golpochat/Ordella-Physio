"use client";

import { Input, Label } from "@/components/ui/input";

export type BlogSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function BlogSearch({ value, onChange }: BlogSearchProps) {
  return (
    <div>
      <Label htmlFor="blog-search" className="sr-only">
        Search articles
      </Label>
      <Input
        id="blog-search"
        type="search"
        placeholder="Search articles..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="focus-ring mb-xl w-full"
      />
    </div>
  );
}
