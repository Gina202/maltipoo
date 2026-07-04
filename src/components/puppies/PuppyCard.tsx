import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { PlaceholderPuppy } from "@/constants/placeholder-data";

const STATUS_LABEL: Record<PlaceholderPuppy["status"], string> = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold",
};

export function PuppyCard({ puppy }: { puppy: PlaceholderPuppy }) {
  return (
    <Link
      href={`/puppies/${puppy.slug}`}
      className="group block overflow-hidden rounded-[1.5rem] bg-white shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-soft-lg)]"
    >
      {/* TODO: replace with next/image once real puppy photos are uploaded */}
      <div
        className="aspect-square w-full"
        style={{ background: puppy.placeholderColor }}
        aria-hidden="true"
      />
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
            {STATUS_LABEL[puppy.status]}
          </Badge>
        </div>
        <p className="text-sm text-(--color-ink-soft)">
          {puppy.gender === "female" ? "Female" : "Male"} &middot;{" "}
          {puppy.ageWeeks} weeks
        </p>
        <p className="mt-3 font-display text-xl text-(--color-rose)">
          ${puppy.price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}