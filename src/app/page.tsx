"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  ArrowRight,
  Phone,
  CheckCircle,
  ChevronRight,
  ClipboardList,
  CalendarCheck,
  CameraIcon,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Component imports ── */
import { Hero } from "@/components/Hero";
import { ServiceCard } from "@/components/ServiceCard";
import { PlanCard } from "@/components/PlanCard";
import { FAQ } from "@/components/FAQ";
import { AuroraBackground } from "@/components/graphics/AuroraBackground";
import { NoiseOverlay } from "@/components/graphics/NoiseOverlay";
import { RippleLines } from "@/components/graphics/RippleLines";
import { GradientOrb } from "@/components/graphics/GradientOrb";
import { GetQuoteForm } from "@/components/GetQuoteForm";
import { AnimatedServiceMap } from "@/components/AnimatedServiceMap";
import { TrackedContactLink } from "@/components/TrackedContactLink";

/* ── Data imports ── */
import { services } from "@/lib/data/services";
import { plans } from "@/lib/data/plans";
import { faqs } from "@/lib/data/faqs";
import { serviceAreas } from "@/lib/data/areas";
import { siteConfig } from "@/lib/data/site";

/* ------------------------------------------------------------------ */
/*  Shared animation helpers                                           */
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
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Neighborhood "logos" for social proof                               */
/* ------------------------------------------------------------------ */

const communityLogos = [
  "Phillips Creek",
  "Richwoods",
  "Starwood",
  "Stonebridge",
  "Craig Ranch",
  "Plantation",
  "Windsong Ranch",
] as const;

/* ------------------------------------------------------------------ */
/*  Before & After showcase captions                                   */
/* ------------------------------------------------------------------ */


/* ------------------------------------------------------------------ */
/*  How It Works steps                                                 */
/* ------------------------------------------------------------------ */

