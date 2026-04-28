"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { sendGTMEvent } from "@next/third-parties/google";

function GTMPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams?.toString()) {
        url = url + "?" + searchParams.toString();
      }
      sendGTMEvent({
        event: "page_view",
        page_path: pathname,
        page_location: url,
      });
    }
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
