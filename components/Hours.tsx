import { DAY_LABELS, type BusinessHours } from "@/lib/business-hours";

export function Hours({ hours }: { hours: BusinessHours }) {
  return (
    <section id="hours" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <div>
          <h2 className="font-display text-4xl italic leading-[1.15] pb-1 text-charcoal md:text-5xl">
            Opening hours
          </h2>
          <p className="mt-4 max-w-sm text-charcoal-soft">
            Call anytime, Mia can note your request outside these hours and a
            stylist will confirm by text.
          </p>
        </div>
        <dl className="divide-y divide-charcoal/10 rounded-salon border border-charcoal/10 bg-blush-soft px-6">
          {DAY_LABELS.map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between py-3.5">
              <dt className="font-medium text-charcoal">{label}</dt>
              <dd className="text-charcoal-soft">{hours[key]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
