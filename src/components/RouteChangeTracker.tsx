"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, Suspense } from "react";

function RouteChangeTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    // Skip the very first render — GTM's built-in Page View already fired
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "route_change",
      page_path: pathname + (searchParams?.toString() ? `?${searchParams}` : ""),
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

export function RouteChangeTracker() {
  return (
    <Suspense fallback={null}>
      <RouteChangeTrackerInner />
    </Suspense>
  );
}
