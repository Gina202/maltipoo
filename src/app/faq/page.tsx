import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/constants/placeholder-data";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about adopting a Maltipoo puppy.",
};

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
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
  );
}