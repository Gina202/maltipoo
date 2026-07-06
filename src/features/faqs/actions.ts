"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { faqFormSchema, type FaqFormValues } from "./schema";

type ActionResult = { success: true } | { success: false; error: string };

export async function createFaq(values: FaqFormValues): Promise<ActionResult> {
  const parsed = faqFormSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Please check the form for errors." };
  }
  const v = parsed.data;

  const supabase = await createClient();

  // New FAQs go to the end of the list.
  const { count } = await supabase.from("faqs").select("*", { count: "exact", head: true });

  const { error } = await supabase.from("faqs").insert({
    question: v.question,
    answer: v.answer,
    sort_order: count ?? 0,
  });

  if (error) {
    console.error("Failed to create FAQ:", error);
    return { success: false, error: "Something went wrong saving this question." };
  }

  revalidatePath("/admin/faqs");
  revalidatePath("/faq");
  revalidatePath("/");
  redirect("/admin/faqs");
}

export async function updateFaq(id: string, values: FaqFormValues): Promise<ActionResult> {
  const parsed = faqFormSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Please check the form for errors." };
  }
  const v = parsed.data;

  const supabase = await createClient();
  const { error } = await supabase
    .from("faqs")
    .update({ question: v.question, answer: v.answer })
    .eq("id", id);

  if (error) {
    console.error("Failed to update FAQ:", error);
    return { success: false, error: "Something went wrong saving this question." };
  }

  revalidatePath("/admin/faqs");
  revalidatePath("/faq");
  revalidatePath("/");
  redirect("/admin/faqs");
}

export async function deleteFaq(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("faqs").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete FAQ:", error);
    return { success: false, error: "Something went wrong deleting this question." };
  }

  revalidatePath("/admin/faqs");
  revalidatePath("/faq");
  revalidatePath("/");
  return { success: true };
}

/**
 * Swaps this FAQ's sort_order with its neighbor in the given direction.
 * `orderedIds` is the current on-screen order, so we know exactly which
 * FAQ is the neighbor without a second round-trip query.
 */
export async function moveFaq(
  id: string,
  direction: "up" | "down",
  orderedIds: string[]
): Promise<ActionResult> {
  const index = orderedIds.indexOf(id);
  const targetIndex = direction === "up" ? index - 1 : index + 1;

  if (index === -1 || targetIndex < 0 || targetIndex >= orderedIds.length) {
    return { success: false, error: "Can't move this question further." };
  }

  const targetId = orderedIds[targetIndex];
  const supabase = await createClient();

  const { error: err1 } = await supabase
    .from("faqs")
    .update({ sort_order: targetIndex })
    .eq("id", id);
  const { error: err2 } = await supabase
    .from("faqs")
    .update({ sort_order: index })
    .eq("id", targetId);

  if (err1 || err2) {
    console.error("Failed to reorder FAQs:", err1 || err2);
    return { success: false, error: "Something went wrong reordering." };
  }

  revalidatePath("/admin/faqs");
  revalidatePath("/faq");
  revalidatePath("/");
  return { success: true };
}