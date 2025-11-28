"use client";

import React from 'react';
import { motion, Variants } from "framer-motion";
import { Mail, Github, Linkedin, Phone } from "lucide-react";


export const ContactSectionTwo = () => {
  const handleClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('mailto:') || href.startsWith('tel:')) {
      e.preventDefault();
      // eslint-disable-next-line react-hooks/immutability
      window.location.href = href;
    }
  };

  interface LinkBoxProps {
    Icon: React.ComponentType<{ className?: string }>;
    href: string;
    label: string;
  }

  const LinkBox = ({ Icon, href, label }: LinkBoxProps) => (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith('mailto:') || href.startsWith('tel:') ? '_self' : '_blank'}
      rel="noopener noreferrer"
      onClick={(e) => handleClick(e, href)}
      // Theme update: bg-white for boxes, border-gray-100
      className="relative grid h-24 w-full place-content-center sm:h-32 md:h-40 bg-white hover:bg-black transition-colors duration-300 group"
    >
      <Icon className="text-2xl sm:text-3xl md:text-4xl text-black group-hover:text-white transition-colors duration-300" />
    </a>
  );

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
    <section className="pb-28 relative z-10 pt-14 bg-[#FFFAF7] relative overflow-x-hidden font-sans">

            {/* Theme Decorative Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
         <div className="absolute top-10 left-0 w-full h-1 bg-gray-400"></div>
         <div className="absolute bottom-10 left-0 w-full h-1 bg-gray-400"></div>
         <div className="absolute top-0 left-10 h-full w-1 bg-gray-400"></div>
         <div className="absolute top-0 right-10 h-full w-1 bg-gray-400"></div>
      </div>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h3
             className="text-3xl sm:text-4xl lg:text-5xl font-bold pt-12 mb-6 text-black tracking-tight"
          >
            {"Connect with us".split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-3"
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
          </motion.h3>

          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Follow us on social media for updates and insights
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          // Theme update: Rounded container with shadow and borders
          className="divide-y divide-gray-100 border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm bg-white"
        >
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            <LinkBox Icon={Mail} href="mailto:anish.navali@equilibrateai.com" label="Email us" />
            <LinkBox Icon={Github} href="https://github.com/Equilibrate-AI" label="Visit GitHub" />
          </div>
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            <LinkBox Icon={Linkedin} href="https://www.linkedin.com/company/equilibrate-ai" label="Visit LinkedIn" />
            <LinkBox Icon={Phone} href="tel:+919606024155" label="Call us" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
