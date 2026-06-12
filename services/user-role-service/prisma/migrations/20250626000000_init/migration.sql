-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "permissions_code_key" ON "permissions"("code");

-- CreateIndex
CREATE INDEX "roles_tenantId_idx" ON "roles"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "roles_tenantId_code_key" ON "roles"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "roles_tenantId_name_key" ON "roles"("tenantId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "role_permissions_roleId_permissionId_key" ON "role_permissions"("roleId", "permissionId");

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Seed permissions
INSERT INTO "permissions" ("id", "code", "description") VALUES
  ('perm_user_manage', 'user.manage', 'Manage users'),
  ('perm_role_manage', 'role.manage', 'Manage roles'),
  ('perm_location_manage', 'location.manage', 'Manage locations'),
  ('perm_terminal_manage', 'terminal.manage', 'Manage terminals'),
  ('perm_appointment_manage', 'appointment.manage', 'Manage appointments'),
  ('perm_billing_manage', 'billing.manage', 'Manage billing'),
  ('perm_inventory_manage', 'inventory.manage', 'Manage inventory'),
  ('perm_reporting_view', 'reporting.view', 'View reports'),
  ('perm_reporting_read', 'reporting.read', 'Read reporting data'),
  ('perm_patient_view', 'patient.view', 'View patients'),
  ('perm_patient_edit', 'patient.edit', 'Edit patients'),
  ('perm_notes_read', 'notes.read', 'Read clinical notes'),
  ('perm_notes_write', 'notes.write', 'Write clinical notes'),
  ('perm_messaging_read', 'messaging.read', 'Read messages'),
  ('perm_messaging_write', 'messaging.write', 'Send messages'),
  ('perm_tenant_manage', 'tenant.manage', 'Manage tenant settings'),
  ('perm_settings_manage', 'settings.manage', 'Manage platform settings'),
  ('perm_organization_manage', 'organization.manage', 'Manage organizations')
ON CONFLICT ("code") DO NOTHING;
