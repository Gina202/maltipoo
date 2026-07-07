import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PuppyCarousel } from "@/components/puppies/PuppyCarousel";
import { PuppyCard } from "@/components/puppies/PuppyCard";
import { getParentBySlug } from "@/features/parents/queries";
import { getAllPuppies } from "@/features/puppies/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parent = await getParentBySlug(slug);
  if (!parent) return {};

  const roleLabel = parent.gender === "male" ? "Father" : "Mother";
  const title = `${parent.name} - ${roleLabel}`;
  const description =
    parent.description ||
    parent.temperament ||
    `Meet ${parent.name}, one of the parent dogs behind our Maltipoo puppies.`;

  return {
    title,
    description,
    alternates: { canonical: `/parents/${parent.slug}` },
    openGraph: {
      title,
      description,
      images: parent.images[0] ? [{ url: parent.images[0] }] : undefined,
    },
  };
}

export default async function ParentDetailPage({ params }: Props) {
  const { slug } = await params;
  const parent = await getParentBySlug(slug);

  if (!parent) notFound();

  const roleLabel = parent.gender === "male" ? "Father" : "Mother";

  const allPuppies = await getAllPuppies();
  const theirPuppies = allPuppies.filter(
    (p) => p.mother_id === parent.id || p.father_id === parent.id
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <PuppyCarousel images={parent.images} alt={parent.name} />

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-(--color-rose)">
            {roleLabel}
          </p>
          <h1 className="mt-1 font-display text-3xl text-(--color-ink) sm:text-4xl">
            {parent.name}
          </h1>

          {parent.description && (
            <p className="mt-6 text-base leading-relaxed text-(--color-ink-soft)">
              {parent.description}
            </p>
          )}

          <dl className="mt-8 grid grid-cols-2 gap-4 rounded-[1.5rem] bg-(--color-cream) p-6">
            {parent.temperament && (
              <div className="col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wide text-(--color-ink-soft)">
                  Temperament
                </dt>
                <dd className="mt-1 text-sm text-(--color-ink)">{parent.temperament}</dd>
              </div>
            )}
            {parent.weight_lbs && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-(--color-ink-soft)">
                  Weight
                </dt>
                <dd className="mt-1 text-sm text-(--color-ink)">{parent.weight_lbs} lbs</dd>
              </div>
            )}
            {parent.health_info && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-(--color-ink-soft)">
                  Health
                </dt>
                <dd className="mt-1 text-sm text-(--color-ink)">{parent.health_info}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {theirPuppies.length > 0 && (
        <div className="mt-20">
          <h2 className="font-display text-2xl text-(--color-ink)">
            {parent.name}'s puppies
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {theirPuppies.map((puppy) => (
              <PuppyCard key={puppy.id} puppy={puppy} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}