"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import type { TranscriptTurn } from "@/lib/types";

type CallLog = {
  id: string;
  startedAt: string;
  transcript: TranscriptTurn[];
};

export function CallLogList({ callLogs }: { callLogs: CallLog[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (callLogs.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-charcoal/20 px-5 py-8 text-center text-sm text-charcoal-soft">
        No calls yet. Start a demo call from the homepage to see a transcript
        here.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-charcoal/10 rounded-lg border border-charcoal/10">
      {callLogs.map((log) => {
        const isOpen = log.id === openId;
        const startedAt = new Date(log.startedAt);
        return (
          <li key={log.id}>
            <button
              onClick={() => setOpenId(isOpen ? null : log.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <div>
                <p className="text-sm font-medium text-charcoal">
                  {startedAt.toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                <p className="text-xs text-charcoal-soft">
                  {log.transcript.length} messages
                </p>
              </div>
              <CaretDown
                size={16}
                className={`shrink-0 text-charcoal-soft transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="space-y-2 border-t border-charcoal/10 bg-cream-deep/50 px-5 py-4">
                {log.transcript.map((turn, index) => (
                  <p key={index} className="text-sm leading-relaxed">
                    <span className="font-semibold text-charcoal">
                      {turn.role === "agent" ? "Mia: " : "Caller: "}
                    </span>
                    <span className="text-charcoal-soft">{turn.content}</span>
                  </p>
                ))}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
