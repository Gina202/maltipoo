import { z } from "zod";

export const testimonialFormSchema = z.object({
  customerName: z.string().trim().min(1, "Name is required"),
  review: z.string().trim().min(10, "Review should be at least 10 characters"),
  rating: z.coerce.number().int().min(1).max(5),
  customerPhotoUrl: z.string().trim().optional().or(z.literal("")),
  puppyPhotoUrl: z.string().trim().optional().or(z.literal("")),
});

export type TestimonialFormValues = z.infer<typeof testimonialFormSchema>;
export type TestimonialFormInput = z.input<typeof testimonialFormSchema>;