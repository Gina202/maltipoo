type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignClass} mb-12`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-(--color-rose)">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl text-(--color-ink) sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-(--color-ink-soft)">
          {subtitle}
        </p>
      )}
    </div>
  );
}