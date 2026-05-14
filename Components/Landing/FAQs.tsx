"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const faqs = [
  {
    question: "Is Yuvaya collagen chemical free?",
    answer:
      "We focus on clean, thoughtfully formulated products without unnecessary fillers or additives. Our blends are designed to enhance taste and effectiveness while avoiding anything that doesn't add real value to your nutrition.",
  },
  {
    question: "How will I know that my order is confirmed?",
    answer:
      'Once your order is placed, you\'ll receive confirmation via WhatsApp and email. You can also track your order anytime through the "My Orders" section on the website.',
  },
  {
    question: "When will I get my order?",
    answer:
      "Orders are typically delivered within 7–10 business days, depending on your location (excluding weekends and public holidays).",
  },
  {
    question: "Do your products contain biotin?",
    answer:
      "Our formulations may include supportive nutrients like biotin depending on the product, but always in balanced amounts that work alongside collagen and overall formulation goals. For exact details, we recommend checking the ingredient label.",
  },
  {
    question: "What results can I expect?",
    answer:
      "Our products are designed to support gut health, which in turn supports skin and overall wellness. With consistent use, you may notice improvements in how you feel and look over time.",
  },
  {
    question: "How do I consume it?",
    answer:
      "Simply mix one sachet with water and consume. It's designed to be quick, convenient, and easy to fit into your daily routine.",
  },
  {
    question: "Does it taste like typical collagen?",
    answer:
      "No. Our formulation is designed to eliminate the usual fishy taste and smell associated with collagen, making it much more enjoyable to consume regularly.",
  },
  {
    question: "Is this vegetarian or non-vegetarian?",
    answer:
      "Collagen is typically animal-derived, so this product is non vegetarian. We recommend checking product details if you have dietary preferences.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="box-border flex min-h-min w-full flex-col items-center justify-center gap-8 overflow-clip bg-[#fffdf2] px-4 pt-8 pb-10 md:gap-12.5 md:px-0 md:pt-10 md:pb-15">
      <div className="flex justify-center items-center flex-col gap-2">
        {/* FAQs badge */}
        <div className="box-border flex h-[28px] min-w-min flex-col items-center justify-center overflow-clip rounded-full bg-[#26312d] px-3">
          <span className="whitespace-pre text-[11px] font-semibold uppercase tracking-wider text-[#fffdf2]">
            FAQs
          </span>
        </div>

        {/* Heading */}
        <h2 className="whitespace-pre text-center font-tt-ramillas text-[24px] font-[400] leading-[1.1] tracking-[0.03em] text-[#000000] md:text-[40px] md:leading-[1]">
          Frequently asked questions
        </h2>
      </div>
      {/* Accordion container */}
      <div className="flex w-full flex-col items-center justify-start gap-2 rounded-2xl border-[3px] border-[#26312d] bg-[#26312d] p-[2px] md:max-w-[950px] md:gap-3">
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
                className="box-border flex min-h-[48px] w-full cursor-pointer flex-row items-center justify-between gap-3 px-4 text-left md:h-[56px] md:px-[18px]"
              >
                <span className="flex-1 whitespace-pre-wrap font-sans text-[15px] font-medium leading-[1.4] text-[#000000] md:text-[18px]">
                  {faq.question}
                </span>
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#26312d] md:h-7 md:w-7">
                  <div className="relative flex items-center justify-center">
                    {/* Horizontal line (always visible) */}
                    <div className="h-[2px] w-[14px] rounded-full bg-[#fffdf2] md:h-[3px] md:w-[18px]" />
                    {/* Vertical line (rotates and merges into horizontal to form minus) */}
                    <motion.div
                      className="absolute h-[14px] w-[2px] rounded-full bg-[#fffdf2] md:h-[18px] md:w-[3px]"
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
                    <div className="box-border flex w-full flex-col items-center justify-start gap-2 px-4 pb-3 pt-0 md:gap-3 md:px-[18px] md:pb-4">
                      {/* Separator between question and answer */}
                      <div className="h-px w-full bg-gray-400" />
                      <p className="w-full whitespace-pre-wrap text-left font-sans text-[13px] font-normal leading-[1.5] text-[#444444] md:text-[14px]">
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

export default FAQs;
