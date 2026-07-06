import { ParentForm } from "@/components/admin/forms/ParentForm";

export default function NewParentPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-display text-2xl text-(--color-ink)">
        Add a new parent
      </h1>
      <ParentForm />
    </div>
  );
}