"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function StaffSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Staff Management</h1>
      <Card>
        <CardHeader><CardTitle>Invite Staff Member</CardTitle></CardHeader>
        <CardContent className="grid max-w-lg gap-4">
          <div><Label>Email</Label><Input type="email" placeholder="staff@clinic.com" /></div>
          <div>
            <Label>Role</Label>
            <Select defaultValue="STAFF">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="STAFF">Staff</SelectItem>
                <SelectItem value="THERAPIST">Therapist</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="OWNER">Owner</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>Send invite</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Team Members</CardTitle></CardHeader>
        <CardContent className="text-sm text-muted-foreground">Staff list with roles and permissions.</CardContent>
      </Card>
    </div>
  );
}
