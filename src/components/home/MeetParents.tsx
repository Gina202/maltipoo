import { SectionHeading } from "@/components/shared/SectionHeading";
import { ParentCard } from "@/components/parents/ParentCard";
import { PARENTS } from "@/constants/placeholder-data";

export function MeetParents() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Meet the family"
        title="The parents behind every puppy"
        subtitle="Temperament and health start here, so we're glad to introduce you."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {PARENTS.map((parent) => (
          <ParentCard key={parent.slug} parent={parent} />
        ))}
      </div>
    </section>
  );
}