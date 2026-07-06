"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { faqFormSchema, type FaqFormValues } from "@/features/faqs/schema";
import { createFaq, updateFaq } from "@/features/faqs/actions";

type FaqFormProps = {
  faqId?: string;
  defaultValues?: Partial<FaqFormValues>;
};

export function FaqForm({ faqId, defaultValues }: FaqFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const isEditing = Boolean(faqId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FaqFormValues>({
    resolver: zodResolver(faqFormSchema),
    defaultValues,
  });

  async function onSubmit(values: FaqFormValues) {
    setServerError(null);
    const result = isEditing ? await updateFaq(faqId!, values) : await createFaq(values);

    if (result && !result.success) {
      setServerError(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      <div className="rounded-[1.5rem] bg-white p-6">
        <div className="flex flex-col gap-5">
          <div>
            <Label className="mb-2 block text-sm text-(--color-ink)">Question</Label>
            <Input {...register("question")} placeholder="How old are the puppies when they go home?" />
            {errors.question && (
              <p className="mt-1 text-xs text-(--color-rose-dark)">{errors.question.message}</p>
            )}
          </div>
          <div>
            <Label className="mb-2 block text-sm text-(--color-ink)">Answer</Label>
            <Textarea rows={5} {...register("answer")} />
            {errors.answer && (
              <p className="mt-1 text-xs text-(--color-rose-dark)">{errors.answer.message}</p>
            )}
          </div>
        </div>
      </div>

      {serverError && <p className="text-sm text-(--color-rose-dark)">{serverError}</p>}

      <Button type="submit" disabled={isSubmitting} className="w-full rounded-full py-6 sm:w-auto">
        {isSubmitting ? "Saving..." : isEditing ? "Save changes" : "Add question"}
      </Button>
    </form>
  );
}