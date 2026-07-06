import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

/**
 * For build-time contexts (e.g. generateStaticParams) that run outside any
 * HTTP request, so next/headers' cookies() isn't available. Uses the public
 * anon key only - fine here because it's only ever used to read data that's
 * covered by a public-read RLS policy (never for admin/auth operations).
 */
export function createStaticClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}