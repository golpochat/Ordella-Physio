import { headers } from "next/headers";

export const NONCE_HEADER = "x-nonce";

export function getRequestNonce(): string | undefined {
  return headers().get(NONCE_HEADER) ?? undefined;
}
