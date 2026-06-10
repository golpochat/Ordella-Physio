import { PharmacyProfileForm } from "@/components/pharmacy-portal/profile-form";

export default function PharmacyProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-muted-foreground">Manage your pharmacy account settings.</p>
      </div>
      <PharmacyProfileForm />
    </div>
  );
}
