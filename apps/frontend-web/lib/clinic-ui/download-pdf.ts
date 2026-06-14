import { v4 as uuidv4 } from "uuid";
import { ensureFreshAccessToken } from "@/lib/session-manager";
import { useAuthStore } from "@/store/auth.store";
import { useTenantStore } from "@/store/tenant.store";
import { API_ROUTES, AUTHORIZATION_HEADER, CORRELATION_ID_HEADER, TENANT_HEADER } from "@/lib/constants";
import { isSystemRole, mapAuthRoleToPortalRole } from "@/lib/auth/roleRedirect";
import { isSystemUser } from "@/lib/auth/roleRedirect";

type DownloadPdfOptions = {
  service: keyof typeof API_ROUTES;
  path: string;
  filename: string;
};

export async function downloadPdfFromApi(options: DownloadPdfOptions): Promise<void> {
  await ensureFreshAccessToken();

  const auth = useAuthStore.getState();
  const tenant = useTenantStore.getState().tenant;
  const accessToken = auth.accessToken;
  const tenantId = tenant?.id ?? auth.user?.tenantId ?? null;
  const roles =
    auth.user?.roles?.map((role) => mapAuthRoleToPortalRole(role)) ??
    (auth.user?.role ? [mapAuthRoleToPortalRole(auth.user.role)] : []);
  const systemUser = isSystemRole(auth.user?.role ?? undefined) || isSystemUser(roles);
  const includeTenant = Boolean(tenantId) && !systemUser;

  const base = API_ROUTES[options.service];
  const url = new URL(`${base}${options.path.startsWith("/") ? options.path : `/${options.path}`}`, window.location.origin);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      [CORRELATION_ID_HEADER]: uuidv4(),
      ...(includeTenant && tenantId ? { [TENANT_HEADER]: tenantId } : {}),
      ...(accessToken ? { [AUTHORIZATION_HEADER]: `Bearer ${accessToken}` } : {}),
      Accept: "application/pdf",
    },
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error((payload as { message?: string } | null)?.message ?? "PDF download failed");
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = options.filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(objectUrl);
}
