"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import type { AboutData } from "@/types";

export default function HeroSection({ data }: { data?: AboutData }) {
  if (!data) return null;
  const stats = data.Stats || [];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <Container>
        {/* GRID LAYOUT: 1 column for Plus, 11 columns for Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* THE BLACK PLUS */}
          <div className="hidden md:block md:col-span-1">
            <span className="text-5xl font-light text-[#1E1E1E]">+</span>
          </div>

          {/* CONTENT AREA */}
          <div className="md:col-span-11 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <h2 className="text-5xl md:text-7xl font-medium text-[#1E1E1E] mb-8 leading-tight">
                {data.Headline}
              </h2>
              <p className="text-xl md:text-2xl text-[#1E1E1E]/70 font-light mb-20 leading-relaxed max-w-3xl mx-auto">
                {data.Subtitle}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 border-t border-black/10 pt-16">
                {stats.map((stat) => (
                  <div key={stat.id} className="flex flex-col items-center">
                    <h4 className="text-5xl md:text-7xl font-bold text-[#1E1E1E] mb-3">
                      {stat.Value}
                    </h4>
                    <span className="text-sm font-mono text-[#1E1E1E]/50 uppercase tracking-widest">
                      {stat.Label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
