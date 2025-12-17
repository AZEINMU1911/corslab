"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container"; // Reusing your container

export default function VisionMission() {
  return (
    <section className="bg-roxy-white py-32">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Left Decoration */}
          <div className="md:col-span-2 hidden md:block pt-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-roxy-black"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>

          {/* Text Content */}
          <div className="md:col-span-10 space-y-16 max-w-4xl">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-sm font-mono tracking-widest text-roxy-graphite uppercase">
                Vision
              </h3>
              <p className="text-2xl md:text-3xl font-light text-roxy-black leading-relaxed">
                To establish market leadership through superior product quality
                and competitive pricing strategies.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-sm font-mono tracking-widest text-roxy-graphite uppercase">
                Mission
              </h3>
              <p className="text-2xl md:text-3xl font-light text-roxy-black leading-relaxed">
                To produce cosmetic excellence in full compliance with the
                principles of Good Manufacturing Practices (CPKB).
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
