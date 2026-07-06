import { notFound } from "next/navigation";
import { FaqForm } from "@/components/admin/forms/FaqForm";
import { getFaqById } from "@/features/faqs/queries";
import type { FaqFormValues } from "@/features/faqs/schema";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditFaqPage({ params }: Props) {
  const { id } = await params;
  const faq = await getFaqById(id);

  if (!faq) notFound();

  const defaultValues: Partial<FaqFormValues> = {
    question: faq.question,
    answer: faq.answer,
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-display text-2xl text-(--color-ink)">
        Edit question
      </h1>
      <FaqForm faqId={faq.id} defaultValues={defaultValues} />
    </div>
  );
}