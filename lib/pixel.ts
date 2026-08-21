export const META_PIXEL_ID = "1476039963481244";

declare global {
  interface Window {
    fbq?: {
      (action: "init", pixelId: string): void;
      (action: "track", eventName: string, params?: Record<string, unknown>): void;
      (action: "trackCustom", eventName: string, params?: Record<string, unknown>): void;
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
    };
    _fbq?: unknown;
  }
}

/**
 * Normalizes a Shopify ID (GraphQL GID or string) to extract the pure numeric variant/product ID.
 * e.g., "gid://shopify/ProductVariant/59057234608209" -> "59057234608209"
 */
export function extractNumericShopifyId(id?: string): string {
  if (!id) return "";
  const parts = id.split("/");
  const lastPart = parts[parts.length - 1];
  return lastPart.replace(/\D/g, "");
}

/**
 * Cleans formatted currency strings to standard numeric values.
 * e.g., "₹ 2,900" or "₹2900.00" -> 2900
 */
export function cleanPrice(price?: string | number): number {
  if (typeof price === "number") return price;
  if (!price) return 0;
  const cleaned = price.replace(/[^0-9.]/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Fires Meta Pixel PageView event.
 */
export function trackPageView(): void {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "PageView");
  }
}

export interface ViewContentParams {
  id?: string;
  title?: string;
  price?: string | number;
  currency?: string;
}

/**
 * Fires Meta Pixel ViewContent event.
 */
export function trackViewContent({ id, title, price, currency = "INR" }: ViewContentParams): void {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    const numericId = extractNumericShopifyId(id);
    const numericPrice = cleanPrice(price);

    window.fbq("track", "ViewContent", {
      content_ids: numericId ? [numericId] : [],
      content_name: title || "Collagreens",
      content_type: "product",
      value: numericPrice,
      currency: currency,
    });
  }
}

export interface CheckoutItem {
  id?: string;
  title?: string;
  price?: string | number;
  quantity?: number;
}

export interface InitiateCheckoutParams {
  items?: CheckoutItem[];
  totalValue?: string | number;
  currency?: string;
}

/**
 * Fires Meta Pixel InitiateCheckout event.
 */
export function trackInitiateCheckout({
  items = [],
  totalValue,
  currency = "INR",
}: InitiateCheckoutParams): void {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    const contentIds = items
      .map((item) => extractNumericShopifyId(item.id))
      .filter((id) => id.length > 0);

    const calculatedValue =
      totalValue !== undefined
        ? cleanPrice(totalValue)
        : items.reduce((sum, item) => sum + cleanPrice(item.price) * (item.quantity || 1), 0);

    const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

    window.fbq("track", "InitiateCheckout", {
      content_ids: contentIds,
      content_type: "product",
      value: calculatedValue,
      currency: currency,
      num_items: totalQuantity > 0 ? totalQuantity : 1,
    });
  }
}
