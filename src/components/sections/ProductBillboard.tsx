"use client";

// --- Imports ---

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/media";
import type { AboutData } from "@/types";

// --- Main Component ---

export default function ProductBillboard({ data }: { data?: AboutData }) {
  // 1. Scope the scroll progress to this section so the parallax only responds
  // while the billboard is in view.
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 2. Translate the background image as the user scrolls for a "slow pan" feel.
  // Why: Parallax adds depth without changing layout.
  const y = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

  // 3. Resolve Strapi media to a browser-loadable URL (with a local fallback).
  const imgUrl =
    getStrapiMedia(data?.ProductImage?.url ?? null) || "/assets/4.jpg";

  return (
    <section
      ref={containerRef}
      className="relative h-[90vh] w-full overflow-hidden bg-[#E8DCCF]"
    >
      {/* --- Background Image --- */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[125%] -top-[12.5%]"
      >
        <Image
          src={imgUrl}
          alt={data?.ProductImage?.alternativeText || "Product Showcase"}
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </motion.div>

      {/* --- Contrast Overlay --- */}
      <div className="absolute inset-0 bg-black/5" />

      {/* --- Decorative Plus Marks --- */}
      <div className="absolute inset-0 pointer-events-none p-8 md:p-12 flex flex-col justify-between">
        {/* Top Left */}
        <div className="text-white/80 text-5xl font-light">+</div>

        {/* Bottom Right */}
        <div className="text-white/80 text-5xl font-light self-end">+</div>
      </div>
    </section>
  );
}
