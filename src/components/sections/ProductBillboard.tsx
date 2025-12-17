"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ProductBillboard() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax: The image moves slower than the scroll, creating depth
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[80vh] overflow-hidden bg-roxy-white"
    >
      {/* The Parallax Image Container */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        {/* ⚠️ PLACE ASSET HERE: The "Billboard" Image 
            Use a high-quality landscape photo of a product setup.
        */}
        <Image
          src="/assets/4.jpg"
          alt="Cosmetic Billboard"
          fill
          className="object-cover"
        />
        {/* Dark overlay for "Cinematic" feel */}
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>

      {/* Optional Markers (The '+' icons seen in screenshots) */}
      <div className="absolute top-12 left-12 text-white/80">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </div>
      <div className="absolute bottom-12 right-12 text-white/80">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </div>
    </section>
  );
}
