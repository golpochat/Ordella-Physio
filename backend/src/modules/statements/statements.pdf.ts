import PDFDocument from "pdfkit";
import type { ServiceStatementData } from "./statements.types";

type PdfDoc = InstanceType<typeof PDFDocument>;

const MARGIN = 50;
const PAGE_WIDTH = 595.28;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const ACCENT = "#1e3a5f";
const MUTED = "#64748b";
const BORDER = "#e2e8f0";

function formatDate(value: Date | string | null | undefined): string {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString().slice(0, 10);
}

function formatDateTime(value: Date | string): string {
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString().slice(0, 16).replace("T", " ");
}

function formatMoney(currency: string, amount: number): string {
  return `${currency} ${amount.toFixed(2)}`;
}

function fullName(first?: string | null, last?: string | null): string {
  return `${first ?? ""} ${last ?? ""}`.trim() || "—";
}

function ensureSpace(doc: PdfDoc, height: number) {
  if (doc.y + height > doc.page.height - MARGIN) {
    doc.addPage();
  }
}

function drawSectionTitle(doc: PdfDoc, title: string) {
  ensureSpace(doc, 40);
  doc.moveDown(0.8);
  const y = doc.y;
  doc.rect(MARGIN, y, CONTENT_WIDTH, 22).fill(ACCENT);
  doc.fillColor("#ffffff").fontSize(11).font("Helvetica-Bold");
  doc.text(title, MARGIN + 10, y + 6, { width: CONTENT_WIDTH - 20 });
  doc.fillColor("#000000").font("Helvetica");
  doc.y = y + 30;
}

