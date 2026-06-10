import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CtaSection } from "@/components/marketing/cta-section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { SOLUTIONS } from "@/lib/marketing-content";

export const metadata: Metadata = {
  title: "Solutions — Ordella Physio",
  description: "Tailored solutions for clinics, therapists, patients, and platform administrators.",
};

export default function SolutionsPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            centered
            eyebrow="Solutions"
            title="Built for every role in your clinic"
            description="Whether you manage the front desk, treat patients, or oversee the entire organization — Ordella Physio has a workspace designed for you."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {SOLUTIONS.map((solution) => (
              <Card key={solution.title}>
                <CardHeader>
                  <Badge className="w-fit">{solution.audience}</Badge>
                  <CardTitle className="mt-2">{solution.title}</CardTitle>
                  <CardDescription>{solution.description}</CardDescription>
                </CardHeader>
                <CardBody>
                  <Button asChild variant="outline">
                    <Link href="/register">Get started</Link>
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
