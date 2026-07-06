"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { settingsFormSchema, type SettingsFormValues } from "./schema";

type ActionResult = { success: true } | { success: false; error: string };

function toNullable(value: string | undefined | "") {
  return value === "" || value === undefined ? null : value;
}

export async function updateSiteSettings(values: SettingsFormValues): Promise<ActionResult> {
  const parsed = settingsFormSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Please check the form for errors." };
  }
  const v = parsed.data;

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .update({
      phone: toNullable(v.phone),
      email: toNullable(v.email),
      address: toNullable(v.address),
      business_hours: toNullable(v.businessHours),
    })
    .eq("id", 1);

  if (error) {
    console.error("Failed to update settings:", error);
    return { success: false, error: "Something went wrong saving your settings." };
  }

  revalidatePath("/admin/settings");
  revalidatePath("/contact");
  revalidatePath("/", "layout"); // footer shows on every page
  return { success: true };
}