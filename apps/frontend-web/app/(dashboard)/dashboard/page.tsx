import Link from "next/link";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DASHBOARD_NAV_LINKS, DASHBOARD_TITLES } from "@/lib/dashboard-nav";

export default function DashboardHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Choose a role-specific workspace.</p>
      </div>
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
