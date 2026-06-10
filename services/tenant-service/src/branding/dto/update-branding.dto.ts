export type UpdateBrandingDto = {
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  theme?: string;
  emailTemplateKey?: string;
  metadata?: Record<string, unknown>;
};
