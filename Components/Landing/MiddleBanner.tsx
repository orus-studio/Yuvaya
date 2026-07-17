"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const complexes = [
    {
        title: "Peptide Blend\nComplex",
        description: "Hydrolyzed collagen peptides for better absorption.",
        image: "/Sachet_Complex/Peptide_Blend_Complex_image.png",
        bgImage: "/Sachet_Complex/Peptide_Blend_Complex_bg.png",
        cardBg: "rgba(255, 252, 252, 0.25)",
        boxShadow: "inset 83px 220px 70px rgba(82, 82, 82, 0.15)",
    },
    {
        title: "Supergreens",
        description: "It builds gut health, support digestion, act as a powerful prebiotic.",
        image: "/Sachet_Complex/Supergreens_image.png",
        bgImage: "/Sachet_Complex/Supergreens_bg.png",
        cardBg: "rgba(242, 242, 242, 0.25)",
        boxShadow: "inset 83px 220px 70px rgba(242, 241, 241, 0.04)",
    },
    {
        title: "Vitamin A\nComplex",
        description: "Moringa, Amaranth, and apples are great sources for skin and hair health.",
        image: "/Sachet_Complex/Vitamin_A_complex.png",
        bgImage: "/Sachet_Complex/Vitamin_A_Complex_bg.png",
        cardBg: "rgba(255, 255, 255, 0.25)",
        boxShadow: "inset 83px 220px 70px rgba(188, 68, 68, 0.2)",
    },
    {
        title: "Vitamin C\nComplex",
        description: "Amla, acerola cherries, and mangoes added to supplement collagen.",
        image: "/Sachet_Complex/Vitamin_C_Complex.png",
        bgImage: "/Sachet_Complex/Vitamin_C_Complex_bg.png",
        cardBg: "rgba(231, 231, 231, 0.25)",
        boxShadow: "inset 83px 220px 70px rgba(66, 66, 66, 0.2)",
    },
    {
        title: "Antioxidant\nBlend",
        description: "Beetroots, carrots, blueberries, grapeseed and others are present.",
        image: "/Sachet_Complex/Antioxidant_blend.png",
        bgImage: "/Sachet_Complex/Antioxidant_Blend_bg.png",
        cardBg: "rgba(255, 249, 233, 0.25)",
        boxShadow: "inset 83px 220px 70px rgba(188, 68, 68, 0.2)",
    },
    {
        title: "Anti Inflammatory\nBlend",
        description: "Ginger, turmeric, fenugreek, pineapple, and black pepper.",
        image: "/Sachet_Complex/Antiinflammatory_blend.png",
        bgImage: "/Sachet_Complex/antiinflammatory_blend_bg.png",
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
            <div className="relative z-10 w-full pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12">
                {/* Heading */}
                <div className="w-full text-center px-4 mb-8 sm:mb-10 lg:mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="font-switzer text-[22px] sm:text-[28px] md:text-[32px] font-medium leading-[1.3] text-[#34803C] tracking-[0.01em]"
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
                    className="w-full max-w-[780px] lg:max-w-[920px] mx-auto grid grid-cols-3 gap-x-4 gap-y-5 sm:gap-x-5 sm:gap-y-6 lg:gap-x-6 lg:gap-y-7 justify-items-center px-4 sm:px-6"
                >
                    {complexes.map((card, idx) => {
                        const isActive = activeIdx === idx;
                        return (
                            <motion.div
                                key={idx}
                                variants={cardVariants}
                                className="relative w-full max-w-[200px] sm:max-w-[240px] lg:max-w-[270px] aspect-[248/345] rounded-[24px] sm:rounded-[30px] lg:rounded-[35px] flex flex-col items-center justify-center p-3 cursor-pointer overflow-hidden group"
                                style={{
                                    backgroundColor: card.cardBg,
                                    boxShadow: `${card.boxShadow}`,
                                    borderRadius: "35px",
                                }}
                                whileHover={{ y: -5, scale: 1.02 }}
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
                                    sizes="270px"
                                    className="object-cover rounded-[35px] z-0 pointer-events-none select-none"
                                />

                                {/* Sliding Content Container */}
                                <motion.div
                                    className="relative z-10 w-full flex flex-col items-center justify-center"
                                    animate={{
                                        y: isActive ? -12 : 12,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 26,
                                    }}
                                >
                                    {/* Bubble Image Container */}
                                    <div className="relative w-[82%] aspect-square rounded-full flex items-center justify-center mb-3 sm:mb-4 z-10 transition-transform duration-300 group-hover:scale-[1.04]">
                                        <Image
                                            src={card.image}
                                            alt={card.title.replace("\n", " ")}
                                            width={205}
                                            height={205}
                                            className="object-cover rounded-full select-none w-full h-full"
                                            priority
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

                                    {/* Card Title */}
                                    <div className="w-full text-center px-1">
                                        <h3
                                            className="font-switzer font-light text-[13px] sm:text-[16px] lg:text-[20px] leading-[1.3] tracking-[0.09em] text-[#26312D] whitespace-pre-line"
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
                                            marginTop: isActive ? 8 : 0,
                                        }}
                                        transition={{
                                            duration: 0.35,
                                            ease: "easeInOut",
                                        }}
                                        className="w-full text-center px-2 overflow-hidden"
                                    >
                                        <p
                                            className="font-switzer font-light text-[10px] sm:text-[11px] lg:text-[12px] leading-[1.35] text-[#4A5450] tracking-[0.01em] max-w-[92%] mx-auto"
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
            <div className="relative w-full min-h-[450px] sm:min-h-[550px] lg:min-h-[550px] xl:min-h-[750px] overflow-hidden">
                {/* Banner Background Image — full bleed */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/banner_bg.png"
                        alt="Greens Bubbly Background"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </div>

                {/* Transition blur from cards to banner */}
                <div className="absolute top-0 left-0 right-0 h-[60px] sm:h-[80px] bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-[85%] h-[80px] bg-white opacity-90 blur-3xl rounded-full z-10 pointer-events-none" />

                {/* Sachet (Union) overlay + Text container */}
                <div className="relative z-20 w-full h-full flex items-center justify-center pt-32 pb-8 sm:pt-46 sm:pb-12 lg:pt-56 ">
                    <motion.div
                        className="relative w-[108%] sm:w-[104%] md:w-[100%] lg:w-[96%] xl:w-[92%] max-w-[1650px]"
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
                                sizes="(max-width: 640px) 110vw, (max-width: 1024px) 95vw, 1500px"
                                className="object-contain z-10 relative opacity-85"
                                priority
                            />
                        </div>

                        {/* Text overlay positioned on sachet */}
                        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center translate-y-[3%] sm:translate-y-[4%] lg:translate-y-[5%] px-4 sm:px-8">
                            {/* Title */}
                            <h2
                                className="text-[16px] sm:text-[30px] md:text-[40px] lg:text-[50px] xl:text-[60px] font-bold italic text-[#FFFDF2] text-center leading-[1.2] tracking-[-0.05em] mb-1 sm:mb-2 lg:mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                                style={{
                                    fontFamily:
                                        "var(--font-tt-ramillas), serif",
                                }}
                            >
                                Daily Greens with Collagen
                            </h2>

                            {/* Subtitle */}
                            <p
                                className="text-[10px] sm:text-[14px] md:text-[18px] lg:text-[22px] xl:text-[26px] font-medium text-[#FFFDF2] text-center tracking-[-0.05em] leading-[1.3] mb-0.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]"
                                style={{
                                    fontFamily: "var(--font-switzer)",
                                }}
                            >
                                Your greens don&apos;t have to be bitter
                            </p>

                            {/* Highlighted subtitle */}
                            <p
                                className="text-[10px] sm:text-[14px] md:text-[18px] lg:text-[22px] xl:text-[26px] font-bold text-[#FFFB26] text-center tracking-[-0.05em] leading-[1.3] mb-2 sm:mb-4 lg:mb-5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]"
                                style={{
                                    fontFamily: "var(--font-switzer)",
                                }}
                            >
                                Ours is a tropical delight!
                            </p>

                            {/* Shop Now Button */}
                            <Link href="/#shop">
                                <motion.div
                                    className="flex items-center gap-2 sm:gap-3 bg-[#FFFDF2] text-[#34803C] rounded-full px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2.5 lg:py-3 cursor-pointer"
                                    style={{
                                        boxShadow:
                                            "0px 0px 44.7px 17px rgba(255, 255, 255, 0.25)",
                                        fontFamily: "var(--font-switzer)",
                                    }}
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow:
                                            "0px 0px 60px 20px rgba(255, 255, 255, 0.35)",
                                    }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                    }}
                                >
                                    <span className="text-[10px] sm:text-[14px] lg:text-[18px] xl:text-[22px] font-bold tracking-[-0.03em]">
                                        Shop Now
                                    </span>
                                    <svg
                                        width="27"
                                        height="12"
                                        viewBox="0 0 27 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 sm:w-5 lg:w-6"
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
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default MiddleBanner;