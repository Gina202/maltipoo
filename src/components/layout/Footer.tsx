import Link from "next/link";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/puppies", label: "Available Puppies" },
  { href: "/parents", label: "Parents" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-(--color-cream)">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <p className="font-display text-xl text-(--color-ink)">
              Name Here Maltipoos
            </p>
            <p className="mt-3 text-sm leading-relaxed text-(--color-ink-soft)">
              A small home breeder raising healthy, well-socialized Maltipoo
              puppies with love and care.
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-(--color-ink)">
              Explore
            </p>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-(--color-ink-soft) hover:text-(--color-rose)"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-(--color-ink)">
              Contact
            </p>
            <ul className="flex flex-col gap-2 text-sm text-(--color-ink-soft)">
              <li>Phone: (000) 000-0000</li>
              <li>Email: hello@example.com</li>
              <li>By appointment only</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-(--color-ink)/10 pt-6 text-center text-xs text-(--color-ink-soft)">
          © {new Date().getFullYear()} Name Here Maltipoos. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}