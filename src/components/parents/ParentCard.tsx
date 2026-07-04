import Link from "next/link";
import type { PlaceholderParent } from "@/constants/placeholder-data";

export function ParentCard({ parent }: { parent: PlaceholderParent }) {
  return (
    <Link
      href={`/parents/${parent.slug}`}
      className="group flex items-center gap-5 rounded-[1.5rem] bg-white p-5 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-soft-lg)]"
    >
      {/* TODO: replace with next/image once real parent photos are uploaded */}
      <div
        className="h-24 w-24 shrink-0 rounded-full"
        style={{ background: parent.placeholderColor }}
        aria-hidden="true"
      />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-(--color-rose)">
          {parent.role}
        </p>
        <h3 className="font-display text-lg text-(--color-ink)">
          {parent.name}
        </h3>
        <p className="mt-1 text-sm text-(--color-ink-soft)">
          {parent.temperament}
        </p>
      </div>
    </Link>
  );
}