"use client";

import { useEffect, useState } from "react";
import { FileText, File as FileIcon } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { useFileAccessUrl } from "@/hooks/useFiles";
import type { StoredFileRecord } from "@/lib/file-types";

type FilePreviewProps = {
  file: StoredFileRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function isImageMime(mimeType: string): boolean {
  return mimeType.startsWith("image/");
}

function isPdfMime(mimeType: string): boolean {
  return mimeType === "application/pdf";
}

export function FilePreview({ file, open, onOpenChange }: FilePreviewProps) {
  const accessUrlMutation = useFileAccessUrl();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !file) {
      setPreviewUrl(null);
      return;
    }

    let cancelled = false;

    const variant = isImageMime(file.mimeType) ? "THUMB_MEDIUM" : "ORIGINAL";

    void accessUrlMutation
      .mutateAsync({ fileId: file.id, variant })
      .then((result) => {
        if (!cancelled) {
          setPreviewUrl(result.url);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPreviewUrl(null);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reload when modal opens for a file
  }, [file?.id, file?.mimeType, open]);

  if (!file) {
    return null;
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="file-preview-modal max-w-3xl">
        <ModalHeader>
          <ModalTitle>{file.filename}</ModalTitle>
          <ModalDescription>
            Version {file.version} · {file.storageProvider}
          </ModalDescription>
        </ModalHeader>

        <div className="file-preview-body flex min-h-[240px] items-center justify-center rounded-md border bg-muted/40 p-4">
          {isImageMime(file.mimeType) && previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- signed ephemeral preview URL
            <img
              src={previewUrl}
              alt={file.filename}
              className="max-h-[60vh] max-w-full rounded-md object-contain"
            />
          ) : null}

          {isPdfMime(file.mimeType) ? (
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <FileText className="h-16 w-16" aria-hidden />
              <p className="text-sm">PDF document</p>
              {previewUrl ? (
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Open PDF
                </a>
              ) : null}
            </div>
          ) : null}

          {!isImageMime(file.mimeType) && !isPdfMime(file.mimeType) ? (
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <FileIcon className="h-16 w-16" aria-hidden />
              <p className="text-sm">Preview not available for this file type.</p>
              {previewUrl ? (
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Download file
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </ModalContent>
    </Modal>
  );
}
