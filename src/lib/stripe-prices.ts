/**
 * Maps plan IDs (from plans.ts) to Stripe Price IDs from environment variables.
 * Keep this file server-only — client components must never import it.
 */

const PRICE_MAP: Record<string, string | undefined> = {
  biweekly: process.env.STRIPE_PRICE_BIWEEKLY,
  weekly: process.env.STRIPE_PRICE_WEEKLY,
  "premium-care": process.env.STRIPE_PRICE_PREMIUM_CARE,
};

export function getStripePriceId(planId: string): string | null {
  return PRICE_MAP[planId] ?? null;
}

export const VALID_PLAN_IDS = Object.keys(PRICE_MAP);
