"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// Placeholder data based on your screenshots
const products = [
  {
    id: "01",
    title: "Organic Radiance",
    subtitle: "Ophélie Serum",
    category: "SKINCARE",
    color: "bg-[#EAE4DC]", // Beige/Paper texture color
    textColor: "text-roxy-black",
    imgUrl: "/placeholder-serum.jpg", // You will replace this later
  },
  {
    id: "02",
    title: "Luxury Age-Defying",
    subtitle: "Night Repair",
    category: "ANTI-AGING",
    color: "bg-[#2A2A2A]", // Dark luxury color
    textColor: "text-roxy-white",
    imgUrl: "/placeholder-dark.jpg",
  },
  {
    id: "03",
    title: "Body Wellness",
    subtitle: "Silk Lotion",
    category: "BODYCARE",
    color: "bg-[#D9EFE7]", // Brand Mint
    textColor: "text-roxy-black",
    imgUrl: "/placeholder-mint.jpg",
  },
];

function ProductCard({ product, index }: { product: any; index: number }) {
  const containerRef = useRef(null);

  // Create a slight parallax effect for the text inside the card
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div
      ref={containerRef}
      className={`sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden ${product.color}`}
    >
      <div className="relative w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
        {/* Left Side: Text Content */}
        <motion.div
          style={{ y: textY, opacity }}
          className="relative z-10 flex flex-col justify-center order-2 md:order-1"
        >
          <span
            className={`text-xs font-mono tracking-widest mb-4 opacity-60 ${product.textColor}`}
          >
            {product.id} — {product.category}
          </span>
          <h2
            className={`text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.9] mb-4 ${product.textColor}`}
          >
            {product.title}
          </h2>
          <p
            className={`text-xl md:text-2xl font-light opacity-80 ${product.textColor}`}
          >
            {product.subtitle}
          </p>

          <button
            className={`mt-12 w-fit px-8 py-4 rounded-full border border-current text-sm font-medium uppercase tracking-wider hover:opacity-50 transition-opacity ${product.textColor}`}
          >
            View Formulation
          </button>
        </motion.div>

        {/* Right Side: Image Placeholder */}
        <div className="relative h-[50vh] md:h-[70vh] w-full order-1 md:order-2 flex items-center justify-center">
          {/* Once you have real images:
                <Image src={product.imgUrl} alt={product.title} fill className="object-contain" />
             */}
          <div className="w-64 h-96 bg-black/5 rounded-full blur-3xl absolute" />
          <div className="relative w-full h-full border border-current opacity-20 flex items-center justify-center rounded-lg">
            <span className={`font-mono text-xs ${product.textColor}`}>
              [ Product Image Area ]
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShowcaseSection() {
  return (
    <section className="relative w-full bg-roxy-white">
      {/* Introduction Title */}
      <div className="py-24 md:py-32 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-light tracking-wide text-roxy-black">
          Build Your Beauty Brand <br /> with a{" "}
          <span className="font-semibold">Trusted Lab</span>
        </h2>
        <button className="mt-8 px-8 py-3 bg-roxy-beige text-roxy-black font-semibold rounded-sm">
          Start Maklon Now
        </button>
      </div>

      {/* The Stack */}
      <div className="relative">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {/* Footer Spacer */}
      <div className="h-[20vh] bg-roxy-black text-white flex items-center justify-center">
        <p className="font-mono text-sm opacity-50">
          © 2025 ROXY COSLAB. ALL RIGHTS RESERVED.
        </p>
      </div>
    </section>
  );
}
