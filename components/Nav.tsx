import Link from "next/link";
import { BrandMark } from "./BrandMark";

const links = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#hours", label: "Hours" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-charcoal/10 bg-cream/85 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="#top" className="flex items-center gap-2.5 text-charcoal">
          <BrandMark className="h-8 w-8" />
          <span className="font-display text-lg italic leading-[1.1]">
            DEMO Beauty Salon
          </span>
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-charcoal-soft transition hover:text-charcoal"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="#top"
          className="rounded-full bg-charcoal px-4 py-2 text-sm font-semibold text-cream transition hover:bg-charcoal-soft"
        >
          Call Now
        </Link>
      </nav>
    </header>
  );
}
