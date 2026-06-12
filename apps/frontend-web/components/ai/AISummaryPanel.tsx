"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";

type AISummaryPanelProps = {
  title?: string;
  summary?: string;
  sections?: Array<{ label: string; items: string[] }>;
  defaultExpanded?: boolean;
};

export function AISummaryPanel({
  title = "AI summary",
  summary,
  sections = [],
  defaultExpanded = false,
}: AISummaryPanelProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  if (!summary && sections.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              Collapse <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Expand <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </CardHeader>
      {expanded ? (
        <CardBody className="space-y-4 text-sm">
          {summary ? (
            <div>
              <p className="font-medium">Overview</p>
              <p className="whitespace-pre-wrap text-muted-foreground">{summary}</p>
            </div>
          ) : null}
          {sections.map((section) => (
            <div key={section.label}>
              <p className="font-medium">{section.label}</p>
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </CardBody>
      ) : null}
    </Card>
  );
}
