"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { PageLoading } from "@/components/patient-portal/page-state";
import {
  useClinicAppointmentsList,
  useClinicPatientsList,
  useCreateClinicInvoice,
} from "@/hooks/useClinicPortal";
import { useClinicStaffMembersList } from "@/hooks/useClinicStaffMember";
import { parseInvoiceCreateErrors } from "@/lib/invoice-api-errors";
import { calculateInvoiceTotals } from "@/lib/invoice-calculator-utils";
import type { CreateClinicInvoiceItemPayload } from "@/lib/clinic-portal-types";
import { formatCurrency } from "@/lib/clinic-portal-utils";

type InvoiceItemRow = CreateClinicInvoiceItemPayload & { key: string };

function createEmptyItem(): InvoiceItemRow {
  return {
    key: crypto.randomUUID(),
    description: "",
    quantity: 1,
    unitPrice: 0,
    taxRate: 0,
    discountAmount: 0,
  };
}

export function InvoiceCreateForm() {
  const router = useRouter();
  const createInvoice = useCreateClinicInvoice();
  const patientsQuery = useClinicPatientsList({ page: 1, limit: 100, status: "ACTIVE" });
  const staffQuery = useClinicStaffMembersList({ page: 1, limit: 100, status: "ACTIVE" });
  const appointmentsQuery = useClinicAppointmentsList({ page: 1, limit: 100 });

  const [patientId, setPatientId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<InvoiceItemRow[]>([createEmptyItem()]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const loading =
    patientsQuery.isLoading || staffQuery.isLoading || appointmentsQuery.isLoading;

  const patients = patientsQuery.data?.data ?? [];
  const staffMembers = useMemo(
    () => (staffQuery.data?.data ?? []).filter((member) => member.status === "ACTIVE"),
    [staffQuery.data?.data],
  );
  const appointments = useMemo(() => {
    const rows = appointmentsQuery.data?.data ?? [];
    if (!patientId) {
      return rows;
    }
    return rows.filter((appointment) => appointment.patientId === patientId);
  }, [appointmentsQuery.data?.data, patientId]);

  const totals = useMemo(
    () =>
      calculateInvoiceTotals(
        items.map((item) => ({
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          taxRate: item.taxRate,
          discountAmount: item.discountAmount ?? 0,
        })),
      ),
    [items],
  );

  useEffect(() => {
    if (appointmentId && !appointments.some((appointment) => appointment.id === appointmentId)) {
      setAppointmentId("");
    }
  }, [appointmentId, appointments]);

  function validateClient(): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!patientId) {
      errors.patientId = "Patient is required";
    }

    if (items.length === 0) {
      errors.items = "At least one invoice item is required";
    }

    items.forEach((item, index) => {
      if (!item.description.trim()) {
        errors[`items.${index}.description`] = "Description is required";
      }

      if (!item.quantity || item.quantity <= 0) {
        errors[`items.${index}.quantity`] = "Quantity must be greater than 0";
      }

      if (item.unitPrice < 0) {
        errors[`items.${index}.unitPrice`] = "Unit price must be at least 0";
      }

      if (item.taxRate < 0) {
        errors[`items.${index}.taxRate`] = "Tax rate must be at least 0";
      }

      if ((item.discountAmount ?? 0) < 0) {
        errors[`items.${index}.discountAmount`] = "Discount must be at least 0";
      }
    });

    return errors;
  }

  function updateItem(index: number, patch: Partial<InvoiceItemRow>) {
    setItems((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)),
    );
  }

  function removeItem(index: number) {
    setItems((current) => (current.length === 1 ? current : current.filter((_, i) => i !== index)));
  }

  if (loading) {
    return <PageLoading rows={4} />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create invoice</CardTitle>
        <CardDescription>
          Add line items with taxes and discounts. Totals are calculated automatically.
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
            setFieldErrors(clientErrors);

            if (Object.keys(clientErrors).length > 0) {
              return;
            }

            createInvoice.mutate(
              {
                patientId,
                staffId: staffId || undefined,
                appointmentId: appointmentId || undefined,
                notes: notes || undefined,
                items: items.map(({ description, quantity, unitPrice, taxRate, discountAmount }) => ({
                  description,
                  quantity,
                  unitPrice,
                  taxRate,
                  discountAmount: discountAmount || undefined,
                })),
              },
              {
                onSuccess: (response) => {
                  toast.success(response.message ?? "Invoice created successfully.");
                  router.push(`/billing/invoices/${response.invoice.id}`);
                },
                onError: (error) => {
                  const parsed = parseInvoiceCreateErrors(error);

                  if (parsed.forbidden || parsed.tenantMismatch) {
                    router.replace("/forbidden");
                    return;
                  }

                  if (parsed.patientNotFound) {
                    toast.error(parsed.generalError ?? "Patient does not exist.");
                    return;
                  }

                  setFieldErrors(parsed.fieldErrors);
                  setGeneralError(parsed.generalError);
                },
              },
            );
          }}
        >
          {generalError ? <p className="form-error-banner">{generalError}</p> : null}

          <section className="space-y-4">
            <h3 className="text-sm font-semibold">Invoice details</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient</Label>
                <select
                  id="patientId"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={patientId}
                  onChange={(event) => setPatientId(event.target.value)}
                >
                  <option value="" disabled>
                    Select patient
                  </option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.firstName} {patient.lastName}
                    </option>
                  ))}
                </select>
                {fieldErrors.patientId ? (
                  <p className="form-field-error">{fieldErrors.patientId}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="staffId">Staff (optional)</Label>
                <select
                  id="staffId"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={staffId}
                  onChange={(event) => setStaffId(event.target.value)}
                >
                  <option value="">None</option>
                  {staffMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.firstName} {member.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appointmentId">Appointment (optional)</Label>
                <select
                  id="appointmentId"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={appointmentId}
                  onChange={(event) => setAppointmentId(event.target.value)}
                  disabled={!patientId}
                >
                  <option value="">None</option>
                  {appointments.map((appointment) => (
                    <option key={appointment.id} value={appointment.id}>
                      {new Date(appointment.startTime).toLocaleString()} · {appointment.status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <textarea
                  id="notes"
                  className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold">Invoice items</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setItems((current) => [...current, createEmptyItem()])}
              >
                Add item
              </Button>
            </div>

            {fieldErrors.items ? <p className="form-field-error">{fieldErrors.items}</p> : null}

            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={item.key} className="rounded-lg border p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">Item {index + 1}</p>
                    {items.length > 1 ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(index)}
                      >
                        Remove
                      </Button>
                    ) : null}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-2 sm:col-span-2 lg:col-span-3">
                      <Label htmlFor={`description-${index}`}>Description</Label>
                      <Input
                        id={`description-${index}`}
                        value={item.description}
                        onChange={(event) => updateItem(index, { description: event.target.value })}
                      />
                      {fieldErrors[`items.${index}.description`] ? (
                        <p className="form-field-error">
                          {fieldErrors[`items.${index}.description`]}
                        </p>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                      <Input
                        id={`quantity-${index}`}
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(event) =>
                          updateItem(index, { quantity: Number(event.target.value) })
                        }
                      />
                      {fieldErrors[`items.${index}.quantity`] ? (
                        <p className="form-field-error">
                          {fieldErrors[`items.${index}.quantity`]}
                        </p>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`unitPrice-${index}`}>Unit price</Label>
                      <Input
                        id={`unitPrice-${index}`}
                        type="number"
                        min={0}
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(event) =>
                          updateItem(index, { unitPrice: Number(event.target.value) })
                        }
                      />
                      {fieldErrors[`items.${index}.unitPrice`] ? (
                        <p className="form-field-error">
                          {fieldErrors[`items.${index}.unitPrice`]}
                        </p>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`taxRate-${index}`}>Tax rate (%)</Label>
                      <Input
                        id={`taxRate-${index}`}
                        type="number"
                        min={0}
                        step="0.01"
                        value={item.taxRate}
                        onChange={(event) =>
                          updateItem(index, { taxRate: Number(event.target.value) })
                        }
                      />
                      {fieldErrors[`items.${index}.taxRate`] ? (
                        <p className="form-field-error">{fieldErrors[`items.${index}.taxRate`]}</p>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`discountAmount-${index}`}>Discount amount</Label>
                      <Input
                        id={`discountAmount-${index}`}
                        type="number"
                        min={0}
                        step="0.01"
                        value={item.discountAmount ?? 0}
                        onChange={(event) =>
                          updateItem(index, { discountAmount: Number(event.target.value) })
                        }
                      />
                      {fieldErrors[`items.${index}.discountAmount`] ? (
                        <p className="form-field-error">
                          {fieldErrors[`items.${index}.discountAmount`]}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border bg-muted/30 p-4">
            <h3 className="mb-3 text-sm font-semibold">Totals</h3>
            <dl className="grid gap-2 text-sm sm:grid-cols-2">
              <div className="flex justify-between gap-3 sm:block">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium">{formatCurrency(totals.subtotal)}</dd>
              </div>
              <div className="flex justify-between gap-3 sm:block">
                <dt className="text-muted-foreground">Discount</dt>
                <dd className="font-medium">{formatCurrency(totals.discountTotal)}</dd>
              </div>
              <div className="flex justify-between gap-3 sm:block">
                <dt className="text-muted-foreground">Tax</dt>
                <dd className="font-medium">{formatCurrency(totals.taxTotal)}</dd>
              </div>
              <div className="flex justify-between gap-3 sm:block">
                <dt className="font-semibold">Total</dt>
                <dd className="text-base font-semibold">{formatCurrency(totals.total)}</dd>
              </div>
            </dl>
          </section>

          <div className="flex justify-end">
            <Button type="submit" disabled={createInvoice.isPending}>
              {createInvoice.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating invoice...
                </>
              ) : (
                "Create invoice"
              )}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
