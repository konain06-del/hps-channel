import { cn } from "@/lib/utils";

/**
 * RippleLines — Subtle concentric water-ripple lines inspired by the Hydra logo.
 * Uses SVG ellipses with a gentle scale animation for organic movement.
 */
export function RippleLines({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden",
        className
      )}
    >
      <svg
        viewBox="0 0 800 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-4xl opacity-20"
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <ellipse
            key={i}
            cx="400"
            cy="100"
            rx={80 + i * 60}
            ry={15 + i * 8}
            stroke="url(#ripple-grad)"
            strokeWidth="0.5"
            className="animate-ripple"
            style={{ animationDelay: `${i * 0.8}s` }}
          />
        ))}
        <defs>
          <linearGradient id="ripple-grad" x1="0" y1="0" x2="800" y2="0">
            <stop stopColor="#27B6E6" stopOpacity="0" />
            <stop offset="0.3" stopColor="#27B6E6" stopOpacity="0.6" />
            <stop offset="0.5" stopColor="#3BC3F1" stopOpacity="0.8" />
            <stop offset="0.7" stopColor="#27B6E6" stopOpacity="0.6" />
            <stop offset="1" stopColor="#27B6E6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
