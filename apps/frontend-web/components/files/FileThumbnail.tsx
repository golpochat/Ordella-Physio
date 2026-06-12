"use client";

import { useEffect, useState } from "react";
import { File as FileIcon } from "lucide-react";
import { useFileAccessUrl } from "@/hooks/useFiles";
import { cn } from "@/lib/cn";
import type { StoredFileRecord } from "@/lib/file-types";

type FileThumbnailProps = {
  file: StoredFileRecord;
  className?: string;
  onClick?: () => void;
};

function isImageMime(mimeType: string): boolean {
  return mimeType.startsWith("image/");
}

export function FileThumbnail({ file, className, onClick }: FileThumbnailProps) {
  const accessUrlMutation = useFileAccessUrl();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isImageMime(file.mimeType) || file.isDeleted) {
      return;
    }

    let cancelled = false;

    void accessUrlMutation
      .mutateAsync({ fileId: file.id, variant: "THUMB_SMALL" })
      .then((result) => {
        if (!cancelled) {
          setImageUrl(result.url);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setImageUrl(null);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- load once per file id
  }, [file.id, file.isDeleted, file.mimeType]);

  const content = imageUrl ? (
    // eslint-disable-next-line @next/next/no-img-element -- signed CDN/thumbnail URLs are ephemeral
    <img src={imageUrl} alt={file.filename} className="h-full w-full object-cover" />
  ) : (
    <FileIcon className="h-5 w-5 text-muted-foreground" aria-hidden />
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "file-thumbnail flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted",
          className,
        )}
        aria-label={`Preview ${file.filename}`}
      >
        {content}
      </button>
    );
  }

  return (
    <div
      className={cn(
        "file-thumbnail flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted",
        className,
      )}
    >
      {content}
    </div>
  );
}
