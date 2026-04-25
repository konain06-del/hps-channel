import Link from "next/link";
import {
  CheckCircle,
  Home,
  Building2,
  Wrench,
  Sparkles,
  GraduationCap,
  FlaskConical,
  HelpCircle,
  Clock,
  Users,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

import { cn } from "@/lib/utils";
import { services } from "@/lib/data/services";
import { addOns } from "@/lib/data/plans";
import { AuroraBackground } from "@/components/graphics/AuroraBackground";
import { NoiseOverlay } from "@/components/graphics/NoiseOverlay";
import { GradientOrb } from "@/components/graphics/GradientOrb";
import { FadeIn } from "@/components/FadeIn";

/* ------------------------------------------------------------------ */
/*  Icon mapping — resolves service.icon string to a Lucide component  */
/* ------------------------------------------------------------------ */

const iconMap: Record<string, ComponentType<LucideProps>> = {
  Home,
  Building2,
  Wrench,
  Sparkles,
  GraduationCap,
  FlaskConical,
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ServicesPage() {
  return (
    <>
      {/* ============================================================ */}
      {/*  1. HERO HEADER                                              */}
      {/* ============================================================ */}
      <section
        className="relative overflow-hidden bg-gradient-to-b from-hydra-50/60 to-white py-24 md:py-32"
        aria-label="Services hero"
      >
        <AuroraBackground className="opacity-60" />
        <NoiseOverlay />
        <GradientOrb className="top-[-10%] left-[-8%]" size="lg" />
        <GradientOrb className="right-[-6%] bottom-[10%]" size="md" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-[3.4rem]">
                Our <span className="text-hydra-500">Services</span>
              </h1>
            </FadeIn>

            <FadeIn delay={100}>
              <p className="mt-5 text-lg leading-relaxed text-slate-light sm:text-xl">
                From weekly cleaning to equipment repairs, we keep your pool in peak
                condition year-round.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. SERVICES DETAIL SECTIONS                                 */}
      {/* ============================================================ */}
      {services.map((service, index) => {
        const isEven = index % 2 === 0;
        const Icon = iconMap[service.icon] ?? HelpCircle;

        return (
          <section
            key={service.id}
            id={service.id}
            className={cn(
              "relative overflow-hidden py-20 md:py-28",
              "bg-white border-t border-border-light"
            )}
          >
            <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
              <div
                className={cn(
                  "grid items-start gap-12 lg:grid-cols-2 lg:gap-20",
                  !isEven && "lg:[direction:rtl]"
                )}
              >
                {/* ---- Text Column ---- */}
                <FadeIn className="lg:[direction:ltr]">
                  {/* Icon + Title */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-hydra-50">
                      <Icon
                        className="h-6 w-6 text-hydra-600"
                        strokeWidth={1.75}
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-navy md:text-3xl">
                      {service.title}
                    </h2>
                  </div>

                  {/* Subtitle */}
                  <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-hydra-600">
                    {service.subtitle}
                  </p>

                  {/* Description */}
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-slate sm:text-lg">
                    {service.description}
                  </p>

                  {/* Info cards — Frequency & Best For */}
                  <div className="mt-8 flex flex-wrap gap-4">
                    <div className="flex items-start gap-3 rounded-xl border border-border-light bg-white px-4 py-3 shadow-sm">
                      <Clock
                        className="mt-0.5 h-5 w-5 shrink-0 text-hydra-500"
                        strokeWidth={1.75}
                      />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-light">
                          Frequency
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-navy">
                          {service.frequency}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-xl border border-border-light bg-white px-4 py-3 shadow-sm">
                      <Users
                        className="mt-0.5 h-5 w-5 shrink-0 text-hydra-500"
                        strokeWidth={1.75}
                      />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-light">
                          Best For
                        </p>
                        <p className="mt-0.5 max-w-xs text-sm font-medium text-navy">
                          {service.bestFor}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-8">
                    <Link
                      href={`/services/${service.id}`}
                      className={cn(
                        "inline-flex items-center justify-center gap-2 rounded-xl bg-hydra-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-hydra-500/25",
                        "transition-all duration-200 ease-out",
                        "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-hydra-500/30",
                        "active:scale-[0.98]",
                        "focus-visible:ring-2 focus-visible:ring-hydra-500 focus-visible:ring-offset-2"
                      )}
                    >
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </FadeIn>

                {/* ---- Checklist Column ---- */}
                <FadeIn delay={150} className="lg:[direction:ltr]">
                  <div
                    className={cn(
                      "rounded-2xl border border-border-light p-6 shadow-sm sm:p-8",
                      "bg-white"
                    )}
                  >
                    <h3 className="mb-5 text-lg font-semibold text-navy">
                      What&apos;s Included
                    </h3>

                    <ul className="flex flex-col gap-3.5">
                      {service.checklist.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-relaxed text-slate sm:text-base"
                        >
                          <CheckCircle
                            className="mt-0.5 h-5 w-5 shrink-0 text-hydra-500"
                            strokeWidth={2}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>
        );
      })}

      {/* ============================================================ */}
      {/*  MAINTENANCE ADD-ONS                                         */}
      {/* ============================================================ */}
      <section
        className="bg-white py-20 md:py-28 border-t border-border-light"
        aria-label="Maintenance add-ons"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* Section heading */}
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Maintenance Add-ons
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-light">
              One-time services available with any plan or as standalone.
            </p>
          </FadeIn>

          {/* Add-ons grid */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {addOns.map((addOn, i) => (
              <FadeIn key={addOn.id} delay={i * 80}>
                <div
                  className={cn(
                    "rounded-2xl border border-border-light bg-white p-6 shadow-sm",
                    "transition-all duration-200 ease-out",
                    "hover:-translate-y-0.5 hover:border-hydra-200 hover:shadow-md"
                  )}
                >
                  {/* Icon + Name */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hydra-50">
                      <Sparkles
                        className="h-5 w-5 text-hydra-600"
                        strokeWidth={1.75}
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-navy">
                      {addOn.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-slate">
                    {addOn.description}
                  </p>

                  {/* Price pill */}
                  <div className="mt-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full bg-hydra-50 px-3.5 py-1.5 text-sm font-semibold text-hydra-600"
                      )}
                    >
                      <DollarSign className="h-4 w-4" strokeWidth={2} />
                      {addOn.price}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  3. FINAL CTA SECTION                                        */}
      {/* ============================================================ */}
      <section
        className="relative overflow-hidden bg-white py-24 md:py-32"
        aria-label="Call to action"
      >
        <AuroraBackground className="opacity-50" />
        <NoiseOverlay />
        <GradientOrb className="top-[-10%] left-[20%]" size="lg" />
        <GradientOrb className="bottom-[-8%] right-[15%]" size="md" />

        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              Need Help with Your Pool?
            </h2>
          </FadeIn>

          <FadeIn delay={120}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-light">
              Get a free, no-obligation quote and we&apos;ll take it from there.
            </p>
          </FadeIn>

          <FadeIn delay={240}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center justify-center rounded-xl bg-hydra-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-hydra-500/25",
                  "transition-all duration-200 ease-out",
                  "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-hydra-500/30",
                  "active:scale-[0.98]",
                  "focus-visible:ring-2 focus-visible:ring-hydra-500 focus-visible:ring-offset-2"
                )}
              >
                Get a Quote
              </Link>

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
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
