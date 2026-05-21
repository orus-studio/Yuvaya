import React from 'react'

const cards = [
    {
        title: "Our Vision",
        body: `We aim to innovate nutrition with intention. Our vision is to build an evolving range of products that bring biology and thoughtful formulation together to solve real, everyday problems. We only create when there is a genuine need and never just to follow trends. As we grow, we aim to expand this vision and create solutions that seamlessly fit into your life and make a real difference. We believe nutrition should be accessible, enjoyable, and easy to stay consistent with, using quality sourcing, research, and modern formats to make wellness a natural part of your day.`,
    },
    {
        title: "Our Story",
        body: `Yuvaya is a family-run affair, rooted in care and curiosity. Our recipes are backed by science but inspired by our mom's way of making nutrition feel simple, enjoyable, and consistent in everyday life. She showed us that good nutrition doesn't have to feel like a task or something difficult to maintain over time. That belief continues to shape everything we build today, creating solutions that are functional, easy to adopt, and designed for busy lifestyles.\nWhat started at home now helps others improve their health without disrupting routines.`,
    },
    {
        title: "Our Science",
        body: `To build with intention, we begin by understanding the biology behind what we're solving and the real needs people experience daily. This helps us identify meaningful gaps, from gut health to skin support and overall wellness, and innovate with clarity and purpose. We don't follow trends or chase popular claims; instead, we focus on building formulations that are effective, thoughtfully sourced, and easy to use consistently. Every step is carefully considered to deliver real results without unnecessary complexity in your routine.`,
    },
]

const AboutUs = () => {
    return (
        /* Parent div: w-100%, h-763px, flex-col, justify-end, padding 40px 0 60px 0, gap 30px */
        <section id='about' className="box-border flex rounded-3xl mt-3 min-h-screen w-full flex-col items-center justify-end gap-6 overflow-clip bg-[#26312d] px-4 pt-10 pb-10 sm:gap-8 sm:px-8 md:gap-[30px] md:px-0 md:pt-[40px] md:pb-[60px]">
            {/* About Us heading */}
            <h2 className="z-[1] mt-3 whitespace-pre font-cormorant text-[36px] font-semibold leading-[1.2] tracking-[0.01em] text-[#fffdf2] sm:mt-10 sm:text-[48px] md:text-[64px]">
                About us
            </h2>

            {/* Cards row */}
            <div className="flex w-full flex-1 flex-col items-stretch justify-center gap-4 px-4 sm:flex-row sm:gap-6 sm:px-6 md:flex-row md:items-stretch md:justify-center md:gap-[30px] md:px-[60px]">
                {cards.map((card, i) => (
                    /* Card */
                    <div
                        key={i}
                        className="box-border flex flex-1 flex-col items-center justify-start gap-[10px] overflow-clip rounded-2xl border-[4px] border-[#014d07] bg-[#fffff7] text-black p-4 sm:rounded-[20px] sm:p-5 md:p-[30px]"
                    >
                        {/* Card title */}
                        <h3 className="whitespace-pre font-cormorant text-[32px] font-black leading-[1.2] tracking-[0.04em] text-black sm:text-[28px] md:text-[35px]">
                            {card.title}
                        </h3>

                        {/* Card body */}
                        <p className="w-full break-words whitespace-pre-wrap text-center font-switzer  text-[14px]  mt-2 leading-[1.3] tracking-[0.04em] text-black sm:mt-3 sm:text-[17px] sm:leading-[1.2] md:text-[22px]">
                            {card.body}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default AboutUs