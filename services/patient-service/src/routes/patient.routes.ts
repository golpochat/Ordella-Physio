export const PATIENT_ROUTES = {
  base: "/patients",
  health: "/patients/health",
  create: "/patients",
  list: "/patients",
  getById: "/patients/:id",
  update: "/patients/:id",
  delete: "/patients/:id",
  medicalRecord: "/patients/:id/medical-record",
  notesLink: "/patients/:id/notes-link",
} as const;
