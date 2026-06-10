import type { Metadata } from "next";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { CtaSection } from "@/components/marketing/cta-section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { TEAM_PLACEHOLDERS } from "@/lib/marketing-content";

export const metadata: Metadata = {
  title: "About — Ordella Physio",
  description: "Learn about Ordella Physio's mission to modernize physiotherapy practice management.",
};

export default function AboutPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            centered
            eyebrow="About us"
            title="Empowering clinics to focus on patient care"
            description="Our mission is to reduce administrative burden so physiotherapists can spend more time helping patients recover and thrive."
          />
        </div>
      </section>

      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold">Our story</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              Ordella Physio was founded by clinicians and engineers who experienced firsthand the
              frustration of fragmented clinic software. Spreadsheets for scheduling, separate tools
              for billing, and paper notes that never synced — it was clear the industry deserved
              better.
            </p>
            <p>
              We set out to build a platform that treats the clinic as a whole: every role, every
              workflow, every patient interaction connected in one secure, tenant-aware system.
              Today, Ordella Physio serves practices of all sizes with role-based dashboards,
              real-time analytics, and a patient portal patients actually want to use.
            </p>
            <p>
              This is placeholder content for the company story. A full narrative with founding
              details, milestones, and vision will be added in a future content pass.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading centered title="Meet the team" description="The people behind Ordella Physio." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_PLACEHOLDERS.map((member) => (
              <Card key={member.name}>
                <CardHeader>
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted text-2xl font-semibold text-muted-foreground">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                </CardHeader>
                <CardBody>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
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
