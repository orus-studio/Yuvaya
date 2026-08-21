import type { Metadata } from "next";
import { Antic_Didone, Cormorant_Garamond, Poppins } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/Components/CartDrawer";
import MetaPixelTracker from "@/Components/Analytics/MetaPixelTracker";
import { META_PIXEL_ID } from "@/lib/pixel";

const cormorant_garamond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const anti_didone = Antic_Didone({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anti-didone",
});

const newTitle = localFont({
  src: [
    {
      path: "../public/Fonts/new-title-font-family/NewTitle-Extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/Fonts/new-title-font-family/NewTitle-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/Fonts/new-title-font-family/NewTitle-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Fonts/new-title-font-family/NewTitle-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/Fonts/new-title-font-family/NewTitle-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-new-title",
});

const ttRamillas = localFont({
  src: [
    {
      path: "../public/Fonts/TT Ramillas Trial ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/Fonts/TT Ramillas Trial Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/Fonts/TT Ramillas Trial Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Fonts/TT Ramillas Trial Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/Fonts/TT Ramillas Trial Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/Fonts/TT Ramillas Trial ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/Fonts/TT Ramillas Trial Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-tt-ramillas",
});

const switzer = localFont({
  src: [
    {
      path: "../public/Fonts/Switzer-Extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/Fonts/Switzer-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/Fonts/Switzer-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Fonts/Switzer-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/Fonts/Switzer-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/Fonts/Switzer-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/Fonts/Switzer-Extrabold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/Fonts/Switzer-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-switzer",
});

export const metadata: Metadata = {
  title: "Yuvaya",
  description: "Yuvaya a brand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant_garamond.variable} scroll-smooth ${poppins.variable} ${newTitle.variable} ${anti_didone.variable} ${ttRamillas.variable} ${switzer.variable} h-full antialiased`}
    >
      <head>
        {/* Meta Pixel Base Script */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </head>
      <body className="min-h-full scroll-smooth relative flex flex-col bg-white">
        <CartProvider>
          <Suspense fallback={null}>
            <MetaPixelTracker />
          </Suspense>
          <Navbar />
          {children}
          <CartDrawer />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
