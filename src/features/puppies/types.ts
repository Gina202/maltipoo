import type { Database } from "@/types/database.types";

export type PuppyRow = Database["public"]["Tables"]["puppies"]["Row"];
export type ParentRow = Database["public"]["Tables"]["parents"]["Row"];

export type PuppyWithImages = PuppyRow & {
  images: string[];
};

export type PuppyWithParents = PuppyWithImages & {
  mother: ParentRow | null;
  father: ParentRow | null;
};