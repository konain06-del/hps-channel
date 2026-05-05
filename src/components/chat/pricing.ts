import type { PoolSize, Schedule } from "./types";

/* ------------------------------------------------------------------ */
/*  Pricing lookup                                                     */
/* ------------------------------------------------------------------ */

const PRICES: Record<Schedule, Record<PoolSize, number>> = {
  biweekly: {
    "10k-20k": 129,
    "20k-30k": 139,
    "30k+": 149,
  },
  weekly: {
    "10k-20k": 179,
    "20k-30k": 189,
    "30k+": 199,
  },
  premium: {
    "10k-20k": 229,
    "20k-30k": 249,
    "30k+": 269,
  },
};

export function getMonthlyPrice(schedule: Schedule, poolSize: PoolSize): number {
  return PRICES[schedule][poolSize];
}
