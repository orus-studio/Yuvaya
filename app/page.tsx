import HeroSection from "@/Components/Landing/HeroSection";
import ScrollingSection from "@/Components/Landing/ScrollingSection";
import MiddleBanner from "@/Components/Landing/MiddleBanner";
import SachetSection from "@/Components/Landing/sachetSection";
import Navbar from "@/Components/Navbar";
import ShopFromUs from "@/Components/Landing/ShopFromUs";
import LowerBanner from "@/Components/Landing/LowerBanner";
import AboutUs from "@/Components/Landing/AboutUs";
import FAQs from "@/Components/Landing/FAQs";
import Testimonials from "@/Components/Landing/Testimonials";
import NewsLetter from "@/Components/Landing/NewsLetter";
import VerticalInstaPost from "@/Components/Landing/VerticalInstaPost";
import Footer from "@/Components/Footer";
import InstagramReelsScroller from "@/Components/Landing/InstagramReelsScroller";
import ClinicalResults from "@/Components/Landing/ClinicalResults";
import Chatbot from "@/Components/Shared/Chatbot";
import { getLandingProducts } from "@/lib/shopify";

export default async function Home() {
  const products = await getLandingProducts();

  return (
    <div className="w-full ">
      <main className="w-full  pt-20 bg-white relative flex flex-col">
        <HeroSection />
        <ScrollingSection />
        <SachetSection />
        <MiddleBanner />
        <ShopFromUs initialProducts={products} />
        <LowerBanner />
        <InstagramReelsScroller />
        <AboutUs />
        <Testimonials />
        <FAQs />
        <NewsLetter />
        <VerticalInstaPost />
      </main>
      <Chatbot />
    </div>
  );
}
