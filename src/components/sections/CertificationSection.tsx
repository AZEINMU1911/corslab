"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import Image from "next/image";

/**
 * CertificationSection
 * - Header/copy + horizontally scrolling "infinite" logo track.
 * - The marquee effect is created by duplicating the logo list and shifting
 *   the track by half its width (`x: ["0%", "-50%"]`).
 *
 * Common edits:
 * - Logos: update `certificationLogos` (src/alt) and ensure assets exist in `public/assets/`
 * - Speed: tweak `transition.duration`
 * - Spacing: tweak the `gap-*` and `px-*` classes on the track wrapper
 */
const certificationLogos = [
  { id: "iso", src: "/assets/iso.png", alt: "ISO Certified" },
  { id: "gmp", src: "/assets/gmp.png", alt: "GMP Quality" },
  { id: "cpkb", src: "/assets/cpkb.png", alt: "CPKB Certified" },
  { id: "bpom", src: "/assets/bpom.png", alt: "Badan POM" },
  { id: "halal", src: "/assets/halal.png", alt: "Halal Indonesia" },
  { id: "derma", src: "/assets/derma.png", alt: "Derma Certified" },
];

export default function CertificationSection() {
  // Duplicate the list so the marquee can wrap seamlessly.
  const loopLogos = [...certificationLogos, ...certificationLogos];

  return (
    <section className="bg-roxy-white py-24 border-t border-roxy-graphite/10">
      <Container>
        {/* Section header/copy. */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-medium text-roxy-black tracking-tight mb-8"
          >
            
            International Standard Certification
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-roxy-graphite font-light leading-relaxed"
          >
            Our manufacturing process is built on a foundation of rigorous
            compliance. From BPOM regulations to CPKB standards, we guarantee
            top-quality cosmetic production that builds strong consumer trust
            and opens access to global markets.
          </motion.p>
        </div>
      </Container>

      {/* Marquee area (with gradient fades at left/right edges). */}
      <div className="relative w-full overflow-hidden py-8">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-roxy-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-roxy-white to-transparent z-10" />

        <motion.div
          className="flex items-center gap-16 md:gap-32 w-max px-16"
          // Shift by half the track because the list is duplicated.
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 30,
            repeat: Infinity,
          }}
        >
          {loopLogos.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
