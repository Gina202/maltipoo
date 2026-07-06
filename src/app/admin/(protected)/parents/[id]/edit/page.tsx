import { notFound } from "next/navigation";
import { ParentForm } from "@/components/admin/forms/ParentForm";
import { getParentById } from "@/features/parents/queries";
import type { ParentFormValues } from "@/features/parents/schema";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditParentPage({ params }: Props) {
  const { id } = await params;
  const parent = await getParentById(id);

  if (!parent) notFound();

  const defaultValues: Partial<ParentFormValues> = {
    name: parent.name,
    gender: (parent.gender as "male" | "female") ?? "female",
    temperament: parent.temperament ?? "",
    healthInfo: parent.health_info ?? "",
    weightLbs: parent.weight_lbs ?? undefined,
    description: parent.description ?? "",
    images: parent.images,
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-display text-2xl text-(--color-ink)">
        Edit {parent.name}
      </h1>
      <ParentForm parentId={parent.id} defaultValues={defaultValues} />
    </div>
  );
}