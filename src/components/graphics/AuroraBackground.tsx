import { cn } from "@/lib/utils";

/**
 * AuroraBackground — Soft gradient beams that drift slowly.
 * Uses CSS keyframe animations for GPU-friendly movement.
 * Three overlapping ellipses create a layered light effect.
 */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {/* Primary beam */}
      <div className="animate-aurora-1 absolute -top-1/2 left-1/4 h-[120%] w-[80%] rounded-full bg-gradient-to-br from-hydra-300/30 via-hydra-200/20 to-transparent blur-3xl" />
      {/* Secondary beam */}
      <div className="animate-aurora-2 absolute -bottom-1/3 right-1/4 h-[100%] w-[70%] rounded-full bg-gradient-to-tl from-hydra-400/20 via-hydra-100/15 to-transparent blur-3xl" />
      {/* Tertiary accent */}
      <div className="animate-aurora-3 absolute top-1/3 left-1/2 h-[60%] w-[50%] -translate-x-1/2 rounded-full bg-gradient-to-r from-hydra-200/15 via-cyan-200/10 to-transparent blur-3xl" />
    </div>
  );
}
