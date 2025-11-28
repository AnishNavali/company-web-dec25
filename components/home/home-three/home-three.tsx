'use client';

import React from 'react';
import ScrollVelocity from '@/components/ScrollVelocity';

export default function ScrollSection() {
  // Matches the text in your image: "Performance * Innovation * AI Technology *"
  const textContent = 'Performance * Innovation * AI Technology * ';

  return (
    // Changed from min-h-screen to w-full to fit content height
    // Added borders (border-y) to create the separate strip look if desired
    <section className="w-full bg-white border-y border-gray-200">
      
      {/* 
         Reduced vertical padding (py-4 or py-6) makes it a slim strip.
         The previous version had py-8 or min-h-screen which made it tall.
      */}
      <div className="w-full py-6">
        <ScrollVelocity
          texts={[textContent]} 
          velocity={50} 
          // Use text-[#232323] for that dark charcoal color
          // Reduced text size slightly to text-4xl/5xl to fit the compact height nicely
          className="text-[#232323] text-4xl md:text-6xl font-bold font-sans uppercase tracking-tight mr-4"
          scrollerClassName="font-bold"
          numCopies={6} // Increased copies to ensure the loop is smooth on wide screens
        />
      </div>

    </section>
  );
}
