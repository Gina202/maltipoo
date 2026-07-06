import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { PuppyCTAButtons } from "@/components/puppies/PuppyCTAButtons";
import { PuppyCarousel } from "@/components/puppies/PuppyCarousel";
import { ParentCard, type ParentCardData } from "@/components/parents/ParentCard";
import { RelatedPuppies } from "@/components/puppies/RelatedPuppies";
import { getPuppyBySlug, getAllPuppies } from "@/features/puppies/queries";
import { createStaticClient } from "@/lib/supabase/static";
import type { ParentRow } from "@/features/puppies/types";

const STATUS_LABEL: Record<string, string> = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold",
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const supabase = createStaticClient();
  const { data } = await supabase.from("puppies").select("slug");
  return (data ?? []).map((puppy) => ({ slug: puppy.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const puppy = await getPuppyBySlug(slug);
  if (!puppy) return {};

  return {
    title: puppy.seo_title || puppy.name,
    description: puppy.seo_description || puppy.personality || undefined,
  };
}

function toParentCard(parent: ParentRow, role: "Mother" | "Father"): ParentCardData {
  return {
    slug: parent.slug,
    name: parent.name,
    role,
    temperament: parent.temperament,
    imageUrl: parent.main_image_url,
  };
}

export default async function PuppyDetailPage({ params }: Props) {
  const { slug } = await params;
  const puppy = await getPuppyBySlug(slug);

  if (!puppy) notFound();

  const allPuppies = await getAllPuppies();
  const related = allPuppies
    .filter((p) => p.slug !== puppy.slug && p.gender === puppy.gender)
    .slice(0, 3);

  const isAvailable = puppy.status === "available";

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Carousel */}
        <PuppyCarousel images={puppy.images} alt={puppy.name} />

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
              {STATUS_LABEL[puppy.status ?? "available"]}
            </Badge>
          </div>

          <p className="mt-2 text-sm text-(--color-ink-soft)">
            {puppy.gender === "female" ? "Female" : "Male"} &middot;{" "}
            {puppy.age_weeks} weeks old
          </p>

          <p className="mt-5 font-display text-3xl text-(--color-rose)">
            ${puppy.price.toLocaleString()}
          </p>

          {puppy.personality && (
            <p className="mt-6 text-base leading-relaxed text-(--color-ink-soft)">
              {puppy.personality}
            </p>
          )}

          {/* Quick facts */}
          <dl className="mt-8 grid grid-cols-2 gap-4 rounded-[1.5rem] bg-(--color-cream) p-6">
            <Fact label="Ready date" value={puppy.ready_date} />
            <Fact
              label="Expected adult weight"
              value={puppy.expected_adult_weight ? `${puppy.expected_adult_weight} lbs` : null}
            />
            <Fact label="Vaccinations" value={puppy.vaccination_status} />
            <Fact label="Health" value={puppy.health_info} />
          </dl>

          <PuppyCTAButtons
            slug={puppy.slug}
            status={(puppy.status ?? "available") as "available" | "reserved" | "sold"}
          />
        </div>
      </div>

      {/* Parents */}
      {(puppy.mother || puppy.father) && (
        <div className="mt-20">
          <h2 className="font-display text-2xl text-(--color-ink)">
            Meet {puppy.name}'s parents
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {puppy.mother && <ParentCard parent={toParentCard(puppy.mother, "Mother")} />}
            {puppy.father && <ParentCard parent={toParentCard(puppy.father, "Father")} />}
          </div>
        </div>
      )}

      <RelatedPuppies puppies={related} />
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-(--color-ink-soft)">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-(--color-ink)">{value}</dd>
    </div>
  );
}