import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getAllFaqs } from "@/features/faqs/queries";

export async function FAQSection() {
  const faqs = await getAllFaqs();

  if (faqs.length === 0) return null;

  return (
    <section className="bg-(--color-cream) px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <SectionHeading eyebrow="Questions" title="Frequently asked questions" />

        <Accordion className="w-full">
          {faqs.slice(0, 4).map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
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