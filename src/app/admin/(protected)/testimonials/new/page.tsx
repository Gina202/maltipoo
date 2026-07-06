import { TestimonialForm } from "@/components/admin/forms/TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-display text-2xl text-(--color-ink)">
        Add a testimonial
      </h1>
      <TestimonialForm />
    </div>
  );
}