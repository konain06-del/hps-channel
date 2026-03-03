import type { Metadata } from "next";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Secure Payments",
  description:
    "Save your payment method securely with Hydra Pool Services. PCI DSS compliant, powered by Stripe, 256-bit SSL encryption.",
  alternates: {
    canonical: `${siteConfig.url}/payments`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function PaymentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
