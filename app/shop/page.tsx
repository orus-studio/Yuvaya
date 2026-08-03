import { getLandingProducts } from "@/lib/shopify";
import ShopClient from "./ShopClient";

export const revalidate = 60; // Revalidate Shopify data every 60 seconds

export default async function ShopPage() {
  let shopifyData: any = null;

  try {
    const products = await getLandingProducts();

    if (products && products.length > 0) {
      // 1. Sort products in exact handle order: 30 days, 60 days, 6 days trial
      const sortedProducts = [...products].sort((a, b) => {
        const orderMap: Record<string, number> = {
          "collagreens": 1,
          "60-day-collagreens": 2,
          "mini-collagreens-6-day-pack": 3,
        };
        const orderA = orderMap[a.handle] || 99;
        const orderB = orderMap[b.handle] || 99;
        return orderA - orderB;
      });

      // 2. Extract all Shopify images in exact product order
      const allImages: { src: string; alt: string }[] = [];
      sortedProducts.forEach((prod) => {
        prod.images?.edges?.forEach(({ node }) => {
          if (node.url && !allImages.some((img) => img.src === node.url)) {
            allImages.push({
              src: node.url,
              alt: node.altText || prod.title,
            });
          }
        });
      });

      // 3. Build variants in exact order matching 30 days -> 60 days -> 6 days trial
      const variants = sortedProducts.map((prod, index) => {
        const variantNode = prod.variants?.edges[0]?.node;
        const variantId = variantNode?.id || "";
        const amount = parseFloat(variantNode?.price?.amount || "0");
        const priceFormatted = `₹ ${amount.toLocaleString("en-IN")}`;

        let label = "30 days pack";
        let badge: string | undefined = "Most Popular";
        let originalPrice: string | undefined = undefined;

        if (prod.handle === "60-day-collagreens") {
          label = "60 days pack";
          badge = "Best Value";
          originalPrice = "₹ 5,800";
        } else if (prod.handle === "mini-collagreens-6-day-pack") {
          label = "6 days trial";
          badge = "Starter Pack";
        }

        const prodImages = prod.images?.edges?.map((e) => e.node.url) || [];

        return {
          id: variantId,
          label,
          badge,
          price: priceFormatted,
          numericPrice: amount,
          originalPrice,
          img: prodImages[0] || allImages[0]?.src || "/Landing/Stand Up Pouch Front latest mockup.png",
        };
      });

      if (allImages.length > 0) {
        shopifyData = {
          title: sortedProducts[0]?.title || "Collagreens",
          images: allImages,
          variants: variants.length > 0 ? variants : undefined,
        };
      }
    }
  } catch (error) {
    console.error("Failed to fetch Shopify products server-side in /shop:", error);
  }

  return <ShopClient productData={shopifyData} />;
}