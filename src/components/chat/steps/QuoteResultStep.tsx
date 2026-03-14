"use client";

import { CheckCircle, Phone, RotateCcw } from "lucide-react";
import { ChatMessage } from "../ChatMessage";
import type { Schedule, PoolSize } from "../types";

interface QuoteResultStepProps {
  monthlyPrice: number;
  schedule: Schedule;
  poolSize: PoolSize;
  quoteId: string;
  onReset: () => void;
}

const POOL_LABELS: Record<PoolSize, string> = {
  "10k-20k": "10k – 20k gal",
  "20k-30k": "20k – 30k gal",
  "30k+": "30k+ gal",
};

export function QuoteResultStep({
  monthlyPrice,
  schedule,
  poolSize,
  quoteId,
  onReset,
}: QuoteResultStepProps) {
  return (
    <>
      <ChatMessage from="bot">
        <div className="flex items-center gap-2 mb-2 font-semibold">
          <CheckCircle className="h-4 w-4 text-green-500" />
          Your Instant Quote
        </div>

        <div className="rounded-xl bg-white border border-border-light p-4 mb-3">
          <p className="text-center text-3xl font-extrabold text-hydra-600">
            ${monthlyPrice}
            <span className="text-sm font-medium text-slate-light">/mo</span>
          </p>
          <div className="mt-2 flex justify-center gap-4 text-xs text-slate-light">
            <span>{schedule === "premium" ? "Premium Care" : schedule === "biweekly" ? "Bi-weekly" : "Weekly"}</span>
            <span className="text-hydra-300">&#183;</span>
            <span>{POOL_LABELS[poolSize]}</span>
          </div>
        </div>

        <div className="rounded-lg bg-hydra-50/60 px-3 py-2 mb-2">
          <p className="text-xs text-slate-light">
            Quote #{" "}
            <span className="font-mono font-semibold text-navy">{quoteId}</span>
          </p>
        </div>
        <p className="text-sm">
          A confirmation has been sent to your email. We&apos;ll follow up
          within 24 hours — or call us now to get started!
        </p>
      </ChatMessage>

      <div className="flex gap-2 mt-2">
        <a
          href="tel:+12142336803"
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-hydra-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-hydra-700"
        >
          <Phone className="h-3.5 w-3.5" />
          Call Now
        </a>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-full border border-border-light px-4 py-2.5 text-xs font-semibold text-slate-light transition-colors hover:border-hydra-300 hover:text-hydra-600"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          New Quote
        </button>
      </div>
    </>
  );
}
