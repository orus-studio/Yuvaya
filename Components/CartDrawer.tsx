"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Loader2, Trash2, Plus, Minus, X, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { createCheckout } from "@/app/actions/createCheckout";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartCount,
    cartTotal,
  } = useCart();

  const [isMounted, setIsMounted] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent background scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  if (!isMounted) return null;

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setIsCheckingOut(true);
    setCheckoutError(null);

    const lineItems = cartItems.map((item) => ({
      merchandiseId: item.id,
      quantity: item.quantity,
    }));

    try {
      const result = await createCheckout(lineItems);
      if ("error" in result) {
        setCheckoutError(result.error);
        setIsCheckingOut(false);
      } else if (result.webUrl) {
        window.location.href = result.webUrl;
      }
    } catch (err) {
      console.error("Cart checkout failed:", err);
      setCheckoutError("Failed to initiate checkout. Please try again.");
      setIsCheckingOut(false);
    }
  };

  // Overlay animation variants
  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Drawer animation variants (spring slide-in from right)
  const drawerVariants: Variants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { type: "spring", damping: 30, stiffness: 250 },
    },
    exit: {
      x: "100%",
      transition: { type: "spring", damping: 30, stiffness: 220 },
    },
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          {/* Backdrop Overlay */}
          <motion.div
            key="overlay"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            onClick={() => !isCheckingOut && setIsCartOpen(false)}
            className="absolute inset-0 bg-black/45 backdrop-blur-[3px] transition-opacity cursor-pointer"
          />

          {/* Cart Panel */}
          <motion.div
            key="drawer"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={drawerVariants}
            className="relative flex h-full w-full max-w-md flex-col bg-[#fffdf2] shadow-2xl border-l border-[#34803c]/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-[#34803c]/20 px-6 py-5 bg-[#26312d]">
              <div className="flex items-center gap-2.5">
                <ShoppingCart className="h-5.5 w-5.5 text-[#fffc60]" />
                <h2 className="font-tt-ramillas text-2xl font-bold text-white tracking-wide">
                  Your Cart
                </h2>
                <span className="font-poppins text-xs font-semibold bg-[#34803c] text-white px-2 py-0.5 rounded-full">
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                disabled={isCheckingOut}
                className="rounded-full p-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items Container */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cartItems.length === 0 ? (
                /* Empty state */
                <div className="flex h-full flex-col items-center justify-center text-center py-10">
                  <div className="rounded-full bg-[#faf6de] border-2 border-[#fff6b3] p-6 mb-4">
                    <ShoppingCart className="h-10 w-10 text-[#34803c] opacity-70 animate-pulse" />
                  </div>
                  <h3 className="font-tt-ramillas text-xl font-semibold text-black mb-2">
                    Your cart is empty
                  </h3>
                  <p className="font-poppins text-sm text-[#555] max-w-xs mb-6">
                    Add our premium Collagreens packs to your cart and kickstart your wellness journey.
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      const shopSec = document.getElementById("shop");
                      if (shopSec) {
                        shopSec.scrollIntoView({ behavior: "smooth" });
                      } else {
                        window.location.href = "/#shop";
                      }
                    }}
                    className="font-poppins text-sm font-semibold rounded-full border border-gray-400 bg-white hover:border-[#34803c] hover:text-[#34803c] px-6 py-2.5 transition-all cursor-pointer text-black"
                  >
                    Shop Collagreens
                  </button>
                </div>
              ) : (
                /* Cart list */
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-2xl border-2 border-[#fff6b3] bg-[#faf6de] p-3.5 shadow-sm transition-all hover:shadow-md hover:border-[#34803c]/40"
                  >
                    {/* Item Image */}
                    <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-xl border border-[#34803c]/20 bg-white">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="72px"
                        className="object-contain p-1.5"
                      />
                    </div>

                    {/* Item details */}
                    <div className="flex flex-1 flex-col justify-between h-full">
                      <div>
                        <h4 className="font-tt-ramillas text-base font-bold text-black leading-tight">
                          {item.title}
                        </h4>
                        <p className="font-poppins text-[11px] font-semibold text-gray-500 uppercase tracking-wider mt-0.5">
                          {item.variantLabel}
                        </p>
                      </div>

                      {/* Quantity adjusting and price */}
                      <div className="flex items-center justify-between mt-2.5">
                        {/* Adjuster pill */}
                        <div className="flex items-center rounded-full bg-white border border-gray-300 p-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={isCheckingOut}
                            className="flex h-6 w-6 items-center justify-center rounded-full text-gray-500 hover:text-black hover:bg-stone-100 transition-colors disabled:opacity-50 cursor-pointer"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="font-poppins text-xs font-semibold px-2 text-black w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={isCheckingOut}
                            className="flex h-6 w-6 items-center justify-center rounded-full text-gray-500 hover:text-black hover:bg-stone-100 transition-colors disabled:opacity-50 cursor-pointer"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-poppins text-sm font-bold text-[#34803c]">
                          {item.price}
                        </span>
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      disabled={isCheckingOut}
                      className="rounded-full p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t-2 border-[#34803c]/20 px-6 py-5 bg-[#faf6de]">
                {/* Total */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-tt-ramillas text-lg font-bold text-black">
                    Subtotal
                  </span>
                  <span className="font-poppins text-xl font-bold text-[#34803c]">
                    ₹ {cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="font-poppins text-[11px] text-gray-500 text-center mb-4 leading-normal">
                  Shipping, taxes, and discounts will be calculated at checkout.
                </p>

                {/* Checkout CTA */}
                <div className="flex  flex-col gap-2">
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full box-border rounded-full border border-gray-300 bg-[#fffc60] py-3.5 font-poppins text-base font-semibold text-black transition-all hover:bg-[#f5f014] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-[0.98]"
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Redirecting to Checkout Page...</span>
                      </>
                    ) : (
                      <>
                        <span>Proceed to Checkout</span>
                      </>
                    )}
                  </button>

                  {checkoutError && (
                    <p className="text-red-500 text-xs font-semibold text-center mt-2">
                      {checkoutError}
                    </p>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
