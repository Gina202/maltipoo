import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PuppyBrowser } from "@/components/puppies/PuppyBrowser";
import { getAllPuppies } from "@/features/puppies/queries";

export const metadata: Metadata = {
  title: "Available Puppies",
  description:
    "Browse our current litter of health-checked, vaccinated Maltipoo puppies ready for their new families.",
};

export default async function PuppiesPage() {
  const puppies = await getAllPuppies();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Our litter"
        title="Available puppies"
        subtitle="Every puppy here is health-checked, vaccinated, and raised in our home."
        align="left"
      />
      {puppies.length === 0 ? (
        <p className="py-16 text-center text-sm text-(--color-ink-soft)">
          We don't have any puppies listed right now &mdash; check back soon,
          or get in touch to hear about upcoming litters.
        </p>
      ) : (
        <PuppyBrowser puppies={puppies} />
      )}
    </div>
  );
}