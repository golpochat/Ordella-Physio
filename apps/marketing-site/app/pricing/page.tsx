import { PricingSection } from "@/components/sections/pricing";
import { FaqSection } from "@/components/sections/faq";
import { CtaSection } from "@/components/sections/cta";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/seo";
import { PRICING_TIERS } from "@/lib/content";

export const metadata = createMetadata({
  title: "Pricing",
  description: "Simple, transparent pricing for physiotherapy clinics of every size.",
  path: "/pricing",
});

const comparisonFeatures = [
  { name: "Therapists", starter: "2", professional: "10", enterprise: "Unlimited" },
  { name: "Patients", starter: "500", professional: "Unlimited", enterprise: "Unlimited" },
  { name: "Appointments", starter: true, professional: true, enterprise: true },
  { name: "Clinical notes", starter: true, professional: true, enterprise: true },
  { name: "Billing & invoicing", starter: false, professional: true, enterprise: true },
  { name: "Online payments", starter: false, professional: true, enterprise: true },
  { name: "Communication suite", starter: false, professional: true, enterprise: true },
  { name: "Multi-location", starter: false, professional: false, enterprise: true },
  { name: "Advanced reporting", starter: false, professional: false, enterprise: true },
  { name: "Dedicated support", starter: false, professional: true, enterprise: true },
] as const;

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="text-primary">✓</span>
    ) : (
      <span className="text-muted-foreground">—</span>
    );
  }
  return <span>{value}</span>;
}

export default function PricingPage() {
  return (
    <>
      <PricingSection showAllLink={false} className="pt-16" />
      <Section variant="muted">
        <SectionHeader title="Feature comparison" />
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-4 font-semibold">Feature</th>
                {PRICING_TIERS.map((tier) => (
                  <th key={tier.id} className="p-4 font-semibold">
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((row) => (
                <tr key={row.name} className="border-b last:border-0">
                  <td className="p-4 font-medium">{row.name}</td>
                  <td className="p-4">
                    <CellValue value={row.starter} />
                  </td>
                  <td className="p-4">
                    <CellValue value={row.professional} />
                  </td>
                  <td className="p-4">
                    <CellValue value={row.enterprise} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <FaqSection />
      <CtaSection />
    </>
  );
}
