import HeroSection from "@/Components/Landing/HeroSection";
import ScrollingSection from "@/Components/Landing/ScrollingSection";
import MiddleBanner from "@/Components/Landing/MiddleBanner";
import SachetSection from "@/Components/Landing/sachetSection";
import ShopFromUs from "@/Components/Landing/ShopFromUs";
import LowerBanner from "@/Components/Landing/LowerBanner";
import AboutUs from "@/Components/Landing/AboutUs";
import FAQs from "@/Components/Landing/FAQs";
import Testimonials from "@/Components/Landing/Testimonials";
import NewsLetter from "@/Components/Landing/NewsLetter";
import VerticalInstaPost from "@/Components/Landing/VerticalInstaPost";
import InstagramReelsScroller from "@/Components/Landing/InstagramReelsScroller";
import Chatbot from "@/Components/Shared/Chatbot";
import { getLandingProducts } from "@/lib/shopify";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: PageProps) {
  const products = await getLandingProducts();
  const resolvedSearchParams = await searchParams;
  const variantParam = (resolvedSearchParams?.variant || resolvedSearchParams?.varient) as string | undefined;

  return (
    <div className="w-full ">
      <main className="w-full  pt-20 bg-white relative flex flex-col">
        <HeroSection />
        <ScrollingSection />
        <SachetSection />
        <MiddleBanner />
        <ShopFromUs initialProducts={products} initialVariantParam={variantParam} />
        <LowerBanner />
        <InstagramReelsScroller />
        <Testimonials />
        <FAQs />
        <NewsLetter />
        <AboutUs />
        <VerticalInstaPost />
      </main>
      <Chatbot />
    </div>
  );
}
