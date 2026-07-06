import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getAllFaqs } from "@/features/faqs/queries";
import { AdminFaqList } from "@/components/admin/AdminFaqList";

export default async function AdminFaqsPage() {
  const faqs = await getAllFaqs();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-(--color-ink)">FAQs</h1>
          <p className="mt-1 text-sm text-(--color-ink-soft)">
            Manage the questions shown on your FAQ page and homepage. Use the
            arrows to reorder.
          </p>
        </div>
        <Link
          href="/admin/faqs/new"
          className={buttonVariants({ className: "gap-2 rounded-full" })}
        >
          <Plus className="h-4 w-4" />
          Add question
        </Link>
      </div>

      <AdminFaqList faqs={faqs} />
    </div>
  );
}