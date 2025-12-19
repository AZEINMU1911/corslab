"use client";

// --- Imports ---

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import type { AboutData } from "@/types";

// --- Main Component ---

// Why: Uses `AboutData` because Strapi exposes Vision/Mission as part of the shared `AboutSection` payload.
export default function VisionMission({ data }: { data?: AboutData }) {
  // 1. Guard against missing CMS data.
  if (!data) return null;

  // 2. Extract Strapi data with fallbacks to keep the section readable during CMS setup.
  const visionLabel = data.Vision?.Label || "Vision";
  const visionText =
    data.Vision?.Value ||
    "To establish market leadership through superior product quality and competitive pricing strategies.";

  const missionLabel = data.Mission?.Label || "Mission";
  const missionText =
    data.Mission?.Value ||
    "To produce cosmetic excellence in full compliance with the principles of Good Manufacturing Practices (CPKB).";

  return (
    <section className="bg-white py-32">
      <Container>
        {/* --- 2-Column Layout (Decoration + Copy) --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* --- Decorative Plus (Desktop) --- */}
          <div className="md:col-span-2 hidden md:block pt-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-[#1E1E1E]" // Used your hex color for consistency
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>

          {/* --- Copy Blocks (Vision + Mission) --- */}
          <div className="md:col-span-10 space-y-16 max-w-4xl">
            {/* --- Vision --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-sm font-mono tracking-widest text-[#1E1E1E]/60 uppercase">
                {visionLabel}
              </h3>
              {/* Why: 5XL is the intended "statement" size for this section. */}
              <p className="text-3xl md:text-5xl font-light text-[#1E1E1E] leading-tight">
                {visionText}
              </p>
            </motion.div>

            {/* --- Mission --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-sm font-mono tracking-widest text-[#1E1E1E]/60 uppercase">
                {missionLabel}
              </h3>
              {/* Why: Keep typography consistent with Vision for visual symmetry. */}
              <p className="text-3xl md:text-5xl font-light text-[#1E1E1E] leading-tight">
                {missionText}
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
