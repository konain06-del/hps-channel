import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Card Saved Successfully | Hydra Pool Services",
};

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/payments");
  }

  let verified = false;
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    verified = session.status === "complete";
  } catch {
    // Invalid or expired session
  }

  if (!verified) {
    redirect("/payments");
  }

  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-white px-5 py-24">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-hydra-50">
          <svg
            className="h-8 w-8 text-hydra-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-navy">
          Card Saved Successfully!
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-light">
          Your payment method is securely on file. You&apos;ll only be charged
          for services you approve. We&apos;ll send a receipt for every
          transaction.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-hydra-500 px-8 py-3 text-sm font-semibold text-white shadow-md shadow-hydra-500/25 transition-all hover:brightness-105"
          >
            Back to Home
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
