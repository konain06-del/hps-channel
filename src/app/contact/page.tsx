import { Phone, Mail, MapPin, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/data/site";
import { AuroraBackground } from "@/components/graphics/AuroraBackground";
import { NoiseOverlay } from "@/components/graphics/NoiseOverlay";
import { GradientOrb } from "@/components/graphics/GradientOrb";
import { GetQuoteForm } from "@/components/GetQuoteForm";
import { FadeIn } from "@/components/FadeIn";

/* ------------------------------------------------------------------ */
/*  Contact info cards data                                            */
/* ------------------------------------------------------------------ */

const contactCards = [
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`,
    note: "Call us anytime",
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    note: "We respond within 24 hours",
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.address,
    href: undefined,
    note: "Serving Frisco & nearby communities",
  },
  {
    icon: Clock,
    label: "Hours",
    value: siteConfig.hours,
    href: undefined,
    note: undefined,
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  return (
    <>
      {/* ============================================================ */}
      {/*  1. HERO HEADER                                              */}
      {/* ============================================================ */}
      <section
        className="relative overflow-hidden bg-gradient-to-b from-hydra-50/60 to-white py-24 md:py-32"
        aria-label="Contact hero"
      >
        <AuroraBackground className="opacity-60" />
        <NoiseOverlay />
        <GradientOrb className="top-[-10%] left-[-8%]" size="lg" />
        <GradientOrb className="right-[-6%] bottom-[10%]" size="md" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-[3.4rem]">
                Get in <span className="text-hydra-500">Touch</span>
              </h1>
            </FadeIn>

            <FadeIn delay={100}>
              <p className="mt-5 text-lg leading-relaxed text-slate-light sm:text-xl">
                Request a quote, ask a question, or schedule your first service.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. TWO COLUMN — FORM + CONTACT INFO                        */}
      {/* ============================================================ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16 xl:gap-20">
            {/* ------------------------------------------------------ */}
            {/*  Left: Contact Form                                     */}
            {/* ------------------------------------------------------ */}
            <FadeIn>
              <GetQuoteForm />
            </FadeIn>

            {/* ------------------------------------------------------ */}
            {/*  Right: Contact Info Cards                              */}
            {/* ------------------------------------------------------ */}
            <aside className="flex flex-col gap-4">
              {contactCards.map((card, i) => {
                const Icon = card.icon;
                const content = (
                  <FadeIn
                    key={card.label}
                    delay={i * 80}
                    className={cn(
                      "rounded-xl border border-border-light bg-surface p-5",
                      "transition-shadow duration-200 hover:shadow-md"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-hydra-100">
                        <Icon
                          className="h-5 w-5 text-hydra-600"
                          strokeWidth={1.75}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-light">
                          {card.label}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-navy">
                          {card.value}
                        </p>
                        {card.note && (
                          <p className="mt-0.5 text-xs text-slate-light">
                            {card.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </FadeIn>
                );

                if (card.href) {
                  return (
                    <a
                      key={card.label}
                      href={card.href}
                      className="block outline-none focus-visible:ring-2 focus-visible:ring-hydra-500 focus-visible:ring-offset-2 rounded-xl"
                    >
                      {content}
                    </a>
                  );
                }

                return <div key={card.label}>{content}</div>;
              })}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
