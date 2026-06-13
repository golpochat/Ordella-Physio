"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DatasetDetail } from "@/lib/dataset-types";

export type DatasetEditorProps = {
  dataset: DatasetDetail;
  isSaving?: boolean;
  onSave: (payload: { name: string; description: string; tags: string[] }) => void;
};

export function DatasetEditor({ dataset, isSaving = false, onSave }: DatasetEditorProps) {
  const [name, setName] = useState(dataset.name);
  const [description, setDescription] = useState(dataset.description);
  const [tagsText, setTagsText] = useState(dataset.tags.join(", "));

  useEffect(() => {
    setName(dataset.name);
    setDescription(dataset.description);
    setTagsText(dataset.tags.join(", "));
  }, [dataset]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const tags = tagsText
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    onSave({ name: name.trim(), description: description.trim(), tags });
  }

  return (
    <form className="dataset-editor-form" onSubmit={handleSubmit}>
      <div className="dataset-form-field">
        <label htmlFor="dataset-name" className="automation-form-section-title">
          Name
        </label>
        <Input
          id="dataset-name"
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
          required
        />
      </div>
      <div className="dataset-form-field">
        <label htmlFor="dataset-description" className="automation-form-section-title">
          Description
        </label>
        <textarea
          id="dataset-description"
          className="automation-select"
          value={description}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(event.target.value)
          }
          rows={3}
        />
      </div>
      <div className="dataset-form-field">
        <label htmlFor="dataset-tags" className="automation-form-section-title">
          Tags (comma-separated)
        </label>
        <Input
          id="dataset-tags"
          value={tagsText}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTagsText(event.target.value)}
          placeholder="training, qa, notes"
        />
      </div>
      <div className="dataset-editor-meta">
        <span>Type: {dataset.type}</span>
        <span>Records: {dataset.recordCount ?? 0}</span>
        <span>Latest version: v{dataset.latestVersionNumber ?? 1}</span>
      </div>
      <Button type="submit" disabled={isSaving || !name.trim()}>
        {isSaving ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
