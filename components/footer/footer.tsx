"use client"
import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Github, 
  Linkedin, 
  Instagram,
  Sparkles,
  CheckCircle
} from "lucide-react";

// --- Types ---
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface SocialLink {
  icon: React.ComponentType<{ className: string }>;
  href: string;
  label: string;
}

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: React.ReactNode;
  className?: string;
  type?: 'submit' | 'button' | 'reset';
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

// --- Components ---
const Button = ({ children, className = "", type = "button", ...props }: ButtonProps) => (
  <button
    type={type}
    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ className = "", ...props }: InputProps) => (
  <input
    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 ${className}`}
    {...props}
  />
);

const Textarea = ({ className = "", ...props }: TextareaProps) => (
  <textarea
    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 resize-none ${className}`}
    {...props}
  />
);

const XIcon = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.6l-5.165-6.75-5.868 6.75h-3.308l7.732-8.835L2.882 2.25h6.6l4.759 6.318L17.25 2.25h.994zm-1.106 17.62h1.828L7.84 5.125H5.968l11.17 14.745z"/>
  </svg>
);

const ThreadsIcon = ({ className }: { className: string }) => (
  <svg
    className={className}
    viewBox="0 0 192 192"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
  </svg>
);

export function Footer() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);

  // Scroll removed to prevent jumping on load if it's a footer
  // useEffect(() => { ... }, []); 

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = (): boolean => {
    return (
      !!formData.name.trim() &&
      !!formData.email.trim() &&
      !!formData.subject.trim() &&
      !!formData.message.trim() &&
      /\S+@\S+\.\S+/.test(formData.email) &&
      formData.message.trim().length >= 10
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact-form/footer-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Submission failed.");
        return;
      }
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setIsSubmitting(false);
  };

  const socialLinks: SocialLink[] = [
    { icon: Github, href: "https://github.com/Equilibrate-AI", label: "GitHub" },
    { icon: XIcon, href: "https://x.com/EquilibrateAI", label: "X (Twitter)" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/equilibrate-ai", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/equilibrate.ai?igsh=ZmtkN2dkMDcwY3kx", label: "Instagram" },
    { icon: ThreadsIcon, href: "https://www.threads.net/@equilibrate.ai", label: "Threads" }
  ];

  return (
    // Theme Update: Main Background Color
    <footer 
      className="relative bg-[#FFFAF7] border-t border-gray-200 overflow-hidden mt-auto font-sans"
      style={{ position: 'relative', clear: 'both', minHeight: 'auto' }}
    >
      

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-12 items-center">
          {/* Left Column: Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
                  Equilibrate.AI
                </h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed max-w-md font-medium">
                Building innovative solutions for tomorrow&apos;s challenges with cutting-edge technology and exceptional service.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-black">Get in Touch</h4>
              <div className="space-y-4">
                <a href="mailto:anish.navali@equilibrateai.com" className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center group-hover:border-black transition-all">
                    <Mail className="w-5 h-5 text-black" />
                  </div>
                  <span className="text-gray-700 group-hover:text-black font-medium transition-colors">
                    anish.navali@equilibrateai.com
                  </span>
                </a>
                <a href="tel:+91-9606024155" className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center group-hover:border-black transition-all">
                    <Phone className="w-5 h-5 text-black" />
                  </div>
                  <span className="text-gray-700 group-hover:text-black font-medium transition-colors">
                    +91-9606024155
                  </span>
                </a>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center group-hover:border-black transition-all">
                    <MapPin className="w-5 h-5 text-black" />
                  </div>
                  <span className="text-gray-700 group-hover:text-black font-medium transition-colors">
                    Bangalore, Karnataka, India
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-black">Follow Us</h4>
              <div className="flex gap-3 flex-wrap">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:border-black hover:bg-black group transition-all duration-300 shadow-sm"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-black group-hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column: Form Card */}
          <motion.div
            ref={cardRef}
            // Theme Update: Card styling to rounded-[2rem], white bg, shadow-sm
            className="group bg-white rounded-[2rem] p-8 border-none shadow-sm hover:shadow-xl relative overflow-hidden transition-all"
          >
            <div className="relative z-10">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="mb-8">
                      <h4 className="text-2xl font-bold text-black mb-2 flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-black" />
                        Send us a Message
                      </h4>
                      <p className="text-gray-600 leading-relaxed font-medium">
                        We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                      </p>
                    </div>
                    
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Input
                            type="text"
                            name="name"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={handleInputChange}
                            // Theme Update: Input Styling
                            className={`bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 text-black placeholder:text-gray-400 transition-all ${
                              errors.name ? "border-red-400" : ""
                            }`}
                            required
                          />
                          {errors.name && (
                            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm">
                              {errors.name}
                            </motion.p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Input
                            type="email"
                            name="email"
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 text-black placeholder:text-gray-400 transition-all ${
                              errors.email ? "border-red-400" : ""
                            }`}
                            required
                          />
                          {errors.email && (
                            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm">
                              {errors.email}
                            </motion.p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Input
                          type="text"
                          name="subject"
                          placeholder="What's this about?"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className={`bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 text-black placeholder:text-gray-400 transition-all ${
                            errors.subject ? "border-red-400" : ""
                          }`}
                          required
                        />
                        {errors.subject && (
                          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm">
                            {errors.subject}
                          </motion.p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Textarea
                          name="message"
                          placeholder="Tell us more about your inquiry..."
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          className={`bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 text-black placeholder:text-gray-400 transition-all ${
                            errors.message ? "border-red-400" : ""
                          }`}
                          required
                        />
                        {errors.message && (
                          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm">
                            {errors.message}
                          </motion.p>
                        )}
                      </div>
                      
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="button"
                          onClick={() => {
                            handleSubmit({ preventDefault: () => {} } as FormEvent<HTMLFormElement>);
                          }}
                          disabled={!isFormValid() || isSubmitting}
                          // Theme Update: Black Button
                          className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      className="w-20 h-20 rounded-full bg-green-100 border-4 border-green-50 flex items-center justify-center mx-auto mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </motion.div>
                    <motion.h3
                      className="text-2xl font-bold text-black mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      Message Sent Successfully!
                    </motion.h3>
                    <motion.p
                      className="text-gray-600 mb-8 font-medium"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      Thank you for reaching out! We&apos;ve received your message and will get back to you within 24 hours.
                    </motion.p>
                    <motion.button
                      onClick={resetForm}
                      className="px-8 py-3 bg-white border-2 border-gray-200 rounded-xl text-black font-bold hover:border-black transition-all duration-200 shadow-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-black font-medium text-sm">
            © 2025 Equilibrate.AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
