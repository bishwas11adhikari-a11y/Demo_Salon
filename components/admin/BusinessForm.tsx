"use client";

import { useState } from "react";
import { DAY_LABELS, type BusinessHours } from "@/lib/business-hours";

type Business = {
  id: string;
  name: string;
  description: string;
  greeting: string;
  aiInstructions: string;
};

export function BusinessForm({
  business,
  hours,
}: {
  business: Business;
  hours: BusinessHours;
}) {
  const [form, setForm] = useState({
    name: business.name,
    description: business.description,
    greeting: business.greeting,
    aiInstructions: business.aiInstructions,
  });
  const [businessHours, setBusinessHours] = useState(hours);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("saving");
    try {
      const response = await fetch("/api/admin/business", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: business.id, ...form, businessHours }),
      });
      if (!response.ok) throw new Error();
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium text-charcoal">
          Business name
        </label>
        <input
          id="name"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          className="rounded-md border border-charcoal/20 bg-white px-3 py-2 text-sm text-charcoal focus:border-rose focus:outline-none focus:ring-2 focus:ring-rose/30"
        />
      </div>

      <div className="grid gap-2">
        <label
          htmlFor="description"
          className="text-sm font-medium text-charcoal"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={2}
          value={form.description}
          onChange={(event) =>
            setForm({ ...form, description: event.target.value })
          }
          className="rounded-md border border-charcoal/20 bg-white px-3 py-2 text-sm text-charcoal focus:border-rose focus:outline-none focus:ring-2 focus:ring-rose/30"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="greeting" className="text-sm font-medium text-charcoal">
          Phone greeting
        </label>
        <textarea
          id="greeting"
          rows={2}
          value={form.greeting}
          onChange={(event) =>
            setForm({ ...form, greeting: event.target.value })
          }
          className="rounded-md border border-charcoal/20 bg-white px-3 py-2 text-sm text-charcoal focus:border-rose focus:outline-none focus:ring-2 focus:ring-rose/30"
        />
      </div>

      <div className="grid gap-2">
        <label
          htmlFor="aiInstructions"
          className="text-sm font-medium text-charcoal"
        >
          AI instructions
        </label>
        <textarea
          id="aiInstructions"
          rows={4}
          value={form.aiInstructions}
          onChange={(event) =>
            setForm({ ...form, aiInstructions: event.target.value })
          }
          className="rounded-md border border-charcoal/20 bg-white px-3 py-2 text-sm text-charcoal focus:border-rose focus:outline-none focus:ring-2 focus:ring-rose/30"
        />
      </div>

      <div className="grid gap-3">
        <span className="text-sm font-medium text-charcoal">
          Opening hours
        </span>
        <div className="grid gap-2 sm:grid-cols-2">
          {DAY_LABELS.map(({ key, label }) => (
            <div key={key} className="flex items-center gap-3">
              <label htmlFor={key} className="w-20 shrink-0 text-sm text-charcoal-soft">
                {label}
              </label>
              <input
                id={key}
                value={businessHours[key]}
                onChange={(event) =>
                  setBusinessHours({
                    ...businessHours,
                    [key]: event.target.value,
                  })
                }
                className="w-full rounded-md border border-charcoal/20 bg-white px-3 py-1.5 text-sm text-charcoal focus:border-rose focus:outline-none focus:ring-2 focus:ring-rose/30"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={status === "saving"}
          className="rounded-full bg-charcoal px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-charcoal-soft disabled:opacity-60"
        >
          {status === "saving" ? "Saving..." : "Save changes"}
        </button>
        {status === "saved" && (
          <span className="text-sm text-charcoal-soft">Saved.</span>
        )}
        {status === "error" && (
          <span className="text-sm text-rose-dark">
            Something went wrong, try again.
          </span>
        )}
      </div>
    </form>
  );
}
