import { ProfileForm } from "@/components/patient-portal/profile-form";

export default function PatientProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-muted-foreground">Manage your account details.</p>
      </div>
      <ProfileForm />
    </div>
  );
}
