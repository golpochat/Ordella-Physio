import { ClinicProfileForm } from "@/components/clinic-portal/profile-form";

export default function ClinicProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-muted-foreground">Manage your clinic admin account settings.</p>
      </div>
      <ClinicProfileForm />
    </div>
  );
}
