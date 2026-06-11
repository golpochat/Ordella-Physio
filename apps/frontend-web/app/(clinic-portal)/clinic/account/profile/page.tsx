import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { UserProfileForm } from "@/components/users/UserProfileForm";

export default function ClinicAccountProfilePage() {
  return (
    <>
      <Button asChild variant="ghost">
        <Link href="/clinic/profile">&larr; Back to profile</Link>
      </Button>
      <PageHeader
        title="My profile"
        subtitle="Update your personal account information."
      />
      <UserProfileForm />
    </>
  );
}
