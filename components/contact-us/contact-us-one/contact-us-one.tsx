"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  User,
  Mail,
  Building,
  MessageSquare,
  Send,
  ArrowRight,
  CheckCircle,
  Phone,
  Briefcase,
} from "lucide-react";
import { Globe } from "@/components/ui/globe";
import Navbar from "@/components/navbar/navbar";

// --- Contact Section One (Hero) ---
export const ContactSecOne = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section className="relative pt-32 pb-12 overflow-hidden px-4 z-10">
      <div className="container mx-auto text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow overflow-hidden leading-tight text-black tracking-tight"
          >
            {"Get in Touch".split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-3 mb-2"
                initial={{ opacity: 0, rotateY: 90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{
                  y: -3,
                  transition: { duration: 0.2 },
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-2 font-medium"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Ready to transform your business? Let us start a conversation about your goals and how we can help you achieve them.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

interface FormData {
  name: string;
  email: string;
  company: string;
  designation: string;
  phone: string;
  message: string;
}

export function ContactSecTwo() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    designation: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.23, 0.86, 0.39, 0.96] },
    },
  };

  const handleInputChange = (field: keyof FormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () =>
    formData.name.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.message.trim() &&
    /\S+@\S+\.\S+/.test(formData.email) &&
    /^\+?[\d\s-()]+$/.test(formData.phone) &&
    formData.message.trim().length >= 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      // Updated fetch URL to match your API route
      const res = await fetch("/api/contact-form/contact-us-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Submission failed");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pb-20 px-4 relative z-10 overflow-hidden pt-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-12 text-center max-w-2xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <p className="text-gray-600 text-lg">
            Tell us about yourself and we&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT COLUMN - FORM */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Name */}
                  <div>
                    <label className="text-black font-medium mb-2 block ml-1">Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`w-full pl-11 pr-4 py-4 bg-gray-50 border rounded-xl text-black placeholder-gray-400 focus:outline-none focus:bg-white focus:border-gray-300 transition-all duration-200 ${
                          errors.name ? "border-red-400" : "border-transparent"
                        }`}
                      />
                    </div>
                    {errors.name && <p className="text-red-400 text-sm mt-2 ml-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-black font-medium mb-2 block ml-1">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`w-full pl-11 pr-4 py-4 bg-gray-50 border rounded-xl text-black placeholder-gray-400 focus:outline-none focus:bg-white focus:border-gray-300 transition-all duration-200 ${
                          errors.email ? "border-red-400" : "border-transparent"
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-red-400 text-sm mt-2 ml-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-black font-medium mb-2 block ml-1">Phone *</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={`w-full pl-11 pr-4 py-4 bg-gray-50 border rounded-xl text-black placeholder-gray-400 focus:outline-none focus:bg-white focus:border-gray-300 transition-all duration-200 ${
                          errors.phone ? "border-red-400" : "border-transparent"
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-400 text-sm mt-2 ml-1">{errors.phone}</p>}
                  </div>

                  {/* Company */}
                  <div>
                    <label className="text-black font-medium mb-2 block ml-1">Company</label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-transparent rounded-xl text-black placeholder-gray-400 focus:outline-none focus:bg-white focus:border-gray-300 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Designation */}
                  <div>
                     <label className="text-black font-medium mb-2 block ml-1">Designation</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={formData.designation}
                        onChange={(e) => handleInputChange("designation", e.target.value)}
                        className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-transparent rounded-xl text-black placeholder-gray-400 focus:outline-none focus:bg-white focus:border-gray-300 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-black font-medium mb-2 block ml-1">Message *</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                      <textarea
                        placeholder="How can we help you?"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className={`w-full pl-11 pr-4 py-4 bg-gray-50 border rounded-xl text-black placeholder-gray-400 focus:outline-none focus:bg-white focus:border-gray-300 resize-none transition-all duration-200 ${
                          errors.message ? "border-red-400" : "border-transparent"
                        }`}
                      />
                    </div>
                    {errors.message && <p className="text-red-400 text-sm mt-2 ml-1">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={!isFormValid() || isSubmitting}
                    className="w-full relative group overflow-hidden bg-black text-white font-bold py-5 px-8 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:bg-gray-900"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative flex items-center justify-center gap-3 text-lg">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Send Message
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.form>
              ) : (
                <div className="text-center py-16">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-black mb-4">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-8 text-lg">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "", email: "", company: "", designation: "", phone: "", message: "",
                      });
                      setErrors({});
                    }}
                    className="px-8 py-4 bg-white border-2 border-gray-200 rounded-xl text-black font-medium hover:bg-gray-50 hover:border-black transition-all duration-200"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* RIGHT COLUMN - GLOBE CARD */}
          <motion.div
            className="hidden lg:flex items-center justify-center sticky top-24"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="w-full max-w-[500px]">
              <div className="relative bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-70" />

                {/* Globe */}
                <div className="relative w-full h-[500px] flex items-center justify-center p-6">
                  <Globe className="w-full h-full" />
                </div>

                {/* Footer Info */}
                <div className="relative border-t border-gray-100 px-8 py-6 bg-white/90 backdrop-blur-sm flex flex-col items-center text-center">
                  <p className="text-black font-bold text-lg flex items-center gap-2 mb-1">
                    📍 Bangalore, Karnataka, India
                  </p>
                  <p className="text-gray-500 text-sm">Global Headquarters</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- Main Page Component ---

export default function ContactCombo() {
  return (
    <div className="bg-[#FFFAF7] min-h-screen relative overflow-x-hidden font-sans">
      
      {/* Theme Decorative Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
         <div className="absolute top-10 left-0 w-full h-1 bg-gray-400"></div>
         <div className="absolute bottom-10 left-0 w-full h-1 bg-gray-400"></div>
         <div className="absolute top-0 left-10 h-full w-1 bg-gray-400"></div>
         <div className="absolute top-0 right-10 h-full w-1 bg-gray-400"></div>
      </div>

      <div className="absolute top-8 left-0 right-0 z-50 flex justify-center">
          <Navbar />
      </div>

      <ContactSecOne />
      <ContactSecTwo />
    </div>
  );
}
