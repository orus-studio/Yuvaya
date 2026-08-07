"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendQuizSubmission } from "@/app/actions/sendEmail";

// Custom SVG Icons to avoid Lucide React name mismatch and ensure bulletproof rendering
const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CopyIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CopySuccessIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#3b5e47]"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const YuvayaLogo = ({ className = "h-8 w-auto" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="177.256"
    height="45"
    fill="none"
    overflow="visible"
    className={className}
  >
    <g>
      <path
        d="M 172.954 0 C 170.581 0 168.652 1.923 168.652 4.287 C 168.652 6.65 170.581 8.573 172.954 8.573 C 175.326 8.573 177.256 6.65 177.256 4.287 C 177.256 1.923 175.326 0 172.954 0 Z M 172.954 7.96 C 170.921 7.96 169.267 6.312 169.267 4.287 C 169.267 2.262 170.921 0.614 172.954 0.614 C 174.987 0.614 176.64 2.262 176.64 4.287 C 176.64 6.312 174.987 7.96 172.954 7.96 Z"
        fill="#fff"
      ></path>
      <path
        d="M 173.51 4.539 C 174.166 4.52 174.593 4.116 174.593 3.503 C 174.593 2.809 174.054 2.345 173.228 2.345 L 171.321 2.345 L 171.321 6.229 L 172.038 6.229 L 172.038 4.759 L 172.74 4.759 C 173.126 4.759 173.281 4.852 173.418 5.152 L 173.906 6.229 L 174.697 6.229 L 174.212 5.149 C 174.042 4.771 173.809 4.561 173.51 4.539 Z M 173.141 4.148 L 172.038 4.148 L 172.038 2.963 L 173.14 2.963 C 173.611 2.963 173.874 3.17 173.874 3.544 C 173.874 3.924 173.602 4.148 173.141 4.148 Z M 79.74 5.91 L 79.468 5.91 L 73.918 8.567 L 73.863 8.838 C 75.677 9.525 77.037 10.565 77.944 11.956 C 78.851 13.347 79.305 14.929 79.305 16.699 C 79.305 18.976 78.823 21.181 77.863 23.314 C 76.901 25.447 75.64 27.172 74.081 28.491 C 72.521 29.811 70.906 30.47 69.238 30.47 C 67.968 30.47 67.089 30.028 66.599 29.142 C 66.109 28.257 66.064 26.82 66.463 24.832 L 68.64 13.772 C 68.82 12.904 68.911 11.983 68.911 11.007 C 68.911 9.272 68.512 7.989 67.715 7.158 C 66.916 6.327 65.864 5.91 64.559 5.91 C 63.035 5.91 61.702 6.526 60.559 7.754 C 59.416 8.983 58.41 11.224 57.539 14.477 L 58.464 14.477 C 59.843 10.609 61.112 8.676 62.273 8.676 C 62.781 8.676 63.089 8.911 63.198 9.38 C 63.307 9.85 63.253 10.627 63.035 11.712 L 60.64 23.91 C 60.386 25.176 60.26 26.386 60.26 27.543 C 60.26 29.856 60.794 31.564 61.865 32.666 C 62.934 33.768 64.413 34.32 66.3 34.32 C 68.911 34.32 71.396 33.317 73.755 31.31 C 76.112 29.305 78.007 26.648 79.441 23.341 C 80.874 20.033 81.59 16.537 81.59 12.85 C 81.59 11.332 81.445 10.031 81.155 8.946 C 80.864 7.862 80.393 6.851 79.74 5.91 Z M 108.443 32.476 C 109.512 31.248 110.483 29.006 111.354 25.753 L 110.429 25.753 C 109.776 27.597 109.132 29.025 108.497 30.036 C 107.862 31.049 107.254 31.554 106.674 31.554 C 106.166 31.554 105.858 31.32 105.749 30.85 C 105.64 30.38 105.695 29.585 105.913 28.464 L 110.265 5.91 L 109.994 5.91 L 104.987 8.404 C 104.153 7.573 103.183 6.95 102.076 6.534 C 100.969 6.119 99.782 5.91 98.512 5.91 C 95.537 5.91 92.871 6.796 90.513 8.567 C 88.155 10.338 86.324 12.661 85.017 15.534 C 83.711 18.407 83.058 21.416 83.058 24.561 C 83.058 27.488 83.711 29.847 85.017 31.636 C 86.324 33.425 88.209 34.32 90.677 34.32 C 92.962 34.32 94.921 33.516 96.553 31.907 C 98.186 30.299 99.509 28.067 100.526 25.211 L 100.798 25.211 L 100.471 27.109 C 100.326 28.121 100.253 28.826 100.253 29.223 C 100.253 30.886 100.661 32.151 101.478 33.018 C 102.294 33.886 103.355 34.32 104.661 34.32 C 106.111 34.32 107.372 33.704 108.443 32.476 Z M 102.92 13.935 C 101.649 18.742 100.208 22.736 98.594 25.916 C 96.979 29.097 95.174 30.687 93.18 30.687 C 91.874 30.687 90.894 30.145 90.241 29.061 C 89.588 27.976 89.262 26.477 89.262 24.561 C 89.262 22.175 89.678 19.619 90.513 16.889 C 91.347 14.161 92.508 11.866 93.996 10.004 C 95.483 8.143 97.115 7.212 98.893 7.212 C 99.655 7.212 100.362 7.465 101.015 7.971 C 101.668 8.477 102.176 9.236 102.539 10.248 C 102.901 11.26 103.029 12.489 102.92 13.935 Z"
        fill="#fff"
      ></path>
      <path
        d="M 134.099 5.91 L 133.827 5.91 L 128.222 8.513 L 128.167 8.784 C 129.546 9.326 130.706 10.257 131.65 11.576 C 132.593 12.896 133.065 14.513 133.065 16.428 C 133.065 18.886 132.375 21.715 130.997 24.913 C 129.618 28.112 127.913 30.977 125.882 33.506 C 125.882 30.362 125.846 28.067 125.773 26.621 C 125.556 22.14 125.102 18.363 124.413 15.29 C 123.724 12.218 122.754 9.887 121.502 8.296 C 120.25 6.706 118.717 5.91 116.904 5.91 C 115.307 5.91 113.993 6.688 112.959 8.242 C 111.925 9.796 111.226 12.164 110.864 15.344 L 111.735 15.344 C 112.242 13.104 112.75 11.45 113.258 10.383 C 113.766 9.318 114.382 8.784 115.108 8.784 C 115.979 8.784 116.768 9.688 117.475 11.495 C 118.183 13.303 118.781 15.805 119.271 19.004 C 119.761 22.202 120.078 25.808 120.223 29.82 C 120.332 32.53 120.386 35.421 120.386 38.494 C 119.262 39.362 118.164 40.021 117.094 40.473 C 116.024 40.924 114.945 41.151 113.856 41.151 C 111.172 41.151 108.851 40.121 106.891 38.06 L 106.62 38.06 L 106.238 44.621 C 106.674 44.729 107.182 44.819 107.762 44.892 C 108.343 44.963 108.905 45 109.449 45 C 113.984 45 118.309 43.147 122.427 39.443 C 126.544 35.737 129.855 31.266 132.358 26.025 C 134.861 20.784 136.112 16.122 136.112 12.037 C 136.112 10.772 135.912 9.624 135.514 8.594 C 135.114 7.564 134.643 6.669 134.099 5.91 Z M 162.584 30.036 C 161.949 31.049 161.341 31.554 160.761 31.554 C 160.252 31.554 159.945 31.32 159.836 30.85 C 159.727 30.38 159.781 29.585 159.999 28.464 L 164.352 5.91 L 164.08 5.91 L 159.074 8.404 C 158.239 7.573 157.269 6.95 156.163 6.534 C 155.056 6.119 153.868 5.91 152.599 5.91 C 149.624 5.91 146.958 6.796 144.6 8.567 C 142.241 10.338 140.41 12.661 139.104 15.534 C 137.798 18.407 137.145 21.416 137.145 24.561 C 137.145 27.488 137.798 29.847 139.104 31.636 C 140.41 33.425 142.296 34.32 144.763 34.32 C 147.049 34.32 149.007 33.516 150.64 31.907 C 152.272 30.299 153.596 28.067 154.612 25.211 L 154.884 25.211 L 154.557 27.109 C 154.412 28.121 154.34 28.826 154.34 29.223 C 154.34 30.886 154.748 32.151 155.564 33.018 C 156.38 33.886 157.442 34.32 158.748 34.32 C 160.198 34.32 161.459 33.704 162.53 32.476 C 163.599 31.248 164.57 29.006 165.441 25.753 L 164.516 25.753 C 163.863 27.597 163.218 29.025 162.584 30.036 Z M 157.007 13.935 C 155.736 18.742 154.294 22.736 152.681 25.916 C 151.066 29.097 149.261 30.687 147.266 30.687 C 145.96 30.687 144.981 30.145 144.328 29.061 C 143.675 27.976 143.348 26.477 143.348 24.561 C 143.348 22.175 143.765 19.619 144.6 16.889 C 145.434 14.161 146.594 11.866 148.082 10.004 C 149.569 8.143 151.202 7.212 152.979 7.212 C 153.741 7.212 154.449 7.465 155.102 7.971 C 155.755 8.477 156.262 9.236 156.625 10.248 C 156.988 11.26 157.115 12.489 157.007 13.935 Z M 13.801 28.693 L 6.405 6.903 L 0 6.903 L 10.452 34.672 L 10.39 34.843 C 9.254 37.449 7.31 38.57 4.132 38.57 C 3.362 38.57 2.53 38.509 1.553 38.375 L 1.553 43.478 C 2.579 43.637 3.606 43.722 4.608 43.722 C 10.733 43.722 14.547 41.03 16.833 34.977 L 27.553 6.903 L 21.282 6.903 Z M 48.783 21.214 C 48.783 26.232 46.241 29.082 41.877 29.082 C 37.806 29.082 35.801 26.585 35.801 21.604 L 35.801 6.903 L 29.665 6.903 L 29.665 22.213 C 29.665 29.996 33.075 34.49 39.041 34.49 C 44.065 34.49 47.561 31.323 48.783 25.855 L 48.783 33.759 L 54.92 33.759 L 54.92 6.903 L 48.783 6.903 Z"
        fill="#fff"
      ></path>
    </g>
  </svg>
);

