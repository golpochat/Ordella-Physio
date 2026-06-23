"use client";

import { ClinicSubscriptionBillingPanel } from "@/components/clinic-portal/subscription-billing-panel";
import { PageHeader } from "@/components/dashboard/PageHeader";

export function OrganizationSubscriptionBillingPanel() {
  return (
    <>
      <PageHeader
        title="Organization billing"
        subtitle="Manage the shared platform subscription, invoices, and payment methods for all linked clinics."
      />
      <ClinicSubscriptionBillingPanel portalReturnPath="/organization/billing" />
    </>
  );
}
