/**
 * IMPORTANT: These interfaces mirror the Strapi v5 response structure.
 * Keys are Case-Sensitive (e.g., "Headline", not "headline").
 */

// --- SHARED HELPERS ---
export interface StrapiImage {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface StrapiButton {
  Title: string;
  URL: string | null;
}

// --- COMPONENT SPECIFIC TYPES ---

// 1. Main Hero (The big banner)
export interface MainHeroData {
  Main: {
    Headline: string;
    Subheading: string;
    BackgroundImage: StrapiImage;
    Logo: StrapiImage;
  };
  MaklonButton: StrapiButton;
}

// 2. About Section (The text + stats)
export interface StatItem {
  id: number;
  Label: string; // Strapi sends "Label"
  Value: string; // Strapi sends "Value"
}

export interface AboutData {
  Headline: string;
  Subtitle: string;
  Stats: StatItem[];
  ProductImage: StrapiImage;
  Vision: {
    Label: string;
    Value: string;
  };
  Mission: {
    Label: string;
    Value: string;
  };
}

// 3. Process Section
export interface ProcessStep {
  id: number;
  Step: number;
  Title: string;
  Description: string;
}

// 4. Showcase / Products
export interface Product {
  id: number;
  Name: string; // Strapi sends "Name"
  Description: string; // Strapi sends "Description"
  // Add image here later if your content type has one
}

// 5. FAQ
export interface FAQItemData {
  id: number;
  Question: string; // Strapi sends "Question"
  Answer: string; // Strapi sends "Answer"
}
