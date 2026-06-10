export type TherapistLoadWidgetData = {
  therapistId?: string;
  utilizationRate: number;
  appointmentCount: number;
};

export function buildTherapistLoadWidget(data: TherapistLoadWidgetData) {
  return {
    type: "therapist_load",
    data,
  };
}
