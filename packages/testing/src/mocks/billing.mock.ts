import { nextSequence, randomFrom } from "./random";

export type MockInvoiceStatus =
  | "DRAFT"
  | "SENT"
  | "PAID"
  | "PARTIALLY_PAID"
  | "OVERDUE"
  | "CANCELLED";

export type MockInvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
};

export type MockInvoice = {
  id: string;
  tenantId: string;
  patientId: string;
  appointmentId: string | null;
  currency: string;
  status: MockInvoiceStatus;
  dueDate: Date | null;
  notes: string | null;
  taxRateId: string | null;
  items: MockInvoiceItem[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
};

const STATUSES: MockInvoiceStatus[] = [
  "DRAFT",
  "SENT",
  "PAID",
  "PARTIALLY_PAID",
  "OVERDUE",
  "CANCELLED",
];

export function mockInvoice(overrides: Partial<MockInvoice> = {}): MockInvoice {
  const index = nextSequence();
  const now = new Date("2024-01-01T00:00:00.000Z");
  const items = overrides.items ?? [
    {
      id: `item-${index}`,
      description: `Treatment session ${index}`,
      quantity: 1,
      unitPrice: 75,
    },
  ];
  const totalAmount =
    overrides.totalAmount ?? items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  return {
    id: overrides.id ?? `invoice-${index}`,
    tenantId: overrides.tenantId ?? `tenant-${index}`,
    patientId: overrides.patientId ?? `patient-${index}`,
    appointmentId: overrides.appointmentId ?? `appointment-${index}`,
    currency: overrides.currency ?? "GBP",
    status: overrides.status ?? randomFrom(STATUSES),
    dueDate: overrides.dueDate ?? new Date("2024-07-01T00:00:00.000Z"),
    notes: overrides.notes ?? null,
    taxRateId: overrides.taxRateId ?? null,
    items,
    totalAmount,
    createdAt: overrides.createdAt ?? now,
    updatedAt: overrides.updatedAt ?? now,
    ...overrides,
  };
}
