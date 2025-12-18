"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import type { Product } from "@/types";

/**
 * ShowcaseSection
 * - Stacked "sticky" product cards: each card is a full-screen panel that
 *   stays pinned while its text parallax/fades into place.
 *
 * Common edits:
 * - Card content: update the `products` array (id/title/subtitle/imgUrl)
 * - Motion: tweak the `useScroll` offsets + `useTransform` ranges in `ProductCard`
 */

// -----------------------------------------------------------------------------
// Content data
// -----------------------------------------------------------------------------

const products: Product[] = [
  {
    id: "01",
    title: "Organic Radiance",
    subtitle: "Clean beauty formulations derived from nature's best.",
    color: "bg-[#EAE4DC]",
    textColor: "text-white",
    imgUrl: "/assets/2.jpg",
  },
  {
    id: "02",
    title: "Luxury Age-Defying",
    subtitle: "Premium potent ingredients tailored for timeless beauty.",
    color: "bg-[#2A2A2A]",
    textColor: "text-white",
    imgUrl: "/assets/3.jpg",
  },
  {
    id: "03",
    title: "Modern Urban Daily",
    subtitle: "Functional, fast-absorbing skincare for the modern lifestyle.",
    color: "bg-[#D9EFE7]",
    textColor: "text-white",
    imgUrl: "/assets/5.jpg",
  },
];

// -----------------------------------------------------------------------------
// Subcomponents
// -----------------------------------------------------------------------------

// Single sticky panel. The card's scroll progress is scoped to itself so the
// text animation repeats per-card while the image stays full-bleed.
function ProductCard({ product, index }: { product: Product; index: number }) {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  // Text enters as the card reaches the viewport: slides up and fades in.
  const textParallaxY = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div
      ref={cardRef}
      className="sticky top-0 h-screen w-full overflow-hidden"
    >
      {/* Background image layer per product. */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={product.imgUrl}
          alt={product.title}
          fill
          className="object-cover"
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Foreground text overlay. */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          style={{ y: textParallaxY, opacity: textOpacity }}
          className="max-w-4xl space-y-6"
        >
          <div className="flex flex-col items-center gap-4 mb-2">
            <span className="font-mono text-sm tracking-widest text-white/90 uppercase border border-white/30 px-3 py-1 rounded-full backdrop-blur-md">
              {product.id}
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.9] text-white drop-shadow-md">
            {product.title}
          </h2>

          <p className="text-lg md:text-2xl font-light text-white/90 max-w-2xl mx-auto drop-shadow-sm">
            {product.subtitle}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main component
// -----------------------------------------------------------------------------

export default function ShowcaseSection() {
  return (
    <section className="relative w-full bg-roxy-white">
      <div className="relative">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
