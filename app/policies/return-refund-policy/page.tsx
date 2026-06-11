import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Refund Policy - Yuvaya",
  description: "Read Yuvaya's official Return, Refund, and Cancellation Policy. Understand our policies on non-refundable consumable wellness supplements, replacements for damaged items, and refund processing.",
};

const ReturnRefundPolicy = () => {
  return (
    <main className="min-h-screen bg-[#fffdf2] pt-20">
      {/* Header Banner */}
      <header className="bg-[#26312d] py-16 md:py-24 px-4 text-center border-b border-[#014d07]/10">
        <div className="max-w-4xl mx-auto">
          <span className="font-switzer text-xs md:text-sm uppercase tracking-widest text-[#fffdf2]/60 font-medium mb-3 block">
            Fulfillment Policies
          </span>
          <h1 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-bold text-[#fffdf2] leading-tight">
            Return &amp; Refund Policy
          </h1>
          <div className="w-16 h-1 bg-[#fffdf2]/30 mx-auto mt-6 rounded-full" />
        </div>
      </header>

      {/* Content Area */}
      <article className="max-w-4xl mx-auto px-6 py-16 sm:py-24 font-switzer text-[#3d3d3d] leading-relaxed text-[15px] sm:text-[17px]">
        {/* Core Return Policy */}
        <section className="mb-12">
          <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#26312d] mb-6 border-b border-[#26312d]/10 pb-2">
            General Policy
          </h2>
          <p className="mb-4 font-light">
            Orders placed on{" "}
            <a href="https://www.shopyuvaya.com" target="_blank" rel="noopener noreferrer" className="text-[#34803c] font-medium hover:underline">
              www.shopyuvaya.com
            </a>{" "}
            are <strong>non-returnable and non-refundable</strong> once purchased and delivered.
          </p>
          <p className="mb-4 font-light">
            As our products are consumable wellness supplements intended for personal health use, we do not accept returns of opened, used, or consumed products under any circumstances.
          </p>
          <p className="font-light">
            Returns will not be accepted if the product has been used, the seal has been broken, or the serial number has been tampered with. On receipt of any returned product, Yuvaya will proceed to inspect the item and validate the claim before deciding on any further action.
          </p>
        </section>

        {/* Damaged or Defective Products */}
        <section className="mb-12">
          <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#26312d] mt-10 mb-6 border-b border-[#26312d]/10 pb-2">
            Damaged or Defective Products
          </h2>
          <p className="mb-6 font-light">
            We are committed to delivering products in perfect condition. If your order arrives damaged, an incorrect product has been shipped, or a product is defective due to transit issues, we offer a <strong>full replacement</strong> subject to the following conditions:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            {/* Eligibility Criteria */}
            <div className="bg-[#26312d]/5 rounded-2xl p-6 border border-[#26312d]/10">
              <h3 className="font-cormorant text-lg sm:text-xl font-semibold text-[#26312d] mb-4 uppercase tracking-wider">
                Eligibility Criteria
              </h3>
              <ul className="list-disc pl-5 space-y-3 font-light text-[14px] sm:text-[16px]">
                <li>Damage or defect must be reported within <strong>12 hours</strong> of delivery.</li>
                <li>Original packaging, seals, and products must be intact and unused.</li>
                <li>Clear photos or video evidence of the damage/defect must be provided.</li>
                <li>Damage must be clearly attributable to shipping and handling, not misuse or tampering.</li>
              </ul>
            </div>

            {/* Replacement Process */}
            <div className="bg-[#26312d]/5 rounded-2xl p-6 border border-[#26312d]/10">
              <h3 className="font-cormorant text-lg sm:text-xl font-semibold text-[#26312d] mb-4 uppercase tracking-wider">
                Replacement Process
              </h3>
              <ul className="list-decimal pl-5 space-y-3 font-light text-[14px] sm:text-[16px]">
                <li>
                  Contact our customer care team at{" "}
                  <a href="mailto:aqaihealth@gmail.com" className="text-[#34803c] font-medium hover:underline">aqaihealth@gmail.com</a> or call{" "}
                  <a href="tel:+919011390116" className="text-[#34803c] font-medium hover:underline">+91 9011390116</a> immediately.
                </li>
                <li>Provide your order number and clear photos/videos showing the damaged product and packaging.</li>
                <li>Our team will validate the claim and approve the replacement within 2–3 business days.</li>
                <li>Approved replacements will be dispatched at no additional cost to you.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Returns Assessment */}
        <section className="mb-12">
          <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#26312d] mt-10 mb-6 border-b border-[#26312d]/10 pb-2">
            Returns Assessment &amp; Refunds
          </h2>
          <p className="mb-4 font-light">
            All return requests will be evaluated on a case-by-case basis. If a return is approved (at our sole discretion), the final refund amount will account for both original shipping charges and reverse pickup costs, which will be deducted from the refund value.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="border border-[#26312d]/10 bg-[#26312d]/5 rounded-2xl p-6">
              <h3 className="font-cormorant text-lg font-semibold text-[#26312d] mb-2">
                Online Payments
              </h3>
              <p className="font-light text-[14px] sm:text-[15px]">
                We will refund the amount back to the original payment source (debit/credit card, bank, wallet, UPI) within <strong>7 working days</strong> of receiving and validating the request.
              </p>
            </div>
            <div className="border border-[#26312d]/10 bg-[#26312d]/5 rounded-2xl p-6">
              <h3 className="font-cormorant text-lg font-semibold text-[#26312d] mb-2">
                COD Payments
              </h3>
              <p className="font-light text-[14px] sm:text-[15px]">
                Refunds will be processed to your verified bank account within <strong>14 working days</strong> of receiving the required bank details and validating the return request.
              </p>
            </div>
          </div>
        </section>

        {/* Shipping & Delivery Returns Info */}
        <section className="mb-12 bg-[#26312d]/5 rounded-2xl p-6 border border-[#26312d]/10">
          <h2 className="font-cormorant text-xl sm:text-2xl font-semibold text-[#26312d] mb-3">
            Shipping &amp; Delivery Delays
          </h2>
          <p className="font-light">
            Our top priority is to provide the smoothest service and the fastest delivery. Due to unforeseen circumstances, there can be issues that delay the process of shipping, which can cause an indefinite delay. Our support team will contact you in such instances and keep you updated with the progress.
          </p>
        </section>
      </article>
    </main>
  );
};

export default ReturnRefundPolicy;