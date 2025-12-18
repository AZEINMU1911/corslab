/**
 * Shared app-level types.
 * These are intentionally small and section-focused; most sections define their
 * own local data arrays (e.g., `products`, `steps`, `faqs`) using these shapes.
 */
export interface Product {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  textColor: string;
  imgUrl: string;
}

export interface StatItem {
  /** Display value (often numeric, but stored as string for easy formatting). */
  value: string;
  label: string;
}

export interface FAQItemData {
  id: string;
  question: string;
  answer: string;
}
