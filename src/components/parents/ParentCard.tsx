import Link from "next/link";
import Image from "next/image";

export type ParentCardData = {
  slug: string;
  name: string;
  role: string;
  temperament: string | null;
  imageUrl?: string | null;
  placeholderColor?: string;
};

export function ParentCard({ parent }: { parent: ParentCardData }) {
  return (
    <Link
      href={`/parents/${parent.slug}`}
      className="group flex items-center gap-5 rounded-[1.5rem] bg-white p-5 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-soft-lg)]"
    >
      <div
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full"
        style={!parent.imageUrl ? { background: parent.placeholderColor ?? "var(--color-cream)" } : undefined}
      >
        {parent.imageUrl && (
          <Image src={parent.imageUrl} alt={parent.name} fill className="object-cover" sizes="96px" />
        )}
      </div>
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