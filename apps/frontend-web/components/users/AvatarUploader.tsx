"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, User } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRemoveAvatar, useUploadAvatar } from "@/hooks/useAccountProfile";
import { getAvatarInitials, resolveAvatarUrl } from "@/lib/avatar-url";
import { redirectToLogin } from "@/lib/session-manager";
import { parseUserAvatarErrors } from "@/lib/user-api-errors";
import { cn } from "@/lib/cn";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_BYTES = 2 * 1024 * 1024;

export type AvatarUploaderProps = {
  avatarUrl?: string | null;
  firstName?: string;
  lastName?: string;
  email?: string;
  readOnly?: boolean;
  onAvatarChange?: (avatarUrl: string | null) => void;
};

function validateClientFile(file: File): string | null {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return "Only JPG, PNG, or WebP images are allowed.";
  }

  if (file.size > MAX_FILE_BYTES) {
    return "Image must be 2MB or smaller.";
  }

  return null;
}

export function AvatarUploader({
  avatarUrl,
  firstName,
  lastName,
  email,
  readOnly = false,
  onAvatarChange,
}: AvatarUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadAvatar = useUploadAvatar();
  const removeAvatar = useRemoveAvatar();

  const [currentUrl, setCurrentUrl] = useState<string | null>(avatarUrl ?? null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [inlineError, setInlineError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const isBusy = uploadAvatar.isPending || removeAvatar.isPending;
  const displayUrl = previewUrl ?? resolveAvatarUrl(currentUrl);
  const initials = getAvatarInitials(firstName, lastName, email);

  useEffect(() => {
    setCurrentUrl(avatarUrl ?? null);
  }, [avatarUrl]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const clearPreview = useCallback(() => {
    setPreviewUrl((previous) => {
      if (previous) {
        URL.revokeObjectURL(previous);
      }
      return null;
    });
  }, []);

  const handleUpload = useCallback(
    (file: File) => {
      setInlineError(null);

      const clientError = validateClientFile(file);
      if (clientError) {
        setInlineError(clientError);
        return;
      }

      const nextPreview = URL.createObjectURL(file);
      setPreviewUrl((previous) => {
        if (previous) {
          URL.revokeObjectURL(previous);
        }
        return nextPreview;
      });

      uploadAvatar.mutate(file, {
        onSuccess: (response) => {
          clearPreview();
          const nextUrl = response.avatarUrl ?? response.user.avatarUrl ?? null;
          setCurrentUrl(nextUrl);
          onAvatarChange?.(nextUrl);
          toast.success(response.message ?? "Profile photo updated.");
        },
        onError: (error) => {
          clearPreview();
          const parsed = parseUserAvatarErrors(error);

          if (parsed.notFound) {
            redirectToLogin("session-expired");
            return;
          }

          if (parsed.fieldErrors.avatar) {
            setInlineError(parsed.fieldErrors.avatar);
            return;
          }

          if (parsed.toastError) {
            toast.error(parsed.toastError);
            return;
          }

          if (parsed.generalError) {
            setInlineError(parsed.generalError);
          }
        },
      });
    },
    [clearPreview, onAvatarChange, uploadAvatar],
  );

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    handleUpload(file);
  };

  const handleRemove = () => {
    setInlineError(null);
    removeAvatar.mutate(undefined, {
      onSuccess: (response) => {
        clearPreview();
        setCurrentUrl(null);
        onAvatarChange?.(null);
        toast.success(response.message ?? "Profile photo removed.");
      },
      onError: (error) => {
        const parsed = parseUserAvatarErrors(error);

        if (parsed.notFound) {
          redirectToLogin("session-expired");
          return;
        }

        if (parsed.toastError) {
          toast.error(parsed.toastError);
          return;
        }

        if (parsed.generalError) {
          setInlineError(parsed.generalError);
        }
      },
    });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (readOnly || isBusy) {
      return;
    }

    setIsDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);

    if (readOnly || isBusy) {
      return;
    }

    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <div className="mb-6 flex flex-col gap-4">
      <div
        className={cn(
          "flex flex-col gap-4 rounded-lg border border-dashed p-4 sm:flex-row sm:items-center",
          isDragActive ? "border-brand-primary bg-brand-primary/5" : "border-border",
          readOnly && "border-solid bg-muted/30",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
          {displayUrl ? (
            <img
              src={displayUrl}
              alt="Profile photo preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center bg-brand-primary/10 text-brand-primary"
              aria-hidden="true"
            >
              {initials !== "?" ? (
                <span className="text-2xl font-semibold tracking-wide">{initials}</span>
              ) : (
                <User className="h-10 w-10" />
              )}
            </div>
          )}

          {isBusy ? (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/45 text-white"
              aria-live="polite"
            >
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : null}
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-sm font-medium">Profile photo</p>
          {readOnly ? (
            <p className="text-sm text-muted-foreground">
              Only the account owner can upload or remove their profile photo.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              JPG, PNG, or WebP up to 2MB. Drag and drop here or use the buttons below.
            </p>
          )}
        </div>
      </div>

      {!readOnly ? (
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            className="sr-only"
            onChange={handleFileSelection}
            disabled={isBusy}
            aria-label="Choose profile photo"
          />
          <Button
            type="button"
            variant="outline"
            disabled={isBusy}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload image
          </Button>
          <Button
            type="button"
            variant="ghost"
            disabled={isBusy || (!currentUrl && !previewUrl)}
            onClick={handleRemove}
          >
            Remove
          </Button>
        </div>
      ) : null}

      {inlineError ? <p className="text-sm text-destructive">{inlineError}</p> : null}
    </div>
  );
}
