export type { EventContract, EventContractRegistry } from "./core/event-contract";
export { isVersionCompatible, type EventVersionCompatibility } from "./core/event-version";
export { AUTH_EVENT_CONTRACTS } from "./domains/auth.contracts";
export { TENANT_EVENT_CONTRACTS } from "./domains/tenant.contracts";
export { PATIENT_EVENT_CONTRACTS } from "./domains/patient.contracts";
export { APPOINTMENT_EVENT_CONTRACTS } from "./domains/appointment.contracts";
export { NOTES_EVENT_CONTRACTS } from "./domains/notes.contracts";
export { BILLING_EVENT_CONTRACTS } from "./domains/billing.contracts";
export { PAYMENT_EVENT_CONTRACTS } from "./domains/payment.contracts";
export { COMMUNICATION_EVENT_CONTRACTS } from "./domains/communication.contracts";
export { REPORTING_EVENT_CONTRACTS } from "./domains/reporting.contracts";

import { AUTH_EVENT_CONTRACTS } from "./domains/auth.contracts";
import { TENANT_EVENT_CONTRACTS } from "./domains/tenant.contracts";
import { PATIENT_EVENT_CONTRACTS } from "./domains/patient.contracts";
import { APPOINTMENT_EVENT_CONTRACTS } from "./domains/appointment.contracts";
import { NOTES_EVENT_CONTRACTS } from "./domains/notes.contracts";
import { BILLING_EVENT_CONTRACTS } from "./domains/billing.contracts";
import { PAYMENT_EVENT_CONTRACTS } from "./domains/payment.contracts";
import { COMMUNICATION_EVENT_CONTRACTS } from "./domains/communication.contracts";
import { REPORTING_EVENT_CONTRACTS } from "./domains/reporting.contracts";
import type { EventContractRegistry } from "./core/event-contract";

export const ALL_EVENT_CONTRACTS = [
  ...AUTH_EVENT_CONTRACTS,
  ...TENANT_EVENT_CONTRACTS,
  ...PATIENT_EVENT_CONTRACTS,
  ...APPOINTMENT_EVENT_CONTRACTS,
  ...NOTES_EVENT_CONTRACTS,
  ...BILLING_EVENT_CONTRACTS,
  ...PAYMENT_EVENT_CONTRACTS,
  ...COMMUNICATION_EVENT_CONTRACTS,
  ...REPORTING_EVENT_CONTRACTS,
];

export function buildEventContractRegistry(): EventContractRegistry {
  return Object.fromEntries(ALL_EVENT_CONTRACTS.map((contract) => [contract.eventName, contract]));
}
