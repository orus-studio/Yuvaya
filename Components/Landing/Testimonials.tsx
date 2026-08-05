"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { flushSync } from "react-dom";
import {
    Star,
    ShieldCheck,
    CheckCircle2,
    Maximize2,
    X,
    ChevronLeft,
    ChevronRight,
    Camera,
} from "lucide-react";
import ZigzagSVG from "@/Components/Shared/ZigzagSVG";

/* ── Testimonial data extracted directly from 11 authentic review screenshots ───── */
const testimonials = [
    {
        id: 1,
        greeting: "Dear Yuvaya,",
        body: `Have been taking this collagen since a month, this has no fishy smell or smelly burps, tastes good. I saw a significant change in my gut health after taking this maybe its because of greens. First time greens taste so good and is easy to use.`,
        signoff: "Best regards,",
        name: "Kushagra",
        title: "Marine Collagen just started to taste good",
        image: "https://ik.imagekit.io/orus/Reviews/reviews_image%20(1).webp",
        imageAlt: "Customer Review by Kushagra on Amazon",
        rating: 5,
        location: "Reviewed on Amazon India",
        isAmazon: true,
        tag: "Gut & Digestion",
    },
    {
        id: 2,
        greeting: "Dear Yuvaya,",
        body: `Amazing product!! Started taking it from the last month and can already feel the change. It's a part of my daily routine now. Heavily suggest everyone to give it a try 👍`,
        signoff: "Cheers,",
        name: "akshay kedia",
        title: "The product is actually tasty and can do wonders",
        image: "https://ik.imagekit.io/orus/Reviews/reviews_image%20(2).webp",
        imageAlt: "Customer Review by akshay kedia on Amazon",
        rating: 5,
        location: "Reviewed on Amazon India",
        isAmazon: true,
        tag: "Taste & Odorless",
    },
    {
        id: 3,
        greeting: "Dear Yuvaya,",
        body: `I love d juice and taste broh 🥺🥺😭🙈... Honestly the best collagen i have ever tasted. Tried many, nothing seems like this. The green color also gives such peace of mind.... like I'm naturally drinking vegetables.`,
        signoff: "With love,",
        name: "Verified Customer",
        title: "Honestly the best collagen I have ever tasted",
        image: "https://ik.imagekit.io/orus/Reviews/reviews_image%20(3).webp",
        imageAlt: "Customer Review via WhatsApp",
        rating: 5,
        location: "Direct Customer Feedback",
        isAmazon: false,
        tag: "Taste & Odorless",
    },
    {
        id: 4,
        greeting: "Dear Yuvaya,",
        body: `Day 1 of trying marine I drank it ... after eating lunch like 1hr later. And in cold water tasted good n i feel all energetic and happy tastes like spinachhhhh. No sensitivity to skin or gut at all!`,
        signoff: "Warmly,",
        name: "Verified Customer",
        title: "Energetic and happy, tastes like spinachhhhh",
        image: "https://ik.imagekit.io/orus/Reviews/reviews_image%20(4).webp",
        imageAlt: "Customer Review via WhatsApp",
        rating: 5,
        location: "Direct Customer Feedback",
        isAmazon: false,
        tag: "Energy & Vitality",
    },
    {
        id: 5,
        greeting: "Dear Yuvaya,",
        body: `It was a great experience I had, the first time I tried Yuvaya. CollaGreens is a relatively newer concept and the team at Yuvaya is doing a great job at spreading the word, the product quality is top notch and kudos to the team at Yuvaya for curating everything so well 🌟!!`,
        signoff: "Kudos,",
        name: "Verified Customer",
        title: "Product quality is top notch!",
        image: "https://ik.imagekit.io/orus/Reviews/reviews_image%20(5).webp",
        imageAlt: "Customer Review via WhatsApp",
        rating: 5,
        location: "Direct Customer Feedback",
        isAmazon: false,
        tag: "Top Notch Quality",
    },
    {
        id: 6,
        greeting: "Dear Yuvaya,",
        body: `Love your collagen! So excited to have tried this. No fishy odor, delicious taste, and leaves skin looking super fresh and radiant. How is it priced for reordering?`,
        signoff: "Love,",
        name: "Bhavna Harchandrai",
        title: "Love your collagen!",
        image: "https://ik.imagekit.io/orus/Reviews/reviews_image%20(6).webp",
        imageAlt: "Customer Review by Bhavna Harchandrai",
        rating: 5,
        location: "Instagram (@bhavnaharchandrai)",
        isAmazon: false,
        tag: "Skin & Glow",
    },
    {
        id: 7,
        greeting: "Dear Yuvaya,",
        body: `Favourite! 🐢⭐ (NOT SPONSORED). Unboxing my Yuvaya CollaGreens stand-up pouch! My daily essential for skin hydration and overall health.`,
        signoff: "Best,",
        name: "Aastha Joshi",
        title: "Favourite! 🐢⭐ (NOT SPONSORED)",
        image: "https://ik.imagekit.io/orus/Reviews/reviews_image%20(7).webp",
        imageAlt: "Customer Unboxing by Aastha Joshi",
        rating: 5,
        location: "Instagram (@aasthajoshii)",
        isAmazon: false,
        tag: "Daily Essential",
    },
    {
        id: 8,
        greeting: "Dear Yuvaya,",
        body: `I tried your drink at the Way Well event and absolutely loved it. That's the reason I reached out to you here 🙂. Looking forward to getting my monthly supply!`,
        signoff: "Gratefully,",
        name: "Verified Customer",
        title: "Tried at Way Well event & loved it!",
        image: "https://ik.imagekit.io/orus/Reviews/reviews_image%20(8).webp",
        imageAlt: "Customer Review from Way Well Event",
        rating: 5,
        location: "Instagram Direct Message",
        isAmazon: false,
        tag: "Event Verified",
    },
    {
        id: 9,
        greeting: "Dear Yuvaya,",
        body: `Honestly speaking I didn't have much expectations as I had never tried such a product before and I have to say the results blew me away. I definitely look forward to using it to see as I'm already impressed with the results. 10/10 would recommend it.`,
        signoff: "Sincerely,",
        name: "Verified Customer",
        title: "Results blew me away! 10/10",
        image: "https://ik.imagekit.io/orus/Reviews/reviews_image%20(9).webp",
        imageAlt: "Customer Review via WhatsApp",
        rating: 5,
        location: "Direct Customer Feedback",
        isAmazon: false,
        tag: "10/10 Recommendation",
    },
    {
        id: 10,
        greeting: "Dear Yuvaya,",
        body: `Hi, the one I find distinguishing with Yuvaya is the taste. Absolutely nostalgic, I would even use the word "YUMMY". Doesn't make me feel forced to drink, I feel that is a win in itself. Surely recommending it to my circle. 💪👍`,
        signoff: "Cheers,",
        name: "Verified Customer",
        title: "Distinguishing taste — Absolutely YUMMY!",
        image: "https://ik.imagekit.io/orus/Reviews/reviews_image%20(10).webp",
        imageAlt: "Customer Review via WhatsApp",
        rating: 5,
        location: "Direct Customer Feedback",
        isAmazon: false,
        tag: "Nostalgic Taste",
    },
    {
        id: 11,
        greeting: "Dear Yuvaya,",
        body: `Finally got my hands on this collagen and it exceeded my expectations! The flavour is absolutely delicious, something I genuinely look forward to drinking every day. It tastes premium and mixes really well. I even had my mom try it and about 10 minutes later she mentioned she felt surprisingly relaxed. High quality packaging and truly a premium product!`,
        signoff: "Best regards,",
        name: "Sakshi Agarwal",
        title: "Great Taste, Feels Premium!",
        image: "https://ik.imagekit.io/orus/Reviews/reviews_image%20(11).webp",
        imageAlt: "Customer Review by Sakshi Agarwal on Amazon",
        rating: 5,
        location: "Reviewed on Amazon India",
        isAmazon: true,
        tag: "Premium Quality",
    },
];

