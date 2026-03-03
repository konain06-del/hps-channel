import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  CheckCircle,
  Clock,
  Users,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Home,
  Building2,
  Wrench,
  Sparkles,
  GraduationCap,
  FlaskConical,
  HelpCircle,
  Gift,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

import { services } from "@/lib/data/services";
import type { ServiceSection } from "@/lib/data/services";
import { getPublishedPosts } from "@/lib/blog/db";
import { siteConfig } from "@/lib/data/site";
import { AuroraBackground } from "@/components/graphics/AuroraBackground";
import { NoiseOverlay } from "@/components/graphics/NoiseOverlay";
import { GradientOrb } from "@/components/graphics/GradientOrb";
import { FAQItem } from "./FAQItem";

export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ */
/*  Icon mapping                                                       */
/* ------------------------------------------------------------------ */

const iconMap: Record<string, ComponentType<LucideProps>> = {
  Home,
  Building2,
  Wrench,
  Sparkles,
  GraduationCap,
  FlaskConical,
};

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/services/${slug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${siteConfig.url}/services/${slug}`,
      type: "website",
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Render paragraphs from a body string (split by double newline) */
function BodyText({ text }: { text: string }) {
  const paragraphs = text.split("\n\n");
  return (
    <>
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className="mt-4 text-base leading-relaxed text-slate sm:text-lg"
        >
          {p}
        </p>
      ))}
    </>
  );
}

/** Render a bullet list */
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-col gap-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 text-base leading-relaxed text-slate"
        >
          <CheckCircle
            className="mt-0.5 h-5 w-5 shrink-0 text-hydra-500"
            strokeWidth={2}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Render a full content section */
function ContentSection({
  section,
  index,
}: {
  section: ServiceSection;
  index: number;
}) {
  return (
    <section
      className="bg-white py-14 md:py-20 border-t border-border-light"
      key={index}
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-navy md:text-3xl">
          {section.heading}
        </h2>

        {section.body && <BodyText text={section.body} />}
        {section.bullets && <BulletList items={section.bullets} />}

        {section.subsections && (
          <div className="mt-8 flex flex-col gap-8">
            {section.subsections.map((sub, subIdx) => (
              <div
                key={subIdx}
                className="rounded-2xl border border-border-light bg-white p-6"
              >
                <h3 className="text-lg font-semibold text-navy">
                  {sub.heading}
                </h3>
                {sub.body && <BodyText text={sub.body} />}
                {sub.bullets && <BulletList items={sub.bullets} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.icon] ?? HelpCircle;

  /* ── JSON-LD: Service schema ── */
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.heroDescription.split("\n\n")[0],
    url: `${siteConfig.url}/services/${service.id}`,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      "@id": `${siteConfig.url}/#business`,
      name: siteConfig.name,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Frisco",
        addressRegion: "TX",
        postalCode: "75034",
        addressCountry: "US",
      },
    },
    areaServed: [
      { "@type": "City", name: "Frisco, TX" },
      { "@type": "City", name: "Plano, TX" },
      { "@type": "City", name: "McKinney, TX" },
      { "@type": "City", name: "Allen, TX" },
      { "@type": "City", name: "Murphy, TX" },
      { "@type": "City", name: "The Colony, TX" },
      { "@type": "City", name: "Prosper, TX" },
      { "@type": "City", name: "Little Elm, TX" },
      { "@type": "City", name: "Celina, TX" },
      { "@type": "City", name: "Richardson, TX" },
    ],
    serviceType: service.title,
  };

  /* ── JSON-LD: FAQPage schema ── */
  const faqJsonLd =
    service.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  /* ── JSON-LD: BreadcrumbList schema ── */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${siteConfig.url}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${siteConfig.url}/services/${service.id}`,
      },
    ],
  };

  /* Fetch related blog posts tagged with this service id */
  const allPosts = await getPublishedPosts();
  const relatedPosts = allPosts.filter((post) => post.tags.includes(slug));

  return (
    <>
      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ============================================================ */}
      {/*  BACK LINK                                                    */}
      {/* ============================================================ */}
      <div className="bg-white border-b border-border-light">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-light transition-colors duration-200 hover:text-hydra-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  HERO SECTION                                                 */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-hydra-50/60 to-white py-20 md:py-28">
        <AuroraBackground className="opacity-60" />
        <NoiseOverlay />
        <GradientOrb className="top-[-10%] left-[-8%]" size="lg" />
        <GradientOrb className="right-[-6%] bottom-[10%]" size="md" />

        <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-hydra-100">
              <Icon
                className="h-8 w-8 text-hydra-600"
                strokeWidth={1.75}
              />
            </div>

            {/* Title */}
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-navy sm:text-5xl">
              {service.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-3 text-lg font-semibold text-hydra-600">
              {service.subtitle}
            </p>

            {/* Hero description */}
            <div className="mx-auto mt-6 max-w-2xl text-left">
              {service.heroDescription.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="mt-4 text-base leading-relaxed text-slate sm:text-lg"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Info cards */}
            <div className="mt-8 flex flex-wrap justify-center gap-5">
              <div className="flex items-start gap-4 rounded-2xl border border-border-light bg-white px-6 py-5 shadow-sm">
                <Clock
                  className="mt-0.5 h-6 w-6 shrink-0 text-hydra-500"
                  strokeWidth={1.75}
                />
                <div className="text-left">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-light">
                    Frequency
                  </p>
                  <p className="mt-1 text-base font-medium text-navy">
                    {service.frequency}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-border-light bg-white px-6 py-5 shadow-sm">
                <Users
                  className="mt-0.5 h-6 w-6 shrink-0 text-hydra-500"
                  strokeWidth={1.75}
                />
                <div className="text-left">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-light">
                    Best For
                  </p>
                  <p className="mt-1 max-w-sm text-base font-medium text-navy">
                    {service.bestFor}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-hydra-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-hydra-500/25 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:shadow-hydra-500/30 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-hydra-500 focus-visible:ring-offset-2"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CONTENT SECTIONS                                             */}
      {/* ============================================================ */}
      {service.sections.map((section, index) => (
        <ContentSection key={index} section={section} index={index} />
      ))}

      {/* ============================================================ */}
      {/*  FAQs                                                         */}
      {/* ============================================================ */}
      {service.faqs.length > 0 && (
        <section className="bg-white py-16 md:py-20 border-t border-border-light">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy md:text-3xl">
              Frequently Asked Questions
            </h2>

            <div className="mt-8 flex flex-col gap-4">
              {service.faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/*  CTA                                                          */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28 border-t border-border-light">
        <AuroraBackground className="opacity-50" />
        <NoiseOverlay />
        <GradientOrb className="top-[-10%] left-[20%]" size="lg" />

        <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-hydra-200 bg-gradient-to-br from-hydra-50/80 to-white p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-hydra-100">
                <Gift className="h-6 w-6 text-hydra-600" strokeWidth={1.75} />
              </div>
              <h2 className="text-2xl font-bold text-navy md:text-3xl">
                {service.ctaHeading}
              </h2>
            </div>

            <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">
              {service.ctaBody}
            </p>

            <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">
              {service.ctaClosing}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-hydra-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-hydra-500/25 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:shadow-hydra-500/30 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-hydra-500 focus-visible:ring-offset-2"
              >
                Schedule a Free Visit
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/plans"
                className="inline-flex items-center justify-center rounded-xl border border-hydra-500 bg-white px-7 py-3.5 text-sm font-semibold text-hydra-600 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:bg-hydra-50/60 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-hydra-500 focus-visible:ring-offset-2"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  RELATED ARTICLES                                             */}
      {/* ============================================================ */}
      {relatedPosts.length > 0 && (
        <section className="bg-white py-16 md:py-20 border-t border-border-light">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy md:text-3xl">
              Related Articles
            </h2>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blogs/${post.slug}`}
                  className="group rounded-2xl border border-border-light bg-white p-6 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-hydra-200 hover:shadow-md"
                >
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-light">
                    <Calendar className="h-3.5 w-3.5" />
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )
                      : "Recent"}
                  </div>

                  <h3 className="mt-3 text-lg font-semibold text-navy transition-colors duration-200 group-hover:text-hydra-600">
                    {post.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate">
                    {post.excerpt}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-hydra-600">
                    Read Article
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
