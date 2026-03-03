import type { Metadata } from "next";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Hydra Pool Services — professional pool care, experienced technicians, and 5-star reviews in Frisco, TX and North DFW.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: "About Hydra Pool Services",
    description:
      "Learn about Hydra Pool Services — professional pool care serving Frisco, TX and North DFW.",
    url: `${siteConfig.url}/about`,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: {
    "@type": "ImageObject",
    url: `${siteConfig.url}/logo.png`,
  },
  description:
    "Professional pool maintenance and repair services in Frisco, TX and North DFW. Offering weekly residential and commercial pool cleaning, chemical management, equipment repair, and more.",
  foundingLocation: {
    "@type": "Place",
    name: "Frisco, TX",
  },
  knowsAbout: [
    "Pool Maintenance",
    "Pool Repair",
    "Pool Chemical Management",
    "Saltwater Pool Service",
    "Commercial Pool Maintenance",
    "Bead Blasting",
  ],
  sameAs: [
    siteConfig.socials.facebook,
    siteConfig.socials.instagram,
    siteConfig.socials.google,
    siteConfig.socials.nextdoor,
  ],
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      {children}
    </>
  );
}
