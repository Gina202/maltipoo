import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)"),
  puppySlug: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;