import { z } from "zod";
import { nonEmptyString } from "@ordella/validation";

export const resetPasswordSchema = z.object({
  token: nonEmptyString,
  newPassword: nonEmptyString.min(8, "Password must be at least 8 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;
export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;
