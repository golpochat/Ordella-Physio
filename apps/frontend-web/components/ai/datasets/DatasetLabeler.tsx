"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DatasetLabelType, DatasetRecordItem } from "@/lib/dataset-types";

function formatValue(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value, null, 2);
}

export type DatasetLabelerProps = {
  records: DatasetRecordItem[];
  isSaving?: boolean;
  onSaveLabel: (payload: {
    recordId: string;
    labelType: DatasetLabelType;
    labelValue: Record<string, unknown>;
  }) => void;
};

const LABEL_TYPES: DatasetLabelType[] = ["CLASSIFICATION", "EXTRACTION", "CORRECTION"];

export function DatasetLabeler({ records, isSaving = false, onSaveLabel }: DatasetLabelerProps) {
  const [index, setIndex] = useState(0);
  const [labelType, setLabelType] = useState<DatasetLabelType>("CLASSIFICATION");
  const [labelValue, setLabelValue] = useState('{"value":""}');

  const current = records[index] ?? null;
  const progress = records.length ? `${index + 1} / ${records.length}` : "0 / 0";

  const parsedLabelValue = useMemo(() => {
    try {
      const parsed = JSON.parse(labelValue) as Record<string, unknown>;
      return typeof parsed === "object" && parsed ? parsed : { value: labelValue };
    } catch {
      return { value: labelValue };
    }
  }, [labelValue]);

  const goNext = useCallback(() => {
    setIndex((currentIndex) => Math.min(currentIndex + 1, Math.max(records.length - 1, 0)));
  }, [records.length]);

  const goPrev = useCallback(() => {
    setIndex((currentIndex) => Math.max(currentIndex - 1, 0));
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLInputElement) {
        if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
          event.preventDefault();
          if (current) {
            onSaveLabel({
              recordId: current.id,
              labelType,
              labelValue: parsedLabelValue,
            });
          }
          return;
        }
      }

      if (event.key === "ArrowRight" || event.key === "j") {
        goNext();
      }
      if (event.key === "ArrowLeft" || event.key === "k") {
        goPrev();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [current, goNext, goPrev, labelType, onSaveLabel, parsedLabelValue]);

  if (!records.length) {
    return <p className="dataset-empty-hint">No records available for labeling.</p>;
  }

  if (!current) {
    return <p className="dataset-empty-hint">Select a record to label.</p>;
  }

  return (
    <div className="dataset-labeler">
      <header className="dataset-labeler-header">
        <div>
          <h3>Label record</h3>
          <p className="dashboard-cell-muted">
            Progress: {progress} · Shortcuts: ←/→ or j/k navigate, Ctrl/Cmd+Enter save
          </p>
        </div>
        <div className="dataset-labeler-nav">
          <Button type="button" variant="ghost" onClick={goPrev} disabled={index === 0}>
            Previous
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={goNext}
            disabled={index >= records.length - 1}
          >
            Next
          </Button>
        </div>
      </header>

      <section className="dataset-labeler-input">
        <h4>Input</h4>
        <pre className="dataset-json-preview">{formatValue(current.input)}</pre>
        {current.output ? (
          <>
            <h4>Output</h4>
            <pre className="dataset-json-preview">{formatValue(current.output)}</pre>
          </>
        ) : null}
        {current.labels.length ? (
          <div className="dataset-tag-row">
            {current.labels.map((label) => (
              <Badge key={label.id} variant="secondary">
                {label.labelType}
              </Badge>
            ))}
          </div>
        ) : null}
      </section>

      <section className="dataset-labeler-form">
        <div className="dataset-form-field">
          <label htmlFor="label-type" className="automation-form-section-title">
            Label type
          </label>
          <select
            id="label-type"
            className="automation-select"
            value={labelType}
            onChange={(event) => setLabelType(event.target.value as DatasetLabelType)}
          >
            {LABEL_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="dataset-form-field">
          <label htmlFor="label-value" className="automation-form-section-title">
            Label value (JSON)
          </label>
          <textarea
            id="label-value"
            className="automation-select"
            value={labelValue}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              setLabelValue(event.target.value)
            }
            rows={6}
          />
        </div>
        <Button
          type="button"
          disabled={isSaving}
          onClick={() =>
            onSaveLabel({
              recordId: current.id,
              labelType,
              labelValue: parsedLabelValue,
            })
          }
        >
          {isSaving ? "Saving…" : "Save label"}
        </Button>
      </section>
    </div>
  );
}
