import { cn } from "@/lib/utils";

/**
 * NoiseOverlay — Subtle SVG noise texture for premium gradient areas.
 * Renders at low opacity so gradients gain a fine-grained, printed feel.
 */
export function NoiseOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "noise-overlay pointer-events-none absolute inset-0 opacity-[0.03]",
        className
      )}
    />
  );
}
