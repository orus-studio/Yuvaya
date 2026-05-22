"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/#shop" },
  { name: "About Us", href: "#about" },
  { name: "Contact Us", href: "#contact" },
  { name: "Account", href: "/account" },
];

const Navbar = () => {
  const { scrollY } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const lastScrollY = useRef(0);

  const shrinkThreshold = 20;
  const hideThreshold = 80;

  // Keep near-full width on mobile and compact on desktop while scrolling.
  const navWidth = useTransform(
    scrollY,
    [0, shrinkThreshold],
    ["98%", "92%"]
  );

  const navMaxWidth = useTransform(scrollY, [0, shrinkThreshold], [1200, 800]);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = lastScrollY.current;
    const scrollingDown = current > previous;
    const scrollingUp = current < previous;

    if (current < 10) {
      setIsNavHidden(false);
    } else if (scrollingDown && current > hideThreshold) {
      setIsNavHidden(true);
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    } else if (scrollingUp) {
      setIsNavHidden(false);
    }

    lastScrollY.current = current;
  });

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const closeMenuOnResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", closeMenuOnResize);
    return () => window.removeEventListener("resize", closeMenuOnResize);
  }, [isMobileMenuOpen]);

  return (
    <div className="font-poppins fixed top-3 left-1/2 z-100 w-full -translate-x-1/2 px-2 sm:px-4">
      <motion.nav
        className="mx-auto flex h-16 items-center justify-between rounded-full bg-[#191a1d] px-3 shadow-lg shadow-black/10 sm:px-5"
        style={{
          width: navWidth,
          maxWidth: navMaxWidth,
          pointerEvents: isNavHidden ? "none" : "auto",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isNavHidden ? 0 : 1,
          y: isNavHidden ? -90 : 0,
          scale: isNavHidden ? 0.98 : 1,
        }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
      >
        {/* Left: Logo */}
        <Link href="/" className="ml-1 flex items-center">
          <Image
            src="/WhiteLogo.png"
            alt="Yuvaya Logo"
            width={26}
            height={26}
            style={{ objectFit: "contain" }}
          />
        </Link>

        {/* Center: Desktop Navigation */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 md:flex">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
            >
              <Link
                href={link.href}
                className="group relative whitespace-nowrap text-base font-medium tracking-wide text-white transition-colors duration-200 hover:text-white/80"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cart Icon */}
          <motion.button
            className="flex items-center justify-center text-white transition-colors duration-200"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Shopping Cart"
            style={{
              flex: "none",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23.978"
              height="24"
              fill="none"
              overflow="visible"
            >
              <path
                d="M 5.506 23.296 C 5.035 22.825 4.8 22.26 4.8 21.6 C 4.8 20.94 5.035 20.375 5.506 19.906 C 5.976 19.436 6.541 19.201 7.2 19.2 C 7.859 19.199 8.424 19.434 8.896 19.906 C 9.367 20.377 9.602 20.942 9.6 21.6 C 9.598 22.258 9.364 22.824 8.896 23.296 C 8.428 23.768 7.862 24.002 7.2 24 C 6.538 23.998 5.973 23.763 5.506 23.296 M 17.506 23.296 C 17.035 22.825 16.8 22.26 16.8 21.6 C 16.8 20.94 17.035 20.375 17.506 19.906 C 17.976 19.436 18.541 19.201 19.2 19.2 C 19.859 19.199 20.424 19.434 20.896 19.906 C 21.367 20.377 21.602 20.942 21.6 21.6 C 21.598 22.258 21.364 22.824 20.896 23.296 C 20.428 23.768 19.862 24.002 19.2 24 C 18.538 23.998 17.973 23.763 17.506 23.296 M 5.04 2.4 L 22.74 2.4 C 23.2 2.4 23.55 2.605 23.79 3.016 C 24.03 3.426 24.04 3.841 23.82 4.26 L 19.56 11.94 C 19.34 12.34 19.045 12.65 18.676 12.87 C 18.306 13.09 17.901 13.2 17.46 13.2 L 8.52 13.2 L 7.2 15.6 L 20.4 15.6 C 20.74 15.6 21.025 15.715 21.256 15.946 C 21.486 16.176 21.601 16.461 21.6 16.8 C 21.599 17.139 21.484 17.424 21.254 17.656 C 21.025 17.887 20.74 18.002 20.4 18 L 7.2 18 C 6.3 18 5.62 17.605 5.16 16.816 C 4.7 16.026 4.68 15.241 5.1 14.46 L 6.72 11.52 L 2.4 2.4 L 1.2 2.4 C 0.86 2.4 0.575 2.285 0.346 2.054 C 0.116 1.824 0.001 1.539 0 1.2 C -0.001 0.861 0.114 0.576 0.346 0.346 C 0.577 0.115 0.862 0 1.2 0 L 3.15 0 C 3.37 0 3.58 0.06 3.78 0.18 C 3.98 0.3 4.13 0.47 4.23 0.69 Z"
                fill="rgb(255, 255, 255)"
              />
            </svg>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="mx-auto mt-2 w-[96%] rounded-2xl border border-white/10 bg-[#191a1d] p-4 md:hidden"
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-md px-2 py-1.5 text-base font-medium tracking-wide text-white transition-colors hover:bg-white/10 hover:text-white/80"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;