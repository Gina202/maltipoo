import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { PuppyCTAButtons } from "@/components/puppies/PuppyCTAButtons";
import { PuppyCarousel } from "@/components/puppies/PuppyCarousel";
import { ParentCard } from "@/components/parents/ParentCard";
import { RelatedPuppies } from "@/components/puppies/RelatedPuppies";
import { ALL_PUPPIES, PARENTS } from "@/constants/placeholder-data";

const STATUS_LABEL = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold",
} as const;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return ALL_PUPPIES.map((puppy) => ({ slug: puppy.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const puppy = ALL_PUPPIES.find((p) => p.slug === slug);
  if (!puppy) return {};

  return {
    title: puppy.name,
    description: puppy.personality,
  };
}

export default async function PuppyDetailPage({ params }: Props) {
  const { slug } = await params;
  const puppy = ALL_PUPPIES.find((p) => p.slug === slug);

  if (!puppy) notFound();

  const mother = PARENTS.find((p) => p.slug === puppy.motherSlug);
  const father = PARENTS.find((p) => p.slug === puppy.fatherSlug);

  const related = ALL_PUPPIES.filter(
    (p) => p.slug !== puppy.slug && p.gender === puppy.gender
  ).slice(0, 3);

  const isAvailable = puppy.status === "available";

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Carousel */}
        <PuppyCarousel images={puppy.galleryColors} alt={puppy.name} />

        {/* Info */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-3xl text-(--color-ink) sm:text-4xl">
              {puppy.name}
            </h1>
            <Badge
              variant="secondary"
              className={
                isAvailable
                  ? "bg-(--color-sage) text-(--color-ink)"
                  : "bg-(--color-cream) text-(--color-ink-soft)"
              }
            >
              {STATUS_LABEL[puppy.status]}
            </Badge>
          </div>

          <p className="mt-2 text-sm text-(--color-ink-soft)">
            {puppy.gender === "female" ? "Female" : "Male"} &middot;{" "}
            {puppy.ageWeeks} weeks old
          </p>

          <p className="mt-5 font-display text-3xl text-(--color-rose)">
            ${puppy.price.toLocaleString()}
          </p>

          <p className="mt-6 text-base leading-relaxed text-(--color-ink-soft)">
            {puppy.personality}
          </p>

          {/* Quick facts */}
          <dl className="mt-8 grid grid-cols-2 gap-4 rounded-[1.5rem] bg-(--color-cream) p-6">
            <Fact label="Ready date" value={puppy.readyDate} />
            <Fact
              label="Expected adult weight"
              value={`${puppy.expectedAdultWeightLbs} lbs`}
            />
            <Fact label="Vaccinations" value={puppy.vaccinationStatus} />
            <Fact label="Health" value={puppy.healthInfo} />
          </dl>

          <PuppyCTAButtons slug={puppy.slug} status={puppy.status} />
        </div>
      </div>

      {/* Parents */}
      {(mother || father) && (
        <div className="mt-20">
          <h2 className="font-display text-2xl text-(--color-ink)">
            Meet {puppy.name}'s parents
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {mother && <ParentCard parent={mother} />}
            {father && <ParentCard parent={father} />}
          </div>
        </div>
      )}

      <RelatedPuppies puppies={related} />
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-(--color-ink-soft)">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-(--color-ink)">{value}</dd>
    </div>
  );
}