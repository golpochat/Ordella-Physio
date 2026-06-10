"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTenantStore } from "@/stores";

export default function TenantSettingsPage() {
  const { name, timezone, currency, setTenantProfile } = useTenantStore();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tenant Settings</h1>
      <Card>
        <CardHeader><CardTitle>Clinic Profile</CardTitle></CardHeader>
        <CardContent className="grid max-w-lg gap-4">
          <div><Label>Name</Label><Input value={name ?? ""} onChange={(e) => setTenantProfile({ name: e.target.value })} /></div>
          <div><Label>Timezone</Label><Input value={timezone} onChange={(e) => setTenantProfile({ timezone: e.target.value })} /></div>
          <div>
            <Label>Currency</Label>
            <Select value={currency} onValueChange={(value) => setTenantProfile({ currency: value })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>Save settings</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Locations</CardTitle></CardHeader>
        <CardContent className="text-sm text-muted-foreground">Manage clinic locations and addresses.</CardContent>
      </Card>
    </div>
  );
}
