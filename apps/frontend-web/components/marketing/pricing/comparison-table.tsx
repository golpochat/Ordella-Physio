import { Check } from "@ordella/shared-icons";
import type { ComparisonRow } from "@/lib/marketing-content";

function ComparisonCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return <Check className="mx-auto h-5 w-5 text-primary" aria-label="Included" />;
  }
  if (value === false) {
    return <span className="text-muted-foreground" aria-label="Not included">—</span>;
  }
  return <span className="text-sm font-medium">{value}</span>;
}

export type ComparisonTableProps = {
  rows: ComparisonRow[];
};

export function ComparisonTable({ rows }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-4 font-semibold sm:px-6">Feature</th>
            <th className="px-4 py-4 text-center font-semibold sm:px-6">Starter</th>
            <th className="px-4 py-4 text-center font-semibold sm:px-6">
              <span className="inline-flex items-center gap-2">
                Pro
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  Recommended
                </span>
              </span>
            </th>
            <th className="px-4 py-4 text-center font-semibold sm:px-6">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature} className="border-b last:border-0">
              <td className="px-4 py-4 font-medium sm:px-6">{row.feature}</td>
              <td className="px-4 py-4 text-center sm:px-6">
                <ComparisonCell value={row.starter} />
              </td>
              <td className="bg-primary/5 px-4 py-4 text-center sm:px-6">
                <ComparisonCell value={row.pro} />
              </td>
              <td className="px-4 py-4 text-center sm:px-6">
                <ComparisonCell value={row.enterprise} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
