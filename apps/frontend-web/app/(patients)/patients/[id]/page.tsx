import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";

type PatientDetailPageProps = {
  params: { id: string };
};

export default function PatientDetailPage({ params }: PatientDetailPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Patient {params.id}</h1>
        <p className="text-muted-foreground">Patient profile scaffold.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-muted-foreground">Load patient details from the patient service proxy.</p>
        </CardBody>
      </Card>
    </div>
  );
}
