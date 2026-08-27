export interface CartLineItem {
  merchandiseId: string;
  quantity: number;
}

/**
 * Helper to extract numeric variant ID from Shopify GraphQL GID or numeric string.
 * e.g., "gid://shopify/ProductVariant/58221348290641" -> "58221348290641"
 */
function extractNumericVariantId(id: string): string {
  if (!id) return "";
  const parts = id.split("/");
  const lastPart = parts[parts.length - 1];
  return lastPart.replace(/\D/g, "");
}

export async function createCheckout(
  lineItems: string | CartLineItem[],
  quantity: number = 1
): Promise<{ webUrl: string } | { error: string }> {
  let lines: CartLineItem[] = [];

  if (typeof lineItems === "string") {
    if (!lineItems) {
      return { error: "Variant ID is required to proceed to checkout." };
    }
    lines = [{ merchandiseId: lineItems, quantity }];
  } else {
    if (!lineItems || lineItems.length === 0) {
      return { error: "Cart is empty. Please add items to your cart before checking out." };
    }
    lines = lineItems;
  }

  // Target Shopify Store domain (shop.yuvaya.in) where GoKwik integration is installed
  const storeDomain =
    process.env.NEXT_PUBLIC_SHOPIFY_PUBLIC_DOMAIN ||
    process.env.SHOPIFY_PUBLIC_DOMAIN ||
    "shop.yuvaya.in";

  const validLines = lines
    .map((line) => ({
      id: extractNumericVariantId(line.merchandiseId),
      quantity: line.quantity,
    }))
    .filter((line) => line.id.length > 0);

  if (validLines.length === 0) {
    return { error: "Invalid product variant ID." };
  }

  // Chain Shopify's /cart/clear endpoint with return_to=/cart/add...
  // This clears any leftover/abandoned items from the Shopify cart session FIRST,
  // then adds the fresh selection and redirects to /cart?gokwik=true for auto-checkout.
  let cartUrl: string;

  if (validLines.length === 1) {
    const item = validLines[0];
    const addToCartPath = `/cart/add?id=${item.id}&quantity=${item.quantity}&return_to=/cart?gokwik=true`;
    cartUrl = `https://${storeDomain}/cart/clear?return_to=${encodeURIComponent(addToCartPath)}`;
  } else {
    const queryParams = validLines
      .map(
        (item, index) => `items[${index}][id]=${item.id}&items[${index}][quantity]=${item.quantity}`
      )
      .join("&");
    const addToCartPath = `/cart/add?${queryParams}&return_to=/cart?gokwik=true`;
    cartUrl = `https://${storeDomain}/cart/clear?return_to=${encodeURIComponent(addToCartPath)}`;
  }

  console.log("=== GOKWIK / SHOPIFY CART REDIRECT DEBUG ===");
  console.log("Target Store Domain:", storeDomain);
  console.log("Generated Shopify Cart URL:", cartUrl);
  console.log("=============================================");

  return { webUrl: cartUrl };
}
