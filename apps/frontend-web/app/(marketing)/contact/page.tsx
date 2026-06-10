import type { Metadata } from "next";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/marketing/contact-form";
import { SectionHeading } from "@/components/marketing/section-heading";

export const metadata: Metadata = {
  title: "Contact — Ordella Physio",
  description: "Get in touch with the Ordella Physio team for support, sales, or general inquiries.",
};

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          centered
          eyebrow="Contact"
          title="We'd love to hear from you"
          description="Reach out for demos, support, or partnership inquiries."
        />

        <div className="mx-auto mt-12 grid max-w-4xl gap-8 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                This form is a placeholder and does not submit data yet.
              </CardDescription>
            </CardHeader>
            <CardBody>
              <ContactForm />
            </CardBody>
          </Card>

          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Support</CardTitle>
                <CardDescription>For existing customers</CardDescription>
              </CardHeader>
              <CardBody>
                <p className="text-sm text-muted-foreground">Email us at</p>
                <p className="font-medium">support@ordella-physio.com</p>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sales</CardTitle>
                <CardDescription>For demos and enterprise plans</CardDescription>
              </CardHeader>
              <CardBody>
                <p className="text-sm text-muted-foreground">Email us at</p>
                <p className="font-medium">sales@ordella-physio.com</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
