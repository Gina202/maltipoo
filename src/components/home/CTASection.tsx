import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="bg-(--color-rose) px-6 py-16 text-center sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-3xl text-white sm:text-4xl">
          Ready to meet your puppy?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/90">
          Reach out today and we'll help you find the right fit for your
          family.
        </p>
        <div className="mt-8">
          <Link
            href="/contact"
            className={buttonVariants({
              variant: "secondary",
              className: "rounded-full bg-white px-8 py-6 text-base text-(--color-rose) hover:bg-white/90",
            })}
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}