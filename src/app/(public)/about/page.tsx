import type { Metadata } from "next";
import Image from "next/image";
import aboutImage from "../../../../images/about.jpg";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScallopDivider } from "@/components/shared/ScallopDivider";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about our home, our mission, and how we raise every Maltipoo puppy with care.",
};

export default function AboutPage() {
  return (
    <div>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-16 sm:py-20 md:flex-row">
        <div className="flex-1">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-(--color-rose)">
            Our story
          </p>
          <h1 className="font-display text-4xl italic text-(--color-ink) sm:text-5xl">
            A home first, a breeder second
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-(--color-ink-soft)">
            We started raising Maltipoos because we wanted a puppy that grew
            up the way we'd want ours to: underfoot, loved, and gently
            introduced to the noise and chaos of real family life. Every
            litter since has been raised the same way, in our living room,
            not a back building.
          </p>
        </div>
        <div className="relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-[2rem]">
          <Image
            src={aboutImage}
            alt="The family home where the Maltipoos are raised"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <ScallopDivider color="var(--color-cream)" />

      <div className="bg-(--color-cream) px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="What guides us" title="Our values" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <ValueCard
              title="Honesty over sales"
              description="We'd rather tell you a puppy isn't the right fit than make a sale that doesn't work out."
            />
            <ValueCard
              title="Health first"
              description="Every parent and puppy is vet-checked. Nothing about their health is left to guesswork."
            />
            <ValueCard
              title="A real home"
              description="No kennels, no cages. Our puppies grow up surrounded by people, noise, and love."
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <SectionHeading
          eyebrow="A day in the life"
          title="Daily care, from morning to night"
          subtitle="Feeding schedules, gentle handling, early crate introduction, and playtime with our own dogs and kids, every single day."
        />
      </div>
    </div>
  );
}

function ValueCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[1.5rem] bg-white p-7">
      <h3 className="font-display text-lg text-(--color-ink)">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-(--color-ink-soft)">
        {description}
      </p>
    </div>
  );
}