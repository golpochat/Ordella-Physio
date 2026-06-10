"use client";

import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { AiDisclaimer } from "@/components/therapist-portal/ai-notes/ai-disclaimer";
import type { AiPreviewPayload } from "@/lib/ai-notes-types";

export type AiPreviewModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preview: AiPreviewPayload | null;
  loadingMessage?: string;
  isLoading?: boolean;
  onAccept?: () => void;
  onReject?: () => void;
};

export function AiPreviewModal({
  open,
  onOpenChange,
  preview,
  loadingMessage,
  isLoading = false,
  onAccept,
  onReject,
}: AiPreviewModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <ModalHeader>
          <ModalTitle>AI Clinical Assistant</ModalTitle>
          <ModalDescription>
            Review the generated content before inserting it into the note.
          </ModalDescription>
        </ModalHeader>

        <AiDisclaimer />

        {isLoading ? (
          <p className="py-8 text-center text-sm text-muted-foreground">{loadingMessage}</p>
        ) : null}

        {!isLoading && preview?.kind === "generate" ? (
          <div className="space-y-4 text-sm">
            <section>
              <h4 className="font-semibold">Summary</h4>
              <p className="text-muted-foreground">{preview.data.summary}</p>
            </section>
            <section>
              <h4 className="font-semibold">SOAP Note</h4>
              <div className="space-y-2 rounded-md bg-muted/40 p-3">
                <p>
                  <span className="font-medium">Subjective:</span> {preview.data.soap.subjective}
                </p>
                <p>
                  <span className="font-medium">Objective:</span> {preview.data.soap.objective}
                </p>
                <p>
                  <span className="font-medium">Assessment:</span> {preview.data.soap.assessment}
                </p>
                <p>
                  <span className="font-medium">Plan:</span> {preview.data.soap.plan}
                </p>
              </div>
            </section>
            {preview.data.recommendations.length ? (
              <section>
                <h4 className="font-semibold">Recommendations</h4>
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                  {preview.data.recommendations.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        ) : null}

        {!isLoading && preview?.kind === "summarize" ? (
          <div className="space-y-4 text-sm">
            <section>
              <h4 className="font-semibold">Summary</h4>
              <p className="text-muted-foreground">{preview.data.summary}</p>
            </section>
            {preview.data.keyFindings.length ? (
              <section>
                <h4 className="font-semibold">Key findings</h4>
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                  {preview.data.keyFindings.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        ) : null}

        {!isLoading && preview?.kind === "treatment-plan" ? (
          <div className="space-y-4 text-sm">
            <SectionList title="Goals" items={preview.data.goals} />
            <SectionList title="Interventions" items={preview.data.interventions} />
            <SectionList title="Home exercises" items={preview.data.homeExercises} />
            <section>
              <h4 className="font-semibold">Follow-up</h4>
              <p className="text-muted-foreground">{preview.data.followUp}</p>
            </section>
            <SectionList title="Precautions" items={preview.data.precautions} />
          </div>
        ) : null}

        <ModalFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onReject} disabled={isLoading}>
            Reject
          </Button>
          <Button onClick={onAccept} disabled={isLoading || !preview}>
            Accept &amp; Insert
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function SectionList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <section>
      <h4 className="font-semibold">{title}</h4>
      <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
