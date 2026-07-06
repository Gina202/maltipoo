import { notFound } from "next/navigation";
import { TestimonialForm } from "@/components/admin/forms/TestimonialForm";
import { getTestimonialById } from "@/features/testimonials/queries";
import type { TestimonialFormValues } from "@/features/testimonials/schema";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditTestimonialPage({ params }: Props) {
  const { id } = await params;
  const testimonial = await getTestimonialById(id);

  if (!testimonial) notFound();

  const defaultValues: Partial<TestimonialFormValues> = {
    customerName: testimonial.customer_name,
    review: testimonial.review,
    rating: testimonial.rating ?? 5,
    customerPhotoUrl: testimonial.customer_photo_url ?? "",
    puppyPhotoUrl: testimonial.puppy_photo_url ?? "",
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-display text-2xl text-(--color-ink)">
        Edit testimonial
      </h1>
      <TestimonialForm testimonialId={testimonial.id} defaultValues={defaultValues} />
    </div>
  );
}