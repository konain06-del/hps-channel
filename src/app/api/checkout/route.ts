import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { siteConfig } from "@/lib/data/site";

export async function POST() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

    const session = await stripe.checkout.sessions.create({
      mode: "setup",
      payment_method_types: ["card"],
      success_url: `${siteUrl}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/payments`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("POST /api/checkout error:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Failed to create checkout session",
      },
      { status: 500 }
    );
  }
}
