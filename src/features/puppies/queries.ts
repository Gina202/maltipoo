import { createClient } from "@/lib/supabase/server";
import type { PuppyRow, PuppyWithImages, PuppyWithParents } from "./types";

export async function getAllPuppies(): Promise<PuppyWithImages[]> {
  const supabase = await createClient();

  const { data: puppies, error } = await supabase
    .from("puppies")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !puppies) return [];

  const { data: images } = await supabase
    .from("puppy_images")
    .select("*")
    .order("sort_order", { ascending: true });

  return puppies.map((puppy) => ({
    ...puppy,
    images: (images || [])
      .filter((img) => img.puppy_id === puppy.id)
      .map((img) => img.url),
  }));
}

export async function getAvailablePuppies(limit?: number): Promise<PuppyWithImages[]> {
  const all = await getAllPuppies();
  const available = all.filter((p) => p.status === "available");
  return limit ? available.slice(0, limit) : available;
}

export async function getPuppyBySlug(
  slug: string
): Promise<PuppyWithParents | null> {
  const supabase = await createClient();

  const { data: puppy, error } = await supabase
    .from("puppies")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !puppy) return null;

  return hydratePuppy(puppy);
}

export async function getPuppyById(
  id: string
): Promise<PuppyWithParents | null> {
  const supabase = await createClient();

  const { data: puppy, error } = await supabase
    .from("puppies")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !puppy) return null;

  return hydratePuppy(puppy);
}

async function hydratePuppy(puppy: PuppyRow): Promise<PuppyWithParents> {
  const supabase = await createClient();

  const { data: images } = await supabase
    .from("puppy_images")
    .select("*")
    .eq("puppy_id", puppy.id)
    .order("sort_order", { ascending: true });

  const parentIds = [puppy.mother_id, puppy.father_id].filter(Boolean) as string[];

  const { data: parents } = parentIds.length
    ? await supabase.from("parents").select("*").in("id", parentIds)
    : { data: [] as never[] };

  return {
    ...puppy,
    images: (images || []).map((img) => img.url),
    mother: (parents || []).find((p) => p.id === puppy.mother_id) ?? null,
    father: (parents || []).find((p) => p.id === puppy.father_id) ?? null,
  };
}

export async function getAllParents() {
  const supabase = await createClient();
  const { data } = await supabase.from("parents").select("*").order("name");
  return data || [];
}