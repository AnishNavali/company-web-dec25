"use client";

import React, { useState, useRef } from "react"
import Navbar from "@/components/navbar/navbar";
import {
  motion,
  useInView,
  AnimatePresence,
  Variants,
} from "framer-motion";
import { Card, CardHeader } from "@/components/ui/card";
import { CheckCircle, Zap, Globe, ArrowRight, Bot, BarChart3, Headphones } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Magnetic effect component
const MagneticZap = () => {
  return (
    <motion.div
      className="relative inline-block"
      whileHover="hover"
      variants={{
        hover: {
          scale: 1.1,
          transition: { duration: 0.3 }
        }
      }}
    >
      <motion.div
        variants={{
          hover: {
            rotate: [0, -10, 10, -5, 0],
            transition: { duration: 0.6 }
          }
        }}
      >
        {/* Theme Update: Black Icon */}
        <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-black fill-black" />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-gray-300 rounded-full blur-xl opacity-0"
        variants={{
          hover: {
            opacity: 0.4,
            scale: 1.5,
            transition: { duration: 0.3 }
          }
        }}
      />
    </motion.div>
  );
};

interface ProductSuite {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string; // Kept for icon backgrounds
  detailedDescription: string;
  stats: Array<{ label: string; value: string }>;
  whyChoose: Array<{ icon: React.ReactNode; text: string }>;
  carouselImages: Array<{ url: string; alt: string }>;
}

