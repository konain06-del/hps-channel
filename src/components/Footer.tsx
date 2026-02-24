"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, MapPin, Phone, Mail, ExternalLink, Home } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { cn } from "@/lib/utils";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/plans" },
  { label: "Payments", href: "/payments" },
  { label: "Service Areas", href: "/areas" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

const socials = [
  { label: "Facebook", href: siteConfig.socials.facebook, icon: Facebook },
  { label: "Instagram", href: siteConfig.socials.instagram, icon: Instagram },
  { label: "Google", href: siteConfig.socials.google, icon: ExternalLink },
  { label: "Nextdoor", href: siteConfig.socials.nextdoor, icon: Home },
] as const;

export function Footer({ className }: { className?: string }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t border-border-light bg-gradient-to-b from-hydra-50/40 to-white",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt={siteConfig.name}
                width={160}
                height={160}
                className="h-14 w-auto"
              />
            </Link>
            <p className="max-w-xs text-xs leading-relaxed text-slate-light">
              {siteConfig.tagline}
            </p>
            <div className="flex items-center gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-light bg-white text-slate-light transition-all duration-200 hover:border-hydra-300 hover:text-hydra-600 hover:-translate-y-0.5"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-navy/50">
              Quick Links
            </h4>
            <ul className="columns-2 gap-x-4 space-y-1.5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-slate-light transition-colors duration-200 hover:text-hydra-600"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-navy/50">
              Contact
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-2 text-sm text-slate-light transition-colors duration-200 hover:text-hydra-600"
                >
                  <Phone className="h-3.5 w-3.5 text-hydra-500" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 text-sm text-slate-light transition-colors duration-200 hover:text-hydra-600"
                >
                  <Mail className="h-3.5 w-3.5 text-hydra-500" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-light">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-hydra-500" />
                {siteConfig.address}
              </li>
            </ul>
          </div>

          {/* Hours & CTA */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-navy/50">
              Hours
            </h4>
            <p className="text-sm text-slate-light">{siteConfig.hours}</p>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-hydra-500 px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:bg-hydra-600 hover:-translate-y-0.5 shadow-sm shadow-hydra-500/20"
            >
              Get a Free Quote
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-light">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-3.5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-[11px] text-slate-light/60">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-4 text-[11px] text-slate-light/60">
            <Link href="/privacy" className="transition-colors hover:text-hydra-600">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-hydra-600">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
