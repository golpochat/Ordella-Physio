import { StaffProfileForm } from "@/components/staff-portal/profile-form";

export default function StaffProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-muted-foreground">Manage your staff account settings.</p>
      </div>
      <StaffProfileForm />
    </div>
  );
}
