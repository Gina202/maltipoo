import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getAllFaqs } from "@/features/faqs/queries";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about adopting a Maltipoo puppy.",
};

export default async function FAQPage() {
  const faqs = await getAllFaqs();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
      <SectionHeading eyebrow="Questions" title="Frequently asked questions" />
      {faqs.length === 0 ? (
        <p className="py-16 text-center text-sm text-(--color-ink-soft)">
          We're still adding answers here &mdash; feel free to reach out with
          any questions in the meantime.
        </p>
      ) : (
        <Accordion className="w-full">
          {faqs.map((faq) => (
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
      )}
    </div>
  );
}