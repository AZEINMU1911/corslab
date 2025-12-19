"use client";

// --- Imports ---

import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import type { ProcessStep } from "@/types";

// --- Types ---

// Why `data` is optional: CMS content can be missing during setup, or fetches can fail.
interface ProcessSectionProps {
  data?: {
    Process: ProcessStep[];
  };
}

// --- Animation Variants ---

// Why: Define motion variants once so the list remains consistent and tweakable.
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// --- Main Component ---

export default function ProcessSection({ data }: ProcessSectionProps) {
  // 1. Normalize CMS data to avoid runtime errors when mapping.
  // Why: We prefer an empty list over hardcoded steps to avoid drifting from the CMS.
  const steps = data?.Process || [];

  return (
    <section className="bg-roxy-white py-24">
      <Container>
        {/* --- Header --- */}
        <div className="mb-16 flex items-baseline gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-medium text-roxy-black tracking-tight"
          >
            Fast, Simple, Transparent
          </motion.h2>
          <span className="text-xl font-mono text-roxy-graphite opacity-50">
            / {steps.length}
          </span>
        </div>

        {/* --- Steps List (CMS-Driven) --- */}
        <div className="flex flex-col border-t border-roxy-graphite/20">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-8 border-b border-roxy-graphite/20 group cursor-default"
            >
              {/* --- Column 1: Number + Title --- */}
              <div className="md:col-span-4 flex items-baseline gap-6">
                <span className="font-mono text-sm text-roxy-black font-bold tracking-widest">
                  {/* Why: Keep label widths stable by padding single digits ("1" -> "01"). */}
                  {String(step.Step).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-bold tracking-widest text-roxy-black uppercase group-hover:text-roxy-graphite transition-colors">
                  {step.Title}
                </h3>
              </div>

              {/* --- Column 2: Description --- */}
              <div className="md:col-span-8">
                <p className="text-xl md:text-2xl font-light text-roxy-black leading-relaxed opacity-90">
                  {step.Description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
