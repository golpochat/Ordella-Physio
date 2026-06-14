import { prisma } from "../../lib/prisma";

export async function getClinicSummaryReport(tenantId: string) {
  const [patients, appointments, invoices, payments, therapists, staff] = await Promise.all([
    prisma.patient.count({ where: { tenantId, isActive: true } }),
    prisma.appointment.groupBy({
      by: ["status"],
      where: { tenantId },
      _count: { _all: true },
    }),
    prisma.invoice.groupBy({
      by: ["status"],
      where: { tenantId },
      _count: { _all: true },
      _sum: { total: true },
    }),
    prisma.payment.aggregate({
      where: { tenantId, status: "COMPLETED" },
      _sum: { amount: true },
      _count: { _all: true },
    }),
    prisma.therapist.count({ where: { tenantId, isActive: true } }),
    prisma.staff.count({ where: { tenantId, isActive: true } }),
  ]);

  return {
    patientsActive: patients,
    therapistsActive: therapists,
    staffActive: staff,
    appointmentsByStatus: appointments.map((row) => ({
      status: row.status,
      count: row._count._all,
    })),
    invoicesByStatus: invoices.map((row) => ({
      status: row.status,
      count: row._count._all,
      total: Number(row._sum.total ?? 0),
    })),
    paymentsCompleted: {
      count: payments._count._all,
      amount: Number(payments._sum.amount ?? 0),
    },
    generatedAt: new Date().toISOString(),
  };
}

export async function getRevenueReport(tenantId: string, from: Date, to: Date) {
  const payments = await prisma.payment.findMany({
    where: {
      tenantId,
      status: "COMPLETED",
      paidAt: { gte: from, lte: to },
    },
    include: { invoice: { include: { patient: true } } },
    orderBy: { paidAt: "desc" },
  });

  const total = payments.reduce((sum, payment) => sum + Number(payment.amount), 0);

  return {
    from: from.toISOString(),
    to: to.toISOString(),
    total,
    payments,
  };
}
