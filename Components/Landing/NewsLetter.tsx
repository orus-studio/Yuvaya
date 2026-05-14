"use client";

import React, { useState } from "react";
import ZigzagSVG from "@/Components/Shared/ZigzagSVG";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up newsletter subscription
    console.log("Subscribe:", email);
    setEmail("");
  };

  return (
    <section className="box-border flex w-full flex-col items-center justify-center gap-[10px] overflow-clip bg-[#fffdf2] px-4 pt-12 pb-10 md:px-0 md:pt-[80px] md:pb-[50px]">
      <div className="relative overflow-hidden w-full border-2 border-[#26312d] rounded-3xl px-4 py-10 bg-[#26312d] flex justify-center items-center flex-col gap-8 sm:w-[85%] sm:px-5 sm:py-14 sm:gap-10 md:w-[66%] md:py-18">


        {/* Top Middle — hidden on very small screens */}
        <ZigzagSVG color="green" className="absolute z-0 hidden md:block" width={103} height={57} style={{ top: "1%", right: "66%", transform: "rotate(359deg)" }} />


        {/* ── Desktop overrides: full-size SVGs ── */}
        <ZigzagSVG color="green" className="absolute z-0 hidden md:block" width={121} height={50} style={{ top: "-4%", left: "0%", transform: "rotate(35deg)" }} />
        <ZigzagSVG color="green" className="absolute z-0 hidden md:block" width={100} height={50} style={{ top: "36%", left: "4%", transform: "rotate(140deg)" }} />
        <ZigzagSVG color="white" className="absolute z-0 hidden md:block" width={100} height={63} style={{ bottom: "19%", left: "1%", transform: "rotate(51deg)" }} />
        <ZigzagSVG color="white" className="absolute z-0 hidden md:block" width={100} height={58} style={{ bottom: "1%", left: "22%", transform: "rotate(12deg)" }} />
        <ZigzagSVG color="white" className="absolute z-0 hidden md:block" width={97} height={52} style={{ top: "5%", right: "23%", transform: "rotate(83deg)" }} />
        <ZigzagSVG color="green" className="absolute z-0 hidden md:block" width={122} height={97} style={{ top: "-4%", right: "4%", transform: "rotate(49deg)" }} />
        <ZigzagSVG color="green" className="absolute z-0 hidden md:block" width={97} height={48} style={{ top: "42%", right: "-5%", transform: "rotate(-40deg)" }} />
        <ZigzagSVG color="green" className="absolute z-0 hidden md:block" width={115} height={72} style={{ bottom: "5%", right: "7%", transform: "rotate(351deg)" }} />

        <div className="flex justify-center items-center w-full sm:w-[80%] flex-col relative z-10">
          <div className="flex flex-col justify-center items-center gap-3">
            <h2 className="font-tt-ramillas font-[600] text-[28px] leading-[1.2] tracking-[0.03em] text-[#fffdf2] text-center sm:text-[36px] md:text-[47px]">
              Subscribe to our newsletter
            </h2>
            <h2 className="font-switzer text-[14px] w-full sm:w-[80%] leading-[1.3] tracking-[0.03em] text-[#fffdf2] text-center sm:text-[15px] md:text-[16px] md:leading-[1.2]">
              Get local community event announcements, access to new product launches, tips and exclusive discounts
            </h2>
          </div>
        </div>
        <div className="w-full sm:w-[560px]">
          <form
            onSubmit={handleSubscribe}
            className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
              className="box-border h-[48px] w-full rounded-full bg-[#fffdf2] px-6 font-sans text-[14px] font-normal text-[#26312d] placeholder:text-[#999999] outline-none transition-shadow duration-200 focus:ring-2 focus:ring-[#34803c] sm:h-[56px] sm:text-[16px]"
            />
            <button
              type="submit"
              className="box-border h-[44px] w-full cursor-pointer rounded-full bg-[#34803c] px-8 font-sans text-[14px] font-semibold text-[#fffdf2] transition-all duration-200 hover:bg-[#2a6a30] active:scale-95 sm:h-[52px] sm:w-auto sm:text-[16px]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
