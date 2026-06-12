INSERT INTO "permissions" ("id", "code", "description") VALUES
  ('perm_patient_notes', 'patient.notes', 'Manage patient medical notes')
ON CONFLICT ("code") DO NOTHING;
