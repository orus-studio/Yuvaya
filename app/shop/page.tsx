"use client";

import MiddleBanner from "@/Components/Landing/MiddleBanner";
import NewsLetter from "@/Components/Landing/NewsLetter";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const page = () => {
  return (
    <div className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 bg-white">
      {/* <ProductsPart />
      <ProductTransparency />
      <HowToUseSection />
      <FAQsForShopPage />
      <MiddleBanner />
      <StillDoubts />
      <NewsLetter /> */}
      <div className="flex items-center justify-center h-[60vh] text-center px-4 text-black">
        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm border border-[#e6e6e6] rounded-2xl p-8 shadow-lg">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#34a853] to-[#11731b] flex items-center justify-center text-white text-2xl sm:text-3xl animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-7 h-7">
                <path d="M6 2l1.5 3h9L18 2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 6h18l-1.5 13.5A2 2 0 0 1 17.5 22H6.5a2 2 0 0 1-1.99-2L3 6z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 11v6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 11v6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-tt-ramillas font-semibold text-[#11731b]">
              Shop Coming Soon
            </h2>

            <p className="text-sm sm:text-base text-[#333] max-w-xl">
              Were crafting something special — premium Collagreens bundles, launch offers and fast delivery. Sign up to be the first to know when we go live.
            </p>

            <div className="flex gap-3 mt-2">
              <a href="/notify" className="rounded-full bg-[#11731b] text-white px-4 py-2 font-poppins hover:bg-[#0e5f18]">Notify Me</a>
              <a href="/shop#products" className="rounded-full border border-[#11731b] text-[#11731b] px-4 py-2 font-poppins hover:bg-[#f7fff7]">Explore Teaser</a>
            </div>

            <div className="mt-3 text-xs text-gray-500">
              Follow us on <a href="https://instagram.com" className="underline">Instagram</a> for launch updates and exclusive previews.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

export const HowToUseSection = () => {
  const steps = [
    {
      number: 1,
      title: "Tear",
      description: "Tear open the sachet carefully",
      img: "/Shop/tear.png",
    },
    {
      number: 2,
      title: "Pour",
      description: "Pour into 200ml of water or beverage",
      img: "/Shop/pour.png",
    },
    {
      number: 3,
      title: "Shake",
      description: "Shake or stir well until fully dissolved",
      img: "/Shop/shake.png",
    },
    {
      number: 4,
      title: "Sip",
      description: "Enjoy your daily Collagreens",
      img: "/Shop/sip.png",
    },
  ];

  return (
    <section className="w-full bg-[#fffdf2] py-8 sm:py-12 md:py-16 lg:py-24 px-3 sm:px-4 md:px-6 lg:px-[50px]">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 mb-8 sm:mb-10 md:mb-12 lg:mb-16 max-w-3xl mx-auto">
        <h2 className="text-center font-tt-ramillas text-[28px] xs:text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-semibold text-black leading-[1.1]">
          How to Use
        </h2>
        <p className="text-center font-poppins text-[12px] xs:text-[13px] sm:text-[14px] md:text-[15px] lg:text-[17px] text-[#666] mt-1 px-2">
          Simple 4-step process to prepare your daily wellness drink
        </p>
      </div>

      {/* Steps */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            {/* Image card */}
            <div className="relative w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-[#34803c] sm:border-2 mb-2 sm:mb-3 md:mb-4">
              <Image
                src={step.img}
                alt={step.title}
                fill
                sizes="(max-width: 480px) 40vw, (max-width: 768px) 40vw, (max-width: 1024px) 28vw, 20vw"
                className="object-cover p-2 sm:p-3 md:p-4"
              />
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 bg-[#34803c] rounded-full flex items-center justify-center">
                <span className="text-white font-poppins text-[10px] sm:text-[11px] md:text-[13px] font-semibold">
                  {step.number}
                </span>
              </div>
            </div>
            <h3 className="font-tt-ramillas text-[16px] xs:text-[18px] sm:text-[22px] md:text-[26px] lg:text-[32px] font-semibold text-[#34803c] mb-1">
              {step.title}
            </h3>
            <p className="font-poppins text-[10px] xs:text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] text-[#666] leading-[1.4] px-1">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const ProductsPart = () => {
  const features = [
    "Refreshing taste and no fishy smell",
    "Quick absorbing",
    "Clinically proven results",
    "Sourced from India for Indians",
    "Tested amino acids",
  ];

  const variants = [
    {
      label: "30 days pack",
      price: "₹ 3,100",
      img: "/Landing/Stand Up Pouch Front latest mockup.png",
    },
    {
      label: "60 days pack",
      price: "₹ 5,800",
      img: "/Landing/Stand Up Pouch Front latest mockup.png",
    },
    {
      label: "6 days trial",
      price: "₹ 699",
      img: "/Landing/Stand Up Pouch Front latest mockup.png",
    },
  ];

  const thumbnails = [
    {
      src: "/Landing/Stand Up Pouch Front latest mockup.png",
      alt: "Pouch Front",
    },
    { src: "/Landing/Sachet Front latest mockup.png", alt: "Sachet Front" },
    { src: "/Landing/Sachet Back latest mockup.png", alt: "Sachet Back" },
  ];
  const [activeThumbnail, setActiveThumbnail] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);

  return (
    <section id="products" className="bg-white min-h-screen w-full">
      <div className="box-border flex w-full flex-col items-start gap-6 sm:gap-8 overflow-visible px-3 sm:px-4 md:px-6 lg:flex-row lg:justify-evenly lg:gap-0 lg:px-[50px]">
        {/* ── LEFT PANEL (sticky image block) ─────────────────────────── */}
        <div className="h-fit w-full shrink-0 lg:sticky lg:top-20 lg:w-[55%]">
          {/* Outer container: responsive height and styling */}
          <div className="box-border flex h-[280px] xs:h-[300px] sm:h-[380px] md:h-[480px] lg:h-[650px] w-full flex-row items-center justify-center gap-2 sm:gap-3 overflow-clip rounded-xl sm:rounded-2xl border-2 sm:border-[3px] lg:border-[4px] border-[#fff6b3] bg-[#faf6de] p-2 sm:p-3 md:p-4 lg:p-5">
            {/* Thumbnails column — each card fully rounded with gaps between */}
            <div
              className="flex h-full shrink-0 flex-col gap-1 sm:gap-2"
              style={{ width: "25%" }}
            >
              {thumbnails.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActiveThumbnail(i)}
                  className={`relative box-border flex w-full flex-1 cursor-pointer items-center justify-center overflow-clip hover:scale-105 transition-transform ${i === 0 ? "rounded-t-lg sm:rounded-t-2xl" : ""} ${i === 2 ? "rounded-b-lg sm:rounded-b-2xl" : ""} border border-[#34803c] sm:border-2 lg:border-[3px] bg-[#fffdf2] transition-all`}
                >
                  <Image
                    src={t.src}
                    alt={t.alt}
                    fill
                    sizes="(max-width: 480px) 20vw, (max-width: 768px) 25vw, 12vw"
                    className="object-contain p-1 sm:p-2 md:p-3"
                  />
                </button>
              ))}
            </div>

            {/* Main product image — responsive height */}
            <div
              className="relative box-border flex flex-col overflow-clip rounded-lg sm:rounded-xl lg:rounded-[14px] border border-[#34803c] sm:border-2 lg:border-[4px] bg-[#fffdf2]"
              style={{ width: "75%", height: "100%" }}
            >
              {/* Limited Time Offer banner */}
              <div className="absolute top-2 sm:top-4 lg:top-10 z-50 flex h-6 sm:h-8 lg:h-11 w-full shrink-0 items-center justify-center border-y-2 sm:border-y-4 border-[#11731b] bg-[#fffc60]">
                <span className="font-cormorant text-[11px] sm:text-[14px] md:text-[16px] lg:text-[20px] font-normal italic text-[#11731b]">
                  Limited Time Offer
                </span>
              </div>

              {/* Product image — changes based on selected thumbnail */}
              <div className="absolute inset-0 z-30 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
                <div className="relative h-full w-full max-h-full max-w-full">
                  <Image
                    src={thumbnails[activeThumbnail].src}
                    alt={thumbnails[activeThumbnail].alt}
                    key={activeThumbnail}
                    fill
                    sizes="(max-width: 480px) 70vw, (max-width: 768px) 50vw, (max-width: 1024px) 45vw, 50vw"
                    className="object-contain object-center"
                    priority
                  />
                </div>
              </div>

              {/* Pack label badge at bottom right */}
              <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 lg:bottom-4 lg:right-4 z-10 rounded-full bg-[#26312d] px-3 sm:px-4 lg:px-5 py-1 sm:py-2">
                <span className="font-poppins text-[10px] sm:text-[12px] lg:text-[14px] font-medium text-white">
                  {variants[selectedVariant].label === "30 days pack"
                    ? "30 Day Pack"
                    : variants[selectedVariant].label === "60 days pack"
                      ? "60 Day Pack"
                      : "6 Day Trial"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="box-border flex w-full flex-col items-start justify-start gap-0 overflow-clip rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-6 pt-4 pb-0 lg:w-[45%] lg:px-[30px] lg:pt-[16px]">
          {/* Rating */}
          <div className="flex h-auto min-h-fit lg:h-[53px] w-full flex-row flex-wrap items-center justify-start gap-1 sm:gap-2 lg:gap-[10px] overflow-clip">
            <div className="flex text-[#11731b] gap-0.5">
              {"★★★★★".split("").map((s, i) => (
                <span
                  key={i}
                  className="text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px]"
                >
                  {s}
                </span>
              ))}
            </div>
            <span className="font-poppins text-[10px] xs:text-[11px] sm:text-[13px] md:text-[15px] lg:text-[20px] font-semibold text-[#11731b]">
              4.9/5.0 (80,000)
            </span>
            <a
              href="/test-results"
              className="font-tt-ramillas text-[10px] xs:text-[11px] sm:text-[12px] md:text-[14px] lg:text-[18px] font-semibold text-[#34803c] hover:text-[#2a6a30] underline"
            >
              View test results
            </a>
          </div>

          {/* Product title */}
          <h3 className="w-full break-words font-tt-ramillas text-[24px] xs:text-[28px] sm:text-[32px] md:text-[38px] lg:text-[45px] font-semibold leading-[1.2] tracking-[0.02em] text-[#34803c] mt-2">
            Collagreens
          </h3>

          {/* Product Specifications */}
          <div className="mt-2 sm:mt-3 flex gap-2 flex-wrap">
            <span className="inline-block bg-[#e8f5e9] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-poppins text-[10px] xs:text-[11px] sm:text-[12px] lg:text-[14px] font-medium text-[#34803c] border border-[#34803c]">
              200 g
            </span>
            <span className="inline-block bg-[#e8f5e9] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-poppins text-[10px] xs:text-[11px] sm:text-[12px] lg:text-[14px] font-medium text-[#34803c] border border-[#34803c]">
              Unflavored
            </span>
          </div>

          {/* Description paragraphs */}
          <div className="mt-3 sm:mt-4 flex w-full flex-col gap-2 sm:gap-3 lg:gap-5">
            <p className="w-full break-words font-poppins text-[12px] xs:text-[13px] sm:text-[14px] md:text-[16px] lg:text-[21px] font-normal leading-[1.4] sm:leading-[1.3] lg:leading-[1.2] tracking-[-0.03em] text-[#3d3d3d]">
              Collagreens combines hydrolyzed marine collagen with supergreens
              and 30+ bioactive ingredients across 6 clinically studied
              complexes. Designed to support radiant skin, stronger hair, and
              healthier nails while promoting gut health.
            </p>
            <p className="w-full break-words font-poppins text-[12px] xs:text-[13px] sm:text-[14px] md:text-[16px] lg:text-[21px] font-normal leading-[1.4] sm:leading-[1.3] lg:leading-[1.2] tracking-[-0.03em] text-[#3d3d3d]">
              The 6 complexes naturally deliver Vitamin C, Vitamin A,
              antioxidants, fibres, minerals and actives like amla, moringa and
              spirulina to support collagen supplementation deeply.
            </p>
            <p className="w-full break-words font-poppins text-[12px] xs:text-[13px] sm:text-[14px] md:text-[16px] lg:text-[21px] font-normal leading-[1.4] sm:leading-[1.3] lg:leading-[1.2] tracking-[-0.03em] text-[#3d3d3d]">
              Each convenient sachet delivers natural taste with real
              ingredients. Manufactured in a USFDA certified facility with
              third-party testing for purity and safety. No fillers. No
              artificial preservatives. No artificial sweeteners. No colourants.
            </p>
          </div>

          {/* Feature checkmarks */}
          <div className="mt-4 sm:mt-5 lg:mt-8 flex w-full flex-col items-start gap-1.5 sm:gap-2 lg:gap-[10px] overflow-clip">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-start sm:items-center gap-2 sm:gap-2.5 lg:gap-3"
              >
                <svg
                  width="14"
                  height="14"
                  className="shrink-0 mt-0.5 sm:mt-0 sm:w-[16px] sm:h-[16px] lg:w-[20px] lg:h-[20px]"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M4 10L8 14L16 6"
                    stroke="#34803c"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-poppins text-[11px] xs:text-[12px] sm:text-[13px] md:text-[15px] lg:text-[21px] leading-[1.3] sm:leading-[1.1] font-normal text-[#3d3d3d]">
                  {f}
                </span>
              </div>
            ))}
          </div>

          {/* Select Variant */}
          <div className="mt-4 sm:mt-5 lg:mt-8 flex w-full flex-col items-start justify-center gap-2 lg:gap-[10px] overflow-clip">
            <h4 className="font-poppins text-[14px] xs:text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-medium mt-2 mb-2 lg:mb-4 text-black">
              Select Variant
            </h4>
            {/* Variant row */}
            <div className="flex w-full flex-row items-center justify-start gap-3 sm:gap-4 md:gap-6 lg:gap-[30px] overflow-x-auto overflow-y-clip pb-2 scrollbar-hide">
              {variants.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedVariant(i)}
                  className="flex flex-col items-center gap-1.5 shrink-0"
                >
                  {/* Each variant */}
                  <div
                    className={`relative box-border h-[60px] w-[60px] xs:h-[65px] xs:w-[65px] sm:h-[75px] sm:w-[75px] md:h-[85px] md:w-[85px] lg:h-[100px] lg:w-[100px] overflow-clip rounded-full border-2 bg-[#fffdf2] transition-all hover:scale-105 ${
                      selectedVariant === i
                        ? "border-[#34803c] shadow-md"
                        : "border-[#c9c9c9]"
                    }`}
                  >
                    <Image
                      src={v.img}
                      alt={v.label}
                      fill
                      sizes="(max-width: 480px) 18vw, (max-width: 768px) 18vw, (max-width: 1024px) 15vw, 100px"
                      className="object-contain p-1.5 sm:p-2"
                    />
                  </div>
                  <span
                    className={`font-poppins text-[10px] xs:text-[11px] sm:text-[12px] lg:text-[14px] text-center ${
                      selectedVariant === i
                        ? "font-semibold text-black"
                        : "font-normal text-gray-500"
                    }`}
                  >
                    {v.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex w-full flex-col items-start gap-3 sm:gap-4 mt-4 sm:mt-5 lg:mt-0 lg:h-[138px] lg:justify-between">
            <div>
              <p className="font-antic-didone text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold pb-1 leading-[1.2] text-black">
                {variants[selectedVariant].label}
              </p>
              <p className="font-poppins text-[16px] xs:text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-normal pb-1 leading-[1.2] text-gray-500">
                {variants[selectedVariant].price}
              </p>
            </div>
            {/* CTA Buttons */}
            <div className="flex w-full flex-col gap-2 sm:gap-3 md:gap-4 sm:flex-row">
              <a
                href="/cart"
                className="box-border rounded-full border border-gray-400 bg-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 font-poppins text-[12px] xs:text-[13px] sm:text-[14px] md:text-[16px] font-medium text-black transition-all hover:border-[#34803c] hover:text-[#34803c] text-center flex-1 sm:flex-auto"
              >
                Add to Cart
              </a>
              <a
                href="/checkout"
                className="box-border rounded-full border border-gray-300 bg-[#fffc60] px-4 sm:px-8 md:px-10 py-2 sm:py-2.5 md:py-3 font-poppins text-[12px] xs:text-[13px] sm:text-[14px] md:text-[16px] font-medium text-black transition-all hover:bg-[#f5f014] text-center flex-1 sm:flex-auto"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const transparencyRows = [
  {
    img: "/Shop/WhatsInside.png",
    alt: "What's Inside",
    title: "What\u2019s Inside",
    desc: "Only 4 real ingredient systems \u2014 each one chosen for a reason. No mystery blends, no proprietary formulas. You see exactly what goes into every sachet.",
  },
  {
    img: "/Shop/WhatsNotInside.png",
    alt: "What's Not Inside",
    title: "What\u2019s Not Inside",
    desc: "Zero artificial flavours, colours, added sugars, or sweeteners. We stripped out everything your body doesn\u2019t need \u2014 so only the good stuff remains.",
  },
  {
    img: "/Shop/MostTransparentLabel.png",
    alt: "Most Transparent Label",
    title: "Full Ingredient Transparency",
    desc: "Every ingredient listed with its exact percentage. 93% whey protein concentrate, 6.8% cocoa powder, 0.2% stevia \u2014 no hiding behind vague labels.",
  },
  {
    img: "/Shop/NutrientValue.png",
    alt: "Nutritional Table",
    title: "Complete Nutrition Facts",
    desc: "24g protein and 5.2g BCAAs per 33g serving. Full macro and micronutrient breakdown so you know exactly what you\u2019re fuelling your body with.",
  },
  {
    img: "/Shop/Believe.png",
    alt: "Lab Testing Parameters",
    title: "7 Critical Lab Tests",
    desc: "Every batch is tested for protein accuracy, amino acid profile, heavy metals, melamine spiking, microbial contamination, aflatoxins, and pesticides.",
  },
  {
    img: "/Shop/LabTested.png",
    alt: "Lab Tested and Passed",
    title: "Third-Party Lab Verified",
    desc: "Independently tested and certified. Every claim on the label is backed by real lab reports \u2014 not marketing promises. Full results available on request.",
  },
];

export const ProductTransparency = () => {
  return (
    <section className="w-full bg-white">
      {transparencyRows.map((row, i) => {
        const isEven = i % 2 === 0;
        return (
          <div
            key={i}
            className={`flex flex-col ${
              isEven ? "lg:flex-row" : "lg:flex-row-reverse"
            } w-full min-h-[280px] xs:min-h-[320px] sm:min-h-[380px] md:min-h-[450px] lg:min-h-[500px] 2xl:min-h-[600px]`}
          >
            {/* Image half */}
            <div
              className={`relative w-full lg:w-1/2 min-h-[200px] xs:min-h-[240px] sm:min-h-[300px] md:min-h-[380px] lg:min-h-full bg-[#f7f7f7] flex ${isEven ? "justify-end" : "justify-start"}`}
            >
              <Image
                src={row.img}
                alt={row.alt}
                fill
                sizes="(max-width: 480px) 100vw, (max-width: 1024px) 100vw, 50vw"
                className={`object-contain p-3 xs:p-4 sm:p-6 md:p-8 lg:p-10 ${isEven ? "lg:object-right" : "lg:object-left"}`}
              />
            </div>

            {/* Text half */}
            <div
              className={`w-full lg:w-1/2 flex flex-col justify-center py-6 sm:py-8 md:py-10 lg:py-12 px-4 xs:px-6 sm:px-0 ${isEven ? "lg:items-start lg:pl-10 lg:pr-16 bg-white" : "lg:items-end lg:pr-10 lg:pl-16 bg-[#fffdf2]"} items-start md:items-${isEven ? "start" : "end"}`}
            >
              <span
                className={`font-poppins text-[9px] xs:text-[10px] sm:text-[11px] lg:text-[12px] ${isEven ? "text-left" : "md:text-right text-left lg:text-right"} font-semibold uppercase tracking-widest text-[#34803c] mb-2 sm:mb-3`}
              >
                {String(i + 1).padStart(2, "0")} / 06
              </span>
              <h3
                className={`font-tt-ramillas text-[18px] xs:text-[20px] sm:text-[24px] md:text-[30px] lg:text-[36px] ${isEven ? "text-left" : "md:text-right text-left lg:text-right"} font-semibold text-black leading-[1.15] mb-2 sm:mb-4 lg:mb-6`}
              >
                {row.title}
              </h3>
              <p
                className={`font-poppins text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] ${isEven ? "text-left" : "md:text-right text-left lg:text-right"} text-[#555] leading-[1.6] max-w-lg`}
              >
                {row.desc}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export const FAQsForShopPage = () => {
  const faqs = [
    {
      question: "Is Yuvaya collagen really chemical free?",
      answer:
        "Yes, Yuvaya Collagen is 100% chemical free and made from 6 complexes.",
    },
    {
      question: "How will I know that my order is confirmed?",
      answer:
        "You shall receive communication on WhatsApp and Email after placing your order successfully on the website. Additionally, you can also check this under the my orders section account page",
    },
    {
      question: "Do I need to order from the website or somewhere else?",
      answer:
        "Currently we are only available at our own website, and are soon planning to cover different vendors as well.",
    },
    {
      question: "When will I get my order",
      answer:
        "7-10 business days (excluding weekends and public holidays). Delivery times vary depending on your location.",
    },
    {
      question: "How much does shipping cost?",
      answer: "There are no shipping fees unless mentioned otherwise.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="box-border flex min-h-min w-full flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 overflow-clip bg-[#fffdf2] px-3 sm:px-4 md:px-6 pt-6 sm:pt-8 md:pt-10 pb-8 sm:pb-10 md:pb-12">
      <div className="flex justify-center items-center flex-col gap-1.5 sm:gap-2">
        {/* FAQs badge */}
        <div className="box-border flex h-[24px] sm:h-[28px] min-w-min flex-col items-center justify-center overflow-clip rounded-full bg-[#26312d] px-2.5 sm:px-3">
          <span className="whitespace-pre text-[9px] sm:text-[10px] md:text-[11px] font-semibold uppercase tracking-wider text-[#fffdf2]">
            FAQs
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center font-tt-ramillas text-[20px] xs:text-[22px] sm:text-[28px] md:text-[36px] lg:text-[40px] 2xl:text-[48px] font-[400] leading-[1.1] tracking-[0.03em] text-[#000000]">
          Got Questions?
        </h2>
      </div>
      {/* Accordion container */}
      <div className="flex w-full flex-col items-center justify-start gap-1.5 sm:gap-2 md:gap-3 rounded-xl sm:rounded-2xl border-2 sm:border-[3px] border-[#26312d] bg-[#26312d] p-1 sm:p-[2px] md:max-w-[950px]">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`w-full overflow-hidden ${index == 0 ? "rounded-t-2xl" : ""} ${index == faqs.length - 1 && !isOpen ? "rounded-b-2xl" : ""} ${isOpen && index == faqs.length - 1 ? "rounded-b-2xl" : ""} bg-[#fffdf2]`}
            >
              {/* Question row */}
              <button
                onClick={() => toggle(index)}
                className="box-border flex min-h-[44px] xs:min-h-[48px] sm:min-h-[52px] md:min-h-[56px] w-full cursor-pointer flex-row items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 md:px-[18px] text-left"
              >
                <span className="flex-1 whitespace-pre-wrap font-sans text-[13px] xs:text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] font-medium leading-[1.4] text-[#000000]">
                  {faq.question}
                </span>
                <div className="flex h-5 w-5 xs:h-5.5 xs:w-5.5 sm:h-6 sm:w-6 md:h-7 md:w-7 shrink-0 items-center justify-center rounded-full bg-[#26312d]">
                  <div className="relative flex items-center justify-center">
                    {/* Horizontal line (always visible) */}
                    <div className="h-[1.5px] w-[12px] sm:h-[2px] sm:w-[14px] md:h-[3px] md:w-[18px] rounded-full bg-[#fffdf2]" />
                    {/* Vertical line (rotates and merges into horizontal to form minus) */}
                    <motion.div
                      className="absolute h-[12px] w-[1.5px] sm:h-[14px] sm:w-[2px] md:h-[18px] md:w-[3px] rounded-full bg-[#fffdf2]"
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ originY: 0.5, originX: 0.5 }}
                    />
                  </div>
                </div>
              </button>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="box-border flex w-full flex-col items-center justify-start gap-1.5 sm:gap-2 md:gap-3 px-3 sm:px-4 md:px-[18px] pb-2 sm:pb-3 md:pb-4 pt-0">
                      {/* Separator between question and answer */}
                      <div className="h-px w-full bg-gray-400" />
                      <p className="w-full whitespace-pre-wrap text-left font-sans text-[12px] xs:text-[12.5px] sm:text-[13px] md:text-[14px] lg:text-[15px] font-normal leading-[1.5] text-[#444444]">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export const StillDoubts = () => {
  const reviews = [
    { name: "Karan", rating: 5, date: "24/04/2026" },
    { name: "Karan", rating: 5, date: "24/04/2026" },
    { name: "Karan", rating: 5, date: "24/04/2026" },
  ];

  const renderStars = (count: number) => (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <span key={i} className="text-[#11731b] text-3xl">
          <Star fill="#11731b" />
        </span>
      ))}
    </div>
  );

  return (
    <section className="relative w-full min-h-auto flex flex-col justify-center items-center px-3 sm:px-4 md:px-6 lg:px-0 py-6 sm:py-8 md:py-10 lg:py-[60px] 2xl:py-[80px] bg-[#fffdf2] gap-8 sm:gap-10 md:gap-12 lg:gap-[50px] overflow-clip">
      {/* Heading Container */}
      <div className="w-full flex flex-col justify-center items-center px-2 xs:px-4 sm:px-6 md:px-10 lg:px-20 gap-2 sm:gap-3 md:gap-4">
        {/* Reviews Badge */}
        <div className="flex justify-center items-center h-[24px] sm:h-[28px] bg-[#26312d] px-2.5 sm:px-3 rounded-full">
          <span className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold uppercase tracking-widest text-[#fffdf2]">
            Reviews
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="text-[22px] xs:text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] 2xl:text-[52px] font-normal text-center leading-tight text-black font-tt-ramillas px-2">
          Still doubts?
        </h2>
      </div>

      {/* Reviews Container - Responsive Width */}
      <div className="w-full max-w-6xl flex flex-col gap-3 sm:gap-4 md:gap-5 px-3 sm:px-4 md:px-6 lg:px-0">
        {/* First Card - Rating Stats with Blue Boxes */}
        <div className="w-full h-auto lg:h-[180px] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-5 lg:gap-0 p-4 sm:p-6 md:p-8 bg-[#fff7c7] rounded-[20px] sm:rounded-[24px] md:rounded-[30px]">
          {/* Left Content - Rating Info */}
          <div className="flex flex-col w-full lg:w-auto">
            {/* Stars Rating */}
            {renderStars(5)}

            {/* Rating Number */}
            <p className="text-sm sm:text-base md:text-lg lg:text-lg font-semibold text-[#11731b] font-poppins mt-2">
              4.9/5.0
            </p>

            {/* Review Count */}
            <p className="text-xs sm:text-sm md:text-base lg:text-xl font-semibold text-[#11731b] font-poppins mt-0.5">
              Based on 480 reviews
            </p>

            {/* Write Review Button */}
            <a
              href="/reviews/write"
              className="w-fit mt-3 sm:mt-4 px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 bg-black text-white text-xs sm:text-sm md:text-base lg:text-base font-semibold rounded-[4px] sm:rounded-[6px] hover:bg-gray-900 transition-colors font-poppins inline-block text-center"
            >
              Write a review
            </a>
          </div>

          {/* Right Content - Blue Boxes */}
          <div className="flex gap-2 sm:gap-3 md:gap-4 w-full lg:w-auto justify-center lg:justify-end flex-wrap lg:flex-nowrap">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-[70px] h-[70px] xs:w-[80px] xs:h-[80px] sm:w-[100px] sm:h-[100px] md:w-[110px] md:h-[110px] lg:w-[130px] lg:h-[130px] bg-[#44ccff] rounded-[8px] sm:rounded-[10px] shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Review Cards */}
        {reviews.map((review, idx) => (
          <div
            key={idx}
            className="w-full h-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 sm:gap-4 md:gap-5 lg:gap-0 p-4 sm:p-6 md:p-8 bg-[#fff7c7] rounded-[20px] sm:rounded-[24px] md:rounded-[30px]"
          >
            {/* Left Content - Reviewer Info */}
            <div className="flex flex-col gap-2 sm:gap-3 w-full lg:w-auto">
              {/* Reviewer Name */}
              <p className="text-sm sm:text-base md:text-lg lg:text-2xl font-semibold text-black font-poppins">
                {review.name}
              </p>

              {/* Stars */}
              <div className="text-xl sm:text-2xl md:text-3xl">
                {renderStars(review.rating)}
              </div>
            </div>

            {/* Right Content - Date */}
            <p className="text-sm sm:text-base md:text-lg lg:text-2xl font-medium text-[rgba(0,0,0,0.5)] font-poppins whitespace-nowrap">
              {review.date}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