/* ── Badges ───────────────────────────────────────────────────── */
const AmazonBadge = () => (
    <span className="inline-flex items-center gap-1 bg-[#131921] text-white px-2 py-0.5 rounded-full text-[10px] font-bold border border-[#FF9900]/70 shadow-xs">
        <span className="text-[#FF9900] font-black text-[10.5px]">amazon</span>
        <CheckCircle2 className="w-3 h-3 text-[#00a8e8] shrink-0" />
        <span className="text-gray-200 text-[9px] uppercase tracking-wider">Verified</span>
    </span>
);

const VerifiedBadge = () => (
    <span className="inline-flex items-center gap-1 bg-[#11731b] text-white px-2 py-0.5 rounded-full text-[10px] font-bold border border-white/30 shadow-xs">
        <ShieldCheck className="w-3 h-3 text-white shrink-0" />
        <span className="text-white text-[9px] uppercase tracking-wider">Verified</span>
    </span>
);

/* ── Component ────────────────────────────────────────────────── */
const Testimonials = () => {
    const [index, setIndex] = useState(0);
    const [busy, setBusy] = useState(false);
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    const cardCtrl = useAnimation();
    const overlayCtrl = useAnimation();

    const t = testimonials[index];

    const animateToNext = useCallback(
        async (targetIndex: number) => {
            if (busy || targetIndex === index) return;
            setBusy(true);

            /* Phase 1 — rotate to 90° with ease-in + darken */
            await Promise.all([
                cardCtrl.start({
                    rotateX: 90,
                    transition: { type: "tween", duration: 0.2, ease: [0.42, 0, 1, 1] },
                }),
                overlayCtrl.start({
                    opacity: 0.08,
                    transition: { type: "tween", duration: 0.2, ease: [0.42, 0, 1, 1] },
                }),
            ]);

            /* Swap content at midpoint */
            flushSync(() => setIndex(targetIndex));

            /* Phase 2 — rotate from -90° back to 0° with ease-out */
            cardCtrl.set({ rotateX: -90 });
            overlayCtrl.set({ opacity: 0.08 });

            await Promise.all([
                cardCtrl.start({
                    rotateX: 0,
                    transition: { type: "tween", duration: 0.4, ease: "easeOut" },
                }),
                overlayCtrl.start({
                    opacity: 0,
                    transition: { type: "tween", duration: 0.4, ease: "easeOut" },
                }),
            ]);

            setBusy(false);
        },
        [busy, index, cardCtrl, overlayCtrl]
    );

    const handleTap = useCallback(() => {
        const nextIndex = (index + 1) % testimonials.length;
        animateToNext(nextIndex);
    }, [index, animateToNext]);

    const handlePrev = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            const prevIndex = (index - 1 + testimonials.length) % testimonials.length;
            animateToNext(prevIndex);
        },
        [index, animateToNext]
    );

    const handleNext = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            const nextIndex = (index + 1) % testimonials.length;
            animateToNext(nextIndex);
        },
        [index, animateToNext]
    );

    return (
        <section
            className="relative w-full overflow-hidden bg-[#fffff7]"
            style={{ minHeight: "550px", zIndex: 1 }}
        >
            {/* ── Inner wrapper ──────────────────────────────────── */}
            <div
                className="relative mx-auto flex flex-col items-center justify-center overflow-visible px-4 py-10 sm:px-8 sm:py-14 md:max-w-[1000px] md:px-[80px] md:pt-[60px] md:pb-[80px]"
                style={{ zIndex: 5 }}
            >
                {/* Badge */}
                <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#11731b] px-3.5 py-1.5 shadow-xs">
                    <Camera className="w-3.5 h-3.5 text-[#fffdf2]" />
                    <span className="font-poppins whitespace-pre text-[10px] sm:text-[11px] font-bold uppercase leading-[1.2] tracking-[0.05em] text-[#fffdf2]">
                        Verified Customer Image Reviews
                    </span>
                </div>

                {/* Heading */}
                <h2 className="font-tt-ramillas mb-2 text-center text-[22px] font-semibold leading-[1.2] tracking-[0.03em] text-[#111827] sm:text-[30px] md:text-[36px]">
                    Here&apos;s what our customers wrote & shared
                </h2>
                <p className="font-poppins mb-6 sm:mb-8 text-center text-[13px] sm:text-[15px] text-[#4b5563] max-w-xl">
                    Real letters and verified review screenshots from 80,000+ happy customers across India.
                </p>

                {/* ── Card area ──────────────────────────────────── */}
                <div className="relative flex flex-col items-center justify-center w-full max-w-[460px]">
                    {/* Tap-me indicator */}
                    <div
                        className="absolute z-10 hidden flex-col items-center md:flex pointer-events-none"
                        style={{ left: "-110px", top: "40px" }}
                    >
                        <span
                            className="font-cormorant font-semibold text-[22px] italic text-[#26312d]"
                            style={{ transform: "rotate(-8deg)" }}
                        >
                            Tap to flip
                        </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="45"
                            fill="none"
                            overflow="visible"
                            className="absolute left-10 top-10 rotate-90"
                        >
                            <path
                                d="M 38.275 34.58 C 36.139 37.77 33.092 40.569 29.995 42.203 C 27.541 43.492 24.334 44.391 20.979 44.742 C 18.135 45.037 15.058 45.082 12.835 44.862 C 10.52 44.63 8.393 44.178 5.213 43.254 C 1.474 42.171 0.45 41.716 0.094 40.99 C -0.03 40.741 -0.032 40.641 0.09 40.433 L 0.241 40.174 L 0.909 40.486 C 1.566 40.8 1.897 40.901 5.876 41.914 C 9.259 42.785 11.265 43.118 13.896 43.254 C 18.42 43.49 23.432 42.839 26.648 41.58 C 29.826 40.337 32.55 38.244 35.073 35.127 C 35.381 34.739 35.947 33.856 36.623 32.7 C 37.785 30.694 38.202 29.776 38.726 28.009 C 39.79 24.376 39.774 21.649 38.646 15.571 C 38.421 14.366 37.788 11.821 37.698 11.77 C 37.675 11.757 37.577 11.977 37.482 12.259 C 37.226 13.023 37.007 13.362 36.599 13.614 C 36.176 13.877 35.534 13.896 35.121 13.661 C 34.499 13.306 34.275 12.645 34.394 11.517 C 34.432 11.213 34.543 9.586 34.645 7.906 C 34.848 4.532 34.919 3.931 35.268 2.598 C 35.686 0.978 36.279 0.22 37.257 0.036 C 38.121 -0.124 38.94 0.254 39.489 1.061 C 39.641 1.296 40.036 2.144 40.363 2.953 C 41.05 4.669 41.273 5.092 41.984 6.031 C 42.656 6.918 43.646 7.927 45.335 9.453 C 48.301 12.113 48.162 11.974 47.831 12.062 C 47.428 12.168 44.499 11.002 42.953 10.121 C 41.865 9.501 41.245 9.039 40.342 8.188 C 39.986 7.857 39.692 7.59 39.68 7.593 C 39.668 7.596 39.854 8.048 40.096 8.592 C 41.164 11.009 42.178 16.083 42.417 20.241 C 42.607 23.63 42.197 26.263 40.966 29.464 C 40.302 31.2 39.42 32.861 38.275 34.58 Z"
                                fill="rgb(38,38,38)"
                            />
                        </svg>
                    </div>

                    {/* ── 3D Flip Letter Card (Fixed Dimensions) ────────────────────────── */}
                    <div
                        className="cursor-pointer w-full h-[530px] sm:h-[560px]"
                        style={{ perspective: "800px" }}
                        onClick={handleTap}
                    >
                        <motion.div
                            initial={{ rotateX: 0 }}
                            animate={cardCtrl}
                            className="w-full h-full"
                            style={{
                                transformStyle: "preserve-3d",
                                willChange: "transform",
                                position: "relative",
                            }}
                        >
                            {/* ── Letter paper (Fixed Height) ──────────────────────────── */}
                            <div
                                className="w-full h-full flex flex-col justify-between"
                                style={{
                                    background: "#ffffff",
                                    borderRadius: "16px",
                                    border: "1px solid rgba(0,0,0,0.08)",
                                    boxShadow:
                                        "0 2px 8px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.06)",
                                    padding: "10px",
                                }}
                            >
                                {/* Inner paper area with subtle warm tint */}
                                <div
                                    style={{
                                        background: "#fdfcf7",
                                        borderRadius: "12px",
                                        border: "1px solid rgba(0,0,0,0.04)",
                                    }}
                                    className="p-4 sm:p-6 flex flex-col justify-between h-full overflow-hidden"
                                >
                                    <div className="flex flex-col flex-1 overflow-hidden">
                                        {/* Card Top Row: Rating Stars + Badges */}
                                        <div className="flex items-center justify-between gap-2 mb-2 shrink-0">
                                            <div className="flex items-center gap-1 text-amber-400">
                                                {[...Array(t.rating)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                {t.isAmazon ? <AmazonBadge /> : <VerifiedBadge />}
                                                <span className="bg-[#11731b]/10 text-[#11731b] font-poppins text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                    {t.tag}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Greeting */}
                                        <p
                                            className="font-cormorant text-[16px] sm:text-[18px] shrink-0"
                                            style={{
                                                fontWeight: 500,
                                                fontStyle: "normal",
                                                lineHeight: 1.3,
                                                color: "#2c2c2c",
                                                marginBottom: "6px",
                                            }}
                                        >
                                            {t.greeting}
                                        </p>

                                        {/* Body (Fixed line clamp / max height for uniform fit) */}
                                        <div className="shrink-0 mb-2">
                                            <p
                                                className="font-poppins text-[12.5px] sm:text-[13.5px] line-clamp-3 sm:line-clamp-4 leading-[1.6] text-[#444444]"
                                            >
                                                {t.body}
                                            </p>
                                        </div>

                                        {/* Embedded Customer Review Image Frame (Fixed Height) */}
                                        {t.image && (
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setLightboxImage(t.image);
                                                }}
                                                className="relative group/img my-auto w-full h-[200px] sm:h-[220px] shrink-0 rounded-xl overflow-hidden bg-[#f4f1e4] border border-black/10 shadow-inner flex items-center justify-center transition-all hover:border-[#11731b]"
                                                title="Click to view full image"
                                            >
                                                <Image
                                                    src={t.image}
                                                    alt={t.imageAlt}
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, 420px"
                                                    className="object-contain object-center transition-transform duration-300 group-hover/img:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="bg-[#26312d]/90 text-white font-poppins text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                                                        <Maximize2 className="w-3.5 h-3.5 text-[#fffdf2]" />
                                                        View Full Image
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Sign Off & Signature Footer (Pinned at Bottom) */}
                                    <div className="mt-2 pt-2 border-t border-black/5 shrink-0">
                                        <p
                                            className="font-poppins text-[12px] sm:text-[13px] text-[#555555] mb-0.5"
                                        >
                                            {t.signoff}
                                        </p>

                                        <div className="flex items-baseline justify-between gap-2">
                                            <p
                                                className="font-cormorant text-[22px] sm:text-[26px]"
                                                style={{
                                                    fontWeight: 600,
                                                    fontStyle: "italic",
                                                    lineHeight: 1.1,
                                                    color: "#1c1c1c",
                                                }}
                                            >
                                                {t.name}
                                            </p>
                                            <span className="font-poppins text-[10.5px] sm:text-[11px] text-gray-500 italic">
                                                {t.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Darkening overlay during flip */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={overlayCtrl}
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: "16px",
                                    background: "rgba(0,0,0,1)",
                                    pointerEvents: "none",
                                }}
                            />
                        </motion.div>
                    </div>

                    {/* ── Carousel Navigation Controls ───────────────── */}
                    <div className="flex items-center justify-between w-full mt-5 px-1">
                        <button
                            type="button"
                            onClick={handlePrev}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-300 text-[#26312d] hover:bg-[#11731b] hover:text-white transition-all cursor-pointer shadow-xs active:scale-95"
                            aria-label="Previous review"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-1.5">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        animateToNext(i);
                                    }}
                                    className={`h-2.5 rounded-full transition-all cursor-pointer ${i === index
                                        ? "w-7 bg-[#11731b]"
                                        : "w-2.5 bg-gray-300 hover:bg-gray-400"
                                        }`}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={handleNext}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-300 text-[#26312d] hover:bg-[#11731b] hover:text-white transition-all cursor-pointer shadow-xs active:scale-95"
                            aria-label="Next review"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* ── Review Image Thumbnails Bar ─────────────────── */}
                    <div className="mt-6 w-full flex flex-col items-center gap-2">
                        <span className="font-poppins text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                            Customer Review Screenshots ({testimonials.length})
                        </span>
                        <div className="flex items-center justify-center gap-2 overflow-x-auto max-w-full py-1 px-2 no-scrollbar">
                            {testimonials.map((item, i) => {
                                const isActive = i === index;
                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            animateToNext(i);
                                        }}
                                        className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${isActive
                                            ? "border-[#11731b] scale-105 shadow-md ring-2 ring-[#11731b]/30"
                                            : "border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-400"
                                            }`}
                                        title={`View review by ${item.name}`}
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            sizes="64px"
                                            className="object-cover object-center"
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Lightbox Modal for Full Review Image View ──────── */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightboxImage(null)}
                        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
                    >
                        <div className="relative max-w-3xl w-full max-h-[90vh] flex flex-col items-center">
                            <button
                                type="button"
                                onClick={() => setLightboxImage(null)}
                                className="absolute -top-12 right-0 text-white bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors cursor-pointer"
                                aria-label="Close image lightbox"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <div className="relative w-full h-[75vh] bg-[#faf6de] rounded-2xl overflow-hidden shadow-2xl p-2">
                                <Image
                                    src={lightboxImage}
                                    alt="Full customer review"
                                    fill
                                    sizes="100vw"
                                    className="object-contain object-center"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Background Zigzag SVGs (hidden on mobile, visible on md+) ── */}
            <ZigzagSVG color="green" className="absolute z-0 hidden md:block" width={85} height={50}
                style={{ top: "18%", left: "6%", transform: "rotate(8deg)" }} />
            <ZigzagSVG color="green" className="absolute z-0 hidden md:block" width={95} height={60}
                style={{ top: "42%", left: "12%", transform: "rotate(65deg)" }} />
            <ZigzagSVG color="green" className="absolute z-0 hidden md:block" width={80} height={48}
                style={{ top: "68%", left: "3%", transform: "rotate(12deg)" }} />
            <ZigzagSVG color="green" className="absolute z-0 hidden md:block" width={88} height={52}
                style={{ top: "78%", left: "16%", transform: "rotate(-3deg)" }} />
            <ZigzagSVG color="green" className="absolute top-[14%] right-[2%] md:right-[5%] lg:right-[15%] z-0 hidden md:block" width={85} height={50}
                style={{ transform: "rotate(20deg)" }} />
            <ZigzagSVG color="green" className="absolute z-0 hidden md:block" width={110} height={75}
                style={{ top: "28%", right: "10%", transform: "rotate(40deg)" }} />
            <ZigzagSVG color="green" className="absolute z-0 hidden md:block" width={82} height={48}
                style={{ top: "52%", right: "18%", transform: "rotate(154deg)" }} />
            <ZigzagSVG color="green" className="absolute z-0 hidden md:block" width={79} height={43}
                style={{ top: "64%", right: "6%", transform: "rotate(155deg)" }} />
            <ZigzagSVG color="green" className="absolute z-0 hidden md:block" width={88} height={52}
                style={{ top: "78%", right: "15%", transform: "rotate(-8deg)" }} />
        </section>
    );
};

export default Testimonials;