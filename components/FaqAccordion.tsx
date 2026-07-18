"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";

type Faq = {
  id: string;
  question: string;
  answer: string;
};

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      <h2 className="text-center font-display text-4xl italic leading-[1.15] pb-1 text-charcoal md:text-5xl">
        Frequently asked
      </h2>

      <div className="mt-14 divide-y divide-charcoal/10 border-t border-charcoal/10">
        {faqs.map((faq) => {
          const isOpen = faq.id === openId;
          return (
            <div key={faq.id}>
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="font-medium text-charcoal">
                  {faq.question}
                </span>
                <CaretDown
                  size={18}
                  className={`shrink-0 text-charcoal-soft transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-5 leading-relaxed text-charcoal-soft">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
