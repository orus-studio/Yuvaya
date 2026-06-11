import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Yuvaya",
  description: "Read Yuvaya's official Privacy Policy. Learn about the personal information we collect, how we process it, who we disclose it to, your rights and choices, and how we protect your data.",
};

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-[#fffdf2] pt-20">
      {/* Header Banner */}
      <header className="bg-[#26312d] py-16 md:py-24 px-4 text-center border-b border-[#014d07]/10">
        <div className="max-w-4xl mx-auto">
          <span className="font-switzer text-xs md:text-sm uppercase tracking-widest text-[#fffdf2]/60 font-medium mb-3 block">
            Data &amp; Privacy Policies
          </span>
          <h1 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-bold text-[#fffdf2] leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 font-switzer text-xs sm:text-sm text-[#fffdf2]/50">
            Last Updated: April 17, 2026
          </p>
          <div className="w-16 h-1 bg-[#fffdf2]/30 mx-auto mt-6 rounded-full" />
        </div>
      </header>

      {/* Content Area */}
      <article className="max-w-4xl mx-auto px-6 py-16 sm:py-24 font-switzer text-[#3d3d3d] leading-relaxed text-[15px] sm:text-[17px]">
        {/* Intro */}
        <section className="mb-12">
          <p className="mb-4 font-light">
            Yuvaya operates this store and website, including all related information, content, features, tools, products, and services, in order to provide you, the customer, with a curated shopping experience (the “Services”). Yuvaya is powered by Shopify, which enables us to provide the Services to you.
          </p>
          <p className="mb-4 font-light">
            This Privacy Policy describes how we collect, use, and disclose your personal information when you visit, use, or make a purchase or other transaction using the Services or otherwise communicate with us. If there is a conflict between our Terms of Service and this Privacy Policy, this Privacy Policy controls with respect to the collection, processing, and disclosure of your personal information.
          </p>
          <p className="font-light">
            Please read this Privacy Policy carefully. By using and accessing any of the Services, you acknowledge that you have read this Privacy Policy and understand the collection, use, and disclosure of your information as described in this Privacy Policy.
          </p>
        </section>

        {/* Personal Information We Collect */}
        <section className="mb-12">
          <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#26312d] mb-6 border-b border-[#26312d]/10 pb-2">
            Personal Information We Collect or Process
          </h2>
          <p className="mb-6 font-light">
            When we use the term “personal information,” we are referring to information that identifies or can reasonably be linked to you or another person. Personal information does not include information that is collected anonymously or that has been de-identified, so that it cannot identify or be reasonably linked to you.
          </p>
          <p className="mb-6 font-medium text-[#26312d]">
            We may collect or process the following categories of personal information:
          </p>

          <div className="space-y-4">
            <div className="bg-[#26312d]/5 rounded-xl p-5 border border-[#26312d]/10">
              <h3 className="font-cormorant text-lg font-semibold text-[#26312d] mb-2">
                Contact Details
              </h3>
              <p className="font-light text-[14px] sm:text-[16px]">
                Your name, physical address, billing address, shipping address, phone number, and email address.
              </p>
            </div>
            <div className="bg-[#26312d]/5 rounded-xl p-5 border border-[#26312d]/10">
              <h3 className="font-cormorant text-lg font-semibold text-[#26312d] mb-2">
                Financial Information
              </h3>
              <p className="font-light text-[14px] sm:text-[16px]">
                Payment card information, credit/debit card numbers, transaction details, billing confirmation, payment preferences, and other payment-related details.
              </p>
            </div>
            <div className="bg-[#26312d]/5 rounded-xl p-5 border border-[#26312d]/10">
              <h3 className="font-cormorant text-lg font-semibold text-[#26312d] mb-2">
                Account Information
              </h3>
              <p className="font-light text-[14px] sm:text-[16px]">
                Your username, password, security questions, shopping preferences, and account settings.
              </p>
            </div>
            <div className="bg-[#26312d]/5 rounded-xl p-5 border border-[#26312d]/10">
              <h3 className="font-cormorant text-lg font-semibold text-[#26312d] mb-2">
                Transaction Information
              </h3>
              <p className="font-light text-[14px] sm:text-[16px]">
                Items you view, put in your cart, add to your wishlist, or purchase, return, exchange, or cancel, and your transaction history.
              </p>
            </div>
            <div className="bg-[#26312d]/5 rounded-xl p-5 border border-[#26312d]/10">
              <h3 className="font-cormorant text-lg font-semibold text-[#26312d] mb-2">
                Communications
              </h3>
              <p className="font-light text-[14px] sm:text-[16px]">
                Information you include in communications with us, for example, when sending customer support inquiries or chats.
              </p>
            </div>
            <div className="bg-[#26312d]/5 rounded-xl p-5 border border-[#26312d]/10">
              <h3 className="font-cormorant text-lg font-semibold text-[#26312d] mb-2">
                Device &amp; Usage Information
              </h3>
              <p className="font-light text-[14px] sm:text-[16px]">
                Information about your device, browser, or network connection; your IP address, unique identifiers, and information regarding how and when you interact with or navigate the Services.
              </p>
            </div>
          </div>
        </section>

        {/* Sources of Info */}
        <section className="mb-12">
          <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#26312d] mt-10 mb-6 border-b border-[#26312d]/10 pb-2">
            Personal Information Sources
          </h2>
          <p className="mb-4 font-light">
            We collect personal information from the following sources:
          </p>
          <ul className="list-disc pl-6 space-y-3 font-light">
            <li>
              <strong>Directly from you:</strong> Including when you create an account, purchase products, communicate with customer support, or otherwise provide us with your data.
            </li>
            <li>
              <strong>Automatically through the Services:</strong> Collected from your device when you interact with our websites via cookies, web beacons, and similar tracking technologies.
            </li>
            <li>
              <strong>From service providers:</strong> Partners we engage to enable certain technology and process data on our behalf (e.g. payment processors, analytics tools).
            </li>
            <li>
              <strong>From partners or third parties:</strong> Advertising networks or marketing platforms that share info with us as permitted by law.
            </li>
          </ul>
        </section>

        {/* How We Use Your Personal Information */}
        <section className="mb-12">
          <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#26312d] mt-10 mb-6 border-b border-[#26312d]/10 pb-2">
            How We Use Your Personal Information
          </h2>
          <div className="space-y-6 font-light">
            <div>
              <h3 className="font-cormorant text-lg sm:text-xl font-medium text-[#26312d] mb-2">
                Provide, Tailor, and Improve the Services
              </h3>
              <p>
                We use your personal information to perform our contract with you, process payments, fulfill orders, remember your preferences, send account notifications, process transactions, facilitate shipping and returns, and customize your shopping experience (such as recommending products you might like).
              </p>
            </div>
            <div>
              <h3 className="font-cormorant text-lg sm:text-xl font-medium text-[#26312d] mb-2">
                Marketing &amp; Advertising
              </h3>
              <p>
                We use your data for marketing and promotional purposes, such as sending promotional emails or SMS and showing you relevant online advertisements on our site or other websites based on your browsing history and previous orders.
              </p>
            </div>
            <div>
              <h3 className="font-cormorant text-lg sm:text-xl font-medium text-[#26312d] mb-2">
                Security &amp; Fraud Prevention
              </h3>
              <p>
                We use your information to authenticate your account, provide secure transactions, detect and investigate fraudulent, malicious, or illegal activity, and secure our network infrastructure. We strongly advise that you keep your credentials safe and do not share them.
              </p>
            </div>
            <div>
              <h3 className="font-cormorant text-lg sm:text-xl font-medium text-[#26312d] mb-2">
                Communication &amp; Legal Compliance
              </h3>
              <p>
                We use personal details to respond to customer inquiries, maintain our business relationship, comply with applicable laws and court orders, cooperate with law enforcement agencies, and protect the rights and safety of our users and Yuvaya.
              </p>
            </div>
          </div>
        </section>

        {/* How We Disclose Personal Information */}
        <section className="mb-12">
          <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#26312d] mt-10 mb-6 border-b border-[#26312d]/10 pb-2">
            How We Disclose Personal Information
          </h2>
          <p className="mb-4 font-light">
            In certain circumstances, we may disclose your personal information to third parties for legitimate purposes, including:
          </p>
          <ul className="list-disc pl-6 space-y-3 font-light mb-6">
            <li>
              <strong>Shopify and Vendors:</strong> Disclosed to Shopify and third parties who perform services on our behalf (e.g. IT management, payment gateways, shipping companies, customer support systems).
            </li>
            <li>
              <strong>Business &amp; Marketing Partners:</strong> Partners who provide advertising services. For example, Shopify support features help deliver personalized ads on third-party channels based on store activity.
            </li>
            <li>
              <strong>By User Consent:</strong> When you request or direct us to share your details, such as integrating third-party login mechanisms or using social widgets.
            </li>
            <li>
              <strong>Corporate Affiliates:</strong> Shared within our corporate group or in connection with a corporate sale, merger, reorganization, or restructuring.
            </li>
            <li>
              <strong>Legal Compliance:</strong> To cooperate with judicial authorities, respond to valid legal claims, enforce our policies, or defend our property, safety, and rights.
            </li>
          </ul>
        </section>

        {/* Shopify Relationship */}
        <section className="mb-12 bg-[#26312d]/5 rounded-2xl p-6 border border-[#26312d]/10">
          <h2 className="font-cormorant text-xl sm:text-2xl font-semibold text-[#26312d] mb-3">
            Relationship with Shopify
          </h2>
          <p className="mb-4 font-light">
            Our store is hosted by Shopify. Shopify collects, processes, and stores personal information to facilitate transactions and improve user experience. Your information will be transmitted and stored on Shopify’s servers (which may be located outside your home country).
          </p>
          <p className="font-light">
            To improve our services, we also leverage enhanced features provided by Shopify that analyze user actions across different merchant websites. You can review the{" "}
            <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-[#34803c] font-medium hover:underline">
              Shopify Consumer Privacy Policy
            </a>{" "}
            to learn more about how Shopify manages data. You can also exercise user rights via the{" "}
            <a href="https://privacy.shopify.com" target="_blank" rel="noopener noreferrer" className="text-[#34803c] font-medium hover:underline">
              Shopify Privacy Portal
            </a>
            .
          </p>
        </section>

        {/* Security and Retention */}
        <section className="mb-12">
          <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#26312d] mt-10 mb-6 border-b border-[#26312d]/10 pb-2">
            Security &amp; Retention
          </h2>
          <p className="mb-4 font-light">
            Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee &quot;perfect security.&quot; Any data sent to us over the internet is not fully secure in transit. We recommend avoiding unsecured channels to send confidential or sensitive payment details.
          </p>
          <p className="font-light">
            We retain personal data as long as necessary to maintain active accounts, resolve disputes, satisfy audits, enforce legal agreements, comply with corporate tax laws, or fulfill order fulfillment.
          </p>
        </section>

        {/* Rights and Choices */}
        <section className="mb-12">
          <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#26312d] mt-10 mb-6 border-b border-[#26312d]/10 pb-2">
            Your Rights &amp; Choices
          </h2>
          <p className="mb-4 font-light">
            Depending on your jurisdiction, you may have legal rights regarding your personal information, including:
          </p>
          <ul className="list-disc pl-6 space-y-3 font-light mb-6">
            <li><strong>Right to Access / Know:</strong> Request copy of all personal details we hold.</li>
            <li><strong>Right to Delete:</strong> Request deletion of collected personal information.</li>
            <li><strong>Right to Correct:</strong> Request correction of incorrect or outdated records.</li>
            <li><strong>Right to Portability:</strong> Request standard transfer of data to third-party services.</li>
            <li><strong>Opt-Out of Marketing:</strong> Unsubscribe from promotional email lists via standard footer links.</li>
          </ul>
          <p className="font-light">
            We will not discriminate against you for exercising these rights. We may verify your identity before processing any request for safety purposes.
          </p>
        </section>

        {/* Contact Us block */}
        <section className="bg-[#26312d]/5 rounded-2xl p-6 border border-[#26312d]/10">
          <h2 className="font-cormorant text-xl sm:text-2xl font-semibold text-[#26312d] mb-4">
            Contact Us Regarding Privacy
          </h2>
          <p className="mb-4 font-light">
            Should you have any questions about our privacy practices, this Privacy Policy, or if you would like to exercise any of the rights available to you, please email us or reach out at:
          </p>
          <div className="space-y-2 font-light">
            <p><strong>Email:</strong> <a href="mailto:hello@yuvaya.in" className="text-[#34803c] font-medium hover:underline">hello@yuvaya.in</a></p>
            <p><strong>Grievance Office:</strong> Express Zone B Wing MALL, Western Express Highway, Goregaon East, G-236, B-wing, Ground floor, Mumbai, MH, 400063, IN</p>
          </div>
        </section>
      </article>
    </main>
  );
};

export default PrivacyPolicy;