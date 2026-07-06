"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slugify";
import { parentFormSchema, type ParentFormValues } from "./schema";

type ActionResult = { success: true } | { success: false; error: string };

async function generateUniqueSlug(name: string): Promise<string> {
  const supabase = await createClient();
  const base = slugify(name);
  let candidate = base;
  let suffix = 1;

  while (true) {
    const { data } = await supabase
      .from("parents")
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

export async function createParent(values: ParentFormValues): Promise<ActionResult> {
  const parsed = parentFormSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Please check the form for errors." };
  }
  const v = parsed.data;

  const supabase = await createClient();
  const slug = await generateUniqueSlug(v.name);

  const { data: parent, error } = await supabase
    .from("parents")
    .insert({
      slug,
      name: v.name,
      gender: v.gender,
      temperament: toNullable(v.temperament),
      health_info: toNullable(v.healthInfo),
      weight_lbs: toNullable(v.weightLbs),
      description: toNullable(v.description),
      main_image_url: v.images[0] ?? null,
    })
    .select("id")
    .single();

  if (error || !parent) {
    console.error("Failed to create parent:", error);
    return { success: false, error: "Something went wrong saving this parent." };
  }

  await insertImages(parent.id, v.images);

  revalidatePath("/admin/parents");
  revalidatePath("/parents");
  revalidatePath("/");
  redirect("/admin/parents");
}

export async function updateParent(
  id: string,
  values: ParentFormValues
): Promise<ActionResult> {
  const parsed = parentFormSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Please check the form for errors." };
  }
  const v = parsed.data;

  const supabase = await createClient();

  const { error } = await supabase
    .from("parents")
    .update({
      name: v.name,
      gender: v.gender,
      temperament: toNullable(v.temperament),
      health_info: toNullable(v.healthInfo),
      weight_lbs: toNullable(v.weightLbs),
      description: toNullable(v.description),
      main_image_url: v.images[0] ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Failed to update parent:", error);
    return { success: false, error: "Something went wrong saving this parent." };
  }

  await supabase.from("parent_images").delete().eq("parent_id", id);
  await insertImages(id, v.images);

  revalidatePath("/admin/parents");
  revalidatePath("/parents");
  revalidatePath("/");
  redirect("/admin/parents");
}

export async function deleteParent(id: string): Promise<ActionResult> {
  const supabase = await createClient();

  const { data: images } = await supabase
    .from("parent_images")
    .select("url")
    .eq("parent_id", id);

  const { error } = await supabase.from("parents").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete parent:", error);
    return { success: false, error: "Something went wrong deleting this parent." };
  }

  if (images && images.length > 0) {
    const paths = images
      .map((img) => extractStoragePath(img.url))
      .filter((p): p is string => Boolean(p));
    if (paths.length > 0) {
      const { error: storageError } = await supabase.storage.from("images").remove(paths);
      if (storageError) {
        console.error("Failed to remove storage files:", storageError);
      }
    }
  }

  revalidatePath("/admin/parents");
  revalidatePath("/parents");
  revalidatePath("/");
  revalidatePath("/puppies"); // puppies referencing this parent lose the link (FK sets null)
  return { success: true };
}

function extractStoragePath(publicUrl: string): string | null {
  const marker = "/object/public/images/";
  const index = publicUrl.indexOf(marker);
  if (index === -1) return null;
  return publicUrl.slice(index + marker.length);
}

async function insertImages(parentId: string, urls: string[]) {
  if (urls.length === 0) return;
  const supabase = await createClient();
  await supabase.from("parent_images").insert(
    urls.map((url, index) => ({
      parent_id: parentId,
      url,
      sort_order: index,
    }))
  );
}