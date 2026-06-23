"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { AddressFormFields } from "@/components/address";
import { Input, Label } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { authClient, type TenantProfile } from "@/lib/auth-client";
import {
  emptyPostalAddress,
  fromTenantProfileAddress,
  toTenantProfileAddressPayload,
} from "@/lib/postal-address";
import { TENANT_TIMEZONE_OPTIONS } from "@/lib/tenant-form-options";

const STEPS = [
  { key: "clinicProfile", title: "Clinic profile", description: "Name, address, timezone, and logo." },
  { key: "therapists", title: "Therapists", description: "Add therapists to your clinic." },
  { key: "locations", title: "Locations", description: "Add locations if you run multiple sites." },
  { key: "billing", title: "Billing & invoices", description: "Company details and VAT number." },
  { key: "integrations", title: "Integrations", description: "Calendar sync and messaging providers." },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

export function ProfileCompletionWizard() {
  const queryClient = useQueryClient();
  const { accessToken, user } = useAuth();
  const [activeStep, setActiveStep] = useState<StepKey>("clinicProfile");
  const [form, setForm] = useState({
    name: "",
    timezone: "Europe/Dublin",
    logoUrl: "",
    vatNumber: "",
  } as {
    name: string;
    timezone: string;
    logoUrl: string;
    vatNumber: string;
  });
  const [clinicAddress, setClinicAddress] = useState(() => emptyPostalAddress());

  const profileQuery = useQuery({
    queryKey: ["tenant-profile"],
    enabled: Boolean(accessToken && user?.tenantId),
    queryFn: () => authClient.getTenantProfile(accessToken!, user!.tenantId!),
  });

  const profile = profileQuery.data;
  const completion = profile?.profileCompletionPercent ?? 0;

  useEffect(() => {
    if (!profile) {
      return;
    }

    setForm({
      name: profile.name ?? "",
      timezone: profile.timezone ?? "Europe/Dublin",
      logoUrl: profile.logoUrl ?? "",
      vatNumber: profile.vatNumber ?? "",
    });
    setClinicAddress(fromTenantProfileAddress(profile));
  }, [profile]);

  if (!accessToken || !user?.tenantId) {
    return null;
  }

  if (profileQuery.isLoading) {
    return null;
  }

  if (completion >= 100) {
    return null;
  }

  const markStepComplete = async (step: StepKey, payload?: Partial<TenantProfile>) => {
    try {
      await authClient.updateTenantProfile(accessToken, user.tenantId!, {
        ...payload,
        profileCompletion: { [step]: true },
      });
      await queryClient.invalidateQueries({ queryKey: ["tenant-profile"] });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save progress.");
    }
  };

  const handleClinicProfileSave = async () => {
    await markStepComplete("clinicProfile", {
      name: form.name.trim(),
      ...toTenantProfileAddressPayload(clinicAddress),
      timezone: form.timezone,
      logoUrl: form.logoUrl.trim() || undefined,
    });
    toast.success("Clinic profile saved.");
    setActiveStep("therapists");
  };

  return (
    <Card className="mb-6 border-brand-primary/20">
      <CardHeader className="space-y-4 border-b border-border/60 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle>Complete your clinic setup</CardTitle>
          <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium">
            Profile {completion}% complete
          </span>
        </div>
        <div
          className="h-2 w-full shrink-0 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={completion}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Clinic setup progress"
        >
          <div
            className="h-full rounded-full bg-brand-primary transition-all"
            style={{ width: `${completion}%` }}
          />
        </div>
        <div className="flex flex-wrap gap-2 pt-2" role="tablist" aria-label="Setup steps">
          {STEPS.map((step) => (
            <button
              key={step.key}
              type="button"
              role="tab"
              aria-selected={activeStep === step.key}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                activeStep === step.key
                  ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                  : "border-border bg-background text-muted-foreground hover:bg-muted/50"
              }`}
              onClick={() => setActiveStep(step.key)}
            >
              {profile?.profileCompletion?.[step.key] ? (
                <span className="mr-1 text-brand-primary" aria-hidden>
                  ✓
                </span>
              ) : null}
              {step.title}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardBody className="space-y-6 pt-6">
        {activeStep === "clinicProfile" ? (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="auth-field-stack md:col-span-2">
              <Label htmlFor="wizard-clinic-name">Clinic name</Label>
              <Input
                id="wizard-clinic-name"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              />
            </div>
            <div className="auth-field-stack md:col-span-2">
              <AddressFormFields
                idPrefix="wizard"
                layout="auth-stack"
                value={clinicAddress}
                onChange={setClinicAddress}
                showLine2={false}
                line1Label="Address"
              />
            </div>
            <div className="auth-field-stack">
              <Label htmlFor="wizard-timezone">Timezone</Label>
              <select
                id="wizard-timezone"
                className="auth-select"
                value={form.timezone}
                onChange={(event) => setForm((current) => ({ ...current, timezone: event.target.value }))}
              >
                {TENANT_TIMEZONE_OPTIONS.map((timezone) => (
                  <option key={timezone} value={timezone}>
                    {timezone}
                  </option>
                ))}
              </select>
            </div>
            <div className="auth-field-stack md:col-span-2">
              <Label htmlFor="wizard-logo">Logo URL</Label>
              <Input
                id="wizard-logo"
                value={form.logoUrl}
                onChange={(event) => setForm((current) => ({ ...current, logoUrl: event.target.value }))}
                placeholder="https://"
              />
            </div>
            <div className="md:col-span-2">
              <Button type="button" onClick={() => void handleClinicProfileSave()}>
                Save clinic profile
              </Button>
            </div>
          </div>
        ) : null}

        {activeStep === "therapists" ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Add therapists so they can manage schedules, notes, and patients.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/clinic/therapists">Add therapists</Link>
              </Button>
              <Button type="button" variant="outline" onClick={() => void markStepComplete("therapists")}>
                Mark as done
              </Button>
            </div>
          </div>
        ) : null}

        {activeStep === "locations" ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Configure clinic locations for multi-site scheduling and reporting.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/clinic/locations">Add locations</Link>
              </Button>
              <Button type="button" variant="outline" onClick={() => void markStepComplete("locations")}>
                Mark as done
              </Button>
            </div>
          </div>
        ) : null}

        {activeStep === "billing" ? (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="auth-field-stack md:col-span-2">
              <Label htmlFor="wizard-vat">VAT number (optional)</Label>
              <Input
                id="wizard-vat"
                value={form.vatNumber}
                onChange={(event) => setForm((current) => ({ ...current, vatNumber: event.target.value }))}
              />
            </div>
            <div className="md:col-span-2 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/clinic/billing">Open billing settings</Link>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={async () => {
                  await markStepComplete("billing", { vatNumber: form.vatNumber.trim() || undefined });
                  toast.success("Billing details saved.");
                  setActiveStep("integrations");
                }}
              >
                Save & continue
              </Button>
            </div>
          </div>
        ) : null}

        {activeStep === "integrations" ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Optional: connect third-party services your clinic uses day to day.
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              <li>Email and SMS notification providers (patient reminders, receipts)</li>
              <li>Marketplace apps (accounting, telehealth) when you enable them</li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="outline" asChild>
                <Link href="/settings/notifications/providers">Notification providers</Link>
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/clinic/marketplace">Browse marketplace</Link>
              </Button>
              <Button
                type="button"
                onClick={async () => {
                  await markStepComplete("integrations");
                  toast.success("Setup complete. Your clinic is ready to go.");
                }}
              >
                Finish setup
              </Button>
            </div>
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
}
