"use client";

import React from "react";
import { motion } from "framer-motion";

const items = ["Zero Preservatives", "100% Natural", "Zero Artificial Flavours", "No Bitter Taste"];

// Duplicate items multiple times to ensure seamless infinite scrolling on all screen sizes
const repeatedItems = [
  ...items,
  ...items,
  ...items,
  ...items,
  ...items,
  ...items,
  ...items,
  ...items,
];

const ScrollingSection = () => {
  return (
    <div className="relative flex h-[60px] w-full flex-row content-center items-center justify-start overflow-clip bg-[#26312d] p-0 sm:h-[70px] md:h-[80px] lg:h-[90px]">
      <motion.div
        className="flex w-max flex-row flex-nowrap items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 60, // Very slow scroll speed
        }}
      >
        {repeatedItems.map((text, index) => (
          <span
            key={index}
            className="font-cormorant shrink-0 whitespace-nowrap pr-[20px] text-[16px] font-normal italic leading-[1.2] tracking-normal text-[#fffdf2] sm:pr-[30px] sm:text-[20px] md:pr-[40px] md:text-[24px] lg:pr-[45px] lg:text-[26px]"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default ScrollingSection;
