import { PlatformMessagingPlaceholder } from "@/components/super-admin-portal/messaging-placeholder";

export default function SuperAdminMessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Messages</h1>
        <p className="text-muted-foreground">Communicate with tenant administrators.</p>
      </div>
      <PlatformMessagingPlaceholder />
    </div>
  );
}
