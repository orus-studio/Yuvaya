"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  variantId: string;
  price: string;
  title: string;
  variantLabel: string;
  image: string;
  className?: string;
}

export default function AddToCartButton({
  variantId,
  price,
  title,
  variantLabel,
  image,
  className = "",
}: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!variantId) return;
    addToCart({
      id: variantId,
      title,
      variantLabel,
      price,
      image,
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={!variantId}
      className={`w-full box-border rounded-full border border-gray-400 bg-white py-3.5 px-6 font-poppins text-[15px] font-medium text-black transition-all hover:border-[#34803c] hover:text-[#34803c] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed shadow-sm hover:shadow-md active:scale-[0.98] ${className}`}
    >
      <ShoppingCart className="w-5 h-5" />
      <span>Add to Cart</span>
    </button>
  );
}
