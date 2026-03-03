"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-border-light bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
      >
        <span className="text-base font-semibold text-navy">{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-slate-light transition-transform duration-200",
            open && "rotate-180"
          )}
          strokeWidth={2}
        />
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-base leading-relaxed text-slate">{answer}</p>
        </div>
      )}
    </div>
  );
}
