import Link from "next/link";
import Image from "next/image";
import { Dog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { PuppyWithImages } from "@/features/puppies/types";

const STATUS_LABEL: Record<string, string> = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold",
};

export function PuppyCard({ puppy }: { puppy: PuppyWithImages }) {
  const coverImage = puppy.images[0];

  return (
    <Link
      href={`/puppies/${puppy.slug}`}
      className="group block overflow-hidden rounded-[1.5rem] bg-white shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-soft-lg)]"
    >
      <div className="relative aspect-square w-full bg-(--color-cream)">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={puppy.name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            loading="eager"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Dog className="h-8 w-8 text-(--color-ink-soft)" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-display text-lg text-(--color-ink)">
            {puppy.name}
          </h3>
          <Badge
            variant="secondary"
            className={
              puppy.status === "available"
                ? "bg-(--color-sage) text-(--color-ink)"
                : "bg-(--color-cream) text-(--color-ink-soft)"
            }
          >
            {STATUS_LABEL[puppy.status ?? "available"]}
          </Badge>
        </div>
        <p className="text-sm text-(--color-ink-soft)">
          {puppy.gender === "female" ? "Female" : "Male"} &middot;{" "}
          {puppy.age_weeks} weeks
        </p>
        <p className="mt-3 font-display text-xl text-(--color-rose)">
          ${puppy.price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}