export type AuthenticatedCommunicationUser = {
  userId: string;
  tenantId: string;
  role: string;
  email?: string;
  permissions?: string[];
};

export async function fetchTenantBrandingPlaceholder(_tenantId: string): Promise<Record<string, string>> {
  // Placeholder: integrate with tenant-service branding
  return { clinicName: "Ordella Physio", primaryColor: "#2563eb" };
}

export function isValidWebhookUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}
