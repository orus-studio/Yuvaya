import HeroSection from "@/Components/Landing/HeroSection";
import ScrollingSection from "@/Components/Landing/ScrollingSection";
import MiddleBanner from "@/Components/Landing/MiddleBanner";
import ShopFromUs from "@/Components/Landing/ShopFromUs";
import LowerBanner from "@/Components/Landing/LowerBanner";
import Authorized_retailer from "@/Components/Landing/Authorized_retailer";
import BlogSection from "@/Components/Landing/BlogSection";
import AboutUs from "@/Components/Landing/AboutUs";
import FAQs from "@/Components/Landing/FAQs";
import Testimonials from "@/Components/Landing/Testimonials";
import NewsLetter from "@/Components/Landing/NewsLetter";
import VerticalInstaPost from "@/Components/Landing/VerticalInstaPost";
import InstagramReelsScroller from "@/Components/Landing/InstagramReelsScroller";
import OfferSection from "@/Components/Offer/OfferSection";
import { getLandingProducts, getBlogPosts, getSurveyQuestions } from "@/lib/shopify";

export default async function Home() {
  const [products, blogs, questions] = await Promise.all([
    getLandingProducts(),
    getBlogPosts(),
    getSurveyQuestions(),
  ]);

  return (
    <div className="w-full">
      <main className="w-full pt-20 bg-white relative flex flex-col">
        <HeroSection />
        <ScrollingSection />
        {/* <SachetSection /> */}
        <MiddleBanner />
        <ShopFromUs initialProducts={products} />
        <LowerBanner />
        <InstagramReelsScroller />
        <Testimonials />
        <FAQs />
        <Authorized_retailer />
        <NewsLetter />
        <BlogSection initialPosts={blogs} />
        <AboutUs />
        <VerticalInstaPost />
      </main>
      <OfferSection initialQuestions={questions} />
    </div>
  );
}
