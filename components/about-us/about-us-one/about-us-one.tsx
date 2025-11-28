"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Users, Calendar, MapPin } from "lucide-react";
import Navbar from "@/components/navbar/navbar";

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string;
  index: number;
}> = ({ icon, title, value, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  const squares = Array.from({ length: 5 }, () => [
    Math.floor(Math.random() * 4) + 7,
    Math.floor(Math.random() * 6) + 1,
  ]);

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
      className="group bg-white rounded-[2rem] border-none shadow-sm hover:shadow-lg relative overflow-hidden transition-all h-full"
    >
      <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)] opacity-60">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/5 to-gray-900/0 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
          <svg className="absolute inset-0 h-full w-full mix-blend-multiply" aria-hidden="true">
            <defs>
              <pattern id={`grid-${index}`} width="20" height="20" patternUnits="userSpaceOnUse" x="-12" y="4">
                <path d="M.5 20V.5H20" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-200" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#grid-${index})`} />
            <svg x="-12" y="4" className="overflow-visible">
              {squares.map(([x, y], i) => (
                <rect
                  key={i}
                  strokeWidth="0"
                  width="21"
                  height="21"
                  x={x * 20}
                  y={y * 20}
                  fill="currentColor"
                  className="text-gray-100"
                />
              ))}
            </svg>
          </svg>
        </div>
      </div>

      <div className="relative z-10 p-8 text-center flex flex-col items-center justify-center h-full">
        <div className="mb-4 p-3 bg-gray-50 rounded-2xl group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <h3 className="font-bold text-lg mb-2 text-black">{title}</h3>
        <p className="text-gray-600 font-medium">{value}</p>
      </div>
    </motion.div>
  );
};

interface AboutSectionProps {
  companyName?: string;
  tagline?: string;
  description?: string;
  foundedYear?: string;
  headquarters?: string;
  specialization?: string;
  story?: string;
}

export const AboutSectionOne: React.FC<AboutSectionProps> = ({
  companyName = "Equilibrate",
  tagline = "Making AI practical for the business world.",
  description = "At Equilibrate.AI we are committed to bring the AI revolution to the most popular business tools.",
  foundedYear = "2025",
  headquarters = "Bangalore",
  specialization = "AI Specialists",
  story = "Equilibrate.AI came into existence when the founders saw the whole world overwhelmed by rapid AI growth and development. Many businesses want to integrate AI into their workflows but are not sure where to start and clueless about the effort. The core principle is to democratise existing tech with the use of AI. Determined to make AI more approachable in business settings, Equilibrate.AI is on the journey to build feature-rich, easy-to-use and cutting edge AI products and solutions. AI is here to make our lives better, so let us embrace it in the right way.",
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
  };

  return (
    <div className="w-full bg-[#FFFAF7] relative overflow-hidden ">
        
      {/* Theme Decorative Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
         <div className="absolute top-10 left-0 w-full h-1 bg-gray-400"></div>
         <div className="absolute bottom-10 left-0 w-full h-1 bg-gray-400"></div>
         <div className="absolute top-0 left-10 h-full w-1 bg-gray-400"></div>
         <div className="absolute top-0 right-10 h-full w-1 bg-gray-400"></div>
      </div>

      <div className="absolute inset-0 h-full w-full">
 
      </div>
        <div className="absolute top-8 left-0 right-0 z-50 flex justify-center">
          <Navbar />
        </div>
      <div className="relative z-10 flex items-center justify-center pt-24 pb-20">
        <motion.div
          className="max-w-6xl mx-auto px-6 w-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header Section */}
          <motion.div className="text-center mb-20" variants={itemVariants}>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-black tracking-tight leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {`About ${companyName}`.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-3"
                  initial={{ opacity: 0, rotateY: 90 }}
                  whileInView={{ opacity: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl font-medium text-black mb-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {tagline}
            </motion.p>
            
            <motion.p
              className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {description}
            </motion.p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24"
            variants={containerVariants}
          >
            {[
              {
                icon: <Calendar className="w-8 h-8 text-black" strokeWidth={1.5} />,
                title: "Founded",
                value: foundedYear,
              },
              {
                icon: <MapPin className="w-8 h-8 text-black" strokeWidth={1.5} />,
                title: "Headquartered in",
                value: headquarters,
              },
              {
                icon: <Users className="w-8 h-8 text-black" strokeWidth={1.5} />,
                title: specialization,
                value: "Expert Team",
              },
            ].map((stat, index) => (
              <FeatureCard key={index} icon={stat.icon} title={stat.title} value={stat.value} index={index} />
            ))}
          </motion.div>

          {/* Story Section */}
          <motion.div className="mb-16" variants={itemVariants}>
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-10 text-center text-black tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Our Story
            </motion.h2>
            <motion.div variants={cardVariants}>
              <Card className="p-8 md:p-12 border-none bg-white shadow-sm rounded-[2rem]">
                <p className="text-lg md:text-xl leading-loose text-gray-700 font-medium text-center max-w-4xl mx-auto">
                    {story}
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
