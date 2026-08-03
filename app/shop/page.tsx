import { getLandingProducts } from "@/lib/shopify";
import ShopClient from "./ShopClient";

export const revalidate = 60; // Revalidate Shopify data every 60 seconds

// Dynamic helper to format pack titles from raw Shopify titles
function formatShopifyPackTitle(rawTitle: string): string {
  if (!rawTitle) return "Pack Variant";

  const lower = rawTitle.toLowerCase();

  // Extract day count if present in title (e.g. "30 day", "60-day", "6 day", "7 day")
  const dayMatch = rawTitle.match(/(\d+)\s*[-_\s]?\s*days?/i);
  if (dayMatch && dayMatch[1]) {
    const days = dayMatch[1];
    if (lower.includes("trial") || lower.includes("mini") || parseInt(days) <= 14) {
      return `${days} days trial`;
    }
    return `${days} days pack`;
  }

  // Fallback: Clean brand prefixes
  const cleaned = rawTitle
    .replace(/^yuvaya\s*/i, "")
    .replace(/^collagreens\s*/i, "")
    .replace(/^mini\s*/i, "")
    .trim();

  return cleaned || rawTitle;
}

export default async function ShopPage() {
  let shopifyData: any = null;

  try {
    const products = await getLandingProducts();

    if (products && products.length > 0) {
      // Map EVERY product from Shopify into a variant — each with its OWN images array
      // This is the exact same approach used in ShopFromUs (landing page) which works perfectly
      const variants = products.map((prod, index) => {
        const variantNode = prod.variants?.edges[0]?.node;
        const variantId = variantNode?.id || prod.id;
        const amount = parseFloat(variantNode?.price?.amount || "0");
        const priceFormatted = `₹ ${amount.toLocaleString("en-IN")}`;

        const label = formatShopifyPackTitle(prod.title);

        // Assign badge dynamically
        let badge: string | undefined = undefined;
        const lowerLabel = label.toLowerCase();
        if (index === 0 || lowerLabel.includes("30")) {
          badge = "Most Popular";
        } else if (lowerLabel.includes("60") || lowerLabel.includes("value") || index === 1) {
          badge = "Best Value";
        } else if (lowerLabel.includes("trial") || lowerLabel.includes("mini")) {
          badge = "Starter Pack";
        }

        // Build this variant's OWN images array from Shopify product images
        const images = prod.images?.edges?.map((edge) => ({
          src: edge.node.url,
          alt: edge.node.altText || prod.title,
        })) || [];

        // Fallback images if Shopify returns none
        const displayImages = images.length > 0 ? images : [
          { src: "/Landing/Stand Up Pouch Front latest mockup.png", alt: "Pouch Front" },
          { src: "/Landing/Sachet Front latest mockup.png", alt: "Sachet Front" },
        ];

        return {
          id: variantId,
          label,
          badge,
          price: priceFormatted,
          numericPrice: amount,
          originalPrice: undefined,
          img: displayImages[0]?.src || "",
          images: displayImages,
        };
      });

      shopifyData = {
        title: "Collagreens",
        variants: variants.length > 0 ? variants : undefined,
      };
    }
  } catch (error) {
    console.error("Failed to fetch Shopify products server-side in /shop:", error);
  }

  return <ShopClient productData={shopifyData} />;
}