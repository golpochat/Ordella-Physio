import { ClinicMessagingPlaceholder } from "@/components/clinic-portal/messaging-placeholder";

export default function ClinicMessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Messages</h1>
        <p className="text-muted-foreground">Communicate with your clinic team.</p>
      </div>
      <ClinicMessagingPlaceholder />
    </div>
  );
}
