export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  color: string;
  textColor: string;
  imgUrl: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface FAQItemData {
  id: string;
  question: string;
  answer: string;
}
