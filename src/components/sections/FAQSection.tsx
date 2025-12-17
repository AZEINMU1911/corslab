"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import type { FAQItemData } from "@/types";

// --- DATA ---
const faqs: FAQItemData[] = [
  {
    id: "01",
    question: "What is the Minimum Order Quantity (MOQ)?",
    answer:
      "Our standard MOQ starts at 1,500 pieces per SKU. However, ordering in larger quantities allows us to offer a more competitive price per unit (economies of scale).",
  },
  {
    id: "02",
    question: "Can I create a custom formula?",
    answer:
      "Absolutely. Our R&D team specializes in custom formulations. We can modify existing bases or create entirely new products to match your specific benchmark and vision.",
  },
  {
    id: "03",
    question: "How long does the manufacturing process take?",
    answer:
      "Typically, the timeline is 30-60 working days after sample approval and down payment. This includes material sourcing, production, quality control, and filling.",
  },
  {
    id: "04",
    question: "Do you assist with BPOM registration?",
    answer:
      "Yes, we handle the entire BPOM notification process for you. Our regulatory team ensures your products meet all Indonesian cosmetic safety standards before launch.",
  },
];

// --- SUB-COMPONENT: ACCORDION ITEM ---
function FAQItem({
  item,
  isOpen,
  onClick,
}: {
  item: FAQItemData;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-roxy-graphite/20 last:border-none">
      <button
        onClick={onClick}
        className="w-full py-8 flex items-start justify-between text-left group"
      >
        <div className="flex items-baseline gap-6 md:gap-12">
          <span className="font-mono text-sm text-roxy-graphite/60 font-bold tracking-widest min-w-[30px]">
            / {item.id}
          </span>
          <h3 className="text-xl md:text-2xl font-medium text-roxy-black group-hover:opacity-70 transition-opacity pr-8">
            {item.question}
          </h3>
        </div>

        {/* Animated Icon */}
        <div className="relative w-6 h-6 flex-shrink-0 text-roxy-black mt-1">
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0, opacity: isOpen ? 0 : 1 }}
            className="absolute inset-0"
          >
            <Plus strokeWidth={1.5} />
          </motion.div>
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 0 : -180, opacity: isOpen ? 1 : 0 }}
            className="absolute inset-0"
          >
            <Minus strokeWidth={1.5} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pl-0 md:pl-[80px] pb-10 max-w-3xl">
              <p className="text-lg font-light text-roxy-graphite leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENT: PARALLAX IMAGE ---
function UnfurlingImage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax: Image moves slightly slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[60vh] md:h-[80vh] my-24 overflow-hidden"
    >
      {/* Mask Container */}
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)" }} // Hidden (wiped right)
        whileInView={{ clipPath: "inset(0 0% 0 0)" }} // Visible (unfurled)
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // Smooth ease
        className="relative w-full h-full bg-roxy-beige"
      >
        <motion.div
          style={{ y }}
          className="relative w-full h-[120%] -top-[10%]"
        >
          {/* ⚠️ PLACE ASSET HERE: The "Red Bottle" Image */}
          <Image
            src="/assets/6.jpg"
            alt="Cosmetic production detail"
            fill
            className="object-cover"
          />
          {/* Optional: Subtle grain or overlay */}
          <div className="absolute inset-0 bg-black/5" />
        </motion.div>

        {/* Markers (from screenshot) */}
        <div className="absolute top-12 left-12 text-white/80 z-10">
          <Plus size={20} />
        </div>
        <div className="absolute bottom-12 right-12 text-white/80 z-10">
          <Plus size={20} />
        </div>
      </motion.div>
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("01"); // First one open by default

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-roxy-white py-24 md:py-32">
      <Container>
        {/* 1. Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-medium text-roxy-black tracking-tight mb-8"
          >
            FAQ
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-roxy-graphite font-light leading-relaxed"
          >
            Starting a beauty brand involves many details, from formulation to
            regulation. Here, we clarify the essentials of our manufacturing
            process to help you move from concept to shelf with total confidence
            and transparency.
          </motion.p>
        </div>
      </Container>

      {/* 2. Full Width Image (Unfurl Animation) */}
      <UnfurlingImage />

      <Container>
        {/* 3. The Questions List */}
        <div className="max-w-5xl mx-auto border-t border-roxy-graphite/20">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              item={faq}
              isOpen={openId === faq.id}
              onClick={() => toggleFAQ(faq.id)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
