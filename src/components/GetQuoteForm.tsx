"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackLead } from "@/lib/analytics";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FormState {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

interface GetQuoteFormProps {
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

/* ------------------------------------------------------------------ */
/*  Shared style tokens                                                */
/* ------------------------------------------------------------------ */

const inputBase = cn(
  "w-full rounded-xl border border-border-light bg-white px-4 py-3 text-sm text-navy placeholder:text-slate-light/60",
  "outline-none transition-all duration-200",
  "focus:border-hydra-400 focus:ring-2 focus:ring-hydra-200"
);

const inputError = "border-red-400 focus:border-red-400 focus:ring-red-200";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function GetQuoteForm({ className }: GetQuoteFormProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* ---- Handlers ---- */

  function updateField<K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key in errors) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key as keyof FormErrors];
        return next;
      });
    }
  }

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email";
    }
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/xbdkpwqr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        trackLead({ source: "home_quote_form" });
        setSubmitted(true);
      } else {
        setErrors({ name: "Something went wrong. Please try again." });
      }
    } catch {
      setErrors({ name: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  /* ---- Render ---- */

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5"
          >
            {/* --- Name --- */}
            <div>
              <label
                htmlFor="quote-name"
                className="mb-1.5 block text-sm font-medium text-navy"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="quote-name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className={cn(inputBase, errors.name && inputError)}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            {/* --- Phone --- */}
            <div>
              <label
                htmlFor="quote-phone"
                className="mb-1.5 block text-sm font-medium text-navy"
              >
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                id="quote-phone"
                type="tel"
                placeholder="(469) 555-0142"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className={cn(inputBase, errors.phone && inputError)}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* --- Email --- */}
            <div>
              <label
                htmlFor="quote-email"
                className="mb-1.5 block text-sm font-medium text-navy"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="quote-email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={cn(inputBase, errors.email && inputError)}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* --- Message (optional) --- */}
            <div>
              <label
                htmlFor="quote-message"
                className="mb-1.5 block text-sm font-medium text-navy"
              >
                Message
              </label>
              <textarea
                id="quote-message"
                rows={4}
                placeholder="Tell us about your pool or any questions you have..."
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                className={cn(inputBase, "resize-none")}
              />
            </div>

            {/* --- Submit --- */}
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-hydra-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-hydra-500/25",
                "transition-all duration-200 ease-out",
                "hover:shadow-xl hover:shadow-hydra-500/30",
                "focus-visible:ring-2 focus-visible:ring-hydra-500 focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-70"
              )}
            >
              {submitting ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" strokeWidth={2} />
                  Get a Quote
                </>
              )}
            </motion.button>
          </motion.form>
        ) : (
          /* ---- Success State ---- */
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex flex-col items-center justify-center rounded-2xl border border-border-light bg-surface px-8 py-16 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.15,
              }}
              className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-hydra-100"
            >
              <CheckCircle
                className="h-8 w-8 text-hydra-600"
                strokeWidth={2}
              />
            </motion.div>

            <h3 className="text-2xl font-bold text-navy">Thank you!</h3>
            <p className="mt-2 max-w-sm text-base leading-relaxed text-slate-light">
              We&apos;ll be in touch within 24 hours.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-hydra-50 px-4 py-2.5">
              <Clock className="h-4 w-4 text-hydra-600" strokeWidth={2} />
              <span className="text-sm font-medium text-hydra-700">
                Expected response time: Same business day
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
