"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Loader2,
  ShoppingCart,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Award,
  ArrowRight,
  Camera,
  ImageIcon,
  MessageSquare,
  ThumbsUp,
  RotateCw,
  Droplets,
  Zap,
  Scissors
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { createCheckout } from "@/app/actions/createCheckout";
import MiddleBanner from "@/Components/Landing/MiddleBanner";
import NewsLetter from "@/Components/Landing/NewsLetter";

export default function ShopPage() {
  return (
    <div className="w-full pt-16 sm:pt-20 md:pt-24 bg-[#fffff7] text-[#111827]">
      {/* Hero / Main Shop Product Buying Section */}
      <ProductsPart />

      {/* Product Transparency & Feature Grid using 10 High-Res Folder Images */}
      <ProductTransparency />

      {/* Clinical Studies & Scientific Validation */}
      <ClinicalStudiesSection />

      {/* Lab Testing Parameters */}
      <TestingParametersSection />

      {/* How To Use Circular Section with Frame10 in Center */}
      <HowToUseSection />

      {/* Interactive FAQ Accordion */}
      <FAQsForShopPage />

      {/* Middle Promo Banner */}
      <MiddleBanner />

      {/* Customer Reviews Section */}
      <StillDoubts />

      {/* Newsletter Subscription */}
      <NewsLetter />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   1. PRODUCTS HERO & CHECKOUT SECTION
   ───────────────────────────────────────────────────────────── */
export const ProductsPart = () => {
  const { addToCart } = useCart();
  const [isBuying, setIsBuying] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const features = [
    "Refreshing taste and no fishy smell",
    "Quick absorbing hydrolyzed marine peptides",
    "Clinically proven 12-week results",
    "Formulated for Indian lifestyle & climate",
    "Tested amino acids & zero artificial fillers",
  ];

  const variants = [
    {
      id: "gid://shopify/ProductVariant/58221348290641",
      label: "30 days pack",
      badge: "Most Popular",
      price: "₹ 3,100",
      numericPrice: 3100,
      originalPrice: undefined,
      img: "/Landing/Stand Up Pouch Front latest mockup.png",
    },
    {
      id: "gid://shopify/ProductVariant/58395879473233",
      label: "60 days pack",
      badge: "Best Value",
      price: "₹ 5,600",
      numericPrice: 5600,
      originalPrice: "₹ 5,800",
      img: "/Landing/Stand Up Pouch Front latest mockup.png",
    },
    {
      id: "gid://shopify/ProductVariant/59057234608209",
      label: "6 days trial",
      badge: "Starter Pack",
      price: "₹ 699",
      numericPrice: 699,
      originalPrice: undefined,
      img: "/Landing/Sachet Front latest mockup.png",
    },
  ];

  const productThumbnails = [
    { src: "/Landing/Stand Up Pouch Front latest mockup.png", alt: "Stand Up Pouch Front View" },
    { src: "/Landing/Sachet Front latest mockup.png", alt: "Collagreens Sachet Front View" },
    { src: "/Landing/Sachet Back latest mockup.png", alt: "Collagreens Sachet Back View" },
    { src: "/Landing/Stand Up Pouch Back latest mockup.png", alt: "Stand Up Pouch Back View" },
  ];

  const [activeThumbnail, setActiveThumbnail] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const updateScrollButtons = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const isMobileRow = window.innerWidth < 640;
      if (isMobileRow) {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        setIsScrollable(scrollWidth > clientWidth);
        setCanScrollUp(scrollLeft > 2);
        setCanScrollDown(scrollLeft + clientWidth < scrollWidth - 2);
      } else {
        const { scrollTop, scrollHeight, clientHeight } = container;
        setIsScrollable(scrollHeight > clientHeight);
        setCanScrollUp(scrollTop > 2);
        setCanScrollDown(scrollTop + clientHeight < scrollHeight - 2);
      }
    }
  }, []);

  const scrollPrev = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const isMobileRow = window.innerWidth < 640;
      const delta = isMobileRow ? -90 : -100;
      if (isMobileRow) {
        container.scrollBy({ left: delta, behavior: "smooth" });
      } else {
        container.scrollBy({ top: delta, behavior: "smooth" });
      }
    }
  };

  const scrollNext = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const isMobileRow = window.innerWidth < 640;
      const delta = isMobileRow ? 90 : 100;
      if (isMobileRow) {
        container.scrollBy({ left: delta, behavior: "smooth" });
      } else {
        container.scrollBy({ top: delta, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, [updateScrollButtons]);

  const handleAddToCart = () => {
    const v = variants[selectedVariant];
    addToCart({
      id: v.id,
      title: "Collagreens",
      variantLabel: v.label,
      price: v.price,
      image: v.img,
      quantity: 1,
    });
  };

  const handleBuyNow = async () => {
    const v = variants[selectedVariant];
    setIsBuying(true);
    setCheckoutError(null);
    try {
      const res = await createCheckout(v.id, 1);
      if ("webUrl" in res && res.webUrl) {
        window.location.href = res.webUrl;
      } else if ("error" in res && res.error) {
        setCheckoutError(res.error);
        setIsBuying(false);
      } else {
        setIsBuying(false);
      }
    } catch (e) {
      console.error(e);
      setCheckoutError("Failed to initiate checkout. Please try again.");
      setIsBuying(false);
    }
  };

  return (
    <section id="products" className="w-full pb-12 sm:pb-16 lg:pb-20">
      {/* Section Header */}
      <div className="mb-6 sm:mb-10 flex flex-col items-center gap-2 text-center px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#26312d] text-white">
          <span className="font-poppins text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-[#fffdf2]">
            Official Yuvaya Shop
          </span>
        </div>
        <h1 className="font-cormorant font-bold text-[34px] sm:text-[48px] lg:text-[60px] leading-[1.1] text-[#111827]">
          Shop Collagreens
        </h1>
        <p className="font-switzer text-[14px] sm:text-[18px] lg:text-[22px] font-medium text-[#4b5563] max-w-xl">
          The only <span className="font-bold text-[#34803c]">Daily Greens + Marine Collagen</span> engineered for Indian skin & body
        </p>
      </div>

      <div className="box-border flex w-full flex-col items-start gap-8 px-3 sm:px-6 lg:flex-row lg:justify-between lg:gap-8 lg:px-[50px] max-w-7xl mx-auto">
        {/* ── LEFT PANEL (sticky gallery block) ─────────────────────────── */}
        <div className="h-fit w-full shrink-0 lg:sticky lg:top-24 lg:w-[55%]">
          <div className="box-border flex h-[390px] xs:h-[430px] sm:h-[480px] lg:h-[620px] xl:h-[660px] w-full flex-col sm:flex-row items-center justify-center gap-3 overflow-hidden rounded-2xl border border-gray-200 bg-[#faf6de] p-3 sm:p-4">
            
            {/* Main Product Image Container */}
            <div className="relative flex-1 w-full sm:w-auto h-[280px] xs:h-[310px] sm:h-full flex flex-col overflow-hidden rounded-xl border-2 border-[#34803c] bg-[#fffdf2] order-1 sm:order-2 shadow-sm">
              <div className="absolute inset-0 z-20 flex items-center justify-center p-4 sm:p-6 lg:p-10">
                <div className="relative h-full w-full max-h-full max-w-full flex items-center justify-center">
                  <Image
                    src={productThumbnails[activeThumbnail].src}
                    alt={productThumbnails[activeThumbnail].alt}
                    key={activeThumbnail}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 600px"
                    className="object-contain object-center transition-all duration-300 drop-shadow-md"
                    priority
                  />
                </div>
              </div>

              {/* Variant Tag Badge */}
              <div className="absolute bottom-3 right-3 z-30 rounded-full bg-[#26312d] px-3.5 py-1.5 shadow">
                <span className="font-poppins text-[11px] sm:text-[13px] font-semibold text-white">
                  {variants[selectedVariant].label}
                </span>
              </div>

              {/* Image Title Badge */}
              <div className="absolute top-3 left-3 z-30 rounded-lg bg-white/90 backdrop-blur-sm px-3 py-1 border border-[#34803c]/20 shadow-sm">
                <span className="font-poppins text-[10px] sm:text-[11px] font-medium text-[#26312d]">
                  {productThumbnails[activeThumbnail].alt}
                </span>
              </div>
            </div>

            {/* Thumbnails Container */}
            <div className="relative flex w-full sm:w-[22%] h-auto sm:h-full shrink-0 flex-row sm:flex-col items-center justify-between order-2 sm:order-1 pt-1 sm:pt-0">
              {isScrollable && (
                <button
                  type="button"
                  onClick={scrollPrev}
                  disabled={!canScrollUp}
                  className="z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#34803c]/15 text-[#34803c] hover:bg-[#34803c] hover:text-white transition-all disabled:opacity-30 cursor-pointer mb-1"
                >
                  <ChevronLeft className="w-4 h-4 sm:hidden" />
                  <ChevronUp className="hidden sm:block w-4 h-4" />
                </button>
              )}

              <div
                ref={scrollContainerRef}
                onScroll={updateScrollButtons}
                className="w-full flex-1 overflow-x-auto sm:overflow-x-hidden sm:overflow-y-auto no-scrollbar scroll-smooth flex flex-row sm:flex-col gap-2 py-1 px-1 justify-center"
              >
                {productThumbnails.map((t, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveThumbnail(i)}
                    className={`relative box-border h-14 w-14 sm:h-auto sm:w-full aspect-square shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
                      activeThumbnail === i
                        ? "border-[#34803c] bg-white ring-2 ring-[#34803c]/20 scale-[0.98] shadow-md"
                        : "border-gray-200 bg-white opacity-70 hover:opacity-100 hover:border-[#34803c]/40"
                    }`}
                  >
                    <Image
                      src={t.src}
                      alt={t.alt}
                      fill
                      sizes="(max-width: 640px) 15vw, 10vw"
                      className="object-contain p-1.5"
                    />
                  </button>
                ))}
              </div>

              {isScrollable && (
                <button
                  type="button"
                  onClick={scrollNext}
                  disabled={!canScrollDown}
                  className="z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#34803c]/15 text-[#34803c] hover:bg-[#34803c] hover:text-white transition-all disabled:opacity-30 cursor-pointer mt-1"
                >
                  <ChevronRight className="w-4 h-4 sm:hidden" />
                  <ChevronDown className="hidden sm:block w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL (product info & buying options) ── */}
        <div className="box-border flex w-full flex-col items-start justify-start gap-4 lg:w-[45%]">
          
          {/* Star Rating using Lucide SVG Stars */}
          <div className="flex w-full flex-wrap items-center justify-between gap-2 pb-1 border-b border-gray-200">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5 text-[#34803c]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#34803c] text-[#34803c]" />
                ))}
              </div>
              <span className="font-poppins text-[13px] sm:text-[15px] font-bold text-[#34803c]">
                4.9/5.0
              </span>
              <span className="font-poppins text-[12px] text-gray-500">(80,000+ happy users)</span>
            </div>
            <a
              href="/test-results"
              className="font-tt-ramillas text-[12px] sm:text-[14px] font-semibold text-[#34803c] hover:text-[#2a6a30] underline flex items-center gap-1"
            >
              <ShieldCheck className="w-4 h-4" />
              View Lab Tests
            </a>
          </div>

          {/* Product Title & Spec Badges */}
          <div>
            <h2 className="font-tt-ramillas text-[28px] sm:text-[36px] lg:text-[44px] font-bold leading-[1.1] text-[#34803c]">
              Collagreens
            </h2>
            <div className="mt-2.5 flex flex-wrap gap-2">
              <span className="bg-[#e8f5e9] text-[#34803c] border border-[#34803c]/30 rounded-full px-3.5 py-1 font-poppins text-[11px] sm:text-[12px] font-medium">
                Hydrolyzed Marine Collagen
              </span>
              <span className="bg-[#e8f5e9] text-[#34803c] border border-[#34803c]/30 rounded-full px-3.5 py-1 font-poppins text-[11px] sm:text-[12px] font-medium">
                Supergreens & Bioactives
              </span>
              <span className="bg-[#26312d] text-white rounded-full px-3.5 py-1 font-poppins text-[11px] sm:text-[12px] font-medium">
                Unflavored / Natural
              </span>
            </div>
          </div>

          {/* Detailed Product Description */}
          <div className="flex flex-col gap-2.5 text-[#4b5563] font-poppins text-[13px] sm:text-[15px] leading-[1.5]">
            <p>
              Collagreens combines hydrolyzed marine collagen peptides with organic supergreens and 30+ bioactive botanical ingredients across 6 clinically studied complexes. Formulated to deeply nourish radiant skin, strengthen hair & nails, and restore optimal gut health.
            </p>
            <p>
              Manufactured in a USFDA registered & cGMP certified facility with 7 rigorous third-party lab testing steps for heavy metals, pesticides, and microbial purity. Zero added sugar, zero artificial sweeteners, zero fillers.
            </p>
          </div>

          {/* Key Feature Checkmarks */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 py-2 border-y border-gray-200">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#34803c] shrink-0" />
                <span className="font-poppins text-[12px] sm:text-[13.5px] font-medium text-[#111827]">
                  {f}
                </span>
              </div>
            ))}
          </div>

          {/* Select Variant Pack Selector */}
          <div className="w-full flex flex-col gap-2.5 mt-1">
            <div className="flex items-center justify-between">
              <h3 className="font-poppins text-[15px] sm:text-[17px] font-bold text-[#111827]">
                Select Pack Variant
              </h3>
              <span className="font-poppins text-[12px] text-[#34803c] font-semibold">
                Free Shipping Across India
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full">
              {variants.map((v, i) => {
                const isSelected = selectedVariant === i;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedVariant(i)}
                    className={`relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer text-center ${
                      isSelected
                        ? "border-[#34803c] bg-[#fffdf2] ring-2 ring-[#34803c]/20 shadow-md"
                        : "border-gray-200 bg-white hover:border-[#34803c]/50"
                    }`}
                  >
                    {v.badge && (
                      <span className={`absolute -top-2.5 px-2.5 py-0.5 rounded-full font-poppins text-[9px] font-semibold tracking-wide uppercase ${
                        isSelected ? "bg-[#34803c] text-white" : "bg-[#26312d] text-white"
                      }`}>
                        {v.badge}
                      </span>
                    )}
                    <span className={`font-poppins text-[12px] sm:text-[14px] mt-1 ${isSelected ? "font-bold text-[#111827]" : "font-medium text-gray-700"}`}>
                      {v.label}
                    </span>
                    <div className="mt-1 flex items-center gap-1">
                      {v.originalPrice && (
                        <span className="font-poppins text-[11px] text-gray-400 line-through">
                          {v.originalPrice}
                        </span>
                      )}
                      <span className={`font-poppins text-[13px] sm:text-[15px] font-bold ${isSelected ? "text-[#34803c]" : "text-gray-900"}`}>
                        {v.price}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing Summary & Action CTA Buttons */}
          <div className="w-full flex flex-col gap-3 mt-2">
            <div className="flex items-baseline justify-between bg-[#faf6de] p-3.5 rounded-xl border border-gray-200">
              <div>
                <span className="font-poppins text-[11px] uppercase tracking-wider text-gray-600 font-semibold block">
                  Total Selected Price
                </span>
                <span className="font-antic-didone text-[26px] sm:text-[32px] font-bold text-[#26312d]">
                  {variants[selectedVariant].price}
                </span>
              </div>
              <span className="font-poppins text-[12px] font-medium text-[#34803c] bg-[#e8f5e9] px-2.5 py-1 rounded-md border border-[#34803c]/20">
                Taxes Included
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex w-full flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 rounded-full border-2 border-[#34803c] bg-white py-3.5 px-6 font-poppins text-[14px] sm:text-[15px] font-bold text-[#34803c] hover:bg-[#34803c] hover:text-white transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={isBuying}
                className="flex-1 rounded-full bg-[#34803c] hover:bg-[#2a6a30] py-3.5 px-6 font-poppins text-[14px] sm:text-[15px] font-bold text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-80 active:scale-98"
              >
                {isBuying ? (
                  <>
                    <Loader2 className="w-4.5 h-4.5 animate-spin" />
                    <span>Preparing Checkout...</span>
                  </>
                ) : (
                  <>
                    <span>Buy Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {checkoutError && (
              <p className="text-red-500 text-xs font-semibold text-center mt-1">
                {checkoutError}
              </p>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   2. PRODUCT TRANSPARENCY & NEW IMAGE FEATURE GRID
   (Uses 10 high-res Frame images from Shop_New_Folder)
   ───────────────────────────────────────────────────────────── */
const transparencyRows = [
  {
    img: "/Shop_New_Folder/Frame1.png",
    alt: "What's Inside Yuvaya Collagreens",
    title: "What’s Inside Every Sachet",
    subtitle: "4 Pure Ingredient Systems",
    desc: "Every sachet delivers pure hydrolyzed marine collagen peptides paired with organic supergreens, vitamin C, and essential minerals. No mystery proprietary blends — total transparency on every single gram.",
    badge: "01 / 10 Pure Formulation",
  },
  {
    img: "/Shop_New_Folder/Frame3.png",
    alt: "What's Not Inside Guarantee",
    title: "What’s Never Inside",
    subtitle: "Clean & Uncompromising Standard",
    desc: "Zero artificial flavors, zero synthetic colorants, zero added sugars, zero maltodextrin, and zero chemical preservatives. We stripped away every unnecessary additive so your body receives only pure wellness.",
    badge: "02 / 10 Non-Toxic Quality",
  },
  {
    img: "/Shop_New_Folder/Frame4.png",
    alt: "Full Ingredient Transparency Label",
    title: "100% Label Transparency",
    subtitle: "Exact Dosage & Percentage Listed",
    desc: "Unlike commercial brands that hide low-grade formulas behind proprietary names, Yuvaya specifies exact percentages for all active nutrients and botanical extracts.",
    badge: "03 / 10 Open Disclosure",
  },
  {
    img: "/Shop_New_Folder/Frame5.png",
    alt: "Complete Nutrition Facts Breakdown",
    title: "Complete Nutritional Breakdown",
    subtitle: "Macro & Micronutrient Precision",
    desc: "Formulated with optimal bio-available amino acids, essential micro-minerals, and vital antioxidants to fuel skin elasticity, gut health, and daily vitality.",
    badge: "04 / 10 Nutrient Density",
  },
  {
    img: "/Shop_New_Folder/Frame6.png",
    alt: "7 Critical Quality Lab Tests",
    title: "7 Critical Safety Parameters",
    subtitle: "Extensive Laboratory Screenings",
    desc: "Every manufactured batch undergoes 7 comprehensive laboratory checks including heavy metal safety, microbial contamination, pesticide screening, and amino acid profiling.",
    badge: "05 / 10 Lab Safety",
  },
  {
    img: "/Shop_New_Folder/FRAME7.png",
    alt: "Third Party Certified Quality",
    title: "Third-Party Lab Certified",
    subtitle: "Independent Certificate of Analysis",
    desc: "Independently verified and certified by NABL-accredited testing centers. Every single claim on our label is backed by empirical laboratory reports.",
    badge: "06 / 10 Verified Results",
  },
  {
    img: "/Shop_New_Folder/Frame8.png",
    alt: "Bio-availability & Cellular Absorption",
    title: "Maximized Bio-availability",
    subtitle: "Rapid Peptide Absorption",
    desc: "Hydrolyzed to low-molecular-weight peptides so your digestive system absorbs collagen fast without causing bloating or digestive discomfort.",
    badge: "07 / 10 High Absorption",
  },
  {
    img: "/Shop_New_Folder/Frame9.png",
    alt: "Pure Refreshing & Odorless Taste",
    title: "Refreshing & Zero Odor",
    subtitle: "No Grassy or Fishy Smell",
    desc: "Our specialized deodorization process eliminates fishy odor completely, offering a crisp and delightful natural taste that mixes effortlessly with water.",
    badge: "08 / 10 Great Taste",
  },
  {
    img: "/Shop_New_Folder/Frame10.png",
    alt: "USFDA & cGMP Facility Certification",
    title: "USFDA & cGMP Standards",
    subtitle: "State-of-the-Art Manufacturing",
    desc: "Crafted under strict pharmaceutical-grade quality protocols in facilities registered with USFDA and certified for Current Good Manufacturing Practice (cGMP).",
    badge: "09 / 10 World-Class Standard",
  },
  {
    img: "/Shop_New_Folder/Frame11.png",
    alt: "Formulated for Indian Lifestyle & Climate",
    title: "Crafted Specifically for Indians",
    subtitle: "Targeting Indian Environmental Stressors",
    desc: "Tailored to counteract urban pollution, UV exposure, hard water effects, and dietary gaps typical of modern Indian routines.",
    badge: "10 / 10 Tailored Wellness",
  },
];

export const ProductTransparency = () => {
  return (
    <section className="w-full bg-[#fffdf2] py-12 sm:py-16 md:py-20 px-3 sm:px-6 lg:px-[50px] border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#34803c] text-white">
            <Award className="w-3.5 h-3.5" />
            <span className="font-poppins text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-[#fffdf2]">
              Standard of Perfection
            </span>
          </div>
          <h2 className="font-tt-ramillas text-[30px] sm:text-[42px] lg:text-[52px] font-semibold text-[#111827] leading-[1.15]">
            Why Collagreens Leads the Industry
          </h2>
          <p className="font-poppins text-[13px] sm:text-[16px] text-[#4b5563] max-w-2xl">
            Explore every detail of our breakthrough formulation through 10 uncompromising quality standards.
          </p>
        </div>

        {/* Feature Cards Grid / Alternating Showcase */}
        <div className="flex flex-col gap-8 sm:gap-12">
          {transparencyRows.map((row, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={i}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } w-full bg-white rounded-2xl sm:rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300`}
              >
                {/* High Resolution Frame Image Container */}
                <div
                  className={`relative w-full lg:w-1/2 min-h-[260px] xs:min-h-[300px] sm:min-h-[360px] lg:min-h-[420px] bg-[#faf6de] flex items-center justify-center p-4 sm:p-6 lg:p-8`}
                >
                  <div className="relative w-full h-full min-h-[240px] sm:min-h-[320px]">
                    <Image
                      src={row.img}
                      alt={row.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain hover:scale-102 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute top-4 left-4 z-10 bg-[#26312d] text-white px-3 py-1 rounded-full font-poppins text-[10px] sm:text-[11px] font-medium shadow">
                    {row.badge}
                  </div>
                </div>

                {/* Text & Details Content */}
                <div
                  className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-8 lg:p-12"
                >
                  <span className="font-poppins text-[11px] sm:text-[12px] font-bold text-[#34803c] uppercase tracking-wider mb-1">
                    {row.subtitle}
                  </span>
                  <h3 className="font-tt-ramillas text-[22px] sm:text-[28px] lg:text-[34px] font-bold text-[#111827] leading-[1.2] mb-3 sm:mb-4">
                    {row.title}
                  </h3>
                  <p className="font-poppins text-[13px] sm:text-[15px] text-[#4b5563] leading-[1.6]">
                    {row.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   3. CLINICAL STUDIES & SCIENTIFIC RESULTS
   ───────────────────────────────────────────────────────────── */
export const ClinicalStudiesSection = () => {
  const stats = [
    { value: "28%", label: "Decrease in skin roughness from baseline", detail: "Significant smoothing of skin texture" },
    { value: "18%", label: "Increase in skin elasticity", detail: "Measurable rebound & firmness" },
    { value: "25%", label: "Increase in overall skin hydration", detail: "Deeper moisture retention" },
  ];

  return (
    <section className="w-full bg-[#fffff7] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-[50px] border-b border-gray-200">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-switzer text-[28px] sm:text-[36px] lg:text-[44px] font-bold text-[#111827] mb-3">
            Clinical Studies & Proven Results
          </h2>
          <p className="font-switzer text-[14px] sm:text-[17px] text-[#4b5563] max-w-2xl mx-auto">
            Based on a 12-week randomized double-blind placebo-controlled trial evaluating daily collagen peptide supplementation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
          {stats.map((s, i) => (
            <div key={i} className="bg-[#26312d] text-white p-6 sm:p-8 rounded-2xl flex flex-col justify-between border border-[#34803c]/40">
              <span className="font-tt-ramillas text-[42px] sm:text-[50px] font-bold text-white leading-none mb-2">
                {s.value}
              </span>
              <div>
                <h4 className="font-switzer text-[16px] sm:text-[18px] font-semibold text-white mb-1">
                  {s.label}
                </h4>
                <p className="font-switzer text-[12px] sm:text-[13px] text-gray-300">
                  {s.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <a
            href="https://www.mdpi.com/2072-6643/10/7/826"
            target="_blank"
            rel="noopener noreferrer"
            className="font-switzer text-[13px] sm:text-[15px] font-semibold text-[#34803c] hover:underline flex items-center gap-1.5"
          >
            <span>Read Published Peer-Reviewed Clinical Study</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="font-switzer text-[11px] sm:text-[12px] text-gray-500 max-w-xl">
            *Note: Clinical study outcomes measured for daily collagen peptides. Enhanced vitality results supported by supergreens complex.
          </p>
        </div>

      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   4. TESTING PARAMETERS SECTION
   ───────────────────────────────────────────────────────────── */
export const TestingParametersSection = () => {
  const tests = [
    { src: "/Landing/Microbial_infection.webp", label: "Microbial Contamination" },
    { src: "/Landing/Amino_acid.png", label: "Amino Acid Profiling" },
    { src: "/Landing/Heavy_metal.png", label: "Heavy Metal Screen" },
    { src: "/Landing/pesticide_testing.avif", label: "Pesticide Testing" },
    { src: "/Landing/Aflatoxin_testing.png", label: "Aflatoxin Screening" },
    { src: "/Landing/Stability_testing.avif", label: "Stability Testing" },
    { src: "/Landing/Organoleptic_testing.png", label: "Organoleptic Review" },
  ];

  return (
    <section className="w-full bg-[#faf6de] py-12 sm:py-16 px-4 sm:px-6 lg:px-[50px] border-b border-gray-200">
      <div className="max-w-6xl mx-auto text-center">
        
        <h3 className="font-switzer text-[26px] sm:text-[34px] font-bold text-[#111827] mb-2">
          7 Quality Testing Parameters
        </h3>
        <p className="font-switzer text-[13px] sm:text-[15px] text-[#4b5563] mb-8">
          Every single sachet is verified across all key purity and potency benchmarks.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {tests.map((test, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-[#34803c]/30 shadow-sm hover:scale-105 transition-transform"
            >
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 mb-2">
                <Image
                  src={test.src}
                  alt={test.label}
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <span className="font-switzer text-[11px] sm:text-[12px] font-semibold text-[#26312d] text-center leading-tight">
                {test.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <a
            href="https://www.notion.so/TEST-RESULTS-Yuvaya-3683ae035ffc80e39898d3dff170d830"
            target="_blank"
            rel="noopener noreferrer"
            className="font-tt-ramillas italic text-[15px] sm:text-[17px] font-bold text-[#34803c] hover:underline"
          >
            View Live Third-Party Lab Test Reports &rarr;
          </a>
        </div>

      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   5. HOW TO USE SECTION
   (FRAME10 IS THE MAINFRAME IN CENTER, SURROUNDED BY 4 STEPS)
   ───────────────────────────────────────────────────────────── */
export const HowToUseSection = () => {
  const steps = [
    {
      num: "01",
      title: "Tear",
      desc: "Tear open sachet carefully along notch line.",
      icon: Scissors,
    },
    {
      num: "02",
      title: "Pour",
      desc: "Pour into 200ml of cold water or your favorite beverage.",
      icon: Droplets,
    },
    {
      num: "03",
      title: "Shake & Stir",
      desc: "Stir or shake well for 10-15s until fully dissolved.",
      icon: RotateCw,
    },
    {
      num: "04",
      title: "Sip Daily",
      desc: "Enjoy refreshing daily drink every morning.",
      icon: Zap,
    },
  ];

  return (
    <section className="w-full bg-[#fffdf2] py-14 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-[50px] border-b border-gray-200 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#34803c] text-white mb-3 shadow-sm">
            <span className="font-poppins text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-[#fffdf2]">
              Simple Daily Ritual
            </span>
          </div>
          <h2 className="font-tt-ramillas text-[32px] sm:text-[46px] lg:text-[56px] font-semibold text-[#111827] leading-tight">
            How to Use Collagreens
          </h2>
          <p className="font-poppins text-[13.5px] sm:text-[17px] text-[#4b5563] mt-2">
            A simple 4-step process centered around your daily formulation
          </p>
        </div>

        {/* Circular / Center Showcase Layout with Frame10.png */}
        <div className="relative w-full max-w-5xl min-h-[480px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center py-6">
          
          {/* Subtle Circular Boundary Ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] lg:w-[560px] lg:h-[560px] rounded-full border border-gray-200" />
          </div>

          {/* Central Mainframe Image (Frame10.png) */}
          <div className="relative z-20 w-[240px] h-[280px] sm:w-[320px] sm:h-[380px] lg:w-[380px] lg:h-[440px] bg-white rounded-3xl border border-gray-200 shadow-xl p-4 flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src="/Shop_New_Folder/Frame10.png"
                alt="Collagreens Mainframe Standard"
                fill
                sizes="(max-width: 640px) 240px, 400px"
                className="object-contain"
                priority
              />
            </div>
            
            <div className="absolute -bottom-3 bg-[#26312d] text-white px-4 py-1 rounded-full shadow font-poppins text-[11px] sm:text-[12px] font-semibold">
              Main Quality Standard
            </div>
          </div>

          {/* 4 Steps Positioned Around Frame10 (Desktop View) */}
          <div className="w-full h-full absolute inset-0 hidden lg:block pointer-events-none">
            
            {/* Step 1: Top-Left */}
            <div className="absolute top-4 left-4 xl:top-8 xl:left-8 w-[240px] xl:w-[260px] pointer-events-auto bg-white p-5 rounded-2xl border border-gray-200 shadow-md text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#34803c] text-white font-tt-ramillas font-bold text-[14px] flex items-center justify-center">
                  01
                </div>
                <h3 className="font-tt-ramillas text-[19px] font-bold text-[#34803c]">
                  {steps[0].title}
                </h3>
              </div>
              <p className="font-poppins text-[12px] text-[#4b5563] leading-relaxed">
                {steps[0].desc}
              </p>
            </div>

            {/* Step 2: Top-Right */}
            <div className="absolute top-4 right-4 xl:top-8 xl:right-8 w-[240px] xl:w-[260px] pointer-events-auto bg-white p-5 rounded-2xl border border-gray-200 shadow-md text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#34803c] text-white font-tt-ramillas font-bold text-[14px] flex items-center justify-center">
                  02
                </div>
                <h3 className="font-tt-ramillas text-[19px] font-bold text-[#34803c]">
                  {steps[1].title}
                </h3>
              </div>
              <p className="font-poppins text-[12px] text-[#4b5563] leading-relaxed">
                {steps[1].desc}
              </p>
            </div>

            {/* Step 3: Bottom-Right */}
            <div className="absolute bottom-4 right-4 xl:bottom-8 xl:right-8 w-[240px] xl:w-[260px] pointer-events-auto bg-white p-5 rounded-2xl border border-gray-200 shadow-md text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#34803c] text-white font-tt-ramillas font-bold text-[14px] flex items-center justify-center">
                  03
                </div>
                <h3 className="font-tt-ramillas text-[19px] font-bold text-[#34803c]">
                  {steps[2].title}
                </h3>
              </div>
              <p className="font-poppins text-[12px] text-[#4b5563] leading-relaxed">
                {steps[2].desc}
              </p>
            </div>

            {/* Step 4: Bottom-Left */}
            <div className="absolute bottom-4 left-4 xl:bottom-8 xl:left-8 w-[240px] xl:w-[260px] pointer-events-auto bg-white p-5 rounded-2xl border border-gray-200 shadow-md text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#34803c] text-white font-tt-ramillas font-bold text-[14px] flex items-center justify-center">
                  04
                </div>
                <h3 className="font-tt-ramillas text-[19px] font-bold text-[#34803c]">
                  {steps[3].title}
                </h3>
              </div>
              <p className="font-poppins text-[12px] text-[#4b5563] leading-relaxed">
                {steps[3].desc}
              </p>
            </div>

          </div>

        </div>

        {/* Mobile / Tablet Responsive 4-Step Cards Layout */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 lg:hidden">
          {steps.map((s, i) => (
            <div
              key={i}
              className="flex flex-col text-left p-5 bg-white rounded-2xl border border-gray-200 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#34803c] text-white font-tt-ramillas font-bold text-[14px] flex items-center justify-center">
                  {s.num}
                </div>
                <h3 className="font-tt-ramillas text-[18px] font-bold text-[#34803c]">
                  {s.title}
                </h3>
              </div>
              <p className="font-poppins text-[12.5px] text-[#4b5563] leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   6. INTERACTIVE FAQS SECTION
   ───────────────────────────────────────────────────────────── */
export const FAQsForShopPage = () => {
  const faqs = [
    {
      question: "Is Yuvaya Collagreens 100% chemical free and natural?",
      answer:
        "Yes! Yuvaya Collagreens is completely chemical free, formulated with non-GMO hydrolyzed marine collagen peptides and organic supergreens. We contain zero artificial preservatives, zero fillers, and zero synthetic sweeteners.",
    },
    {
      question: "How will I know that my order is confirmed?",
      answer:
        "Once your order is successfully placed, you will receive instant confirmation via WhatsApp, SMS, and Email with your tracking link. You can also view your live order status in your Yuvaya Account dashboard.",
    },
    {
      question: "How soon can I expect results from Collagreens?",
      answer:
        "Clinical trials show noticeable improvements in skin hydration and digestion within 3 to 4 weeks, with optimal skin elasticity and joint benefits achieved after 8 to 12 weeks of continuous daily use.",
    },
    {
      question: "When will my order arrive?",
      answer:
        "Orders are dispatched within 24 hours. Delivery typically takes 2 to 5 business days depending on your pincode location across India.",
    },
    {
      question: "Are there any shipping charges?",
      answer:
        "We offer 100% Free Shipping on all orders across India, including Prepaid and Cash on Delivery options.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full bg-[#fffdf2] py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-[50px]">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 sm:gap-8">
        
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="px-3.5 py-1 rounded-full bg-[#26312d] text-[#fffdf2] font-poppins text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest">
            Frequently Asked Questions
          </div>
          <h2 className="font-tt-ramillas text-[26px] sm:text-[38px] lg:text-[46px] font-semibold text-[#111827]">
            Got Questions About Collagreens?
          </h2>
        </div>

        <div className="w-full flex flex-col gap-2 rounded-2xl border border-[#26312d] bg-[#26312d] p-1 sm:p-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="w-full overflow-hidden rounded-xl bg-[#fffdf2] transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex min-h-[52px] sm:min-h-[60px] w-full cursor-pointer items-center justify-between gap-3 px-4 sm:px-6 text-left py-3"
                >
                  <span className="flex-1 font-poppins text-[14px] sm:text-[16px] font-bold text-[#111827]">
                    {faq.question}
                  </span>
                  <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-[#26312d] text-white">
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="font-bold text-[16px]"
                    >
                      +
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-4 sm:px-6 pb-4 pt-1 border-t border-gray-300">
                        <p className="font-poppins text-[13px] sm:text-[14.5px] text-[#4b5563] leading-relaxed">
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

      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   7. CUSTOMER REVIEWS WITH MINIMALIST IMAGE PLACEHOLDERS
   ───────────────────────────────────────────────────────────── */
export const StillDoubts = () => {
  const [activeTab, setActiveTab] = useState<"all" | "photos" | "verified">("all");

  const reviewList = [
    {
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      rating: 5,
      date: "Verified Buyer • 18/07/2026",
      title: "Noticeable Glow & Zero Bloating",
      text: "I've been drinking Yuvaya Collagreens every morning for 4 weeks. My skin looks hydrated and radiant, and the best part is there's absolutely no fishy odor or stomach heaviness!",
      tag: "Verified Purchase",
      hasPhotoPlaceholder: true,
      placeholderLabel: "Review Image #1 (User Photo Placeholder)",
    },
    {
      name: "Ananya Reddy",
      location: "Bengaluru, Karnataka",
      rating: 5,
      date: "Verified Buyer • 12/07/2026",
      title: "Stronger Nails & Hair Growth",
      text: "This is hands-down the cleanest collagen formula in India. My nail breakage stopped after 3 weeks and my hair feels significantly thicker.",
      tag: "Verified Purchase",
      hasPhotoPlaceholder: true,
      placeholderLabel: "Review Image #2 (Before & After Photo Placeholder)",
    },
    {
      name: "Rohan Mehta",
      location: "Delhi NCR",
      rating: 5,
      date: "Verified Buyer • 05/07/2026",
      title: "Great Taste & Fast Dissolving",
      text: "Bought the 60-day pack for my family. Mixes seamlessly in cold water with zero clumps. We look forward to drinking it every morning!",
      tag: "Verified Purchase",
      hasPhotoPlaceholder: true,
      placeholderLabel: "Review Image #3 (Daily Ritual Photo Placeholder)",
    },
    {
      name: "Kavya Nair",
      location: "Kochi, Kerala",
      rating: 5,
      date: "Verified Buyer • 28/06/2026",
      title: "Perfect Post-Workout Drink",
      text: "Combines organic greens and marine peptides in one simple sachet. Energy levels remain high all afternoon!",
      tag: "Verified Purchase",
      hasPhotoPlaceholder: true,
      placeholderLabel: "Review Image #4 (Product Unboxing Photo Placeholder)",
    },
  ];

  const filteredReviews = reviewList.filter((r) => {
    if (activeTab === "photos") return r.hasPhotoPlaceholder;
    if (activeTab === "verified") return r.tag.includes("Verified");
    return true;
  });

  return (
    <section className="w-full bg-[#fffdf2] py-12 sm:py-16 md:py-20 px-3 sm:px-6 lg:px-[50px] border-t border-gray-200">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8 sm:gap-12">
        
        {/* Header Container */}
        <div className="flex flex-col items-center gap-2 text-center max-w-2xl">
          <div className="px-3.5 py-1 rounded-full bg-[#26312d] text-[#fffdf2] font-poppins text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Real Customer Experiences</span>
          </div>
          <h2 className="font-tt-ramillas text-[30px] sm:text-[42px] lg:text-[50px] font-semibold text-[#111827] leading-tight">
            Still Have Doubts?
          </h2>
          <p className="font-poppins text-[13px] sm:text-[16px] text-[#4b5563]">
            See what thousands of verified users say about Yuvaya Collagreens
          </p>
        </div>

        {/* Overview Stats Banner */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 bg-[#faf6de] rounded-3xl border border-gray-200 shadow-sm">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <div className="flex justify-center md:justify-start items-center text-[#34803c] gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#34803c] text-[#34803c]" />
              ))}
            </div>
            <p className="font-poppins text-[22px] sm:text-[28px] font-bold text-[#34803c]">
              4.9 / 5.0 Rating
            </p>
            <p className="font-poppins text-[13px] sm:text-[14px] text-[#4b5563] font-medium">
              Based on 80,000+ verified customer purchases across India
            </p>
          </div>

          {/* Interactive Action Button */}
          <div className="flex items-center gap-3">
            <a
              href="/reviews/write"
              className="px-6 py-3.5 bg-[#26312d] hover:bg-black text-white font-poppins text-[13px] sm:text-[14px] font-bold rounded-full transition-all shadow cursor-pointer flex items-center gap-2"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Write a Review</span>
            </a>
          </div>
        </div>

        {/* Interactive Filter Tabs */}
        <div className="flex items-center gap-2 bg-[#faf6de] p-1 rounded-full border border-gray-200">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-full font-poppins text-[12px] sm:text-[13px] font-bold transition-all cursor-pointer ${
              activeTab === "all" ? "bg-[#34803c] text-white shadow-sm" : "text-gray-700 hover:text-black"
            }`}
          >
            All Reviews ({reviewList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("photos")}
            className={`px-4 py-2 rounded-full font-poppins text-[12px] sm:text-[13px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "photos" ? "bg-[#34803c] text-white shadow-sm" : "text-gray-700 hover:text-black"
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>With Customer Photos</span>
          </button>
        </div>

        {/* Reviews List with Clean Image Placeholders */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((r, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-6 sm:p-8 bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all gap-4"
            >
              {/* Reviewer Header */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-poppins text-[16px] sm:text-[18px] font-bold text-[#111827]">
                    {r.name}
                  </span>
                  <span className="bg-[#34803c]/10 text-[#34803c] px-2.5 py-0.5 rounded-full font-poppins text-[10px] sm:text-[11px] font-semibold">
                    {r.tag}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 font-poppins">
                  <span>{r.location}</span>
                  <span>{r.date}</span>
                </div>
                <div className="flex items-center text-[#34803c] gap-0.5 mt-1">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#34803c] text-[#34803c]" />
                  ))}
                </div>
              </div>

              {/* Review Content */}
              <div>
                <h4 className="font-poppins text-[14px] sm:text-[16px] font-bold text-[#26312d] mb-1">
                  {r.title}
                </h4>
                <p className="font-poppins text-[13px] sm:text-[14.5px] text-[#4b5563] leading-relaxed">
                  "{r.text}"
                </p>
              </div>

              {/* Minimalist Image Review Placeholder Container */}
              <div className="w-full mt-2 pt-3 border-t border-gray-100">
                <div className="relative w-full h-[140px] sm:h-[160px] rounded-2xl border-2 border-dashed border-gray-300 bg-[#faf6de]/50 flex flex-col items-center justify-center p-4 text-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-9 h-9 rounded-full bg-[#34803c]/10 flex items-center justify-center text-[#34803c]">
                      <ImageIcon className="w-4.5 h-4.5" />
                    </div>
                    <span className="font-poppins text-[12px] font-bold text-[#26312d]">
                      {r.placeholderLabel}
                    </span>
                    <span className="font-poppins text-[10.5px] text-gray-500 font-medium">
                      Customer Review Photo Placeholder
                    </span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};