"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { trackContactFormSubmit, trackFunnelStep } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { marketingButtonPrimaryClass } from "@/lib/marketing-ui";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      clinicName: String(formData.get("clinicName") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? "Unable to send your message. Please try again.");
        return;
      }

      trackContactFormSubmit("marketing_contact");
      trackFunnelStep("contact_submit");
      setSubmitted(true);
      form.reset();
    } catch {
      setError("Unable to send your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="rounded-lg bg-card p-xl text-center shadow-soft"
        role="status"
        aria-live="polite"
      >
        <h3 className="mb-sm font-display text-2xl font-semibold text-foreground">Thank you!</h3>
        <p className="text-brand-gray">
          We&apos;ve received your message and will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      className="space-y-md rounded-lg bg-card p-xl shadow-soft"
      aria-labelledby="contact-form-title"
      noValidate
    >
      <h2 id="contact-form-title" className="sr-only">
        Contact form
      </h2>

      <div className="sr-only" aria-hidden>
        <Label htmlFor="contact-website">Website</Label>
        <Input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <Label htmlFor="contact-name" className="mb-xs block font-semibold">
          Name
        </Label>
        <Input
          id="contact-name"
          name="name"
          type="text"
          required
          aria-required="true"
          autoComplete="name"
          placeholder="Your name"
          className="focus-ring"
          disabled={submitting}
          maxLength={120}
        />
      </div>

      <div>
        <Label htmlFor="contact-email" className="mb-xs block font-semibold">
          Email
        </Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          required
          aria-required="true"
          autoComplete="email"
          placeholder="you@clinic.com"
          className="focus-ring"
          disabled={submitting}
          maxLength={254}
        />
      </div>

      <div>
        <Label htmlFor="contact-clinic" className="mb-xs block font-semibold">
          Clinic Name
        </Label>
        <Input
          id="contact-clinic"
          name="clinicName"
          type="text"
          autoComplete="organization"
          placeholder="Your clinic"
          className="focus-ring"
          disabled={submitting}
          maxLength={160}
        />
      </div>

      <div>
        <Label htmlFor="contact-message" className="mb-xs block font-semibold">
          Message
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          required
          aria-required="true"
          rows={5}
          placeholder="How can we help?"
          className="focus-ring"
          disabled={submitting}
          maxLength={5000}
        />
      </div>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={submitting}
        className={cn(marketingButtonPrimaryClass, "w-full")}
      >
        {submitting ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
