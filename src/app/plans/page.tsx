import { ArrowRight, Sparkles, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { plans, addOns } from "@/lib/data/plans";
import { PlanCard } from "@/components/PlanCard";
import { PricingTable } from "@/components/PricingTable";
import { AuroraBackground } from "@/components/graphics/AuroraBackground";
import { NoiseOverlay } from "@/components/graphics/NoiseOverlay";
import { GradientOrb } from "@/components/graphics/GradientOrb";
import { FadeIn } from "@/components/FadeIn";
import { OpenChatButton } from "@/components/OpenChatButton";

/* ------------------------------------------------------------------ */
/*  Plans & Pricing Page                                               */
/* ------------------------------------------------------------------ */

export default function PlansPage() {
  return (
    <>
      {/* ============================================================ */}
      {/*  1. HERO HEADER                                              */}
      {/* ============================================================ */}
      <section
        className="relative overflow-hidden bg-gradient-to-b from-hydra-50/60 to-white py-24 md:py-32"
        aria-label="Plans hero"
      >
        <AuroraBackground className="opacity-60" />
        <NoiseOverlay />
        <GradientOrb className="top-[-10%] left-[-8%]" size="lg" />
        <GradientOrb className="right-[-6%] bottom-[10%]" size="md" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-[3.4rem]">
                Plans{" "}
                <span className="text-hydra-500">&amp; Pricing</span>
              </h1>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="mt-5 text-lg leading-relaxed text-slate-light sm:text-xl">
                Straightforward pricing with everything included. No hidden fees,
                no surprises.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. PLAN CARDS                                               */}
      {/* ============================================================ */}
      <section
        className="relative bg-white py-16 md:py-24"
        aria-label="Plan options"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {plans.map((plan, index) => (
              <PlanCard key={plan.id} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  3. COMPARISON TABLE                                         */}
      {/* ============================================================ */}
      <section
        className="bg-white py-16 md:py-24 border-t border-border-light"
        aria-label="Compare plans"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <FadeIn className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Compare Plans
            </h2>
            <p className="mt-3 text-base text-slate-light sm:text-lg">
              See exactly what&apos;s included in each tier.
            </p>
          </FadeIn>

          <PricingTable />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. ADD-ONS                                                  */}
      {/* ============================================================ */}
      <section
        className="bg-white py-16 md:py-24"
        aria-label="Optional add-ons"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <FadeIn className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Optional Add-Ons
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-base text-slate-light sm:text-lg">
              Need something extra? These services can be added to any plan.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {addOns.map((addOn, i) => (
              <FadeIn key={addOn.id} delay={i * 80}>
                <div
                  className={cn(
                    "group rounded-xl border border-border-light bg-white p-6",
                    "transition-all duration-300",
                    "hover:-translate-y-0.5 hover:border-hydra-200 hover:shadow-md hover:shadow-hydra-100/30"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 shrink-0 text-hydra-400" />
                        <h3 className="text-base font-semibold text-navy">
                          {addOn.name}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-light">
                        {addOn.description}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1 rounded-lg bg-hydra-50 px-3 py-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-hydra-600" />
                      <span className="text-sm font-semibold text-hydra-700">
                        {addOn.price.replace(/^\$/, "").replace(/^Starting at \$/, "")}
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. PRICING DISCLAIMER                                       */}
      {/* ============================================================ */}
      <section className="bg-white pb-4 pt-0" aria-label="Pricing disclaimer">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <p className="text-center text-sm leading-relaxed text-slate-light">
            All prices are starting rates and may vary based on pool size,
            condition, and location. Contact us for a personalized quote. No
            long-term contracts &mdash; cancel anytime with 30 days notice.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  6. CUSTOM QUOTE CTA                                         */}
      {/* ============================================================ */}
      <section
        className="relative overflow-hidden bg-white py-20 md:py-28"
        aria-label="Request a custom quote"
      >
        <AuroraBackground className="opacity-50" />
        <NoiseOverlay />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              Need a Custom Quote?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-light sm:text-xl">
              Every pool is different. Tell us about yours and we&apos;ll build
              a plan that fits.
            </p>

            <div className="mt-8">
              <OpenChatButton
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-xl bg-hydra-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-hydra-500/25 cursor-pointer",
                  "transition-all duration-200 ease-out",
                  "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-hydra-500/30 hover:brightness-105",
                  "active:scale-[0.98]",
                  "focus-visible:ring-2 focus-visible:ring-hydra-500 focus-visible:ring-offset-2"
                )}
              >
                Request a Quote
                <ArrowRight className="h-4.5 w-4.5" />
              </OpenChatButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
