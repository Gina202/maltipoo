import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getAllParents } from "@/features/parents/queries";
import { DeleteParentButton } from "@/components/admin/DeleteParentButton";

export default async function AdminParentsPage() {
  const parents = await getAllParents();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-(--color-ink)">Parents</h1>
          <p className="mt-1 text-sm text-(--color-ink-soft)">
            Manage the mother and father profiles shown across the site.
          </p>
        </div>
        <Link
          href="/admin/parents/new"
          className={buttonVariants({ className: "gap-2 rounded-full" })}
        >
          <Plus className="h-4 w-4" />
          Add parent
        </Link>
      </div>

      {parents.length === 0 ? (
        <div className="mt-8 rounded-[1.5rem] bg-white p-8 text-center text-sm text-(--color-ink-soft)">
          No parents yet. Click "Add parent" to create your first profile.
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-3">
          {parents.map((parent) => (
            <div
              key={parent.id}
              className="flex items-center gap-4 rounded-[1.5rem] bg-white p-4"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-(--color-cream)">
                {parent.images[0] && (
                  <Image
                    src={parent.images[0]}
                    alt={parent.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                )}
              </div>

              <div className="flex-1">
                <p className="font-display text-base text-(--color-ink)">
                  {parent.name}
                </p>
                <p className="text-xs text-(--color-ink-soft)">
                  {parent.gender === "female" ? "Mother" : "Father"}
                  {parent.weight_lbs ? ` \u00b7 ${parent.weight_lbs} lbs` : ""}
                </p>
              </div>

              <Link
                href={`/admin/parents/${parent.id}/edit`}
                className={buttonVariants({ variant: "outline", className: "rounded-full" })}
              >
                Edit
              </Link>
              <DeleteParentButton id={parent.id} name={parent.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}