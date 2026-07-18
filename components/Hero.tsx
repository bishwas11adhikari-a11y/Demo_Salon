import { CallWidget } from "./CallWidget";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-16 md:pt-24"
    >
      <div
        className="pointer-events-none absolute -right-32 -top-24 h-[28rem] w-[28rem] rounded-full bg-blush blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-10 top-40 h-64 w-64 rounded-full bg-rose/30 blur-2xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pb-24 md:grid-cols-[1.1fr_0.9fr] md:items-center md:pb-32">
        <div>
          <h1 className="max-w-xl text-balance font-display text-5xl italic leading-[1.1] pb-1 text-charcoal md:text-6xl">
            DEMO Beauty Salon
          </h1>
          <p className="mt-5 max-w-md text-balance text-lg leading-relaxed text-charcoal-soft">
            Haircuts, color, facials, and bridal beauty, answered by Mia,
            our AI receptionist, day or night.
          </p>
          <div className="mt-9">
            <CallWidget />
          </div>
        </div>

        <div className="relative mx-auto hidden aspect-square w-full max-w-sm items-center justify-center md:flex">
          <div className="absolute inset-6 rounded-full border border-charcoal/15" />
          <div className="absolute inset-16 rounded-full border border-rose/30" />
          <div className="flex h-40 w-40 items-center justify-center rounded-full bg-white/70 shadow-soft backdrop-blur-sm">
            <span className="font-display text-6xl italic leading-none text-rose">
              D
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
