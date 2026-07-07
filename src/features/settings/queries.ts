import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { SiteSettingsRow } from "./schema";

export const getSiteSettings = cache(async (): Promise<SiteSettingsRow | null> => {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  return data ?? null;
});