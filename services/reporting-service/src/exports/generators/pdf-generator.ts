export type PdfExportPlaceholder = {
  title: string;
  content: string;
};

export function generatePdfPlaceholder(input: PdfExportPlaceholder): Buffer {
  const body = `PDF export placeholder\nTitle: ${input.title}\n${input.content}`;
  return Buffer.from(body, "utf-8");
}
