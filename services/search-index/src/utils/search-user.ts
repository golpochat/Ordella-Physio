export type AuthenticatedSearchUser = {
  userId: string;
  tenantId: string;
  role: string;
  email?: string;
  permissions?: string[];
};
