"use client";

import { CalendarDays } from "lucide-react";
import { ChatMessage } from "../ChatMessage";
import type { Schedule } from "../types";

interface ScheduleStepProps {
  onSelect: (schedule: Schedule) => void;
}

const OPTIONS: { value: Schedule; label: string; description: string }[] = [
  {
    value: "biweekly",
    label: "Bi-weekly",
    description: "Great for moderate-use pools",
  },
  {
    value: "weekly",
    label: "Weekly",
    description: "Best for year-round sparkling results",
  },
  {
    value: "premium",
    label: "Premium Care",
    description: "Weekly service + equipment support & priority scheduling",
  },
];

export function ScheduleStep({ onSelect }: ScheduleStepProps) {
  return (
    <>
      <ChatMessage from="bot">
        <div className="flex items-center gap-2 mb-1 font-semibold">
          <CalendarDays className="h-4 w-4 text-hydra-600" />
          Service Schedule
        </div>
        <p>How often would you like us to service your pool?</p>
      </ChatMessage>

      <div className="flex flex-col gap-2 mt-1">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className="w-full rounded-xl border border-border-light bg-white px-4 py-3 text-left transition-all hover:border-hydra-300 hover:bg-hydra-50"
          >
            <span className="block text-sm font-semibold text-navy">
              {opt.label}
            </span>
            <span className="block text-xs text-slate-light mt-0.5">
              {opt.description}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
