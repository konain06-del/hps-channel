import { NextResponse } from "next/server";
import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { getStripePriceId, VALID_PLAN_IDS } from "@/lib/stripe-prices";
import { siteConfig } from "@/lib/data/site";

const bodySchema = z.object({
  planId: z.string().refine((v) => VALID_PLAN_IDS.includes(v), {
    message: "Invalid plan ID",
  }),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const { planId } = parsed.data;
    const priceId = getStripePriceId(planId);

    if (!priceId) {
      return NextResponse.json(
        { error: `Stripe price not configured for plan "${planId}". Add the STRIPE_PRICE_* env var.` },
        { status: 500 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      payment_method_types: ["card"],
      billing_address_collection: "required",
      metadata: { planId },
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/cancel`,
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
