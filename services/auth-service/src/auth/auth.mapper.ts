import { sanitizeUser } from "@/utils/auth-helpers";
import type { UserRecord } from "@/users/users.mapper";

export type AuthTokensResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  sessionId: string;
};

export function toAuthResponse(user: UserRecord, tokens: AuthTokensResponse) {
  return {
    user: sanitizeUser(user),
    ...tokens,
  };
}
