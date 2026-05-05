import type { Metadata } from "next";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Pool Services in Frisco, TX & North DFW",
  description:
    "Pool cleaning, maintenance, repairs, bead blasting & more in Frisco, TX. Residential & commercial pool care from $129/mo. All chemicals included. Free first 2 weeks. Call (214) 233-6803.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: "Pool Services | Hydra Pool Services",
    description:
      "Professional pool services in Frisco, TX and North DFW. Residential and commercial maintenance, repairs, bead blasting, and more.",
    url: `${siteConfig.url}/services`,
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
