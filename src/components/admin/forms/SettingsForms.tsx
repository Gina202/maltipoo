"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { settingsFormSchema, type SettingsFormValues } from "@/features/settings/schema";
import { updateSiteSettings } from "@/features/settings/actions";

export function SettingsForm({ defaultValues }: { defaultValues: SettingsFormValues }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues,
  });

  async function onSubmit(values: SettingsFormValues) {
    setStatus("idle");
    const result = await updateSiteSettings(values);

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      <div className="rounded-[1.5rem] bg-white p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <Label className="mb-2 block text-sm text-(--color-ink)">Phone</Label>
            <Input {...register("phone")} placeholder="(000) 000-0000" />
          </div>
          <div>
            <Label className="mb-2 block text-sm text-(--color-ink)">Email</Label>
            <Input type="email" {...register("email")} placeholder="hello@example.com" />
            {errors.email && (
              <p className="mt-1 text-xs text-(--color-rose-dark)">{errors.email.message}</p>
            )}
          </div>
          <div className="sm:col-span-2">
            <Label className="mb-2 block text-sm text-(--color-ink)">Address / location</Label>
            <Input {...register("address")} placeholder="By appointment only" />
          </div>
          <div className="sm:col-span-2">
            <Label className="mb-2 block text-sm text-(--color-ink)">Business hours</Label>
            <Textarea rows={2} {...register("businessHours")} placeholder="Mon-Sat, 9am-6pm" />
          </div>
        </div>
      </div>

      {status === "success" && (
        <p className="text-sm text-(--color-sage-dark)">Settings saved.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-(--color-rose-dark)">{errorMessage}</p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full rounded-full py-6 sm:w-auto">
        {isSubmitting ? "Saving..." : "Save settings"}
      </Button>
    </form>
  );
}