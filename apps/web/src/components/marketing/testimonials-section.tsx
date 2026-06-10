import { TestimonialCard } from "@/components/cards/testimonial-card";
import { Section, SectionHeader } from "@/components/layout/section";
import { testimonials } from "@/lib/content";

export function TestimonialsSection() {
  return (
    <Section variant="muted">
      <SectionHeader
        eyebrow="Testimonials"
        title="Trusted by clinics worldwide"
        description="See what practice owners and clinical directors are saying."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.author} {...testimonial} />
        ))}
      </div>
    </Section>
  );
}
