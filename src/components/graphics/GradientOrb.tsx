import { cn } from "@/lib/utils";

/**
 * GradientOrb — Blurred gradient sphere for hero backgrounds.
 * Position with absolute positioning from the parent.
 */
export function GradientOrb({
  className,
  size = "lg",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "h-48 w-48",
    md: "h-72 w-72",
    lg: "h-96 w-96",
  };

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full bg-gradient-to-br from-hydra-300/40 via-hydra-200/25 to-cyan-100/10 blur-3xl",
        sizeClasses[size],
        className
      )}
    />
  );
}
