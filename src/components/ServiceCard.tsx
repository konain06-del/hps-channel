import Link from "next/link";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  bullets: string[];
  index: number;
  href?: string;
}

export function ServiceCard({
  title,
  description,
  icon,
  bullets,
  href,
}: ServiceCardProps) {
  /* ── Dynamically resolve the lucide icon by name ── */
  const LucideIcon = (Icons as unknown as Record<string, ComponentType<LucideProps>>)[
    icon
  ];

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border-light bg-white p-6",
        "transition-all duration-300",
        "hover:border-hydra-300 hover:shadow-lg hover:shadow-hydra-100/40"
      )}
    >
      {/* Subtle gradient wash on hover */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 rounded-2xl",
          "bg-gradient-to-br from-hydra-50/0 via-hydra-50/0 to-hydra-100/0",
          "transition-all duration-300",
          "group-hover:from-hydra-50/60 group-hover:via-hydra-50/30 group-hover:to-hydra-100/20"
        )}
      />

      {/* Content sits above the gradient wash */}
      <div className="relative z-10 flex flex-col">
        {/* Icon container */}
        <div
          className={cn(
            "mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-hydra-50",
            "transition-transform duration-300",
            "group-hover:-translate-y-0.5"
          )}
        >
          {LucideIcon ? (
            <LucideIcon className="h-6 w-6 text-hydra-600" strokeWidth={1.75} />
          ) : (
            <Icons.HelpCircle
              className="h-6 w-6 text-hydra-600"
              strokeWidth={1.75}
            />
          )}
        </div>

        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold text-navy">{title}</h3>

        {/* Description */}
        <p className="mb-4 text-sm leading-relaxed text-slate">{description}</p>

        {/* Bullet list */}
        <ul className="flex flex-col gap-2">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2 text-sm text-slate">
              <Icons.Check
                className="mt-0.5 h-4 w-4 shrink-0 text-hydra-500"
                strokeWidth={2}
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* See More link */}
        {href && (
          <Link
            href={href}
            className={cn(
              "mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-hydra-600",
              "transition-colors duration-200 hover:text-hydra-700"
            )}
          >
            See More
            <Icons.ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
