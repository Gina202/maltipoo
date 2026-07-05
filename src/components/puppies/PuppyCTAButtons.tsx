"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const STATUS_LABEL = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold",
} as const;

export function PuppyCTAButtons({
  slug,
  status,
}: {
  slug: string;
  status: "available" | "reserved" | "sold";
}) {
  const isAvailable = status === "available";

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <Link
        href={`/contact?puppy=${slug}`}
        className={buttonVariants({
          variant: "outline",
          className: "flex-1 rounded-full py-6 text-base",
        })}
      >
        Ask a question
      </Link>

      {isAvailable ? (
        <Link
          href={`/contact?puppy=${slug}&intent=reserve`}
          className={buttonVariants({ className: "flex-1 rounded-full py-6 text-base" })}
        >
          Reserve this puppy
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className={buttonVariants({
            className: "flex-1 cursor-not-allowed rounded-full py-6 text-base opacity-50",
          })}
        >
          {STATUS_LABEL[status]}
        </span>
      )}
    </div>
  );
}