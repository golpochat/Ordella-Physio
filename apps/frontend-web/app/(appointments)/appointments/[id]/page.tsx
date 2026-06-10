import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";

type AppointmentDetailPageProps = {
  params: { id: string };
};

export default function AppointmentDetailPage({ params }: AppointmentDetailPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Appointment {params.id}</h1>
        <p className="text-muted-foreground">Detail scaffold for a single appointment record.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Appointment details</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-muted-foreground">
            Fetch via useApi().get(&quot;appointment&quot;, `/${params.id}`).
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
