'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { BackgroundGradient } from "@/components/ui/background-gradient"; 
import Image from 'next/image';

type FeatureType = {
  title: string;
  image: string;
  description: string;
};

const FeatureCard = ({
  feature,
  index,
}: {
  feature: FeatureType;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      <BackgroundGradient className="rounded-[22px] h-full p-4 sm:p-10 bg-white dark:bg-zinc-900 flex flex-col">
        
        {/* Image Area - Replacing Icon */}
        <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4">
          <Image
            src={feature.image}
            alt={feature.title}
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 font-bold">
          {feature.title}
        </p>

        {/* Description */}
        <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-grow leading-relaxed">
          {feature.description}
        </p>

        {/* Button */}
        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-6 text-xs font-bold dark:bg-zinc-800 w-fit hover:bg-neutral-800 transition-colors">
          <span>Learn more </span>
          <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-1 text-white flex items-center justify-center">
             <ArrowRight className="w-3 h-3" />
          </span>
        </button>
      </BackgroundGradient>
    </motion.div>
  );
};

export function HomeSectionFour() {
  const features: FeatureType[] = [
    {
      title: 'AI Chatbot Development',
      image: '/Chatbot pic-1.jpeg', // Replace with your image path
      description:
        'We create intelligent chatbot systems that understand context, learn from interactions, and provide deeply personalized customer experiences.',
    },
    {
      title: 'Data Analytics Solutions',
      image: '/Adro-pic-1.png', // Replace with your image path
      description:
        'Transform raw data into actionable insights with our advanced analytics platform. Get real-time dashboards and predictive modeling.',
    },
    {
      title: 'Customer Service Automation',
      image: '/automation.jpg', // Replace with your image path
      description:
        'Streamline your customer support with AI-powered automation. Reduce response times and maintain 24/7 availability.',
    },
  ];

  return (
    <div className="w-full bg-[#FFFAF7]">
      {/* Feature Cards Section */}
      <section className="w-full py-20 px-4 md:p-8 lg:p-16 relative overflow-hidden">
        
        {/* Decorative lines */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
           <div className="absolute top-0 left-10 h-full w-1 bg-gray-400"></div>
           <div className="absolute top-0 right-10 h-full w-1 bg-gray-400"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 tracking-tight leading-tight">
              Our Solutions
            </h2>
            
            <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium tracking-wide max-w-2xl mx-auto">
              Equilibrate.AI transforms businesses with cutting-edge solutions in AI Development, Data Analytics, and Customer Service Automation.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10px' }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
