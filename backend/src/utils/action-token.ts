import jwt from "jsonwebtoken";

import { env } from "../config";

export type PasswordResetTokenPayload = {
  sub: string;
  tenantId: string;
  email: string;
  type: "password_reset";
};

export function signPasswordResetToken(input: {
  userId: string;
  tenantId: string;
  email: string;
}): string {
  return jwt.sign(
    {
      sub: input.userId,
      tenantId: input.tenantId,
      email: input.email,
      type: "password_reset",
    },
    env.JWT_SECRET,
    { expiresIn: "30m" },
  );
}

export function verifyPasswordResetToken(token: string): PasswordResetTokenPayload {
  const payload = jwt.verify(token, env.JWT_SECRET) as PasswordResetTokenPayload;

  if (payload.type !== "password_reset" || !payload.sub || !payload.tenantId || !payload.email) {
    throw new Error("Invalid password reset token");
  }

  return payload;
}
