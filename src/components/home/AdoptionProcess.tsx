import { SectionHeading } from "@/components/shared/SectionHeading";
import { ADOPTION_STEPS } from "@/constants/placeholder-data";

export function AdoptionProcess() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading
        eyebrow="How it works"
        title="Bringing your puppy home"
        subtitle="A simple, honest process from first hello to first night home."
      />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {ADOPTION_STEPS.map((step) => (
          <div key={step.number}>
            <p className="font-display text-3xl text-(--color-blush)">
              {step.number}
            </p>
            <h3 className="mt-2 font-display text-lg text-(--color-ink)">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-(--color-ink-soft)">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}