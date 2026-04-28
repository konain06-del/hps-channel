import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/lib/data/site";
import { serviceAreas } from "@/lib/data/areas";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatLauncher } from "@/components/chat/ChatLauncher";
import { PostHogProvider } from "@/components/PostHogProvider";
import { PostHogPageView } from "@/components/PostHogPageView";
import { GTMPageView } from "@/components/GTMPageView";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Pool Service Frisco TX | Weekly Cleaning from $120/mo | Hydra Pool Services",
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Professional pool cleaning and maintenance in Frisco, TX starting at $120/mo. Weekly service, all chemicals included, no contracts. Serving Frisco, Plano, McKinney & North DFW. Free first 2 weeks. Call (214) 233-6803.",
  keywords: [
    "pool cleaning Frisco TX",
    "pool service Frisco",
    "pool service Frisco TX",
    "weekly pool cleaning Frisco",
    "pool maintenance Frisco TX",
    "pool cleaning near me",
    "pool service near me",
    "Hydra Pool Services",
    "pool chemicals Frisco",
    "pool repair Frisco TX",
    "pool maintenance Plano TX",
    "pool service McKinney TX",
    "pool cleaning Allen TX",
    "pool cleaning Prosper TX",
    "pool service The Colony TX",
    "pool repair North DFW",
    "residential pool maintenance Frisco",
    "commercial pool service DFW",
    "swimming pool care Frisco TX",
    "pool service cost Frisco",
    "affordable pool cleaning DFW",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Premium Pool Care in Frisco, TX`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Premium Pool Care in Frisco, TX`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

/* ── LocalBusiness + JSON-LD structured data ── */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${siteConfig.url}/#business`,
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Frisco",
    addressRegion: "TX",
    postalCode: "75034",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.1507,
    longitude: -96.8236,
  },
  areaServed: serviceAreas.map((area) => ({
    "@type": "City",
    name: `${area.name}, ${area.state}`,
  })),
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 33.1507,
      longitude: -96.8236,
    },
    geoRadius: "40000",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "07:00",
      closes: "19:00",
    },
  ],
  image: `${siteConfig.url}/logo.png`,
  logo: {
    "@type": "ImageObject",
    url: `${siteConfig.url}/logo.png`,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "50",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.phone,
    contactType: "Customer Service",
    areaServed: "US",
    availableLanguage: "en",
  },
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/#get-quote`,
    },
    result: {
      "@type": "Reservation",
      name: "Pool Service Quote",
    },
  },
  priceRange: "$$",
  sameAs: [
    siteConfig.socials.facebook,
    siteConfig.socials.instagram,
    siteConfig.socials.google,
    siteConfig.socials.nextdoor,
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Pool Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Residential Pool Maintenance",
          description:
            "Weekly pool cleaning, chemical balancing, and equipment inspection for homeowners.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Commercial Pool Maintenance",
          description:
            "Professional pool care for hotels, HOAs, gyms, and apartment complexes.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pool Repair Services",
          description:
            "Expert repairs for pumps, filters, heaters, plumbing, and automation systems.",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <GoogleTagManager gtmId="GTM-NMB4HG4Z" />
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="min-h-screen bg-white font-sans text-slate">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NMB4HG4Z"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <PostHogProvider>
          <PostHogPageView />
          <GTMPageView />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ChatLauncher />
        </PostHogProvider>
      </body>
    </html>
  );
}
