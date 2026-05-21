"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const variants = [
    { label: "30 days pack", price: "₹ 3,100", img: "/Landing/Stand Up Pouch Front latest mockup.png" },
    { label: "60 days pack", price: "₹ 5,800", img: "/Landing/Stand Up Pouch Front latest mockup.png" },
    { label: "6 days trial", price: "₹ 699", img: "/Landing/Stand Up Pouch Front latest mockup.png" },
];

const thumbnails = [
    { src: "/Landing/Stand Up Pouch Front latest mockup.png", alt: "Pouch Front" },
    { src: "/Landing/Sachet Front latest mockup.png", alt: "Sachet Front" },
    { src: "/Landing/Sachet Back latest mockup.png", alt: "Sachet Back" },
];

const features = [
    "Refreshing taste and no fishy smell",
    "Quick absorbing",
    "Clinically proven results",
    "Sourced from India for Indians",
    "Tested amino acids",
];

const testingParameters = [
    {
        src: "/Landing/Microbial_infection.webp",
        label: "Microbial contamination",
    },
    {
        src: "/Landing/Amino_acid.png",
        label: "Amino acid profiling",
    },
    {
        src: "/Landing/Heavy_metal.png",
        label: "Heavy metal test",
    },
    {
        src: "/Landing/pesticide_testing.avif",
        label: "Pesticide testing",
    },
    {
        src: "/Landing/Aflatoxin_testing.png",
        label: "Aflatoxin testing",
    },
    {
        src: "/Landing/Stability_testing.avif",
        label: "Stability testing",
    },
    {
        src: "/Landing/Organoleptic_testing.png",
        label: "Organoleptic testing",
    },
];

