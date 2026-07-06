import { SectionHeading } from "@/components/shared/SectionHeading";
import { ParentCard, type ParentCardData } from "@/components/parents/ParentCard";
import { getAllParents } from "@/features/parents/queries";
import type { ParentWithImages } from "@/features/parents/types";

function toParentCard(parent: ParentWithImages): ParentCardData {
  return {
    slug: parent.slug,
    name: parent.name,
    role: parent.gender === "male" ? "Father" : "Mother",
    temperament: parent.temperament,
    imageUrl: parent.images[0] ?? null,
  };
}

export async function MeetParents() {
  const parents = await getAllParents();

  if (parents.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Meet the family"
        title="The parents behind every puppy"
        subtitle="Temperament and health start here, so we're glad to introduce you."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {parents.slice(0, 2).map((parent) => (
          <ParentCard key={parent.slug} parent={toParentCard(parent)} />
        ))}
      </div>
    </section>
  );
}