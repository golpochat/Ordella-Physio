import Link from "next/link";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { DASHBOARD_NAV_LINKS, DASHBOARD_TITLES } from "@/lib/dashboard-nav";

export default function DashboardHomePage() {
  return (
    <div className="dashboard-page">
      <PageHeader title="Dashboard" subtitle="Choose a role-specific workspace." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {DASHBOARD_NAV_LINKS.map((item) => (
          <Card key={item.href}>
            <CardHeader>
              <CardTitle>{DASHBOARD_TITLES[item.href] ?? item.label}</CardTitle>
              <CardDescription>Role-based portal</CardDescription>
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
