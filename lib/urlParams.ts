const STORAGE_KEY = "yuvaya_tracking_params";

// Key ad tracking & attribution parameters to preserve across sessions and redirects
const TRACKING_PARAM_KEYS = [
  "fbclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "gclid",
  "ttclid",
  "fbadid",
];

/**
 * Saves and merges tracking query parameters from the current URL into sessionStorage.
 */
export function preserveUrlParams(): void {
  if (typeof window === "undefined" || !window.sessionStorage) return;

  try {
    const currentParams = new URLSearchParams(window.location.search);
    const storedRaw = window.sessionStorage.getItem(STORAGE_KEY);
    const storedParams = new URLSearchParams(storedRaw || "");

    let hasNew = false;

    // Check all current URL parameters
    currentParams.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      // If it's a known tracking key or starts with utm_, or any ad param
      if (
        TRACKING_PARAM_KEYS.includes(lowerKey) ||
        lowerKey.startsWith("utm_") ||
        lowerKey.startsWith("fb")
      ) {
        if (storedParams.get(key) !== value) {
          storedParams.set(key, value);
          hasNew = true;
        }
      }
    });

    if (hasNew) {
      window.sessionStorage.setItem(STORAGE_KEY, storedParams.toString());
    }
  } catch (err) {
    console.warn("Failed to preserve URL tracking parameters:", err);
  }
}

/**
 * Retrieves all preserved tracking parameters as a URLSearchParams object.
 */
export function getPreservedParams(): URLSearchParams {
  const merged = new URLSearchParams();

  if (typeof window === "undefined") return merged;

  try {
    // 1. Load from sessionStorage
    const storedRaw = window.sessionStorage?.getItem(STORAGE_KEY);
    if (storedRaw) {
      const storedParams = new URLSearchParams(storedRaw);
      storedParams.forEach((value, key) => merged.set(key, value));
    }

    // 2. Overlay current URL search params (if any)
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (
        TRACKING_PARAM_KEYS.includes(lowerKey) ||
        lowerKey.startsWith("utm_") ||
        lowerKey.startsWith("fb")
      ) {
        merged.set(key, value);
      }
    });
  } catch (err) {
    console.warn("Failed to read preserved URL parameters:", err);
  }

  return merged;
}

/**
 * Appends all preserved tracking parameters to a target checkout redirect URL.
 * e.g., "https://shop.yuvaya.in/cart/clear?return_to=..." -> "https://shop.yuvaya.in/cart/clear?return_to=...&fbclid=...&utm_source=..."
 */
export function appendTrackingParams(targetUrl: string): string {
  if (!targetUrl || typeof window === "undefined") return targetUrl;

  try {
    const trackingParams = getPreservedParams();
    if (Array.from(trackingParams.keys()).length === 0) {
      return targetUrl;
    }

    const urlObj = new URL(targetUrl, window.location.origin);
    trackingParams.forEach((value, key) => {
      // Set or override the tracking param on the checkout URL
      urlObj.searchParams.set(key, value);
    });

    return urlObj.toString();
  } catch {
    // Fallback in case of relative or complex URLs
    const trackingParams = getPreservedParams();
    const queryString = trackingParams.toString();
    if (!queryString) return targetUrl;

    const separator = targetUrl.includes("?") ? "&" : "?";
    return `${targetUrl}${separator}${queryString}`;
  }
}
