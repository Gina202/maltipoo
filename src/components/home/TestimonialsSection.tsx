import { SectionHeading } from "@/components/shared/SectionHeading";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { getAllTestimonials } from "@/features/testimonials/queries";

export async function TestimonialsSection() {
  const testimonials = await getAllTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section className="bg-(--color-cream) px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Kind words"
          title="Families who found their puppy here"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}