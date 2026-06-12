INSERT INTO "permissions" ("id", "code", "description") VALUES
  ('perm_patient_manage', 'patient.manage', 'Manage patients')
ON CONFLICT ("code") DO NOTHING;
