"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Plan } from "@/lib/data/plans";
import { motion } from "framer-motion";
import { Check, X, Loader2 } from "lucide-react";

interface PlanCardProps {
  plan: Plan;
  index: number;
}

export function PlanCard({ plan, index }: PlanCardProps) {
  const { name, subtitle, price, priceLabel, featured, features, cta } = plan;
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Failed to start checkout");
      }
      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1] as const,
      }}
      className={cn(
        "group relative flex flex-col rounded-2xl bg-white p-6 transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-lg",
        featured
          ? "border-2 border-hydra-400 shadow-[0_0_24px_-4px_var(--color-hydra-400)] hover:shadow-[0_0_32px_-4px_var(--color-hydra-400)]"
          : "border border-border-light hover:border-hydra-300 hover:shadow-hydra-100/40"
      )}
    >
      {/* "Most Popular" badge for featured plan */}
      {featured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span
            className={cn(
              "inline-block rounded-full bg-gradient-to-r from-hydra-500 to-hydra-600 px-4 py-1",
              "text-xs font-semibold tracking-wide text-white shadow-sm"
            )}
          >
            Most Popular
          </span>
        </div>
      )}

      {/* Plan header */}
      <div className={cn("flex flex-col", featured ? "mt-2" : "")}>
        <h3 className="text-lg font-semibold text-navy">{name}</h3>
        <p className="mt-1 text-sm text-slate-light">{subtitle}</p>
      </div>

      {/* Price */}
      <div className="mt-5 mb-6 flex items-baseline gap-1">
        {price !== null ? (
          <>
            <span className="text-xs font-medium text-slate-light">
              {priceLabel}
            </span>
            <span className="ml-1 text-4xl font-bold tracking-tight text-navy">
              <span className="text-xl align-top">$</span>
              {price}
            </span>
            <span className="text-sm font-medium text-slate-light">/mo</span>
          </>
        ) : (
          <span className="text-2xl font-bold text-navy">{priceLabel}</span>
        )}
      </div>

      {/* Divider */}
      <div className="mb-5 h-px w-full bg-border-light" />

      {/* Feature list */}
      <ul className="flex flex-col gap-3">
        {features.map((feature) => (
          <li key={feature.text} className="flex items-start gap-2.5 text-sm">
            {feature.included ? (
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-hydra-50">
                <Check
                  className="h-3.5 w-3.5 text-hydra-600"
                  strokeWidth={2.5}
                />
              </span>
            ) : (
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-50">
                <X
                  className="h-3.5 w-3.5 text-gray-300"
                  strokeWidth={2.5}
                />
              </span>
            )}
            <span
              className={cn(
                feature.included ? "text-slate" : "text-slate-light/60"
              )}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA button */}
      <div className="mt-auto pt-6">
        <button
          type="button"
          disabled={loading}
          onClick={handleCheckout}
          className={cn(
            "w-full rounded-xl py-3 text-sm font-semibold transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed",
            featured
              ? "bg-gradient-to-r from-hydra-500 to-hydra-600 text-white shadow-md shadow-hydra-500/25 hover:shadow-lg hover:shadow-hydra-500/30 hover:brightness-105"
              : "border border-hydra-200 bg-hydra-50 text-hydra-700 hover:bg-hydra-100 hover:border-hydra-300"
          )}
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Redirecting…
            </span>
          ) : (
            cta
          )}
        </button>
      </div>
    </motion.div>
  );
}
