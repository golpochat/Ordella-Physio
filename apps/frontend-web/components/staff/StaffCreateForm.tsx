"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "@ordella/shared-icons";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useClinicLocationsList } from "@/hooks/useClinicPortal";
import { useCreateClinicStaffMember } from "@/hooks/useClinicStaffMember";
import { useClinicRolesList } from "@/hooks/useUserRolePortal";
import { parseStaffMemberCreateErrors } from "@/lib/clinic-staff-member-api-errors";
import {
  CLINIC_STAFF_STATUSES,
  CLINIC_STAFF_TYPES,
  type ClinicStaffStatus,
  type ClinicStaffType,
} from "@/lib/clinic-staff-member-types";
import { cn } from "@/lib/cn";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STAFF_TYPE_LABELS: Record<ClinicStaffType, string> = {
  DOCTOR: "Doctor",
  NURSE: "Nurse",
  ADMIN: "Admin",
  RECEPTIONIST: "Receptionist",
  TECHNICIAN: "Technician",
  OTHER: "Other",
};

export function StaffCreateForm() {
  const router = useRouter();
  const createStaff = useCreateClinicStaffMember();
  const rolesQuery = useClinicRolesList({ limit: 200, page: 1 });
  const locationsQuery = useClinicLocationsList({ status: "ACTIVE", limit: 200, page: 1 });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [staffType, setStaffType] = useState<ClinicStaffType>("RECEPTIONIST");
  const [roleId, setRoleId] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [status, setStatus] = useState<ClinicStaffStatus>("ACTIVE");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const roles = rolesQuery.data?.data ?? [];
  const locations = locationsQuery.data?.data ?? [];

  function toggleLocation(locationId: string) {
    setSelectedLocations((current) =>
      current.includes(locationId)
        ? current.filter((entry) => entry !== locationId)
        : [...current, locationId],
    );
  }

  function validateClient(): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      errors.email = "Enter a valid email";
    }

    if (!roleId.trim()) {
      errors.roleId = "Role is required";
    }

    if (selectedLocations.length === 0) {
      errors.locations = "Select at least one location";
    }

    return errors;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add staff member</CardTitle>
        <CardDescription>
          Create a staff profile with role and location assignments for your clinic.
        </CardDescription>
      </CardHeader>
      <CardBody>
        <form
          className="tenant-create-form"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            setGeneralError(null);

            const clientErrors = validateClient();
            if (Object.keys(clientErrors).length > 0) {
              setFieldErrors(clientErrors);
              return;
            }

            setFieldErrors({});

            createStaff.mutate(
              {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                phone: phone.trim() || undefined,
                staffType,
                roleId: roleId.trim(),
                locations: selectedLocations,
                status,
              },
              {
                onSuccess: (response) => {
                  toast.success(response.message ?? "Staff member created successfully.");
                  router.push("/clinic/staff");
                },
                onError: (error) => {
                  const result = parseStaffMemberCreateErrors(error);

                  if (result.forbidden) {
                    router.replace("/forbidden");
                    return;
                  }

                  if (result.invalidRole || result.invalidLocation) {
                    toast.error(result.generalError ?? "Unable to create staff member.");
                    return;
                  }

                  setFieldErrors(result.fieldErrors);
                  setGeneralError(result.generalError);
                },
              },
            );
          }}
        >
          {generalError ? <p className="tenant-create-form-error">{generalError}</p> : null}

          <div className="tenant-create-form-grid">
            <div className="tenant-create-form-field">
              <Label htmlFor="staff-first-name">First name</Label>
              <Input
                id="staff-first-name"
                value={firstName}
                className={cn(fieldErrors.firstName && "tenant-create-form-select-error")}
                onChange={(event) => setFirstName(event.target.value)}
                disabled={createStaff.isPending}
              />
              {fieldErrors.firstName ? (
                <p className="tenant-create-form-field-error">{fieldErrors.firstName}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="staff-last-name">Last name</Label>
              <Input
                id="staff-last-name"
                value={lastName}
                className={cn(fieldErrors.lastName && "tenant-create-form-select-error")}
                onChange={(event) => setLastName(event.target.value)}
                disabled={createStaff.isPending}
              />
              {fieldErrors.lastName ? (
                <p className="tenant-create-form-field-error">{fieldErrors.lastName}</p>
              ) : null}
            </div>
          </div>

          <div className="tenant-create-form-grid">
            <div className="tenant-create-form-field">
              <Label htmlFor="staff-email">Email</Label>
              <Input
                id="staff-email"
                type="email"
                autoComplete="email"
                value={email}
                className={cn(fieldErrors.email && "tenant-create-form-select-error")}
                onChange={(event) => setEmail(event.target.value)}
                disabled={createStaff.isPending}
              />
              {fieldErrors.email ? (
                <p className="tenant-create-form-field-error">{fieldErrors.email}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="staff-phone">Phone</Label>
              <Input
                id="staff-phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                className={cn(fieldErrors.phone && "tenant-create-form-select-error")}
                onChange={(event) => setPhone(event.target.value)}
                disabled={createStaff.isPending}
              />
              {fieldErrors.phone ? (
                <p className="tenant-create-form-field-error">{fieldErrors.phone}</p>
              ) : null}
            </div>
          </div>

          <div className="tenant-create-form-grid">
            <div className="tenant-create-form-field">
              <Label htmlFor="staff-type">Staff type</Label>
              <select
                id="staff-type"
                className={cn(
                  "tenant-create-form-select",
                  fieldErrors.staffType && "tenant-create-form-select-error",
                )}
                value={staffType}
                onChange={(event) => setStaffType(event.target.value as ClinicStaffType)}
                disabled={createStaff.isPending}
              >
                {CLINIC_STAFF_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {STAFF_TYPE_LABELS[type]}
                  </option>
                ))}
              </select>
              {fieldErrors.staffType ? (
                <p className="tenant-create-form-field-error">{fieldErrors.staffType}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="staff-status">Status</Label>
              <select
                id="staff-status"
                className={cn(
                  "tenant-create-form-select",
                  fieldErrors.status && "tenant-create-form-select-error",
                )}
                value={status}
                onChange={(event) => setStatus(event.target.value as ClinicStaffStatus)}
                disabled={createStaff.isPending}
              >
                {CLINIC_STAFF_STATUSES.map((entry) => (
                  <option key={entry} value={entry}>
                    {entry}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="tenant-create-form-field">
            <Label htmlFor="staff-role">Role</Label>
            {rolesQuery.isLoading ? (
              <p className="dashboard-cell-muted">Loading roles...</p>
            ) : rolesQuery.isError ? (
              <p className="tenant-create-form-error">Unable to load roles.</p>
            ) : (
              <select
                id="staff-role"
                className={cn(
                  "tenant-create-form-select",
                  fieldErrors.roleId && "tenant-create-form-select-error",
                )}
                value={roleId}
                onChange={(event) => setRoleId(event.target.value)}
                disabled={createStaff.isPending}
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            )}
            {fieldErrors.roleId ? (
              <p className="tenant-create-form-field-error">{fieldErrors.roleId}</p>
            ) : null}
          </div>

          <div className="tenant-create-form-field">
            <p className="dashboard-section-title">Locations</p>
            {locationsQuery.isLoading ? (
              <p className="dashboard-cell-muted">Loading locations...</p>
            ) : locationsQuery.isError ? (
              <p className="tenant-create-form-error">Unable to load locations.</p>
            ) : locations.length === 0 ? (
              <p className="dashboard-cell-muted">No active locations available.</p>
            ) : (
              <div className="role-permission-list">
                {locations.map((location) => (
                  <label key={location.id} className="role-permission-option">
                    <input
                      type="checkbox"
                      checked={selectedLocations.includes(location.id)}
                      onChange={() => toggleLocation(location.id)}
                      disabled={createStaff.isPending}
                    />
                    <span>
                      <span className="role-permission-code">{location.name}</span>
                      {location.code ? (
                        <span className="dashboard-cell-muted"> — {location.code}</span>
                      ) : null}
                    </span>
                  </label>
                ))}
              </div>
            )}
            {fieldErrors.locations ? (
              <p className="tenant-create-form-field-error">{fieldErrors.locations}</p>
            ) : null}
          </div>

          <div className="tenant-create-form-actions">
            <Button type="submit" className="btn-primary" disabled={createStaff.isPending}>
              {createStaff.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {createStaff.isPending ? "Creating..." : "Create staff member"}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
