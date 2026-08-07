"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const complexes = [
  {
    title: "Peptide Blend\nComplex",
    description: "Hydrolyzed collagen peptides for better absorption.",
    image: "https://ik.imagekit.io/orus/Green_Sachet/Peptide_Blend_Complex_image.webp",
    bgImage: "https://ik.imagekit.io/orus/Green_Sachet/Peptide_Blend_Complex_bg.webp",
    cardBg: "rgba(255, 252, 252, 0.25)",
    boxShadow: "inset 83px 220px 70px rgba(82, 82, 82, 0.15)",
  },
  {
    title: "Supergreens",
    description: "It builds gut health, support digestion, act as a powerful prebiotic.",
    image: "https://ik.imagekit.io/orus/Green_Sachet/Supergreens_image.webp",
    bgImage: "https://ik.imagekit.io/orus/Green_Sachet/Supergreens_bg.webp",
    cardBg: "rgba(242, 242, 242, 0.25)",
    boxShadow: "inset 83px 220px 70px rgba(242, 241, 241, 0.04)",
  },
  {
    title: "Vitamin A\nComplex",
    description: "Moringa, Amaranth, and apples are great sources for skin and hair health.",
    image: "https://ik.imagekit.io/orus/Green_Sachet/Vitamin_A_complex.webp",
    bgImage: "https://ik.imagekit.io/orus/Green_Sachet/Vitamin_A_Complex_bg.webp",
    cardBg: "rgba(255, 255, 255, 0.25)",
    boxShadow: "inset 83px 220px 70px rgba(188, 68, 68, 0.2)",
  },
  {
    title: "Vitamin C\nComplex",
    description: "Amla, acerola cherries, and mangoes added to supplement collagen.",
    image: "https://ik.imagekit.io/orus/Green_Sachet/Vitamin_C_Complex.webp",
    bgImage: "https://ik.imagekit.io/orus/Green_Sachet/Vitamin_C_Complex_bg.webp",
    cardBg: "rgba(231, 231, 231, 0.25)",
    boxShadow: "inset 83px 220px 70px rgba(66, 66, 66, 0.2)",
  },
  {
    title: "Antioxidant\nBlend",
    description: "Beetroots, carrots, blueberries, grapeseed and others are present.",
    image: "https://ik.imagekit.io/orus/Green_Sachet/Antioxidant_blend.webp",
    bgImage: "https://ik.imagekit.io/orus/Green_Sachet/Antioxidant_Blend_bg.webp",
    cardBg: "rgba(255, 249, 233, 0.25)",
    boxShadow: "inset 83px 220px 70px rgba(188, 68, 68, 0.2)",
  },
  {
    title: "Anti Inflammatory\nBlend",
    description: "Ginger, turmeric, fenugreek, pineapple, and black pepper.",
    image: "https://ik.imagekit.io/orus/Green_Sachet/Antiinflammatory_blend.webp",
    bgImage: "https://ik.imagekit.io/orus/Green_Sachet/antiinflammatory_blend_bg.webp",
    cardBg: "rgba(227, 227, 227, 0.25)",
    boxShadow: "inset 83px 220px 70px rgba(255, 142, 0, 0.2)",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

const MiddleBanner = () => {
  const [activeIdx, setActiveIdx] = React.useState<number | null>(null);

  return (
    <section
      className="relative w-full overflow-hidden select-none"
      style={{
        background: "linear-gradient(180deg, #FFFDF2 9.62%, #FFFFFF 89.9%)",
      }}
    >
      {/* ═══════════ SECTION 1: INGREDIENT CARDS ═══════════ */}
      <div className="relative z-10 w-full pt-10 sm:pt-16 lg:pt-20 pb-8 sm:pb-12">
        {/* Heading */}
        <div className="w-full text-center px-4 mb-6 sm:mb-10 lg:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-switzer text-[20px] sm:text-[28px] md:text-[32px] font-medium leading-[1.3] text-[#34803C] tracking-[0.01em]"
            style={{ fontFamily: "var(--font-switzer)" }}
          >
            1 Sachet. 6 powerful Complexes.
          </motion.h2>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="w-full max-w-[920px] mx-auto grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5 lg:gap-6 justify-items-center px-4 sm:px-6"
        >
          {complexes.map((card, idx) => {
            const isActive = activeIdx === idx;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="relative w-full max-w-[220px] sm:max-w-[250px] lg:max-w-[280px] aspect-[248/350] rounded-[24px] sm:rounded-[30px] lg:rounded-[35px] flex flex-col items-center justify-center p-3 sm:p-4 cursor-pointer overflow-hidden group"
                style={{
                  backgroundColor: card.cardBg,
                  boxShadow: `${card.boxShadow}`,
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
                onClick={() => setActiveIdx(isActive ? null : idx)}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                {/* Card Background Image */}
                <Image
                  src={card.bgImage}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 180px, (max-width: 1024px) 250px, 280px"
                  loading="lazy"
                  className="object-cover rounded-[24px] sm:rounded-[30px] lg:rounded-[35px] z-0 pointer-events-none select-none"
                />

                {/* Content Container */}
                <motion.div
                  className="relative z-10 w-full flex flex-col items-center justify-center"
                  animate={{
                    y: isActive ? -4 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 26,
                  }}
                >
                  {/* Bubble Image Container */}
                  <motion.div
                    className="relative rounded-full flex items-center justify-center mb-2 sm:mb-3 z-10"
                    animate={{
                      width: isActive ? "68%" : "78%",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 250,
                      damping: 25,
                    }}
                  >
                    <div className="relative w-full aspect-square rounded-full overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.title.replace("\n", " ")}
                        fill
                        sizes="(max-width: 640px) 120px, 180px"
                        className="object-cover rounded-full select-none w-full h-full"
                        loading="lazy"
                      />

                      {/* Inner glass bubble shadow */}
                      <div
                        className="absolute inset-0 rounded-full z-10 pointer-events-none"
                        style={{
                          background: "rgba(0, 0, 0, 0.004)",
                          boxShadow:
                            "inset -13px -1px 25px rgba(0, 0, 0, 0.1), inset 10px 5px 4px rgba(255, 255, 255, 0.4), inset 5px 10px 10px rgba(255, 255, 255, 0.75), inset -10px -5px 35px rgba(0, 0, 0, 0.2), inset -5px -2px 25px rgba(24, 24, 24, 0.2)",
                        }}
                      />

                      {/* Outer glass glow */}
                      <div
                        className="absolute inset-0 rounded-full z-20 pointer-events-none"
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          opacity: 0.8,
                          boxShadow:
                            "0px 0px 19.9px rgba(255, 255, 255, 0.6), 0px 0px 12px rgba(129, 129, 129, 0.6), inset -13px -1px 25px rgba(0, 0, 0, 0.1), inset 10px 5px 4px rgba(255, 255, 255, 0.4), inset 5px 10px 10px rgba(255, 255, 255, 0.75), inset -10px -5px 35px rgba(0, 0, 0, 0.2), inset -5px -2px 25px rgba(24, 24, 24, 0.2)",
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Card Title */}
                  <div className="w-full text-center px-1">
                    <h3
                      className="font-switzer font-light text-[12px] min-[400px]:text-[14px] sm:text-[16px] lg:text-[19px] leading-[1.25] tracking-[0.05em] sm:tracking-[0.09em] text-[#26312D] whitespace-pre-line"
                      style={{
                        fontFamily: "var(--font-switzer)",
                      }}
                    >
                      {card.title}
                    </h3>
                  </div>

                  {/* Card Description */}
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      height: isActive ? "auto" : 0,
                      marginTop: isActive ? 6 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                    className="w-full text-center px-1 overflow-hidden"
                  >
                    <p
                      className="font-switzer font-light text-[9.5px] min-[400px]:text-[10.5px] sm:text-[11.5px] lg:text-[12.5px] leading-[1.3] text-[#4A5450] tracking-[0.01em] max-w-[95%] mx-auto"
                      style={{
                        fontFamily: "var(--font-switzer)",
                      }}
                    >
                      {card.description}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ═══════════ SECTION 2: BANNER ═══════════ */}
      <div className="relative w-full min-h-[440px] sm:min-h-[480px] lg:min-h-[550px] xl:min-h-[700px] overflow-hidden">
        {/* Banner Background Image — full bleed */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://ik.imagekit.io/orus/Green_Sachet/banner_bg.webp"
            alt="Greens Bubbly Background"
            fill
            sizes="100vw"
            className="object-cover object-center"
            loading="lazy"
          />
        </div>

        {/* Transition blur from cards to banner */}
        <div className="absolute top-0 left-0 right-0 h-[50px] sm:h-[80px] bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-[85%] h-[70px] sm:h-[80px] bg-white opacity-90 blur-3xl rounded-full z-10 pointer-events-none" />

        {/* ── DESKTOP BANNER (hidden sm:flex) ── */}
        <div className="hidden sm:flex relative z-20 w-full h-full items-center justify-center pt-28 md:pt-36 lg:pt-44">
          <motion.div
            className="relative w-[98%] md:w-[95%] lg:w-[92%] max-w-[1650px] mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transform: "rotate(-4.77deg)" }}
          >
            <div className="relative w-full aspect-[1448/486] overflow-visible">
              {/* The Union.png sachet image */}
              <Image
                src="/Union.png"
                alt="Daily Greens Sachet"
                fill
                sizes="(max-width: 1024px) 95vw, 1500px"
                className="object-contain z-10 relative opacity-85"
                loading="lazy"
              />
            </div>

            {/* Text overlay positioned on sachet */}
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center translate-y-[2%] px-6 md:px-8 text-center pointer-events-none">
              <div className="pointer-events-auto flex flex-col items-center justify-center">
                {/* Title */}
                <h2
                  className="text-[24px] md:text-[34px] lg:text-[46px] xl:text-[54px] font-bold italic text-[#FFFDF2] text-center leading-[1.15] tracking-[-0.04em] mb-1.5 lg:mb-3 drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.4)]"
                  style={{
                    fontFamily: "var(--font-tt-ramillas), serif",
                  }}
                >
                  Daily Greens with Collagen
                </h2>

                {/* Subtitle */}
                <p
                  className="text-[13px] md:text-[17px] lg:text-[21px] xl:text-[24px] font-medium text-[#FFFDF2] text-center tracking-[-0.03em] leading-[1.2] mb-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
                  style={{
                    fontFamily: "var(--font-switzer)",
                  }}
                >
                  Your greens don&apos;t have to be bitter
                </p>

                {/* Highlighted subtitle */}
                <p
                  className="text-[13px] md:text-[17px] lg:text-[21px] xl:text-[24px] font-bold text-[#FFFB26] text-center tracking-[-0.03em] leading-[1.2] mb-2.5 lg:mb-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
                  style={{
                    fontFamily: "var(--font-switzer)",
                  }}
                >
                  Ours is a tropical delight!
                </p>

                {/* Shop Now Button */}
                <Link href="/shop">
                  <motion.div
                    className="flex items-center gap-2.5 bg-[#FFFDF2] text-[#34803C] rounded-full px-5 lg:px-7 py-2 lg:py-2.5 cursor-pointer"
                    style={{
                      boxShadow: "0px 0px 30px 10px rgba(255, 255, 255, 0.25)",
                      fontFamily: "var(--font-switzer)",
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0px 0px 45px 15px rgba(255, 255, 255, 0.35)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    <span className="text-[13px] lg:text-[17px] xl:text-[20px] font-bold tracking-[-0.03em]">
                      Shop Now
                    </span>
                    <svg
                      width="27"
                      height="12"
                      viewBox="0 0 27 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4.5 lg:w-5.5"
                    >
                      <path
                        d="M1 6H25M25 6L20 1M25 6L20 11"
                        stroke="#34803C"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── MOBILE BANNER (flex sm:hidden) ── */}
        <div className="flex sm:hidden relative z-20 w-full h-full items-center justify-center pt-24 pb-20 px-8">
          <motion.div
            className="relative w-[85%] max-w-[320px] mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Link href="/shop" className="block w-full p-2">
              <div className="relative w-full aspect-[350/500] overflow-visible">
                <Image
                  src="/Union_mobile.png"
                  alt="Daily Greens Sachet Mobile Banner"
                  fill
                  sizes="(max-width: 640px) 105vw, 420px"
                  className="object-contain drop-shadow-xl"
                  loading="lazy"
                />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MiddleBanner;
