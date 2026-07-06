import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="mb-1 text-center font-display text-2xl text-(--color-ink)">
          Admin sign in
        </h1>
        <p className="mb-8 text-center text-sm text-(--color-ink-soft)">
          Maltipoo Cottage dashboard
        </p>
        <LoginForm />
      </div>
    </div>
  );
}