"use client";

import { useMemo, useState } from "react";
import { PuppyCard } from "@/components/puppies/PuppyCard";
import type { PuppyWithImages } from "@/features/puppies/types";

type SexFilter = "all" | "male" | "female";
type StatusFilter = "all" | "available" | "reserved" | "sold";

const SEX_OPTIONS: { value: SexFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
];

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "available", label: "Available" },
  { value: "reserved", label: "Reserved" },
  { value: "sold", label: "Sold" },
];

export function PuppyBrowser({ puppies }: { puppies: PuppyWithImages[] }) {
  const [sex, setSex] = useState<SexFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");

  const filtered = useMemo(() => {
    return puppies.filter((puppy) => {
      if (sex !== "all" && puppy.gender !== sex) return false;
      if (status !== "all" && puppy.status !== status) return false;
      return true;
    });
  }, [puppies, sex, status]);

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center justify-center gap-6 sm:justify-start">
        <FilterGroup label="Sex" options={SEX_OPTIONS} value={sex} onChange={setSex} />
        <FilterGroup
          label="Availability"
          options={STATUS_OPTIONS}
          value={status}
          onChange={setStatus}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-(--color-ink-soft)">
          No puppies match those filters right now. Try a different
          combination, or check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((puppy) => (
            <PuppyCard key={puppy.slug} puppy={puppy} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-(--color-ink-soft)">
        {label}
      </span>
      <div className="flex gap-1 rounded-full bg-(--color-cream) p-1">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              value === option.value
                ? "bg-(--color-rose) text-white"
                : "text-(--color-ink-soft) hover:text-(--color-ink)"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}