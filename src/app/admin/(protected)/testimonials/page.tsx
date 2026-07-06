import Link from "next/link";
import { Plus, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getAllTestimonials } from "@/features/testimonials/queries";
import { DeleteTestimonialButton } from "@/components/admin/DeleteTestimonialButton";

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonials();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-(--color-ink)">Testimonials</h1>
          <p className="mt-1 text-sm text-(--color-ink-soft)">
            Add and manage customer reviews shown on the site.
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className={buttonVariants({ className: "gap-2 rounded-full" })}
        >
          <Plus className="h-4 w-4" />
          Add testimonial
        </Link>
      </div>

      {testimonials.length === 0 ? (
        <div className="mt-8 rounded-[1.5rem] bg-white p-8 text-center text-sm text-(--color-ink-soft)">
          No testimonials yet. Click "Add testimonial" to add your first review.
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-3">
          {testimonials.map((t) => (
            <div key={t.id} className="flex items-start gap-4 rounded-[1.5rem] bg-white p-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-display text-base text-(--color-ink)">
                    {t.customer_name}
                  </p>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5"
                        fill={i < (t.rating ?? 0) ? "var(--color-rose)" : "none"}
                        stroke="var(--color-rose)"
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-1 text-sm text-(--color-ink-soft)">{t.review}</p>
              </div>
              <Link
                href={`/admin/testimonials/${t.id}/edit`}
                className={buttonVariants({ variant: "outline", className: "shrink-0 rounded-full" })}
              >
                Edit
              </Link>
              <DeleteTestimonialButton id={t.id} name={t.customer_name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}