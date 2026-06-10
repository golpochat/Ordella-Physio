import { TestimonialCard } from "@/components/cards/testimonial-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import { TESTIMONIALS } from "@/lib/content";

export function TestimonialsSection() {
  return (
    <Section variant="muted">
      <SectionHeader
        eyebrow="Testimonials"
        title="Trusted by clinics worldwide"
        description="See what practice owners and clinical directors are saying."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard key={testimonial.author} {...testimonial} />
        ))}
      </div>
    </Section>
  );
}
