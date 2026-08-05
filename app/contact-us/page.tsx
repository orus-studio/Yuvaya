'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, Send, CheckCircle, User, MessageSquare, PhoneCall } from 'lucide-react'
import { sendContactEmail } from '@/app/actions/sendEmail'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const [formState, setFormState] = useState<'idle' | 'redirecting' | 'success'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errorMsg) setErrorMsg('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your name.')
      return
    }
    if (!formData.email.trim()) {
      setErrorMsg('Please enter your email address.')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMsg('Please enter a valid email address.')
      return
    }
    if (!formData.message.trim()) {
      setErrorMsg('Please enter your message.')
      return
    }

    setFormState('redirecting')

    try {
      const response = await sendContactEmail(formData)
      if (response.success) {
        setFormState('success')
      } else {
        setErrorMsg(response.error || 'Failed to send message. Please try again.')
        setFormState('idle')
      }
    } catch (err) {
      console.error(err)
      setErrorMsg('An unexpected error occurred. Please try again.')
      setFormState('idle')
    }
  }

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    })
    setFormState('idle')
    setErrorMsg('')
  }

  return (
    <div className="relative min-h-screen w-full bg-[#fffdf2] pt-28 pb-20">
      {/* Decorative background blobs */}
      <div className="absolute top-1/3 left-0 -z-10 h-96 w-96 rounded-full bg-[#11731b]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-[#fffc60]/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 items-stretch">

          {/* Left Column: Form & General Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col justify-between lg:col-span-6 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-[#26312d]/5"
          >
            <div>
              <span className="font-poppins text-xs sm:text-sm font-bold uppercase tracking-wider text-[#11731b]">
                Contact Us
              </span>
              <h1 className="mt-2 font-cormorant text-[36px] sm:text-[48px] font-semibold leading-tight text-[#26312d] italic">
                Get in touch
              </h1>
              <p className="mt-3 font-switzer text-[15px] sm:text-[17px] font-light text-[#26312d]/75 leading-relaxed">
                Have a question about our Daily Greens + Collagen, need help with your order, or just want to say hello? Fill out the form or write to us directly.
              </p>

              {/* Form Container */}
              <div className="mt-8 relative">
                <AnimatePresence mode="wait">
                  {formState === 'idle' && (
                    <motion.form
                      key="contact-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      {/* Name input */}
                      <div className="relative">
                        <label className="block font-switzer text-xs font-semibold uppercase tracking-wider text-[#26312d]/60 mb-2">
                          Your Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#26312d]/40" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="User"
                            className="w-full rounded-xl border border-[#26312d]/10 bg-[#fffdf2]/40 py-3.5 pl-12 pr-4 font-switzer text-sm text-[#26312d] placeholder-[#26312d]/30 outline-none transition duration-200 focus:border-[#11731b] focus:bg-white focus:ring-2 focus:ring-[#11731b]/10"
                          />
                        </div>
                      </div>

                      {/* Email input */}
                      <div className="relative">
                        <label className="block font-switzer text-xs font-semibold uppercase tracking-wider text-[#26312d]/60 mb-2">
                          Your Email *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#26312d]/40" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="user@example.com"
                            className="w-full rounded-xl border border-[#26312d]/10 bg-[#fffdf2]/40 py-3.5 pl-12 pr-4 font-switzer text-sm text-[#26312d] placeholder-[#26312d]/30 outline-none transition duration-200 focus:border-[#11731b] focus:bg-white focus:ring-2 focus:ring-[#11731b]/10"
                          />
                        </div>
                      </div>

                      {/* Phone input */}
                      <div className="relative">
                        <label className="block font-switzer text-xs font-semibold uppercase tracking-wider text-[#26312d]/60 mb-2">
                          Phone Number (Optional)
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#26312d]/40" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 98765 43210"
                            className="w-full rounded-xl border border-[#26312d]/10 bg-[#fffdf2]/40 py-3.5 pl-12 pr-4 font-switzer text-sm text-[#26312d] placeholder-[#26312d]/30 outline-none transition duration-200 focus:border-[#11731b] focus:bg-white focus:ring-2 focus:ring-[#11731b]/10"
                          />
                        </div>
                      </div>

                      {/* Message input */}
                      <div className="relative">
                        <label className="block font-switzer text-xs font-semibold uppercase tracking-wider text-[#26312d]/60 mb-2">
                          Your Message *
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-[#26312d]/40" />
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="Tell us what you have in mind..."
                            className="w-full rounded-xl border border-[#26312d]/10 bg-[#fffdf2]/40 py-3.5 pl-12 pr-4 font-switzer text-sm text-[#26312d] placeholder-[#26312d]/30 outline-none transition duration-200 focus:border-[#11731b] focus:bg-white focus:ring-2 focus:ring-[#11731b]/10 resize-none"
                          />
                        </div>
                      </div>

                      {/* Error Message */}
                      {errorMsg && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="font-switzer text-sm font-semibold text-red-600"
                        >
                          {errorMsg}
                        </motion.p>
                      )}

                      {/* Submit Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="box-border flex h-[52px] w-full cursor-pointer flex-row items-center justify-center gap-3 rounded-full border-none bg-[#11731b] px-6 py-0 font-poppins shadow-md transition-colors hover:bg-[#26312d]"
                      >
                        <span className="text-[16px] font-semibold leading-[1.2] tracking-wider text-[#fffdf2] uppercase">
                          Send Message
                        </span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#11731b]">
                          <Send className="h-4 w-4" />
                        </div>
                      </motion.button>
                    </motion.form>
                  )}

                  {formState === 'redirecting' && (
                    <motion.div
                      key="redirecting-screen"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center justify-center text-center py-16"
                    >
                      <div className="h-12 w-12 rounded-full border-4 border-[#11731b] border-t-transparent animate-spin" />
                      <h3 className="mt-6 font-tt-ramillas text-2xl font-medium text-[#26312d]">
                        Sending your message...
                      </h3>
                      <p className="mt-2 font-switzer text-sm text-[#26312d]/70 max-w-[32ch]">
                        We are securely transmitting your message to our support team.
                      </p>
                    </motion.div>
                  )}

                  {formState === 'success' && (
                    <motion.div
                      key="success-screen"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center text-center py-12"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#11731b]/10 text-[#11731b]">
                        <CheckCircle className="h-10 w-10" />
                      </div>
                      <h3 className="mt-6 font-tt-ramillas text-2xl font-medium text-[#26312d]">
                        Message Sent!
                      </h3>
                      <p className="mt-2 font-switzer text-sm text-[#26312d]/70 max-w-[35ch]">
                        Thank you for reaching out. We have received your inquiry and will get back to you shortly.
                      </p>
                      <button
                        onClick={handleReset}
                        className="mt-8 px-6 py-2.5 rounded-full border border-[#11731b] font-poppins text-xs font-semibold uppercase tracking-wider text-[#11731b] hover:bg-[#11731b] hover:text-[#fffdf2] transition-all duration-300"
                      >
                        Submit another response
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Direct Contact info block */}
            <div className="mt-12 pt-8 border-t border-[#26312d]/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="mailto:hello@yuvaya.in"
                className="flex items-center gap-3.5 group cursor-pointer text-[#26312d] no-underline"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#11731b]/5 text-[#11731b] transition-colors group-hover:bg-[#11731b] group-hover:text-[#fffdf2]">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-switzer text-[11px] font-bold uppercase tracking-wider text-[#26312d]/40">
                    Email us
                  </span>
                  <span className="font-poppins text-sm font-semibold tracking-wide group-hover:text-[#11731b] transition-colors">
                    hello@yuvaya.in
                  </span>
                </div>
              </a>

              <a
                href="tel:+919011390116"
                className="flex items-center gap-3.5 group cursor-pointer text-[#26312d] no-underline"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#11731b]/5 text-[#11731b] transition-colors group-hover:bg-[#11731b] group-hover:text-[#fffdf2]">
                  <PhoneCall className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-switzer text-[11px] font-bold uppercase tracking-wider text-[#26312d]/40">
                    Call / WhatsApp
                  </span>
                  <span className="font-poppins text-sm font-semibold tracking-wide group-hover:text-[#11731b] transition-colors">
                    +91 9011390116
                  </span>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Premium Visual Cover */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-6 relative flex flex-col justify-end overflow-hidden rounded-3xl shadow-md min-h-[450px] lg:min-h-full border-[5px] border-[#11731b]/10 bg-white"
          >
            {/* Base Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="https://ik.imagekit.io/orus/Insta_Post_Cover/IMG_8760.webp"
                alt="Yuvaya Lifestyle Nutrition"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[4000ms] hover:scale-105"
                loading="lazy"
              />
              {/* Blur backdrop & gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#26312d]/90 via-[#26312d]/30 to-transparent" />
            </div>

            {/* Glassmorphic Overlay Text Box */}
            <div className="relative z-10 m-4 sm:m-6 p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#26312d]/60 backdrop-blur-md text-[#fffdf2] shadow-xl">
              <span className="font-poppins text-[11px] font-bold uppercase tracking-[0.2em] text-[#fffc60]">
                Our Philosophy
              </span>
              <h2 className="mt-2 font-cormorant text-[24px] sm:text-[30px] font-medium leading-snug italic">
                Biology and thoughtful formulation brought together to solve real, everyday problems.
              </h2>
              <p className="mt-3 font-switzer text-xs sm:text-sm font-light leading-relaxed text-[#fffdf2]/85">
                We believe nutrition should be accessible, enjoyable, and consistent. Inspired by simple science and care, designed for your active lifestyle.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
