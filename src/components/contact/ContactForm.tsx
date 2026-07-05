"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { contactFormSchema, type ContactFormValues } from "@/features/contact/schema";
import { submitInquiry } from "@/features/contact/actions";

export function ContactForm({
  initialMessage,
  puppySlug,
}: {
  initialMessage?: string;
  puppySlug?: string;
} = {}) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      message: initialMessage ?? "",
      puppySlug: puppySlug ?? "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("idle");
    const result = await submitInquiry(values);

    if (result.success) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[1.5rem] bg-(--color-sage)/20 p-8 text-center">
        <h3 className="font-display text-xl text-(--color-ink)">
          Message sent
        </h3>
        <p className="mt-2 text-sm text-(--color-ink-soft)">
          Thank you for reaching out. We'll get back to you soon &mdash; feel
          free to use live chat in the meantime for a faster reply.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <input type="hidden" {...register("puppySlug")} />
      <div>
        <Label htmlFor="name" className="mb-2 block text-sm text-(--color-ink)">
          Name
        </Label>
        <Input id="name" {...register("name")} placeholder="Your full name" />
        {errors.name && (
          <p className="mt-1 text-xs text-(--color-rose-dark)">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email" className="mb-2 block text-sm text-(--color-ink)">
          Email
        </Label>
        <Input id="email" type="email" {...register("email")} placeholder="name@email.com" />
        {errors.email && (
          <p className="mt-1 text-xs text-(--color-rose-dark)">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone" className="mb-2 block text-sm text-(--color-ink)">
          Phone <span className="text-(--color-ink-soft)">(optional)</span>
        </Label>
        <Input id="phone" type="tel" {...register("phone")} placeholder="(000) 000-0000" />
      </div>

      <div>
        <Label htmlFor="message" className="mb-2 block text-sm text-(--color-ink)">
          Message
        </Label>
        <Textarea
          id="message"
          rows={5}
          {...register("message")}
          placeholder="Tell us a bit about what you're looking for"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-(--color-rose-dark)">{errors.message.message}</p>
        )}
      </div>

      {status === "error" && (
        <p className="text-sm text-(--color-rose-dark)">{errorMessage}</p>
      )}

      <Button type="submit" disabled={isSubmitting} className="rounded-full py-6">
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}