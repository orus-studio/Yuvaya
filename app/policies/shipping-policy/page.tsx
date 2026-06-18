import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy - Yuvaya",
  description: "Read Yuvaya's official Shipping Policy. Learn about our order processing, dispatch, delivery timelines, shipping charges, and delivery locations across India.",
};

const ShippingPolicy = () => {
  return (
    <main className="min-h-screen bg-[#fffdf2] pt-20">
      {/* Header Banner */}
      <header className="bg-[#26312d] py-16 md:py-24 px-4 text-center border-b border-[#014d07]/10">
        <div className="max-w-4xl mx-auto">
          <span className="font-switzer text-xs md:text-sm uppercase tracking-widest text-[#fffdf2]/60 font-medium mb-3 block">
            Fulfillment Policies
          </span>
          <h1 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-bold text-[#fffdf2] leading-tight">
            Shipping Policy
          </h1>
          <div className="w-16 h-1 bg-[#fffdf2]/30 mx-auto mt-6 rounded-full" />
        </div>
      </header>

      {/* Content Area */}
      <article className="max-w-4xl mx-auto px-6 py-16 sm:py-24 font-switzer text-[#3d3d3d] leading-relaxed text-[15px] sm:text-[17px]">
        {/* Order processing and confirmation */}
        <section className="mb-12">
          <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#26312d] mb-6 border-b border-[#26312d]/10 pb-2">
            Order Processing &amp; Confirmation
          </h2>
          <p className="mb-4 font-light">
            Once your order has been placed, we will notify you by email to confirm receipt of your order. An email on dispatch of the order will be sent to confirm acceptance of the order.
          </p>
          <p className="mb-4 font-light">
            In case of Cash on Delivery (COD) orders, an order confirmation email will be sent to you. We may confirm your COD orders via WhatsApp as well, solely for the convenience of the customer. Your order request will only be accepted once you have confirmed your order via email/mobile.
          </p>
          <p className="font-light">
            We may require verification of information prior to the acceptance and/or shipment of any order.
          </p>
        </section>

        {/* Order Dispatch */}
        <section className="mb-12">
          <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#26312d] mt-10 mb-6 border-b border-[#26312d]/10 pb-2">
            Order Dispatch
          </h2>
          <p className="mb-4 font-light">
            The product(s) will be inspected and packaged prior to handing them over to our delivery partners. Our delivery partners will bring the package to you as early as possible. In case they are unable to reach the provided address or at a suitable time, they will contact you to resolve the issue.
          </p>
          <p className="mb-4 font-light">
            We typically dispatch orders within <strong>2–3 business days</strong>, excluding weekends and public holidays. All orders qualify for free delivery unless stated otherwise. If there is a delay, we will let you know with an updated shipping timeline.
          </p>
          <p className="font-light">
            Dispatch of all the product(s) ordered may or may not happen at the same time. Some orders may be shipped in multiple shipments. This just means that we need multiple boxes to fit your order size. No separate shipping charges have to be paid on split orders.
          </p>
        </section>

        {/* Estimated delivery times & Shipping Charges */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#26312d]/5 rounded-2xl p-6 border border-[#26312d]/10">
            <h3 className="font-cormorant text-lg sm:text-xl font-semibold text-[#26312d] mb-3">
              Estimated Delivery Times
            </h3>
            <p className="font-light text-[14px] sm:text-[16px]">
              Expected delivery times may vary from the timings estimated on the website. Estimated delivery time is <strong>7–10 days</strong> from the order confirmation for metropolitan and other cities. Remote locations may require more than 7 days for order delivery.
            </p>
          </div>
          <div className="bg-[#26312d]/5 rounded-2xl p-6 border border-[#26312d]/10">
            <h3 className="font-cormorant text-lg sm:text-xl font-semibold text-[#26312d] mb-3">
              Shipping Charges
            </h3>
            <p className="font-light text-[14px] sm:text-[16px]">
              All orders qualify for <strong>free delivery</strong> across India unless explicitly stated otherwise on the checkout page. No hidden fees or extra charges apply.
            </p>
          </div>
        </section>

        {/* Important Notice Box */}
        <section className="border border-amber-200/60 bg-amber-50/40 rounded-2xl p-6 md:p-8 mb-12">
          <h2 className="font-cormorant text-xl sm:text-2xl font-bold text-amber-950 mb-3 uppercase tracking-wider">
            ⚠️ Important Delivery Notice
          </h2>
          <p className="mb-4 font-light text-amber-900 leading-relaxed">
            When your order arrives, please give it a quick check. <strong>Do not accept any delivery if the box is open or tampered with.</strong> Aqai Health / Yuvaya will not be responsible for any tampering with orders after they are accepted. If someone else is receiving the delivery for you, please let them know to do the same.
          </p>
          <p className="font-light text-amber-900 leading-relaxed">
            If anything looks off, like a missing item or a billing mismatch, please let the delivery person know right away and also record a video or take photos as evidence. Once the delivery is accepted, we will consider the order complete.
          </p>
        </section>

        {/* Delivery locations */}
        <section className="mb-12">
          <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#26312d] mt-10 mb-6 border-b border-[#26312d]/10 pb-2">
            Delivery Locations &amp; Constraints
          </h2>
          <p className="mb-4 font-light">
            We deliver across India, including remote areas. However, in the event of a crisis or unforeseen circumstances, we may temporarily suspend shipping to certain areas.
          </p>
          <p className="mb-4 font-light">
            Sometimes, delivery may take longer due to, inter alia, bad weather, flight delays, political disruptions, force majeure, logistical impediments, or any other unforeseen circumstances. If your order is affected, our customer service team will promptly reach out to you with further details and alternatives.
          </p>
          <p className="mb-4 font-light">
            <strong>Multiple Addresses:</strong> If you wish to get delivery to different addresses, you will be required to purchase the products under separate transactions and provide separate delivery addresses for each transaction.
          </p>
          <p className="font-light">
            The customer agrees that the delivery can be made to any person who is present at the shipping address provided by you at the time of delivery. We do not ship outside India at the moment.
          </p>
        </section>

        {/* Unforeseen delivery issues */}
        <section className="mb-12 bg-[#26312d]/5 rounded-2xl p-6 border border-[#26312d]/10">
          <h2 className="font-cormorant text-xl sm:text-2xl font-semibold text-[#26312d] mb-3">
            Unforeseen Delivery Issues &amp; Address Modifications
          </h2>
          <p className="mb-4 font-light">
            If you cannot receive your delivery at the mentioned shipping address and the order has not been dispatched yet, contact us at{" "}
            <a href="mailto:hello@yuvaya.in" className="text-[#34803c] font-medium hover:underline">
              hello@yuvaya.in
            </a>
            . We cannot hold, divert, or alter deliveries once they are dispatched from our facility.
          </p>
          <p className="font-light">
            In case the order is returned to us or you do not accept delivery of the product(s), the Company reserves the right to cancel the order(s) and issue a refund if the payment has already been made, without any further liability, and we shall inform you accordingly.
          </p>
        </section>
      </article>
    </main>
  );
};

export default ShippingPolicy;