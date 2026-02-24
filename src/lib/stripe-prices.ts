/**
 * Maps plan IDs (from src/lib/data/plans.ts) to Stripe Price IDs.
 * Price IDs are created in the Stripe Dashboard and stored as env vars.
 */
export const PLAN_PRICE_MAP: Record<string, string | undefined> = {
  biweekly: process.env.STRIPE_PRICE_BIWEEKLY,
  weekly: process.env.STRIPE_PRICE_WEEKLY,
  "premium-care": process.env.STRIPE_PRICE_PREMIUM_CARE,
};

export const VALID_PLAN_IDS = Object.keys(PLAN_PRICE_MAP);
