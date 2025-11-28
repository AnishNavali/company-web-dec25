"use client";

import React from 'react'
import * as React_hooks from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { LucideIcon, Home, Zap, CreditCard, Package, Mail } from "lucide-react";
import { useRouter } from "next/navigation"; // Import useRouter

interface Tab {
  title: string;
  icon: LucideIcon;
  type?: never;
  href?: string; // Add href optional property
}

interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
  href?: never;
}

type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
  onChange?: (index: number | null) => void;
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

export function ExpandableTabs({
  tabs,
  className,
  activeColor = "text-primary",
  onChange,
}: ExpandableTabsProps) {
  const [selected, setSelected] = React_hooks.useState<number | null>(null);
  const outsideClickRef = React_hooks.useRef(null);
  const router = useRouter(); // Initialize router

  useOnClickOutside(outsideClickRef, () => {
    setSelected(null);
    onChange?.(null);
  });

  const handleSelect = (index: number) => {
    setSelected(index);
    onChange?.(index);
    
    // Handle navigation
    const tab = tabs[index];
    if (tab.type !== "separator" && tab.href) {
        router.push(tab.href);
    }
  };

  const Separator = () => (
    <div className="mx-1 h-[24px] w-[1.2px] bg-border" aria-hidden="true" />
  );

  return (
    <div
      ref={outsideClickRef}
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-2xl border bg-background p-1 shadow-sm",
        className
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <Separator key={`separator-${index}`} />;
        }
        const Icon = tab.icon;
        return (
          <motion.button
            key={tab.title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={selected === index}
            onClick={() => handleSelect(index)}
            transition={transition}
            className={cn(
              "relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300",
              selected === index
                ? cn("bg-muted", activeColor)
                : "text-black-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon size={20} />
            <AnimatePresence initial={false}>
              {selected === index && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}

const Navbar = () => {
  // Added hrefs to the tab configuration
  const navTabs: TabItem[] = [
    { title: "Home", icon: Home, href: "/" },
    { title: "Company", icon: Zap, href: "/about-us" },
    { type: "separator" },
    { title: "Careers", icon: CreditCard, href: "/careers" },
    { title: "Products", icon: Package, href: "/products" },
    { title: "Contact", icon: Mail, href: "/contact-us" },
  ];

  const handleTabChange = (index: number | null) => {
    if (index !== null) {
      console.log(`Selected tab index: ${index}`);
    }
  };

  return (
    <div className="w-full flex justify-center py-4">
      <ExpandableTabs
        tabs={navTabs}
        activeColor="text-black"
        onChange={handleTabChange}
        className="bg-black/50 border-white/10 "
      />
    </div>
  );
};

export default Navbar;
