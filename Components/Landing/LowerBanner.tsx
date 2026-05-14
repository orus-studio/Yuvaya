import React from 'react'
import { Stethoscope, Award, TestTube, Slash, Leaf, Droplet, Microscope } from 'lucide-react'

const items = [
    {
        label: "Clinically Proven",
        icon: <Stethoscope size={44} strokeWidth={1.5} />,
    },
    {
        label: "NSF Certified",
        icon: <Award size={44} strokeWidth={1.5} />,
    },
    {
        label: "Mercury-free",
        icon: <Droplet size={44} strokeWidth={1.5} />,
    },
    {
        label: "Heavy-metal tested",
        icon: <Microscope size={44} strokeWidth={1.5} />,
    },
    {
        label: "No Added Sugar",
        icon: <Slash size={44} strokeWidth={1.5} />,
    },
    {
        label: "No Preservatives",
        icon: <Leaf size={44} strokeWidth={1.5} />,
    },
]

const LowerBanner = () => {
    return (
        <div className="flex w-full mt-6 flex-row flex-wrap items-center justify-center gap-6 bg-[#34803c] px-4 py-4 sm:mt-8 sm:justify-evenly sm:gap-0 sm:px-[50px] sm:py-5">
            {items.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 text-[#fffdf2] sm:gap-2 max-w-[220px]">
                    <div className="w-8 h-8 sm:w-11 sm:h-11 flex items-center justify-center text-[#fffdf2]">
                        {item.icon}
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