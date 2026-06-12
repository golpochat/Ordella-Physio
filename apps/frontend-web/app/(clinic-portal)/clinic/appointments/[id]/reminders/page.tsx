"use client";

import Link from "next/link";
import { useState } from "react";
import { AppointmentReminderEditor } from "@/components/appointments/reminders/AppointmentReminderEditor";
import { AppointmentReminderList } from "@/components/appointments/reminders/AppointmentReminderList";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicAppointment, useClinicAppointmentReminders } from "@/hooks/useClinicPortal";
import { WithPermission } from "@/lib/auth/withPermission";
import type { ClinicAppointmentReminder } from "@/lib/clinic-portal-types";
import { formatPortalDateTime } from "@/lib/clinic-portal-utils";

type ClinicAppointmentRemindersPageProps = {
  params: { id: string };
};

export default function ClinicAppointmentRemindersPage({
  params,
}: ClinicAppointmentRemindersPageProps) {
  const appointmentQuery = useClinicAppointment(params.id);
  const remindersQuery = useClinicAppointmentReminders(params.id);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<ClinicAppointmentReminder | null>(null);

  const appointment = appointmentQuery.data;
  const isLoading = appointmentQuery.isLoading || remindersQuery.isLoading;
  const isError = appointmentQuery.isError || remindersQuery.isError;

  function handleAddReminder() {
    setEditingReminder(null);
    setEditorOpen(true);
  }

  function handleEditReminder(reminder: ClinicAppointmentReminder) {
    setEditingReminder(reminder);
    setEditorOpen(true);
  }

  return (
    <WithPermission permission="appointment.manage">
      <ListPage
        title="Appointment reminders"
        subtitle={
          appointment
            ? `Manage reminders for ${formatPortalDateTime(appointment.startTime)}`
            : "Manage reminders for this appointment."
        }
        action={
          <div className="user-list-actions">
            <Button asChild variant="outline">
              <Link href={`/clinic/appointments/${params.id}`}>Back to appointment</Link>
            </Button>
            <Button type="button" onClick={handleAddReminder} disabled={!appointment || isLoading}>
              Add reminder
            </Button>
          </div>
        }
        isLoading={isLoading}
        isError={isError}
        onRetry={() => {
          void appointmentQuery.refetch();
          void remindersQuery.refetch();
        }}
        loadingRows={4}
      >
        <AppointmentReminderList
          reminders={remindersQuery.data ?? []}
          isLoading={remindersQuery.isFetching && !remindersQuery.data}
          onEdit={handleEditReminder}
        />
      </ListPage>

      {appointment ? (
        <AppointmentReminderEditor
          appointment={appointment}
          open={editorOpen}
          reminder={editingReminder}
          onOpenChange={setEditorOpen}
          onSaved={() => void remindersQuery.refetch()}
        />
      ) : null}

      {!isLoading && !isError && !appointment ? (
        <PageError message="Appointment not found." />
      ) : null}
      {isLoading && !appointment ? <PageLoading rows={2} /> : null}
    </WithPermission>
  );
}
