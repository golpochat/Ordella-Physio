import { TherapistMessagingPlaceholder } from "@/components/therapist-portal/messaging-placeholder";

export default function TherapistMessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Messages</h1>
        <p className="text-muted-foreground">Secure messaging with your clinic team.</p>
      </div>
      <TherapistMessagingPlaceholder />
    </div>
  );
}
