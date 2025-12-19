"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/media";
import type { AboutData } from "@/types";

export default function ProductBillboard({ data }: { data?: AboutData }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);
  const imgUrl =
    getStrapiMedia(data?.ProductImage?.url ?? null) || "/assets/4.jpg";

  return (
    <section
      ref={containerRef}
      className="relative h-[90vh] w-full overflow-hidden bg-[#E8DCCF]"
    >
      {/* Background Image */}
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

      {/* Darken slightly for white text contrast */}
      <div className="absolute inset-0 bg-black/5" />

      {/* ➕ WHITE PLUS SIGNS (Overlay) */}
      <div className="absolute inset-0 pointer-events-none p-8 md:p-12 flex flex-col justify-between">
        {/* Top Left */}
        <div className="text-white/80 text-5xl font-light">+</div>

        {/* Bottom Right */}
        <div className="text-white/80 text-5xl font-light self-end">+</div>
      </div>
    </section>
  );
}
