import { cn } from "@/lib/utils";

/**
 * GridOverlay — Subtle dot grid at low opacity.
 * Uses an inline SVG pattern for a lightweight, scalable grid effect.
 */
export function GridOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 opacity-[0.4]", className)}
      style={{
        backgroundImage: `radial-gradient(circle, #27B6E6 0.5px, transparent 0.5px)`,
        backgroundSize: "24px 24px",
      }}
    />
  );
}
