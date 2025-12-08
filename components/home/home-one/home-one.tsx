"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function HomeSectionOne() {
  const router = useRouter();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const appearTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const playWelcomeMessage = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.onended = () => setIsPlaying(false);
    }
  };

  /**
   * FIX APPLIED: Wrapped in useCallback so we can use it in useEffect.
   * This ensures the function identity doesn't change on every render.
   */
  const handleLoadedMetadata = useCallback(() => {
    if (!videoRef.current) return;

    // Trigger exactly at 4 seconds for an 8 second video
    const appearAt = 4;

    if (appearTimeoutRef.current) {
      clearTimeout(appearTimeoutRef.current);
    }

    appearTimeoutRef.current = setTimeout(() => {
      setShowContent(true);
    }, appearAt * 1000);
  }, []);

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.loop = true;
      videoRef.current.play();
    }
  };

  /**
   * FIX APPLIED: This useEffect checks if the video is ALREADY ready.
   * In 'npm run dev', the video might load before the component attaches the event listener.
   * Checking readyState >= 1 ensures we don't miss the event.
   */
  useEffect(() => {
    const videoElement = videoRef.current;
    
    // 1 = HAVE_METADATA. If we have metadata, trigger the handler manually.
    if (videoElement && videoElement.readyState >= 1) {
      handleLoadedMetadata();
    }
  }, [handleLoadedMetadata]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (appearTimeoutRef.current) {
        clearTimeout(appearTimeoutRef.current);
      }
    };
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center font-sans bg-black">
      <audio ref={audioRef} src="/aivoice1.mp3" preload="auto" />

      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover"
        >
          <source src="/demo1.mp4" type="video/mp4" />
        </video>

        {/* 
           Overlays:
           Also Zoom In slightly (scale-90 to scale-100) to match the text movement 
           so the whole scene feels like it's moving forward.
        */}
        <div
          className={`
            absolute top-0 left-0 w-full h-full bg-black/40 mix-blend-multiply
            transition-all duration-[4000ms] ease-out
            ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-90"}
          `}
        />
        <div
          className={`
            absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 via-transparent to-black/60
            transition-all duration-[4000ms] ease-out
            ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-90"}
          `}
        />
      </div>

      {/* 
        Content Animation: ZOOM IN + REVEAL
        - Starts at scale-75 (Small, far away)
        - Ends at scale-100 (Normal size)
        - Duration: 4 seconds
      */}
      <div
        className={`
          relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto
          transition-all duration-[4000ms] ease-out
          ${
            showContent
              ? "opacity-100 scale-100 blur-0" // Visible state
              : "opacity-0 scale-75 blur-sm pointer-events-none" // Hidden state (Small & Blurry)
          }
        `}
      >
        <div
          className="group relative inline-flex items-center justify-center mb-6 cursor-pointer select-none"
          onClick={playWelcomeMessage}
          title="Click to listen"
        >
          <h1
            className={`
              text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#FFCDB2] uppercase drop-shadow-lg
              transition-all duration-300 
              group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,205,178,0.8)]
              ${isPlaying ? "text-white drop-shadow-[0_0_20px_rgba(255,205,178,1)]" : ""}
            `}
          >
            Equilibrate.AI
          </h1>
        </div>

        <p className="text-white text-base md:text-xl lg:text-2xl font-medium tracking-wide mb-16 max-w-3xl drop-shadow-md">
          Democratizing technology by breaking all tech barriers with AI.
        </p>

        <button
          onClick={() => router.push("/products")}
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
  );
}
