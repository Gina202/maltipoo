import { createClient } from "@/lib/supabase/server";
import type { FaqRow } from "./types";

export async function getAllFaqs(): Promise<FaqRow[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("faqs")
    .select("*")
    .order("sort_order", { ascending: true });
  return data || [];
}

export async function getFaqById(id: string): Promise<FaqRow | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("faqs").select("*").eq("id", id).single();
  return data ?? null;
}