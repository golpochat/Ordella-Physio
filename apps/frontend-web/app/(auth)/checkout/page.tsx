"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useApi } from "@/hooks/useApi";
import { useTenant } from "@/hooks/useTenant";
import { authClient } from "@/lib/auth-client";
import { preferStripeCheckout, isMonolithDbCheckoutFallback } from "@/lib/billing-checkout-mode";
import { createClinicPortalApi } from "@/lib/clinic-portal-api";
import {
  buildRegisterHref,
  computeCheckoutSummary,
  formatBillingCycleLabel,
  formatCheckoutBasePrice,
  formatEuro,
  PRICING_PLANS,
  VAT_COUNTRIES,
  type BillingCycle,
  type OnboardingIntent,
  type PlanId,
} from "@/lib/pricing-plans";
import { getPortalForRole } from "@/lib/auth/roleRedirect";

const CHECKOUT_PLANS = ["starter", "pro"] as const;
type CheckoutPlanId = (typeof CHECKOUT_PLANS)[number];

const PAID_FORM_ID = "checkout-paid-form";

function isCheckoutPlan(value: string | null): value is CheckoutPlanId {
  return value === "starter" || value === "pro";
}

function isIntent(value: string | null): value is OnboardingIntent {
  return value === "trial" || value === "checkout";
}

