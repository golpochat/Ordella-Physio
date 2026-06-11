import { ExperimentCta } from "@/components/marketing/ExperimentCta";
import { ContactDetail } from "@/components/marketing/ContactDetail";
import { ContactForm } from "@/components/marketing/ContactForm";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";
import { cn } from "@/lib/cn";
import { marketingButtonPrimaryClass, marketingHeading } from "@/lib/marketing-ui";
import { generateSEO, pageUrl } from "../seo";

export const metadata = generateSEO({
  title: "Contact",
  description: "Get in touch with the Ordella Physio team.",
  url: pageUrl("/contact"),
});

const SUPPORT_EMAIL = "support@ordella.com";

export default function ContactPage() {
  return (
    <div className="bg-background pb-2xl pt-2xl">
      <MarketingPageHero
        title="Get in touch"
        description="Have questions about Ordella Physio? Our team is here to help."
      />

      <section className="marketing-container grid grid-cols-1 gap-2xl md:grid-cols-2">
        <ContactForm />

        <div className="space-y-xl">
          <ContactDetail icon="📧" label="Email" value={SUPPORT_EMAIL} />
          <ContactDetail icon="📍" label="Location" value="Dublin, Ireland" />
          <ContactDetail icon="⏰" label="Hours" value="Mon–Fri, 9:00–17:00" />

          <div
            className="flex h-64 items-center justify-center rounded-lg bg-brand-light shadow-soft"
            role="img"
            aria-label="Office location — Dublin, Ireland"
          >
            <p className={`text-sm font-medium ${marketingHeading.body}`}>Dublin, Ireland</p>
          </div>
        </div>
      </section>

      <section className="marketing-container mt-2xl py-2xl text-center max-sm:mt-xl max-sm:py-xl">
        <ScrollReveal>
          <h2 className={cn("mb-md", marketingHeading.h2)}>Prefer to talk directly?</h2>
          <p className={cn("mx-auto mb-xl max-w-xl text-lg", marketingHeading.body)}>
            Reach out and we&apos;ll help you understand how Ordella Physio fits your clinic.
          </p>
          <ExperimentCta
            experimentId="contact_cta"
            location="contact_page"
            variantA={{
              href: `mailto:${SUPPORT_EMAIL}`,
              label: "Email us",
              children: "Email Us",
              buttonClassName: marketingButtonPrimaryClass,
            }}
            variantB={{
              href: "#contact-form",
              label: "Send a message",
              children: "Send a Message",
              buttonClassName: marketingButtonPrimaryClass,
            }}
          />
        </ScrollReveal>
      </section>
    </div>
  );
}
