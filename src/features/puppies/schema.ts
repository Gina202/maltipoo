import { z } from "zod";

export const puppyFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  price: z.coerce.number().positive("Enter a valid price"),
  ageWeeks: z.coerce.number().int().nonnegative("Enter a valid age in weeks"),
  gender: z.enum(["male", "female"]),
  status: z.enum(["available", "reserved", "sold"]),
  description: z.string().trim().optional(),
  personality: z.string().trim().optional(),
  healthInfo: z.string().trim().optional(),
  vaccinationStatus: z.string().trim().optional(),
  readyDate: z.string().trim().optional(),
  expectedAdultWeight: z.coerce.number().positive().optional().or(z.literal("")),
  motherId: z.string().uuid().optional().or(z.literal("")),
  fatherId: z.string().uuid().optional().or(z.literal("")),
  seoTitle: z.string().trim().optional(),
  seoDescription: z.string().trim().optional(),
  images: z.array(z.string()).min(1, "Add at least one photo"),
});

export type PuppyFormValues = z.infer<typeof puppyFormSchema>;
export type PuppyFormInput = z.input<typeof puppyFormSchema>;