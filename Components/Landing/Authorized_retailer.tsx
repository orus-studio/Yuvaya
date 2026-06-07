import React from 'react'
import Image from 'next/image'

const RETAILERS = [
  {
    name: "Amazon",
    src: "/Authorized_Retailers/Amazon_logo.svg.webp",
    alt: "Amazon Logo",
  },
  {
    name: "Blinkit",
    src: "/Authorized_Retailers/blinkit-logo.png",
    alt: "Blinkit Logo",
  },
  {
    name: "Flipkart",
    src: "/Authorized_Retailers/flipkart_logo.png",
    alt: "Flipkart Logo",
  },
  {
    name: "Myntra",
    src: "/Authorized_Retailers/myntra_logo.png",
    alt: "Myntra Logo",
  },
]

const Authorized_retailer = () => {
  return (
    <section className="w-full bg-[#fffff7] py-16 md:py-24 flex flex-col items-center justify-center border-t border-[#34803c]/5">
      <div className="max-w-7xl flex justify-center items-center flex-col mx-auto px-6 text-center w-full">
        {/* Subtitle */}
        <div className="box-border  h-[28px] min-w-min flex-col items-center justify-center overflow-clip rounded-full bg-[#26312d] px-3">
          <span className="whitespace-pre text-[11px] font-semibold uppercase tracking-wider text-[#fffdf2]">
            Authorized Retailers
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="font-cormorant font-normal text-[36px] md:text-[48px] lg:text-[56px] leading-[1.2] text-[#26312d] mb-12 md:mb-18">
          We&apos;re also available at
        </h2>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-[1000px] mx-auto px-4 justify-items-center">
          {RETAILERS.map((retailer) => (
            <div
              key={retailer.name}
              className="group relative w-full h-[65px] sm:h-[80px] md:h-[95px] max-w-[220px] rounded-2xl shadow-[0_4px_10px_rgba(0,0,0,0.02)] flex items-center justify-center p-4 sm:p-5 md:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_rgba(52,128,60,0.08)] hover:border-[#34803c]/35 active:scale-[0.98] cursor-pointer"
            >
              <div className="relative w-44 h-full  transition-all duration-300">
                <Image
                  src={retailer.src}
                  alt={retailer.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 110px, (max-width: 768px) 130px, 150px"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Authorized_retailer