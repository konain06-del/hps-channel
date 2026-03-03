import type { Metadata } from "next";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Pool Service Plans & Pricing",
  description:
    "Affordable pool service plans starting in Frisco, TX. Weekly cleaning, chemical balancing, filter maintenance, and equipment repairs. All chemicals included. Get $100 off your first month.",
  alternates: {
    canonical: `${siteConfig.url}/plans`,
  },
  openGraph: {
    title: "Pool Service Plans & Pricing | Hydra Pool Services",
    description:
      "Affordable pool service plans in Frisco, TX. All chemicals included. Get $100 off your first month.",
    url: `${siteConfig.url}/plans`,
  },
};

const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Pool Service Plans",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
  },
  areaServed: {
    "@type": "City",
    name: "Frisco, TX",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Pool Maintenance Plans",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Bi-weekly Pool Service",
        description:
          "Essential pool care every two weeks including pool cleaning, chemical testing, surface skimming, equipment inspection, and digital visit reports.",
        price: "120",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "120",
          priceCurrency: "USD",
          unitText: "MONTH",
        },
        availability: "https://schema.org/InStock",
        url: `${siteConfig.url}/plans`,
      },
      {
        "@type": "Offer",
        name: "Weekly Pool Service",
        description:
          "Complete weekly service for a swim-ready pool including cleaning, chemical balancing, surface skimming, equipment inspection, and digital visit reports.",
        price: "179",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "179",
          priceCurrency: "USD",
          unitText: "MONTH",
        },
        availability: "https://schema.org/InStock",
        url: `${siteConfig.url}/plans`,
      },
      {
        "@type": "Offer",
        name: "Premium Care Pool Service",
        description:
          "Full-service weekly care with equipment support, priority scheduling, cleaning, chemical balancing, and digital visit reports.",
        price: "229",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "229",
          priceCurrency: "USD",
          unitText: "MONTH",
        },
        availability: "https://schema.org/InStock",
        url: `${siteConfig.url}/plans`,
      },
    ],
  },
};

export default function PlansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      {children}
    </>
  );
}
