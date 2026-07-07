import { z } from "zod";
import type { Database } from "@/types/database.types";

export type SiteSettingsRow = Database["public"]["Tables"]["site_settings"]["Row"];

export const settingsFormSchema = z.object({
  phone: z.string().trim().optional(),
  email: z.string().trim().email("Enter a valid email").optional().or(z.literal("")),
  address: z.string().trim().optional(),
  businessHours: z.string().trim().optional(),
  smartsuppKey: z.string().trim().optional(),
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;