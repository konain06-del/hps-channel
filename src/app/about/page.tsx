"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Shield,
  Clock,
  MessageCircle,
  Droplets,
  Heart,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AuroraBackground } from "@/components/graphics/AuroraBackground";
import { NoiseOverlay } from "@/components/graphics/NoiseOverlay";
import { GradientOrb } from "@/components/graphics/GradientOrb";
import { siteConfig } from "@/lib/data/site";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const fadeUp = {
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
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardFadeUp = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Standards data                                                     */
/* ------------------------------------------------------------------ */

const standards = [
  {
    title: "Consistent Weekly Visits",
    description:
      "Same day, same tech, every week. You can count on it.",
    icon: Clock,
  },
  {
    title: "Clear Communication",
    description:
      "Visit reports with photos after every service. Always know what was done.",
    icon: MessageCircle,
  },
  {
    title: "Professional Technicians",
    description:
      "Trained, background-checked techs who treat your property with respect.",
    icon: Shield,
  },
  {
    title: "Quality Chemicals",
    description:
      "Professional-grade chemicals included in every plan. You never buy your own.",
    icon: Droplets,
  },
  {
    title: "Transparent Billing",
    description:
      "Simple monthly billing, no hidden fees, no long-term contracts.",
    icon: CheckCircle,
  },
  {
    title: "Customer First",
    description:
      "Your satisfaction drives every decision we make. We're here to earn your trust.",
    icon: Heart,
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Photo placeholder data                                             */
/* ------------------------------------------------------------------ */

const photoItems = [
  { image: "/about-1.jpeg", caption: "Crystal-clear results after every service" },
  { image: "/about-2.jpeg", caption: "Professional care you can count on" },
  { image: "/about-3.jpeg", caption: "Clean, balanced, swim-ready pools" },
] as const;

/* ------------------------------------------------------------------ */
/*  About Page                                                         */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  return (
    <>
      {/* ============================================================ */}
      {/*  1. HERO HEADER                                               */}
      {/* ============================================================ */}
      <section
        className="relative overflow-hidden bg-gradient-to-b from-hydra-50/60 to-white py-24 md:py-32"
        aria-label="About hero"
      >
        <AuroraBackground className="opacity-60" />
        <NoiseOverlay />
        <GradientOrb className="top-[-10%] left-[-8%]" size="lg" />
        <GradientOrb className="right-[-6%] bottom-[10%]" size="md" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.h1
              variants={fadeUp}
              className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-[3.4rem]"
            >
              About{" "}
              <span className="text-hydra-500">{siteConfig.name}</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-lg leading-relaxed text-slate-light sm:text-xl"
            >
              Local, consistent pool care built on trust and clear
              communication.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. OUR STORY                                                 */}
      {/* ============================================================ */}
      <section className="bg-white py-20 md:py-28" aria-label="Our story">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* ---- Left: Story text ---- */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="max-w-xl"
            >
              <motion.h2
                variants={fadeUp}
                className="text-3xl font-bold tracking-tight text-navy sm:text-4xl"
              >
                Our Story
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-base leading-relaxed text-slate sm:text-lg"
              >
                {siteConfig.name} was built on a simple idea: pool owners in
                Frisco deserve reliable, professional service with clear
                communication and no surprises.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mt-4 text-base leading-relaxed text-slate sm:text-lg"
              >
                We saw too many pool companies that would skip visits, leave
                pools unbalanced, and make it impossible to get answers. We
                started Hydra to be the kind of service we&rsquo;d want for our
                own pools &mdash; consistent, thorough, and easy to work with.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mt-4 text-base leading-relaxed text-slate sm:text-lg"
              >
                Every week, our technicians follow the same detailed process for
                every pool. We test, clean, balance, and report &mdash; so you
                always know exactly what was done and what condition your pool is
                in.
              </motion.p>
            </motion.div>

            {/* ---- Right: Photo placeholder ---- */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
              }}
              className="flex items-center justify-center"
            >
              <div className="aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-border-light">
                <Image
                  src="/about-hero.jpeg"
                  alt="Hydra Pool Services — sparkling clean pool"
                  width={640}
                  height={480}
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  3. OUR STANDARDS                                             */}
      {/* ============================================================ */}
      <section
        className="bg-white py-20 md:py-28 border-t border-border-light"
        aria-label="Our standards"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Our Standards
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-light sm:text-lg">
              Everything we do is guided by six principles that keep our
              customers happy and their pools pristine.
            </p>
          </motion.div>

          {/* Standards grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {standards.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={cardFadeUp}
                  className={cn(
                    "group flex flex-col rounded-xl border border-border-light bg-white p-6",
                    "transition-all duration-300",
                    "hover:border-hydra-300 hover:shadow-lg hover:shadow-hydra-100/40"
                  )}
                >
                  {/* Icon circle */}
                  <div
                    className={cn(
                      "mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-hydra-50",
                      "transition-transform duration-300",
                      "group-hover:-translate-y-0.5"
                    )}
                  >
                    <Icon
                      className="h-6 w-6 text-hydra-600"
                      strokeWidth={1.75}
                    />
                  </div>

                  {/* Text */}
                  <h3 className="mb-2 text-lg font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. PHOTO PLACEHOLDERS — The Hydra Difference                 */}
      {/* ============================================================ */}
      <section
        className="bg-white py-20 md:py-28"
        aria-label="The Hydra Difference"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              The Hydra Difference
            </h2>
          </motion.div>

          {/* Photo cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {photoItems.map((item) => (
              <motion.div key={item.caption} variants={cardFadeUp}>
                <div className="aspect-video w-full overflow-hidden rounded-xl border border-border-light">
                  <Image
                    src={item.image}
                    alt={item.caption}
                    width={640}
                    height={360}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-3 text-center text-sm font-medium text-slate">
                  {item.caption}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. CTA SECTION                                               */}
      {/* ============================================================ */}
      <section
        className="relative overflow-hidden bg-white py-24 md:py-32"
        aria-label="Call to action"
      >
        <AuroraBackground className="opacity-60" />
        <NoiseOverlay />
        <GradientOrb className="top-[-15%] right-[-5%]" size="lg" />
        <GradientOrb className="bottom-[-10%] left-[-8%]" size="md" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="text-balance text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-5xl"
            >
              Ready to Experience the Difference?
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-lg leading-relaxed text-slate-light sm:text-xl"
            >
              Join Frisco homeowners who trust Hydra for weekly pool care.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              {/* Primary CTA */}
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-xl bg-hydra-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-hydra-500/25",
                  "transition-all duration-200 ease-out",
                  "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-hydra-500/30",
                  "active:scale-[0.98]",
                  "focus-visible:ring-2 focus-visible:ring-hydra-500 focus-visible:ring-offset-2"
                )}
              >
                Get a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* Secondary CTA */}
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
          </motion.div>
        </div>
      </section>
    </>
  );
}
