"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Eye,
  Server,
  FileCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AuroraBackground } from "@/components/graphics/AuroraBackground";
import { NoiseOverlay } from "@/components/graphics/NoiseOverlay";
import { GradientOrb } from "@/components/graphics/GradientOrb";

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
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const securityFeatures = [
  {
    icon: Lock,
    title: "256-bit SSL Encryption",
    description:
      "Every transaction is protected with bank-level SSL encryption. Your data is never exposed.",
  },
  {
    icon: Shield,
    title: "PCI DSS Compliant",
    description:
      "We are fully PCI DSS compliant. Your card information is handled according to the highest industry security standards.",
  },
  {
    icon: Eye,
    title: "We Never See Your Card",
    description:
      "Card details are entered directly on Stripe's secure servers. Our team never has access to your full card number.",
  },
  {
    icon: Server,
    title: "Powered by Stripe",
    description:
      "We use Stripe — the same payment processor trusted by Amazon, Google, and millions of businesses worldwide.",
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Click the Button Below",
    description: "You'll be redirected to Stripe's secure checkout page.",
  },
  {
    step: "2",
    title: "Enter Your Card Details",
    description:
      "Your information is entered directly on Stripe's PCI-certified platform — we never see it.",
  },
  {
    step: "3",
    title: "You're All Set",
    description:
      "Your card is securely saved on file. We'll only charge for services you've approved.",
  },
];

const trustPoints = [
  "No hidden fees or surprise charges",
  "Cancel anytime — no contracts",
  "Charges only for approved services",
  "Instant email receipts for every transaction",
  "Secure card storage via Stripe vault",
  "24/7 account access through Stripe",
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PaymentsPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleCardOnFile() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error);
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section
        className="relative overflow-hidden bg-gradient-to-b from-hydra-50/60 to-white py-24 md:py-32"
        aria-label="Payments hero"
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
            <motion.div variants={fadeUp} className="mb-5 flex items-center justify-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-hydra-100">
                <Shield className="h-5 w-5 text-hydra-600" strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider text-hydra-600">
                Secure Payments
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-[3.4rem]"
            >
              Simple & Secure{" "}
              <span className="text-hydra-500">Card on File</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-lg leading-relaxed text-slate-light sm:text-xl"
            >
              Save your payment method securely so we can bill for approved
              services. No surprises, no hassle — just seamless pool care.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8">
              <button
                type="button"
                disabled={isLoading}
                onClick={handleCardOnFile}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-xl bg-hydra-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-hydra-500/25 cursor-pointer",
                  "transition-all duration-200 ease-out",
                  "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-hydra-500/30 hover:brightness-105",
                  "active:scale-[0.98]",
                  "focus-visible:ring-2 focus-visible:ring-hydra-500 focus-visible:ring-offset-2",
                  isLoading && "opacity-60 cursor-wait"
                )}
              >
                <CreditCard className="h-5 w-5" />
                {isLoading ? "Redirecting to Stripe..." : "Get Your Card on File"}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </button>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-4 flex items-center justify-center gap-1.5 text-sm text-slate-light"
            >
              <Lock className="h-3.5 w-3.5" />
              Secured by Stripe &middot; 256-bit SSL encrypted
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  HOW IT WORKS                                                */}
      {/* ============================================================ */}
      <section
        className="bg-white py-16 md:py-24 border-t border-border-light"
        aria-label="How it works"
      >
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-3 text-base text-slate-light sm:text-lg">
              Getting your card on file takes less than 2 minutes.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid gap-8 md:grid-cols-3"
          >
            {howItWorks.map((item) => (
              <motion.div
                key={item.step}
                variants={cardFadeUp}
                className="relative rounded-2xl border border-border-light bg-white p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-hydra-50">
                  <span className="text-lg font-bold text-hydra-600">
                    {item.step}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-light">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECURITY & COMPLIANCE                                       */}
      {/* ============================================================ */}
      <section
        className="bg-white py-16 md:py-24 border-t border-border-light"
        aria-label="Security and compliance"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Your Security Is Our Priority
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-slate-light sm:text-lg">
              We take payment security seriously. Here&apos;s how we protect
              your information at every step.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {securityFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={cardFadeUp}
                  className={cn(
                    "group rounded-2xl border border-border-light bg-white p-6",
                    "transition-all duration-300",
                    "hover:-translate-y-0.5 hover:border-hydra-200 hover:shadow-md hover:shadow-hydra-100/30"
                  )}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-hydra-50">
                    <Icon
                      className="h-6 w-6 text-hydra-600"
                      strokeWidth={1.75}
                    />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-navy">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-light">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PCI COMPLIANCE BANNER                                       */}
      {/* ============================================================ */}
      <section className="bg-white py-16 md:py-20 border-t border-border-light">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="rounded-2xl border border-hydra-200 bg-gradient-to-br from-hydra-50/80 to-white p-8 md:p-10"
          >
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-hydra-100">
                <FileCheck
                  className="h-8 w-8 text-hydra-600"
                  strokeWidth={1.75}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy">
                  PCI DSS Level 1 Compliant
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-light">
                  All payments are processed through Stripe, a certified{" "}
                  <strong className="text-navy">
                    PCI Service Provider Level 1
                  </strong>{" "}
                  — the most rigorous level of certification in the payments
                  industry. Your card data is tokenized and stored in
                  Stripe&apos;s PCI-compliant vault. We never store, process, or
                  have access to your full card number.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TRUST POINTS                                                */}
      {/* ============================================================ */}
      <section
        className="bg-white py-16 md:py-24 border-t border-border-light"
        aria-label="Our promise"
      >
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-10 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Our Promise to You
            </h2>
            <p className="mt-3 text-base text-slate-light sm:text-lg">
              Transparency and trust are the foundation of our service.
            </p>
          </motion.div>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {trustPoints.map((point) => (
              <motion.li
                key={point}
                variants={cardFadeUp}
                className="flex items-start gap-3 rounded-xl border border-border-light bg-white p-4"
              >
                <CheckCircle
                  className="mt-0.5 h-5 w-5 shrink-0 text-hydra-500"
                  strokeWidth={2}
                />
                <span className="text-sm font-medium text-navy">{point}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FINAL CTA                                                   */}
      {/* ============================================================ */}
      <section
        className="relative overflow-hidden bg-white py-20 md:py-28 border-t border-border-light"
        aria-label="Get your card on file"
      >
        <AuroraBackground className="opacity-50" />
        <NoiseOverlay />

        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-light">
              Save your card securely in under 2 minutes. No charges until
              you&apos;ve approved a service.
            </p>

            <div className="mt-8">
              <button
                type="button"
                disabled={isLoading}
                onClick={handleCardOnFile}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-xl bg-hydra-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-hydra-500/25 cursor-pointer",
                  "transition-all duration-200 ease-out",
                  "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-hydra-500/30 hover:brightness-105",
                  "active:scale-[0.98]",
                  "focus-visible:ring-2 focus-visible:ring-hydra-500 focus-visible:ring-offset-2",
                  isLoading && "opacity-60 cursor-wait"
                )}
              >
                <CreditCard className="h-5 w-5" />
                {isLoading ? "Redirecting to Stripe..." : "Get Your Card on File"}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-slate-light">
              <Lock className="h-3.5 w-3.5" />
              Secured by Stripe &middot; 256-bit SSL &middot; PCI DSS Compliant
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
