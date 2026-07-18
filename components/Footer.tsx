import Link from "next/link";
import { BrandMark } from "./BrandMark";

export function Footer() {
  return (
    <footer className="border-t border-charcoal/10 bg-blush-soft">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5 text-charcoal">
          <BrandMark className="h-7 w-7" />
          <span className="font-display text-base italic leading-[1.1]">
            DEMO Beauty Salon
          </span>
        </div>

        <div className="text-sm leading-relaxed text-charcoal-soft">
          <p>128 Maple Row, Suite 4</p>
          <p>(555) 014-7732</p>
        </div>

        <div className="flex items-center gap-6 text-sm text-charcoal-soft">
          <Link href="#services" className="hover:text-charcoal">
            Services
          </Link>
          <Link href="#faq" className="hover:text-charcoal">
            FAQ
          </Link>
          <Link href="/admin" className="hover:text-charcoal">
            Admin
          </Link>
        </div>
      </div>
      <div className="border-t border-charcoal/10 px-6 py-5 text-center text-xs text-charcoal-soft">
        DEMO Beauty Salon is a fictional business built to demonstrate an AI
        voice receptionist.
      </div>
    </footer>
  );
}
