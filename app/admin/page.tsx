import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { parseBusinessHours } from "@/lib/business-hours";
import type { TranscriptTurn } from "@/lib/types";
import { CallLogList } from "@/components/admin/CallLogList";
import { BusinessForm } from "@/components/admin/BusinessForm";
import { FaqEditor } from "@/components/admin/FaqEditor";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const business = await prisma.business.findFirst({
    orderBy: { createdAt: "asc" },
    include: {
      faqs: { orderBy: { order: "asc" } },
      callLogs: { orderBy: { startedAt: "desc" } },
    },
  });

  if (!business) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="text-charcoal-soft">
          No business found. Run <code className="font-semibold">npm run db:seed</code>{" "}
          first.
        </p>
      </main>
    );
  }

  const hours = parseBusinessHours(business.businessHours);
  const callLogs = business.callLogs.map((log) => ({
    id: log.id,
    startedAt: log.startedAt.toISOString(),
    transcript: JSON.parse(log.transcript) as TranscriptTurn[],
  }));

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-12 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-charcoal-soft">
            {business.name}
          </p>
          <h1 className="font-display text-3xl italic leading-[1.15] pb-1 text-charcoal">
            Admin
          </h1>
        </div>
        <Link
          href="/"
          className="text-sm font-medium text-charcoal-soft hover:text-charcoal"
        >
          View site
        </Link>
      </div>

      <section className="mb-14">
        <h2 className="mb-4 text-lg font-semibold text-charcoal">
          Call history
        </h2>
        <CallLogList callLogs={callLogs} />
      </section>

      <section className="mb-14">
        <h2 className="mb-4 text-lg font-semibold text-charcoal">
          Business info
        </h2>
        <BusinessForm business={business} hours={hours} />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-charcoal">FAQs</h2>
        <FaqEditor businessId={business.id} initialFaqs={business.faqs} />
      </section>
    </main>
  );
}
