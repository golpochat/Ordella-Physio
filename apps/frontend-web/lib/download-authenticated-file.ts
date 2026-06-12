import {
  API_ROUTES,
  AUTHORIZATION_HEADER,
  CORRELATION_ID_HEADER,
  TENANT_HEADER,
} from "@/lib/constants";

export async function downloadAuthenticatedFile(options: {
  service: keyof typeof API_ROUTES;
  path: string;
  fileName: string;
  accessToken?: string | null;
  tenantId?: string | null;
  correlationId?: string | null;
}): Promise<void> {
  const normalizedPath = options.path.startsWith("/") ? options.path : `/${options.path}`;
  const url = new URL(`${API_ROUTES[options.service]}${normalizedPath}`, window.location.origin);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      ...(options.correlationId ? { [CORRELATION_ID_HEADER]: options.correlationId } : {}),
      ...(options.tenantId ? { [TENANT_HEADER]: options.tenantId } : {}),
      ...(options.accessToken ? { [AUTHORIZATION_HEADER]: `Bearer ${options.accessToken}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to download file.");
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = options.fileName;
  anchor.click();
  URL.revokeObjectURL(objectUrl);
}
