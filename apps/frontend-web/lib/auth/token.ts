import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "@/lib/utils/authStorage";

export { clearTokens, getAccessToken, getRefreshToken, setTokens };

export function hasRefreshSession(): boolean {
  return Boolean(getRefreshToken());
}
