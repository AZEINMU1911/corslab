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
import { getStrapiMedia } from "@/lib/media";
import type { FAQSectionData, FAQItemData } from "@/types";

// -----------------------------------------------------------------------------
// Subcomponents
// -----------------------------------------------------------------------------

// 1. UPDATED: Accepts 'imgUrl' prop now
function UnfurlingImage({ imgUrl }: { imgUrl: string }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[60vh] md:h-[80vh] my-24 overflow-hidden"
    >
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-full bg-[#EAE4DC]"
      >
        <motion.div
          style={{ y: parallaxY }}
          className="relative w-full h-[120%] -top-[10%]"
        >
          {/* Dynamic Image from Strapi */}
          <Image
            src={imgUrl}
            alt="Cosmetic production detail"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/5" />
        </motion.div>

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

// 2. UPDATED: Reads Capitalized Keys (Question, Answer)
function FAQItem({
  item,
  index,
  isOpen,
  onClick,
}: {
  item: FAQItemData;
  index: number;
  isOpen: boolean;
  onClick: () => void;
}) {
  const displayId = String(index + 1).padStart(2, "0");
  return (
    <div className="border-b border-[#1E1E1E]/20 last:border-none">
      <button
        onClick={onClick}
        className="w-full py-8 flex items-start justify-between text-left group"
      >
        <div className="flex items-baseline gap-6 md:gap-12">
          <span className="font-mono text-sm text-[#1E1E1E]/60 font-bold tracking-widest min-w-[30px]">
            / {displayId}
          </span>
          {/* Strapi sends 'Question' */}
          <h3 className="text-xl md:text-2xl font-medium text-[#1E1E1E] group-hover:opacity-70 transition-opacity pr-8">
            {item.Question}
          </h3>
        </div>

        <div className="relative w-6 h-6 flex-shrink-0 text-[#1E1E1E] mt-1">
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
              {/* Strapi sends 'Answer' */}
              <p className="text-lg font-light text-[#1E1E1E] leading-relaxed">
                {item.Answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export default function FAQSection({ data }: { data?: FAQSectionData }) {
  // 1. Extract Data
  const title = data?.SectionTitle || "FAQ";
  const desc =
    data?.SupportingText || "Starting a beauty brand involves many details...";
  const faqs = data?.Questions || [];

  // 2. Extract Image (ProductShowcase)
  const interludeImg =
    getStrapiMedia(data?.ProductShowcase?.url ?? null) || "/assets/6.jpg";

  // State
  const [openId, setOpenId] = useState<number | null>(faqs[0]?.id ?? null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-medium text-[#1E1E1E] tracking-tight mb-8"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-[#1E1E1E] font-light leading-relaxed"
          >
            {desc}
          </motion.p>
        </div>
      </Container>

      {/* Dynamic Interlude Image */}
      <UnfurlingImage imgUrl={interludeImg} />

      <Container>
        {/* Accordion List */}
        <div className="max-w-5xl mx-auto border-t border-[#1E1E1E]/20">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.id}
              item={faq}
              index={index}
              isOpen={openId === faq.id}
              onClick={() => toggleFAQ(faq.id)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
