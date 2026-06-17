import { isClinicBackendClient } from "@/lib/clinic-backend-normalize";

/**
 * When true, paid checkout uses Stripe Checkout Session via billing-service (BFF → gateway).
 * Set NEXT_PUBLIC_ALLOW_DB_CHECKOUT=true only for monolith-only local dev without Stripe.
 */
export function preferStripeCheckout(): boolean {
  if (process.env.NEXT_PUBLIC_ALLOW_DB_CHECKOUT === "true") {
    return false;
  }
  return true;
}

export function isMonolithDbCheckoutFallback(): boolean {
  return isClinicBackendClient() && !preferStripeCheckout();
}
