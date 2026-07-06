import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PuppyCard } from "@/components/puppies/PuppyCard";
import { buttonVariants } from "@/components/ui/button";
import { getAvailablePuppies } from "@/features/puppies/queries";

export async function FeaturedPuppies() {
  const puppies = await getAvailablePuppies(3);

  if (puppies.length === 0) return null;

  return (
    <section className="bg-(--color-cream) px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Available now"
          title="Our current puppies"
          subtitle="Each one is health-checked, vaccinated, and ready to meet their new family."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {puppies.map((puppy) => (
            <PuppyCard key={puppy.slug} puppy={puppy} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/puppies"
            className={buttonVariants({ variant: "outline", className: "rounded-full px-7" })}
          >
            View all puppies
          </Link>
        </div>
      </div>
    </section>
  );
}