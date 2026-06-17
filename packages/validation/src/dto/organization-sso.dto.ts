import { z } from "zod";
import { nonEmptyString } from "../zod/string-schemas";

export const ssoProtocolSchema = z.enum(["SAML", "OIDC"]);

export const ssoRoleMappingSchema = z
  .record(z.string().min(1), z.string().min(1))
  .refine((map) => !Object.values(map).includes("SUPER_ADMIN"), {
    message: "SUPER_ADMIN cannot be mapped from IdP groups.",
  });

export const upsertOrganizationSsoConfigSchema = z
  .object({
    ssoEnabled: z.boolean().optional(),
    ssoProtocol: ssoProtocolSchema.optional(),
    ssoMetadataUrl: z.string().url().optional(),
    ssoEntityId: z.string().optional(),
    ssoAcsUrl: z.string().url().optional(),
    ssoCertificate: z.string().optional(),
    ssoClientId: z.string().optional(),
    ssoClientSecret: z.string().optional(),
    ssoIssuer: z.string().url().optional(),
    ssoRedirectUri: z.string().url().optional(),
    ssoLogoutUrl: z.string().url().optional(),
    ssoJwksUrl: z.string().url().optional(),
    roleMappings: ssoRoleMappingSchema.optional(),
    allowSelfSignedCerts: z.boolean().optional(),
  })
  .superRefine((value, ctx) => {
    if (value.ssoEnabled !== true) {
      return;
    }

    if (!value.ssoProtocol) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "ssoProtocol is required when SSO is enabled.",
        path: ["ssoProtocol"],
      });
    }

    if (value.ssoProtocol === "SAML") {
      if (!value.ssoEntityId?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "ssoEntityId is required for SAML.",
          path: ["ssoEntityId"],
        });
      }
      if (!value.ssoAcsUrl?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "ssoAcsUrl is required for SAML.",
          path: ["ssoAcsUrl"],
        });
      }
    }

    if (value.ssoProtocol === "OIDC") {
      if (!value.ssoClientId?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "ssoClientId is required for OIDC.",
          path: ["ssoClientId"],
        });
      }
      if (!value.ssoIssuer?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "ssoIssuer is required for OIDC.",
          path: ["ssoIssuer"],
        });
      }
      if (!value.ssoRedirectUri?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "ssoRedirectUri is required for OIDC.",
          path: ["ssoRedirectUri"],
        });
      }
    }
  });

export const refreshOrganizationSsoMetadataSchema = z.object({
  force: z.boolean().optional(),
});

export type UpsertOrganizationSsoConfigInput = z.infer<typeof upsertOrganizationSsoConfigSchema>;
export type SsoProtocol = z.infer<typeof ssoProtocolSchema>;
