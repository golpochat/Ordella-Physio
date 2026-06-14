"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortalRoleGate } from "@/components/navigation/PortalRoleGate";
import { API_ROUTES } from "@/lib/constants";
import { downloadPdfFromApi } from "@/lib/clinic-ui/download-pdf";
import type { PortalCapability } from "@/lib/portal-capabilities";
import { useClinicScope } from "./use-clinic-scope";

export type PdfDownloadButtonProps = {
  service: keyof typeof API_ROUTES;
  path: string;
  filename: string;
  label?: string;
  readCapability?: PortalCapability;
  writeCapability?: PortalCapability;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
};

export function PdfDownloadButton({
  service,
  path,
  filename,
  label = "Download PDF",
  readCapability = "billing:read",
  writeCapability,
  variant = "outline",
  size = "sm",
  className,
}: PdfDownloadButtonProps) {
  const { can, hasTenant } = useClinicScope();
  const [loading, setLoading] = useState(false);
  const allowed =
    hasTenant &&
    can(readCapability) &&
    (!writeCapability || can(writeCapability));

  async function handleDownload() {
    if (!allowed) {
      toast.error("You do not have permission to download this document.");
      return;
    }

    setLoading(true);
    try {
      await downloadPdfFromApi({ service, path, filename });
      toast.success("PDF downloaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "PDF download failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PortalRoleGate capability={readCapability}>
      <Button
        type="button"
        variant={variant}
        size={size}
        className={className}
        disabled={!allowed || loading}
        onClick={() => void handleDownload()}
      >
        <Download className="mr-2 h-4 w-4" />
        {loading ? "Downloading…" : label}
      </Button>
    </PortalRoleGate>
  );
}

export type PatientStatementPdfButtonProps = {
  patientId: string;
  includeClinicalSummary?: boolean;
  filename?: string;
  label?: string;
};

export function PatientStatementPdfButton({
  patientId,
  includeClinicalSummary = false,
  filename,
  label = "Download statement",
}: PatientStatementPdfButtonProps) {
  const params = includeClinicalSummary ? "?includeClinicalSummary=true" : "";

  return (
    <PdfDownloadButton
      service="patient"
      path={`/${patientId}/service-statement/pdf${params}`}
      filename={filename ?? `patient-statement-${patientId}.pdf`}
      label={label}
      readCapability="billing:read"
      writeCapability="billing:write"
    />
  );
}

export type InvoicePdfButtonProps = {
  invoiceId: string;
  invoiceNumber: string;
};

export function InvoicePdfButton({ invoiceId, invoiceNumber }: InvoicePdfButtonProps) {
  return (
    <PdfDownloadButton
      service="billing"
      path={`/invoices/${invoiceId}/pdf`}
      filename={`${invoiceNumber}.pdf`}
      label="Download invoice PDF"
      readCapability="billing:read"
    />
  );
}
