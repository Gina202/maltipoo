import { notFound } from "next/navigation";
import { PuppyForm } from "@/components/admin/forms/PuppyForm";
import { getPuppyById, getAllParents } from "@/features/puppies/queries";
import type { PuppyFormValues } from "@/features/puppies/schema";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPuppyPage({ params }: Props) {
  const { id } = await params;
  const [puppy, parents] = await Promise.all([getPuppyById(id), getAllParents()]);

  if (!puppy) notFound();

  const defaultValues: Partial<PuppyFormValues> = {
    name: puppy.name,
    price: puppy.price,
    ageWeeks: puppy.age_weeks ?? 0,
    gender: puppy.gender as "male" | "female",
    status: puppy.status as "available" | "reserved" | "sold",
    description: puppy.description ?? "",
    personality: puppy.personality ?? "",
    healthInfo: puppy.health_info ?? "",
    vaccinationStatus: puppy.vaccination_status ?? "",
    readyDate: puppy.ready_date ?? "",
    expectedAdultWeight: puppy.expected_adult_weight ?? undefined,
    motherId: puppy.mother_id ?? "",
    fatherId: puppy.father_id ?? "",
    seoTitle: puppy.seo_title ?? "",
    seoDescription: puppy.seo_description ?? "",
    images: puppy.images,
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-display text-2xl text-(--color-ink)">
        Edit {puppy.name}
      </h1>
      <PuppyForm parents={parents} puppyId={puppy.id} defaultValues={defaultValues} />
    </div>
  );
}