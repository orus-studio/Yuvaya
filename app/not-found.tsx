"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Truck, MessageSquare, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[85vh] w-full flex-col items-center justify-center overflow-hidden bg-[#fffdf2] px-4 py-20 text-center">
      {/* Decorative Ambient Blobs */}
      <div className="absolute top-1/4 left-1/12 -z-10 h-72 w-72 rounded-full bg-[#11731b]/5 blur-3xl pointer-events-none animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-1/4 right-1/12 -z-10 h-96 w-96 rounded-full bg-[#fffc60]/10 blur-3xl pointer-events-none animate-pulse duration-[8000ms]" />

      <div className="z-10 mx-auto flex max-w-2xl flex-col items-center justify-center">
        {/* Large Decorative 404 Header */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative select-none"
        >
          <h1 className="font-tt-ramillas text-[clamp(6rem,15vw,12rem)] font-light leading-none tracking-tight text-[#11731b]/20">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-cormorant text-[clamp(1.5rem,4vw,3rem)] font-medium italic tracking-wide text-[#26312d] mt-8">
              Lost in transit?
            </span>
          </div>
        </motion.div>

        {/* Supporting Copy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 flex flex-col items-center gap-3"
        >
          <h2 className="font-tt-ramillas text-[24px] sm:text-[32px] font-medium leading-tight text-[#26312d] uppercase tracking-wider">
            Page Not Found
          </h2>
          <p className="font-switzer max-w-[45ch] text-[15px] sm:text-[18px] font-light leading-relaxed text-[#26312d]/75">
            The page you are looking for might have been removed, had its name changed, or is
            temporarily unavailable. Let&apos;s get you back on track.
          </p>
        </motion.div>

        {/* Premium Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex flex-col w-full max-w-3xl gap-4 sm:flex-row sm:justify-center sm:gap-5"
        >
          {/* Track Orders Button */}
          <Link
            href="/account"
            className="group flex items-center justify-center gap-3 rounded-full border border-[#26312d]/10 bg-white px-6 py-3.5 font-poppins text-sm font-semibold tracking-wider text-[#26312d] uppercase shadow-sm transition-all duration-300 hover:border-[#11731b]/30 hover:bg-[#11731b]/5 hover:text-[#11731b]"
          >
            <Truck className="h-6 w-6 transition-transform group-hover:scale-110" />
            <span>Track Orders</span>
          </Link>

          {/* Contact Us Button */}
          <Link
            href="/contact-us"
            className="group flex items-center justify-center gap-3 rounded-full border border-[#26312d]/10 bg-white px-6 py-3.5 font-poppins text-sm font-semibold tracking-wider text-[#26312d] uppercase shadow-sm transition-all duration-300 hover:border-[#11731b]/30 hover:bg-[#11731b]/5 hover:text-[#11731b]"
          >
            <MessageSquare className="h-6 w-6 transition-transform group-hover:scale-110" />
            <span>Contact Us</span>
          </Link>

          {/* Continue Shopping Button */}
          <Link
            href="/#shop"
            className="group flex items-center justify-center gap-3 rounded-full bg-[#11731b] px-6 py-3.5 font-poppins text-sm font-semibold tracking-wider text-[#fffdf2] uppercase transition-all duration-300 hover:bg-[#26312d] hover:shadow-md"
          >
            <ShoppingBag className="h-6 w-6 transition-transform group-hover:scale-110" />
            <span>Shop Products</span>
            <ArrowRight className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
