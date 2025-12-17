"use client";

import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";

const steps = [
  {
    id: "01",
    title: "CONSULTATION",
    description:
      "In-depth discussion regarding your product concept, categories, quantity targets, and budget alignment.",
  },
  {
    id: "02",
    title: "SAMPLING",
    description:
      "Explore our ready-to-use formulations or develop a custom formula tailored to your specific vision.",
  },
  {
    id: "03",
    title: "PRODUCTION",
    description:
      "High-quality manufacturing process with an estimated efficient turnaround time of 30 to 60 working days.",
  },
  {
    id: "04",
    title: "LAUNCH SUPPORT",
    description:
      "Full assistance with regulatory compliance (BPOM), packaging design, and marketing guidelines for launch.",
  },
];

// Single Item Animation
const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function ProcessSection() {
  return (
    <section className="bg-roxy-white py-24">
      <Container>
        {/* 1. Header (Triggered separately so it's always seen first) */}
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
            / 4
          </span>
        </div>

        {/* 2. The List */}
        <div className="flex flex-col border-t border-roxy-graphite/20">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }} // 👈 Triggers ONLY when this specific item is scrolled to
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-8 border-b border-roxy-graphite/20 group cursor-default"
            >
              {/* Column 1: Number & Title */}
              <div className="md:col-span-4 flex items-baseline gap-6">
                <span className="font-mono text-sm text-roxy-black font-bold tracking-widest">
                  {step.id}
                </span>
                <h3 className="text-lg font-bold tracking-widest text-roxy-black uppercase group-hover:text-roxy-graphite transition-colors">
                  {step.title}
                </h3>
              </div>

              {/* Column 2: Description */}
              <div className="md:col-span-8">
                <p className="text-xl md:text-2xl font-light text-roxy-black leading-relaxed opacity-90">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
