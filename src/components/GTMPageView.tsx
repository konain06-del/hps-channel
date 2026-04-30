"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function GTMPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    // Delay so Next.js has time to update document.title after navigation
    const timeout = setTimeout(() => {
      let url = window.origin + pathname;
      if (searchParams?.toString()) {
        url = url + "?" + searchParams.toString();
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "page_view",
        page_title: document.title,
        page_path: pathname,
        page_location: url,
        page_referrer: document.referrer,
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  return null;
}

export function GTMPageView() {
  return (
    <Suspense fallback={null}>
      <GTMPageViewTracker />
    </Suspense>
  );
}
