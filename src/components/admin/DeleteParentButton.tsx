"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteParent } from "@/features/parents/actions";

export function DeleteParentButton({ id, name }: { id: string; name: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete ${name}? Any puppies linking to them as a parent will simply lose that link. This can't be undone.`
    );
    if (!confirmed) return;

    setIsDeleting(true);
    const result = await deleteParent(id);
    setIsDeleting(false);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      aria-label={`Delete ${name}`}
      className="flex h-9 w-9 items-center justify-center rounded-full text-(--color-ink-soft) transition-colors hover:bg-(--color-cream) hover:text-(--color-rose-dark) disabled:opacity-50"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}