const productSuites: ProductSuite[] = [
  {
    id: "analytics",
    title: "Adro",
    description: "A comprehensive analytics platform for actionable insights.",
    detailedDescription:
      "Transform your data into powerful insights with our advanced analytics platform.",
    icon: <BarChart3 className="w-6 h-6" />,
    features: [
      "Real-time Data Processing",
      "Advanced Visualization",
      "Predictive Analytics",
      "Custom Dashboard Creation",
    ],
    color: "from-purple-500 to-pink-500",
    stats: [
      { label: "Self Hosted", value: "100%" },
      { label: "Support", value: "24/7" },
      { label: "Free LLM", value: "✓" },
      { label: "Device Native", value: "✓" },
    ],
    carouselImages: [
      { url: "/Adro/Adro-pic-1.png", alt: "Analytics Dashboard" },
      { url: "/Adro/Adro-pic-3.png", alt: "Data Visualization" },
      { url: "/Adro/Adro-pic-2.png", alt: "Predictive Models" },
    ],
    whyChoose: [
      { icon: <Zap className="w-4 h-4 text-black flex-shrink-0" />, text: "Easy Integration" },
      { icon: <Globe className="w-4 h-4 text-black flex-shrink-0" />, text: "Cross-Platform Compatibility" },
    ],
  },
  {
    id: "chatbot",
    title: "ChatBot JS",
    description:
      "Customizable AI chatbot designed for seamless website integration.",
    detailedDescription:
      "Enhance your website with a simple and easy-to-integrate AI assistant.",
    icon: <Bot className="w-6 h-6" />,
    features: [
      "AI Bot Integration for Websites",
      "Knowledge Base Creation",
      "Custom Prompt Templates",
      "Support for Multiple AI Models",
    ],
    color: "from-blue-500 to-cyan-500",
    stats: [
      { label: "Uptime", value: "99.9%" },
      { label: "Support", value: "24/7" },
      { label: "Integration", value: "1-Click" },
      { label: "Setup Time", value: "5 Min" },
    ],
    carouselImages: [
      { url: "/ChatBot/Chatbot pic-1.jpeg", alt: "AI Chatbot Interface" },
      { url: "/ChatBot/Chatbot pic-2.jpeg", alt: "Bot Integration" },
      { url: "/ChatBot/Chatbot pic-3.jpeg", alt: "Custom Templates" },
    ],
    whyChoose: [
      { icon: <Bot className="w-4 h-4 text-black flex-shrink-0" />, text: "No-Code Setup" },
      { icon: <CheckCircle className="w-4 h-4 text-black flex-shrink-0" />, text: "Ready-to-Use Templates" },
    ],
  },
  {
    id: "customer-service",
    title: "Customer Service",
    description:
      "Cloud-based manufacturing intelligence powered by digital forms.",
    detailedDescription:
      "Deliver exceptional customer support with our comprehensive service platform.",
    icon: <Headphones className="w-6 h-6" />,
    features: [
      "Omnichannel Support",
      "Automated Ticket Routing",
      "Performance Analytics",
      "Integration Capabilities",
    ],
    color: "from-green-500 to-emerald-500",
    stats: [
      { label: "Uptime", value: "99.9%" },
      { label: "Support", value: "24/7" },
      { label: "Languages", value: "50+" },
      { label: "Response", value: "< 2s" },
    ],
    carouselImages: [
      { url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop", alt: "Customer Service" },
      { url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop", alt: "Support Dashboard" },
      { url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop", alt: "Team Collaboration" },
    ],
    whyChoose: [
      { icon: <Headphones className="w-4 h-4 text-black flex-shrink-0" />, text: "Multi-Channel Support" },
      { icon: <ArrowRight className="w-4 h-4 text-black flex-shrink-0" />, text: "Automated Workflows" },
    ],
  },
];

// Optimized Card Component
const ProductCard = React.memo(
  ({
    suite,
    index,
    isSelected,
    onClick,
  }: {
    suite: ProductSuite;
    index: number;
    isSelected: boolean;
    onClick: () => void;
  }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: false, amount: 0.2 });

    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          ease: "easeOut",
        }}
        whileHover={{
          y: -8,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.98 }}
      >
        <Card
          className={cn(
            "cursor-pointer transition-all duration-300 overflow-hidden relative group rounded-[2rem]",
            
            isSelected
              ? "border-2 border-black shadow-xl bg-white"
              : "border-none shadow-sm hover:shadow-xl bg-white"
          )}
          onClick={onClick}
        >
          <CardHeader className="text-center relative z-10 p-6 sm:p-8">
            <motion.div
              className={cn(
                "w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-white shadow-md",
                "bg-gradient-to-r",
                suite.color
              )}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {suite.icon}
            </motion.div>

            <h3 className="text-xl sm:text-2xl font-bold mb-3 text-black">{suite.title}</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">{suite.description}</p>

            <motion.div
              className="inline-flex items-center gap-2 text-black font-bold text-sm hover:opacity-70 transition-opacity"
              whileHover={{ x: 5 }}
            >
              <span>Explore More</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>

            <AnimatePresence>
              {isSelected && (
                <motion.div
                  className="absolute top-4 right-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircle className="w-6 h-6 text-black fill-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </CardHeader>
        </Card>
      </motion.div>
    );
  }
);

ProductCard.displayName = "ProductCard";

