import { PharmacyMessagingPlaceholder } from "@/components/pharmacy-portal/messaging-placeholder";

export default function PharmacyMessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Messages</h1>
        <p className="text-muted-foreground">Communicate with clinic staff and therapists.</p>
      </div>
      <PharmacyMessagingPlaceholder />
    </div>
  );
}
