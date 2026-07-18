const services = [
  {
    name: "Signature Haircut & Style",
    description: "A precision cut finished with a blow-dry, styled to you.",
    price: "$40",
  },
  {
    name: "Full Color",
    description: "Root-to-tip color in your choice of shade, glossed for shine.",
    price: "$120",
  },
  {
    name: "Classic Facial",
    description: "A relaxing deep-cleanse facial suited to your skin type.",
    price: "$65",
  },
  {
    name: "Gel Manicure",
    description: "Long-wearing gel polish with a full shape and cuticle care.",
    price: "$35",
  },
  {
    name: "Waxing",
    description: "Brow, lip, and body waxing with soothing aftercare.",
    price: "From $28",
  },
  {
    name: "Bridal Makeup",
    description: "A full bridal look, including a trial session beforehand.",
    price: "$165",
  },
];

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <h2 className="max-w-lg font-display text-4xl italic leading-[1.15] pb-1 text-charcoal md:text-5xl">
        What we do
      </h2>
      <p className="mt-4 max-w-md text-charcoal-soft">
        A full menu of hair, skin, and beauty services. Mia can quote any of
        these on the phone.
      </p>

      <div className="mt-14 grid gap-x-16 gap-y-10 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.name}
            className="flex items-baseline justify-between gap-6 border-t border-charcoal/10 pt-6"
          >
            <div>
              <h3 className="font-display text-xl italic leading-[1.15] pb-1 text-charcoal">
                {service.name}
              </h3>
              <p className="mt-1 max-w-sm text-sm leading-relaxed text-charcoal-soft">
                {service.description}
              </p>
            </div>
            <span className="shrink-0 font-display text-2xl text-rose">
              {service.price}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
