import { createClient } from "@/lib/supabase/server";

async function getCount(table: "puppies" | "parents" | "testimonials" | "inquiries") {
  const supabase = await createClient();
  const { count } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });
  return count ?? 0;
}

export default async function AdminOverviewPage() {
  const [puppies, parents, testimonials, inquiries] = await Promise.all([
    getCount("puppies"),
    getCount("parents"),
    getCount("testimonials"),
    getCount("inquiries"),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl text-(--color-ink)">Overview</h1>
      <p className="mt-1 text-sm text-(--color-ink-soft)">
        A quick look at what's in your site right now.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Puppies" value={puppies} />
        <StatCard label="Parents" value={parents} />
        <StatCard label="Testimonials" value={testimonials} />
        <StatCard label="Inquiries" value={inquiries} />
      </div>

      {puppies === 0 && (
        <p className="mt-8 text-sm text-(--color-ink-soft)">
          You don't have any puppies listed yet &mdash; that management
          screen is coming in the next phase.
        </p>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.5rem] bg-white p-6">
      <p className="font-display text-3xl text-(--color-rose)">{value}</p>
      <p className="mt-1 text-sm text-(--color-ink-soft)">{label}</p>
    </div>
  );
}