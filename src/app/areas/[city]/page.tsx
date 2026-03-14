import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, CheckCircle, ChevronRight, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { serviceAreas } from "@/lib/data/areas";
import { cityContent } from "@/lib/data/city-content";
import { services } from "@/lib/data/services";

/* ------------------------------------------------------------------ */
/*  Static params for all cities                                       */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ city: area.id }));
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const content = cityContent[city];
  if (!content) return { title: "Not Found" };

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/areas/${city}`,
    },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: `${siteConfig.url}/areas/${city}`,
      siteName: siteConfig.name,
      type: "website",
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const content = cityContent[city];
  const area = serviceAreas.find((a) => a.id === city);

  if (!content || !area) notFound();

  const nearbyAreas = content.nearbyCities
    .map((id) => serviceAreas.find((a) => a.id === id))
    .filter(Boolean);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteConfig.url}/logo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Frisco",
      addressRegion: "TX",
      postalCode: "75034",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: area.name,
      containedInPlace: {
        "@type": "State",
        name: "Texas",
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Pool Service Plans in ${area.name}, TX`,
      itemListElement: [
        {
          "@type": "Offer",
          name: "Bi-weekly Pool Service",
          price: "120",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "120",
            priceCurrency: "USD",
            unitText: "MONTH",
          },
        },
        {
          "@type": "Offer",
          name: "Weekly Pool Service",
          price: "179",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "179",
            priceCurrency: "USD",
            unitText: "MONTH",
          },
        },
        {
          "@type": "Offer",
          name: "Premium Care Pool Service",
          price: "229",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "229",
            priceCurrency: "USD",
            unitText: "MONTH",
          },
        },
      ],
    },
  };

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
        name: "Service Areas",
        item: `${siteConfig.url}/areas`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${area.name}, TX`,
        item: `${siteConfig.url}/areas/${city}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-hydra-50/60 to-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-slate-light" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-hydra-600 transition-colors">
                  Home
                </Link>
              </li>
              <li><ChevronRight className="h-3 w-3" /></li>
              <li>
                <Link href="/areas" className="hover:text-hydra-600 transition-colors">
                  Service Areas
                </Link>
              </li>
              <li><ChevronRight className="h-3 w-3" /></li>
              <li className="font-medium text-navy">{area.name}, TX</li>
            </ol>
          </nav>

          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-hydra-500" />
            <span className="text-sm font-semibold text-hydra-600 uppercase tracking-wide">
              {area.name}, Texas
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            {content.headline}
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-slate-light max-w-3xl">
            {content.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#get-quote"
              className="inline-flex items-center gap-2 rounded-xl bg-hydra-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-hydra-500/25 transition-all hover:bg-hydra-600 hover:-translate-y-0.5"
            >
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
              className="inline-flex items-center gap-2 rounded-xl border border-border-light px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-hydra-50"
            >
              <Phone className="h-4 w-4 text-hydra-500" />
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ── Why Choose Hydra ── */}
      <section className="bg-white py-16 md:py-20 border-t border-border-light">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Why {area.name} Residents Choose Hydra
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-light">
            {content.whyChoose}
          </p>
          <ul className="mt-6 space-y-3">
            {content.whyChooseBullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                <span className="text-sm text-navy">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="bg-white py-16 md:py-20 border-t border-border-light">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Pool Service Plans in {area.name}, TX
          </h2>
          <p className="mt-3 text-sm text-slate-light">
            All plans include chemicals, equipment inspections, and digital service reports.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { name: "Bi-weekly", price: 120, desc: "Essential bi-weekly cleaning" },
              { name: "Weekly", price: 179, desc: "Complete weekly service", featured: true },
              { name: "Premium Care", price: 229, desc: "Weekly + equipment support" },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-5 text-center ${
                  plan.featured
                    ? "border-hydra-400 bg-hydra-50/50 shadow-md"
                    : "border-border-light bg-white"
                }`}
              >
                {plan.featured && (
                  <span className="mb-2 inline-block rounded-full bg-hydra-500 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Most Popular
                  </span>
                )}
                <p className="text-sm font-semibold text-navy">{plan.name}</p>
                <p className="mt-1 text-3xl font-extrabold text-hydra-600">
                  ${plan.price}
                  <span className="text-sm font-medium text-slate-light">/mo</span>
                </p>
                <p className="mt-1 text-xs text-slate-light">{plan.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/plans"
              className="text-sm font-semibold text-hydra-600 hover:text-hydra-700 transition-colors"
            >
              View full plan details &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Neighborhoods ── */}
      <section className="bg-white py-16 md:py-20 border-t border-border-light">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Neighborhoods We Serve in {area.name}
          </h2>
          <p className="mt-3 text-sm text-slate-light">
            We provide pool service throughout {area.name}, TX including these communities:
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {content.neighborhoods.map((n) => (
              <span
                key={n}
                className="inline-flex items-center gap-1.5 rounded-full border border-border-light bg-white px-4 py-2 text-sm font-medium text-navy"
              >
                <MapPin className="h-3.5 w-3.5 text-hydra-400" />
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Services ── */}
      <section className="bg-white py-16 md:py-20 border-t border-border-light">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Pool Services Available in {area.name}, TX
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group rounded-xl border border-border-light p-4 transition-all hover:border-hydra-300 hover:shadow-md"
              >
                <h3 className="text-sm font-semibold text-navy group-hover:text-hydra-600 transition-colors">
                  {service.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-light line-clamp-2">
                  {service.shortDescription}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-hydra-600">
                  Learn more <ChevronRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="bg-white py-16 md:py-20 border-t border-border-light">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Pool Service FAQs for {area.name}, TX
          </h2>
          <div className="mt-8 divide-y divide-border-light">
            {content.faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-navy">
                  {faq.question}
                  <ChevronRight className="h-4 w-4 text-slate-light transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-light pr-8">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nearby Areas ── */}
      {nearbyAreas.length > 0 && (
        <section className="bg-white py-16 md:py-20 border-t border-border-light">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Also Serving Nearby Cities
            </h2>
            <p className="mt-3 text-sm text-slate-light">
              We also provide pool service in these nearby communities:
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {nearbyAreas.map((a) =>
                a ? (
                  <Link
                    key={a.id}
                    href={`/areas/${a.id}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border-light px-4 py-2 text-sm font-medium text-navy transition-all hover:border-hydra-300 hover:bg-hydra-50 hover:text-hydra-600"
                  >
                    <MapPin className="h-3.5 w-3.5 text-hydra-400" />
                    {a.name}, TX
                  </Link>
                ) : null
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="bg-gradient-to-b from-white to-hydra-50/40 py-20 md:py-28 border-t border-border-light">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Ready for Crystal-Clear Water in {area.name}?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-light">
            Get a free, no-obligation quote today. Your first 2 weeks are on us
            — completely free. No contracts, no hidden fees.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/#get-quote"
              className="inline-flex items-center gap-2 rounded-xl bg-hydra-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-hydra-500/25 transition-all hover:bg-hydra-600 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
              className="inline-flex items-center gap-2 rounded-xl border border-border-light bg-white px-7 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-hydra-50"
            >
              <Phone className="h-4 w-4 text-hydra-500" />
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
