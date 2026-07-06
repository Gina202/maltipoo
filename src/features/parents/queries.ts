import { createClient } from "@/lib/supabase/server";
import type { ParentRow, ParentWithImages } from "./types";

export async function getAllParents(): Promise<ParentWithImages[]> {
  const supabase = await createClient();

  const { data: parents, error } = await supabase
    .from("parents")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !parents) return [];

  const { data: images } = await supabase
    .from("parent_images")
    .select("*")
    .order("sort_order", { ascending: true });

  return parents.map((parent) => ({
    ...parent,
    images: (images || [])
      .filter((img) => img.parent_id === parent.id)
      .map((img) => img.url),
  }));
}

export async function getParentBySlug(
  slug: string
): Promise<ParentWithImages | null> {
  const supabase = await createClient();

  const { data: parent, error } = await supabase
    .from("parents")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !parent) return null;

  return hydrateParent(parent);
}

export async function getParentById(
  id: string
): Promise<ParentWithImages | null> {
  const supabase = await createClient();

  const { data: parent, error } = await supabase
    .from("parents")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !parent) return null;

  return hydrateParent(parent);
}

async function hydrateParent(parent: ParentRow): Promise<ParentWithImages> {
  const supabase = await createClient();

  const { data: images } = await supabase
    .from("parent_images")
    .select("*")
    .eq("parent_id", parent.id)
    .order("sort_order", { ascending: true });

  return {
    ...parent,
    images: (images || []).map((img) => img.url),
  };
}