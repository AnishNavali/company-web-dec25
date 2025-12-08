"use client";
import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import TextType from "@/components/TextType";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
}

export default function HomeSectiontwo() {
  return (
    <div className="w-full bg-[#FFFAF7] p-4 md:p-8 lg:p-16 overflow-hidden font-sans text-gray-900 relative">
      {/* --- DECORATIVE LINES --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
          <div className="absolute top-4 sm:top-10 left-0 w-full h-px sm:h-1 bg-gray-400"></div>
          <div className="absolute bottom-4 sm:bottom-10 left-0 w-full h-px sm:h-1 bg-gray-400"></div>
          <div className="absolute top-0 left-4 sm:left-10 h-full w-px sm:w-1 bg-gray-400"></div>
          <div className="absolute top-0 right-4 sm:right-10 h-full w-px sm:w-1 bg-gray-400"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-20 relative z-10">
        {/* --- HEADER SECTION (CENTERED) --- */}
        <div className="w-full flex justify-center items-center text-center">
          <TextType
            text={["Our Impact Story"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 tracking-tight text-center leading-tight"
          />
        </div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* LEFT COLUMN: Large Image */}
          <div className="relative w-full min-h-[500px] lg:h-full rounded-3xl overflow-hidden shadow-sm">
            <Image
              width={800}
              height={1000}
              src="/anishone.PNG"
              alt="Team meeting and presentation"
              className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* RIGHT COLUMN: Text + 2x2 Grid */}
          <div className="flex flex-col gap-8">
            {/* Description Text */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white shadow-inner flex-shrink-0">
                  <Image
                    width={30}
                    height={30}
                    src="/karnataka.png"
                    alt="Karnataka Government Logo"
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  Karnataka Government
                </h3>
              </div>

              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                We developed a comprehensive web application for
                Karnataka&apos;s state-wide socio-economic survey, creating an
                integrated ecosystem of digital tools that revolutionized data
                collection and enumerator training processes for millions of
                citizens.
              </p>
            </div>

            {/* 2x2 GRID LAYOUT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
              {/* Card 1 */}
              <div className="bg-white p-8 rounded-3xl shadow-sm flex flex-col justify-between h-[200px] md:h-[240px] group hover:shadow-md transition-all">
                <div className="flex justify-between items-start">
                  <span className="text-4xl md:text-5xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    150K+
                  </span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Citizens Served</p>
                  <p className="text-sm text-gray-500">Across all districts</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-8 rounded-3xl shadow-sm flex flex-col justify-between h-[200px] md:h-[240px] group hover:shadow-md transition-all">
                <div className="flex justify-between items-start">
                  <span className="text-4xl md:text-5xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    95%
                  </span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Training Completion</p>
                  <p className="text-sm text-gray-500">95,000+ Enumerators</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-6 rounded-3xl shadow-sm flex flex-col justify-between h-[220px] hover:bg-blue-50 transition-colors group">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Survey Web App
                  </h4>
                  <p className="text-sm text-gray-500 leading-snug">
                    Comprehensive platform for data collection and management
                    across the state.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white p-6 rounded-3xl shadow-sm flex flex-col justify-between h-[220px] hover:bg-emerald-50 transition-colors group">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    AI Training Bot
                  </h4>
                  <p className="text-sm text-gray-500 leading-snug">
                    Intelligent chatbot system that trained thousands with
                    interactive modules.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
