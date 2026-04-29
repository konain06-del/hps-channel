"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/data/site";
import { trackPhoneClick } from "@/lib/analytics";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface NavLink {
  label: string;
  href: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Plans", href: "/plans" },
  { label: "Payments", href: "/payments" },
  { label: "Service Areas", href: "/areas" },
  { label: "Blog", href: "/blogs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const navbarVariants = {
  top: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    backdropFilter: "blur(0px)",
    boxShadow: "0 0 0 0 rgba(0,0,0,0)",
    borderBottomColor: "rgba(215, 234, 246, 0)",
  },
  scrolled: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05), 0 1px 2px -1px rgba(0,0,0,0.05)",
    borderBottomColor: "rgba(215, 234, 246, 1)",
  },
};

const mobileMenuVariants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
      opacity: { duration: 0.2, ease: "easeOut" as const },
    },
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] as const },
      opacity: { duration: 0.25, delay: 0.05, ease: "easeIn" as const },
    },
  },
};

const mobileLinkVariants = {
  closed: { x: -16, opacity: 0 },
  open: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.06 * i,
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  }),
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  /* ---- scroll listener ---- */
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ---- lock body scroll when mobile menu is open ---- */
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  /* ---- close mobile menu on route-like interactions ---- */
  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  /* ---- scroll to #get-quote (or navigate home first) ---- */
  const scrollToQuote = useCallback(() => {
    closeMobile();
    const el = document.getElementById("get-quote");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#get-quote");
    }
  }, [closeMobile, router]);

  /* ---- close mobile menu on Escape key ---- */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileOpen) {
        closeMobile();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen, closeMobile]);

  return (
    <motion.header
      variants={navbarVariants}
      animate={isScrolled ? "scrolled" : "top"}
      initial="top"
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] as const }}
      className="fixed inset-x-0 top-0 z-50 border-b"
    >
      {/* ---- main navbar row ---- */}
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Primary navigation"
      >
        {/* ---- logo / brand ---- */}
        <Link
          href="/"
          className="group relative flex items-center"
          aria-label={`${siteConfig.name} - Home`}
          onClick={closeMobile}
        >
          {/* Dark logo — visible when scrolled (white bg) */}
          <Image
            src="/logo.webp"
            alt={siteConfig.name}
            width={280}
            height={72}
            className={cn(
              "h-14 w-auto transition-opacity duration-300 sm:h-16",
              isScrolled ? "opacity-100" : "opacity-0"
            )}
            priority
          />
          {/* Light logo — visible at top (over dark hero) */}
          <Image
            src="/logo-light.webp"
            alt=""
            width={280}
            height={72}
            aria-hidden
            className={cn(
              "absolute inset-0 h-14 w-auto transition-opacity duration-300 sm:h-16",
              isScrolled ? "opacity-0" : "opacity-100"
            )}
          />
        </Link>

        {/* ---- desktop links ---- */}
        <ul className="hidden items-center gap-1 lg:flex" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
                  isScrolled
                    ? "text-slate hover:bg-hydra-50 hover:text-hydra-700"
                    : "text-navy/80 hover:bg-white/10 hover:text-navy"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ---- desktop CTA ---- */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
            onClick={() => trackPhoneClick("navbar")}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
              isScrolled
                ? "text-slate hover:text-hydra-600"
                : "text-navy/70 hover:text-navy"
            )}
            aria-label={`Call ${siteConfig.phone}`}
          >
            <Phone className="h-4 w-4" />
            <span className="hidden xl:inline">{siteConfig.phone}</span>
          </a>

          <button
            onClick={scrollToQuote}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-300",
              "bg-hydra-500 text-white hover:bg-hydra-600 hover:shadow-md",
              "focus-visible:outline-hydra-500 active:scale-[0.97]"
            )}
          >
            Get a Quote
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* ---- mobile hamburger button ---- */}
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className={cn(
            "relative z-50 inline-flex items-center justify-center rounded-lg p-2 transition-colors duration-200 lg:hidden",
            isScrolled
              ? "text-navy hover:bg-hydra-50"
              : "text-navy hover:bg-white/10"
          )}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isMobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* ---- mobile menu ---- */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-menu"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="overflow-hidden border-t border-border-light bg-white/95 backdrop-blur-xl lg:hidden"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="mx-auto max-w-7xl px-4 pb-6 pt-2 sm:px-6">
              <ul className="space-y-1" role="list">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    custom={i}
                    variants={mobileLinkVariants}
                    initial="closed"
                    animate="open"
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobile}
                      className="flex items-center rounded-xl px-4 py-3 text-base font-medium text-navy transition-colors duration-200 hover:bg-hydra-50 hover:text-hydra-700"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* ---- mobile divider ---- */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="my-4 h-px origin-left bg-border-light"
              />

              {/* ---- mobile phone link ---- */}
              <motion.a
                href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                onClick={() => trackPhoneClick("navbar_mobile")}
                initial={{ x: -16, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-slate-light transition-colors hover:text-hydra-600"
                aria-label={`Call us at ${siteConfig.phone}`}
              >
                <Phone className="h-4 w-4" />
                {siteConfig.phone}
              </motion.a>

              {/* ---- mobile CTA ---- */}
              <motion.div
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.32, duration: 0.3 }}
                className="mt-2 px-4"
              >
                <button
                  onClick={scrollToQuote}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-base font-semibold shadow-sm transition-all duration-300",
                    "bg-hydra-500 text-white hover:bg-hydra-600 hover:shadow-md",
                    "active:scale-[0.97]"
                  )}
                >
                  Get a Quote
                  <ChevronRight className="h-4 w-4" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
