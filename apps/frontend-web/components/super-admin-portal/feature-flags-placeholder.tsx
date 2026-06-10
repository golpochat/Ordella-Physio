import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PLACEHOLDER_FLAGS = [
  { key: "patient_portal", label: "Patient portal", enabled: true },
  { key: "therapist_notes", label: "Therapist notes", enabled: true },
  { key: "billing_v2", label: "Billing v2", enabled: false },
  { key: "ai_scheduling", label: "AI scheduling", enabled: false },
];

export function PlatformFeatureFlagsPlaceholder() {
  return (
    <div className="space-y-3">
      {PLACEHOLDER_FLAGS.map((flag) => (
        <Card key={flag.key}>
          <CardHeader>
            <CardTitle className="text-base">{flag.label}</CardTitle>
            <CardDescription>{flag.key}</CardDescription>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-muted-foreground">
              {flag.enabled ? "Enabled" : "Disabled"} — toggle wiring coming soon
            </p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
