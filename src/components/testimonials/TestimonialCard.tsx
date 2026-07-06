import Image from "next/image";
import { Star } from "lucide-react";
import type { TestimonialRow } from "@/features/testimonials/types";

export function TestimonialCard({ testimonial }: { testimonial: TestimonialRow }) {
  const rating = testimonial.rating ?? 5;

  return (
    <div className="rounded-[1.5rem] bg-white p-6 shadow-[var(--shadow-soft)]">
      <div className="mb-3 flex gap-1" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4"
            aria-hidden="true"
            fill={i < rating ? "var(--color-rose)" : "none"}
            stroke="var(--color-rose)"
          />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-(--color-ink-soft)">
        &ldquo;{testimonial.review}&rdquo;
      </p>

      <div className="mt-4 flex items-center gap-3">
        {testimonial.customer_photo_url ? (
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
            <Image
              src={testimonial.customer_photo_url}
              alt={testimonial.customer_name}
              fill
              className="object-cover"
              sizes="36px"
            />
          </div>
        ) : null}
        <p className="font-display text-base text-(--color-ink)">
          {testimonial.customer_name}
        </p>
        {testimonial.puppy_photo_url ? (
          <div className="relative ml-auto h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-(--color-cream)">
            <Image
              src={testimonial.puppy_photo_url}
              alt="Their puppy"
              fill
              className="object-cover"
              sizes="36px"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}