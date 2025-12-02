'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BackgroundGradient } from "@/components/ui/background-gradient"; 
import Image from 'next/image';
import TextType from '@/components/TextType';

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
      // Ensure the motion div itself takes full height of the grid cell
      className="h-full"
    >
      <BackgroundGradient 
        // VITAL FIX: containerClassName ensures the outer gradient wrapper stretches to fill the height
        containerClassName="h-full"
        // className applies to the inner white card. We ensure it's also full height and a flex container.
        className="rounded-[22px] h-full p-0 bg-white dark:bg-zinc-900 flex flex-col overflow-hidden border border-transparent dark:border-zinc-800"
      >
        
        {/* Image Area - Fixed height ensures uniform start for text */}
        <div className="w-full h-52 sm:h-64 relative flex-shrink-0 overflow-hidden border-b border-neutral-100 dark:border-neutral-800">
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Text Content Area */}
        {/* flex-grow ensures this section expands to fill any remaining space */}
        <div className="p-6 sm:p-8 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="text-lg sm:text-xl text-black mb-3 dark:text-neutral-200 font-bold leading-tight">
            {feature.title}
          </h3>

          {/* Description */}
          {/* flex-grow pushes content, but we don't strictly need it here if the parent flex-grow works. 
              However, keeping it ensures text distributes nicely if you add a button later. */}
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed flex-grow">
            {feature.description}
          </p>
        </div>

      </BackgroundGradient>
    </motion.div>
  );
};

export function HomeSectionFour() {
  const features: FeatureType[] = [
    {
      title: 'AI Chatbot Development',
      image: '/chatbot.png',
      description:
        'We create intelligent chatbot systems that understand context, learn from interactions, and provide deeply personalized customer experiences.',
    },
    {
      title: 'Data Analytics Solutions',
      image: '/data.png',
      description:
        'Transform raw data into actionable insights with our advanced analytics platform. Get real-time dashboards and predictive modeling.',
    },
    {
      title: 'Customer Service Automation',
      image: '/customer.png',
      description:
        'Streamline your customer support with AI-powered automation. Reduce response times and maintain 24/7 availability.',
    },
  ];

  return (
    <div className="w-full bg-[#FFFAF7]">
      <section className="w-full py-20 px-4 md:p-8 lg:p-16 relative overflow-hidden">
        
        {/* Background Grid Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
          <div className="absolute top-4 sm:top-10 left-0 w-full h-px sm:h-1 bg-gray-400"></div>
          <div className="absolute bottom-4 sm:bottom-10 left-0 w-full h-px sm:h-1 bg-gray-400"></div>
          <div className="absolute top-0 left-4 sm:left-10 h-full w-px sm:w-1 bg-gray-400"></div>
          <div className="absolute top-0 right-4 sm:right-10 h-full w-px sm:w-1 bg-gray-400"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <TextType 
              text={["Our Solutions"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              className='text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 tracking-tight leading-tight'
            />
            
            <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium tracking-wide max-w-2xl mx-auto">
              Equilibrate.AI transforms businesses with cutting-edge solutions in AI Development, Data Analytics, and Customer Service Automation.
            </p>
          </motion.div>

          <motion.div
            // auto-rows-fr is the CSS Grid magic that makes all rows equal height
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
