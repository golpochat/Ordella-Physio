import type { findPatientProfile } from "./patients.repository";

type ProfileRecord = Awaited<ReturnType<typeof findPatientProfile>>;

export function mapPatientDemographics(patient: ProfileRecord["patient"]) {
  return {
    id: patient.id,
    firstName: patient.firstName,
    lastName: patient.lastName,
    email: patient.email,
    phone: patient.phone,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    address: {
      line1: patient.addressLine1,
      line2: patient.addressLine2,
      city: patient.city,
      state: patient.state,
      postalCode: patient.postalCode,
      country: patient.country,
    },
    emergencyContact: {
      name: patient.emergencyContactName,
      phone: patient.emergencyContactPhone,
    },
    isActive: patient.isActive,
    createdAt: patient.createdAt,
    updatedAt: patient.updatedAt,
  };
}

export function mapPatientProfile(record: ProfileRecord) {
  const { patient, payments, counts, billingSummary } = record;

  return {
    demographics: mapPatientDemographics(patient),
    appointmentHistory: patient.appointments.map((appointment) => ({
      id: appointment.id,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      status: appointment.status,
      type: appointment.type,
      notes: appointment.notes,
      therapist: appointment.therapist
        ? {
            id: appointment.therapist.id,
            specialty: appointment.therapist.specialty,
            user: appointment.therapist.user,
          }
        : null,
    })),
    billingHistory: patient.invoices.map((invoice) => ({
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      status: invoice.status,
      subtotal: invoice.subtotal,
      tax: invoice.tax,
      total: invoice.total,
      currency: invoice.currency,
      dueDate: invoice.dueDate,
      issuedAt: invoice.issuedAt,
      paidAt: invoice.paidAt,
      payments: invoice.payments.map((payment) => ({
        id: payment.id,
        amount: payment.amount,
        status: payment.status,
        method: payment.method,
        reference: payment.reference,
        paidAt: payment.paidAt,
      })),
    })),
    notes: patient.notes.map((note) => ({
      id: note.id,
      type: note.type,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      author: note.author,
    })),
    payments: payments.map((payment) => ({
      id: payment.id,
      amount: payment.amount,
      status: payment.status,
      method: payment.method,
      reference: payment.reference,
      paidAt: payment.paidAt,
      invoice: payment.invoice,
    })),
    counts,
    billingSummary,
  };
}