const ShopFromUs = () => {
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [activeThumbnail, setActiveThumbnail] = useState(0);

    return (
        <section id="shop" className="w-full pt-14 bg-[#fffff7] px-6 pb-10 ">
            {/* Section Header */}
            <div className="mb-8 flex flex-col items-center gap-2 text-center sm:mb-12">
                <h2 className="font-cormorant  font-bold text-[36px] leading-[1.2] tracking-[0.01em] text-black sm:text-[48px] lg:text-[60px]">
                    Shop from us
                </h2>
                <p className="font-switzer flex gap-1 text-[14px] font-medium tracking-[0.12em] text-black sm:text-[18px] lg:text-[22px]">
                    The only
                    <span className="font-bold">Collagen</span> that works
                </p>
            </div>

            <div className="box-border flex w-full flex-col items-start gap-8 overflow-visible px-4 lg:flex-row lg:justify-evenly lg:gap-0 lg:px-[50px]">
                {/* ── LEFT PANEL (sticky image block) ─────────────────────────── */}
                <div className="h-fit w-full shrink-0 lg:sticky lg:top-24 lg:w-[55%]">
                    {/* Outer container: responsive height and styling */}
                    <div className="box-border flex h-[350px] w-full flex-row items-center justify-center gap-3 overflow-clip rounded-2xl border-[4px] border-[#fff6b3] bg-[#faf6de] p-3 sm:h-[450px] sm:gap-4 sm:p-4 lg:h-[650px] lg:gap-5 lg:p-5">
                        {/* Thumbnails column — each card fully rounded with gaps between */}
                        <div className="flex h-full shrink-0 flex-col gap-2 sm:gap-2.5" style={{ width: "27%" }}>
                            {thumbnails.map((t, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveThumbnail(i)}
                                    className={`relative box-border flex w-full flex-1 cursor-pointer items-center justify-center overflow-clip ${i === 0 ? "rounded-t-2xl" : ""} ${i === 2 ? "rounded-b-2xl" : ""} border-2 sm:border-[3px] lg:border-[4px] border-[#34803c] bg-[#fffdf2] transition-all`}
                                >
                                    <Image src={t.src} alt={t.alt} fill sizes="(max-width: 768px) 30vw, 10vw" className="object-contain p-2 sm:p-3" />
                                </button>
                            ))}
                        </div>

                        {/* Main product image — responsive height */}
                        <div className="relative box-border flex flex-col overflow-clip rounded-xl lg:rounded-[14px] border-2 sm:border-[3px] lg:border-[4px] border-[#34803c] bg-[#fffdf2]" style={{ width: "73%", height: "100%" }}>
                            {/* Limited Time Offer banner */}
                            <div className="absolute top-4 sm:top-6 lg:top-10 z-50 flex h-8 sm:h-10 lg:h-11 w-full shrink-0 items-center justify-center border-y-2 sm:border-y-4 border-[#11731b] bg-[#fffc60]">
                                <span className="font-cormorant text-[14px] sm:text-[18px] lg:text-[20px] font-normal italic text-[#11731b]">
                                    Limited Time Offer
                                </span>
                            </div>

                            {/* Product image — changes based on selected thumbnail */}
                            <div className="absolute inset-0 z-30 flex items-center justify-center p-8 sm:p-10 lg:p-12">
                                <div className="relative h-full w-full max-h-full max-w-full">
                                    <Image
                                        src={thumbnails[activeThumbnail].src}
                                        alt={thumbnails[activeThumbnail].alt}
                                        key={activeThumbnail}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-contain object-center"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Pack label badge at bottom right */}
                            <div className="absolute bottom-4 right-4 z-10 rounded-full bg-[#26312d] px-5 py-2">
                                <span className="font-poppins text-[14px] font-medium text-white">
                                    {variants[selectedVariant].label === "30 days pack" ? "30 Day Pack"
                                        : variants[selectedVariant].label === "60 days pack" ? "60 Day Pack"
                                            : "6 Day Trial"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT PANEL ── */}
                <div className="box-border flex w-full flex-col items-center justify-center gap-0 overflow-clip rounded-2xl px-4 pt-4 pb-0 lg:w-[45%] lg:px-[30px] lg:pt-[16px]">
                    {/* Rating */}
                    <div className="flex h-auto min-h-[40px] lg:h-[53px] w-full flex-row flex-wrap items-center justify-start gap-2 lg:gap-[10px] overflow-clip">
                        <div className="flex text-[#11731b]">
                            {"★★★★★".split("").map((s, i) => (
                                <span key={i} className="text-[16px] sm:text-[18px] lg:text-[22px]">{s}</span>
                            ))}
                        </div>
                        <span className="font-poppins text-[12px] sm:text-[16px] lg:text-[20px] font-semibold text-[#11731b]">
                            4.9/5.0 (80,000)
                        </span>
                        <a href="#" className="font-tt-ramillas text-[12px] sm:text-[14px] lg:text-[18px] font-semibold text-[#34803c] hover:text-[#2a6a30] underline">
                            View test results
                        </a>
                    </div>

                    {/* Product title */}
                    <h3 className="w-full break-words  whitespace-pre-wrap font-tt-ramillas text-[32px] sm:text-[38px] lg:text-[45px] font-semibold leading-[1.2] tracking-[0.02em] text-[#34803c]">
                        Collagreens
                    </h3>

                    {/* Description paragraphs */}
                    <div className="mt-4 flex w-full flex-col gap-3 lg:gap-5">
                        <p className="w-full break-words whitespace-pre-wrap font-poppins text-[14px] sm:text-[16px] lg:text-[21px] font-normal leading-[1.3] lg:leading-[1.2] tracking-[-0.03em] text-[#3d3d3d]">
                            Collagreens combines hydrolyzed marine collagen with supergreens and 30+ bioactive ingredients across 6 clinically studied complexes. Designed to support radiant skin, stronger hair, and healthier nails while promoting gut health.
                        </p>
                        <p className="w-full break-words whitespace-pre-wrap font-poppins text-[14px] sm:text-[16px] lg:text-[21px] font-normal leading-[1.3] lg:leading-[1.2] tracking-[-0.03em] text-[#3d3d3d]">
                            The 6 complexes naturally deliver Vitamin C, Vitamin A, antioxidants, fibres, minerals and actives like amla, moringa and spirulina to support collagen supplementation deeply.
                        </p>
                        <p className="w-full break-words whitespace-pre-wrap font-poppins text-[14px] sm:text-[16px] lg:text-[21px] font-normal leading-[1.3] lg:leading-[1.2] tracking-[-0.03em] text-[#3d3d3d]">
                            Each convenient sachet delivers natural taste with real ingredients. Manufactured in a USFDA certified facility with third-party testing for purity and safety. No fillers. No artificial preservatives. No artificial sweeteners. No colourants.
                        </p>
                    </div>

                    {/* Feature checkmarks */}
                    <div className="mt-4 lg:mt-6 flex w-full flex-col items-start gap-2 lg:gap-[10px] overflow-clip">
                        {features.map((f, i) => (
                            <div key={i} className="flex items-center gap-2 lg:gap-3">
                                <svg width="16" height="16" className="lg:w-[20px] lg:h-[20px]" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="#34803c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="font-poppins text-[13px] sm:text-[15px] lg:text-[21px] leading-[1.1] font-normal text-[#3d3d3d]">{f}</span>
                            </div>
                        ))}
                    </div>

                    {/* Select Variant */}
                    <div className="mt-6 lg:mt-8 flex w-full flex-col items-start justify-center gap-2 lg:gap-[10px] overflow-clip">
                        <h4 className="font-poppins text-[18px] sm:text-[21px] lg:text-[24px] font-medium mt-2 mb-2 lg:mb-4 text-black">Select Variant</h4>
                        {/* Variant row */}
                        <div className="flex w-full flex-row items-center justify-start gap-4 sm:gap-6 lg:gap-[30px] overflow-x-auto overflow-y-clip pb-2">
                            {variants.map((v, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedVariant(i)}
                                    className="flex flex-col items-center gap-2 shrink-0"
                                >
                                    {/* Each variant */}
                                    <div
                                        className={`relative box-border h-[70px] w-[70px] sm:h-[85px] sm:w-[85px] lg:h-[100px] lg:w-[100px] overflow-clip rounded-full border-2 bg-[#fffdf2] transition-all ${selectedVariant === i ? "border-[#34803c]" : "border-[#c9c9c9]"
                                            }`}
                                    >
                                        <Image src={v.img} alt={v.label} fill sizes="(max-width: 768px) 20vw, 100px" className="object-contain p-2" />
                                    </div>
                                    <span
                                        className={`font-poppins text-[12px] sm:text-[13px] lg:text-[14px] ${selectedVariant === i ? "font-semibold text-black" : "font-normal text-gray-500"
                                            }`}
                                    >
                                        {v.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex w-full flex-col items-start gap-4 mt-6 lg:mt-0 lg:h-[138px] lg:justify-between">
                        <div>
                            <p className="font-antic-didone text-[24px] sm:text-[28px] lg:text-[32px] font-bold pb-1 leading-[1.2] text-black">
                                {variants[selectedVariant].label}
                            </p>
                            <p className="font-poppins text-[20px] sm:text-[24px] lg:text-[28px] font-normal pb-1 leading-[1.2] text-gray-500">
                                {variants[selectedVariant].price}
                            </p>
                        </div>
                        {/* CTA Buttons */}
                        <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4 ">
                            <Link href='/shop' className="box-border rounded-full border border-gray-400 bg-white px-6 py-2.5 sm:px-8 sm:py-3 font-poppins text-[14px] sm:text-[16px] font-medium text-black transition-all hover:border-[#34803c] hover:text-[#34803c] ">
                                View Details
                            </Link>
                            <button className="box-border rounded-full border border-gray-300 bg-[#fffc60] px-6 py-2.5 sm:px-10 sm:py-3 font-poppins text-[14px] sm:text-[16px] font-medium text-black transition-all hover:bg-[#f5f014] ">
                                Buy Now
                            </button>
                        </div>
                    </div>

                    {/* Clinical Studies Section */}
                    <div className="w-full mt-10 pt-10 border-t-2 border-[#e0e0e0]">
                        <h3 className="font-tt-ramillas text-[24px] sm:text-[28px] lg:text-[32px] font-semibold leading-[1.2] tracking-[0.02em] text-black mb-6">
                            Clinical studies and results
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-[#f5f5f5] p-6 rounded-2xl">
                                <p className="font-tt-ramillas text-[32px] font-bold text-[#34803c] mb-2">28%</p>
                                <p className="font-switzer text-[14px] sm:text-[16px] leading-[1.3] text-[#333]">
                                    Decrease in skin roughness from baseline levels
                                </p>
                            </div>
                            <div className="bg-[#f5f5f5] p-6 rounded-2xl">
                                <p className="font-tt-ramillas text-[32px] font-bold text-[#34803c] mb-2">18%</p>
                                <p className="font-switzer text-[14px] sm:text-[16px] leading-[1.3] text-[#333]">
                                    Increase in skin elasticity from baseline levels
                                </p>
                            </div>
                            <div className="bg-[#f5f5f5] p-6 rounded-2xl">
                                <p className="font-tt-ramillas text-[32px] font-bold text-[#34803c] mb-2">25%</p>
                                <p className="font-switzer text-[14px] sm:text-[16px] leading-[1.3] text-[#333]">
                                    Increase in skin hydration
                                </p>
                            </div>
                        </div>

                        <p className="font-switzer text-[12px] sm:text-[14px] leading-[1.4] text-[#666] mb-4">
                            Source: https://www.mdpi.com/2072-6643/10/7/826
                        </p>
                        <p className="font-switzer text-[13px] sm:text-[15px] leading-[1.4] text-[#666] mb-6">
                            Note: These results may be enhanced because of daily greens. These numbers are solely for collagen supplementation. Based on a 12 week randomized, double blind placebo study with daily collagen supplementation.
                        </p>

                        <a href="#" className="font-tt-ramillas text-[16px] sm:text-[18px] font-semibold text-[#34803c] hover:text-[#2a6a30] underline">
                            View test results (10,000+ clinical studies)
                        </a>
                    </div>

                    {/* Testing Parameters Section */}
                    <div className="w-full mt-10 pt-10 border-t-2 border-[#e0e0e0]">
                        <h3 className="font-tt-ramillas text-[24px] sm:text-[28px] lg:text-[32px] font-semibold leading-[1.2] tracking-[0.02em] text-black mb-6">
                            Testing parameters
                        </h3>

                        <div className="flex flex-wrap justify-center -m-2">
                            {testingParameters.map((test, i) => (
                                <div key={i} className="p-2 w-full sm:w-1/2 lg:w-1/4">
                                    <div className="bg-white border-2 border-[#34803c] p-4 rounded-xl text-center h-full">
                                        <div className="relative mx-auto mb-2 h-10 w-10 sm:h-11 sm:w-11">
                                            <Image
                                                src={test.src}
                                                alt={test.label}
                                                fill
                                                sizes="44px"
                                                className="object-contain"
                                            />
                                        </div>
                                        <p className="font-switzer text-[13px] sm:text-[14px] leading-[1.3] text-[#333]">
                                            {test.label}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* How to Use Section */}
                    <div className="w-full mt-10 pt-10 border-t-2 border-[#e0e0e0]">
                        <h3 className="font-tt-ramillas text-[24px] sm:text-[28px] lg:text-[32px] font-semibold leading-[1.2] tracking-[0.02em] text-black mb-6">
                            How to use
                        </h3>

                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#34803c] text-white font-tt-ramillas font-bold shrink-0">1</div>
                                <div>
                                    <p className="font-switzer text-[14px] sm:text-[16px] leading-[1.4] text-[#333]">
                                        Mix one sachet with 200ml of water or your favorite beverage
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#34803c] text-white font-tt-ramillas font-bold shrink-0">2</div>
                                <div>
                                    <p className="font-switzer text-[14px] sm:text-[16px] leading-[1.4] text-[#333]">
                                        Stir well or shake until fully dissolved
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#34803c] text-white font-tt-ramillas font-bold shrink-0">3</div>
                                <div>
                                    <p className="font-switzer text-[14px] sm:text-[16px] leading-[1.4] text-[#333]">
                                        Consume once daily, preferably in the morning on an empty stomach
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#34803c] text-white font-tt-ramillas font-bold shrink-0">4</div>
                                <div>
                                    <p className="font-switzer text-[14px] sm:text-[16px] leading-[1.4] text-[#333]">
                                        Consistent use for 8-12 weeks for best results
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShopFromUs;