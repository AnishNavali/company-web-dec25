"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Home,
  Zap,
  CreditCard,
  Package,
  Mail,
  Menu,
  X,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation"; // ⬅️ usePathname instead of useRouter

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { name: "Home", url: "/", icon: Home },
  { name: "Company", url: "/about-us", icon: Zap },
  { name: "Products", url: "/products", icon: Package },
  { name: "Careers", url: "/careers", icon: CreditCard },
  { name: "Contact", url: "/contact-us", icon: Mail },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // ⬅️ current URL path

  // Handle Custom Event to Open Menu from Footer
  useEffect(() => {
    const handleOpenMenu = () => {
      setIsMobileMenuOpen(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("open-nav-menu", handleOpenMenu);
    return () => window.removeEventListener("open-nav-menu", handleOpenMenu);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* --- Desktop Tubelight Navbar --- */}
      <div className="hidden md:block fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-6">
        <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;

            // ⬅️ derive active from URL; also treat subroutes as active
            const isActive =
              pathname === item.url ||
              (item.url !== "/" && pathname.startsWith(item.url));

            return (
              <Link
                key={item.name}
                href={item.url}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                  "text-foreground/80 hover:text-primary",
                  isActive && "bg-muted text-primary"
                )}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>

                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                      <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* --- Mobile Hamburger Menu Button --- */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-3 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full shadow-md hover:bg-white transition-colors"
        >
          <Menu className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* --- Mobile Full Screen Menu Overlay --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#FFFAF7] flex flex-col p-6 md:hidden"
          >
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-8 h-8 text-black" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 mt-8">
              {navItems.map((item, index) => {
                const isActive =
                  pathname === item.url ||
                  (item.url !== "/" && pathname.startsWith(item.url));

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.url}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-4 text-3xl font-bold",
                        isActive ? "text-primary" : "text-gray-800"
                      )}
                    >
                      <item.icon className="w-8 h-8" />
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="mt-auto mb-8 text-center text-gray-500">
              <p>© 2025 Equilibrate AI</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
