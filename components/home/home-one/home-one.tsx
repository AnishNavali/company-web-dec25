"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeSectionOne() {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playWelcomeMessage = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; 
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.onended = () => setIsPlaying(false);
    }
  };

  return (
    <>
      <main className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center font-sans">
        
        {/* Audio Source */}
        <audio ref={audioRef} src="/aivoice1.mp3" preload="auto" />

        {/* Background Video */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/demo3.mp4" type="video/mp4" />
          </video>
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 mix-blend-multiply" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
          
          {/* 
             Clickable Title Wrapper 
             We use 'group' here so hovering anywhere on the title/icon affects both
          */}
          <div 
            className="group relative inline-flex items-center justify-center mb-6 cursor-pointer select-none" 
            onClick={playWelcomeMessage}
            title="Click to listen" // Standard tooltip for desktop users
          >
            
            {/* The Title */}
            <h1 className={`
              text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#FFCDB2] uppercase drop-shadow-lg
              transition-all duration-300 
              group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,205,178,0.8)]
              ${isPlaying ? "text-white drop-shadow-[0_0_20px_rgba(255,205,178,1)]" : ""}
            `}>
              Equilibrate.AI
            </h1>

            {/* 
               THE VISUAL CUE (Speaker Icon)
               Positioned absolute to the right side.
               1. It pulses (animate-pulse) to catch the eye.
               2. It is semi-transparent (opacity-70) so it's not ugly.
            */}
            {/* <div className={`
              absolute -right-8 md:-right-12 top-2 md:top-4
              text-[#FFCDB2] 
              transition-all duration-300
              ${isPlaying ? "animate-bounce opacity-100 text-white" : "animate-pulse opacity-70 group-hover:opacity-100 group-hover:text-white"}
            `}>
              {isPlaying ? (
                // Icon when playing (Sound Waves)
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              ) : (
                // Icon when waiting (Speaker with small 'play' hint)
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8">
                   <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                   <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              )}
            </div> */}

          </div>

          <p className="text-white text-base md:text-xl lg:text-2xl font-medium tracking-wide mb-16 max-w-3xl drop-shadow-md">
            Democratizing technology by breaking all tech barriers with AI.
          </p>

          <button 
            onClick={() => router.push('/products')}
            className="
              group
              px-8 py-3 
              md:px-10 md:py-4
              rounded-full 
              border-2 border-white 
              text-white 
              bg-transparent 
              hover:bg-white hover:text-black 
              transition-all duration-300 ease-in-out
              font-semibold text-lg tracking-wide
              cursor-pointer
            "
          >
            Explore Products
          </button>
        </div>
      </main>
    </>
  );
}
