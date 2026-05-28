"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const complexes = [
    {
        title: "Peptide Blend Complex",
        description:
            "Hydrolyzed collagen peptides for better absorption.",
        img: "/Complex_1.jpeg",
    },
    {
        title: "Supergreens",
        description:
            "It builds gut health, support digestion, act as a powerful prebiotic.",
        img: "/Landing/Super_Green.jpg",
    },
    {
        title: "Vitamin C Complex",
        description:
            "Amla, acerola cherries, and mangoes added to supplement collagen.",
        img: "/Landing/Vitamin_C.jpg",
    },
    {
        title: "Antioxidant Blend",
        description:
            "Beetroots, carrots, blueberries, grapeseed and others are present.",
        img: "/Landing/Anti_Oxidant.jpg",
    },
    {
        title: "Anti-Inflammatory",
        description:
            "Ginger, turmeric, fenugreek, pineapple, and black pepper.",
        img: "/Landing/Anti_Inflammatory.jpg",
    },
    {
        title: "Vitamin A Complex",
        description:
            "Moringa, Amaranth, and apples are great sources for skin and hair health.",
        img: "/Landing/Vitamin_A.jpg",
    },
];

const SachetSection = () => {
    const [activeCard, setActiveCard] = useState<number | null>(null);

    return (
        <section
            className="relative w-full mb-10"
            style={{ backgroundColor: "#fffff7", overflow: "visible" }}
        >
            {/* ── Heading Section ─────────────────────────────────── */}
            <div
                className="box-border flex w-full flex-row flex-nowrap items-center justify-center gap-[10px] overflow-clip"
                style={{ padding: "35px 0px 0px 0px" }}
            >
                <h2
                    className="font-switzer whitespace-pre text-center text-[22px] leading-[1.2] tracking-[0em] text-black font-medium  sm:text-[28px] md:text-[36px] lg:text-[50px]"
                >
                    <span className="font-switzer font-medium non-italic" style={{ fontStyle: "normal" }}>1 Sachet.{" "}</span>6 powerful Complexes
                </h2>
            </div>

            {/* ── Content Section (cards row) ─────────────────────── */}
            <div
                className="box-border flex w-full flex-row flex-wrap items-start justify-center gap-3 px-4 sm:gap-4 sm:px-6 md:justify-evenly lg:justify-center md:gap-5 md:px-8 lg:gap-10"
                style={{
                    minHeight: "300px",
                    padding: "20px 0px 0px 0px",
                    alignContent: "flex-start",
                    overflow: "visible",
                }}
            >
                {complexes.map((item, index) => {
                    const isActive = activeCard === index;

                    return (
                        /* Wrapper — responsive sizing */
                        <div
                            key={index}
                            className="relative cursor-pointer w-[120px] h-[170px] sm:w-[140px] sm:h-[190px] md:w-[160px] md:h-[210px] lg:w-[180px] lg:h-[230px]"
                            onMouseEnter={() => setActiveCard(index)}
                            onMouseLeave={() => setActiveCard(null)}
                        >
                            {/* ── Dark card container ── */}
                            <div
                                className="absolute bottom-0 left-0 box-border flex w-full flex-col flex-nowrap items-center overflow-visible rounded-2xl bg-[#191a1d] sm:rounded-[18px] md:rounded-[20px] lg:rounded-[22px] h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] p-2 pb-5 sm:p-2.5 sm:pb-6 md:p-3 md:pb-6 lg:p-3 lg:pb-7 gap-1"
                            >
                                {/* ── Card image — translates up on hover ── */}
                                <motion.div
                                    className="relative w-full shrink-0 overflow-hidden rounded-lg sm:rounded-xl md:rounded-[14px] h-[90px] sm:h-[110px] md:h-[130px] lg:h-[140px]"
                                    animate={{
                                        y: isActive ? -50 : 0,
                                    }}
                                    transition={{
                                        duration: 0.35,
                                        ease: [0.25, 0.46, 0.45, 0.94],
                                    }}
                                >
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 190px"
                                        className="object-cover object-center"
                                    />
                                </motion.div>

                                {/* ── Title — translates up on hover ──── */}
                                <motion.span
                                    className="font-poppins whitespace-pre text-center text-[10px] font-normal leading-[1.2] tracking-[0em] text-white sm:text-[12px] md:text-[13px] lg:text-[14px]"
                                    animate={{
                                        y: isActive ? -35 : 0,
                                    }}
                                    transition={{
                                        duration: 0.35,
                                        ease: [0.25, 0.46, 0.45, 0.94],
                                    }}
                                >
                                    {item.title}
                                </motion.span>

                                {/* ── Description (hover reveal) ───────── */}
                                <motion.p
                                    className="font-poppins w-full break-words text-center text-[9px] font-normal leading-[1.2] tracking-[0em] sm:text-[10px] md:text-[11px] lg:text-[12px]"
                                    style={{
                                        color: "rgba(255, 255, 255, 0.69)",
                                        whiteSpace: "pre-wrap",
                                        wordWrap: "break-word",
                                        wordBreak: "break-word",
                                    }}
                                    animate={{
                                        opacity: isActive ? 1 : 0,
                                        y: isActive ? -30 : 20,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        ease: [0.25, 0.46, 0.45, 0.94],
                                    }}
                                >
                                    {item.description}
                                </motion.p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default SachetSection;