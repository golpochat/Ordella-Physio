import type {
  PharmacyAppointment,
  PharmacyFulfillmentOrder,
  PharmacyPatient,
  PharmacyPrescription,
} from "@/lib/pharmacy-portal-types";

const MEDICATION_ROTATION = [
  { medication: "Ibuprofen 400mg", dosage: "1 tablet twice daily" },
  { medication: "Physiotherapy gel", dosage: "Apply topically 3x daily" },
  { medication: "Muscle relaxant", dosage: "1 capsule at bedtime" },
] as const;

const PRESCRIPTION_STATUSES: PharmacyPrescription["status"][] = [
  "PENDING",
  "APPROVED",
  "DISPENSED",
];

const FULFILLMENT_STATUSES: PharmacyFulfillmentOrder["status"][] = [
  "QUEUED",
  "PREPARING",
  "READY",
];

function patientDisplayName(patient: PharmacyPatient): string {
  return [patient.firstName, patient.lastName].filter(Boolean).join(" ").trim() || "Patient";
}

export function buildPharmacyPrescriptionsFromClinicalData(
  patients: PharmacyPatient[],
  appointments: PharmacyAppointment[],
): PharmacyPrescription[] {
  if (patients.length === 0) {
    return [];
  }

  return patients.slice(0, 12).map((patient, index) => {
    const medication = MEDICATION_ROTATION[index % MEDICATION_ROTATION.length];
    const linkedAppointment =
      appointments.find((appointment) => appointment.patientId === patient.id) ?? null;

    return {
      id: `rx-${patient.id}`,
      patientId: patient.id,
      patientName: patientDisplayName(patient),
      medication: medication.medication,
      dosage: medication.dosage,
      status: PRESCRIPTION_STATUSES[index % PRESCRIPTION_STATUSES.length],
      requestedAt: linkedAppointment?.startTime ?? patient.createdAt,
      appointmentId: linkedAppointment?.id ?? null,
    };
  });
}

export function buildPharmacyFulfillmentOrders(
  prescriptions: PharmacyPrescription[],
): PharmacyFulfillmentOrder[] {
  return prescriptions
    .filter((prescription) => prescription.status !== "CANCELLED")
    .map((prescription, index) => ({
      id: `ful-${prescription.id}`,
      prescriptionId: prescription.id,
      patientId: prescription.patientId,
      patientName: prescription.patientName,
      medication: prescription.medication,
      status: FULFILLMENT_STATUSES[index % FULFILLMENT_STATUSES.length],
      appointmentId: prescription.appointmentId,
      updatedAt: prescription.requestedAt,
    }));
}
