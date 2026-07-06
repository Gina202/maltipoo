import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getParentBySlug } from "@/features/parents/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parent = await getParentBySlug(slug);

  if (!parent) return {};

  return {
    title: parent.name,
    description: parent.temperament ?? parent.breed ?? "Meet this parent dog.",
  };
}

export default async function ParentDetailPage({ params }: Props) {
  const { slug } = await params;
  const parent = await getParentBySlug(slug);

  if (!parent) notFound();

  const role =
    parent.gender === "male" ? "Father" : parent.gender === "female" ? "Mother" : "Parent";
  const imageUrl = parent.images[0] ?? parent.main_image_url;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <Link
        href="/parents"
        className="text-sm font-semibold uppercase tracking-[0.2em] text-(--color-rose) transition-opacity hover:opacity-80"
      >
        ← Back to parents
      </Link>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_1.05fr]">
        <div className="rounded-[2rem] bg-(--color-cream) p-4 sm:p-6">
          {imageUrl ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
              <Image
                src={imageUrl}
                alt={parent.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ) : (
            <div className="flex aspect-[4/5] items-center justify-center rounded-[1.5rem] bg-white/70 px-6 text-center text-sm text-(--color-ink-soft)">
              No photo has been added for this parent yet.
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--color-rose)">
            {role}
          </p>
          <h1 className="mt-2 font-display text-3xl text-(--color-ink) sm:text-4xl">
            {parent.name}
          </h1>

          <p className="mt-5 text-base leading-relaxed text-(--color-ink-soft)">
            {parent.description ?? "A wonderful member of our Maltipoo family."}
          </p>

          <dl className="mt-8 grid gap-4 rounded-[1.5rem] bg-white p-6 shadow-[var(--shadow-soft)]">
            <Fact label="Breed" value={parent.breed} />
            <Fact
              label="Gender"
              value={parent.gender === "female" ? "Female" : parent.gender === "male" ? "Male" : null}
            />
            <Fact label="Temperament" value={parent.temperament} />
            <Fact
              label="Weight"
              value={parent.weight_lbs ? `${parent.weight_lbs} lbs` : null}
            />
            <Fact label="Health info" value={parent.health_info} />
          </dl>
        </div>
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;

  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-ink-soft)">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-(--color-ink)">{value}</dd>
    </div>
  );
}
