"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

type Slide = {
  id: "startup-india" | "startup-karnataka";
  badge: string;
  titleTop: string;
  titleGradient: string;
  description: React.ReactNode;
  year: string;
  yearLabel: string;
  imageSrc: string;
  imageAlt: string;
};

export default function AboutSectionFour() {
  const slides: Slide[] = [
    {
      id: "startup-india",
      badge: "Startup India Recognized",
      titleTop: "Driving Innovation in",
      titleGradient: "Artificial Intelligence",
      description: (
        <>
          <span className="font-semibold text-gray-900">
            Equilibrate.AI Technologies Pvt. Ltd.
          </span>{" "}
          is proud to be recognized as an AI startup by Startup India (DPIIT).
        </>
      ),
      year: "2025",
      yearLabel: "Incorporation Year",
      imageSrc: "/startup.jpg",
      imageAlt: "Startup India Recognition Certificate",
    },
    {
      id: "startup-karnataka",
      badge: "Startup Karnataka",
      titleTop: "Recognized by",
      titleGradient: "Startup Karnataka",
      description: (
        <>
          <span className="font-semibold text-gray-900">
            Equilibrate.AI Technologies Pvt. Ltd.
          </span>{" "}
          is part of the Startup Karnataka ecosystem.
        </>
      ),
      year: "2025",
      yearLabel: "Recognition Year",
      imageSrc: "/startup-karnataka1.png",
      imageAlt: "Startup Karnataka Recognition",
    },
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);

  const isLast = activeIndex === slides.length - 1;
  const active = slides[activeIndex];

  const handleArrowClick = () => {
    setActiveIndex((i) => (i === slides.length - 1 ? i - 1 : i + 1));
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full bg-[#FFFAF7] px-8 py-16 md:px-16 flex items-center justify-center overflow-hidden">
      {/* Decorative Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
        <div className="absolute top-4 sm:top-10 left-0 w-full h-px sm:h-1 bg-gray-400"></div>
        <div className="absolute bottom-4 sm:bottom-10 left-0 w-full h-px sm:h-1 bg-gray-400"></div>
        <div className="absolute top-0 left-4 sm:left-10 h-full w-px sm:w-1 bg-gray-400"></div>
        <div className="absolute top-0 right-4 sm:right-10 h-full w-px sm:w-1 bg-gray-400"></div>
      </div>

      <motion.div
        className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* LEFT: Image + single arrow */}
        <motion.div
          variants={itemVariants}
          className="relative mx-auto flex flex-col items-center justify-center w-full max-w-[35rem]"
        >
          {/* Glow */}
          <div className="absolute flex items-center justify-center z-0 pointer-events-none">
            <div
              className="
                h-[500px] w-[500px] rounded-full blur-3xl opacity-30
                bg-[conic-gradient(from_0deg,theme(colors.orange.500),theme(colors.yellow.500),theme(colors.green.500),theme(colors.blue.500),theme(colors.indigo.500),theme(colors.orange.500))]
                animate-[spin_10s_linear_infinite]
              "
            />
          </div>

          <div className="relative z-10 group w-full">
            <div className="relative overflow-hidden rounded-xl border-4 border-white/20 shadow-2xl bg-white">
              {/* animate swap */}
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <Image
                  src={active.imageSrc}
                  alt={active.imageAlt}
                  width={2382}
                  height={1080}
                  className="object-contain h-auto w-full hover:scale-105 transition-transform duration-500"
                  priority
                />
              </motion.div>

              {/* Single arrow button (right side) */}
              <button
                type="button"
                onClick={handleArrowClick}
                aria-label={isLast ? "Previous" : "Next"}
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  inline-flex h-11 w-11 items-center justify-center
                  rounded-full border border-white/30
                  bg-zinc-900/80 text-white backdrop-blur
                  shadow hover:bg-zinc-900 transition
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  className={`h-5 w-5 transition-transform duration-300 ${
                    isLast ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-xl pointer-events-none" />
          </div>
        </motion.div>

        {/* RIGHT: Content */}
        <motion.div variants={itemVariants} className="space-y-6 text-center md:text-left">
          <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-sm font-medium text-zinc-900 backdrop-blur-xl">
            <span className="mr-2 h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            {active.badge}
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            {active.titleTop} <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500">
              {active.titleGradient}
            </span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto md:mx-0">
            {active.description}
          </p>

          <div className="pt-8 flex flex-col items-center justify-center md:items-start">
            <div>
              <h4 className="text-2xl font-bold text-gray-900">{active.year}</h4>
              <p className="text-sm text-gray-500">{active.yearLabel}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
