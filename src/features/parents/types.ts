import type { Database } from "@/types/database.types";

export type ParentRow = Database["public"]["Tables"]["parents"]["Row"];

export type ParentWithImages = ParentRow & {
  images: string[];
};