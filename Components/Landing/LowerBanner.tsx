import React from 'react'
import Image from 'next/image'

const items = [
    {
        label: "FDA Certified",
        src: "/FDALogo.png",
    },
    {
        label: "HACCP Certified",
        src: "/HACCPLogo.png",
    },
    {
        label: "Heavy-metal tested",
        src: "/MetalTested.png",
    },
    {
        label: "No Added Sugar",
        src: "/NoAddedSugar.png",
    },
    {
        label: "100% Natural",
        src: "/Natural.png",
    },
    {
        label: "No Preservatives",
        src: "/noPreservatives.png",
    },
]

const LowerBanner = () => {
    return (
        <div className="flex w-full mt-6 flex-row flex-wrap items-center justify-center gap-6 bg-[#34803c] px-4 py-4 sm:mt-8 sm:justify-evenly sm:gap-0 sm:px-[50px] sm:py-5">
            {items.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 text-[#fffdf2] sm:gap-2 max-w-[220px]">
                    <div className="relative w-8 h-8 sm:w-20 sm:h-20 flex items-center justify-center">
                        <Image
                            src={item.src}
                            alt={item.label}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="font-cormorant text-[14px] text-center font-semibold tracking-wide text-[#fffdf2] sm:text-[18px]">
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default LowerBanner