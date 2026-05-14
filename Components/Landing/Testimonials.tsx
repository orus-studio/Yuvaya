"use client";

import React, { useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { flushSync } from "react-dom";
import ZigzagSVG from "@/Components/Shared/ZigzagSVG";

/* ── Testimonial data ─────────────────────────────────────────── */
const testimonials = [
    {
        greeting: "Dear Yuvaya,",
        body: `I've been using your Daily Greens + Collagen sachet every morning for the past 3 months, and I honestly can't imagine my routine without it. My skin feels more hydrated, my nails are stronger, and I have so much more energy throughout the day. The Mango Citron flavor makes it something I actually look forward to drinking.`,
        signoff: "Best regards,",
        name: "Priya Sharma",
    },
    {
        greeting: "Dear Yuvaya,",
        body: `As someone who's tried countless greens powders, I was skeptical at first. But your blend is genuinely different — no grassy aftertaste, dissolves perfectly in water, and I can feel the difference in my digestion and skin clarity. The fact that it combines greens AND collagen in one sachet is a game-changer. My husband has started using it too!`,
        signoff: "With love,",
        name: "Ananya Reddy",
    },
    {
        greeting: "Dear Yuvaya,",
        body: `I bought Yuvaya CollaGreens for my mother who has been struggling with joint stiffness and dull skin. Within 6 weeks she noticed a remarkable difference — her knees feel better on morning walks and her friends keep asking about her "glow." Thank you for creating something that's both effective and easy to use.`,
        signoff: "Gratefully,",
        name: "Rohan Mehta",
    },
    {
        greeting: "Dear Yuvaya,",
        body: `Being a fitness enthusiast, I'm very particular about what goes into my body. Yuvaya checked every box — clean ingredients, no artificial sweeteners, and 25+ bioactives in one serving. I mix it into my post-workout smoothie and it blends seamlessly. The marine collagen has noticeably improved my recovery time.`,
        signoff: "Cheers,",
        name: "Kavya Nair",
    },
];

/* ── Component ────────────────────────────────────────────────── */
const Testimonials = () => {
    const [index, setIndex] = useState(0);
    const [busy, setBusy] = useState(false);
    const cardCtrl = useAnimation();
    const overlayCtrl = useAnimation();

    const t = testimonials[index];

    const handleTap = useCallback(async () => {
        if (busy) return;
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
        flushSync(() => setIndex((p) => (p + 1) % testimonials.length));

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
    }, [busy, cardCtrl, overlayCtrl]);

    return (
        <section
            className="relative w-full overflow-hidden bg-[#fffdf2]"
            style={{ minHeight: "500px", zIndex: 1 }}
        >
            {/* ── Inner wrapper ──────────────────────────────────── */}
            <div
                className="relative mx-auto flex flex-col items-center justify-center overflow-visible px-4 py-10 sm:px-8 sm:py-14 md:max-w-[1000px] md:px-[80px] md:pt-[60px] md:pb-[80px]"
                style={{ zIndex: 5 }}
            >
                {/* Badge */}
                <div className="mb-4 rounded-full bg-[#11731b] px-3 py-1.5">
                    <span className="font-poppins whitespace-pre text-[10px] font-bold uppercase leading-[1.2] tracking-[0.05em] text-[#fffdf2]">
                        Letters of Love
                    </span>
                </div>

                {/* Heading */}
                <h2 className="font-tt-ramillas mb-6 text-center text-[20px] font-medium leading-[1.2] tracking-[0.03em] text-black sm:mb-8 sm:text-[28px] md:mb-10 md:text-[32px]">
                    Here&apos;s what our customers wrote us
                </h2>

                {/* ── Card area ──────────────────────────────────── */}
                <div className="relative flex items-center justify-center">
                    {/* Tap-me indicator */}
                    <div
                        className="absolute z-10 hidden flex-col items-center md:flex"
                        style={{ left: "-100px", top: "20px" }}
                    >
                        <span
                            className="font-cormorant font-semibold text-[22px] italic text-[#26312d]"
                            style={{ transform: "rotate(-8deg)" }}
                        >
                            Tap me
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

                    {/* ── 3D Flip Letter Card ────────────────────────── */}
                    <div
                        className="cursor-pointer w-full max-w-[420px]"
                        style={{ perspective: "800px" }}
                        onClick={handleTap}
                    >
                        <motion.div
                            initial={{ rotateX: 0 }}
                            animate={cardCtrl}
                            style={{
                                transformStyle: "preserve-3d",
                                willChange: "transform",
                                position: "relative",
                            }}
                        >
                            {/* ── Letter paper ──────────────────────────── */}
                            <div
                                className="w-full"
                                style={{
                                    background: "#ffffff",
                                    borderRadius: "14px",
                                    border: "1px solid rgba(0,0,0,0.06)",
                                    boxShadow:
                                        "0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.045)",
                                    padding: "12px",
                                }}
                            >
                                {/* Inner paper area with subtle warm tint */}
                                <div
                                    style={{
                                        background: "#fdfcf7",
                                        borderRadius: "10px",
                                        border: "1px solid rgba(0,0,0,0.04)",
                                        padding: "24px 20px 20px 20px",
                                    }}
                                    className="sm:!p-[30px] md:!p-[40px_36px_36px_36px]"
                                >
                                    {/* Greeting */}
                                    <p
                                        className="font-cormorant text-[16px] sm:text-[18px] md:text-[20px]"
                                        style={{
                                            fontWeight: 400,
                                            fontStyle: "normal",
                                            lineHeight: 1.4,
                                            color: "#3a3a3a",
                                            marginBottom: "12px",
                                        }}
                                    >
                                        {t.greeting}
                                    </p>

                                    {/* Body */}
                                    <p
                                        className="font-poppins text-[13px] sm:text-[14px] md:text-[15.5px]"
                                        style={{
                                            fontWeight: 400,
                                            lineHeight: 1.75,
                                            color: "#444444",
                                            marginBottom: "16px",
                                        }}
                                    >
                                        {t.body}
                                    </p>

                                    {/* Sign off */}
                                    <p
                                        className="font-poppins text-[13px] sm:text-[14px] md:text-[15.5px]"
                                        style={{
                                            fontWeight: 400,
                                            lineHeight: 1.4,
                                            color: "#444444",
                                            marginBottom: "12px",
                                        }}
                                    >
                                        {t.signoff}
                                    </p>

                                    {/* Signature name — cursive / handwritten style */}
                                    <p
                                        className="font-cormorant text-[24px] sm:text-[28px] md:text-[32px]"
                                        style={{
                                            fontWeight: 500,
                                            fontStyle: "italic",
                                            lineHeight: 1.2,
                                            color: "#2a2a2a",
                                        }}
                                    >
                                        {t.name}
                                    </p>
                                </div>
                            </div>

                            {/* Darkening overlay during flip */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={overlayCtrl}
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: "14px",
                                    background: "rgba(0,0,0,1)",
                                    pointerEvents: "none",
                                }}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ── Background Zigzag SVGs (hidden on mobile, visible on md+) ── */}
            {/* Top-left near heading */}
            {/* Left side upper */}
            <ZigzagSVG color="green" className="absolute z-0 hidden md:block" width={85} height={50}
                style={{ top: "20%", left: "8%", transform: "rotate(8deg)" }} />
            {/* Left side middle */}
            <ZigzagSVG color="green" className="absolute z-0 hidden md:block" width={95} height={60}
                style={{ top: "45%", left: "17%", transform: "rotate(65deg)" }} />
            {/* Left side lower */}
            <ZigzagSVG color="green" className="absolute z-0 hidden md:block" width={80} height={48}
                style={{ top: "68%", left: "3%", transform: "rotate(12deg)" }} />
            {/* Bottom-left */}
            <ZigzagSVG color="green" className="absolute z-0 hidden md:block" width={88} height={52}
                style={{ top: "75%", left: "18%", transform: "rotate(-3deg)" }} />
            {/* Top-right near heading */}
            <ZigzagSVG color="green" className="absolute top-[14%] right-[2%] md:right-[5%] lg:right-[18%] z-0 hidden md:block" width={85} height={50}
                style={{ transform: "rotate(20deg)" }} />
            {/* Right side upper */}
            <ZigzagSVG color="green" className="absolute z-0 hidden md:block" width={110} height={75}
                style={{ top: "28%", right: "13%", transform: "rotate(40deg)" }} />
            {/* Right side middle */}
            <ZigzagSVG color="green" className="absolute z-0 hidden md:block" width={82} height={48}
                style={{ top: "50%", right: "23%", transform: "rotate(154deg)" }} />
            <ZigzagSVG color="green" className="absolute z-0 hidden md:block" width={79} height={43}
                style={{ top: "60%", right: "6%", transform: "rotate(155deg)" }} />
            {/* Right side lower */}
            <ZigzagSVG color="green" className="absolute z-0 hidden md:block" width={88} height={52}
                style={{ top: "75%", right: "20%", transform: "rotate(-8deg)" }} />
        </section>
    );
};

export default Testimonials;