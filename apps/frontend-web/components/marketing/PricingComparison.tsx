import { PRICING_COMPARISON_ROWS } from "@/lib/pricing-plans";

function ComparisonCell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return (
      <td className="py-md text-center">
        {value ? (
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

  return <td className="py-md text-center text-sm text-foreground">{value}</td>;
}

export function PricingComparison() {
  return (
    <section className="marketing-container mt-2xl py-2xl max-sm:mt-xl max-sm:py-xl">
      <h2 className="mb-md font-display text-3xl font-bold text-foreground sm:text-4xl">
        Compare plans
      </h2>

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
            {PRICING_COMPARISON_ROWS.map((row) => (
              <tr key={row.feature} className="border-b last:border-b-0">
                <td className="py-md pl-lg text-foreground">{row.feature}</td>
                <ComparisonCell value={row.starter} />
                <ComparisonCell value={row.pro} />
                <ComparisonCell value={row.enterprise} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
