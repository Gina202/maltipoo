import { FaqForm } from "@/components/admin/forms/FaqForm";

export default function NewFaqPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-display text-2xl text-(--color-ink)">
        Add a question
      </h1>
      <FaqForm />
    </div>
  );
}