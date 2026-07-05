"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { login, type LoginState } from "@/features/auth/actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div>
        <Label htmlFor="email" className="mb-2 block text-sm text-(--color-ink)">
          Email
        </Label>
        <Input id="email" name="email" type="email" required autoComplete="email" />
      </div>

      <div>
        <Label htmlFor="password" className="mb-2 block text-sm text-(--color-ink)">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-(--color-rose-dark)">{state.error}</p>
      )}

      <Button type="submit" disabled={isPending} className="rounded-full py-6">
        {isPending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}