function drawKeyValue(doc: PdfDoc, label: string, value: string, x: number, y: number, width: number) {
  doc.fontSize(8).fillColor(MUTED).text(label, x, y, { width });
  doc.fontSize(10).fillColor("#000000").text(value, x, y + 11, { width });
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

export function generatePatientServiceStatementPdf(data: ServiceStatementData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: MARGIN, size: "A4" });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const patientName = fullName(data.patient.firstName, data.patient.lastName);
    const addressParts = [
      data.patient.addressLine1,
      data.patient.addressLine2,
      [data.patient.city, data.patient.state, data.patient.postalCode].filter(Boolean).join(", "),
      data.patient.country,
    ].filter(Boolean);

    // --- Header ---
    doc.font("Helvetica-Bold").fontSize(22).fillColor(ACCENT).text(data.tenant.name, MARGIN, MARGIN);
    doc.font("Helvetica").fontSize(9).fillColor(MUTED);
    doc.text(`Clinic Code: ${data.tenant.code}`, MARGIN, doc.y + 4);
    doc.text(`Timezone: ${data.tenant.timezone}`, MARGIN, doc.y + 2);

    doc.font("Helvetica-Bold").fontSize(16).fillColor(ACCENT);
    doc.text("PATIENT SERVICE STATEMENT", MARGIN, MARGIN, { align: "right", width: CONTENT_WIDTH });
    doc.font("Helvetica").fontSize(9).fillColor(MUTED);
    doc.text(`Reference: ${data.statementReference}`, { align: "right", width: CONTENT_WIDTH });
    doc.text(`Generated: ${formatDateTime(data.generatedAt)}`, { align: "right", width: CONTENT_WIDTH });

    doc.moveDown(1.2);
    doc.strokeColor(BORDER).moveTo(MARGIN, doc.y).lineTo(PAGE_WIDTH - MARGIN, doc.y).stroke();
    doc.moveDown(0.8);

    // --- Patient details ---
    drawSectionTitle(doc, "Patient Details");

    const colWidth = CONTENT_WIDTH / 2 - 10;
    const startY = doc.y;
    drawKeyValue(doc, "Full Name", patientName, MARGIN, startY, colWidth);
    drawKeyValue(
      doc,
      "Date of Birth",
      formatDate(data.patient.dateOfBirth),
      MARGIN + colWidth + 20,
      startY,
      colWidth,
    );
    drawKeyValue(doc, "Email", data.patient.email ?? "—", MARGIN, startY + 36, colWidth);
    drawKeyValue(doc, "Phone", data.patient.phone ?? "—", MARGIN + colWidth + 20, startY + 36, colWidth);
    drawKeyValue(doc, "Gender", data.patient.gender, MARGIN, startY + 72, colWidth);
    drawKeyValue(
      doc,
      "Address",
      addressParts.length > 0 ? addressParts.join("\n") : "—",
      MARGIN + colWidth + 20,
      startY + 72,
      colWidth,
    );
    doc.y = startY + 110;

    // --- Billing summary ---
    drawSectionTitle(doc, "Billing Summary");

    const summaryY = doc.y;
    const summaryCol = CONTENT_WIDTH / 3;
    drawKeyValue(
      doc,
      "Total Invoiced",
      formatMoney(data.billingSummary.currency, data.billingSummary.totalInvoiced),
      MARGIN,
      summaryY,
      summaryCol - 10,
    );
    drawKeyValue(
      doc,
      "Total Paid",
      formatMoney(data.billingSummary.currency, data.billingSummary.totalPaid),
      MARGIN + summaryCol,
      summaryY,
      summaryCol - 10,
    );
    drawKeyValue(
      doc,
      "Outstanding Balance",
      formatMoney(data.billingSummary.currency, data.billingSummary.outstanding),
      MARGIN + summaryCol * 2,
      summaryY,
      summaryCol - 10,
    );
    doc.y = summaryY + 40;

    doc.fontSize(9).fillColor(MUTED);
    doc.text(
      `${data.billingSummary.invoiceCount} invoice(s) · ${data.billingSummary.paymentCount} payment(s) on record`,
    );
    doc.fillColor("#000000");

    // --- Appointment history ---
    drawSectionTitle(doc, "Appointment History");

    if (data.appointments.length === 0) {
      doc.fontSize(10).text("No appointments recorded for this period.");
    } else {
      doc.fontSize(8).fillColor(MUTED);
      doc.text("Date", MARGIN, doc.y, { continued: true, width: 90 });
      doc.text("Type", { continued: true, width: 80 });
      doc.text("Clinician", { continued: true, width: 110 });
      doc.text("Status", { continued: true, width: 70 });
      doc.text("Notes", { width: 120 });
      doc.moveDown(0.3);
      doc.strokeColor(BORDER).moveTo(MARGIN, doc.y).lineTo(PAGE_WIDTH - MARGIN, doc.y).stroke();
      doc.moveDown(0.3);
      doc.fillColor("#000000");

      for (const appointment of data.appointments) {
        ensureSpace(doc, 18);
        const rowY = doc.y;
        const clinician = appointment.therapist?.user
          ? fullName(appointment.therapist.user.firstName, appointment.therapist.user.lastName)
          : "—";

        doc.fontSize(8);
        doc.text(formatDateTime(appointment.startTime), MARGIN, rowY, { width: 90 });
        doc.text(appointment.type, MARGIN + 90, rowY, { width: 80 });
        doc.text(clinician, MARGIN + 170, rowY, { width: 110 });
        doc.text(appointment.status, MARGIN + 280, rowY, { width: 70 });
        doc.text(truncate(appointment.notes ?? "—", 60), MARGIN + 350, rowY, { width: 120 });
        doc.y = rowY + 14;
      }
    }

    // --- Invoice summary ---
    drawSectionTitle(doc, "Invoice Summary");

    if (data.invoices.length === 0) {
      doc.fontSize(10).text("No invoices on record.");
    } else {
      doc.fontSize(8).fillColor(MUTED);
      doc.text("Invoice #", MARGIN, doc.y, { continued: true, width: 80 });
      doc.text("Issued", { continued: true, width: 70 });
      doc.text("Status", { continued: true, width: 60 });
      doc.text("Total", { continued: true, width: 70 });
      doc.text("Paid", { width: 70 });
      doc.moveDown(0.3);
      doc.strokeColor(BORDER).moveTo(MARGIN, doc.y).lineTo(PAGE_WIDTH - MARGIN, doc.y).stroke();
      doc.moveDown(0.3);
      doc.fillColor("#000000");

      for (const invoice of data.invoices) {
        ensureSpace(doc, 16);
        const rowY = doc.y;
        const paid = invoice.payments.reduce(
          (sum: number, payment: { amount: unknown }) => sum + Number(payment.amount),
          0,
        );

        doc.fontSize(8);
        doc.text(invoice.invoiceNumber, MARGIN, rowY, { width: 80 });
        doc.text(formatDate(invoice.issuedAt), MARGIN + 80, rowY, { width: 70 });
        doc.text(invoice.status, MARGIN + 150, rowY, { width: 60 });
        doc.text(formatMoney(invoice.currency, Number(invoice.total)), MARGIN + 210, rowY, { width: 70 });
        doc.text(formatMoney(invoice.currency, paid), MARGIN + 280, rowY, { width: 70 });
        doc.y = rowY + 14;
      }
    }

    // --- Payment history ---
    drawSectionTitle(doc, "Payment History");

    if (data.payments.length === 0) {
      doc.fontSize(10).text("No payments recorded.");
    } else {
      doc.fontSize(8).fillColor(MUTED);
      doc.text("Date", MARGIN, doc.y, { continued: true, width: 70 });
      doc.text("Invoice", { continued: true, width: 80 });
      doc.text("Method", { continued: true, width: 80 });
      doc.text("Reference", { continued: true, width: 100 });
      doc.text("Amount", { width: 70 });
      doc.moveDown(0.3);
      doc.strokeColor(BORDER).moveTo(MARGIN, doc.y).lineTo(PAGE_WIDTH - MARGIN, doc.y).stroke();
      doc.moveDown(0.3);
      doc.fillColor("#000000");

      for (const payment of data.payments) {
        ensureSpace(doc, 16);
        const rowY = doc.y;

        doc.fontSize(8);
        doc.text(formatDate(payment.paidAt), MARGIN, rowY, { width: 70 });
        doc.text(payment.invoice.invoiceNumber, MARGIN + 70, rowY, { width: 80 });
        doc.text(payment.method, MARGIN + 150, rowY, { width: 80 });
        doc.text(payment.reference ?? "—", MARGIN + 230, rowY, { width: 100 });
        doc.text(formatMoney(payment.currency, Number(payment.amount)), MARGIN + 330, rowY, { width: 70 });
        doc.y = rowY + 14;
      }
    }

    // --- Clinical summary (optional) ---
    if (data.includeClinicalSummary) {
      drawSectionTitle(doc, "Clinical Summary");

      if (data.clinicalNotes.length === 0) {
        doc.fontSize(10).text("No clinical notes available for this period.");
      } else {
        for (const note of data.clinicalNotes) {
          ensureSpace(doc, 60);
          const author = fullName(note.author.firstName, note.author.lastName);
          doc.fontSize(9).font("Helvetica-Bold").text(`${note.type}${note.title ? `: ${note.title}` : ""}`);
          doc.font("Helvetica").fontSize(8).fillColor(MUTED);
          doc.text(`${formatDate(note.createdAt)} · ${author}`);
          doc.fillColor("#000000").fontSize(9);
          doc.text(truncate(note.content.replace(/\s+/g, " ").trim(), 500), { width: CONTENT_WIDTH });
          doc.moveDown(0.6);
        }
      }
    }

    // --- Footer ---
    ensureSpace(doc, 50);
    doc.moveDown(1);
    doc.strokeColor(BORDER).moveTo(MARGIN, doc.y).lineTo(PAGE_WIDTH - MARGIN, doc.y).stroke();
    doc.moveDown(0.5);
    doc.fontSize(8).fillColor(MUTED);
    doc.text(
      "This statement is provided for your records. For billing enquiries, please contact the clinic. " +
        "Clinical information is confidential and intended for the named patient only.",
      { width: CONTENT_WIDTH, align: "center" },
    );

    doc.end();
  });
}
