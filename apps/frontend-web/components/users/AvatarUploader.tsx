"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, User } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRemoveAvatar, useUploadAvatar } from "@/hooks/useClinicPortal";
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
          toast.success(response.message ?? "Avatar updated successfully.");
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
        toast.success(response.message ?? "Avatar removed successfully.");
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
    <div className="avatar-uploader">
      <div
        className={cn(
          "avatar-uploader-dropzone",
          isDragActive && "avatar-uploader-dropzone-active",
          readOnly && "avatar-uploader-dropzone-readonly",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="avatar-uploader-preview">
          {displayUrl ? (
            <img src={displayUrl} alt="" className="avatar-uploader-image" />
          ) : (
            <div className="avatar-uploader-placeholder" aria-hidden="true">
              {initials !== "?" ? (
                <span className="avatar-uploader-initials">{initials}</span>
              ) : (
                <User className="avatar-uploader-icon" />
              )}
            </div>
          )}

          {isBusy ? (
            <div className="avatar-uploader-spinner" aria-live="polite">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : null}
        </div>

        {!readOnly ? (
          <p className="avatar-uploader-hint">Drag and drop an image here, or use the buttons below.</p>
        ) : null}
      </div>

      {readOnly ? (
        <p className="avatar-uploader-readonly-note">
          Avatars are self-managed. Only the user can upload or remove their own avatar.
        </p>
      ) : (
        <div className="avatar-uploader-actions">
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            className="avatar-uploader-input"
            onChange={handleFileSelection}
            disabled={isBusy}
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
      )}

      {inlineError ? <p className="avatar-uploader-error">{inlineError}</p> : null}
    </div>
  );
}
