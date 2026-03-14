"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Phone, ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { serviceAreas } from "@/lib/data/areas";
import { siteConfig } from "@/lib/data/site";
import { AnimatedServiceMap } from "@/components/AnimatedServiceMap";
import { AuroraBackground } from "@/components/graphics/AuroraBackground";
import { NoiseOverlay } from "@/components/graphics/NoiseOverlay";
import { GradientOrb } from "@/components/graphics/GradientOrb";

/* ------------------------------------------------------------------ */
/*  Map positions (same as home page)                                  */
/* ------------------------------------------------------------------ */

const areaMapPositions: Record<string, { cx: number; cy: number }> = {
  celina: { cx: 200, cy: 60 },
  prosper: { cx: 260, cy: 110 },
  "little-elm": { cx: 130, cy: 160 },
  frisco: { cx: 250, cy: 190 },
  "the-colony": { cx: 130, cy: 240 },
  mckinney: { cx: 370, cy: 150 },
  allen: { cx: 370, cy: 220 },
  plano: { cx: 310, cy: 280 },
  murphy: { cx: 420, cy: 290 },
  richardson: { cx: 310, cy: 320 },
};

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                   */
/* ------------------------------------------------------------------ */

const sectionFade = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

/* ================================================================== */
/*  Page Component                                                      */
/* ================================================================== */

export default function AreasPage() {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  return (
    <>
      {/* ============================================================ */}
      {/*  1. HERO HEADER                                               */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-hydra-50/60 to-white py-24 md:py-32">
        <AuroraBackground className="opacity-60" />
        <NoiseOverlay />
        <GradientOrb className="top-[-10%] left-[-8%]" size="lg" />
        <GradientOrb className="right-[-6%] bottom-[10%]" size="md" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mx-auto max-w-3xl"
          >
            <motion.h1
              variants={staggerItem}
              className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-[3.4rem]"
            >
              Service <span className="text-hydra-500">Areas</span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-light sm:text-xl"
            >
              We serve Frisco, TX and nearby communities across the DFW
              metroplex.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. ANIMATED MAP                                              */}
      {/* ============================================================ */}
      <section className="relative bg-white py-16 md:py-24 border-t border-border-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Where We Operate
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate">
              Our service network radiates from our Frisco headquarters to
              surrounding cities in the DFW area.
            </p>
          </motion.div>

          {/* Animated map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="mt-12"
          >
            <AnimatedServiceMap
              areas={serviceAreas}
              positions={areaMapPositions}
              hoveredArea={hoveredArea}
              onAreaHover={setHoveredArea}
            />
          </motion.div>

          {/* Area pills with hover interaction */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            {serviceAreas.map((area) => {
              const isHovered = hoveredArea === area.id;
              return (
                <motion.span
                  key={area.id}
                  variants={staggerItem}
                  onMouseEnter={() => setHoveredArea(area.id)}
                  onMouseLeave={() => setHoveredArea(null)}
                  className={cn(
                    "inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                    area.primary
                      ? "bg-hydra-500 text-white shadow-md shadow-hydra-500/20"
                      : isHovered
                        ? "border border-hydra-400 bg-hydra-50 text-hydra-700 shadow-md shadow-hydra-200/30 -translate-y-0.5"
                        : "border border-border-light bg-white text-slate hover:border-hydra-300"
                  )}
                >
                  <MapPin className={cn(
                    "h-3.5 w-3.5 transition-colors duration-200",
                    area.primary ? "text-white" : isHovered ? "text-hydra-600" : "text-hydra-400"
                  )} />
                  {area.name}, {area.state}
                </motion.span>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  3. ALL SERVICE AREAS GRID                                    */}
      {/* ============================================================ */}
      <section className="bg-white py-16 md:py-24 border-t border-border-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-10 text-center"
          >
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              All Service Areas
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate">
              Browse the communities we proudly serve.
            </p>
          </motion.div>

          <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-10">
            {/* Area cards grid — all uniform */}
            <motion.div
              className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {serviceAreas.map((area) => (
                <Link key={area.id} href={`/areas/${area.id}`}>
                  <motion.div
                    variants={staggerItem}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border border-border-light bg-white p-5",
                      "shadow-sm transition-shadow duration-200 hover:shadow-md hover:border-hydra-300",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-hydra-50 text-hydra-600">
                        <MapPin className="h-4 w-4" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-navy group-hover:text-hydra-600 transition-colors">
                          {area.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-slate-light">
                          {area.state}
                        </p>
                        {area.description && (
                          <p className="mt-2 text-xs leading-relaxed text-slate-light">
                            {area.description}
                          </p>
                        )}
                        <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-hydra-600">
                          View details <ChevronRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>

            {/* Sticky CTA sidebar (desktop) */}
            <motion.aside
              variants={sectionFade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="hidden lg:block"
            >
              <div
                className={cn(
                  "sticky top-28 rounded-xl border border-border-light bg-white p-6 shadow-sm",
                )}
              >
                <h3 className="text-lg font-semibold text-navy">
                  Ready to get started?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  Get a free, no-obligation quote for your pool service
                  today.
                </p>

                <Link
                  href="/#get-quote"
                  className={cn(
                    "mt-5 flex w-full items-center justify-center gap-2 rounded-xl",
                    "bg-hydra-500 px-5 py-3 text-sm font-semibold text-white",
                    "transition-colors duration-200 hover:bg-hydra-600",
                  )}
                >
                  Get a Quote
                  <ChevronRight className="h-4 w-4" />
                </Link>

                <a
                  href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                  className={cn(
                    "mt-3 flex w-full items-center justify-center gap-2 rounded-xl",
                    "border border-border-light bg-white px-5 py-3 text-sm font-semibold text-navy",
                    "transition-colors duration-200 hover:bg-hydra-50",
                  )}
                >
                  <Phone className="h-4 w-4 text-hydra-500" />
                  {siteConfig.phone}
                </a>

                <p className="mt-4 text-center text-xs text-slate-light">
                  {siteConfig.hours}
                </p>
              </div>
            </motion.aside>
          </div>

          {/* Mobile CTA */}
          <motion.div
            variants={sectionFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-10 text-center lg:hidden"
          >
            <Link
              href="/#get-quote"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-xl",
                "bg-hydra-500 px-6 py-3 text-sm font-semibold text-white",
                "transition-colors duration-200 hover:bg-hydra-600",
              )}
            >
              Get a Quote
              <ChevronRight className="h-4 w-4" />
            </Link>

            <div className="mt-3">
              <a
                href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                className={cn(
                  "inline-flex items-center gap-2 text-sm font-semibold text-navy",
                  "transition-colors duration-200 hover:text-hydra-600",
                )}
              >
                <Phone className="h-4 w-4 text-hydra-500" />
                {siteConfig.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. DON'T SEE YOUR AREA?                                     */}
      {/* ============================================================ */}
      <section className="relative bg-white py-20 md:py-28 border-t border-border-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={staggerItem}
              className="text-3xl font-bold tracking-tight text-navy sm:text-4xl"
            >
              Don&rsquo;t See Your Area?
            </motion.h2>

            <motion.p
              variants={staggerItem}
              className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate"
            >
              We&rsquo;re expanding! Contact us to check availability in your
              neighborhood.
            </motion.p>

            <motion.div variants={staggerItem} className="mt-8">
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl",
                  "bg-hydra-500 px-7 py-3.5 text-sm font-semibold text-white",
                  "shadow-lg shadow-hydra-500/25",
                  "transition-all duration-200 hover:bg-hydra-600 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-hydra-500/30",
                )}
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
