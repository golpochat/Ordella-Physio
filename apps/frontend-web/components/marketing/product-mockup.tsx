import { cn } from "@/lib/cn";

export type ProductMockupProps = {
  variant?: "dashboard" | "calendar" | "billing" | "portal";
  priority?: boolean;
  className?: string;
};

const labels: Record<NonNullable<ProductMockupProps["variant"]>, string> = {
  dashboard: "Screenshot of the Ordella Physio clinic dashboard",
  calendar: "Screenshot of the Ordella Physio appointment calendar",
  billing: "Screenshot of the Ordella Physio billing overview",
  portal: "Screenshot of the Ordella Physio patient portal",
};

const BAR_WIDTHS = [72, 58, 86, 64] as const;
const CHART_HEIGHTS = [40, 65, 50, 80, 55, 70] as const;

export function ProductMockup({
  variant = "dashboard",
  priority = false,
  className,
}: ProductMockupProps) {
  return (
    <div
      className={cn(
        "product-mockup overflow-hidden rounded-lg border bg-card shadow-medium",
        priority && "product-mockup-priority",
        className,
      )}
      role="img"
      aria-label={labels[variant]}
      {...(priority ? { "data-priority": "true" } : {})}
    >
      <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-brand-error/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-warning/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-success/80" />
        <span className="ml-2 text-xs font-medium text-muted-foreground">{labels[variant]}</span>
      </div>
      <div className="grid gap-3 p-4 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-3">
          {["Appointments", "Revenue", "Patients"].map((stat) => (
            <div key={stat} className="rounded-md border bg-background p-3">
              <p className="text-xs text-muted-foreground">{stat}</p>
              <p className="mt-1 text-xl font-semibold text-primary">
                {stat === "Appointments" ? "24" : stat === "Revenue" ? "€4.2k" : "186"}
              </p>
            </div>
          ))}
        </div>
        <div className="grid gap-3 lg:grid-cols-5">
          <div className="rounded-md border bg-background p-3 lg:col-span-3">
            <div className="mb-3 h-2 w-24 rounded bg-muted" />
            <div className="space-y-2">
              {BAR_WIDTHS.map((width) => (
                <div key={width} className="flex items-center gap-2">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-primary/10" />
                  <div
                    className="h-2 rounded bg-primary/20"
                    style={{ width: `${width}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-md border bg-background p-3 lg:col-span-2">
            <div className="mb-3 h-2 w-20 rounded bg-muted" />
            <div className="flex h-28 items-end gap-2">
              {CHART_HEIGHTS.map((height, index) => (
                <div
                  key={index}
                  className="product-mockup-bar flex-1 rounded-t bg-primary/30"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
