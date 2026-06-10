import { z } from "zod";
import { nonEmptyString } from "@ordella/validation";

export const verifyEmailSchema = z.object({
  token: nonEmptyString,
});

export type VerifyEmailDto = z.infer<typeof verifyEmailSchema>;
