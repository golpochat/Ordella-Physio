import { PageHeader } from "@/components/dashboard/PageHeader";
import { MessagingWorkspace } from "@/components/messaging/messaging-workspace";

export default function UserMessagesPage() {
  return (
    <>
      <PageHeader
        title="Messages"
        subtitle="Secure messaging with your clinic care team."
      />
      <MessagingWorkspace hideHeader />
    </>
  );
}
