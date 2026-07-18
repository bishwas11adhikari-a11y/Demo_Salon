import { prisma } from "@/lib/prisma";
import { parseBusinessHours } from "@/lib/business-hours";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Hours } from "@/components/Hours";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Footer } from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function Home() {
  const business = await prisma.business.findFirst({
    orderBy: { createdAt: "asc" },
    include: { faqs: { orderBy: { order: "asc" } } },
  });

  if (!business) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center px-6 text-center">
        <p className="max-w-sm text-charcoal-soft">
          No business found yet. Run <code className="font-semibold">npm run db:seed</code>{" "}
          to load the demo salon.
        </p>
      </main>
    );
  }

  const hours = parseBusinessHours(business.businessHours);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <About />
        <Hours hours={hours} />
        <FaqAccordion faqs={business.faqs} />
      </main>
      <Footer />
    </>
  );
}
