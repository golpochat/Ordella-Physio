export const MOCK_APPOINTMENTS = [
  {
    id: "apt-1",
    patientName: "Sarah Mitchell",
    therapistName: "Dr. James Chen",
    startsAt: "2026-06-10T09:00:00.000Z",
    status: "confirmed",
    type: "Follow-up",
  },
  {
    id: "apt-2",
    patientName: "Michael Brown",
    therapistName: "Dr. Priya Sharma",
    startsAt: "2026-06-10T11:30:00.000Z",
    status: "scheduled",
    type: "Initial assessment",
  },
  {
    id: "apt-3",
    patientName: "Emily Watson",
    therapistName: "Dr. James Chen",
    startsAt: "2026-06-11T14:00:00.000Z",
    status: "scheduled",
    type: "Sports rehab",
  },
] as const;

export const MOCK_PATIENTS = [
  {
    id: "pat-1",
    name: "Sarah Mitchell",
    email: "sarah@example.com",
    phone: "+44 7700 900123",
    lastVisit: "2026-06-03",
  },
  {
    id: "pat-2",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "+44 7700 900456",
    lastVisit: "2026-06-08",
  },
  {
    id: "pat-3",
    name: "Emily Watson",
    email: "emily@example.com",
    phone: "+44 7700 900789",
    lastVisit: "2026-06-09",
  },
] as const;

export const MOCK_INVOICES = [
  {
    id: "inv-1",
    patientName: "Sarah Mitchell",
    amount: 85,
    status: "paid",
    dueDate: "2026-06-01",
  },
  {
    id: "inv-2",
    patientName: "Michael Brown",
    amount: 120,
    status: "outstanding",
    dueDate: "2026-06-15",
  },
  {
    id: "inv-3",
    patientName: "Emily Watson",
    amount: 65,
    status: "outstanding",
    dueDate: "2026-06-20",
  },
] as const;

export const MOCK_NOTES = [
  {
    id: "note-1",
    patientName: "Sarah Mitchell",
    type: "SOAP",
    summary: "Improved ROM in left shoulder. Continue strengthening plan.",
    updatedAt: "2026-06-09",
  },
  {
    id: "note-2",
    patientName: "Michael Brown",
    type: "Clinical",
    summary: "Initial assessment completed. Plan for 6 sessions.",
    updatedAt: "2026-06-08",
  },
] as const;

export const MOCK_ACTIVITY = [
  { id: "act-1", label: "Invoice #inv-2 marked outstanding", time: "2h ago" },
  { id: "act-2", label: "SOAP note added for Sarah Mitchell", time: "4h ago" },
  { id: "act-3", label: "Appointment confirmed for Michael Brown", time: "Yesterday" },
] as const;

export const MOCK_NOTIFICATIONS = [
  { id: "notif-1", title: "Appointment reminder", body: "Sarah Mitchell at 9:00 AM", read: false },
  { id: "notif-2", title: "Payment received", body: "Invoice #inv-1 paid", read: true },
] as const;
