"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { ChatMessage } from "../ChatMessage";
import type { InquiryDetails, ServiceType } from "../types";

interface InquiryStepProps {
  serviceType: ServiceType;
  onSubmit: (details: InquiryDetails) => void;
}

const LABELS: Record<string, { title: string; placeholder: string }> = {
  repair: {
    title: "Tell us about the issue",
    placeholder: "Describe the equipment problem or repair needed...",
  },
  question: {
    title: "What can we help with?",
    placeholder: "Type your question or message here...",
  },
};

export function InquiryStep({ serviceType, onSubmit }: InquiryStepProps) {
  const labels = LABELS[serviceType] || LABELS.question;
  const [form, setForm] = useState<InquiryDetails>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryDetails, string>>>({});

  function validate(): boolean {
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 7)
      errs.phone = "Valid phone number is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Valid email is required";
    if (!form.message.trim()) errs.message = "Please enter a message";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onSubmit(form);
  }

  const inputClass =
    "w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-sm text-navy placeholder:text-slate-light/60 outline-none transition-colors focus:border-hydra-400 focus:ring-1 focus:ring-hydra-200";

  return (
    <>
      <ChatMessage from="bot">
        <p className="font-semibold mb-1">{labels.title}</p>
        <p>Fill in your details and we&apos;ll get back to you within 24 hours.</p>
      </ChatMessage>

      <form onSubmit={handleSubmit} className="mt-2 space-y-2.5">
        <div>
          <input
            type="text"
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
          {errors.name && <p className="mt-0.5 text-xs text-red-500">{errors.name}</p>}
        </div>

        <div>
          <input
            type="tel"
            placeholder="Phone number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClass}
          />
          {errors.phone && <p className="mt-0.5 text-xs text-red-500">{errors.phone}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
          />
          {errors.email && <p className="mt-0.5 text-xs text-red-500">{errors.email}</p>}
        </div>

        <div>
          <textarea
            placeholder={labels.placeholder}
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={`${inputClass} resize-none`}
          />
          {errors.message && <p className="mt-0.5 text-xs text-red-500">{errors.message}</p>}
        </div>

        <p className="text-[11px] leading-snug text-slate-light/80 text-center">
          We will never send you any promotional content or marketing messages
          via email or text. Your info is only used to respond to your inquiry.
        </p>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-hydra-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-hydra-700"
        >
          <Send className="h-3.5 w-3.5" />
          Send Message
        </button>
      </form>
    </>
  );
}
