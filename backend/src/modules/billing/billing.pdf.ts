import PDFDocument from "pdfkit";
import type { InvoiceWithRelations } from "./billing.types";

type PdfInvoiceData = InvoiceWithRelations & {
  paidTotal: number;
  outstanding: number;
};

export function generateInvoicePdf(data: PdfInvoiceData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: "A4" });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const patientName = `${data.patient.firstName} ${data.patient.lastName}`.trim();

    doc.fontSize(20).text(data.tenant.name, { align: "left" });
    doc.moveDown(0.5);
    doc.fontSize(16).text("INVOICE", { align: "right" });
    doc.fontSize(10).text(`Invoice #: ${data.invoiceNumber}`, { align: "right" });
    doc.text(`Status: ${data.status}`, { align: "right" });
    if (data.issuedAt) {
      doc.text(`Issued: ${data.issuedAt.toISOString().slice(0, 10)}`, { align: "right" });
    }
    if (data.dueDate) {
      doc.text(`Due: ${data.dueDate.toISOString().slice(0, 10)}`, { align: "right" });
    }

    doc.moveDown(1.5);
    doc.fontSize(12).text("Bill To:");
    doc.fontSize(10).text(patientName);
    if (data.patient.email) doc.text(data.patient.email);
    if (data.patient.phone) doc.text(data.patient.phone);

    doc.moveDown(1);
    doc.fontSize(12).text("Description", 50, doc.y, { continued: false });
    doc.moveDown(0.3);
    doc.fontSize(10).text(data.description ?? "Clinical services", { width: 500 });

    if (data.appointment) {
      doc.moveDown(0.5);
      doc.text(
        `Appointment: ${data.appointment.type} — ${data.appointment.startTime.toISOString().slice(0, 16).replace("T", " ")}`,
      );
    }

    doc.moveDown(1.5);
    const labelX = 350;
    const valueX = 480;

    doc.fontSize(10);
    doc.text("Subtotal:", labelX, doc.y, { width: 120, align: "right" });
    doc.text(`${data.currency} ${Number(data.subtotal).toFixed(2)}`, valueX, doc.y - 12, { align: "right" });

    doc.moveDown(0.5);
    doc.text("Tax:", labelX, doc.y, { width: 120, align: "right" });
    doc.text(`${data.currency} ${Number(data.tax).toFixed(2)}`, valueX, doc.y - 12, { align: "right" });

    doc.moveDown(0.5);
    doc.fontSize(12).text("Total:", labelX, doc.y, { width: 120, align: "right" });
    doc.text(`${data.currency} ${Number(data.total).toFixed(2)}`, valueX, doc.y - 14, { align: "right" });

    doc.moveDown(1);
    doc.fontSize(10).text(`Paid: ${data.currency} ${data.paidTotal.toFixed(2)}`);
    doc.text(`Outstanding: ${data.currency} ${data.outstanding.toFixed(2)}`);

    if (data.payments.length > 0) {
      doc.moveDown(1);
      doc.fontSize(12).text("Payments");
      doc.moveDown(0.3);
      for (const payment of data.payments) {
        const date = payment.paidAt ? payment.paidAt.toISOString().slice(0, 10) : "—";
        doc
          .fontSize(9)
          .text(
            `${date}  ${payment.method}  ${data.currency} ${Number(payment.amount).toFixed(2)}${payment.reference ? `  (${payment.reference})` : ""}`,
          );
      }
    }

    doc.end();
  });
}
