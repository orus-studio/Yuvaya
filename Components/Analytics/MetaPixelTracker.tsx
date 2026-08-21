"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/pixel";
import { preserveUrlParams } from "@/lib/urlParams";

export default function MetaPixelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // 1. Stash any incoming fbclid or utm_* parameters
    preserveUrlParams();

    // 2. Fire PageView on route transitions (the initial load is triggered by the layout script)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    trackPageView();
  }, [pathname, searchParams]);

  return null;
}
