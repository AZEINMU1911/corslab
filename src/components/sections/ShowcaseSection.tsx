"use client";

// --- Imports ---

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/media";
import type { ShowcaseData, Product } from "@/types";

// --- Main Component ---

export default function ShowcaseSection({ data }: { data?: ShowcaseData }) {
  // 1. Normalize CMS data so the UI can render even if Strapi is incomplete.
  // Why: This avoids hard crashes during initial CMS wiring.
  const products = data?.Product || [];

  return (
    <section className="relative w-full bg-white">
      <div className="relative">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}

// --- Subcomponents ---

function ProductCard({ product, index }: { product: Product; index: number }) {
  // 1. Use a per-card ref so each card gets its own scroll timeline.
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  // 2. Animate text based on scroll progress for a "reveal" as the card becomes sticky.
  // Why: A scroll-tied motion reads premium without requiring user interaction.
  const textParallaxY = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // 3. Resolve Strapi media to an absolute URL (and keep a local fallback).
  const imgUrl = getStrapiMedia(product.Image?.url ?? null) || "/assets/2.jpg";

  // 4. Format the index for the UI label (0 -> "01", 1 -> "02").
  const displayId = (index + 1).toString().padStart(2, "0");

  return (
    <div ref={cardRef} className="sticky top-0 h-screen w-full overflow-hidden">
      {/* --- Background Image Layer --- */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={imgUrl}
          alt={product.Name}
          fill
          className="object-cover"
          priority={index === 0}
          unoptimized
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* --- Foreground Text Overlay --- */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          style={{ y: textParallaxY, opacity: textOpacity }}
          className="max-w-4xl space-y-6"
        >
          <div className="flex flex-col items-center gap-4 mb-2">
            <span className="font-mono text-sm tracking-widest text-white/90 uppercase border border-white/30 px-3 py-1 rounded-full backdrop-blur-md">
              {displayId}
            </span>
          </div>

          {/* Strapi: product.Name */}
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.9] text-white drop-shadow-md">
            {product.Name}
          </h2>

          {/* Strapi: product.Description */}
          <p className="text-lg md:text-2xl font-light text-white/90 max-w-2xl mx-auto drop-shadow-sm">
            {product.Description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
