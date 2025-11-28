"use client"
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = 'mb-10',
  delay = 100,
  duration = 5,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const ref = useRef<HTMLElement>(null);
  const animationCompletedRef = useRef(false);
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      const el = ref.current as HTMLElement & {
        _rbsplitInstance?: GSAPSplitText;
      };

      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch {
          // Error caught and handled
        }
        el._rbsplitInstance = undefined;
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;
      let targets: Element[] = [];
      const assignTargets = (self: GSAPSplitText) => {
        if (splitType.includes('chars') && (self as GSAPSplitText).chars?.length)
          targets = (self as GSAPSplitText).chars;
        if (!targets.length && splitType.includes('words') && self.words.length) targets = self.words;
        if (!targets.length && splitType.includes('lines') && self.lines.length) targets = self.lines;
        if (!targets.length) targets = self.chars || self.words || self.lines;
      };
      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === 'lines',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        onSplit: (self: GSAPSplitText) => {
          assignTargets(self);
          return gsap.fromTo(
            targets,
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              scrollTrigger: {
                trigger: el,
                start,
                once: true,
                fastScrollEnd: true,
                anticipatePin: 0.4
              },
              onComplete: () => {
                animationCompletedRef.current = true;
                onLetterAnimationComplete?.();
              },
              willChange: 'transform, opacity',
              force3D: true
            }
          );
        }
      });
      el._rbsplitInstance = splitInstance;
      return () => {
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === el) st.kill();
        });
        try {
          splitInstance.revert();
        } catch {
          // Error caught and handled
        }
        el._rbsplitInstance = undefined;
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        onLetterAnimationComplete
      ],
      scope: ref
    }
  );

  const renderTag = () => {
    const baseClasses = `split-parent overflow-visible whitespace-normal ${className}`;
    
    switch (tag) {
      case 'h1':
        return (
          <h1 ref={ref as React.Ref<HTMLHeadingElement>} className={baseClasses}>
            {text}
          </h1>
        );
      case 'h2':
        return (
          <h2 ref={ref as React.Ref<HTMLHeadingElement>} className={baseClasses}>
            {text}
          </h2>
        );
      case 'h3':
        return (
          <h3 ref={ref as React.Ref<HTMLHeadingElement>} className={baseClasses}>
            {text}
          </h3>
        );
      case 'h4':
        return (
          <h4 ref={ref as React.Ref<HTMLHeadingElement>} className={baseClasses}>
            {text}
          </h4>
        );
      case 'h5':
        return (
          <h5 ref={ref as React.Ref<HTMLHeadingElement>} className={baseClasses}>
            {text}
          </h5>
        );
      case 'h6':
        return (
          <h6 ref={ref as React.Ref<HTMLHeadingElement>} className={baseClasses}>
            {text}
          </h6>
        );
      default:
        return (
          <p ref={ref as React.Ref<HTMLParagraphElement>} className={baseClasses}>
            {text}
          </p>
        );
    }
  };

  return renderTag();
};

export default function HomeSectiontwo() {
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  return (
    <>
      {/* MAIN BACKGROUND - Light beige/peach theme */}
      <div className="w-full bg-[#FFFAF7] flex items-center justify-center p-4 md:p-8 lg:p-16 relative overflow-hidden">
        {/* Subtle Accent Lines */}
           
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-10 left-0 w-full h-1 bg-gray-400"></div>
          <div className="absolute bottom-10 left-0 w-full h-1 bg-gray-400"></div>
          <div className="absolute top-0 left-10 h-full w-1 bg-gray-400"></div>
          <div className="absolute top-0 right-10 h-full w-1 bg-gray-400"></div>
        </div>

        {/* MAIN CARD CONTAINER */}
        <div className="relative z-10 bg-white w-full max-w-7xl rounded-[2rem] overflow-hidden flex flex-col lg:flex-row shadow-sm min-h-[600px] transition-transform hover:scale-[1.01] duration-5000">
          {/* LEFT CONTENT SECTION */}
          <div className="flex-1 p-8 md:p-16 lg:p-16 flex flex-col justify-center">
            {/* Heading with SplitText Animation */}
            <SplitText
              text="Our Impact Story"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-12 tracking-tight leading-tight"
              delay={100}
              duration={5}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              tag="h2"
              textAlign="left"
              onLetterAnimationComplete={handleAnimationComplete}
            />

            {/* Description Text */}
            <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium tracking-wide mb-12">
              Transforming state-wide data collection through innovative
              technology solutions that serve millions of citizens across
              Karnataka. We developed a comprehensive web application for
              Karnataka&apos;s state-wide socio-economic survey, creating an
              integrated ecosystem of digital tools that revolutionized data
              collection and enumerator training processes.
            </p>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div className="flex-1 relative min-h-[400px] lg:min-h-full">
            <Image
              width={500}
              height={500}
              src="/anish_explain.jpg"
              alt="Team meeting"
              className="absolute inset-0 w-full h-full object-cover lg:rounded-r-[2rem] lg:rounded-bl-[2rem]"
            />
          </div>
        </div>
      </div>
    </>
  );
}