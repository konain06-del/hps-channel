"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, Suspense } from "react";

function GTMPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (!pathname) return;

    // Skip the first render — the "Initialization - All Pages" trigger
    // in GTM already handles the initial page load
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

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
