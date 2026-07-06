"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown, Trash2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { deleteFaq, moveFaq } from "@/features/faqs/actions";
import type { FaqRow } from "@/features/faqs/types";

export function AdminFaqList({ faqs }: { faqs: FaqRow[] }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const orderedIds = faqs.map((f) => f.id);

  async function handleMove(id: string, direction: "up" | "down") {
    setPendingId(id);
    const result = await moveFaq(id, direction, orderedIds);
    setPendingId(null);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
  }

  async function handleDelete(id: string, question: string) {
    const confirmed = window.confirm(`Delete "${question}"? This can't be undone.`);
    if (!confirmed) return;

    setPendingId(id);
    const result = await deleteFaq(id);
    setPendingId(null);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
  }

  if (faqs.length === 0) {
    return (
      <div className="mt-8 rounded-[1.5rem] bg-white p-8 text-center text-sm text-(--color-ink-soft)">
        No questions yet. Click "Add question" to create your first one.
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-3">
      {faqs.map((faq, index) => (
        <div key={faq.id} className="flex items-start gap-4 rounded-[1.5rem] bg-white p-4">
          <div className="flex shrink-0 flex-col">
            <button
              type="button"
              onClick={() => handleMove(faq.id, "up")}
              disabled={index === 0 || pendingId !== null}
              aria-label="Move up"
              className="rounded p-1 text-(--color-ink-soft) hover:text-(--color-rose) disabled:opacity-30"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => handleMove(faq.id, "down")}
              disabled={index === faqs.length - 1 || pendingId !== null}
              aria-label="Move down"
              className="rounded p-1 text-(--color-ink-soft) hover:text-(--color-rose) disabled:opacity-30"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1">
            <p className="font-display text-base text-(--color-ink)">{faq.question}</p>
            <p className="mt-1 text-sm text-(--color-ink-soft)">{faq.answer}</p>
          </div>

          <Link
            href={`/admin/faqs/${faq.id}/edit`}
            className={buttonVariants({ variant: "outline", className: "shrink-0 rounded-full" })}
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={() => handleDelete(faq.id, faq.question)}
            disabled={pendingId !== null}
            aria-label={`Delete "${faq.question}"`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-(--color-ink-soft) transition-colors hover:bg-(--color-cream) hover:text-(--color-rose-dark) disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}