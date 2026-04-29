"use client";

import { useReducer, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, MessageSquare, ChevronLeft } from "lucide-react";
import {
  chatReducer,
  initialChatState,
  type ChatState,
  type PoolSize,
  type Schedule,
  type ServiceType,
  type ContactDetails,
  type InquiryDetails,
} from "./types";
import { getMonthlyPrice } from "./pricing";
import { submitQuote } from "@/app/actions/quote";
import { submitInquiry } from "@/app/actions/inquiry";
import { trackLead } from "@/lib/analytics";

import { ChatMessage } from "./ChatMessage";
import { ServiceTypeStep } from "./steps/ServiceTypeStep";
import { PoolSizeStep } from "./steps/PoolSizeStep";
import { ScheduleStep } from "./steps/ScheduleStep";
import { DetailsStep } from "./steps/DetailsStep";
import { QuoteResultStep } from "./steps/QuoteResultStep";
import { InquiryStep } from "./steps/InquiryStep";
import { InquiryResultStep } from "./steps/InquiryResultStep";

const STORAGE_KEY = "hps-quote-chat";

function loadState(): ChatState {
  if (typeof window === "undefined") return initialChatState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ChatState;
      // don't restore mid-submission states
      if (parsed.step === "submitting") parsed.step = "details";
      if (parsed.step === "inquirySubmitting") parsed.step = "inquiry";
      return parsed;
    }
  } catch {
    /* ignore */
  }
  return initialChatState;
}

/* ------------------------------------------------------------------ */
/*  Step progress indicator                                            */
/* ------------------------------------------------------------------ */

const QUOTE_STEPS = ["poolSize", "schedule", "details"] as const;

