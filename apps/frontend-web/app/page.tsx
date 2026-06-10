import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Ordella Physio</h1>
        <p className="text-muted-foreground">
          Unified web frontend for admin, clinic, therapist, and patient experiences.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Access your role-based dashboard through the API Gateway.</CardDescription>
          </CardHeader>
          <CardBody>
            <Button asChild>
              <Link href="/login">Go to login</Link>
            </Button>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dashboards</CardTitle>
            <CardDescription>Scaffolded portals for each role in the platform.</CardDescription>
          </CardHeader>
          <CardBody className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href="/admin">Admin</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/clinic">Clinic</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/therapist">Therapist</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/patient">Patient</Link>
            </Button>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
