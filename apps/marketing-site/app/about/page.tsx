import { CtaSection } from "@/components/sections/cta";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/seo";
import { TEAM, TIMELINE } from "@/lib/content";

export const metadata = createMetadata({
  title: "About",
  description: "Learn about Ordella Physio — our mission, team, and story.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Section className="pt-16">
        <SectionHeader
          eyebrow="About"
          title="Building the future of physio practice management"
          description="Ordella was founded by clinicians and engineers who saw how much time clinics lose to fragmented software."
        />
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Our mission</CardTitle>
            </CardHeader>
            <CardBody className="text-muted-foreground">
              To give physiotherapy clinics a single, beautiful platform that reduces admin burden and helps
              practitioners focus on what matters most — patient outcomes.
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Our vision</CardTitle>
            </CardHeader>
            <CardBody className="text-muted-foreground">
              A world where every physio clinic — from solo practitioners to multi-location groups — runs on
              modern, connected software that scales with their ambition.
            </CardBody>
          </Card>
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeader title="Our journey" description="Key milestones in the Ordella story." />
        <div className="relative mx-auto max-w-2xl">
          <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2" />
          <div className="space-y-12">
            {TIMELINE.map((item, index) => (
              <div
                key={item.year}
                className={`relative flex gap-8 md:gap-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="hidden w-1/2 md:block" />
                <div className="absolute left-4 h-3 w-3 -translate-x-1/2 rounded-full bg-primary md:left-1/2" />
                <div className="ml-10 w-full md:ml-0 md:w-1/2 md:px-8">
                  <Card>
                    <CardBody className="pt-6">
                      <p className="text-sm font-semibold text-primary">{item.year}</p>
                      <h3 className="mt-1 font-display text-lg font-bold">{item.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                    </CardBody>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader title="Meet the team" description="The people behind Ordella Physio." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <Card key={member.name} className="text-center">
              <CardBody className="pt-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                  {member.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
