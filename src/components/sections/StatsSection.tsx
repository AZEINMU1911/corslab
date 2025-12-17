"use client";

import { Container } from "@/components/ui/Container";
import { motion, useSpring, useInView, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { value: "15", label: "YEARS" },
  { value: "44", label: "PROJECTS" },
  { value: "8", label: "AWARDS" },
  { value: "32", label: "CLIENTS" },
];

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const numericValue = parseInt(value.replace(/\D/g, ""));

  const count = useMotionValue(0);
  const rounded = useSpring(count, { mass: 0.8, stiffness: 75, damping: 15 });

  useEffect(() => {
    if (isInView) count.set(numericValue);
  }, [isInView, numericValue, count]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      if (ref.current)
        ref.current.textContent = Math.round(latest).toLocaleString();
    });
    return () => unsubscribe();
  }, [rounded]);

  return <span ref={ref} />;
}

export default function StatsSection() {
  return (
    <section className="bg-roxy-white py-24 border-b border-roxy-graphite/10">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center md:items-start group relative"
            >
              <div className="text-6xl md:text-7xl font-semibold tracking-tight text-roxy-black mb-2 flex items-baseline">
                <Counter value={stat.value} />
                {/* Dot only appears on hover */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="w-2 h-2 bg-roxy-black rounded-full mb-2 ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <span className="text-xs font-bold tracking-[0.2em] text-roxy-graphite uppercase pl-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
