import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/marketing/CtaLink";
import { AboutSection } from "@/components/marketing/AboutSection";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";
import { marketingButtonPrimaryClass, marketingHeading } from "@/lib/marketing-ui";
import { cn } from "@/lib/cn";
import { TeamCard } from "@/components/marketing/TeamCard";
import { TimelineItem } from "@/components/marketing/TimelineItem";
import { ValueCard } from "@/components/marketing/ValueCard";
import { generateSEO, pageUrl } from "../seo";

export const metadata = generateSEO({
  title: "About",
  description: "Learn about the mission, values, and team behind Ordella Physio.",
  url: pageUrl("/about"),
});

export default function AboutPage() {
  return (
    <div className="bg-background pb-2xl pt-2xl">
      <MarketingPageHero
        title="Our story"
        description="Ordella Physio was created to bring clarity, efficiency, and modern technology to physiotherapy clinics everywhere."
      />

      <AboutSection
        title="Our mission"
        subtitle="To empower physiotherapy clinics with a unified, intelligent platform that simplifies operations and elevates patient care."
      >
        <p className="max-w-3xl text-brand-gray">
          We believe clinics deserve software that works the way they do — intuitive, reliable, and
          built around real workflows. Ordella Physio brings together appointments, notes, billing,
          communication, and analytics into one seamless experience.
        </p>
      </AboutSection>

      <AboutSection
        className="bg-muted/40"
        title="Our values"
        subtitle="The principles that guide how we build, support, and innovate."
      >
        <div className="grid grid-cols-1 gap-xl md:grid-cols-3">
          <ValueCard
            icon="✨"
            title="Clarity"
            description="We design for simplicity, transparency, and ease of use."
          />
          <ValueCard
            icon="🤝"
            title="Trust"
            description="We prioritize security, reliability, and long-term relationships."
          />
          <ValueCard
            icon="🚀"
            title="Innovation"
            description="We continuously improve and evolve to meet clinic needs."
          />
        </div>
      </AboutSection>

      <AboutSection title="Our journey">
        <div className="max-w-2xl space-y-xl">
          <TimelineItem
            year="2023"
            title="The idea"
            description="We identified the need for a unified, modern clinic platform."
          />
          <TimelineItem
            year="2024"
            title="Product development"
            description="We built the core modules: appointments, notes, patients, and billing."
          />
          <TimelineItem
            year="2025"
            title="Launch"
            description="Ordella Physio launched with multi-tenant architecture and role-based access."
          />
          <TimelineItem
            year="2026"
            title="Growth"
            description="Clinics across Europe adopted the platform, driving rapid expansion."
          />
        </div>
      </AboutSection>

      <AboutSection
        className="bg-muted/40"
        title="Meet the team"
        subtitle="A small, focused team dedicated to building the future of clinic software."
      >
        <div className="grid grid-cols-1 gap-xl md:grid-cols-3">
          <TeamCard name="Sujan" role="Founder & Lead Engineer" />
          <TeamCard name="Coming Soon" role="Product & Design" />
          <TeamCard name="Coming Soon" role="Customer Success" />
        </div>
      </AboutSection>

      <section className="marketing-container mt-2xl py-2xl text-center">
        <ScrollReveal>
          <h2 className={cn("mb-md", marketingHeading.h2)}>Ready to join the journey?</h2>
          <p className={cn("mx-auto mb-xl max-w-xl text-lg", marketingHeading.body)}>
            Let&apos;s modernize your clinic with a platform built for the future.
          </p>
          <Button asChild size="lg" className={marketingButtonPrimaryClass}>
            <CtaLink href="/contact" location="about" label="Get started">
              Get Started
            </CtaLink>
          </Button>
        </ScrollReveal>
      </section>
    </div>
  );
}
