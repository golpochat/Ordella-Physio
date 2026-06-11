import { Card } from "@/components/dashboard/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { MessagingWorkspace } from "@/components/messaging/messaging-workspace";

export default function SuperAdminMessagesPage() {
  return (
    <>
      <PageHeader title="Messages" subtitle="Platform messaging and support conversations." />
      <Card>
        <MessagingWorkspace />
      </Card>
    </>
  );
}
