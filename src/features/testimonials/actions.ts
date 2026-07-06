"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { testimonialFormSchema, type TestimonialFormValues } from "./schema";

type ActionResult = { success: true } | { success: false; error: string };

function toNullable(value: string | undefined | "") {
  return value === "" || value === undefined ? null : value;
}

export async function createTestimonial(
  values: TestimonialFormValues
): Promise<ActionResult> {
  const parsed = testimonialFormSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Please check the form for errors." };
  }
  const v = parsed.data;

  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").insert({
    customer_name: v.customerName,
    review: v.review,
    rating: v.rating,
    customer_photo_url: toNullable(v.customerPhotoUrl),
    puppy_photo_url: toNullable(v.puppyPhotoUrl),
  });

  if (error) {
    console.error("Failed to create testimonial:", error);
    return { success: false, error: "Something went wrong saving this testimonial." };
  }

  revalidatePath("/admin/testimonials");
  revalidatePath("/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(
  id: string,
  values: TestimonialFormValues
): Promise<ActionResult> {
  const parsed = testimonialFormSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Please check the form for errors." };
  }
  const v = parsed.data;

  const supabase = await createClient();
  const { error } = await supabase
    .from("testimonials")
    .update({
      customer_name: v.customerName,
      review: v.review,
      rating: v.rating,
      customer_photo_url: toNullable(v.customerPhotoUrl),
      puppy_photo_url: toNullable(v.puppyPhotoUrl),
    })
    .eq("id", id);

  if (error) {
    console.error("Failed to update testimonial:", error);
    return { success: false, error: "Something went wrong saving this testimonial." };
  }

  revalidatePath("/admin/testimonials");
  revalidatePath("/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete testimonial:", error);
    return { success: false, error: "Something went wrong deleting this testimonial." };
  }

  revalidatePath("/admin/testimonials");
  revalidatePath("/testimonials");
  revalidatePath("/");
  return { success: true };
}