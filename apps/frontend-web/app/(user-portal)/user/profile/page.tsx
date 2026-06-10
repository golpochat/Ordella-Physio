import { UserProfileForm } from "@/components/user-portal/profile-form";

export default function UserProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings.</p>
      </div>
      <UserProfileForm />
    </div>
  );
}
