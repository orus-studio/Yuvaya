import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Calendar, User } from "lucide-react";
import { getArticleByHandle, getBlogPosts } from "@/lib/shopify";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const article = await getArticleByHandle(id);
    return {
        title: article ? `${article.title} - Yuvaya` : "Article Not Found - Yuvaya",
        description: article?.excerpt || "Read the latest from Yuvaya Journal",
    };
}

export default async function BlogDetailPage({ params }: PageProps) {
    const { id } = await params;

    // Fetch article and recent articles in parallel
    const [article, allArticles] = await Promise.all([
        getArticleByHandle(id),
        getBlogPosts()
    ]);

    if (!article) {
        return (
            <main className="w-full min-h-screen bg-[#fffff7] pt-32 pb-24 px-4 flex flex-col items-center justify-center text-center">
                <h1 className="font-cormorant text-5xl md:text-6xl text-[#26312d] mb-4">
                    Story Not Found
                </h1>
                <p className="font-switzer text-gray-600 max-w-md mb-8">
                    The story you are looking for doesn't exist or has been removed. Check back later or explore other stories.
                </p>
                <Link
                    href="/"
                    className="border-2 border-[#26312d] hover:bg-[#26312d] hover:text-[#fffff7] text-[#26312d] px-8 py-3 rounded-full text-[14px] font-semibold tracking-wide transition-all duration-300 flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Journal</span>
                </Link>
            </main>
        );
    }

    // Format publication date
    const dateFormatted = new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    // Filter out the current article from the related posts list, slice to 2
    const relatedArticles = allArticles
        .filter((item) => item.id !== article.id)
        .slice(0, 2);

    return (
        <main className="w-full bg-[#fffff7] min-h-screen flex flex-col">
            {/* Dark Forest Green Hero Header */}
            <section className="w-full bg-[#26312d] px-4 sm:px-6 md:px-8 pt-30 pb-24 md:pb-32 text-white relative">
                <div className="max-w-4xl mx-auto flex flex-col">
                    {/* Back Navigation */}
                    <Link
                        href="/"
                        className="group/back flex items-center gap-2 text-[#8cb892] hover:text-[#fffc60] transition-colors duration-300 mb-8 w-fit text-sm font-semibold tracking-wider font-switzer uppercase"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover/back:-translate-x-1" />
                        <span>Back to Journal</span>
                    </Link>

                    {/* Category/Blog Title */}
                    <span className="font-switzer text-xs md:text-sm font-semibold tracking-[0.25em] text-[#8cb892] uppercase mb-4">
                        {article.blog.title}
                    </span>

                    {/* Main Title */}
                    <h1 className="font-cormorant font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] mb-6 max-w-3xl">
                        {article.title}
                    </h1>

                    {/* Meta Info: Author & Date */}
                    <div className="flex flex-wrap items-center gap-6 text-[#8cb892] text-sm font-medium font-switzer">
                        {article.authorV2?.name && (
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>By {article.authorV2.name}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{dateFormatted}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Image Section (Overlaps the dark header and cream body) */}
            {article.image && (
                <section className="w-full px-4 sm:px-6 md:px-8 -mt-16 md:-mt-24 mb-12 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="w-full rounded-[24px] sm:rounded-[32px] overflow-hidden border-4 border-[#fffff7] shadow-2xl bg-[#faf6de] flex justify-center items-center">
                            <Image
                                src={article.image.url}
                                alt={article.image.altText || article.title}
                                width={article.image.width || 1200}
                                height={article.image.height || 630}
                                priority
                                className="w-full h-auto max-h-[65vh] object-contain"
                                sizes="(max-width: 1024px) 100vw, 896px"
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Main Content Area */}
            <section className="w-full px-4 sm:px-6 md:px-8 py-8 md:py-12 flex-1">
                <div className="max-w-[760px] mx-auto">
                    {/* Article HTML Content */}
                    <article
                        className="prose-yuvaya w-full"
                        dangerouslySetInnerHTML={{ __html: article.contentHtml || article.content }}
                    />
                </div>
            </section>

            {/* Related Posts Section */}
            {relatedArticles.length > 0 && (
                <section className="w-full bg-[#26312d] px-4 sm:px-6 md:px-8 py-16 md:py-24 text-white">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex justify-between items-end mb-12 border-b border-[#8cb892]/20 pb-6">
                            <h2 className="font-cormorant text-3xl sm:text-4xl">
                                Continue <span className="italic pr-2 bg-gradient-to-r from-[#fffc60] to-[#8cb892] bg-clip-text text-transparent">Reading</span>
                            </h2>
                            <Link
                                href="/"
                                className="group/btn text-[#fffc60] hover:text-white flex items-center gap-1 font-switzer font-semibold text-sm tracking-wider uppercase transition-colors"
                            >
                                <span>Journal Home</span>
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-8 md:gap-12">
                            {relatedArticles.map((post) => {
                                const postDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                });
                                return (
                                    <Link
                                        key={post.id}
                                        href={`/blogs/${post.handle}`}
                                        className="flex flex-col justify-between group no-underline"
                                    >
                                        <div>
                                            {/* Post Date */}
                                            <p className="font-switzer text-[11px] md:text-[12px] text-[#8cb892] mb-3 font-semibold tracking-wider">
                                                {postDate}
                                            </p>

                                            {/* Post Title */}
                                            <h3 className="font-cormorant font-medium text-[20px] md:text-[24px] leading-[1.25] text-white mb-5 group-hover:text-[#fffc60] transition-colors duration-300 min-h-[50px]">
                                                {post.title}
                                            </h3>
                                        </div>

                                        {/* Post Image Container */}
                                        <div className="relative w-full aspect-[4/3] rounded-[18px] sm:rounded-[22px] overflow-hidden border border-[#8cb892]/20 shadow-lg">
                                            <Image
                                                src={post.image?.url || "/Blog/Blog_1.jpg"}
                                                alt={post.image?.altText || post.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 640px) 100vw, 400px"
                                            />

                                            {/* Floating Action Arrow */}
                                            <div className="absolute bottom-4 right-4 z-10 w-10 h-10 bg-[#fffc60] group-hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105">
                                                <ArrowUpRight className="w-5 h-5 text-[#26312d] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}