import React from "react";
import Image from "next/image";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import BuyNowButton from "@/Components/BuyNowButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Yuvaya Store",
  description: "Browse Yuvaya products and complete your purchase instantly with our secure one-click checkout.",
};

export const revalidate = 60; // Revalidate every minute

export default async function ProductsPage() {
  let products: ShopifyProduct[] = [];
  let error: string | null = null;

  try {
    products = await getProducts();
  } catch (err: any) {
    console.error("Failed to load products:", err);
    error = err.message || "Unable to load products. Please try again later.";
  }

  return (
    <div className="w-full bg-stone-50/50 min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-cormorant text-4xl md:text-5xl font-semibold text-stone-900 mb-4 tracking-tight">
            Our Collection
          </h1>
          <p className="font-switzer text-base text-stone-600 font-light">
            Discover our curated list of premium essentials. Tap "Buy Now" to checkout directly and securely.
          </p>
        </div>

        {/* Error Handling */}
        {error ? (
          <div className="w-full max-w-md mx-auto p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
            <h3 className="font-semibold text-red-800 text-lg mb-2">Error Loading Products</h3>
            <p className="text-red-600 text-sm mb-4">{error}</p>
            <p className="text-stone-500 text-xs">Ensure SHOPIFY_STOREFRONT_TOKEN and SHOPIFY_STORE are correct in your environment variables.</p>
          </div>
        ) : products.length === 0 ? (
          <div className="w-full max-w-md mx-auto p-6 bg-stone-100 border border-stone-200 rounded-2xl text-center">
            <h3 className="font-semibold text-stone-800 text-lg mb-2">No Products Found</h3>
            <p className="text-stone-600 text-sm">We couldn't retrieve any products from your Shopify Storefront.</p>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-stone-200/60 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative aspect-square w-full bg-stone-100 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>

                {/* Product details */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div className="mb-6">
                    <h2 className="font-switzer font-semibold text-lg text-stone-900 mb-2 group-hover:text-stone-700 transition-colors">
                      {product.title}
                    </h2>
                    <p className="font-poppins text-lg font-medium text-stone-800">
                      {product.price}
                    </p>
                  </div>

                  {/* Buy Now Flow */}
                  <BuyNowButton variantId={product.variantId} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
