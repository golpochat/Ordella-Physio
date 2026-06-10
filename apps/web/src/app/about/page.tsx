import { Section, SectionHeader } from "@/components/layout/section";
import { FinalCtaSection } from "@/components/marketing/final-cta";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description: "Learn about Ordella Physio — our mission, vision, and values.",
  path: "/about",
});

const values = [
  { title: "Patient-first", description: "Every feature we build starts with improving the patient experience." },
  { title: "Clinical excellence", description: "We respect clinical workflows and design tools therapists trust." },
  { title: "Transparency", description: "Clear pricing, honest communication, and no hidden surprises." },
  { title: "Continuous improvement", description: "We ship fast and listen closely to clinic feedback." },
];

const team = [
  { name: "Alex Rivera", role: "CEO & Co-founder", initials: "AR" },
  { name: "Priya Sharma", role: "CTO & Co-founder", initials: "PS" },
  { name: "Chris O'Brien", role: "Head of Product", initials: "CO" },
  { name: "Nina Kowalski", role: "Head of Customer Success", initials: "NK" },
];

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
            <CardContent className="text-muted-foreground">
              To give physiotherapy clinics a single, beautiful platform that reduces admin burden and helps
              practitioners focus on what matters most — patient outcomes.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Our vision</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              A world where every physio clinic — from solo practitioners to multi-location groups — runs on
              modern, connected software that scales with their ambition.
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeader title="Our values" description="The principles that guide everything we build." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <Card key={value.title}>
              <CardHeader>
                <CardTitle className="text-lg">{value.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{value.description}</CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader title="Meet the team" description="Placeholder profiles — update with real team members." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <Card key={member.name} className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                  {member.initials}
                </div>
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <FinalCtaSection />
    </>
  );
}
