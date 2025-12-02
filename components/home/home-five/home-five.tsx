/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import TextType from "@/components/TextType";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

// Merging your content with the Image/Card structure
const features = [
  {
    id: "communities",
    title: "Security",
    description:
      "Enterprise-grade security protocols ensuring your data remains protected and compliant at all times.",
    image: "/security.png",
  },
  {
    id: "solutions",
    title: "Performance",
    description:
      "Optimized solutions delivering exceptional speed and reliability for mission-critical operations.",
    image: "/performance.png",
  },
  {
    id: "innovation",
    title: "Innovation",
    description:
      "Cutting-edge AI technology designed to enhance productivity and drive measurable business growth.",
    image: "/innovationone.png",
  },
  {
    id: "sustainability",
    title: "Real-Time Analytics",
    description:
      "Comprehensive dashboards delivering instant visibility into performance metrics and business intelligence.",
    image: "/realtimeone.png",
  },
];

export default function HomeSectionFive() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <div className="w-full bg-[#FFFAF7] flex flex-col items-center justify-center p-4 md:p-8 lg:p-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
        <div className="absolute top-4 sm:top-10 left-0 w-full h-px sm:h-1 bg-gray-400"></div>
        <div className="absolute bottom-4 sm:bottom-10 left-0 w-full h-px sm:h-1 bg-gray-400"></div>
        <div className="absolute top-0 left-4 sm:left-10 h-full w-px sm:w-1 bg-gray-400"></div>
        <div className="absolute top-0 right-4 sm:right-10 h-full w-px sm:w-1 bg-gray-400"></div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto">
        {/* Section Header & Controls */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-center md:mb-14 lg:mb-16 relative z-10">
          <div className="flex flex-col gap-4 w-full md:w-2/3">
            <div className="text-center">
              <TextType
                text={["Our Philosophy"]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight mb-4"
              />
            </div>
          </div>

          {/* Carousel Controls */}
          {/* <div className="hidden shrink-0 flex-row items-end gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto hover:bg-black/5 text-black"
            >
              <ArrowLeft className="size-6" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto hover:bg-black/5 text-black"
            >
              <ArrowRight className="size-6" />
            </Button>
          </div> */}
        </div>

        {/* Carousel Section */}
        <div className="w-full relative z-10">
          <Carousel
            setApi={setCarouselApi}
            opts={{
              breakpoints: {
                "(max-width: 768px)": {
                  dragFree: true,
                },
              },
            }}
          >
            <CarouselContent className="-ml-4">
              {features.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="group relative h-full min-h-[28rem] rounded-[2rem] overflow-hidden cursor-pointer">
                    {/* Background Image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 md:p-8 text-white">
                      <h3 className="mb-3 text-xl font-bold md:text-2xl leading-tight">
                        {item.title}
                      </h3>
                      <p className="mb-6 text-sm text-gray-200 line-clamp-4 leading-relaxed font-medium">
                        {item.description}
                      </p>
                      {/* <div className="flex items-center text-sm font-semibold group/btn">
                        Read more{" "}
                        <ArrowRight className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1" />
                      </div> */}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Mobile Dot Navigation */}
          <div className="mt-8 flex justify-center gap-2 md:hidden">
            {features.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  currentSlide === index ? "bg-black" : "bg-black/20"
                }`}
                onClick={() => carouselApi?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
