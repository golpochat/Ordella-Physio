import { AI_CLINICAL_DISCLAIMER } from "@/lib/ai-notes-types";

export function AiDisclaimer() {
  return (
    <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
      {AI_CLINICAL_DISCLAIMER}
    </p>
  );
}
