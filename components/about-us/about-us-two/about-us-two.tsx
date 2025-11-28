"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image?: string;
  linkedin?: string; // Added linkedin property
}

interface TeamSectionProps {
  teamMembers?: TeamMember[];
}

const TeamMemberCard: React.FC<{ member: TeamMember; index: number }> = ({
  member,
  index,
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

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
      className="h-full w-full"
    >
      <div className="group relative w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-lg dark:shadow-2xl dark:shadow-black/80 overflow-hidden transition-transform duration-700 ease-out hover:scale-[1.02]">
        
        {/* Image Section */}
        <div className="relative overflow-hidden w-full aspect-square">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              width={500}
              height={500}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-[1.03]">
               <span className="text-6xl font-bold text-gray-400">
                  {member.name.charAt(0)}
               </span>
            </div>
          )}
          
          {/* Gradient Overlay - Kept for aesthetics, removed text */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 dark:from-black/80 to-transparent pointer-events-none"></div>
        </div>

        {/* Info Section */}
        <div className="p-4 flex items-center justify-between bg-white dark:bg-zinc-900">
          <div className="flex items-center gap-3">
            {/* Avatar Circle */}
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-zinc-700 transition-transform duration-500 ease-out group-hover:scale-110">
              {member.image ? (
                <Image
                  src={member.image}
                  alt="Avatar"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300" />
              )}
            </div>
            
            {/* Text Info - Updated to show Name instead of Handle */}
            <div className="transition-transform duration-500 ease-out group-hover:translate-x-1">
              <div className="text-sm font-bold text-gray-900 dark:text-zinc-100">
                {member.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-zinc-500 truncate max-w-[120px]">
                {member.role}
              </div>
            </div>
          </div>

          {/* Profile Button - Converted to Link */}
          <a
            href={member.linkedin || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 dark:bg-zinc-800 text-white dark:text-zinc-100 rounded-lg px-4 py-2 text-sm font-medium
                     transition-all duration-500 ease-out transform hover:scale-105 
                     hover:bg-gray-800 dark:hover:bg-zinc-700
                     active:scale-95 hover:shadow-md dark:hover:shadow-lg shadow-sm cursor-pointer text-center"
          >
            Profile
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export const AboutSectionTwo: React.FC<TeamSectionProps> = ({
  teamMembers = [
    {
      name: "Srinivas Navali",
      role: "Advisor",
      description: "IT Veteran with over 30 years experience.",
      image: "/srinivas-navali-profilepic.jpg",
      linkedin: "https://www.linkedin.com/in/shrinivasnavali/", 
    },
    {
      name: "Anish Navali",
      role: "Founder",
      description: "Tech enthusiast focused on GenAI.",
      image: "/anish-navali-profilepic.jpg",
      linkedin: "https://www.linkedin.com/in/anish-navali-5972a1231",
    },
    {
      name: "Gagandeep H S",
      role: "Founding member",
      description: "AI and Frontend specialist.",
      image: "/gagandeep-profilepic.jpg",
      linkedin: "https://www.linkedin.com/in/gagandeep-h-s-4395b7284/",
    },
  ],
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

  return (
    <div className="w-full bg-[#FFFAF7] relative overflow-hidden py-20">
      {/* Decorative Background Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-0 w-full h-1 bg-gray-400"></div>
        <div className="absolute bottom-10 left-0 w-full h-1 bg-gray-400"></div>
        <div className="absolute top-0 left-10 h-full w-1 bg-gray-400"></div>
        <div className="absolute top-0 right-10 h-full w-1 bg-gray-400"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          className="max-w-6xl mx-auto px-6 w-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="mb-16" variants={itemVariants}>
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center text-black tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {"THE TEAM".split(" ").map((word, i) => (
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
            </motion.h2>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
              variants={containerVariants}
            >
              {teamMembers.map((member, index) => (
                <TeamMemberCard key={index} member={member} index={index} />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
