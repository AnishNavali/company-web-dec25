import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/navbar/navbar';

export default function HomeSectionOne() {
  return (
    <>
      <Head>
        <title>Equilibrate.AI</title>
        <meta name="description" content="Democratizing technology with AI" />
      </Head>

      {/* Main Container - Full Screen */}
      <main className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center font-sans">
        
        {/* Background Video */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/aivideo.mp4" type="video/mp4" />
          </video>

          {/* Dark Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 mix-blend-multiply" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        </div>

        {/* Navbar - Positioned Absolutely at Top */}
        <div className="absolute top-6 left-0 right-0 z-50 flex justify-center">
          <Navbar />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#FFCDB2] mb-6 uppercase drop-shadow-lg">
            Equilibrate.AI
          </h1>

          <p className="text-white text-base md:text-xl lg:text-2xl font-medium tracking-wide mb-16 max-w-3xl drop-shadow-md">
            Democratizing technology by breaking all tech barriers with AI.
          </p>

          <button 
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
            "
          >
            Explore Products
          </button>
        </div>

      </main>
    </>
  );
}