export const PHARMACY_ROUTES = {
  base: "/pharmacy",
  health: "/pharmacy/health",
  prescriptions: "/pharmacy/prescriptions",
  prescriptionById: "/pharmacy/prescriptions/:id",
  prescriptionIssue: "/pharmacy/prescriptions/:id/issue",
  prescriptionCancel: "/pharmacy/prescriptions/:id/cancel",
  fulfillment: "/pharmacy/fulfillment",
  fulfillmentStart: "/pharmacy/fulfillment/:prescriptionId/start",
  fulfillmentComplete: "/pharmacy/fulfillment/:prescriptionId/complete",
  fulfillmentFail: "/pharmacy/fulfillment/:prescriptionId/fail",
} as const;
