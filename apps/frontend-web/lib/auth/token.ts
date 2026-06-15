import { clearTokens, getAccessToken, setAccessToken, setTokens } from "@/lib/utils/authStorage";
import { getStoredIsAuthenticated } from "@/lib/auth-storage";

export { clearTokens, getAccessToken, setAccessToken, setTokens };

export function hasRefreshSession(): boolean {
  return getStoredIsAuthenticated();
}