const howItWorksSteps = [
  {
    number: 1,
    title: "Get a Quote",
    description:
      "Tell us about your pool and we\u2019ll send a clear, detailed quote.",
    icon: ClipboardList,
  },
  {
    number: 2,
    title: "We Schedule Your Day",
    description:
      "Pick a weekly service day that works for your household.",
    icon: CalendarCheck,
  },
  {
    number: 3,
    title: "We Service & Send Updates",
    description:
      "Every visit includes cleaning, chemicals, and a photo report.",
    icon: CameraIcon,
  },
  {
    number: 4,
    title: "Your Pool Stays Swim-Ready",
    description:
      "Consistent care means your pool is always ready to enjoy.",
    icon: Sparkles,
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Service area positions for the abstract map graphic                */
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

/* ================================================================== */
/*  HOME PAGE                                                          */
/* ================================================================== */

export default function HomePage() {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  const faqJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    }),
    []
  );

  const howToJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Get Professional Pool Service in Frisco, TX",
      description:
        "Follow these 4 simple steps to get professional weekly pool maintenance from Hydra Pool Services in Frisco and North DFW.",
      step: howItWorksSteps.map((step) => ({
        "@type": "HowToStep",
        position: step.number,
        name: step.title,
        text: step.description,
        url: `${siteConfig.url}/#get-quote`,
      })),
    }),
    []
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      {/* ============================================================ */}
      {/* 1. HERO SECTION                                               */}
      {/* ============================================================ */}
      <Hero />

      {/* ============================================================ */}
      {/* GOOGLE RATING BADGE                                            */}
      {/* ============================================================ */}
      <section className="bg-white py-6 border-t border-border-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionFade}
            className="flex items-center justify-center"
          >
            <div className="flex items-center gap-2.5 rounded-full border border-border-light bg-white px-5 py-2.5 shadow-sm">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-label="Google">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-lg font-bold text-navy">4.9</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm text-slate-light">on Google</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* GET A QUOTE                                                    */}
      {/* ============================================================ */}
      <section
        id="get-quote"
        className="relative bg-white py-16 md:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold text-navy md:text-4xl">
              Get a Free Quote
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate">
              Tell us about your pool and we&apos;ll send you a clear,
              no-obligation quote.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionFade}
            className="mx-auto mt-10 max-w-2xl"
          >
            <GetQuoteForm />
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. SOCIAL PROOF STRIP                                         */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16 border-t border-border-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="flex flex-col items-center gap-8"
          >
            {/* Heading text */}
            <p className="text-center text-sm font-medium tracking-wide text-slate-light uppercase">
              Trusted by pool owners across Frisco and nearby communities
            </p>

            {/* Community "logo" pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {communityLogos.map((name) => (
                <span
                  key={name}
                  className={cn(
                    "inline-flex items-center rounded-full border border-border-light bg-white px-5 py-2",
                    "text-sm font-medium text-gray-400 select-none"
                  )}
                >
                  {name}
                </span>
              ))}
            </div>

            {/* 4.9 average rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-navy">
                4.9 average
              </span>
              <span className="text-sm text-slate-light">
                from local homeowners
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. PLANS & PRICING PREVIEW                                    */}
      {/* ============================================================ */}
      <section className="relative bg-white py-20 md:py-28 border-t border-border-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-navy md:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate">
              Every plan includes weekly cleaning, chemicals, and clear
              communication. No hidden fees.
            </p>
          </motion.div>

          {/* Plan cards grid */}
          <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
            {plans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>

          {/* Link to full plans page */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="mt-12 text-center"
          >
            <Link
              href="/plans"
              className={cn(
                "inline-flex items-center gap-2 text-sm font-semibold text-hydra-600",
                "transition-colors duration-200 hover:text-hydra-700"
              )}
            >
              See Full Plans
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. SERVICES OVERVIEW                                          */}
      {/* ============================================================ */}
      <section className="relative bg-white py-20 md:py-28 border-t border-border-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-navy md:text-4xl">
              What We Take Care Of
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate">
              From weekly cleaning to equipment support, we handle it all so you
              don&apos;t have to.
            </p>
          </motion.div>

          {/* Service cards — 2x2 grid (1 col on mobile) */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 md:gap-8">
            {services.map((service, i) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.shortDescription}
                icon={service.icon}
                bullets={service.bullets}
                index={i}
                href={`/services/${service.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. HOW IT WORKS                                               */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28 border-t border-border-light">

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-navy md:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate">
              Getting started is simple.
            </p>
          </motion.div>

          {/* Timeline / steps */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="relative mx-auto mt-16 max-w-3xl"
          >
            {/* Vertical connecting line */}
            <div
              aria-hidden
              className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-hydra-200 via-hydra-300 to-hydra-200 md:left-8 md:block"
            />

            <div className="flex flex-col gap-12">
              {howItWorksSteps.map((step) => {
                const StepIcon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    variants={staggerItem}
                    className="relative flex gap-5 md:gap-7"
                  >
                    {/* Number circle */}
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-hydra-500 text-lg font-bold text-white shadow-lg shadow-hydra-500/25 md:h-16 md:w-16 md:text-xl">
                      {step.number}
                    </div>

                    {/* Content */}
                    <div className="pt-1 md:pt-3">
                      <div className="flex items-center gap-2">
                        <StepIcon className="h-5 w-5 text-hydra-500" />
                        <h3 className="text-lg font-semibold text-navy">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-slate md:text-base">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. SERVICE AREAS                                              */}
      {/* ============================================================ */}
      <section className="relative bg-white py-20 md:py-28 border-t border-border-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="text-center"
          >
            <p className="mb-3 text-sm font-semibold tracking-wider text-hydra-500 uppercase">
              Service Coverage
            </p>
            <h2 className="text-3xl font-bold text-navy md:text-4xl">
              Serving Frisco &amp; Nearby Communities
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate">
              We proudly serve {serviceAreas.length} cities across the north DFW
              metroplex.
            </p>
          </motion.div>

          {/* Animated map graphic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="mt-14"
          >
            <AnimatedServiceMap
              areas={serviceAreas}
              positions={areaMapPositions}
              hoveredArea={hoveredArea}
              onAreaHover={setHoveredArea}
            />
          </motion.div>

          {/* Area name pills */}
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

          {/* CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="mt-10 text-center"
          >
            <Link
              href="/areas"
              className={cn(
                "inline-flex items-center gap-2 text-sm font-semibold text-hydra-600",
                "transition-colors duration-200 hover:text-hydra-700"
              )}
            >
              Check Your Area
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. BEFORE & AFTER                                              */}
      {/* ============================================================ */}
      <section className="relative bg-white py-20 md:py-28 border-t border-border-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="text-center"
          >
            <p className="mb-3 text-sm font-semibold tracking-wider text-hydra-500 uppercase">
              Real Results
            </p>
            <h2 className="text-3xl font-bold text-navy md:text-4xl">
              See the Transformation
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate">
              Same pool, same backyard &mdash; just one service visit apart.
            </p>
          </motion.div>

          {/* Before / After cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="mt-14 grid gap-8 sm:grid-cols-2"
          >
            {/* Before */}
            <motion.div variants={staggerItem} className="group relative overflow-hidden rounded-2xl border border-border-light">
              <div className="relative aspect-[4/3] overflow-hidden bg-hydra-50">
                <Image
                  src="/pool-before.webp"
                  alt="Pool before cleaning — murky water and debris"
                  width={960}
                  height={720}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <span className="absolute left-4 top-4 rounded-full bg-red-500/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                  Before
                </span>
              </div>
            </motion.div>

            {/* After */}
            <motion.div variants={staggerItem} className="group relative overflow-hidden rounded-2xl border border-border-light">
              <div className="relative aspect-[4/3] overflow-hidden bg-hydra-50">
                <Image
                  src="/pool-after.webp"
                  alt="Pool after cleaning — crystal clear water"
                  width={960}
                  height={720}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <span className="absolute left-4 top-4 rounded-full bg-green-500/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                  After
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. GOOGLE REVIEWS (Elfsight)                                    */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28 border-t border-border-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="text-center"
          >
            <p className="mb-3 text-sm font-semibold tracking-wider text-hydra-500 uppercase">
              Testimonials
            </p>
            <h2 className="text-3xl font-bold text-navy md:text-4xl">
              What Our Customers Say
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate">
              Real reviews from homeowners we serve every week.
            </p>
          </motion.div>

          {/* Elfsight Google Reviews widget */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionFade}
            className="elfsight-theme-wrapper mt-14"
          >
            <Script
              src="https://static.elfsight.com/platform/platform.js"
              strategy="lazyOnload"
            />
            <div
              className="elfsight-app-0118d724-61e6-4d56-9cf9-59424e50bd4f"
              data-elfsight-app-lazy
            />
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. FAQ                                                        */}
      {/* ============================================================ */}
      <section className="relative bg-white py-20 md:py-28 border-t border-border-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-navy md:text-4xl">
              Frequently Asked Questions
            </h2>
          </motion.div>

          {/* FAQ accordion — centered, max-w-3xl */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFade}
            className="mx-auto mt-12 max-w-3xl"
          >
            <FAQ faqs={faqs} />
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. FINAL CTA                                                 */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-white py-24 md:py-32 border-t border-border-light">
        {/* Background effects */}
        <AuroraBackground className="opacity-70" />
        <NoiseOverlay />
        <GradientOrb className="top-[-15%] right-[-10%]" size="lg" />
        <GradientOrb className="bottom-[-10%] left-[-8%]" size="md" />
        <RippleLines className="opacity-30" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="flex flex-col items-center text-center"
          >
            {/* Headline */}
            <motion.h2
              variants={staggerItem}
              className="text-3xl font-bold text-navy sm:text-4xl md:text-5xl"
            >
              Ready for a Consistently Clean Pool?
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              variants={staggerItem}
              className="mx-auto mt-5 max-w-xl text-lg text-slate"
            >
              Join Frisco homeowners who trust Hydra for weekly pool care.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={staggerItem}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              {/* Primary — Get a Quote */}
              <button
                onClick={() =>
                  document
                    .getElementById("get-quote")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-xl bg-hydra-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-hydra-500/25",
                  "transition-all duration-200 ease-out",
                  "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-hydra-500/30",
                  "active:scale-[0.98]",
                  "focus-visible:ring-2 focus-visible:ring-hydra-500 focus-visible:ring-offset-2"
                )}
              >
                Get a Quote
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Secondary — Call Now */}
              <TrackedContactLink
                kind="phone"
                surface="home_hero"
                href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-xl border border-hydra-500 bg-white px-8 py-4 text-sm font-semibold text-hydra-600 shadow-sm",
                  "transition-all duration-200 ease-out",
                  "hover:-translate-y-0.5 hover:shadow-md hover:bg-hydra-50/60",
                  "active:scale-[0.98]",
                  "focus-visible:ring-2 focus-visible:ring-hydra-500 focus-visible:ring-offset-2"
                )}
              >
                <Phone className="h-4 w-4" />
                Call Now
              </TrackedContactLink>
            </motion.div>

            {/* Phone number display */}
            <motion.p
              variants={staggerItem}
              className="mt-6 flex items-center gap-2 text-sm text-slate-light"
            >
              <Phone className="h-3.5 w-3.5 text-hydra-400" />
              {siteConfig.phone}
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
