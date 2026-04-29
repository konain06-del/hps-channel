import type { NextConfig } from "next";

// Legacy URL → current path. Built from the 35 URLs in the GSC
// "Not found (404)" report dated 2026-04-28. Most are leftovers from
// the previous Squarespace site at /pool-tips/* — the new Next site
// uses /blogs/*. Order matters: specific paths before wildcards.
const legacyBlogRedirects: Array<{
  source: string;
  destination: string;
  permanent: boolean;
}> = [
  {
    source:
      "/pool-tips/top-5-reasons-your-pool-filter-isnt-working-properly-and-what-to-do",
    destination: "/blogs/pool-filter-not-working-top-5-reasons",
    permanent: true,
  },
  {
    source:
      "/pool-tips/why-plano-tx-pool-owners-trust-professional-pool-cleaning-services-for-filter-care",
    destination: "/blogs/pool-filter-care-plano-tx",
    permanent: true,
  },
  {
    source: "/pool-tips/how-to-keep-pool-water-crystal-clear-all-year-in-north-dfw",
    destination: "/blogs/crystal-clear-pool-water-all-year-north-dfw",
    permanent: true,
  },
  {
    source: "/pool-tips/how-to-choose-the-right-pool-service-company-in-north-dfw",
    destination: "/blogs/how-to-choose-pool-service-company-north-dfw",
    permanent: true,
  },
  {
    source:
      "/pool-tips/freeze-damage-can-cost-thousands-how-to-protect-your-pool-equipment-now",
    destination: "/blogs/protect-pool-during-texas-freeze",
    permanent: true,
  },
  {
    source: "/pool-tips/pool-light-replacement-texas",
    destination: "/blogs/pool-light-not-working-in-murphy-tx-troubleshooting-guide",
    permanent: true,
  },
  {
    source: "/pool-tips/cloudy-pool-water-texas",
    destination: "/blogs/why-is-my-pool-cloudy-causes-and-fixes",
    permanent: true,
  },
  {
    source: "/pool-tips/weekly-pool-cleaning-texas",
    destination: "/blogs/is-weekly-pool-service-worth-it",
    permanent: true,
  },
  {
    source: "/pool-tips/diy-vs-professional-pool-cleaning-texas",
    destination: "/blogs/weekly-pool-service-vs-diy-frisco-tx",
    permanent: true,
  },
  {
    source: "/pool-tips/what-happens-if-you-shut-your-pool-system-off-in-winter",
    destination: "/blogs/pool-winterization-guide-murphy-tx",
    permanent: true,
  },
  {
    source:
      "/pool-tips/pool-cleaning-frisco-what-frisco-tx-homeowners-should-know-before-turning-off-their-pool-for-winter",
    destination: "/blogs/pool-winterization-guide-murphy-tx",
    permanent: true,
  },
  {
    source:
      "/pool-tips/dont-drain-your-pool-yet-why-water-level-matters-in-texas-winters",
    destination: "/blogs/when-drain-refill-pool-parker-tx",
    permanent: true,
  },
  {
    source:
      "/pool-tips/hydra-pool-services-emphasizes-the-importance-of-professional-pool-maintenance-for-winter-preparation-in-texas",
    destination: "/blogs/pool-winterization-guide-murphy-tx",
    permanent: true,
  },

  // /pool-tips index and any remaining /pool-tips/* (Squarespace auto-IDs
  // and posts without a clean topical match) — fall through to /blogs.
  { source: "/pool-tips", destination: "/blogs", permanent: true },
  { source: "/pool-tips/:slug*", destination: "/blogs", permanent: true },

  // Old structural pages
  { source: "/home", destination: "/", permanent: true },
  { source: "/about-us", destination: "/about", permanent: true },
  { source: "/contact-us", destination: "/contact", permanent: true },
  { source: "/privacy-policy", destination: "/privacy", permanent: true },
  { source: "/quote", destination: "/contact", permanent: true },
  {
    source: "/residential-pool-maintenance",
    destination: "/services/residential-pool-maintenance",
    permanent: true,
  },
  {
    source: "/commercial-pool-maintenance",
    destination: "/services/commercial-pool-maintenance",
    permanent: true,
  },
  { source: "/services/filter-maintenance", destination: "/services", permanent: true },
  { source: "/services/water-chemistry", destination: "/services", permanent: true },

  // Old Squarespace store — no current equivalent
  { source: "/store/:path*", destination: "/", permanent: true },
];

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.google.com" },
    ],
  },
  async redirects() {
    return legacyBlogRedirects;
  },
};

export default nextConfig;
