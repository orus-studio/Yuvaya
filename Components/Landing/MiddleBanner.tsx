import React from "react";
import Image from "next/image";

const MiddleBanner = () => {
    return (
        <div className="relative box-border flex min-h-[300px] w-full flex-col items-center justify-center gap-6 overflow-clip px-4 py-10 sm:gap-8 sm:px-8 sm:py-12 md:gap-[34px] md:px-[50px] md:py-16">
            {/* Background Image mapped via Next/Image for optimization mapping to public/Landing/MiddleBannerBG.jpeg */}
            <Image
                src="/Landing/MiddleBannerBG.jpeg"
                alt="Middle Banner Background"
                fill
                className="object-cover object-center blur-sm z-0"
            />
            <div className="absolute inset-0 z-10 bg-black/30" />

            {/* Heading Block explicitly matching CSS */}
            <div className="flex w-full justify-center z-10 items-center">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="font-cormorant gap-2 bg-gradient-to-r from-green-300 via-green-200 to-green-100 bg-clip-text text-transparent pb-1 pr-1 text-center text-[32px] font-base leading-[1.1] tracking-[-0.03em] text-[#fffdf2] sm:text-[48px] md:text-[70px]">
                        Daily Greens with <span className="italic"> Collagen </span>
                    </h1>
                    <span className="flex text-center font-switzer font-medium text-sm sm:text-lg md:text-2xl pt-2 flex-col">
                        <h2 className="text-white">
                            Your greens don't have to bitter
                        </h2>
                        <h2 className="text-stone-300">
                            But ours is a tropical delight!
                        </h2>
                    </span>
                    <a
                        href="/#shop"
                        className="box-border flex h-[48px] w-[180px] flex-row items-center justify-end gap-3 overflow-clip mt-6 sm:mt-8 sm:h-[54px] sm:w-[200px] md:mt-10 md:h-[60px] md:w-[214px] rounded-full border-none bg-white pr-1 pl-4 py-0 font-poppins cursor-pointer hover:bg-white/90 transition-colors duration-200"
                    >
                        <span className="whitespace-pre text-[18px] font-medium leading-[1.2] tracking-normal text-black sm:text-[21px] md:text-[24px]">Shop Now</span>
                        <div className="flex h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 items-center justify-center rounded-full text-[#26312D] bg-white shrink-0 transition-colors duration-200">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-[22px] sm:h-[22px] md:w-[24px] md:h-[24px]">
                                <path d="M5 12H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MiddleBanner;