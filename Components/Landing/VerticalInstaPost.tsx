"use client";

import React from "react";
import { motion } from "framer-motion";

const instaPosts = [
    { src: "/Landing/InstaPost_3.JPG", alt: "Yuvaya Collagreens with tropical backdrop" },
    { src: "/Landing/InstaPost_4.JPG", alt: "Model holding Yuvaya sachet" },
    { src: "/Landing/InstaPost_2.jpg", alt: "Yuvaya pouch in a luxury handbag" },
    { src: "/Landing/InstaPost_5.JPG", alt: "Model drinking Yuvaya greens drink" },
    { src: "/Landing/InstaPost_1.JPG", alt: "Yuvaya sachets flat lay" },
];

const instagramUrl = "https://www.instagram.com/yuvayaindia";

// Duplicate once for a seamless loop while keeping the DOM lighter.
const repeatedPosts = [...instaPosts, ...instaPosts];

const InstagramIcon = () => (
    <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="5"
            stroke="white"
            strokeWidth="1.5"
        />
        <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
    </svg>
);

const VerticalInstaPost = () => {
    return (
        <section
            id="insta-posts"
            className="relative w-full overflow-hidden py-8 sm:py-12 md:py-16"
            style={{ backgroundColor: "#fffdf2" }}
        >
            <div className="relative w-full overflow-hidden">
                <motion.div
                    className="flex w-max flex-row flex-nowrap gap-2 sm:gap-3"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 70,
                    }}
                >
                    {repeatedPosts.map((post, index) => (
                        <a
                            key={index}
                            href={instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative block shrink-0 overflow-hidden rounded-lg w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
                        >
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-500 ease-out group-hover:scale-105"
                                style={{ backgroundImage: `url(${post.src})` }}
                            />
                            <div
                                className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                                style={{
                                    WebkitBackdropFilter: "blur(7px)",
                                    backdropFilter: "blur(7px)",
                                    backgroundColor: "rgba(122, 122, 122, 0.11)",
                                }}
                            >
                                <span className="sr-only">Open {post.alt} on Instagram</span>
                                <InstagramIcon />
                            </div>
                        </a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default VerticalInstaPost;