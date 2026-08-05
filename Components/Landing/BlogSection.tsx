import React from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { ShopifyArticle } from '@/lib/shopify'
import Link from 'next/link'

const BLOG_POSTS = [
    {
        id: 1,
        date: "Jan 19, 2026",
        title: "Damaged your skin barrier? This is what you need!",
        src: "/Blog/Blog_1.jpg",
        alt: "Damaged skin barrier discussion",
    },
    {
        id: 2,
        date: "Feb 23, 2026",
        title: "Do you really need a Vitamin C serum for your skin?",
        src: "/Blog/Blog_2.jpg",
        alt: "Vitamin C serum discussion",
    },
]

interface BlogSectionProps {
    initialPosts?: ShopifyArticle[]
}

const BlogSection = ({ initialPosts }: BlogSectionProps) => {
    const displayPosts = initialPosts && initialPosts.length > 0
        ? initialPosts.slice(0, 2).map((post) => ({
            id: post.id,
            date: new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
            title: post.title,
            src: post.image?.url || "/Blog/Blog_1.jpg",
            alt: post.image?.altText || post.title,
            link: `${process.env.BLOG_BASE_URL}/blogs/${post.handle}`,
        }))
        : BLOG_POSTS.map((post) => ({
            ...post,
            id: String(post.id),
            link: `${process.env.BLOG_BASE_URL}/blogs/how-can-you-increase-absorption-of-your-collagen-supplements`,
        }));

    const blogUrl = (initialPosts && initialPosts[0]?.blog?.handle)
        ? `${process.env.BLOG_BASE_URL}/blogs/${initialPosts[0].blog.handle}`
        : `${process.env.BLOG_BASE_URL}/blogs/how-can-you-increase-absorption-of-your-collagen-supplements`;

    return (
        <section className="w-full bg-[#fffff7] px-4 sm:px-6 md:px-8 py-12 md:py-20">
            <div className="max-w-[1400px] mx-auto bg-[#26312d] rounded-[24px] sm:rounded-[32px] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 lg:gap-16 justify-between items-stretch shadow-xl" id='blogs'>

                {/* Left Column - Intro and Button */}
                <div className="w-full lg:w-[35%] flex flex-col justify-between">
                    <div className="flex flex-col">
                        {/* Subtitle */}
                        <p className="font-switzer text-[11px] md:text-[12px] font-semibold tracking-[0.25em] text-[#8cb892] uppercase mb-4">
                            WHERE SCIENCE MEETS SKIN STORIES.
                        </p>

                        {/* Main Title */}
                        <h2 className="font-cormorant font-normal text-[36px] sm:text-[44px] md:text-[52px] leading-[1.15] text-white mb-8 lg:mb-0">
                            The Journal <br />
                            Skincare, <span className="italic pr-2 bg-gradient-to-r from-[#fffc60] to-[#8cb892] bg-clip-text text-transparent">Decoded</span>
                        </h2>
                    </div>

                    {/* Action Button */}
                    <Link
                        href={blogUrl}
                        rel="noopener noreferrer"
                        className="mt-8 lg:mt-auto w-fit block"
                    >
                        <button className="border-2 border-[#fffc60] hover:bg-[#fffc60] hover:text-[#26312d] text-[#fffc60] px-6 py-3 rounded-full text-[14px] font-semibold tracking-wide transition-all duration-300 w-fit cursor-pointer flex items-center gap-2 group/btn active:scale-95">
                            <span>See What Goes In</span>
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </button>
                    </Link>
                </div>

                {/* Right Column - Blog Posts */}
                <div className="w-full lg:w-[60%] flex flex-col sm:flex-row gap-8 sm:gap-6 md:gap-8">
                    {displayPosts.map((post) => (
                        <a
                            key={post.id}
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-1/2 flex flex-col group justify-between no-underline"
                        >
                            <div>
                                {/* Post Date */}
                                <p className="font-switzer text-[11px] md:text-[12px] text-[#8cb892] mb-3 font-semibold tracking-wider">
                                    {post.date}
                                </p>

                                {/* Post Title */}
                                <h3 className="font-cormorant font-medium text-[20px] md:text-[24px] lg:text-[26px] leading-[1.25] text-white mb-5 group-hover:text-[#fffc60] transition-colors duration-300 cursor-pointer min-h-[50px] sm:min-h-[60px] md:min-h-[66px]">
                                    {post.title}
                                </h3>
                            </div>

                            {/* Post Image Container */}
                            <div className="relative w-full aspect-[4/3] rounded-[18px] sm:rounded-[22px] overflow-clip cursor-pointer border border-[#8cb892]/20">
                                <Image
                                    src={post.src}
                                    alt={post.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 30vw, 400px"
                                    loading="lazy"
                                />

                                {/* Floating Action Arrow */}
                                <div className="absolute bottom-4 right-4 z-10 w-10 h-10 md:w-12 md:h-12 bg-[#fffc60] group-hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105">
                                    <ArrowUpRight className="w-5 h-5 text-[#26312d] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    )
}


export default BlogSection
