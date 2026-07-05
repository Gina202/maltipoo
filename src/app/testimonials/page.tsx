import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { TESTIMONIALS } from "@/constants/placeholder-data";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read what families have to say about their experience.",
};

export default function TestimonialsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Kind words"
        title="Families who found their puppy here"
        align="left"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}