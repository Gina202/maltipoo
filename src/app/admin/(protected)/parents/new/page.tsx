import { PuppyForm } from "@/components/admin/forms/PuppyForm";
import { getAllParents } from "@/features/parents/queries";

export default async function NewPuppyPage() {
  const parents = await getAllParents();

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-display text-2xl text-(--color-ink)">
        Add a new parent
      </h1>
      <PuppyForm parents={parents} />
    </div>
  );
}