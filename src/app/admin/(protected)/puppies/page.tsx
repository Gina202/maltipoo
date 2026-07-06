import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getAllPuppies } from "@/features/puppies/queries";
import { DeletePuppyButton } from "@/components/admin/DeletePuppyButton";

export default async function AdminPuppiesPage() {
  const puppies = await getAllPuppies();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-(--color-ink)">Puppies</h1>
          <p className="mt-1 text-sm text-(--color-ink-soft)">
            Create, edit, and manage your puppy listings.
          </p>
        </div>
        <Link
          href="/admin/puppies/new"
          className={buttonVariants({ className: "gap-2 rounded-full" })}
        >
          <Plus className="h-4 w-4" />
          Add puppy
        </Link>
      </div>

      {puppies.length === 0 ? (
        <div className="mt-8 rounded-[1.5rem] bg-white p-8 text-center text-sm text-(--color-ink-soft)">
          No puppies yet. Click "Add puppy" to create your first listing.
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-3">
          {puppies.map((puppy) => (
            <div
              key={puppy.id}
              className="flex items-center gap-4 rounded-[1.5rem] bg-white p-4"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-(--color-cream)">
                {puppy.images[0] && (
                  <Image
                    src={puppy.images[0]}
                    alt={puppy.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                )}
              </div>

              <div className="flex-1">
                <p className="font-display text-base text-(--color-ink)">
                  {puppy.name}
                </p>
                <p className="text-xs text-(--color-ink-soft)">
                  {puppy.gender} &middot; {puppy.age_weeks} weeks &middot; $
                  {puppy.price.toLocaleString()} &middot; {puppy.status}
                </p>
              </div>

              <Link
                href={`/admin/puppies/${puppy.id}/edit`}
                className={buttonVariants({ variant: "outline", className: "rounded-full" })}
              >
                Edit
              </Link>
              <DeletePuppyButton id={puppy.id} name={puppy.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}