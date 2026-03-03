import type { Metadata } from "next";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Hydra Pool Services for a free pool maintenance quote. Call (214) 233-6803 or schedule online. Serving Frisco, Plano, McKinney, Allen, and North DFW.",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: "Contact Hydra Pool Services",
    description:
      "Get a free pool maintenance quote. Call (214) 233-6803 or schedule online. Serving Frisco, TX and North DFW.",
    url: `${siteConfig.url}/contact`,
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Hydra Pool Services",
  description:
    "Contact Hydra Pool Services for a free pool maintenance quote. Serving Frisco, Plano, McKinney, Allen, and North DFW.",
  url: `${siteConfig.url}/contact`,
  mainEntity: {
    "@type": "HomeAndConstructionBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Frisco",
      addressRegion: "TX",
      postalCode: "75034",
      addressCountry: "US",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "Customer Service",
        areaServed: "US",
        availableLanguage: "en",
      },
      {
        "@type": "ContactPoint",
        email: siteConfig.email,
        contactType: "Customer Service",
        areaServed: "US",
        availableLanguage: "en",
      },
    ],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      {children}
    </>
  );
}
