"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Gift } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const STORAGE_KEY = "welcome-popup-seen";
const SHOW_DELAY_MS = 1200;

export function WelcomePopup() {
  const [shouldRender, setShouldRender] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let hasSeen = false;
    try {
      hasSeen = localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      // localStorage unavailable (e.g. private browsing edge cases) -
      // fail safe by just not showing the popup rather than erroring.
      return;
    }

    if (hasSeen) return;

    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, "true");
      } catch {
        // Ignore - worst case the popup shows again next visit.
      }
      setShouldRender(true);
      // Mount first, then flip visible on the next frame so the
      // opacity/scale transition actually has something to animate from.
      requestAnimationFrame(() => setVisible(true));
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  function handleClose() {
    setVisible(false);
    // Wait for the fade-out transition to finish before unmounting.
    setTimeout(() => setShouldRender(false), 200);
  }

  useEffect(() => {
    if (!shouldRender) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center px-6 transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-popup-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-(--color-ink)/40 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        className={`relative w-full max-w-md rounded-[1.5rem] bg-white p-8 text-center shadow-[var(--shadow-soft-lg)] transition-all duration-200 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-(--color-ink-soft) transition-colors hover:bg-(--color-cream) hover:text-(--color-ink)"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-(--color-blush)">
          <Gift className="h-6 w-6 text-(--color-rose-dark)" aria-hidden="true" />
        </div>

        <h2 id="welcome-popup-title" className="font-display text-2xl text-(--color-ink)">
          A little welcome gift
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-(--color-ink-soft)">
          Reserve your puppy and we'll send you a complete Puppy Welcome
          Guide, everything you need to know for their first weeks home, on
          us.
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <Link
            href="/puppies"
            onClick={handleClose}
            className={buttonVariants({ className: "w-full rounded-full py-6" })}
          >
            View available puppies
          </Link>
          <button
            type="button"
            onClick={handleClose}
            className="text-sm text-(--color-ink-soft) transition-colors hover:text-(--color-ink)"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}