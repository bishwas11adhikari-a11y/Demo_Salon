"use client";

import { useState } from "react";
import { Trash, Plus } from "@phosphor-icons/react";

type Faq = {
  id: string;
  question: string;
  answer: string;
};

export function FaqEditor({
  businessId,
  initialFaqs,
}: {
  businessId: string;
  initialFaqs: Faq[];
}) {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [draft, setDraft] = useState({ question: "", answer: "" });

  async function updateFaq(id: string, patch: Partial<Faq>) {
    setFaqs((current) =>
      current.map((faq) => (faq.id === id ? { ...faq, ...patch } : faq))
    );
    await fetch(`/api/admin/faqs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
  }

  async function deleteFaq(id: string) {
    setFaqs((current) => current.filter((faq) => faq.id !== id));
    await fetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
  }

  async function addFaq(event: React.FormEvent) {
    event.preventDefault();
    if (!draft.question.trim() || !draft.answer.trim()) return;
    const response = await fetch("/api/admin/faqs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessId, ...draft }),
    });
    const data = await response.json();
    setFaqs((current) => [...current, data.faq]);
    setDraft({ question: "", answer: "" });
  }

  return (
    <div className="space-y-6">
      <ul className="space-y-4">
        {faqs.map((faq) => (
          <li
            key={faq.id}
            className="rounded-lg border border-charcoal/10 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <input
                value={faq.question}
                onChange={(event) =>
                  updateFaq(faq.id, { question: event.target.value })
                }
                className="w-full border-b border-transparent bg-transparent text-sm font-semibold text-charcoal focus:border-rose focus:outline-none"
              />
              <button
                onClick={() => deleteFaq(faq.id)}
                aria-label="Delete FAQ"
                className="shrink-0 text-charcoal-soft transition hover:text-rose-dark"
              >
                <Trash size={16} />
              </button>
            </div>
            <textarea
              value={faq.answer}
              rows={2}
              onChange={(event) =>
                updateFaq(faq.id, { answer: event.target.value })
              }
              className="mt-2 w-full resize-none border-b border-transparent bg-transparent text-sm text-charcoal-soft focus:border-rose focus:outline-none"
            />
          </li>
        ))}
      </ul>

      <form
        onSubmit={addFaq}
        className="space-y-3 rounded-lg border border-dashed border-charcoal/20 p-4"
      >
        <p className="text-sm font-medium text-charcoal">Add a new FAQ</p>
        <input
          placeholder="Question"
          value={draft.question}
          onChange={(event) =>
            setDraft({ ...draft, question: event.target.value })
          }
          className="w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 text-sm text-charcoal placeholder:text-charcoal-soft/60 focus:border-rose focus:outline-none focus:ring-2 focus:ring-rose/30"
        />
        <textarea
          placeholder="Answer"
          rows={2}
          value={draft.answer}
          onChange={(event) =>
            setDraft({ ...draft, answer: event.target.value })
          }
          className="w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 text-sm text-charcoal placeholder:text-charcoal-soft/60 focus:border-rose focus:outline-none focus:ring-2 focus:ring-rose/30"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-charcoal px-4 py-2 text-sm font-semibold text-cream transition hover:bg-charcoal-soft"
        >
          <Plus size={16} />
          Add FAQ
        </button>
      </form>
    </div>
  );
}