interface Question {
  id: number;
  question: string;
  options: string[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "To Claim let us know: What's your age group?",
    options: ["A. 18-25", "B. 25-35", "C. 35-50", "D. 50+"],
  },
  {
    id: 2,
    question: "How do you identify yourself?",
    options: ["Male", "Female", "Prefer not to say"],
  },
  {
    id: 3,
    question: "What’s your kind of drink?",
    options: [
      "A. Mango-flavoured drinks",
      "B. Chocolatey milkshakes",
      "C. Tropical cocktails",
      "D. A matcha ube latte",
    ],
  },
  {
    id: 4,
    question: "What is your primary wellness goal?",
    options: [
      "Overall health maintenance",
      "Improve joint flexibility and mobility",
      "Recovery faster after workouts",
      "Stay active and energetic throughout the day",
    ],
  },
  {
    id: 5,
    question: "What matters most to you in a snack?",
    options: ["Gluten free", "No refined sugar", "Vegan", "All of the above"],
  },
  {
    id: 6,
    question: "What is your sweet spot for snacks?",
    options: ["Under five hundred rupees (Under ₹500)", "₹500 to ₹1000", "₹1000 +"],
  },
];

interface OfferSectionProps {
  initialQuestions?: {
    id: number;
    question: string;
    options: string[];
  }[];
}

