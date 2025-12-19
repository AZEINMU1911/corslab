"use client";

import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import type { ProcessStep } from "@/types";

/**
 * This section is a Client Component (`"use client"`) even though it receives
 * data from the server.
 *
 * Why it must be client-side:
 * - Framer Motion performs animations in the browser (it needs the DOM).
 * - Next.js requires components using client-only libraries to opt into client
 *   rendering via `"use client"`.
 *
 * Data flow (important mental model):
 * - `src/app/page.tsx` (Server Component) fetches CMS data from Strapi.
 * - It passes just the needed slice (`ProcessSection`) into this component.
 * - This component focuses on UI + animation, not networking.
 */

/**
 * The minimal shape of a single "process step" we expect from Strapi.
 *
 * Why we type it:
 * - It documents the contract between Strapi and the frontend.
 * - It helps catch mismatches early (e.g. Strapi field renamed).
 */

/**
 * Props for `ProcessSection`.
 *
 * Why `data` is optional:
 * - When the page is first being wired up, Strapi may not have content yet.
 * - Network issues can cause the fetcher to return `null`.
 * - Making it optional lets the UI fail gracefully instead of throwing.
 */
interface ProcessSectionProps {
  data?: {
    Process: ProcessStep[];
  };
}

// Animation Settings
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ProcessSection({ data }: ProcessSectionProps) {
  /**
   * Fallback strategy:
   * - If Strapi returned steps, render them.
   * - If not, render an empty list (so the section still mounts, but shows `0`).
   *
   * Why we don't hardcode fallback steps here:
   * - Hardcoded steps are great for prototyping, but they can drift from the CMS
   *   and confuse content editors ("I changed Strapi but the site didn't change").
   * - If you want a design-time placeholder, consider showing a skeleton UI or a
   *   short "Content coming soon" message instead of fake content.
   */
  const steps = data?.Process || [];

  return (
    <section className="bg-roxy-white py-24">
      <Container>
        {/* Header */}
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

        {/* Dynamic list driven by CMS data (Strapi). */}
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
              {/* Column 1: Number & Title */}
              <div className="md:col-span-4 flex items-baseline gap-6">
                <span className="font-mono text-sm text-roxy-black font-bold tracking-widest">
                  {/* Ensures single digits get a zero (e.g. "1" -> "01") */}
                  {String(step.Step).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-bold tracking-widest text-roxy-black uppercase group-hover:text-roxy-graphite transition-colors">
                  {step.Title}
                </h3>
              </div>

              {/* Column 2: Description */}
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
