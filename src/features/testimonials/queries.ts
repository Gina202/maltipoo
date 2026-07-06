import { createClient } from "@/lib/supabase/server";
import type { TestimonialRow } from "./types";

export async function getAllTestimonials(): Promise<TestimonialRow[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });
  return data || [];
}

export async function getTestimonialById(id: string): Promise<TestimonialRow | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("testimonials").select("*").eq("id", id).single();
  return data ?? null;
}