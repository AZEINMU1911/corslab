// --- Global Types ---

// NOTE: Keys must match Strapi API response exactly (Capitalized).
// Why: Strapi v5 responses are case-sensitive, and runtime access like `data.headline`
// will silently be `undefined` if the CMS key is `Headline`.

// --- Shared Strapi Primitives ---
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

// --- Main Hero Section Data ---

export interface MainHeroData {
  Main: {
    Headline: string;
    Subheading: string;
    BackgroundImage: StrapiImage;
    Logo: StrapiImage;
  };
  MaklonButton: StrapiButton;
}

// --- About Section Data (Shared CMS Source) ---

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

// --- Process Section Data ---

export interface ProcessStep {
  id: number;
  Step: number;
  Title: string;
  Description: string;
}

// --- Showcase Section Data ---

export interface Product {
  id: number;
  Name: string; // Strapi sends "Name"
  Description: string; // Strapi sends "Description"
  Image: StrapiImage; // Strapi sends "Image"
}

export interface ShowcaseData {
  Product: Product[];
}

// --- FAQ Section Data ---

export interface FAQItemData {
  id: number;
  Question: string; // Strapi sends "Question" (capitalized)
  Answer: string; // Strapi sends "Answer" (capitalized)
}

export interface FAQSectionData {
  SectionTitle: string;
  SupportingText: string;
  Questions: FAQItemData[];
  ProductShowcase: StrapiImage; // The "Unfurling Image"
}
