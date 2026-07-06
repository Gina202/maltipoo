import Image from "next/image";
import Link from "next/link";
import homeImage from "../../../images/home .jpg";
import { buttonVariants } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-16 sm:py-20 md:flex-row md:py-24">
      <div className="flex-1 text-center md:text-left">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-(--color-rose)">
          Raised with love, in our home
        </p>
        <h1 className="font-display text-4xl italic text-(--color-ink) sm:text-5xl">
          Meet your new best friend
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-(--color-ink-soft) md:mx-0">
          Healthy, well-socialized Maltipoo puppies, raised underfoot in a
          real family home, not a kennel.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
          <Link
            href="/puppies"
            className={buttonVariants({ className: "rounded-full px-7 py-6 text-base" })}
          >
            View available puppies
          </Link>
          <Link
            href="/parents"
            className={buttonVariants({
              variant: "outline",
              className: "rounded-full px-7 py-6 text-base",
            })}
          >
            Meet the parents
          </Link>
        </div>
      </div>

      <div className="relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-[2rem]">
        <Image
          src={homeImage}
          alt="Maltipoo puppies in a family home"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </section>
  );
}