INSERT INTO "permissions" ("id", "code", "description") VALUES
  ('perm_patient_attachments', 'patient.attachments', 'Manage patient attachments')
ON CONFLICT ("code") DO NOTHING;
