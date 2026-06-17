export const SSO_PROTOCOLS = ["SAML", "OIDC"] as const;
export type SsoProtocol = (typeof SSO_PROTOCOLS)[number];

export const SSO_BLOCKED_ROLES = ["SUPER_ADMIN", "SYSTEM"] as const;

export const SSO_AUDIT_EVENTS = {
  LOGIN_SUCCESS: "sso.login.success",
  LOGIN_FAILURE: "sso.login.failure",
  METADATA_UPDATE: "sso.metadata.update",
  CERTIFICATE_ROTATION: "sso.certificate.rotation",
  ROLE_MAPPING_CHANGE: "sso.role_mapping.change",
  LOGOUT: "sso.logout",
  CONFIG_UPDATE: "sso.config.update",
} as const;

export const SSO_DEFAULT_ROLE = "STAFF" as const;

export const SSO_METADATA_MAX_AGE_MS = 24 * 60 * 60 * 1000;

export const SSO_STATE_TTL_MS = 15 * 60 * 1000;
