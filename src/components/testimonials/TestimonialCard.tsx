import { Star } from "lucide-react";
import type { PlaceholderTestimonial } from "@/constants/placeholder-data";

export function TestimonialCard({
  testimonial,
}: {
  testimonial: PlaceholderTestimonial;
}) {
  return (
    <div className="rounded-[1.5rem] bg-white p-6 shadow-[var(--shadow-soft)]">
      <div className="mb-3 flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4"
            aria-hidden="true"
            fill={i < testimonial.rating ? "var(--color-rose)" : "none"}
            stroke="var(--color-rose)"
          />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-(--color-ink-soft)">
        &ldquo;{testimonial.review}&rdquo;
      </p>
      <p className="mt-4 font-display text-base text-(--color-ink)">
        {testimonial.customerName}
      </p>
    </div>
  );
}