function isPlanId(value: string | null): value is PlanId {
  return value === "starter" || value === "pro" || value === "enterprise";
}

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");
  const cycleParam = searchParams.get("cycle");
  const intentParam = searchParams.get("intent");

  const rawPlan = isPlanId(planParam) ? planParam : "pro";
  const plan: CheckoutPlanId = isCheckoutPlan(planParam) ? planParam : "pro";
  const billingCycle: BillingCycle = cycleParam === "monthly" ? "monthly" : "yearly";
  const intent: OnboardingIntent = isIntent(intentParam) ? intentParam : "checkout";
  const isTrial = intent === "trial";
  const isEnterprise = rawPlan === "enterprise";

  const { isAuthenticated, user, accessToken, completeCheckout } = useAuth();
  const api = useApi();
  const { tenantId } = useTenant();
  const useStripeCheckout = preferStripeCheckout();
  const [trialDays, setTrialDays] = useState(14);
  const [vatCountries, setVatCountries] = useState(VAT_COUNTRIES);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    billingCountry: "IE",
    billingStreet: "",
    billingCity: "",
    billingPostal: "",
    companyName: "",
    cardholderName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const planInfo = useMemo(() => PRICING_PLANS[rawPlan], [rawPlan]);

  const summary = useMemo(() => {
    if (isTrial || isEnterprise) {
      return null;
    }
    try {
      return computeCheckoutSummary(plan, billingCycle, form.billingCountry);
    } catch {
      return null;
    }
  }, [billingCycle, form.billingCountry, isEnterprise, isTrial, plan]);

  useEffect(() => {
    void authClient
      .getOnboardingConfig()
      .then((config) => {
        setTrialDays(config.trialDurationDays);
        if (config.vatCountries.length > 0) {
          setVatCountries(config.vatCountries);
        }
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !isTrial || !accessToken) {
      return;
    }

    void authClient
      .getTenantTrial(accessToken)
      .then((trialInfo) => {
        if (trialInfo.status === "TRIALING" || trialInfo.status === "ACTIVE") {
          router.replace(getPortalForRole(user?.role ?? "ADMIN"));
        }
      })
      .catch(() => undefined);
  }, [accessToken, isAuthenticated, isTrial, router, user?.role]);

  const updateCheckoutSelection = (nextPlan: CheckoutPlanId, nextCycle: BillingCycle) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("plan", nextPlan);
    params.set("cycle", nextCycle);
    router.replace(`/checkout?${params.toString()}`, { scroll: false });
  };

  const redirectToRegister = () => {
    router.push(buildRegisterHref(plan, billingCycle, intent));
  };

  const handleStartTrial = () => {
    if (!isAuthenticated) {
      redirectToRegister();
      return;
    }
    router.push(getPortalForRole(user?.role ?? "ADMIN"));
  };

  const [validationAttempted, setValidationAttempted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<string, string>>>({});

  const isValidCardNumber = (value: string): boolean => {
    const digits = value.replace(/[^\d]/g, "");
    if (!/^\d{13,19}$/.test(digits)) {
      return false;
    }

    // Luhn check for basic card number validity.
    let sum = 0;
    let shouldDouble = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      const digit = Number(digits[i]);
      if (shouldDouble) {
        const doubled = digit * 2;
        sum += doubled > 9 ? doubled - 9 : doubled;
      } else {
        sum += digit;
      }
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  const validateBillingCountry = (value: string): string | null => {
    return value.trim() ? null : "Billing country is required";
  };

  const validateBillingStreet = (value: string): string | null => {
    return value.trim() ? null : "Street address is required";
  };

  const validateBillingCity = (value: string): string | null => {
    return value.trim() ? null : "City is required";
  };

  const validateBillingPostal = (value: string): string | null => {
    return value.trim() ? null : "Postal code is required";
  };

  const validateCardholderName = (value: string): string | null => {
    return value.trim() ? null : "Cardholder name is required";
  };

  const validateCardNumber = (value: string): string | null => {
    return isValidCardNumber(value) ? null : "Card number is invalid";
  };

  const validateExpiry = (value: string): string | null => {
    const normalized = value.trim();
    const match = normalized.match(/^(\d{2})\s*\/\s*(\d{2})$/);
    if (!match) {
      return "Expiry is invalid";
    }

    const month = Number(match[1]);
    const year = Number(match[2]);
    if (month < 1 || month > 12) {
      return "Expiry is invalid";
    }

    const current = new Date();
    const fullYear = 2000 + year;
    // Consider expiry valid through the end of the given month.
    const expiryEnd = new Date(fullYear, month, 0, 23, 59, 59, 999);
    if (expiryEnd.getTime() < current.getTime()) {
      return "Expiry is invalid";
    }

    return null;
  };

  const validateCvc = (value: string): string | null => {
    const digits = value.replace(/[^\d]/g, "");
    if (!/^\d{3,4}$/.test(digits)) {
      return "CVC is invalid";
    }
    return null;
  };

  const validateAllPaidFields = (): boolean => {
    const nextErrors: Partial<Record<string, string>> = {};

    nextErrors.billingCountry = validateBillingCountry(form.billingCountry) ?? undefined;
    nextErrors.billingStreet = validateBillingStreet(form.billingStreet) ?? undefined;
    nextErrors.billingCity = validateBillingCity(form.billingCity) ?? undefined;
    nextErrors.billingPostal = validateBillingPostal(form.billingPostal) ?? undefined;

    if (!useStripeCheckout) {
      nextErrors.cardholderName = validateCardholderName(form.cardholderName) ?? undefined;
      nextErrors.cardNumber = validateCardNumber(form.cardNumber) ?? undefined;
      nextErrors.cardExpiry = validateExpiry(form.cardExpiry) ?? undefined;
      nextErrors.cardCvc = validateCvc(form.cardCvc) ?? undefined;
    }

    setFieldErrors(nextErrors);
    return Object.values(nextErrors).every((value) => !value);
  };

  const validateField = (key: string, value: string): string | null => {
    switch (key) {
      case "billingCountry":
        return validateBillingCountry(value);
      case "billingStreet":
        return validateBillingStreet(value);
      case "billingCity":
        return validateBillingCity(value);
      case "billingPostal":
        return validateBillingPostal(value);
      case "cardholderName":
        return validateCardholderName(value);
      case "cardNumber":
        return validateCardNumber(value);
      case "cardExpiry":
        return validateExpiry(value);
      case "cardCvc":
        return validateCvc(value);
      default:
        return null;
    }
  };

  useEffect(() => {
    if (isTrial) {
      setValidationAttempted(false);
      setFieldErrors({});
    }
  }, [isTrial]);

  const handleCompletePayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidationAttempted(true);
    const isValid = validateAllPaidFields();
    if (!isValid) {
      return;
    }

    if (!isAuthenticated) {
      redirectToRegister();
      return;
    }

    if (!summary) {
      return;
    }

    setSubmitting(true);

    try {
      if (useStripeCheckout) {
        if (!api || !tenantId) {
          throw new Error("Tenant context is required for Stripe checkout.");
        }

        const clinicApi = createClinicPortalApi(api, tenantId);
        const origin = typeof window !== "undefined" ? window.location.origin : "";
        const checkoutParams = searchParams.toString();
        const session = await clinicApi.createCheckoutSession({
          plan,
          billingCycle,
          email: user?.email,
          name:
            form.cardholderName.trim() ||
            [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
            undefined,
          successUrl: `${origin}/checkout/success`,
          cancelUrl: `${origin}/checkout${checkoutParams ? `?${checkoutParams}` : ""}`,
        });
        window.location.href = session.url;
        return;
      }

      if (!isMonolithDbCheckoutFallback()) {
        throw new Error("Stripe checkout is required. Set NEXT_PUBLIC_ALLOW_DB_CHECKOUT=true for monolith-only dev.");
      }

      await completeCheckout({
        plan,
        billingCycle,
        billingCountry: form.billingCountry,
        billingStreet: form.billingStreet.trim(),
        billingCity: form.billingCity.trim(),
        billingPostal: form.billingPostal.trim(),
        companyName: form.companyName.trim() || undefined,
        cardholderName: form.cardholderName.trim(),
        cardNumber: form.cardNumber.trim(),
        cardExpiry: form.cardExpiry.trim(),
        cardCvc: form.cardCvc.trim(),
      });
    } catch (error) {
      // Errors are expected to be handled by auth/onboarding redirects.
      // Validation is handled inline on this page.
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (isEnterprise) {
    return (
      <div className="auth-page-shell py-10">
        <Card className="mx-auto w-full max-w-lg">
          <CardHeader>
            <CardTitle>Enterprise — Custom</CardTitle>
            <CardDescription>Contact our team for custom pricing and onboarding.</CardDescription>
          </CardHeader>
          <CardBody>
            <Button asChild className="w-full">
              <Link href="/contact">Contact sales</Link>
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  const planCycleLabel = `${planInfo.name} — ${formatBillingCycleLabel(billingCycle)}`;

  const summaryDropdowns = (
    <>
      <div className="flex items-center justify-between gap-4">
        <span className="shrink-0 text-muted-foreground">Plan:</span>
        <select
          className="auth-select w-auto min-w-[8rem] py-1.5"
          value={plan}
          onChange={(event) => {
            const nextPlan = event.target.value as CheckoutPlanId;
            if (isCheckoutPlan(nextPlan)) {
              updateCheckoutSelection(nextPlan, billingCycle);
            }
          }}
          aria-label="Plan"
        >
          {CHECKOUT_PLANS.map((planId) => (
            <option key={planId} value={planId}>
              {PRICING_PLANS[planId].name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-between gap-4">
        <span className="shrink-0 text-muted-foreground">Billing cycle:</span>
        <select
          className="auth-select w-auto min-w-[8rem] py-1.5"
          value={billingCycle}
          onChange={(event) => {
            const nextCycle = event.target.value as BillingCycle;
            if (nextCycle === "monthly" || nextCycle === "yearly") {
              updateCheckoutSelection(plan, nextCycle);
            }
          }}
          aria-label="Billing cycle"
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
    </>
  );

  return (
    <div className="auth-page-shell py-10">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <h1 className="font-display text-2xl font-semibold text-foreground">{planCycleLabel}</h1>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            {isTrial ? (
              <Card>
                <CardHeader>
                  <CardTitle>Free Trial Overview</CardTitle>
                </CardHeader>
                <CardBody className="space-y-1 text-sm text-muted-foreground">
                  <p>Review your {planInfo.name} plan before starting your free trial.</p>
                  <p>No payment details required.</p>
                </CardBody>
              </Card>
            ) : (
              <form
                id={PAID_FORM_ID}
                className="space-y-6"
                onSubmit={handleCompletePayment}
                noValidate
              >
                {validationAttempted && Object.values(fieldErrors).some(Boolean) ? (
                  <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg px-4 py-3 mb-4">
                    ⚠️ Please complete all required fields before continuing.
                  </div>
                ) : null}
                <Card>
                  <CardHeader>
                    <CardTitle>Billing Information</CardTitle>
                    <CardDescription>
                      Used for invoicing and VAT calculation on your {planInfo.name} subscription.
                    </CardDescription>
                  </CardHeader>
                  <CardBody className="auth-form-stack">
                    <div className="auth-field-stack">
                      <Label htmlFor="billingCountry">Billing country</Label>
                      <select
                        id="billingCountry"
                        className="auth-select"
                        value={form.billingCountry}
                        onChange={(event) => {
                          const value = event.target.value;
                          setForm((current) => ({ ...current, billingCountry: value }));
                          setFieldErrors((current) => {
                            const shouldValidate = validationAttempted || Boolean(current.billingCountry);
                            return {
                              ...current,
                              billingCountry: shouldValidate
                                ? validateField("billingCountry", value) ?? undefined
                                : current.billingCountry,
                            };
                          });
                        }}
                        onBlur={(event) => {
                          const value = event.currentTarget.value;
                          setFieldErrors((current) => ({
                            ...current,
                            billingCountry: validateField("billingCountry", value) ?? undefined,
                          }));
                        }}
                      >
                        {vatCountries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.label}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.billingCountry ? (
                        <p className="text-red-600 text-sm mt-1">{fieldErrors.billingCountry}</p>
                      ) : null}
                    </div>

                    <div className="auth-field-stack">
                      <Label htmlFor="billingStreet">Street address</Label>
                      <Input
                        id="billingStreet"
                        value={form.billingStreet}
                        onChange={(event) => {
                          const value = event.target.value;
                          setForm((current) => ({ ...current, billingStreet: value }));
                          setFieldErrors((current) => {
                            const shouldValidate =
                              validationAttempted || Boolean(current.billingStreet);
                            return {
                              ...current,
                              billingStreet: shouldValidate
                                ? validateField("billingStreet", value) ?? undefined
                                : current.billingStreet,
                            };
                          });
                        }}
                        onBlur={(event) => {
                          const value = event.currentTarget.value;
                          setFieldErrors((current) => ({
                            ...current,
                            billingStreet: validateField("billingStreet", value) ?? undefined,
                          }));
                        }}
                      />
                      {fieldErrors.billingStreet ? (
                        <p className="text-red-600 text-sm mt-1">{fieldErrors.billingStreet}</p>
                      ) : null}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="auth-field-stack">
                        <Label htmlFor="billingCity">City</Label>
                        <Input
                          id="billingCity"
                          value={form.billingCity}
                          onChange={(event) => {
                            const value = event.target.value;
                            setForm((current) => ({ ...current, billingCity: value }));
                            setFieldErrors((current) => {
                              const shouldValidate =
                                validationAttempted || Boolean(current.billingCity);
                              return {
                                ...current,
                                billingCity: shouldValidate
                                  ? validateField("billingCity", value) ?? undefined
                                  : current.billingCity,
                              };
                            });
                          }}
                          onBlur={(event) => {
                            const value = event.currentTarget.value;
                            setFieldErrors((current) => ({
                              ...current,
                              billingCity: validateField("billingCity", value) ?? undefined,
                            }));
                          }}
                        />
                        {fieldErrors.billingCity ? (
                          <p className="text-red-600 text-sm mt-1">{fieldErrors.billingCity}</p>
                        ) : null}
                      </div>
                      <div className="auth-field-stack">
                        <Label htmlFor="billingPostal">Postal code</Label>
                        <Input
                          id="billingPostal"
                          value={form.billingPostal}
                          onChange={(event) => {
                            const value = event.target.value;
                            setForm((current) => ({ ...current, billingPostal: value }));
                            setFieldErrors((current) => {
                              const shouldValidate =
                                validationAttempted || Boolean(current.billingPostal);
                              return {
                                ...current,
                                billingPostal: shouldValidate
                                  ? validateField("billingPostal", value) ?? undefined
                                  : current.billingPostal,
                              };
                            });
                          }}
                          onBlur={(event) => {
                            const value = event.currentTarget.value;
                            setFieldErrors((current) => ({
                              ...current,
                              billingPostal: validateField("billingPostal", value) ?? undefined,
                            }));
                          }}
                        />
                        {fieldErrors.billingPostal ? (
                          <p className="text-red-600 text-sm mt-1">{fieldErrors.billingPostal}</p>
                        ) : null}
                      </div>
                    </div>

                    <div className="auth-field-stack">
                      <Label htmlFor="companyName">Company name (optional)</Label>
                      <Input
                        id="companyName"
                        value={form.companyName}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, companyName: event.target.value }))
                        }
                      />
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>
                      {useStripeCheckout
                        ? "You will complete payment securely on Stripe after continuing."
                        : "Secure card payment for your subscription."}
                    </CardDescription>
                  </CardHeader>
                  <CardBody className="auth-form-stack">
                    {useStripeCheckout ? (
                      <p className="text-sm text-muted-foreground">
                        Card details are collected by Stripe. We never store your full card number.
                      </p>
                    ) : (
                      <>
                    <div className="auth-field-stack">
                      <Label htmlFor="cardholderName">Cardholder name</Label>
                      <Input
                        id="cardholderName"
                        value={form.cardholderName}
                        onChange={(event) => {
                          const value = event.target.value;
                          setForm((current) => ({ ...current, cardholderName: value }));
                          setFieldErrors((current) => {
                            const shouldValidate =
                              validationAttempted || Boolean(current.cardholderName);
                            return {
                              ...current,
                              cardholderName: shouldValidate
                                ? validateField("cardholderName", value) ?? undefined
                                : current.cardholderName,
                            };
                          });
                        }}
                        onBlur={(event) => {
                          const value = event.currentTarget.value;
                          setFieldErrors((current) => ({
                            ...current,
                            cardholderName: validateField("cardholderName", value) ?? undefined,
                          }));
                        }}
                      />
                      {fieldErrors.cardholderName ? (
                        <p className="text-red-600 text-sm mt-1">{fieldErrors.cardholderName}</p>
                      ) : null}
                    </div>

                    <div className="auth-field-stack">
                      <Label htmlFor="cardNumber">Card number</Label>
                      <Input
                        id="cardNumber"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        value={form.cardNumber}
                        onChange={(event) => {
                          const value = event.target.value;
                          setForm((current) => ({ ...current, cardNumber: value }));
                          setFieldErrors((current) => {
                            const shouldValidate = validationAttempted || Boolean(current.cardNumber);
                            return {
                              ...current,
                              cardNumber: shouldValidate
                                ? validateField("cardNumber", value) ?? undefined
                                : current.cardNumber,
                            };
                          });
                        }}
                        onBlur={(event) => {
                          const value = event.currentTarget.value;
                          setFieldErrors((current) => ({
                            ...current,
                            cardNumber: validateField("cardNumber", value) ?? undefined,
                          }));
                        }}
                      />
                      {fieldErrors.cardNumber ? (
                        <p className="text-red-600 text-sm mt-1">{fieldErrors.cardNumber}</p>
                      ) : null}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="auth-field-stack">
                        <Label htmlFor="cardExpiry">Expiry (MM/YY)</Label>
                        <Input
                          id="cardExpiry"
                          placeholder="MM/YY"
                          autoComplete="cc-exp"
                          value={form.cardExpiry}
                          onChange={(event) => {
                            const value = event.target.value;
                            setForm((current) => ({ ...current, cardExpiry: value }));
                            setFieldErrors((current) => {
                              const shouldValidate =
                                validationAttempted || Boolean(current.cardExpiry);
                              return {
                                ...current,
                                cardExpiry: shouldValidate
                                  ? validateField("cardExpiry", value) ?? undefined
                                  : current.cardExpiry,
                              };
                            });
                          }}
                          onBlur={(event) => {
                            const value = event.currentTarget.value;
                            setFieldErrors((current) => ({
                              ...current,
                              cardExpiry: validateField("cardExpiry", value) ?? undefined,
                            }));
                          }}
                        />
                        {fieldErrors.cardExpiry ? (
                          <p className="text-red-600 text-sm mt-1">{fieldErrors.cardExpiry}</p>
                        ) : null}
                      </div>
                      <div className="auth-field-stack">
                        <Label htmlFor="cardCvc">CVC</Label>
                        <Input
                          id="cardCvc"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          value={form.cardCvc}
                          onChange={(event) => {
                            const value = event.target.value;
                            setForm((current) => ({ ...current, cardCvc: value }));
                            setFieldErrors((current) => {
                              const shouldValidate = validationAttempted || Boolean(current.cardCvc);
                              return {
                                ...current,
                                cardCvc: shouldValidate
                                  ? validateField("cardCvc", value) ?? undefined
                                  : current.cardCvc,
                              };
                            });
                          }}
                          onBlur={(event) => {
                            const value = event.currentTarget.value;
                            setFieldErrors((current) => ({
                              ...current,
                              cardCvc: validateField("cardCvc", value) ?? undefined,
                            }));
                          }}
                        />
                        {fieldErrors.cardCvc ? (
                          <p className="text-red-600 text-sm mt-1">{fieldErrors.cardCvc}</p>
                        ) : null}
                      </div>
                    </div>
                      </>
                    )}
                  </CardBody>
                </Card>
              </form>
            )}
          </div>

          <div className="lg:sticky lg:top-8 lg:self-start">
            <Card>
              <CardHeader>
                <CardTitle>Order summary</CardTitle>
              </CardHeader>
              <CardBody className="space-y-4 text-sm">
                {summaryDropdowns}

                {isTrial ? (
                  <>
                    <p className="text-base font-medium text-foreground">{formatEuro(0)} today</p>
                    <p className="text-base font-medium text-foreground">
                      Your {trialDays}-day free trial starts immediately.
                    </p>
                    <Button
                      type="button"
                      className="auth-submit-button"
                      disabled={submitting}
                      onClick={handleStartTrial}
                    >
                      {submitting ? "Continuing…" : "Start Free Trial"}
                    </Button>
                  </>
                ) : summary ? (
                  <>
                    <div className="flex items-center justify-between gap-4">
                      <span className="shrink-0 text-muted-foreground">Base price:</span>
                      <span className="text-right font-medium">
                        {formatCheckoutBasePrice(summary.monthlyEquivalent, summary.baseAmount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="shrink-0 text-muted-foreground">VAT ({summary.vatRate}%):</span>
                      <span className="font-medium">{formatEuro(summary.vatAmount)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-base">
                      <span className="font-semibold">Total today:</span>
                      <span className="font-semibold">{formatEuro(summary.totalAmount)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      VAT is calculated based on your billing country. You&apos;ll receive a tax
                      invoice.
                    </p>
                    <Button
                      type="submit"
                      form={PAID_FORM_ID}
                      className="auth-submit-button"
                      disabled={submitting}
                    >
                      {submitting
                        ? "Redirecting to Stripe…"
                        : useStripeCheckout
                          ? "Continue to Stripe Checkout"
                          : `Complete Payment — ${formatEuro(summary.totalAmount)}`}
                    </Button>
                  </>
                ) : null}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
