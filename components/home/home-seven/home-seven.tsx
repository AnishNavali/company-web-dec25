"use client";

import React, { useState, useEffect, useRef } from "react";
import { Zap, Globe, Users, Cog, Cpu, Target } from "lucide-react"; // Removed ArrowRight, Link
import { Badge } from "@/components/ui/badge";
// Removed Button import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TextType from "@/components/TextType";

// --- Types & Interfaces ---

interface TimelineItem {
  id: number;
  title: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

// --- Data from Hero Section Three ---

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Accessible Innovation",
    content: "Cutting-edge AI and data analytics within reach. We democratize access to advanced technologies.",
    category: "Innovation",
    icon: Zap,
    relatedIds: [5, 4],
    status: "completed",
    energy: 85,
  },
  {
    id: 2,
    title: "Sustainability at Core",
    content: "Responsible transformation with environmental impact. Green tech solutions for a better future.",
    category: "Sustainability",
    icon: Globe,
    relatedIds: [3, 6],
    status: "in-progress",
    energy: 70,
  },
  {
    id: 3,
    title: "Enriching Communities",
    content: "Building stronger communities through technology. Fostering connection and collaboration.",
    category: "Community",
    icon: Users,
    relatedIds: [2, 1],
    status: "in-progress",
    energy: 65,
  },
  {
    id: 4,
    title: "End-to-End Solutions",
    content: "Complete AI chatbots and analytics solutions. From data ingestion to actionable insights.",
    category: "Solutions",
    icon: Cog,
    relatedIds: [1, 5],
    status: "pending",
    energy: 40,
  },
  {
    id: 5,
    title: "Future-Ready Technology",
    content: "Generative AI and Industry 4.0 principles. Preparing your infrastructure for the next wave.",
    category: "Technology",
    icon: Cpu,
    relatedIds: [1, 4, 6],
    status: "pending",
    energy: 90,
  },
  {
    id: 6,
    title: "Proven Excellence",
    content: "Consistent delivery from consulting to implementation. A track record of success across industries.",
    category: "Excellence",
    icon: Target,
    relatedIds: [2, 5],
    status: "completed",
    energy: 95,
  },
];

// --- Main Component ---

export function HomeSectionSeven() {


  return (
    <div className="py-12 sm:py-20 bg-[#FFFAF7] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
        <div className="absolute top-4 sm:top-10 left-0 w-full h-px sm:h-1 bg-gray-400"></div>
        <div className="absolute bottom-4 sm:bottom-10 left-0 w-full h-px sm:h-1 bg-gray-400"></div>
        <div className="absolute top-0 left-4 sm:left-10 h-full w-px sm:w-1 bg-gray-400"></div>
        <div className="absolute top-0 right-4 sm:right-10 h-full w-px sm:w-1 bg-gray-400"></div>
      </div>
        
      {/* Content Container with Flex Column and Centered Items */}
      <div className="container mx-auto flex flex-col items-center relative z-10 px-4">
        <div className="w-full flex justify-center mb-4 sm:mb-8">
            <TextType
            text={["Why Equilibrate.AI Leads The Future"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 tracking-tight text-center leading-tight"
          />
        </div>
        <p className="text-base sm:text-xl md:text-2xl text-gray-600 mb-4 sm:mb-8 text-center max-w-3xl px-2">
          Innovation and commitment combined to deliver transformation across industries.
        </p>
        <RadialOrbitalTimeline timelineData={timelineData} />
      </div>
    </div>
  );
}

function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  
  // Removed unused setViewMode by only destructuring the state value
  const [viewMode] = useState<"orbital">("orbital");
  
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  
  // Removed unused setCenterOffset by only destructuring the state value
  const [centerOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  
  // Responsive Radius State
  const [orbitRadius, setOrbitRadius] = useState(300); // Default desktop radius

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Handle resizing for responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setOrbitRadius(140); // Mobile radius (fits within ~300px width)
      } else if (window.innerWidth < 1024) {
        setOrbitRadius(220); // Tablet radius
      } else {
        setOrbitRadius(300); // Desktop radius
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });
      newState[id] = !prev[id];
      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;
    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }
    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = orbitRadius; 
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );
    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-black border-black";
      case "in-progress":
        return "text-white bg-black border-black";
      case "pending":
        return "text-white bg-black border-black";
      default:
        return "text-white bg-black border-black";
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] sm:h-[600px] md:h-[800px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
      onClick={handleContainerClick}
    >
      {/* Central Hub (Sun) */}
      <div className="absolute z-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-center p-2 shadow-lg">
        <p className="text-[10px] sm:text-xs font-semibold text-black/70">Equilibrate.AI</p>
      </div>
      
      {/* Orbit Ring */}
      <div
        ref={orbitRef}
        className="absolute border border-dashed border-gray-300 rounded-full transition-all duration-500"
        style={{ width: orbitRadius * 2, height: orbitRadius * 2 }}
      ></div>

      {timelineData.map((item, index) => {
        const position = calculateNodePosition(index, timelineData.length);
        const isExpanded = expandedItems[item.id];
        const isRelated = isRelatedToActive(item.id);
        const isPulsing = pulseEffect[item.id];
        const Icon = item.icon;

        const nodeStyle: React.CSSProperties = {
          transform: `translate(${position.x}px, ${position.y}px)`,
          zIndex: isExpanded ? 200 : position.zIndex,
          opacity: isExpanded ? 1 : position.opacity,
        };

        return (
          <div
            key={item.id}
            // FIX: Added brackets to ensure the function returns void
            ref={(el) => { nodeRefs.current[item.id] = el; }}
            className="absolute transition-all duration-700 cursor-pointer"
            style={nodeStyle}
            onClick={(e) => {
              e.stopPropagation();
              toggleItem(item.id);
            }}
          >
            <div className="relative flex flex-col items-center">
              {/* Energy Field / Pulsing effect */}
              {(isPulsing || isRelated) && (
                <div
                  className={`absolute -inset-1.5 sm:-inset-2.5 rounded-full bg-blue-500/30 animate-pulse`}
                ></div>
              )}
              {/* Node Circle */}
              <div
                className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${getStatusStyles(
                  item.status
                )}`}
              >
                <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>
              {/* Label */}
              <p className="absolute -bottom-6 sm:-bottom-8 w-32 sm:w-max left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-medium text-center text-black/80 leading-tight">
                {item.title}
              </p>
            </div>
            
            {/* Expanded Card */}
            {isExpanded && (
              <Card className="absolute left-1/2 -translate-x-1/2 top-full mt-2 sm:mt-4 w-64 sm:w-80 shadow-2xl z-50 bg-white/90 backdrop-blur-md">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base sm:text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-xs sm:text-sm mb-4">{item.content}</p>
                  {item.relatedIds.length > 0 && (
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold mb-2">Connected Nodes</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.relatedIds.map((relatedId) => {
                          const relatedItem = timelineData.find(
                            (i) => i.id === relatedId
                          );
                          return (
                            <Badge
                              key={relatedId}
                              variant="secondary"
                              className="cursor-pointer text-[10px] sm:text-xs px-1.5 py-0.5"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleItem(relatedId);
                              }}
                            >
                              {relatedItem?.title}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        );
      })}
    </div>
  );
}
