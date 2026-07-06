import { z } from "zod";

export const parentFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  gender: z.enum(["male", "female"]),
  temperament: z.string().trim().optional(),
  healthInfo: z.string().trim().optional(),
  weightLbs: z.coerce.number().positive().optional().or(z.literal("")),
  description: z.string().trim().optional(),
  images: z.array(z.string()).min(1, "Add at least one photo"),
});

export type ParentFormValues = z.infer<typeof parentFormSchema>;
export type ParentFormInput = z.input<typeof parentFormSchema>;