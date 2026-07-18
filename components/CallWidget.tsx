"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RetellWebClient } from "retell-client-js-sdk";
import {
  CircleNotch,
  Phone,
  PhoneDisconnect,
  Waveform,
} from "@phosphor-icons/react";
import type { TranscriptTurn } from "@/lib/types";

type CallState = "idle" | "connecting" | "active" | "ended" | "error";

type RetellTranscriptUpdate = {
  transcript?: { role: "agent" | "user"; content: string }[];
};

export function CallWidget() {
  const clientRef = useRef<RetellWebClient | null>(null);
  const businessIdRef = useRef<string | null>(null);
  const startedAtRef = useRef<string | null>(null);
  const savedRef = useRef(false);

  const [state, setState] = useState<CallState>("idle");
  const [transcript, setTranscript] = useState<TranscriptTurn[]>([]);
  const [agentTalking, setAgentTalking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const client = new RetellWebClient();
    clientRef.current = client;

    const onCallStarted = () => setState("active");
    const onAgentStartTalking = () => setAgentTalking(true);
    const onAgentStopTalking = () => setAgentTalking(false);
    const onUpdate = (update: RetellTranscriptUpdate) => {
      if (Array.isArray(update.transcript)) {
        setTranscript(
          update.transcript.map((turn) => ({
            role: turn.role,
            content: turn.content,
          }))
        );
      }
    };
    const onCallEnded = () => setState("ended");
    const onError = (message: unknown) => {
      setErrorMessage(
        typeof message === "string"
          ? message
          : "The call disconnected unexpectedly."
      );
      setState("error");
      client.stopCall();
    };

    client.on("call_started", onCallStarted);
    client.on("agent_start_talking", onAgentStartTalking);
    client.on("agent_stop_talking", onAgentStopTalking);
    client.on("update", onUpdate);
    client.on("call_ended", onCallEnded);
    client.on("error", onError);

    return () => {
      client.off("call_started", onCallStarted);
      client.off("agent_start_talking", onAgentStartTalking);
      client.off("agent_stop_talking", onAgentStopTalking);
      client.off("update", onUpdate);
      client.off("call_ended", onCallEnded);
      client.off("error", onError);
      client.stopCall();
    };
  }, []);

  useEffect(() => {
    if (state !== "ended" || savedRef.current) return;
    if (!businessIdRef.current || transcript.length === 0) return;
    savedRef.current = true;
    fetch("/api/call-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        businessId: businessIdRef.current,
        startedAt: startedAtRef.current,
        transcript,
      }),
    }).catch(() => {
      // Best-effort persistence; the demo call itself already completed.
    });
  }, [state, transcript]);

  const startCall = useCallback(async () => {
    setErrorMessage(null);
    setTranscript([]);
    savedRef.current = false;
    setState("connecting");
    try {
      const response = await fetch("/api/call", { method: "POST" });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Could not start the call.");
      }
      businessIdRef.current = data.businessId;
      startedAtRef.current = new Date().toISOString();
      await clientRef.current?.startCall({ accessToken: data.accessToken });
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Could not start the call."
      );
      setState("error");
    }
  }, []);

  const endCall = useCallback(() => {
    clientRef.current?.stopCall();
  }, []);

  const isLive = state === "active" || state === "connecting";

  return (
    <div className="w-full max-w-md">
      {state === "idle" || state === "error" ? (
        <button
          onClick={startCall}
          className="group inline-flex items-center gap-3 rounded-full bg-charcoal px-8 py-4 text-cream shadow-soft transition active:scale-[0.98] hover:bg-charcoal-soft"
        >
          <Phone size={20} weight="fill" />
          <span className="font-sans text-base font-semibold tracking-wide">
            Call Now for Inquiry
          </span>
        </button>
      ) : null}

      {errorMessage ? (
        <p className="mt-3 max-w-sm text-sm text-rose-dark">{errorMessage}</p>
      ) : null}

      {isLive ? (
        <div className="rounded-salon border border-charcoal/10 bg-white/70 p-6 shadow-soft backdrop-blur-sm">
          <div className="flex items-center gap-5">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
              {state === "active" && (
                <span
                  className="absolute inset-0 rounded-full bg-rose/40 motion-safe:animate-pulse-ring"
                  aria-hidden
                />
              )}
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-charcoal text-cream">
                {state === "connecting" ? (
                  <CircleNotch size={24} className="animate-spin" />
                ) : (
                  <Waveform size={24} weight={agentTalking ? "fill" : "regular"} />
                )}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-display text-lg italic leading-[1.15] pb-1 text-charcoal">
                {state === "connecting" && "Connecting to Mia..."}
                {state === "active" &&
                  (agentTalking ? "Mia is speaking" : "Listening...")}
              </p>
              <p className="text-sm text-charcoal-soft">
                {state === "active" ? "Call in progress" : "One moment"}
              </p>
            </div>
            {state === "active" && (
              <button
                onClick={endCall}
                aria-label="End call"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-rose text-cream transition active:scale-[0.98] hover:bg-rose-dark"
              >
                <PhoneDisconnect size={18} weight="fill" />
              </button>
            )}
          </div>
        </div>
      ) : null}

      {state === "ended" && (
        <div className="rounded-salon border border-charcoal/10 bg-white/70 p-5 shadow-soft">
          <p className="font-display text-lg italic leading-[1.15] pb-1 text-charcoal">
            Call ended
          </p>
          <p className="mb-4 text-sm text-charcoal-soft">
            Thanks for trying the demo. A real caller&apos;s request would be
            confirmed by text.
          </p>
          <button
            onClick={startCall}
            className="inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-2.5 text-sm font-semibold text-cream transition active:scale-[0.98] hover:bg-charcoal-soft"
          >
            <Phone size={16} weight="fill" />
            Call Now for Inquiry
          </button>
        </div>
      )}

      {transcript.length > 0 && (
        <div className="mt-6">
          <p className="mb-2 text-sm font-semibold text-charcoal-soft">
            Live transcript
          </p>
          <ol className="flex max-h-72 list-none flex-col gap-2 overflow-y-auto rounded-salon border border-charcoal/10 bg-white/60 p-4">
            {transcript.map((turn, index) => (
              <li
                key={index}
                className={
                  turn.role === "agent"
                    ? "mr-auto max-w-[85%] rounded-2xl rounded-tl-sm bg-charcoal px-4 py-2 text-sm text-cream"
                    : "ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-blush px-4 py-2 text-sm text-charcoal"
                }
              >
                {turn.content}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
