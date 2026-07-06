"use client";

import { useState, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { puppyFormSchema, type PuppyFormValues, type PuppyFormInput } from "@/features/puppies/schema";
import { createPuppy, updatePuppy } from "@/features/puppies/actions";
import type { ParentRow } from "@/features/puppies/types";

type PuppyFormProps = {
  parents: ParentRow[];
  puppyId?: string;
  defaultValues?: Partial<PuppyFormValues>;
};

export function PuppyForm({ parents, puppyId, defaultValues }: PuppyFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const isEditing = Boolean(puppyId);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PuppyFormInput, unknown, PuppyFormValues>({
    resolver: zodResolver(puppyFormSchema),
    defaultValues: {
      gender: "female",
      status: "available",
      images: [],
      ...defaultValues,
    },
  });

  const images = watch("images") ?? [];

  async function onSubmit(values: PuppyFormValues) {
    setServerError(null);

    const result = isEditing
      ? await updatePuppy(puppyId!, values)
      : await createPuppy(values);

    // Successful create/update redirects server-side, so we only reach
    // here on failure.
    if (result && !result.success) {
      setServerError(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8" noValidate>
      {/* Photos */}
      <Section title="Photos">
        <ImageUploader
          value={images}
          onChange={(urls) => setValue("images", urls, { shouldValidate: true })}
          pathPrefix="puppies"
        />
        {errors.images && (
          <p className="mt-2 text-xs text-(--color-rose-dark)">{errors.images.message}</p>
        )}
      </Section>

      {/* Basics */}
      <Section title="Basics">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Name" error={errors.name?.message}>
            <Input {...register("name")} placeholder="Bella" />
          </Field>
          <Field label="Price ($)" error={errors.price?.message}>
            <Input type="number" step="1" {...register("price")} placeholder="2800" />
          </Field>
          <Field label="Age (weeks)" error={errors.ageWeeks?.message}>
            <Input type="number" {...register("ageWeeks")} placeholder="9" />
          </Field>
          <Field label="Expected adult weight (lbs)" error={errors.expectedAdultWeight?.message}>
            <Input type="number" step="0.5" {...register("expectedAdultWeight")} placeholder="8" />
          </Field>
          <Field label="Gender">
            <Select {...register("gender")}>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </Select>
          </Field>
          <Field label="Status">
            <Select {...register("status")}>
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="sold">Sold</option>
            </Select>
          </Field>
          <Field label="Ready date">
            <Input type="date" {...register("readyDate")} />
          </Field>
        </div>
      </Section>

      {/* Parents */}
      <Section title="Parents">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Mother">
            <Select {...register("motherId")}>
              <option value="">None selected</option>
              {parents.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Father">
            <Select {...register("fatherId")}>
              <option value="">None selected</option>
              {parents.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Select>
          </Field>
        </div>
        {parents.length === 0 && (
          <p className="mt-2 text-xs text-(--color-ink-soft)">
            No parents added yet. You can add them from the Parents tab and
            come back to link them here.
          </p>
        )}
      </Section>

      {/* Details */}
      <Section title="Details">
        <div className="flex flex-col gap-5">
          <Field label="Description">
            <Textarea rows={3} {...register("description")} />
          </Field>
          <Field label="Personality">
            <Textarea rows={3} {...register("personality")} />
          </Field>
          <Field label="Health information">
            <Textarea rows={2} {...register("healthInfo")} />
          </Field>
          <Field label="Vaccination status">
            <Input {...register("vaccinationStatus")} placeholder="First round complete" />
          </Field>
        </div>
      </Section>

      {/* SEO */}
      <Section title="SEO (optional)">
        <div className="flex flex-col gap-5">
          <Field label="SEO title">
            <Input {...register("seoTitle")} />
          </Field>
          <Field label="SEO description">
            <Textarea rows={2} {...register("seoDescription")} />
          </Field>
        </div>
      </Section>

      {serverError && <p className="text-sm text-(--color-rose-dark)">{serverError}</p>}

      <Button type="submit" disabled={isSubmitting} className="w-full rounded-full py-6 sm:w-auto">
        {isSubmitting ? "Saving..." : isEditing ? "Save changes" : "Create puppy"}
      </Button>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[1.5rem] bg-white p-6">
      <h2 className="mb-5 font-display text-lg text-(--color-ink)">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="mb-2 block text-sm text-(--color-ink)">{label}</Label>
      {children}
      {error && <p className="mt-1 text-xs text-(--color-rose-dark)">{error}</p>}
    </div>
  );
}

const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  function Select(props, ref) {
    return (
      <select
        ref={ref}
        {...props}
        className="h-9 w-full rounded-md border border-(--color-ink)/15 bg-white px-3 text-sm text-(--color-ink) outline-none focus-visible:border-(--color-rose) focus-visible:ring-2 focus-visible:ring-(--color-rose)/30"
      />
    );
  }
);