const OfferSection: React.FC<OfferSectionProps> = ({ initialQuestions }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Use dynamically loaded questions if provided, otherwise fallback to hardcoded list
  const questionsList =
    initialQuestions && initialQuestions.length > 0 ? initialQuestions : QUESTIONS;
  const totalQuestions = questionsList.length;

  const [currentStep, setCurrentStep] = useState(0); // 0: Welcome, 1..totalQuestions: Quiz, totalQuestions+1: Lead Form, totalQuestions+2: Loading, totalQuestions+3: Reward
  const [direction, setDirection] = useState(1); // Framer-motion slide direction
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Listen to custom trigger event to open from anywhere in the app
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setCurrentStep(0);
      setAnswers({});
      setCopied(false);
      setName("");
      setEmail("");
      setErrorMsg("");
    };
    window.addEventListener("open-offer-quiz", handleOpen);
    return () => window.removeEventListener("open-offer-quiz", handleOpen);
  }, []);

  // Log active questions source for verification
  useEffect(() => {
    if (initialQuestions && initialQuestions.length > 0) {
      console.log(
        `🎉 [OfferSection] Loaded ${initialQuestions.length} questions dynamically from Shopify backend:`,
        initialQuestions
      );
    } else {
      console.warn(
        "⚠️ [OfferSection] No questions received from Shopify storefront API (or list empty). Falling back to local hardcoded data:",
        QUESTIONS
      );
    }
  }, [initialQuestions]);

  // Handle Close / Dismiss
  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("yuvaya_offer_quiz_dismissed", Date.now().toString());
  };

  // Handle navigation
  const handleContinue = () => {
    setDirection(1);
    setCurrentStep(1);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    } else if (currentStep === 1) {
      setDirection(-1);
      setCurrentStep(0);
    }
  };

  // Option selection
  const handleSelectOption = (questionId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));

    // Auto-advance after a small delay for visual feedback
    setTimeout(() => {
      setDirection(1);
      if (questionId < totalQuestions) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // Go to lead form screen (Step totalQuestions + 1)
        setCurrentStep(totalQuestions + 1);
      }
    }, 350);
  };

  // Lead Form Submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!email.trim()) {
      setErrorMsg("Please enter your email or phone number.");
      return;
    }
    const inputVal = email.trim();
    if (inputVal.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputVal)) {
        setErrorMsg("Please enter a valid email address.");
        return;
      }
    } else {
      // Validate phone number: minimum 10 digits, maximum 15 digits (allowing standard spacing/symbols)
      const phoneRegex = /^\+?[0-9\s\-()]{10,15}$/;
      if (!phoneRegex.test(inputVal)) {
        setErrorMsg("Please enter a valid email address or phone number (minimum 10 digits).");
        return;
      }
    }

    setDirection(1);
    setCurrentStep(totalQuestions + 2); // Go to loading screen

    try {
      const submissionData = {
        name: name.trim(),
        email: email.trim(),
        answers: questionsList.map((q) => ({
          question: q.question,
          answer: answers[q.id] || "No answer",
        })),
        ageGroup: answers[1] || "",
        identifyAs: answers[2] || "",
        drinkType: answers[3] || "",
        wellnessGoal: answers[4] || "",
        snackMatters: answers[5] || "",
        sweetSpot: answers[6] || "",
      };

      await sendQuizSubmission(submissionData);

      setCurrentStep(totalQuestions + 3); // Success reward
      localStorage.setItem("yuvaya_offer_quiz_completed", "true");
    } catch (err) {
      console.error("Quiz submission error:", err);
      // In case of error, still advance to coupon so we don't block user
      setCurrentStep(totalQuestions + 3);
      localStorage.setItem("yuvaya_offer_quiz_completed", "true");
    }
  };

  // Copy coupon code
  const handleCopyCode = () => {
    navigator.clipboard.writeText("YUVAYA10");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Animation variants
  const slideVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 100 : -100,
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -100 : 100,
      transition: { duration: 0.25, ease: "easeIn" as const },
    }),
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      {/* Modal Card */}
      <div className="relative w-full max-w-[430px] h-[680px] max-h-[90vh] bg-[#9cc1ab] rounded-[32px] overflow-hidden shadow-2xl flex flex-col justify-between p-6 sm:p-8 font-poppins text-white select-none border border-white/20">
        {/* Background Image Blurred with Custom Tints */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://ik.imagekit.io/orus/Horizontal_Insta_Post/InstaPost_1.webp')",
            filter: "blur(20px) ",
            transform: "scale(1.22)",
          }}
        />

        {/* Clean Sage Green Overlay matching pixel-to-pixel (#9cc1ab) */}
        <div className="absolute inset-0 z-0 bg-[#459162]/40" />

        {/* --- Card Header (Only show for Step > 0) --- */}
        {currentStep > 0 && (
          <div className="relative z-10 flex items-center justify-between w-full">
            {currentStep <= 7 ? (
              <button
                onClick={handleBack}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer"
                aria-label="Go back"
              >
                <ArrowLeftIcon />
              </button>
            ) : (
              <div className="w-8 h-8" />
            )}

            {/* Centered Yuvaya Logo for inside steps */}
            <div className="flex justify-center flex-1">
              <YuvayaLogo className="h-7 w-auto" />
            </div>

            {/* Close button for inside steps */}
            {currentStep <= 7 || currentStep === 9 ? (
              <button
                onClick={handleClose}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer"
                aria-label="Close survey"
              >
                <CloseIcon />
              </button>
            ) : (
              <div className="w-8 h-8" />
            )}
          </div>
        )}

        {/* --- Card Body / Screen Content --- */}
        <div
          className={`relative z-10 flex-1 flex flex-col justify-center ${currentStep > 0 ? "mt-4" : ""} overflow-hidden`}
        >
          <AnimatePresence mode="wait" custom={direction}>
            {/* Step 0: Welcome Screen */}
            {currentStep === 0 && (
              <motion.div
                key="welcome"
                custom={direction}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col justify-between items-center h-full w-full py-4 relative"
              >
                {/* Absolute Close button in Top Right */}
                <button
                  onClick={handleClose}
                  className="absolute top-0 right-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 z-20 cursor-pointer"
                  aria-label="Close survey"
                >
                  <CloseIcon />
                </button>

                {/* Yuvaya Logo centered at top */}
                <div className="w-full flex justify-center pt-2">
                  <YuvayaLogo className="h-10 sm:h-11 w-auto" />
                </div>

                {/* Main text area centered */}
                <div className="flex-1 flex flex-col items-center justify-center my-auto">
                  <h1 className="font-cormorant text-center text-[42px] sm:text-[48px] font-medium leading-[1.15] tracking-wide text-white drop-shadow-sm">
                    Unlock Your
                    <br />
                    Discount
                  </h1>
                  <p className="font-switzer text-[17px] sm:text-[19px] font-normal tracking-wide text-white/95 mt-5 max-w-[290px] drop-shadow-sm">
                    Take a quick quiz, enjoy 10% off
                  </p>
                  <p className="font-switzer text-[13px] sm:text-[14px] font-light text-white/80 tracking-wider mt-2">
                    (On orders of Rs 3000 & above)
                  </p>
                </div>

                {/* Bottom area */}
                <div className="flex flex-col items-center w-full pb-2">
                  <button
                    onClick={handleContinue}
                    className="w-full max-w-[260px] py-3.5 border border-white/30 bg-white/10 backdrop-blur-md text-white font-medium text-[17px] rounded-full tracking-wide hover:bg-white/20 active:scale-95 transition-all shadow-sm cursor-pointer mb-5"
                  >
                    Continue
                  </button>
                  <button
                    onClick={handleClose}
                    className="text-sm font-light text-white/80 hover:text-white tracking-wide cursor-pointer transition-colors"
                  >
                    No, thanks
                  </button>
                </div>
              </motion.div>
            )}

            {/* Steps 1..totalQuestions: Quiz Questions */}
            {currentStep >= 1 && currentStep <= totalQuestions && (
              <motion.div
                key={`question-${currentStep}`}
                custom={direction}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col h-full justify-between py-2"
              >
                {/* Question Info */}
                <div>
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mb-5">
                    <div
                      className="h-full bg-white transition-all duration-300"
                      style={{ width: `${((currentStep - 1) / totalQuestions) * 100}%` }}
                    />
                  </div>
                  <span className="text-white/60 text-xs font-semibold tracking-widest uppercase">
                    Question {currentStep} of {totalQuestions}
                  </span>
                  <h2 className="font-cormorant text-[26px] sm:text-[30px] font-medium leading-tight mt-2 text-white drop-shadow-sm">
                    {questionsList[currentStep - 1].question}
                  </h2>
                </div>

                {/* Question Options */}
                <div className="flex flex-col gap-3 my-6">
                  {questionsList[currentStep - 1].options.map((option, index) => {
                    const isSelected = answers[currentStep] === option;
                    return (
                      <button
                        key={index}
                        onClick={() => handleSelectOption(currentStep, option)}
                        className={`w-full text-left px-5 py-4 rounded-2xl transition-all duration-200 flex items-center justify-between group cursor-pointer border ${
                          isSelected
                            ? "bg-white text-[#3b5e47] border-white font-medium shadow-lg scale-[1.02]"
                            : "bg-white/10 hover:bg-white/20 text-white border-white/20 active:scale-[0.99]"
                        }`}
                      >
                        <span className="text-[15px] sm:text-base tracking-wide pr-2">
                          {option}
                        </span>

                        {/* Selector indicator */}
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                            isSelected
                              ? "bg-[#3b5e47] border-[#3b5e47] text-white"
                              : "border-white/40 group-hover:border-white"
                          }`}
                        >
                          {isSelected && <CheckIcon />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Footer details or step counters */}
                <div className="text-center text-[11px] text-white/50">
                  Select an option to automatically advance
                </div>
              </motion.div>
            )}

            {/* Step totalQuestions + 1: Name & Email Lead Collection Form */}
            {currentStep === totalQuestions + 1 && (
              <motion.div
                key="lead-form"
                custom={direction}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col h-full justify-between py-2"
              >
                <div>
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mb-5">
                    <div
                      className="h-full bg-white transition-all duration-300"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <span className="text-white/60 text-xs font-semibold tracking-widest uppercase">
                    Final Step
                  </span>
                  <h2 className="font-cormorant text-[26px] sm:text-[30px] font-medium leading-tight mt-2 text-white drop-shadow-sm">
                    Enter your details to claim your 10% off reward!
                  </h2>
                </div>

                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 my-6">
                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5 font-switzer">
                    <label className="text-xs font-semibold tracking-wider text-white/70 uppercase">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errorMsg) setErrorMsg("");
                      }}
                      placeholder="Enter your name"
                      required
                      className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 text-white placeholder-white/40 outline-none transition duration-200 focus:border-white focus:bg-white/20 focus:ring-1 focus:ring-white/30 text-[15px]"
                    />
                  </div>

                  {/* Email or Phone Input */}
                  <div className="flex flex-col gap-1.5 font-switzer">
                    <label className="text-xs font-semibold tracking-wider text-white/70 uppercase">
                      Email or Phone Number
                    </label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMsg) setErrorMsg("");
                      }}
                      placeholder="user@example.com or +91..."
                      required
                      className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 text-white placeholder-white/40 outline-none transition duration-200 focus:border-white focus:bg-white/20 focus:ring-1 focus:ring-white/30 text-[15px]"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-xs font-semibold text-[#ffd6d6] drop-shadow-sm animate-pulse">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 bg-white text-[#3b5e47] font-semibold text-[16px] rounded-2xl tracking-wide hover:bg-white/95 active:scale-95 transition-all shadow-lg cursor-pointer mt-2"
                  >
                    Claim Reward
                  </button>
                </form>

                <div className="text-center text-[10px] text-white/50">
                  By claiming your reward you agree to receive updates.
                </div>
              </motion.div>
            )}

            {/* Step totalQuestions + 2: Submitting / Loading Screen */}
            {currentStep === totalQuestions + 2 && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full text-center"
              >
                <div className="relative w-16 h-16 mb-4">
                  <div className="absolute inset-0 rounded-full border-4 border-white/20" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                </div>
                <h3 className="font-cormorant text-2xl font-light tracking-wide text-white/90">
                  Curating your reward...
                </h3>
              </motion.div>
            )}

            {/* Step totalQuestions + 3: Success / Coupon Claim Screen */}
            {currentStep === totalQuestions + 3 && (
              <motion.div
                key="reward"
                custom={direction}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col items-center justify-center h-full text-center px-4"
              >
                {/* Confetti Micro-icon */}
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-5 border border-white/20 animate-bounce">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
                    <path d="M12 2a6 6 0 0 1 6 6v3.34a2 2 0 0 1-.59 1.41L15 15H9l-2.41-2.25A2 2 0 0 1 6 11.34V8a6 6 0 0 1 6-6z" />
                  </svg>
                </div>

                <h2 className="font-cormorant text-4xl font-medium tracking-wide mb-3 text-white leading-tight">
                  All Set!
                </h2>

                <div className="my-4 font-switzer flex flex-col items-center w-full">
                  <p className="text-[17px] font-medium text-white mb-2">Thank you, {name}!</p>
                  <p className="text-sm font-light text-white/95 leading-relaxed max-w-[300px] mb-4">
                    Here is your 10% discount code. Copy it below to use at checkout:
                  </p>

                  {/* Coupon Code copy box */}
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center justify-between gap-4 px-6 py-4 bg-white text-[#3b5e47] rounded-2xl w-full max-w-[280px] shadow-lg hover:bg-white/95 active:scale-[0.98] transition-all border border-white/20 cursor-pointer"
                  >
                    <span className="text-xl font-bold tracking-widest font-mono text-[#3b5e47]">
                      YUVAYA10
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#3b5e47]/80">
                      {copied ? (
                        <>
                          <CopySuccessIcon />
                          <span className="text-[#3b5e47]">Copied!</span>
                        </>
                      ) : (
                        <>
                          <CopyIcon />
                          <span>Copy</span>
                        </>
                      )}
                    </span>
                  </button>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full max-w-[260px] py-3.5 border border-white/30 bg-white/10 backdrop-blur-md text-white font-medium text-[17px] rounded-full tracking-wide hover:bg-white/20 active:scale-95 transition-all shadow-sm cursor-pointer mt-4"
                >
                  Start Exploring
                </button>

                <p className="text-[11px] text-white/60 mt-4">
                  Offers valid on orders of Rs. 3000 & above.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OfferSection;
