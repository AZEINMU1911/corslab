"use client";

import { Container } from "@/components/ui/Container";
import { useSpring, useInView, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import type { StatItem } from "@/types";

const stats: StatItem[] = [
  { value: "2", label: "YEARS" },
  { value: "10", label: "PROJECTS" },
  { value: "670", label: "AWARDS" },
  { value: "4200", label: "CLIENTS" },
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
    <section className="bg-roxy-white py-12 border-b border-roxy-graphite/10">
      <Container>
        {/* 1. grid-cols-2: Forces 2 columns on ALL screen sizes (creating the 2x2 grid).
           2. max-w-4xl mx-auto: Keeps the grid centered and prevents it from being too wide.
        */}
        <div className="grid grid-cols-2 gap-y-16 gap-x-12 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              // 3. Removed 'md:items-start' so items stay perfectly centered
              className="flex flex-col items-center group relative"
            >
              <div className="text-6xl md:text-7xl font-semibold tracking-tight text-roxy-black mb-2 flex items-baseline">
                <Counter value={stat.value} />
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
