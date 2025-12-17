"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll to toggle the background style
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-black/5"
          : "bg-transparent"
      }`}
    >
      <Container className="flex items-center justify-between h-20 md:h-24">
        {/* Logo */}
        <Link href="/" className="relative w-10 h-10 md:w-12 md:h-12">
          {/* We use the logo icon. 
               Note: If you have a dark version for the white background, swap it here. 
               For now, we assume the logo is visible or you use a mix-blend-mode.
           */}
          <Image
            src="/CoslabWhite.png" // If this is white, it might be hard to see on white bg sections
            // PRO TIP: Use a CSS filter to invert it on white backgrounds if needed,
            // or swap the src based on 'isScrolled'
            className={`object-contain transition-all duration-300 ${
              isScrolled ? "invert filter" : ""
            }`}
            alt="Roxy Coslab"
            fill
          />
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          {["Services", "Process", "FAQ", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`text-sm font-medium tracking-widest uppercase transition-colors ${
                isScrolled
                  ? "text-roxy-black hover:text-roxy-graphite"
                  : "text-white hover:text-white/70"
              }`}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <button
          className={`px-6 py-2 rounded-sm text-xs font-bold uppercase tracking-widest border transition-colors ${
            isScrolled
              ? "border-roxy-black text-roxy-black hover:bg-roxy-black hover:text-white"
              : "border-white text-white hover:bg-white hover:text-roxy-black"
          }`}
        >
          Book Consultation
        </button>
      </Container>
    </motion.header>
  );
}
