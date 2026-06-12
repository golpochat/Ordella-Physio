export type StaffSourceRecord = {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  staffType?: string | null;
  status?: string | null;
};

export function transformStaffForIndex(staff: StaffSourceRecord) {
  const fullName = `${staff.firstName} ${staff.lastName}`.trim();

  return {
    id: staff.id,
    tenantId: staff.tenantId,
    firstName: staff.firstName,
    lastName: staff.lastName,
    name: fullName,
    label: fullName,
    email: staff.email,
    phone: staff.phone ?? "",
    role: staff.staffType ?? "",
    status: staff.status ?? "",
    searchableText: [fullName, staff.email, staff.phone, staff.staffType].filter(Boolean).join(" "),
  };
}
