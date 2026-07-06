import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { getAllTestimonials } from "@/features/testimonials/queries";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read what families have to say about their experience.",
};

export default async function TestimonialsPage() {
  const testimonials = await getAllTestimonials();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Kind words"
        title="Families who found their puppy here"
        align="left"
      />
      {testimonials.length === 0 ? (
        <p className="py-16 text-center text-sm text-(--color-ink-soft)">
          We're just getting started &mdash; check back soon for reviews from
          families who've adopted with us.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      )}
    </div>
  );
}