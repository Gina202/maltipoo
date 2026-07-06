"use client";

import { useState } from "react";
import Image from "next/image";
import { Dog, ChevronLeft, ChevronRight } from "lucide-react";

type PuppyCarouselProps = {
  images: string[];
  alt: string;
};

export function PuppyCarousel({ images, alt }: PuppyCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-[1.5rem] bg-(--color-cream)">
        <Dog className="h-10 w-10 text-(--color-ink-soft)" aria-hidden="true" />
      </div>
    );
  }

  const goTo = (index: number) => {
    setActiveIndex((index + images.length) % images.length);
  };

  function handleTouchStart(e: React.TouchEvent) {
    setTouchStartX(e.touches[0].clientX);
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 40) {
      goTo(activeIndex + (deltaX < 0 ? 1 : -1));
    }
    setTouchStartX(null);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") goTo(activeIndex - 1);
    if (e.key === "ArrowRight") goTo(activeIndex + 1);
  }

  return (
    <div>
      {/* Main image */}
      <div
        className="relative aspect-square w-full overflow-hidden rounded-[1.5rem] bg-(--color-cream) outline-none"
        role="group"
        aria-roledescription="carousel"
        aria-label={alt}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={images[activeIndex]}
          alt={`${alt} photo ${activeIndex + 1} of ${images.length}`}
          fill
          priority={activeIndex === 0}
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-(--color-ink) shadow-[var(--shadow-soft)] transition-transform hover:scale-105"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-(--color-ink) shadow-[var(--shadow-soft)] transition-transform hover:scale-105"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === activeIndex ? "w-5 bg-white" : "w-1.5 bg-white/60"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`View photo ${i + 1} of ${images.length}`}
              aria-current={i === activeIndex}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-[0.75rem] outline-none ring-2 ring-offset-2 transition-all ${
                i === activeIndex ? "ring-(--color-rose)" : "ring-transparent"
              }`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}