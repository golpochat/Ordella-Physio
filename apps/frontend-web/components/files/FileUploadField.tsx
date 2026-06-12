"use client";

import { useRef, useState } from "react";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Input, Label } from "@/components/ui/input";
import { useUploadFile } from "@/hooks/useFiles";
import { parseFileApiError } from "@/lib/file-api-errors";
import type { StoredFileRecord } from "@/lib/file-types";

type FileUploadFieldProps = {
  entityType?: string;
  entityId?: string;
  disabled?: boolean;
  onUploaded: (file: StoredFileRecord) => void;
};

export function FileUploadField({
  entityType,
  entityId,
  disabled = false,
  onUploaded,
}: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = useUploadFile();
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const isScanning = uploadMutation.isPending;

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setSelectedName(file.name);

    try {
      const result = await uploadMutation.mutateAsync({
        file,
        entityType,
        entityId,
      });
      toast.success(result.message ?? "File uploaded successfully.");
      onUploaded(result.file);
      setSelectedName(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      const parsed = parseFileApiError(error);
      toast.error(parsed.toastError ?? "Upload failed.");
    }
  }

  return (
    <div className="file-upload-field space-y-2">
      <Label htmlFor="generic-file-upload">Upload file</Label>
      <Input
        ref={inputRef}
        id="generic-file-upload"
        type="file"
        disabled={disabled || isScanning}
        onChange={(event) => void handleFileChange(event)}
      />
      {isScanning ? (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Scanning and uploading…
        </p>
      ) : null}
      {!isScanning && selectedName ? (
        <p className="text-sm text-muted-foreground">Selected: {selectedName}</p>
      ) : null}
    </div>
  );
}
