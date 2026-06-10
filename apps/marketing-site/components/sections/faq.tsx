import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import { FAQ_ITEMS } from "@/lib/content";

export function FaqSection() {
  return (
    <Section>
      <SectionHeader title="Frequently asked questions" />
      <Accordion type="single" collapsible className="mx-auto max-w-2xl">
        {FAQ_ITEMS.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
