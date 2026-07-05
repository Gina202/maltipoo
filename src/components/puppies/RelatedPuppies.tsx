import { PuppyCard } from "@/components/puppies/PuppyCard";
import type { PlaceholderPuppy } from "@/constants/placeholder-data";

export function RelatedPuppies({
  puppies,
}: {
  puppies: PlaceholderPuppy[];
}) {
  if (puppies.length === 0) return null;

  return (
    <div className="mt-20">
      <h2 className="font-display text-2xl text-(--color-ink)">
        Other puppies you might love
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {puppies.map((puppy) => (
          <PuppyCard key={puppy.slug} puppy={puppy} />
        ))}
      </div>
    </div>
  );
}