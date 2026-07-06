import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about our available Maltipoo puppies. We respond quickly by chat, phone, or email.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Let's talk"
        title="Get in touch"
        subtitle="Have a question about a puppy, or ready to start the process? We'd love to hear from you."
        align="left"
      />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <ContactForm />

        <div className="flex flex-col gap-6">
          <InfoRow icon={Phone} label="Phone" value="(000) 000-0000" />
          <InfoRow icon={Mail} label="Email" value="hello@example.com" />
          <InfoRow icon={MapPin} label="Location" value="By appointment only" />
          <InfoRow
            icon={Clock}
            label="Hours"
            value="Mon-Sat, 9am-6pm — chat with us anytime"
          />
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-[1.5rem] bg-(--color-cream) p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
        <Icon className="h-4 w-4 text-(--color-rose)" aria-hidden="true" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-(--color-ink-soft)">
          {label}
        </p>
        <p className="mt-1 text-sm text-(--color-ink)">{value}</p>
      </div>
    </div>
  );
}