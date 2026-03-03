import type { Metadata } from "next";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Service Areas — Frisco, Plano, McKinney & North DFW",
  description:
    "Hydra Pool Services proudly serves Frisco, Plano, McKinney, Allen, Murphy, Prosper, Little Elm, The Colony, Celina, and Richardson, TX. Professional pool care across North DFW.",
  alternates: {
    canonical: `${siteConfig.url}/areas`,
  },
  openGraph: {
    title: "Service Areas | Hydra Pool Services",
    description:
      "Professional pool care across North DFW — Frisco, Plano, McKinney, Allen, Murphy, Prosper, and more.",
    url: `${siteConfig.url}/areas`,
  },
};

export default function AreasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