export function ProductSecOne() {
  const [selectedSuite, setSelectedSuite] = useState<ProductSuite | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  const isHeroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const isDetailInView = useInView(detailRef, { once: false, amount: 0.2 });

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  const handleCardClick = (suite: ProductSuite) => {
    setSelectedSuite(suite);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedSuite(null);
    }
  };

  return (
    // Theme Update: Background Color
    <div className="bg-[#FFFAF7] relative overflow-hidden pt-20 sm:pt-24 md:pt-34 font-sans" onClick={handleOutsideClick}>
      
      {/* Theme Update: Decorative Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
         <div className="absolute top-10 left-0 w-full h-1 bg-gray-400"></div>
         <div className="absolute bottom-10 left-0 w-full h-1 bg-gray-400"></div>
         <div className="absolute top-0 left-10 h-full w-1 bg-gray-400"></div>
         <div className="absolute top-0 right-10 h-full w-1 bg-gray-400"></div>
      </div>

              <div className="absolute top-6 left-0 right-0 z-50 flex justify-center">
          <Navbar />
        </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="px-4 sm:px-6" ref={heroRef}>
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              className="mb-6 sm:mb-8"
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
            >
              {/* Subtitle with magnetic hover effect */}
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4"
                variants={subtitleVariants}
                whileHover="hover"
              >
                <motion.span
                  className="text-xl sm:text-2xl md:text-3xl text-gray-600 font-medium"
                  whileHover={{ color: "#000", transition: { duration: 0.3 } }}
                >
                  Power It with
                </motion.span>
                <div className="flex items-center gap-2">
                  <MagneticZap />
                  <motion.span
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-black relative"
                    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  >
                    Equilibrate.AI
                    <motion.div
                      className="absolute -bottom-1 sm:-bottom-2 left-0 h-0.5 sm:h-1 bg-black rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 2 }}
                    />
                  </motion.span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 2.5 }}
                className="mt-8 sm:mt-12"
              />
            </motion.div>
          </div>
        </section>

        {/* Product Suites Overview */}
        <section className="py-4 sm:py-6 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-black tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {["Our", "Product", "Suite"].map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-2"
                    initial={{ opacity: 0, rotateY: 90 }}
                    whileInView={{ opacity: 1, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h2>
              <p className="text-lg sm:text-xl text-gray-600 px-4 font-medium">
                Choose a product as a service to explore its capabilities and components
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16">
              {productSuites.map((suite, index) => (
                <ProductCard
                  key={suite.id}
                  suite={suite}
                  index={index}
                  isSelected={selectedSuite?.id === suite.id}
                  onClick={() => handleCardClick(suite)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Product View */}
        <section className="pb-20 sm:pb-28 px-4 sm:px-6" ref={detailRef}>
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {selectedSuite && (
                <motion.div
                  key={selectedSuite.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isDetailInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start lg:items-center"
                >
                  {/* Left Content */}
                  <div className="order-2 lg:order-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                      <div className={cn(
                          "w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md",
                          "bg-gradient-to-r",
                          selectedSuite.color
                        )}
                      >
                        {selectedSuite.icon}
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-black">
                        {selectedSuite.title}
                      </h2>
                    </div>

                    <p className="text-xl text-gray-800 mb-6 font-medium">
                      {selectedSuite.description}
                    </p>

                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      {selectedSuite.detailedDescription}
                    </p>

                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4 text-black">
                        Key Features:
                      </h3>
                      <motion.ul className="space-y-3">
                        {selectedSuite.features.map((feature, index) => (
                          <motion.li key={index} className="flex items-start gap-3 text-gray-700">
                            <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                            <span className="text-lg">{feature}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4 text-black">
                        Why Choose {selectedSuite.title}?
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedSuite.whyChoose.map((item, i) => (
                           <div key={i} className="flex items-center gap-3 text-gray-700">
                              {/* Clone element to ensure icon styling consistency if needed */}
                              <div className="text-black">{item.icon}</div>
                              <span className="font-medium">{item.text}</span>
                           </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Content - Carousel Card */}
                  <div className="relative order-1 lg:order-2">
                    {/* Theme Update: Card Styling */}
                    <Card className="p-6 sm:p-8 border-none rounded-[2rem] overflow-hidden shadow-xl bg-white">
                      <Carousel className="w-full">
                        <CarouselContent>
                          {selectedSuite.carouselImages.map((image, index) => (
                            <CarouselItem key={index}>
                              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100">
                                <Image
                                  width={800}
                                  height={600}
                                  src={image.url}
                                  alt={image.alt}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                                  <p className="text-white font-semibold text-lg">
                                    {image.alt}
                                  </p>
                                </div>
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                          <CarouselPrevious className="bg-white/90 border-none text-black hover:bg-white" />
                        </div>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                          <CarouselNext className="bg-white/90 border-none text-black hover:bg-white" />
                        </div>
                      </Carousel>
                      
                      <div className="mt-8 pt-6 border-t border-gray-100">
                        <h3 className="text-2xl font-bold mb-2 text-black">
                          {selectedSuite.title} Stats
                        </h3>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                          {selectedSuite.stats.map((stat, index) => (
                            <div
                              key={index}
                              className="p-4 bg-gray-50 rounded-xl border border-transparent hover:border-gray-200 transition-colors"
                            >
                              <div className="font-bold text-xl text-black">
                                {stat.value}
                              </div>
                              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
}
