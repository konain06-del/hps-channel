"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Droplets, Calendar, ClipboardCheck, Activity, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { AuroraBackground } from "@/components/graphics/AuroraBackground";
import { NoiseOverlay } from "@/components/graphics/NoiseOverlay";
import { GridOverlay } from "@/components/graphics/GridOverlay";
import { RippleLines } from "@/components/graphics/RippleLines";
import { GradientOrb } from "@/components/graphics/GradientOrb";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const fadeUpSlow = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const cardEntrance = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Trust indicators data                                              */
/* ------------------------------------------------------------------ */

const trustItems = [
  "Fast response",
  "Local Frisco-based",
  "Consistent weekly service",
] as const;

/* ------------------------------------------------------------------ */
/*  Hero Component                                                     */
/* ------------------------------------------------------------------ */

export function Hero() {
  // Auto-open the quote bot shortly after the hero loads
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent("open-chat"));
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden bg-white"
      aria-label="Hero"
    >
      {/* ---------- Background layers ---------- */}
      <AuroraBackground className="opacity-60" />
      <NoiseOverlay />
      <GridOverlay className="opacity-[0.15]" />
      <RippleLines className="top-auto bottom-0 opacity-40" />
      <GradientOrb className="top-[-10%] left-[-8%]" size="lg" />
      <GradientOrb className="right-[-6%] bottom-[5%]" size="md" />

      {/* ---------- Content grid ---------- */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-28 sm:px-6 lg:px-8 lg:py-0">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ============================== */}
          {/*  LEFT — Copy & CTAs            */}
          {/* ============================== */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-[3.4rem]"
            >
              Crystal-Clear Pool Care,{" "}
              <span className="text-hydra-500">Week After Week.</span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-md text-lg leading-relaxed text-slate-light sm:text-xl"
            >
              Weekly cleaning, balanced chemicals, reliable communication, and
              easy monthly billing &mdash; serving Frisco and nearby areas so
              your pool stays swim-ready every day.
            </motion.p>

            {/* Free trial offer — opens chatbot on click */}
            <motion.button
              variants={fadeUp}
              onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
              className="mt-8 inline-flex items-center gap-3 rounded-xl border border-hydra-200 bg-hydra-50/60 px-5 py-3 text-left transition-all duration-200 hover:border-hydra-300 hover:shadow-md cursor-pointer"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-hydra-500 text-xs font-bold text-white">
                14
              </span>
              <div>
                <p className="text-sm font-semibold text-navy">
                  First 2 weeks on us &mdash; completely free
                </p>
                <p className="text-xs text-slate-light">
                  Cancel anytime. No payment on file required.
                </p>
              </div>
            </motion.button>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="mt-5 flex flex-wrap gap-4">
              {/* Primary — Get a Quote */}
              <button
                onClick={() =>
                  document
                    .getElementById("get-quote")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className={cn(
                  "inline-flex items-center justify-center rounded-xl bg-hydra-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-hydra-500/25",
                  "transition-all duration-200 ease-out",
                  "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-hydra-500/30",
                  "active:scale-[0.98]",
                  "focus-visible:ring-2 focus-visible:ring-hydra-500 focus-visible:ring-offset-2"
                )}
              >
                Get a Quote
              </button>

              {/* Secondary — View Plans */}
              <Link
                href="/plans"
                className={cn(
                  "inline-flex items-center justify-center rounded-xl border border-hydra-500 bg-white px-7 py-3.5 text-sm font-semibold text-hydra-600 shadow-sm",
                  "transition-all duration-200 ease-out",
                  "hover:-translate-y-0.5 hover:shadow-md hover:bg-hydra-50/60",
                  "active:scale-[0.98]",
                  "focus-visible:ring-2 focus-visible:ring-hydra-500 focus-visible:ring-offset-2"
                )}
              >
                View Plans
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {trustItems.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate"
                >
                  <CheckCircle className="h-4 w-4 shrink-0 text-hydra-500" />
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ============================== */}
          {/*  RIGHT — Dashboard cards       */}
          {/* ============================== */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative hidden min-h-[520px] lg:block"
            aria-hidden
          >
            {/* ---- Service Overview card ---- */}
            <motion.div
              variants={cardEntrance}
              className={cn(
                "animate-float-slow absolute top-0 left-0 z-20 w-[340px] rounded-2xl border border-border-light bg-white/90 p-5 shadow-xl shadow-hydra-500/5 backdrop-blur-md"
              )}
            >
              {/* Card header */}
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-hydra-50">
                  <ClipboardCheck className="h-5 w-5 text-hydra-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">
                    Service Overview
                  </p>
                  <p className="text-xs text-slate-light">
                    Weekly pool maintenance
                  </p>
                </div>
              </div>

              {/* Visit info */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-surface px-3 py-2.5">
                  <p className="text-[0.65rem] font-medium uppercase tracking-wider text-slate-light">
                    Last Visit
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-navy">
                    Jan 28
                  </p>
                </div>
                <div className="rounded-lg bg-surface px-3 py-2.5">
                  <p className="text-[0.65rem] font-medium uppercase tracking-wider text-slate-light">
                    Next Visit
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-navy">
                    Feb 4
                  </p>
                </div>
              </div>

              {/* Water balance status */}
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50/70 px-3 py-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <p className="text-sm font-medium text-emerald-700">
                  Water Balance: Optimal
                </p>
              </div>

              {/* Checklist */}
              <div className="mt-4 space-y-2">
                {[
                  "Skim surface & vacuum",
                  "Brush walls & tiles",
                  "Check & adjust chemicals",
                  "Inspect equipment",
                ].map((task) => (
                  <div
                    key={task}
                    className="flex items-center gap-2 text-sm text-slate"
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-hydra-50">
                      <svg
                        className="h-3 w-3 text-hydra-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    {task}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ---- Water Balance mini card ---- */}
            <motion.div
              variants={cardEntrance}
              className={cn(
                "animate-float absolute right-0 top-10 z-30 w-[240px] rounded-2xl border border-border-light bg-white/90 p-4 shadow-xl shadow-hydra-500/5 backdrop-blur-md"
              )}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-hydra-50">
                  <Droplets className="h-4 w-4 text-hydra-500" />
                </div>
                <p className="text-sm font-semibold text-navy">
                  Water Balance
                </p>
              </div>

              <div className="mt-4 space-y-3">
                {/* Chlorine */}
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate">Chlorine</span>
                    <span className="font-semibold text-emerald-600">
                      3.0 ppm
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-emerald-400"
                      style={{ width: "75%" }}
                    />
                  </div>
                </div>

                {/* pH */}
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate">pH Level</span>
                    <span className="font-semibold text-hydra-600">7.4</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-hydra-400"
                      style={{ width: "68%" }}
                    />
                  </div>
                </div>

                {/* Alkalinity */}
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate">Alkalinity</span>
                    <span className="font-semibold text-violet-600">
                      100 ppm
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-violet-400"
                      style={{ width: "62%" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ---- Visit Notes card ---- */}
            <motion.div
              variants={cardEntrance}
              className={cn(
                "animate-float-slow absolute bottom-4 left-8 z-20 w-[280px] rounded-2xl border border-border-light bg-white/90 p-4 shadow-xl shadow-hydra-500/5 backdrop-blur-md"
              )}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-hydra-50">
                  <Calendar className="h-4 w-4 text-hydra-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">
                    Visit Notes
                  </p>
                  <p className="text-[0.65rem] text-slate-light">
                    Jan 28, 2025
                  </p>
                </div>
              </div>

              <div className="mt-3 rounded-lg bg-surface px-3 py-2.5">
                <p className="text-xs leading-relaxed text-slate">
                  Pool looking great. Adjusted chlorine levels slightly.
                  Backwashed filter. All equipment running smoothly &mdash; see
                  you next week!
                </p>
              </div>

              <div className="mt-3 flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-hydra-400" />
                <p className="text-[0.65rem] font-medium text-slate-light">
                  Chemical report attached
                </p>
              </div>
            </motion.div>

            {/* ---- Floating pill badges ---- */}
            <motion.div
              variants={cardEntrance}
              className={cn(
                "animate-float absolute right-4 bottom-24 z-30 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white/90 px-3.5 py-1.5 shadow-lg shadow-emerald-500/5 backdrop-blur-md"
              )}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-emerald-700">
                On-Time Service
              </span>
            </motion.div>

            <motion.div
              variants={cardEntrance}
              className={cn(
                "animate-float-slow absolute top-[52%] right-12 z-10 inline-flex items-center gap-1.5 rounded-full border border-hydra-200 bg-white/90 px-3.5 py-1.5 shadow-lg shadow-hydra-500/5 backdrop-blur-md"
              )}
            >
              <Bell className="h-3.5 w-3.5 text-hydra-500" />
              <span className="text-xs font-semibold text-hydra-700">
                Auto Updates
              </span>
            </motion.div>
          </motion.div>

          {/* ============================== */}
          {/*  MOBILE — Simplified cards     */}
          {/* ============================== */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative lg:hidden"
            aria-hidden
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
              {/* Mobile — Service overview mini card */}
              <motion.div
                variants={fadeUpSlow}
                className="flex-1 rounded-2xl border border-border-light bg-white/80 p-4 shadow-lg shadow-hydra-500/5 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-hydra-50">
                    <ClipboardCheck className="h-4 w-4 text-hydra-500" />
                  </div>
                  <p className="text-sm font-semibold text-navy">
                    Service Overview
                  </p>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-surface px-2.5 py-2">
                    <p className="text-[0.6rem] font-medium uppercase tracking-wider text-slate-light">
                      Last Visit
                    </p>
                    <p className="text-sm font-semibold text-navy">Jan 28</p>
                  </div>
                  <div className="rounded-lg bg-surface px-2.5 py-2">
                    <p className="text-[0.6rem] font-medium uppercase tracking-wider text-slate-light">
                      Next Visit
                    </p>
                    <p className="text-sm font-semibold text-navy">Feb 4</p>
                  </div>
                </div>
                <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-emerald-50/70 px-2.5 py-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <p className="text-xs font-medium text-emerald-700">
                    Water Balance: Optimal
                  </p>
                </div>
              </motion.div>

              {/* Mobile — Water balance mini card */}
              <motion.div
                variants={fadeUpSlow}
                className="flex-1 rounded-2xl border border-border-light bg-white/80 p-4 shadow-lg shadow-hydra-500/5 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-hydra-50">
                    <Droplets className="h-4 w-4 text-hydra-500" />
                  </div>
                  <p className="text-sm font-semibold text-navy">
                    Water Balance
                  </p>
                </div>
                <div className="mt-3 space-y-2.5">
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate">Chlorine</span>
                      <span className="font-semibold text-emerald-600">
                        3.0 ppm
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-emerald-400"
                        style={{ width: "75%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate">pH Level</span>
                      <span className="font-semibold text-hydra-600">7.4</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-hydra-400"
                        style={{ width: "68%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate">
                        Alkalinity
                      </span>
                      <span className="font-semibold text-violet-600">
                        100 ppm
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-violet-400"
                        style={{ width: "62%" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
