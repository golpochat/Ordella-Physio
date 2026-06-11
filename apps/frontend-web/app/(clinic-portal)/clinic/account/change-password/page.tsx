import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ChangePasswordForm } from "@/components/users/ChangePasswordForm";

export default function ClinicChangePasswordPage() {
  return (
    <>
      <Button asChild variant="ghost">
        <Link href="/clinic/profile">&larr; Back to profile</Link>
      </Button>
      <PageHeader
        title="Change password"
        subtitle="Update your account password and sign in again with the new credentials."
      />
      <ChangePasswordForm />
    </>
  );
}
