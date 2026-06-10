import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  return (
    <Section variant="muted" className="pb-28">
      <div className="rounded-3xl border bg-gradient-to-br from-primary/10 via-background to-accent/20 px-8 py-16 text-center md:px-16">
        <h2 className="font-display text-3xl font-bold md:text-4xl">Start your free trial</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Join hundreds of clinics using Ordella to streamline operations and deliver better patient care.
        </p>
        <p className="mt-2 text-sm font-medium text-primary">No credit card required</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="xl">
            <Link href="/pricing">Start your free trial</Link>
          </Button>
          <Button asChild variant="outline" size="xl">
            <Link href="/contact">Talk to sales</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
