import { createClient } from "@/lib/supabase/server";

export default async function AdminInquiriesPage() {
  const supabase = await createClient();
  const { data: inquiries } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl text-(--color-ink)">Inquiries</h1>
      <p className="mt-1 text-sm text-(--color-ink-soft)">
        Messages submitted through your contact form.
      </p>

      {!inquiries || inquiries.length === 0 ? (
        <p className="mt-8 text-sm text-(--color-ink-soft)">
          No inquiries yet. New contact form submissions will show up here.
        </p>
      ) : (
        <div className="mt-8 flex flex-col gap-4">
          {inquiries.map((inquiry) => (
            <div key={inquiry.id} className="rounded-[1.5rem] bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-display text-lg text-(--color-ink)">
                  {inquiry.name}
                </p>
                <p className="text-xs text-(--color-ink-soft)">
                  {new Date(inquiry.created_at ?? "").toLocaleString()}
                </p>
              </div>
              <p className="mt-1 text-sm text-(--color-ink-soft)">
                {inquiry.email}
                {inquiry.phone ? ` \u00b7 ${inquiry.phone}` : ""}
                {inquiry.puppy_slug ? ` \u00b7 Re: ${inquiry.puppy_slug}` : ""}
              </p>
              <p className="mt-3 text-sm text-(--color-ink)">
                {inquiry.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}