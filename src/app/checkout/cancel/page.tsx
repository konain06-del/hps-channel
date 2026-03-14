import type { Metadata } from "next";
import Link from "next/link";
import { XCircle, ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Checkout Cancelled",
  robots: { index: false, follow: false },
};

export default function CheckoutCancelPage() {
  return (
    <section className="bg-gradient-to-b from-hydra-50/60 to-white py-24 md:py-32">
      <div className="mx-auto max-w-lg px-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
          <XCircle className="h-8 w-8 text-amber-600" />
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          Checkout Cancelled
        </h1>

        <p className="mt-4 text-base leading-relaxed text-slate-light">
          No worries — nothing was charged. You can choose a plan anytime
          you&rsquo;re ready, or contact us if you have questions.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/plans"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-hydra-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-hydra-600"
          >
            View Plans
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-light px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-hydra-50"
          >
            <Phone className="h-4 w-4 text-hydra-500" />
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