function StepIndicator({ currentStep }: { currentStep: string }) {
  const idx = QUOTE_STEPS.indexOf(currentStep as (typeof QUOTE_STEPS)[number]);
  if (idx === -1) return null;

  return (
    <div className="flex items-center gap-1.5 mb-3">
      {QUOTE_STEPS.map((s, i) => (
        <div
          key={s}
          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
            i <= idx ? "bg-hydra-500" : "bg-hydra-100"
          }`}
        />
      ))}
      <span className="ml-1.5 text-[10px] font-medium text-slate-light">
        {idx + 1}/{QUOTE_STEPS.length}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Back button                                                        */
/* ------------------------------------------------------------------ */

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-0.5 text-[11px] font-medium text-slate-light transition-colors hover:text-hydra-600 mb-1"
    >
      <ChevronLeft className="h-3.5 w-3.5" />
      Back
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress bar for submission                                        */
/* ------------------------------------------------------------------ */

function SubmittingBar() {
  return (
    <ChatMessage from="bot">
      <div className="space-y-3">
        <p className="text-sm font-semibold text-navy">
          Generating your quote...
        </p>
        <div className="h-2 w-full rounded-full bg-hydra-100 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-hydra-400 to-hydra-600"
            initial={{ width: "0%" }}
            animate={{ width: "90%" }}
            transition={{ duration: 6, ease: "easeOut" }}
          />
        </div>
        <p className="text-[11px] text-slate-light">
          Calculating price &amp; sending confirmation email...
        </p>
      </div>
    </ChatMessage>
  );
}

function InquirySubmittingBar() {
  return (
    <ChatMessage from="bot">
      <div className="space-y-3">
        <p className="text-sm font-semibold text-navy">
          Sending your message...
        </p>
        <div className="h-2 w-full rounded-full bg-hydra-100 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-hydra-400 to-hydra-600"
            initial={{ width: "0%" }}
            animate={{ width: "90%" }}
            transition={{ duration: 4, ease: "easeOut" }}
          />
        </div>
      </div>
    </ChatMessage>
  );
}

/* ------------------------------------------------------------------ */
/*  Main widget                                                        */
/* ------------------------------------------------------------------ */

interface ChatWidgetProps {
  onClose: () => void;
}

export function ChatWidget({ onClose }: ChatWidgetProps) {
  const [state, dispatch] = useReducer(chatReducer, initialChatState, loadState);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Persist state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Auto-scroll to bottom on step change
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [state.step]);

  /* ---------- handlers ---------- */

  const handleServiceType = useCallback((type: ServiceType) => {
    dispatch({ type: "SET_SERVICE_TYPE", serviceType: type });
  }, []);

  const handlePoolSize = useCallback((size: PoolSize) => {
    dispatch({ type: "SET_POOL_SIZE", poolSize: size });
  }, []);

  const handleSchedule = useCallback((schedule: Schedule) => {
    dispatch({ type: "SET_SCHEDULE", schedule });
  }, []);

  const doSubmitQuote = useCallback(
    async (details: ContactDetails) => {
      const price = getMonthlyPrice(state.schedule!, state.poolSize!);
      dispatch({ type: "SET_PRICE", price });

      const result = await submitQuote({
        poolSize: state.poolSize!,
        schedule: state.schedule!,
        monthlyPrice: price,
        name: details.name,
        email: details.email,
        phone: details.phone,
        address: details.address,
      });

      if (result.success) {
        trackLead({
          source: "chat_pool_quote",
          value: price * 12,
        });
        dispatch({ type: "SET_QUOTE_ID", quoteId: result.quoteId });
      } else {
        dispatch({ type: "SET_ERROR", error: result.error });
      }
    },
    [state.poolSize, state.schedule]
  );

  const handleDetails = useCallback(
    (details: ContactDetails) => {
      dispatch({ type: "SET_DETAILS", details });
      doSubmitQuote(details);
    },
    [doSubmitQuote]
  );

  const doSubmitInquiry = useCallback(
    async (details: InquiryDetails) => {
      const result = await submitInquiry({
        serviceType: state.serviceType as "repair" | "question",
        ...details,
      });

      if (result.success) {
        trackLead({
          source:
            state.serviceType === "repair"
              ? "chat_repair_inquiry"
              : "chat_question_inquiry",
        });
        dispatch({ type: "SET_STEP", step: "inquiryResult" });
      } else {
        dispatch({ type: "SET_STEP", step: "inquiry" });
      }
    },
    [state.serviceType]
  );

  const handleInquiry = useCallback(
    (details: InquiryDetails) => {
      dispatch({ type: "SET_INQUIRY", inquiry: details });
      doSubmitInquiry(details);
    },
    [doSubmitInquiry]
  );

  const handleBack = useCallback(() => {
    dispatch({ type: "GO_BACK" });
  }, []);

  const handleReset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: "RESET" });
  }, []);

  /* ---------- render step ---------- */

  function renderStep() {
    switch (state.step) {
      case "serviceType":
        return <ServiceTypeStep onSelect={handleServiceType} />;

      case "poolSize":
        return (
          <>
            <BackButton onClick={handleBack} />
            <StepIndicator currentStep="poolSize" />
            <PoolSizeStep onSelect={handlePoolSize} />
          </>
        );

      case "schedule":
        return (
          <>
            <BackButton onClick={handleBack} />
            <StepIndicator currentStep="schedule" />
            <ChatMessage from="user">
              Pool size:{" "}
              {state.poolSize === "30k+"
                ? "30,000+ gal"
                : state.poolSize?.replace("k", ",000").replace("-", " – ") +
                  " gal"}
            </ChatMessage>
            <ScheduleStep onSelect={handleSchedule} />
          </>
        );

      case "details":
        return (
          <>
            <BackButton onClick={handleBack} />
            <StepIndicator currentStep="details" />
            <ChatMessage from="user">
              Schedule: <span className="capitalize">{state.schedule}</span>
            </ChatMessage>
            {state.error && (
              <ChatMessage from="bot">
                <p className="text-red-600 text-xs">{state.error}</p>
              </ChatMessage>
            )}
            <DetailsStep onSubmit={handleDetails} />
          </>
        );

      case "submitting":
        return <SubmittingBar />;

      case "result":
        return (
          <QuoteResultStep
            monthlyPrice={state.monthlyPrice!}
            schedule={state.schedule!}
            poolSize={state.poolSize!}
            quoteId={state.quoteId!}
            onReset={handleReset}
          />
        );

      /* -- inquiry flow -- */
      case "inquiry":
        return (
          <>
            <BackButton onClick={handleBack} />
            <InquiryStep
              serviceType={state.serviceType!}
              onSubmit={handleInquiry}
            />
          </>
        );

      case "inquirySubmitting":
        return <InquirySubmittingBar />;

      case "inquiryResult":
        return <InquiryResultStep onReset={handleReset} />;

      default:
        return null;
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className="fixed bottom-24 right-4 z-50 flex w-[370px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl border border-border-light bg-white shadow-2xl sm:right-6"
      style={{ maxHeight: "min(600px, calc(100dvh - 8rem))" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between rounded-t-2xl bg-hydra-600 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <MessageSquare className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Hydra Assistant</p>
            <p className="text-[11px] text-hydra-100">
              We typically respond instantly
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        style={{ minHeight: 200 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={state.step}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="border-t border-border-light px-4 py-2.5">
        <p className="text-center text-[10px] text-slate-light/60">
          Powered by Hydra Pool Services
        </p>
      </div>
    </motion.div>
  );
}
