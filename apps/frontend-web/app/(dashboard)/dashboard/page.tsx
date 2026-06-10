import Link from "next/link";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Choose a role-specific workspace.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { href: "/admin", title: "Admin Portal", description: "Tenants, staff, system metrics" },
          { href: "/clinic", title: "Clinic Dashboard", description: "Appointments, patients, billing" },
          { href: "/therapist", title: "Therapist Dashboard", description: "Schedule, notes, patients" },
          { href: "/patient", title: "Patient Portal", description: "Appointments, invoices, notes" },
        ].map((item) => (
          <Card key={item.href}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardBody>
              <Button asChild variant="outline">
                <Link href={item.href}>Open</Link>
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
