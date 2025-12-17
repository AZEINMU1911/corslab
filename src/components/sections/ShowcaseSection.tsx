"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import type { Product } from "@/types";

const products: Product[] = [
  {
    id: "01",
    title: "Organic Radiance",
    subtitle: "Clean beauty formulations derived from nature's best.",
    category: "Series",
    color: "bg-[#EAE4DC]",
    textColor: "text-white",
    imgUrl: "/assets/2.jpg",
  },
  {
    id: "02",
    title: "Luxury Age-Defying",
    subtitle: "Premium potent ingredients tailored for timeless beauty.",
    category: "Collection",
    color: "bg-[#2A2A2A]",
    textColor: "text-white",
    imgUrl: "/assets/3.jpg",
  },
  {
    id: "03",
    title: "Modern Urban Daily",
    subtitle: "Functional, fast-absorbing skincare for the modern lifestyle.",
    category: "Essentials",
    color: "bg-[#D9EFE7]",
    textColor: "text-white",
    imgUrl: "/assets/5.jpg",
  },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  // Parallax Text: Moves slightly slower than the background
  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);

  // FIX 1: Opacity only fades IN (0 to 1) and stays at 1. It does not fade out.
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="sticky top-0 h-screen w-full overflow-hidden"
    >
      {/* 1. Full Screen Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={product.imgUrl}
          alt={product.title}
          fill
          className="object-cover"
          priority={index === 0}
        />
        {/* Subtle Dark Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* 2. Centered Text Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div style={{ y, opacity }} className="max-w-4xl space-y-6">
          {/* FIX 2: Removed the Dot, kept only the ID */}
          <div className="flex flex-col items-center gap-4 mb-2">
            <span className="font-mono text-sm tracking-widest text-white/90 uppercase border border-white/30 px-3 py-1 rounded-full backdrop-blur-md">
              {product.id} — {product.category}
            </span>
          </div>

          {/* Large Editorial Headline */}
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.9] text-white drop-shadow-md">
            {product.title}
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-2xl font-light text-white/90 max-w-2xl mx-auto drop-shadow-sm">
            {product.subtitle}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function ShowcaseSection() {
  return (
    <section className="relative w-full bg-roxy-white">
      {/* The Sticky Stack */}
      <div className="relative">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {/* Final Footer Spacer */}
      <div className="h-[20vh] bg-roxy-black text-white flex items-center justify-center z-20 relative">
        <p className="font-mono text-sm opacity-50">
          © 2025 ROXY COSLAB. ALL RIGHTS RESERVED.
        </p>
      </div>
    </section>
  );
}
