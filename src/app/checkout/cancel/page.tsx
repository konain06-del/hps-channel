import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout Canceled | Hydra Pool Services",
};

export default function CheckoutCancelPage() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-white px-5 py-24">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-3xl font-bold tracking-tight text-navy">
          Checkout Canceled
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-light">
          No worries &mdash; your subscription was not created. You can try
          again anytime or reach out if you have questions.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/plans"
            className="inline-flex items-center justify-center rounded-xl bg-hydra-500 px-8 py-3 text-sm font-semibold text-white shadow-md shadow-hydra-500/25 transition-all hover:brightness-105"
          >
            View Plans
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-hydra-200 bg-hydra-50 px-8 py-3 text-sm font-semibold text-hydra-700 transition-all hover:bg-hydra-100"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
