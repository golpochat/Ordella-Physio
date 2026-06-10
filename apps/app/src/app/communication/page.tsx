"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { communicationApi } from "@/lib/api";

export default function CommunicationPage() {
  const notifications = useQuery({ queryKey: ["notifications"], queryFn: () => communicationApi.listNotifications() });
  const reminders = useQuery({ queryKey: ["reminders"], queryFn: () => communicationApi.listReminders() });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Communication</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Send Test Email</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div><Label>To</Label><Input placeholder="patient@example.com" /></div>
            <div><Label>Subject</Label><Input placeholder="Appointment reminder" /></div>
            <Button>Send email</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Send Test SMS</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div><Label>Phone</Label><Input placeholder="+15551234567" /></div>
            <div><Label>Message</Label><Input placeholder="Your appointment is tomorrow." /></div>
            <Button>Send SMS</Button>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
        <CardContent>{notifications.isLoading ? "Loading..." : `${notifications.data?.data?.length ?? 0} notifications`}</CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Reminders</CardTitle></CardHeader>
        <CardContent>{reminders.isLoading ? "Loading..." : "Scheduled reminders listed here."}</CardContent>
      </Card>
    </div>
  );
}
