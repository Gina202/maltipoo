import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/constants/placeholder-data";

export function FAQSection() {
  return (
    <section className="bg-(--color-cream) px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <SectionHeading eyebrow="Questions" title="Frequently asked questions" />

        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-display text-base text-(--color-ink)">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-(--color-ink-soft)">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}