import type { NextConfig } from "next";

// Legacy URL → current slug. Fill in entries from Google Search Console
// Coverage report (the 14 broken URLs). Each entry maps a URL Google
// already knows about to its current canonical path.
//
// Format:
//   { source: "/blogs/old slug with spaces", destination: "/blogs/new-slug", permanent: true }
const legacyBlogRedirects: Array<{
  source: string;
  destination: string;
  permanent: boolean;
}> = [
  // TODO: paste the 14 broken URLs from GSC here
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
