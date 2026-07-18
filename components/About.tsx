export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-charcoal py-24 text-cream md:py-32">
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-rose/20 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="text-balance font-display text-3xl italic leading-[1.25] pb-1 md:text-4xl">
          DEMO Beauty Salon is a boutique studio built around one idea: good
          beauty care should feel unhurried.
        </p>
        <p className="mx-auto mt-6 max-w-xl text-balance leading-relaxed text-cream/70">
          From haircuts and color to facials, manicures, waxing, and bridal
          makeup, every appointment is one-on-one with a stylist who knows
          your name. Mia answers the phone so a real conversation always
          comes first, even before you walk in the door.
        </p>
      </div>
    </section>
  );
}
