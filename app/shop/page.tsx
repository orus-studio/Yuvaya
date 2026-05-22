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
      <ProductsPart />
      <ProductTransparency />
      <HowToUseSection />
      <FAQsForShopPage />
      <MiddleBanner />
      <StillDoubts />
      <NewsLetter />
    </div>
  );
};

export default page;

export const HowToUseSection = () => {
  const steps = [
    { number: 1, title: "Tear", description: "Tear open the sachet carefully", img: "/Shop/tear.png" },
    { number: 2, title: "Pour", description: "Pour into 200ml of water or beverage", img: "/Shop/pour.png" },
    { number: 3, title: "Shake", description: "Shake or stir well until fully dissolved", img: "/Shop/shake.png" },
    { number: 4, title: "Sip", description: "Enjoy your daily Collagreens", img: "/Shop/sip.png" },
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
                <span className="text-white font-poppins text-[10px] sm:text-[11px] md:text-[13px] font-semibold">{step.number}</span>
              </div>
            </div>
            <h3 className="font-tt-ramillas text-[16px] xs:text-[18px] sm:text-[22px] md:text-[26px] lg:text-[32px] font-semibold text-[#34803c] mb-1">{step.title}</h3>
            <p className="font-poppins text-[10px] xs:text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] text-[#666] leading-[1.4] px-1">{step.description}</p>
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
            className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"
              } w-full min-h-[280px] xs:min-h-[320px] sm:min-h-[380px] md:min-h-[450px] lg:min-h-[500px] 2xl:min-h-[600px]`}
          >
            {/* Image half */}
            <div className={`relative w-full lg:w-1/2 min-h-[200px] xs:min-h-[240px] sm:min-h-[300px] md:min-h-[380px] lg:min-h-full bg-[#f7f7f7] flex ${isEven ? "justify-end" : "justify-start"}`}>
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
              className={`w-full lg:w-1/2 flex flex-col justify-center py-6 sm:py-8 md:py-10 lg:py-12 px-4 xs:px-6 sm:px-0 ${isEven ? "lg:items-start lg:pl-10 lg:pr-16 bg-white" : "lg:items-end lg:pr-10 lg:pl-16 bg-[#fffdf2]"} items-start md:items-${isEven ? 'start' : 'end'}`}
            >
              <span className={`font-poppins text-[9px] xs:text-[10px] sm:text-[11px] lg:text-[12px] ${isEven ? "text-left" : "md:text-right text-left lg:text-right"} font-semibold uppercase tracking-widest text-[#34803c] mb-2 sm:mb-3`}>
                {String(i + 1).padStart(2, "0")} / 06
              </span>
              <h3 className={`font-tt-ramillas text-[18px] xs:text-[20px] sm:text-[24px] md:text-[30px] lg:text-[36px] ${isEven ? "text-left" : "md:text-right text-left lg:text-right"} font-semibold text-black leading-[1.15] mb-2 sm:mb-4 lg:mb-6`}>
                {row.title}
              </h3>
              <p className={`font-poppins text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] ${isEven ? "text-left" : "md:text-right text-left lg:text-right"} text-[#555] leading-[1.6] max-w-lg`}>
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
        'You shall receive communication on WhatsApp and Email after placing your order successfully on the website. Additionally, you can also check this under the my orders section account page',
    },
    {
      question: "Do I need to order from the website or somewhere else?",
      answer:
        'Currently we are only available at our own website, and are soon planning to cover different vendors as well.',
    },
    {
      question: "When will I get my order",
      answer:
        "7-10 business days (excluding weekends and public holidays). Delivery times vary depending on your location.",
    },
    {
      question: "How much does shipping cost?",
      answer:
        "There are no shipping fees unless mentioned otherwise.",
    }
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
            <a href="/reviews/write" className="w-fit mt-3 sm:mt-4 px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 bg-black text-white text-xs sm:text-sm md:text-base lg:text-base font-semibold rounded-[4px] sm:rounded-[6px] hover:bg-gray-900 transition-colors font-poppins inline-block text-center">
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