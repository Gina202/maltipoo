import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ParentCard, type ParentCardData } from "@/components/parents/ParentCard";
import { getAllParents } from "@/features/parents/queries";
import type { ParentWithImages } from "@/features/parents/types";

export const metadata: Metadata = {
  title: "Parents",
  description:
    "Meet the mother and father behind every Maltipoo puppy we raise.",
};

function toParentCard(parent: ParentWithImages): ParentCardData {
  return {
    slug: parent.slug,
    name: parent.name,
    role: parent.gender === "male" ? "Father" : "Mother",
    temperament: parent.temperament,
    imageUrl: parent.images[0] ?? null,
  };
}

export default async function ParentsPage() {
  const parents = await getAllParents();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Meet the family"
        title="Our parent dogs"
        subtitle="Temperament and health start here, so we're glad to introduce you."
        align="left"
      />
      {parents.length === 0 ? (
        <p className="py-16 text-center text-sm text-(--color-ink-soft)">
          We're setting up profiles for our parent dogs &mdash; check back
          soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {parents.map((parent) => (
            <ParentCard key={parent.slug} parent={toParentCard(parent)} />
          ))}
        </div>
      )}
    </div>
  );
}