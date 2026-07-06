import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ParentCard } from "@/components/parents/ParentCard";
import { PARENTS } from "@/constants/placeholder-data";

export const metadata: Metadata = {
  title: "Parents",
  description:
    "Meet the mother and father behind every Maltipoo puppy we raise.",
};

export default function ParentsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Meet the family"
        title="Our parent dogs"
        subtitle="Temperament and health start here, so we're glad to introduce you."
        align="left"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {PARENTS.map((parent) => (
          <ParentCard
            key={parent.slug}
            parent={{
              slug: parent.slug,
              name: parent.name,
              role: parent.role,
              temperament: parent.temperament,
              placeholderColor: parent.placeholderColor,
            }}
          />
        ))}
      </div>
    </div>
  );
}