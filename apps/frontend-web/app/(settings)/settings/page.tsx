import Link from "next/link";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">Account and workspace configuration scaffold.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { href: "/settings/profile", title: "Profile", description: "Personal account settings" },
          { href: "/settings/clinic", title: "Clinic", description: "Clinic preferences and branding" },
          { href: "/settings/billing", title: "Billing", description: "Payment and invoice settings" },
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
