export type PatientsWidgetData = {
  newPatients: number;
  totalPatients?: number;
};

export function buildPatientsWidget(data: PatientsWidgetData) {
  return {
    type: "patients",
    data,
  };
}
