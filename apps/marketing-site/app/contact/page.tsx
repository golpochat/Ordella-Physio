"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import { SALES_EMAIL, SUPPORT_EMAIL } from "@/lib/content";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <Section className="pt-16">
      <SectionHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Questions about Ordella? Our team is here to help."
      />
      <div className="grid gap-10 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>
          <CardBody>
            {submitted ? (
              <p className="text-muted-foreground">
                Thank you for your message. We&apos;ll get back to you within one business day.
              </p>
            ) : (
              <form className="space-y-4" onSubmit={onSubmit}>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div>
                  <Label htmlFor="clinic">Clinic name</Label>
                  <Input id="clinic" name="clinic" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" required />
                </div>
                <Button type="submit">Send message</Button>
              </form>
            )}
          </CardBody>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardBody className="flex items-start gap-4 pt-6">
              <Mail className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">Clinic support</p>
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sm text-primary hover:underline">
                  {SUPPORT_EMAIL}
                </a>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="flex items-start gap-4 pt-6">
              <Phone className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">Sales</p>
                <a href={`mailto:${SALES_EMAIL}`} className="text-sm text-primary hover:underline">
                  {SALES_EMAIL}
                </a>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="pt-6">
              <div className="mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <p className="font-semibold">Office location</p>
              </div>
              <div className="flex aspect-video items-center justify-center rounded-lg border bg-muted/40 text-sm text-muted-foreground">
                Map placeholder — 123 Health Street, London, UK
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Section>
  );
}
