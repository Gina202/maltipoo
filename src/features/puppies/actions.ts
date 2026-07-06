"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slugify";
import { puppyFormSchema, type PuppyFormValues } from "./schema";

type ActionResult = { success: true } | { success: false; error: string };

async function generateUniqueSlug(name: string): Promise<string> {
  const supabase = await createClient();
  const base = slugify(name);
  let candidate = base;
  let suffix = 1;

  while (true) {
    const { data } = await supabase
      .from("puppies")
      .select("id")
      .eq("slug", candidate)
      .maybeSingle();

    if (!data) return candidate;
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }
}

function toNullable<T extends string | number>(value: T | undefined | ""): T | null {
  return value === "" || value === undefined ? null : value;
}

export async function createPuppy(values: PuppyFormValues): Promise<ActionResult> {
  const parsed = puppyFormSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Please check the form for errors." };
  }
  const v = parsed.data;

  const supabase = await createClient();
  const slug = await generateUniqueSlug(v.name);

  const { data: puppy, error } = await supabase
    .from("puppies")
    .insert({
      slug,
      name: v.name,
      price: v.price,
      age_weeks: v.ageWeeks,
      gender: v.gender,
      status: v.status,
      description: toNullable(v.description),
      personality: toNullable(v.personality),
      health_info: toNullable(v.healthInfo),
      vaccination_status: toNullable(v.vaccinationStatus),
      ready_date: toNullable(v.readyDate),
      expected_adult_weight: toNullable(v.expectedAdultWeight),
      mother_id: toNullable(v.motherId),
      father_id: toNullable(v.fatherId),
      main_image_url: v.images[0] ?? null,
      seo_title: toNullable(v.seoTitle),
      seo_description: toNullable(v.seoDescription),
    })
    .select("id")
    .single();

  if (error || !puppy) {
    console.error("Failed to create puppy:", error);
    return { success: false, error: "Something went wrong saving this puppy." };
  }

  await insertImages(puppy.id, v.images);

  revalidatePath("/admin/puppies");
  revalidatePath("/puppies");
  revalidatePath("/");
  redirect("/admin/puppies");
}

export async function updatePuppy(
  id: string,
  values: PuppyFormValues
): Promise<ActionResult> {
  const parsed = puppyFormSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Please check the form for errors." };
  }
  const v = parsed.data;

  const supabase = await createClient();

  const { error } = await supabase
    .from("puppies")
    .update({
      name: v.name,
      price: v.price,
      age_weeks: v.ageWeeks,
      gender: v.gender,
      status: v.status,
      description: toNullable(v.description),
      personality: toNullable(v.personality),
      health_info: toNullable(v.healthInfo),
      vaccination_status: toNullable(v.vaccinationStatus),
      ready_date: toNullable(v.readyDate),
      expected_adult_weight: toNullable(v.expectedAdultWeight),
      mother_id: toNullable(v.motherId),
      father_id: toNullable(v.fatherId),
      main_image_url: v.images[0] ?? null,
      seo_title: toNullable(v.seoTitle),
      seo_description: toNullable(v.seoDescription),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Failed to update puppy:", error);
    return { success: false, error: "Something went wrong saving this puppy." };
  }

  // Simplest reliable way to sync images: replace the full set rather than diffing.
  await supabase.from("puppy_images").delete().eq("puppy_id", id);
  await insertImages(id, v.images);

  revalidatePath("/admin/puppies");
  revalidatePath("/puppies");
  revalidatePath("/");
  redirect("/admin/puppies");
}

export async function deletePuppy(id: string): Promise<ActionResult> {
  const supabase = await createClient();

  // Best-effort Storage cleanup - look up image URLs before the row (and its
  // puppy_images via cascade) are deleted, so we know what to remove.
  const { data: images } = await supabase
    .from("puppy_images")
    .select("url")
    .eq("puppy_id", id);

  const { error } = await supabase.from("puppies").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete puppy:", error);
    return { success: false, error: "Something went wrong deleting this puppy." };
  }

  if (images && images.length > 0) {
    const paths = images
      .map((img) => extractStoragePath(img.url))
      .filter((p): p is string => Boolean(p));
    if (paths.length > 0) {
      const { error: storageError } = await supabase.storage.from("images").remove(paths);
      if (storageError) {
        // Non-fatal: the puppy record is already gone, just log for cleanup later.
        console.error("Failed to remove storage files:", storageError);
      }
    }
  }

  revalidatePath("/admin/puppies");
  revalidatePath("/puppies");
  revalidatePath("/");
  return { success: true };
}

function extractStoragePath(publicUrl: string): string | null {
  const marker = "/object/public/images/";
  const index = publicUrl.indexOf(marker);
  if (index === -1) return null;
  return publicUrl.slice(index + marker.length);
}

async function insertImages(puppyId: string, urls: string[]) {
  if (urls.length === 0) return;
  const supabase = await createClient();
  await supabase.from("puppy_images").insert(
    urls.map((url, index) => ({
      puppy_id: puppyId,
      url,
      sort_order: index,
    }))
  );
}