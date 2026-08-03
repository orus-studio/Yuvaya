"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
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
  ThumbsUp,
  Scissors,
  Truck,
  Sparkles,
  Plus,
  Minus,
  Leaf,
  Activity,
  Maximize2,
  X,
  Upload,
  Store,
  FingerprintPattern,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { createCheckout } from "@/app/actions/createCheckout";
import NewsLetter from "@/Components/Landing/NewsLetter";

export interface ProductVariant {
  id: string;
  label: string;
  badge?: string;
  price: string;
  numericPrice: number;
  originalPrice?: string;
  img: string;
  images?: ProductThumbnail[];
}

export interface ProductThumbnail {
  src: string;
  alt: string;
}

export interface ProductsPartProps {
  productData?: {
    title?: string;
    subtitle?: string;
    description?: string;
    variants?: ProductVariant[];
  };
}

export default function ShopClient({ productData }: ProductsPartProps) {
  return (
    <div className="w-full pt-16 sm:pt-20 md:pt-24 bg-[#fffff7] text-[#111827]">
      <ProductsPart productData={productData} />
      <ProductTransparency />
      <ClinicalStudiesSection />
      <TestingParametersSection />
      <FAQsForShopPage />
      <StillDoubts />
      <NewsLetter />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   1. PRODUCTS HERO & CHECKOUT SECTION
   ───────────────────────────────────────────────────────────── */
export const ProductsPart = ({ productData }: ProductsPartProps = {}) => {
  const { addToCart } = useCart();
  const [isBuying, setIsBuying] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Collagen Formula Option State (Marine Collagen vs Vegan Collagen)
  const [collagenType, setCollagenType] = useState<"marine" | "vegan">("marine");

  // Hero Accordions State (Description, Ingredient breakdown, How to use, Shipping & other info)
  const [openHeroAccordion, setOpenHeroAccordion] = useState<number | null>(0);

  const toggleHeroAccordion = (idx: number) => {
    setOpenHeroAccordion((prev) => (prev === idx ? null : idx));
  };

  const features = [
    "Refreshing taste, zero fishy smell",
    "Quick-absorbing low-molecular-weight peptides",
    "Clinically studied 12-week results",
    "USFDA-registered, cGMP-certified facility · 7 third-party lab tests",
  ];

  const categoryTags = [
    { label: "Gut", icon: Leaf },
    { label: "Skin", icon: FingerprintPattern },
    { label: "Hair", icon: Scissors },
    { label: "Joints", icon: Activity },
  ];

  const variants: ProductVariant[] = productData?.variants || [
    {
      id: "gid://shopify/ProductVariant/58221348290641",
      label: "30 days pack",
      badge: "Most Popular",
      price: "₹ 3,100",
      numericPrice: 3100,
      originalPrice: undefined,
      img: "/Landing/Stand Up Pouch Front latest mockup.png",
      images: [
        { src: "/Landing/Stand Up Pouch Front latest mockup.png", alt: "Pouch Front" },
        { src: "/Landing/Stand Up Pouch Back latest mockup.png", alt: "Pouch Back" },
        { src: "/Landing/Sachet Front latest mockup.png", alt: "Sachet Front" },
      ],
    },
    {
      id: "gid://shopify/ProductVariant/58395879473233",
      label: "60 days pack",
      badge: "Best Value",
      price: "₹ 5,600",
      numericPrice: 5600,
      originalPrice: "₹ 5,800",
      img: "/Landing/Stand Up Pouch Front latest mockup.png",
      images: [
        { src: "/Landing/Stand Up Pouch Front latest mockup.png", alt: "Pouch Front" },
        { src: "/Landing/Stand Up Pouch Back latest mockup.png", alt: "Pouch Back" },
        { src: "/Landing/Sachet Front latest mockup.png", alt: "Sachet Front" },
      ],
    },
    {
      id: "gid://shopify/ProductVariant/59057234608209",
      label: "6 days trial",
      badge: "Starter Pack",
      price: "₹ 1,100",
      numericPrice: 1100,
      originalPrice: undefined,
      img: "/Landing/Sachet Front latest mockup.png",
      images: [
        { src: "/Landing/Sachet Front latest mockup.png", alt: "Sachet Front" },
        { src: "/Landing/Sachet Back latest mockup.png", alt: "Sachet Back" },
        { src: "/Landing/Stand Up Pouch Front latest mockup.png", alt: "Pouch Front" },
      ],
    },
  ];

  const [selectedVariant, setSelectedVariant] = useState(0);
  const [activeThumbnail, setActiveThumbnail] = useState(0);

  // Thumbnails come from the SELECTED variant's own images — just like the landing page
  const productThumbnails: ProductThumbnail[] = variants[selectedVariant]?.images || [];

  // Exactly like handleVariantChange in ShopFromUs: switch variant + reset thumbnail to 0
  const handleSelectVariant = (index: number) => {
    setSelectedVariant(index);
    setActiveThumbnail(0);
  };

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
      title: productData?.title || "Collagreens",
      variantLabel: v.label,
      price: v.price,
      image: v.img || productThumbnails[activeThumbnail]?.src,
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

  const heroAccordions = [
    {
      title: "Description",
      content:
        productData?.description ||
        "Greens aid your gut. Collagen helps your skin. Collagreens is the one sachet that does even more with 6 clinically studied complexes against every major cause of collagen loss.",
    },
    {
      title: "Ingredient breakdown",
      content:
        "Key active ingredients per sachet include: Hydrolyzed Marine Collagen Peptides (Type I & III, 5000mg), Organic Supergreens Blend (Spirulina, Wheatgrass, Moringa, Chlorella), Antioxidant & Vitamin C Complex (Amla, Acerola Berry), Hyaluronic Acid & Biotin (100% RDA), Probiotic Gut Support Matrix.",
    },
    {
      title: "How to use",
      content:
        "Tear open 1 sachet daily. Pour into 200ml of cold water or your favorite smoothie. Stir or shake for 10-15 seconds until fully dissolved. Best taken every morning on an empty stomach or 2 hours after breakfast for maximum cellular absorption.",
    },
    {
      title: "Shipping & other information",
      content:
        "We offer 100% Free Shipping on all orders across India. Orders are processed within 24 hours and delivered in 2–5 business days. Both Prepaid & Cash on Delivery (COD) options are available.",
    },
  ];

  return (
    <section id="products" className="w-full pb-16 sm:pb-20 lg:pb-24">
      {/* Top Header */}
      <div className="mb-8 sm:mb-12 flex flex-col items-center gap-3 text-center px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#26312d] text-white shadow-sm">
          <Store className="w-3.5 h-3.5 text-[#e5c97b]" />
          <span className="font-poppins text-[10.5px] sm:text-[11.5px] font-semibold uppercase tracking-widest text-[#fffdf2]">
            Our Store
          </span>
        </div>
        <h1 className="font-tt-ramillas font-bold text-[36px] sm:text-[52px] lg:text-[64px] leading-[1.08] text-[#111827]">
          {productData?.title || "Shop Collagreens"}
        </h1>
        <p className="font-poppins text-[14px] sm:text-[18px] font-medium text-[#4b5563] max-w-xl">
          {productData?.subtitle || "Daily Supergreens + Hydrolyzed Marine Collagen formulated for Indian routines."}
        </p>
      </div>

      <div className="box-border flex w-full flex-col items-start gap-10 lg:flex-row lg:justify-between lg:gap-12 px-4 sm:px-6 lg:px-[50px] max-w-7xl mx-auto">
        {/* ── LEFT PANEL (Image Gallery) ── */}
        <div className="h-fit w-full shrink-0 lg:sticky lg:top-24 lg:w-[48%] xl:w-[50%]">
          <div className="box-border flex flex-col items-center gap-5 rounded-3xl border border-gray-200/90 bg-[#faf6de] p-4 sm:p-6 shadow-sm">
            {/* Gallery Image Box */}
            <div className="box-border flex h-[380px] xs:h-[430px] sm:h-[500px] lg:h-[540px] xl:h-[570px] w-full flex-col sm:flex-row items-center justify-center gap-4 overflow-hidden">
              {/* Main Display Image */}
              <div className="relative flex-1 w-full sm:w-auto h-[260px] xs:h-[300px] sm:h-full flex flex-col overflow-hidden rounded-2xl border-2 border-[#34803c]/80 bg-[#fffdf2] order-1 sm:order-2 shadow-sm">
                <div className="absolute inset-0 z-20 flex items-center justify-center p-4 sm:p-8">
                  <div className="relative h-full w-full max-h-full max-w-full flex items-center justify-center">
                    <Image
                      src={productThumbnails[activeThumbnail]?.src || variants[selectedVariant]?.img || ""}
                      alt={productThumbnails[activeThumbnail]?.alt || variants[selectedVariant]?.label || "Product Image View"}
                      key={`variant-${selectedVariant}-thumb-${activeThumbnail}`}
                      fill
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 650px"
                      className="object-contain object-center transition-all duration-300 drop-shadow-md"
                      priority
                    />
                  </div>
                </div>

                {/* Variant Tag Badge */}
                <div className="absolute bottom-3 right-3 z-30 rounded-full bg-[#26312d] px-3.5 py-1.5 shadow-md">
                  <span className="font-poppins text-[11px] sm:text-[12.5px] font-semibold text-white">
                    {variants[selectedVariant]?.label}
                  </span>
                </div>

                {/* Image Label Badge */}
                <div className="absolute top-3 left-3 z-30 rounded-xl bg-white/90 backdrop-blur-sm px-3.5 py-1 border border-[#34803c]/20 shadow-xs">
                  <span className="font-poppins text-[10px] sm:text-[11.5px] font-medium text-[#26312d]">
                    {productThumbnails[activeThumbnail]?.alt || "Product View"}
                  </span>
                </div>
              </div>

              {/* Thumbnails Column */}
              <div className="relative flex w-full sm:w-[22%] h-auto sm:h-full shrink-0 flex-row sm:flex-col items-center justify-between order-2 sm:order-1 py-1 px-1 gap-2">
                {isScrollable && (
                  <button
                    type="button"
                    onClick={scrollPrev}
                    disabled={!canScrollUp}
                    className="z-20 flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-white border border-[#34803c]/30 text-[#34803c] hover:bg-[#34803c] hover:text-white transition-all disabled:opacity-20 cursor-pointer shadow-xs"
                    aria-label="Scroll thumbnails up"
                  >
                    <ChevronLeft className="w-4 h-4 sm:hidden" />
                    <ChevronUp className="hidden sm:block w-4 h-4" />
                  </button>
                )}

                <div
                  ref={scrollContainerRef}
                  onScroll={updateScrollButtons}
                  className="w-full flex-1 overflow-x-auto sm:overflow-x-hidden sm:overflow-y-auto no-scrollbar scroll-smooth flex flex-row sm:flex-col gap-2.5 py-1 px-0.5 justify-start"
                >
                  {productThumbnails.map((t, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveThumbnail(i)}
                      className={`relative box-border h-14 w-14 sm:h-auto sm:w-full aspect-square shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${activeThumbnail === i
                        ? "border-[#34803c] bg-white ring-2 ring-[#34803c]/20 scale-[0.98] shadow-md"
                        : "border-gray-200 bg-white opacity-70 hover:opacity-100 hover:border-[#34803c]/40"
                        }`}
                    >
                      <Image
                        src={t.src}
                        alt={t.alt}
                        fill
                        sizes="(max-width: 640px) 15vw, 12vw"
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
                    className="z-20 flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-white border border-[#34803c]/30 text-[#34803c] hover:bg-[#34803c] hover:text-white transition-all disabled:opacity-20 cursor-pointer shadow-xs"
                    aria-label="Scroll thumbnails down"
                  >
                    <ChevronRight className="w-4 h-4 sm:hidden" />
                    <ChevronDown className="hidden sm:block w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Category / Benefit Tags Bar */}
            <div className="w-full flex items-center justify-center gap-2 sm:gap-3 py-2 border-t border-gray-200/80">
              {categoryTags.map((tag, idx) => {
                const IconComponent = tag.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#34803c]/30 shadow-xs text-[#26312d] transition-all hover:border-[#34803c]"
                  >
                    <IconComponent className="w-3.5 h-3.5 text-[#34803c]" />
                    <span className="font-poppins text-[11px] sm:text-[13px] font-bold tracking-wide">
                      {tag.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL (Spacious Layout with Original Brand Colors) ── */}
        <div className="box-border flex w-full flex-col gap-5 lg:w-[48%] xl:w-[46%]">

          {/* Star Rating & View Lab Tests Header */}
          <div className="flex w-full flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-gray-200">
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
              href="https://www.notion.so/TEST-RESULTS-Yuvaya-3683ae035ffc80e39898d3dff170d830"
              target="_blank"
              rel="noopener noreferrer"
              className="font-tt-ramillas text-[12px] sm:text-[14px] font-semibold text-[#34803c] hover:text-[#2a6a30] underline flex items-center gap-1"
            >
              <ShieldCheck className="w-4 h-4" />
              View Lab Tests
            </a>
          </div>

          {/* Product Title & Subtitle */}
          <div className="flex flex-col gap-1">
            <h2 className="font-tt-ramillas text-[32px] sm:text-[40px] lg:text-[46px] font-bold leading-[1.1] text-[#34803c]">
              {productData?.title || "Collagreens"}
            </h2>
            <p className="font-poppins text-[13.5px] sm:text-[15.5px] font-semibold text-[#26312d]">
              {productData?.subtitle || "Daily Greens + Marine Collagen, formulated for Indian skin & body"}
            </p>
          </div>

          {/* Detailed Product Description */}
          <div className="flex flex-col gap-2 text-[#4b5563] font-poppins text-[13px] sm:text-[14.5px] leading-[1.6]">
            <p>
              Greens aid your gut. Collagen helps your skin. Collagreens is the one sachet that does even more with 6 clinically studied complexes against every major cause of collagen loss.
            </p>
          </div>

          {/* Key Benefit Bullet Points ("Important Points") */}
          <div className="w-full flex flex-col gap-2.5 py-3 border-y border-gray-200">
            <span className="font-poppins text-[12px] font-bold uppercase tracking-wider text-[#34803c]">
              Important Points
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#34803c] shrink-0 mt-0.5" />
                  <span className="font-poppins text-[12.5px] sm:text-[13.5px] font-medium text-[#111827]">
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Collagen Formula Selector: Marine Collagen vs Vegan Collagen */}
          <div className="w-full flex flex-col gap-2">
            <span className="font-poppins text-[13px] font-bold text-[#111827]">
              Select Formula Standard:
            </span>
            <div className="grid grid-cols-2 gap-3 w-full">
              {/* Marine Collagen Option */}
              <button
                type="button"
                onClick={() => setCollagenType("marine")}
                className={`flex items-center justify-between p-3.5 rounded-xl border-2 transition-all cursor-pointer ${collagenType === "marine"
                  ? "border-[#34803c] bg-[#fffdf2] ring-2 ring-[#34803c]/20 shadow-sm"
                  : "border-gray-200 bg-white hover:border-[#34803c]/40"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${collagenType === "marine" ? "border-[#34803c] bg-[#34803c]" : "border-gray-400"
                      }`}
                  >
                    {collagenType === "marine" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="font-poppins text-[13px] font-bold text-[#111827]">
                    Marine Collagen
                  </span>
                </div>
                <span className="bg-[#e8f5e9] text-[#34803c] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Available
                </span>
              </button>

              {/* Vegan Collagen Option (Coming Soon) */}
              <button
                type="button"
                disabled
                className="relative flex items-center justify-between p-3.5 rounded-xl border-2 border-gray-200 bg-gray-50 opacity-80 cursor-not-allowed text-left"
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                  <span className="font-poppins text-[13px] font-medium text-gray-500">
                    Vegan Collagen
                  </span>
                </div>
                <span className="bg-[#26312d] text-white text-[9.5px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Coming Soon
                </span>
              </button>
            </div>
          </div>

          {/* Select Pack Variant Section */}
          <div className="w-full flex flex-col gap-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="font-poppins text-[14px] sm:text-[16px] font-bold text-[#111827]">
                Select Pack Variant
              </h3>
              <span className="font-poppins text-[11.5px] text-[#34803c] font-semibold flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                Free Shipping Across India
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full pt-3">
              {variants.map((v, i) => {
                const isSelected = selectedVariant === i;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectVariant(i)}
                    className={`relative flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer text-center ${isSelected
                      ? "border-[#34803c] bg-[#fffdf2] ring-2 ring-[#34803c]/20 shadow-md"
                      : "border-gray-200 bg-white hover:border-[#34803c]/50"
                      }`}
                  >
                    {v.badge && (
                      <span
                        className={`absolute -top-3 px-3 py-0.5 rounded-full font-poppins text-[9.5px] sm:text-[10px] font-bold tracking-wider uppercase shadow-xs ${isSelected ? "bg-[#34803c] text-white" : "bg-[#26312d] text-white"
                          }`}
                      >
                        {v.badge}
                      </span>
                    )}
                    <span
                      className={`font-poppins text-[12.5px] sm:text-[14px] mt-1 ${isSelected ? "font-bold text-[#111827]" : "font-medium text-gray-700"
                        }`}
                    >
                      {v.label}
                    </span>
                    <div className="mt-1 flex items-center gap-1.5">
                      {v.originalPrice && (
                        <span className="font-poppins text-[11px] sm:text-[12px] text-gray-400 line-through">
                          {v.originalPrice}
                        </span>
                      )}
                      <span
                        className={`font-poppins text-[13.5px] sm:text-[16px] font-bold ${isSelected ? "text-[#34803c]" : "text-gray-900"
                          }`}
                      >
                        {v.price}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing Summary & Action CTA Buttons */}
          <div className="w-full flex flex-col gap-3">
            <div className="flex items-baseline justify-between bg-[#faf6de] p-3.5 sm:p-4 rounded-xl border border-gray-200">
              <div>
                <span className="font-poppins text-[11px] uppercase tracking-wider text-gray-600 font-semibold block">
                  Total Selected Price
                </span>
                <span className="font-antic-didone text-[26px] sm:text-[32px] font-bold text-[#26312d]">
                  {variants[selectedVariant]?.price}
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

          {/* ── Interactive Accordion Group ── */}
          <div className="w-full flex flex-col gap-2.5 pt-4 border-t border-gray-200">
            {heroAccordions.map((acc, idx) => {
              const isOpen = openHeroAccordion === idx;
              return (
                <div
                  key={idx}
                  className="w-full rounded-xl border border-gray-200 bg-white overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleHeroAccordion(idx)}
                    className="w-full flex items-center justify-between p-3.5 px-4 text-left font-poppins text-[13.5px] sm:text-[15px] font-bold text-[#111827] hover:bg-[#faf6de]/50 transition-colors cursor-pointer"
                  >
                    <span>{acc.title}</span>
                    <div className="w-6 h-6 rounded-full bg-[#faf6de] text-[#34803c] flex items-center justify-center shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="acc-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-4 pb-3.5 pt-1 font-poppins text-[12.5px] sm:text-[13.5px] text-[#4b5563] leading-relaxed border-t border-gray-100 bg-[#fffff7]">
                          {acc.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   2. SWIPEABLE A+ CONTENT TRANSPARENCY CARDS SCROLL
   ───────────────────────────────────────────────────────────── */
const transparencyRows = [
  {
    img: "/SwipeableContent/Card1.png",
    alt: "Third-Party Lab Tested",
    title: "Third-Party Lab Tested",
    subtitle: "7 critical safety parameters tested and published.",
    desc: "Every batch is tested every 6 months for 7 critical safety parameters and the results are published on the website for you to check. Now, you don’t have to rely on what we think, you can see what we deliver for yourself.",
    badge: "01 / 04 Lab Safety",
  },
  {
    img: "/SwipeableContent/Card2.jpeg",
    alt: "Refreshing taste and Zero fishy smell/afterburps",
    title: "Refreshing taste and Zero fishy smell/afterburps",
    subtitle: "How we make nutrition functional?",
    desc: "The biggest drawback of marine collagen was the gag reflex it induced followed by the after taste. To make the experience better, we went into the lab and crafted something that replaced this and gave you the essentials without making things difficult. Now, even your moringa tastes mangoeey.",
    badge: "02 / 04 Functional Nutrition",
  },
  {
    img: "/SwipeableContent/Card3.png",
    alt: "Our science behind Collagreens",
    title: "Our science behind Collagreens",
    subtitle: "Did you just dump everything in one?",
    desc: "We did put everything in one sachet but we were also smart about why we did it? We wanted to cut down on space in your nutrition shelf, along with using all the recommended ingredients that help you in your journey of aging. With studying how much is necessary for what effect, we balanced the ingredients for every day consumption into neatly organised complexes.",
    badge: "03 / 04 Smart Science",
  },
  {
    img: "/SwipeableContent/Card4.png",
    alt: "The Non-Negotiables",
    title: "The Non-Negotiables",
    subtitle: "No Nasty formulation",
    desc: "While we knew what we wanted inside collagreens, we also had a few principles in place about what we never want inside our products. This is from the no nasty list. A collagreens sachet is almost as good as your fresh veggies that you have whole because of the standards we aim to follow.",
    badge: "04 / 04 Clean Standard",
  },
];

// Tripled / Repeated 6 times for seamless, infinite continuous loop
const extendedTransparencyRows = [
  ...transparencyRows,
  ...transparencyRows,
  ...transparencyRows,
  ...transparencyRows,
  ...transparencyRows,
  ...transparencyRows,
];

export const ProductTransparency = () => {
  // Start at offset 4 (Card 1 in set 2)
  const [cardOffset, setCardOffset] = useState(4);
  const [withAnimation, setWithAnimation] = useState(true);

  const handleNext = () => {
    setWithAnimation(true);
    setCardOffset((prev) => prev + 2);
  };

  const handlePrev = () => {
    setWithAnimation(true);
    setCardOffset((prev) => prev - 2);
  };

  // Infinite seamless reset when reaching loop boundaries
  const handleAnimationEnd = () => {
    if (cardOffset >= 16) {
      setWithAnimation(false);
      setCardOffset((cardOffset % 4) + 4);
    } else if (cardOffset < 4) {
      setWithAnimation(false);
      setCardOffset((cardOffset % 4) + 8);
    }
  };

  return (
    <section className="w-full bg-[#fffdf2] py-12 sm:py-16 md:py-20 border-t border-b border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 px-3 sm:px-6 lg:px-[50px]">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 max-w-7xl w-full">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#34803c] text-white w-fit">
              <Award className="w-3.5 h-3.5" />
              <span className="font-poppins text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-[#fffdf2]">
                Uncompromising Standard
              </span>
            </div>
            <h2 className="font-tt-ramillas text-[28px] sm:text-[38px] lg:text-[46px] font-semibold text-[#111827] leading-[1.15]">
              Why Collagreens Leads the Industry
            </h2>
            <p className="font-poppins text-[13px] sm:text-[15px] text-[#4b5563]">
              Explore our core quality standards, lab-tested safety parameters, and science-backed functional nutrition.
            </p>
          </div>

          {/* Carousel Control Arrows (2 cards per click, infinite) */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              type="button"
              onClick={handlePrev}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white border border-gray-300 text-[#26312d] hover:bg-[#34803c] hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
              aria-label="Previous 2 cards"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white border border-gray-300 text-[#26312d] hover:bg-[#34803c] hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
              aria-label="Next 2 cards"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Motion Carousel Container (Controlled via Buttons) */}
        <div className="w-full overflow-hidden py-2 pb-4">
          <motion.div
            animate={{
              x: `calc(-${cardOffset} * (var(--card-w) + var(--card-gap)))`,
            }}
            transition={
              withAnimation
                ? { type: "spring", stiffness: 260, damping: 28 }
                : { duration: 0 }
            }
            onAnimationComplete={handleAnimationEnd}
            className="flex gap-4 sm:gap-6 select-none [--card-w:88vw] sm:[--card-w:calc(50%-12px)] [--card-gap:16px] sm:[--card-gap:24px]"
          >
            {extendedTransparencyRows.map((row, i) => (
              <div
                key={i}
                className="shrink-0 w-[var(--card-w)] flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Frame Image Container */}
                <div className="relative w-full h-[280px] xs:h-[320px] sm:h-[380px] lg:h-[420px] bg-[#faf6de] overflow-hidden">
                  <Image
                    src={row.img}
                    alt={row.alt}
                    fill
                    sizes="(max-width: 768px) 88vw, 50vw"
                    className="object-cover object-center hover:scale-105 transition-transform duration-500 pointer-events-none"
                  />
                  <div className="absolute top-4 left-4 z-10 bg-[#26312d]/90 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-full font-poppins text-[10px] sm:text-[11.5px] font-semibold tracking-wide shadow-md">
                    {row.badge}
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="flex flex-col justify-between p-5 sm:p-6 lg:p-8 flex-1">
                  <div>
                    <span className="font-poppins text-[11px] sm:text-[12.5px] font-bold text-[#34803c] uppercase tracking-wider mb-1.5 block">
                      {row.subtitle}
                    </span>
                    <h3 className="font-tt-ramillas text-[20px] sm:text-[24px] lg:text-[26px] font-bold text-[#111827] leading-[1.2] mb-3">
                      {row.title}
                    </h3>
                    <p className="font-poppins text-[12.5px] sm:text-[14px] text-[#4b5563] leading-[1.65]">
                      {row.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
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
            <div key={i} className="bg-[#26312d] text-white p-6 sm:p-8 rounded-2xl flex flex-col justify-between border border-[#34803c]/40 shadow-sm">
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
   5. INTERACTIVE FAQS SECTION
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
   6. CUSTOMER REVIEWS & REAL IMAGE SHOWCASE
   ───────────────────────────────────────────────────────────── */
export const StillDoubts = () => {
  // Real Review Images saved in /public/reviews/
  const reviewImages = [
    {
      id: 1,
      src: "/reviews/reviews_image (1).png",
      alt: "Customer Review - Skin Radiance & Hydration",
      author: "Priya Sharma",
      location: "Mumbai, MH",
      rating: 5,
      date: "Verified Buyer • July 2026",
      title: "Noticeable Skin Radiance & Zero Bloating",
      category: "skin",
      tag: "Skin & Glow",
    },
    {
      id: 2,
      src: "/reviews/reviews_image (2).png",
      alt: "Customer Review - Gut Health & Digestibility",
      author: "Ananya Reddy",
      location: "Bengaluru, KA",
      rating: 5,
      date: "Verified Buyer • July 2026",
      title: "Cleanest Collagen + Greens Combo",
      category: "gut",
      tag: "Gut & Digestion",
    },
    {
      id: 3,
      src: "/reviews/reviews_image (3).png",
      alt: "Customer Review - Hair Thickness & Nail Strength",
      author: "Meera Kapoor",
      location: "Delhi NCR",
      rating: 5,
      date: "Verified Buyer • June 2026",
      title: "Stronger Nails & Hair Fall Reduced",
      category: "hair",
      tag: "Hair & Nails",
    },
    {
      id: 4,
      src: "/reviews/reviews_image (4).png",
      alt: "Customer Review - Delicious Refreshing Taste",
      author: "Rohan Mehta",
      location: "Pune, MH",
      rating: 5,
      date: "Verified Buyer • June 2026",
      title: "Zero Fishy Smell, Tastes Refreshing!",
      category: "taste",
      tag: "Taste & Odorless",
    },
    {
      id: 5,
      src: "/reviews/reviews_image (5).png",
      alt: "Customer Review - Daily Energy & Vitality",
      author: "Kavya Nair",
      location: "Kochi, KL",
      rating: 5,
      date: "Verified Buyer • May 2026",
      title: "Essential Morning Wellness Ritual",
      category: "gut",
      tag: "Gut & Digestion",
    },
    {
      id: 6,
      src: "/reviews/reviews_image (6).png",
      alt: "Customer Review - Post-Workout Recovery",
      author: "Shweta Verma",
      location: "Hyderabad, TS",
      rating: 5,
      date: "Verified Buyer • May 2026",
      title: "Perfect Recovery Drink after Gym",
      category: "verified",
      tag: "Verified Purchase",
    },
    {
      id: 7,
      src: "/reviews/reviews_image (7).png",
      alt: "Customer Review - 12-Week Transformation",
      author: "Aarti Patel",
      location: "Ahmedabad, GJ",
      rating: 5,
      date: "Verified Buyer • April 2026",
      title: "12-Week Glow & Hydration Transformation",
      category: "skin",
      tag: "Skin & Glow",
    },
    {
      id: 8,
      src: "/reviews/reviews_image (8).png",
      alt: "Customer Review - Gut Comfort & Light Stomach",
      author: "Simran Gill",
      location: "Chandigarh",
      rating: 5,
      date: "Verified Buyer • April 2026",
      title: "Stomach Feels Light All Day",
      category: "gut",
      tag: "Gut & Digestion",
    },
    {
      id: 9,
      src: "/reviews/reviews_image (9).png",
      alt: "Customer Review - Instant Dissolution",
      author: "Divya Chandran",
      location: "Chennai, TN",
      rating: 5,
      date: "Verified Buyer • March 2026",
      title: "Dissolves Instantly in Cold Water",
      category: "taste",
      tag: "Taste & Odorless",
    },
    {
      id: 10,
      src: "/reviews/reviews_image (10).png",
      alt: "Customer Review - Anti-Aging & Joint Comfort",
      author: "Neelam Bajaj",
      location: "Jaipur, RJ",
      rating: 5,
      date: "Verified Buyer • March 2026",
      title: "Improved Joint Flexibility & Smooth Skin",
      category: "verified",
      tag: "Verified Purchase",
    },
    {
      id: 11,
      src: "/reviews/reviews_image (11).png",
      alt: "Customer Review - Unboxing & Quality Verification",
      author: "Pooja Trivedi",
      location: "Kolkata, WB",
      rating: 5,
      date: "Verified Buyer • February 2026",
      title: "Premium Packaging & Authentic Product",
      category: "verified",
      tag: "Verified Purchase",
    },
  ];

  // Component States
  const [activeCategory, setActiveCategory] = useState<"all" | "skin" | "gut" | "hair" | "taste" | "verified">("all");
  const [viewMode, setViewMode] = useState<"scroll" | "grid">("scroll");
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Write Review Form State
  const [formRating, setFormRating] = useState(5);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formText, setFormText] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Filtered Reviews
  const filteredReviews = reviewImages.filter((img) => {
    if (activeCategory === "all") return true;
    return img.category === activeCategory;
  });

  // Manual Scroll Controls for Auto-Scroll Carousel
  const handleScroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: dir === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") setSelectedImageIndex(null);
      if (e.key === "ArrowRight") {
        setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % filteredReviews.length : null));
      }
      if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + filteredReviews.length) % filteredReviews.length : null));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, filteredReviews.length]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccess(true);
    setTimeout(() => {
      setIsWriteModalOpen(false);
      setFormSuccess(false);
      setFormName("");
      setFormEmail("");
      setFormTitle("");
      setFormText("");
    }, 2000);
  };

  return (
    <section className="w-full bg-[#fffdf2] py-14 sm:py-18 md:py-24 px-3 sm:px-6 lg:px-[50px] border-t border-gray-200 overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 sm:gap-12">

        {/* Header Container */}
        <div className="flex flex-col items-center gap-3 text-center max-w-3xl">
          <div className="px-4 py-1.5 rounded-full bg-[#26312d] text-[#fffdf2] font-poppins text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest flex items-center gap-2 shadow-sm">
            <Camera className="w-3.5 h-3.5 text-[#34803c]" />
            <span>Verified Customer Image Reviews & Experience</span>
          </div>
          <h2 className="font-tt-ramillas text-[32px] sm:text-[44px] lg:text-[54px] font-bold text-[#111827] leading-[1.15]">
            Real Results From Real Users
          </h2>
          <p className="font-poppins text-[13.5px] sm:text-[16.5px] text-[#4b5563] max-w-2xl leading-relaxed">
            Explore 100% authentic customer review screenshots, unboxing notes, and daily progress shared by 80,000+ happy Indian consumers.
          </p>
        </div>

        {/* Overview Rating & Action Banner */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 bg-[#faf6de] rounded-3xl border border-[#34803c]/20 shadow-sm relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#34803c]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left z-10">
            <div className="flex flex-col items-center justify-center bg-[#34803c] text-white px-5 py-3.5 rounded-2xl shadow-md shrink-0">
              <span className="font-tt-ramillas text-[32px] sm:text-[36px] font-bold leading-none">4.9</span>
              <div className="flex items-center text-amber-300 gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-poppins text-[16px] sm:text-[18px] font-bold text-[#111827]">
                  Overwhelming 98% Satisfaction Rate
                </span>
                <span className="bg-[#34803c]/15 text-[#34803c] font-poppins text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>
              <p className="font-poppins text-[12.5px] sm:text-[14px] text-[#4b5563]">
                Based on 80,000+ verified order deliveries across India. Click any image to view details in high resolution.
              </p>
            </div>
          </div>

          {/* Action CTA & Controls */}
          <div className="flex flex-wrap items-center gap-3 z-10">
            <button
              type="button"
              onClick={() => setIsWriteModalOpen(true)}
              className="px-5 py-3 bg-[#26312d] hover:bg-black text-white font-poppins text-[13px] sm:text-[14px] font-bold rounded-full transition-all shadow-sm cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <ThumbsUp className="w-4 h-4 text-[#34803c]" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs & View Mode Toggles */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-200/80 pb-4">

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full py-1">
            {[
              { id: "all", label: `All Reviews (${reviewImages.length})` },
              { id: "skin", label: "Skin & Glow" },
              { id: "gut", label: "Gut & Digestion" },
              { id: "hair", label: "Hair & Nails" },
              { id: "taste", label: "Taste & Odorless" },
              { id: "verified", label: "Verified Purchases" },
            ].map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-4 py-2 rounded-full font-poppins text-[12px] sm:text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${isActive
                    ? "bg-[#34803c] text-white shadow-sm ring-2 ring-[#34803c]/30"
                    : "bg-[#faf6de] text-gray-700 hover:bg-[#faf6de]/80 hover:text-black border border-gray-200"
                    }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-gray-300 text-[#26312d] hover:bg-[#34803c] hover:text-white transition-all cursor-pointer shadow-xs"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-gray-300 text-[#26312d] hover:bg-[#34803c] hover:text-white transition-all cursor-pointer shadow-xs"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── AUTO-SCROLLING CAROUSEL OR GRID SHOWCASE ── */}
        {viewMode === "scroll" ? (
          <div className="w-full relative group">

            {/* Scrollable Container with Auto-Scroll Touch Support */}
            <div
              ref={scrollRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-2 pb-4 snap-x snap-mandatory"
            >
              {filteredReviews.map((rev, index) => (
                <div
                  key={rev.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className="snap-center shrink-0 w-[280px] xs:w-[320px] sm:w-[350px] lg:w-[380px] bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col group/card transform hover:-translate-y-1"
                >
                  {/* Review Image Wrapper */}
                  <div className="relative w-full h-[360px] xs:h-[400px] sm:h-[430px] bg-[#faf6de]/40 flex items-center justify-center p-3 overflow-hidden">
                    <Image
                      src={rev.src}
                      alt={rev.alt}
                      fill
                      sizes="(max-width: 640px) 300px, 400px"
                      className="object-contain object-center transition-transform duration-500 group-hover/card:scale-[1.03]"
                    />

                    {/* Floating Zoom Badge */}
                    <div className="absolute top-3 right-3 bg-[#26312d]/80 backdrop-blur-md text-white p-2 rounded-full opacity-80 group-hover/card:opacity-100 transition-opacity shadow">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    {/* Tag Badge */}
                    <div className="absolute top-3 left-3 bg-[#34803c] text-white px-3 py-1 rounded-full font-poppins text-[10px] sm:text-[11px] font-bold shadow-xs">
                      {rev.tag}
                    </div>
                  </div>

                  {/* Review Info Card Footer */}
                  <div className="p-4 sm:p-5 bg-white border-t border-gray-100 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-poppins text-[14px] font-bold text-[#111827]">
                        {rev.author}
                      </span>
                      <div className="flex items-center text-[#34803c] gap-0.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#34803c] text-[#34803c]" />
                        ))}
                      </div>
                    </div>

                    <h4 className="font-poppins text-[12.5px] sm:text-[13.5px] font-semibold text-[#26312d] line-clamp-1">
                      {rev.title}
                    </h4>

                    <div className="flex items-center justify-between text-[11px] text-gray-500 font-poppins pt-1 border-t border-gray-100">
                      <span>{rev.location}</span>
                      <span className="text-[#34803c] font-medium">{rev.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Instruction Prompt */}
            <p className="text-center font-poppins text-[12px] text-[#4b5563] mt-3 flex items-center justify-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#34803c]" />
              <span>Tip: Click on any review card to open in high-resolution full screen lightbox</span>
            </p>
          </div>
        ) : (
          /* ── GRID SHOWCASE VIEW ── */
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((rev, index) => (
              <div
                key={rev.id}
                onClick={() => setSelectedImageIndex(index)}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col group/card transform hover:-translate-y-1"
              >
                <div className="relative w-full h-[360px] sm:h-[400px] bg-[#faf6de]/40 flex items-center justify-center p-3">
                  <Image
                    src={rev.src}
                    alt={rev.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain transition-transform duration-500 group-hover/card:scale-[1.03]"
                  />
                  <div className="absolute top-3 right-3 bg-[#26312d]/80 backdrop-blur-md text-white p-2 rounded-full opacity-80 group-hover/card:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <div className="absolute top-3 left-3 bg-[#34803c] text-white px-3 py-1 rounded-full font-poppins text-[10px] font-bold shadow-xs">
                    {rev.tag}
                  </div>
                </div>

                <div className="p-4 sm:p-5 bg-white border-t border-gray-100 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-poppins text-[14px] font-bold text-[#111827]">
                      {rev.author}
                    </span>
                    <div className="flex items-center text-[#34803c] gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#34803c] text-[#34803c]" />
                      ))}
                    </div>
                  </div>
                  <h4 className="font-poppins text-[13px] font-semibold text-[#26312d]">
                    {rev.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-gray-500 font-poppins pt-1 border-t border-gray-100">
                    <span>{rev.location}</span>
                    <span className="text-[#34803c] font-medium">{rev.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ── FULL-SCREEN LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setSelectedImageIndex(null)}
          >
            {/* Lightbox Content Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[92vh] bg-[#fffdf2] rounded-3xl border border-white/20 overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedImageIndex(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-[#26312d]/80 hover:bg-[#26312d] text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Controls */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + filteredReviews.length) % filteredReviews.length : null));
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#26312d] flex items-center justify-center transition-all cursor-pointer shadow-xl border border-gray-200"
                aria-label="Previous review image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % filteredReviews.length : null));
                }}
                className="absolute right-4 md:right-[340px] top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#26312d] flex items-center justify-center transition-all cursor-pointer shadow-xl border border-gray-200"
                aria-label="Next review image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Main Image Display */}
              <div className="relative flex-1 h-[420px] xs:h-[480px] sm:h-[540px] md:h-[620px] bg-[#faf6de] p-4 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={filteredReviews[selectedImageIndex].src}
                    alt={filteredReviews[selectedImageIndex].alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Side Detail Sidebar */}
              <div className="w-full md:w-[320px] shrink-0 p-6 bg-[#fffdf2] flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-200 overflow-y-auto">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#34803c] text-white text-[11px] font-bold px-3 py-1 rounded-full">
                      {filteredReviews[selectedImageIndex].tag}
                    </span>
                    <span className="text-gray-400 text-xs font-poppins">
                      {selectedImageIndex + 1} of {filteredReviews.length}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-tt-ramillas text-[22px] font-bold text-[#111827] leading-snug">
                      {filteredReviews[selectedImageIndex].title}
                    </h3>
                  </div>

                  <div className="flex items-center text-[#34803c] gap-1">
                    {[...Array(filteredReviews[selectedImageIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#34803c] text-[#34803c]" />
                    ))}
                    <span className="font-poppins text-xs font-bold text-[#34803c] ml-1">5.0 / 5.0</span>
                  </div>

                  <div className="bg-[#faf6de] p-3.5 rounded-xl border border-gray-200 flex flex-col gap-1">
                    <span className="font-poppins text-[13px] font-bold text-[#111827]">
                      {filteredReviews[selectedImageIndex].author}
                    </span>
                    <span className="font-poppins text-[12px] text-gray-500">
                      {filteredReviews[selectedImageIndex].location}
                    </span>
                    <span className="font-poppins text-[11px] font-semibold text-[#34803c] flex items-center gap-1 mt-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {filteredReviews[selectedImageIndex].date}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedImageIndex(null)}
                    className="w-full py-3 bg-[#26312d] hover:bg-black text-white font-poppins text-[13px] font-bold rounded-xl transition-colors cursor-pointer text-center"
                  >
                    Back to Gallery
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── WRITE A REVIEW MODAL ── */}
      <AnimatePresence>
        {isWriteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsWriteModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setIsWriteModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black p-2 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col gap-1 mb-6">
                <span className="font-poppins text-[11px] font-bold text-[#34803c] uppercase tracking-wider">
                  Community Feedback
                </span>
                <h3 className="font-tt-ramillas text-[28px] font-bold text-[#111827]">
                  Write Your Review
                </h3>
                <p className="font-poppins text-[13px] text-gray-500">
                  Share your honest experience with Yuvaya Collagreens.
                </p>
              </div>

              {formSuccess ? (
                <div className="p-8 text-center bg-[#e8f5e9] rounded-2xl border border-[#34803c]/30 flex flex-col items-center gap-3">
                  <CheckCircle2 className="w-12 h-12 text-[#34803c]" />
                  <h4 className="font-poppins text-[18px] font-bold text-[#111827]">
                    Thank You For Your Review!
                  </h4>
                  <p className="font-poppins text-[13px] text-gray-600 max-w-xs">
                    Your response and image verification has been recorded successfully.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                  {/* Rating Selector */}
                  <div className="flex flex-col gap-1">
                    <label className="font-poppins text-[12px] font-bold text-gray-700">
                      Overall Rating
                    </label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormRating(star)}
                          className="p-1 cursor-pointer hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${star <= formRating ? "fill-[#34803c] text-[#34803c]" : "text-gray-300"
                              }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="font-poppins text-[12px] font-bold text-gray-700">Name</label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Priya S."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-poppins text-[13px] focus:outline-none focus:border-[#34803c]"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-poppins text-[12px] font-bold text-gray-700">Email</label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="priya@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-poppins text-[13px] focus:outline-none focus:border-[#34803c]"
                      />
                    </div>
                  </div>

                  {/* Title & Review */}
                  <div className="flex flex-col gap-1">
                    <label className="font-poppins text-[12px] font-bold text-gray-700">Title</label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="Amazing skin radiance and easy morning routine!"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-poppins text-[13px] focus:outline-none focus:border-[#34803c]"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-poppins text-[12px] font-bold text-gray-700">Review</label>
                    <textarea
                      rows={3}
                      required
                      value={formText}
                      onChange={(e) => setFormText(e.target.value)}
                      placeholder="Write your review here..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-poppins text-[13px] focus:outline-none focus:border-[#34803c]"
                    />
                  </div>

                  {/* Image Upload Trigger */}
                  <div className="p-3 border-2 border-dashed border-gray-300 rounded-xl bg-[#faf6de]/40 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#faf6de] transition-colors">
                    <Upload className="w-4 h-4 text-[#34803c]" />
                    <span className="font-poppins text-[12px] font-semibold text-[#26312d]">
                      Attach Product Photo or Result Image (Optional)
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#34803c] hover:bg-[#2a6a30] text-white font-poppins text-[14px] font-bold rounded-xl shadow transition-all cursor-pointer mt-2"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
