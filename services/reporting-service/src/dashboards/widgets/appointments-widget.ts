export type AppointmentsWidgetData = {
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  noShowAppointments: number;
};

export function buildAppointmentsWidget(data: AppointmentsWidgetData) {
  return {
    type: "appointments",
    data,
  };
}
