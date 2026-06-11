import { z } from "zod";
import { nonEmptyString } from "@ordella/validation";

const mfaCodeSchema = nonEmptyString.regex(/^\d{6}$/, "Code must be 6 digits");

export const mfaVerifySchema = z.object({
  token: mfaCodeSchema,
});

export const mfaChallengeSchema = z.object({
  userId: nonEmptyString,
  token: mfaCodeSchema,
});

export type MfaVerifyDto = z.infer<typeof mfaVerifySchema>;
export type MfaChallengeDto = z.infer<typeof mfaChallengeSchema>;
