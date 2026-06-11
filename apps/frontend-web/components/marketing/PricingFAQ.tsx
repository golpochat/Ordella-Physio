const PRICING_FAQS = [
  {
    q: "Is there a contract?",
    a: "No. All plans are month-to-month with no long-term commitment.",
  },
  {
    q: "Can I upgrade later?",
    a: "Yes. You can upgrade or downgrade at any time.",
  },
  {
    q: "Do you support multiple locations?",
    a: "Yes. Multi-location support is included in the Enterprise plan.",
  },
] as const;

export function PricingFAQ() {
  return (
    <section className="marketing-container mt-2xl pb-2xl">
      <h2 className="mb-md font-display text-4xl font-bold text-foreground">
        Frequently asked questions
      </h2>

      <div className="grid gap-xl md:grid-cols-3">
        {PRICING_FAQS.map((faq) => (
          <div
            key={faq.q}
            className="rounded-lg border bg-card p-xl shadow-soft"
          >
            <h3 className="mb-xs font-display text-xl font-semibold text-foreground">{faq.q}</h3>
            <p className="text-brand-gray">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
