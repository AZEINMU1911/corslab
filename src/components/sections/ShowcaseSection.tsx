"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/media"; // 👈 Added this
import type { ShowcaseData, Product } from "@/types"; // 👈 Updated imports

/**
 * ShowcaseSection
 * - Restored to your original Full-Screen Sticky design.
 * - Now powered by Strapi data.
 */

export default function ShowcaseSection({ data }: { data?: ShowcaseData }) {
  // Fallback if data is missing
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

// -----------------------------------------------------------------------------
// Subcomponent: The Sticky Card
// -----------------------------------------------------------------------------

function ProductCard({ product, index }: { product: Product; index: number }) {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  // Text enters as the card reaches the viewport: slides up and fades in.
  const textParallaxY = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // 1. Get Image URL from Strapi
  const imgUrl = getStrapiMedia(product.Image?.url ?? null) || "/assets/2.jpg";

  // 2. Format the Index (0 -> "01", 1 -> "02")
  const displayId = (index + 1).toString().padStart(2, "0");

  return (
    <div ref={cardRef} className="sticky top-0 h-screen w-full overflow-hidden">
      {/* Background image layer per product. */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={imgUrl}
          alt={product.Name}
          fill
          className="object-cover"
          priority={index === 0}
          unoptimized // 👈 Added: Safety for Localhost images
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
