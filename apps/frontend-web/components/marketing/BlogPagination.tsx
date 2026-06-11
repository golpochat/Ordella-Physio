"use client";

import { Button } from "@/components/ui/button";

export type BlogPaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export function BlogPagination({ page, totalPages, onChange }: BlogPaginationProps) {
  return (
    <div className="mt-2xl flex items-center justify-center gap-md">
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="btn-lift ripple"
      >
        Previous
      </Button>

      <span className="text-sm text-brand-gray">
        Page {page} of {totalPages}
      </span>

      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="btn-lift ripple"
      >
        Next
      </Button>
    </div>
  );
}
