/**
 * Legacy scaffold paths (pre-/clinic/*) → canonical clinic portal routes.
 * Does not touch /patient/* (singular patient portal).
 */
export function resolveLegacyClinicRedirect(pathname: string): string | null {
  if (pathname === "/patients") {
    return "/clinic/patients";
  }

  const patientMatch = pathname.match(/^\/patients\/([^/]+)$/);
  if (patientMatch?.[1]) {
    return `/clinic/patients/${patientMatch[1]}`;
  }

  if (pathname === "/appointments") {
    return "/clinic/appointments";
  }

  const appointmentMatch = pathname.match(/^\/appointments\/([^/]+)$/);
  if (appointmentMatch?.[1]) {
    return `/clinic/appointments/${appointmentMatch[1]}`;
  }

  if (pathname === "/notes") {
    return "/clinic/notes";
  }

  const noteMatch = pathname.match(/^\/notes\/([^/]+)$/);
  if (noteMatch?.[1]) {
    return `/clinic/notes/${noteMatch[1]}`;
  }

  if (pathname === "/billing") {
    return "/clinic/billing";
  }

  if (pathname === "/billing/invoices" || pathname === "/billing/invoices/new") {
    return "/clinic/billing/invoices";
  }

  const invoiceMatch = pathname.match(/^\/billing\/invoices\/([^/]+)(?:\/.*)?$/);
  if (invoiceMatch?.[1]) {
    return `/clinic/billing/${invoiceMatch[1]}`;
  }

  return null;
}
