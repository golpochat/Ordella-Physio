export const BILLING_ROUTES = {
  base: "/billing",
  health: "/billing/health",
  webhook: "/billing/webhook",
  createCustomer: "/billing/create-customer",
  createSubscription: "/billing/create-subscription",
  subscription: "/billing/subscription",
  stripeInvoices: "/billing/stripe-invoices",
  updatePaymentMethod: "/billing/update-payment-method",
  customerPortal: "/billing/customer-portal",
  cancelSubscription: "/billing/cancel-subscription",
} as const;
