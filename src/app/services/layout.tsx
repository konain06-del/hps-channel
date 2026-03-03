import type { Metadata } from "next";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Pool Services",
  description:
    "Professional pool services in Frisco, TX and North DFW. Residential maintenance, commercial pool care, repairs, bead blasting, pool school, and chemical-only service. Get $100 off your first month.",
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
