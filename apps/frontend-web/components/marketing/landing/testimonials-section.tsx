import { Card, CardBody } from "@/components/ui/card";
import { SectionHeading } from "@/components/marketing/section-heading";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          centered
          eyebrow="Social proof"
          title="Trusted by clinics like yours"
          description="Practice leaders and therapists are already transforming how they deliver care."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author}>
              <CardBody className="space-y-4">
                <p className="text-muted-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
