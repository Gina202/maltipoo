import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PuppyBrowser } from "@/components/puppies/PuppyBrowser";
import { ALL_PUPPIES } from "@/constants/placeholder-data";

export const metadata: Metadata = {
  title: "Available Puppies",
  description:
    "Browse our current litter of health-checked, vaccinated Maltipoo puppies ready for their new families.",
};

export default function PuppiesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Our litter"
        title="Available puppies"
        subtitle="Every puppy here is health-checked, vaccinated, and raised in our home."
        align="left"
      />
      <PuppyBrowser puppies={ALL_PUPPIES} />
    </div>
  );
}