"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SinglePhotoUploader } from "@/components/admin/SinglePhotoUploader";
import {
  testimonialFormSchema,
  type TestimonialFormValues,
  type TestimonialFormInput,
} from "@/features/testimonials/schema";
import { createTestimonial, updateTestimonial } from "@/features/testimonials/actions";

type TestimonialFormProps = {
  testimonialId?: string;
  defaultValues?: Partial<TestimonialFormValues>;
};

export function TestimonialForm({ testimonialId, defaultValues }: TestimonialFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const isEditing = Boolean(testimonialId);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialFormInput, unknown, TestimonialFormValues>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      rating: 5,
      customerPhotoUrl: "",
      puppyPhotoUrl: "",
      ...defaultValues,
    },
  });

  // Fixed line: Wrapped in Number() to guarantee a number type for the JSX comparison
  const rating = Number(watch("rating") ?? 5);
  const customerPhotoUrl = watch("customerPhotoUrl") ?? "";
  const puppyPhotoUrl = watch("puppyPhotoUrl") ?? "";

  async function onSubmit(values: TestimonialFormValues) {
    setServerError(null);
    const result = isEditing
      ? await updateTestimonial(testimonialId!, values)
      : await createTestimonial(values);

    if (result && !result.success) {
      setServerError(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8" noValidate>
      <div className="rounded-[1.5rem] bg-white p-6">
        <h2 className="mb-5 font-display text-lg text-(--color-ink)">Review</h2>

        <div className="flex flex-col gap-5">
          <div>
            <Label className="mb-2 block text-sm text-(--color-ink)">Customer name</Label>
            <Input {...register("customerName")} placeholder="Sarah M." />
            {errors.customerName && (
              <p className="mt-1 text-xs text-(--color-rose-dark)">
                {errors.customerName.message}
              </p>
            )}
          </div>

          <div>
            <Label className="mb-2 block text-sm text-(--color-ink)">Rating</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setValue("rating", value, { shouldValidate: true })}
                  aria-label={`${value} star${value === 1 ? "" : "s"}`}
                  className="p-0.5"
                >
                  <Star
                    className="h-6 w-6"
                    fill={value <= rating ? "var(--color-rose)" : "none"}
                    stroke="var(--color-rose)"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="mb-2 block text-sm text-(--color-ink)">Review</Label>
            <Textarea rows={4} {...register("review")} placeholder="What did they say?" />
            {errors.review && (
              <p className="mt-1 text-xs text-(--color-rose-dark)">{errors.review.message}</p>
            )}
          </div>

          <div className="flex gap-6">
            <SinglePhotoUploader
              label="Customer photo (optional)"
              value={customerPhotoUrl}
              onChange={(url) => setValue("customerPhotoUrl", url)}
              pathPrefix="testimonials"
            />
            <SinglePhotoUploader
              label="Puppy photo (optional)"
              value={puppyPhotoUrl}
              onChange={(url) => setValue("puppyPhotoUrl", url)}
              pathPrefix="testimonials"
            />
          </div>
        </div>
      </div>

      {serverError && <p className="text-sm text-(--color-rose-dark)">{serverError}</p>}

      <Button type="submit" disabled={isSubmitting} className="w-full rounded-full py-6 sm:w-auto">
        {isSubmitting ? "Saving..." : isEditing ? "Save changes" : "Add testimonial"}
      </Button>
    </form>
  );
}
