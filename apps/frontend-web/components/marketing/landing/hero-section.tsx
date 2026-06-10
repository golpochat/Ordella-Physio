import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScreenshotPlaceholder } from "@/components/marketing/screenshot-placeholder";

export function HeroSection() {
  return (
    <section className="overflow-hidden bg-gradient-to-b from-accent/50 to-background py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">
              Modern physiotherapy practice platform
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              The complete platform for clinics, therapists, and patients
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Scheduling, billing, clinical notes, reporting, and role-based dashboards — all in one
              secure, multi-tenant system built for physiotherapy practices.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Button asChild size="lg">
                <Link href="/register">Get Started Free</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">View Pricing</Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              14-day free trial &middot; No credit card required
            </p>
          </div>

          <div className="relative">
            <div className="rounded-xl border bg-card p-2 shadow-lg">
              <ScreenshotPlaceholder label="Product dashboard mockup" />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rounded-lg border bg-card p-3 shadow-md sm:block">
              <p className="text-xs font-medium text-muted-foreground">Live appointments today</p>
              <p className="text-2xl font-bold text-primary">24</p>
            </div>
            <div className="absolute -right-4 -top-4 hidden rounded-lg border bg-card p-3 shadow-md sm:block">
              <p className="text-xs font-medium text-muted-foreground">Patient satisfaction</p>
              <p className="text-2xl font-bold text-primary">98%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
