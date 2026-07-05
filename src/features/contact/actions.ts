"use server";

import { createClient } from "@/lib/supabase/server";
import { contactFormSchema, type ContactFormValues } from "./schema";

type SubmitResult = { success: true } | { success: false; error: string };

export async function submitInquiry(
  values: ContactFormValues
): Promise<SubmitResult> {
  const parsed = contactFormSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, error: "Please check the form and try again." };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("inquiries").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    message: parsed.data.message,
    puppy_slug: parsed.data.puppySlug || null,
  });

  if (error) {
    console.error("Failed to submit inquiry:", error);
    return {
      success: false,
      error: "Something went wrong on our end. Please try again, or use chat.",
    };
  }

  return { success: true };
}