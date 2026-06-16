"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { authClient } from "@/lib/auth-client";
import { getPortalForRole } from "@/lib/auth/roleRedirect";
import { buildCheckoutHref, PRICING_PLANS, type BillingCycle, type PlanId } from "@/lib/pricing-plans";

const PLAN_IDS: PlanId[] = ["starter", "pro", "enterprise"];
const INTENTS = ["trial", "checkout"] as const;

type RegisterIntent = (typeof INTENTS)[number];

function isPlanId(value: string | null): value is PlanId {
  return PLAN_IDS.includes(value as PlanId);
}

function isIntent(value: string | null): value is RegisterIntent {
  return INTENTS.includes(value as RegisterIntent);
}

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");
  const cycleParam = searchParams.get("cycle");
  const intentParam = searchParams.get("intent");

  const plan = isPlanId(planParam) ? planParam : "starter";
  const billingCycle: BillingCycle = cycleParam === "monthly" ? "monthly" : "yearly";
  const intent: RegisterIntent = isIntent(intentParam) ? intentParam : "trial";

  const { registerWorkspace, isAuthenticated, user } = useAuth();
  const [trialDays, setTrialDays] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    clinicName: "",
    email: "",
    password: "",
  });

  const selectedPlan = useMemo(() => PRICING_PLANS[plan], [plan]);

  useEffect(() => {
    void authClient
      .getOnboardingConfig()
      .then((config) => setTrialDays(config.trialDurationDays))
      .catch(() => setTrialDays(14));
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      return;
    }

    if (intent === "checkout") {
      router.replace(buildCheckoutHref(plan, billingCycle, "checkout"));
      return;
    }

    router.replace(getPortalForRole(user.role ?? "ADMIN"));
  }, [billingCycle, intent, isAuthenticated, plan, router, user]);

  const headline = "Create your clinic workspace";

  const description =
    intent === "trial"
      ? `Create your workspace to start your ${trialDays ?? "…"}-day free trial on the ${selectedPlan.name} plan.`
      : `Create your workspace to complete payment for the ${selectedPlan.name} plan.`;

  const submitLabel =
    intent === "trial" ? "Create workspace & start trial" : "Create workspace & continue to payment";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (intent === "checkout" && plan === "enterprise") {
      toast.error("Enterprise checkout is sales-assisted. Please contact our team.");
      return;
    }

    setSubmitting(true);

    try {
      await registerWorkspace({
        clinicName: form.clinicName.trim(),
        email: form.email.trim(),
        password: form.password,
        plan,
        billingCycle,
        intent,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create your workspace.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isAuthenticated && user) {
    return null;
  }

  return (
    <div className="auth-page-shell">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>{headline}</CardTitle>
            {intent === "trial" ? <Badge variant="secondary">No credit card required</Badge> : null}
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardBody>
          <form className="auth-form-stack" onSubmit={handleSubmit} noValidate>
            <div className="auth-field-stack">
              <Label htmlFor="clinicName">Clinic name</Label>
              <Input
                id="clinicName"
                value={form.clinicName}
                onChange={(event) => setForm((current) => ({ ...current, clinicName: event.target.value }))}
                required
              />
            </div>

            <div className="auth-field-stack">
              <Label htmlFor="email">Admin email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                required
              />
            </div>

            <PasswordInput
              id="password"
              label="Admin password"
              autoComplete="new-password"
              value={form.password}
              onChange={(password) => setForm((current) => ({ ...current, password }))}
            />

            <Button type="submit" className="auth-submit-button" disabled={submitting}>
              {submitting ? "Creating workspace…" : submitLabel}
            </Button>
          </form>

          <p className="mt-4 text-sm text-muted-foreground">
            Already have a clinic account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
