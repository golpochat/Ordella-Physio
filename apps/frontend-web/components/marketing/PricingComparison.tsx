const COMPARISON_ROWS = [
  { label: "Appointments", starter: true, pro: true, enterprise: true },
  { label: "Patient Records", starter: true, pro: true, enterprise: true },
  { label: "Clinical Notes", starter: true, pro: true, enterprise: true },
  { label: "Billing & Invoicing", starter: false, pro: true, enterprise: true },
  { label: "Analytics", starter: false, pro: true, enterprise: true },
  { label: "Multi-location", starter: false, pro: false, enterprise: true },
] as const;

function CheckCell({ included }: { included: boolean }) {
  return (
    <td className="py-md text-center">
      {included ? (
        <span className="font-medium text-brand-primary" aria-label="Included">
          ✔
        </span>
      ) : (
        <span className="text-brand-gray" aria-label="Not included">
          —
        </span>
      )}
    </td>
  );
}

export function PricingComparison() {
  return (
    <section className="marketing-container mt-2xl py-2xl">
      <h2 className="mb-md font-display text-4xl font-bold text-foreground">Compare plans</h2>

      <div className="overflow-x-auto rounded-lg border bg-card shadow-soft">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="py-md pl-lg font-semibold">Feature</th>
              <th className="py-md text-center font-semibold">Starter</th>
              <th className="py-md text-center font-semibold">Pro</th>
              <th className="py-md pr-lg text-center font-semibold">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row) => (
              <tr key={row.label} className="border-b last:border-b-0">
                <td className="py-md pl-lg text-foreground">{row.label}</td>
                <CheckCell included={row.starter} />
                <CheckCell included={row.pro} />
                <CheckCell included={row.enterprise} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
