"use client";

import { useState, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/admin/ImageUploader";
import {
  parentFormSchema,
  type ParentFormValues,
  type ParentFormInput,
} from "@/features/parents/schema";
import { createParent, updateParent } from "@/features/parents/actions";

type ParentFormProps = {
  parentId?: string;
  defaultValues?: Partial<ParentFormValues>;
};

export function ParentForm({ parentId, defaultValues }: ParentFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const isEditing = Boolean(parentId);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ParentFormInput, unknown, ParentFormValues>({
    resolver: zodResolver(parentFormSchema),
    defaultValues: {
      gender: "female",
      images: [],
      ...defaultValues,
    },
  });

  const images = watch("images") ?? [];

  async function onSubmit(values: ParentFormValues) {
    setServerError(null);

    const result = isEditing
      ? await updateParent(parentId!, values)
      : await createParent(values);

    if (result && !result.success) {
      setServerError(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8" noValidate>
      <Section title="Photos">
        <ImageUploader
          value={images}
          onChange={(urls) => setValue("images", urls, { shouldValidate: true })}
          pathPrefix="parents"
        />
        {errors.images && (
          <p className="mt-2 text-xs text-(--color-rose-dark)">{errors.images.message}</p>
        )}
      </Section>

      <Section title="Basics">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Name" error={errors.name?.message}>
            <Input {...register("name")} placeholder="Daisy" />
          </Field>
          <Field label="Weight (lbs)" error={errors.weightLbs?.message}>
            <Input type="number" step="0.5" {...register("weightLbs")} placeholder="9" />
          </Field>
          <Field label="Gender">
            <Select {...register("gender")}>
              <option value="female">Female (Mother)</option>
              <option value="male">Male (Father)</option>
            </Select>
          </Field>
        </div>
      </Section>

      <Section title="Details">
        <div className="flex flex-col gap-5">
          <Field label="Description">
            <Textarea rows={3} {...register("description")} />
          </Field>
          <Field label="Temperament">
            <Textarea rows={2} {...register("temperament")} placeholder="Gentle, affectionate, great with children" />
          </Field>
          <Field label="Health information">
            <Textarea rows={2} {...register("healthInfo")} />
          </Field>
        </div>
      </Section>

      {serverError && <p className="text-sm text-(--color-rose-dark)">{serverError}</p>}

      <Button type="submit" disabled={isSubmitting} className="w-full rounded-full py-6 sm:w-auto">
        {isSubmitting ? "Saving..." : isEditing ? "Save changes" : "Add parent"}
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