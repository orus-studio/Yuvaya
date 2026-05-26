"use client";

import React, { useState } from "react";
import { createCheckout } from "@/app/actions/createCheckout";
import { Loader2, ShoppingBag } from "lucide-react";

interface BuyNowButtonProps {
  variantId: string;
  className?: string;
}

export default function BuyNowButton({ variantId, className = "" }: BuyNowButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuyNow = async () => {
    if (!variantId) {
      setError("Product variant is unavailable.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await createCheckout(variantId, 1);

      if ("error" in result) {
        setError(result.error);
        setIsLoading(false);
      } else if (result.webUrl) {
        // Redirect to Shopify checkout page
        window.location.href = result.webUrl;
      } else {
        setError("Something went wrong. Please try again.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Checkout redirection failed:", err);
      setError("Failed to initialize checkout. Please check your internet connection.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <button
        onClick={handleBuyNow}
        disabled={isLoading || !variantId}
        className={`w-full py-4 px-6 rounded-xl font-semibold tracking-wide text-white transition-all duration-300 transform active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:shadow-xl ${
          isLoading
            ? "bg-stone-500 cursor-not-allowed opacity-80"
            : !variantId
            ? "bg-stone-300 cursor-not-allowed text-stone-500 shadow-none"
            : "bg-stone-900 hover:bg-stone-800"
        } ${className}`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Preparing Checkout...</span>
          </>
        ) : (
          <>
            <ShoppingBag className="w-5 h-5" />
            <span>Buy Now</span>
          </>
        )}
      </button>
      {error && (
        <p className="text-red-500 text-sm font-medium text-center mt-1 animate-pulse">
          {error}
        </p>
      )}
    </div>
  );
}
