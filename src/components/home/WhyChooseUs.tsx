import { Home, HeartPulse, Users, MessageCircle, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { WHY_CHOOSE_US } from "@/constants/placeholder-data";

const ICONS: Record<string, LucideIcon> = {
  Home,
  HeartPulse,
  Users,
  MessageCircle,
};

export function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Why families choose us"
        title="A puppy raised the right way"
        subtitle="From the day they're born, every puppy is part of our daily life, not a listing in a warehouse."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {WHY_CHOOSE_US.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <div
              key={item.title}
              className="rounded-[1.5rem] bg-(--color-cream) p-7 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white">
                <Icon className="h-5 w-5 text-(--color-rose)" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg text-(--color-ink)">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-(--color-ink-soft)">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}