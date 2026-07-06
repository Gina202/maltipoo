"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Dog,
  Heart,
  MessageSquareQuote,
  HelpCircle,
  Inbox,
  Settings,
  LogOut,
} from "lucide-react";
import { logout } from "@/features/auth/actions";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/puppies", label: "Puppies", icon: Dog },
  { href: "/admin/parents", label: "Parents", icon: Heart },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col justify-between border-r border-(--color-ink)/5 bg-white p-5 md:w-64">
      <div>
        <Link href="/admin" className="mb-8 block font-display text-lg text-(--color-ink)">
          Name Here Maltipoos
        </Link>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-(--color-blush) text-(--color-ink)"
                    : "text-(--color-ink-soft) hover:bg-(--color-cream)"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <form action={logout}>
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium text-(--color-ink-soft) transition-colors hover:bg-(--color-cream)"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Sign out
        </button>
      </form>
    </aside>
  );
}