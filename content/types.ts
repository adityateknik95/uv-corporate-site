export interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
  image: string;
  imageAlt: string;
}

export interface PromoCard {
  id: string;
  category: string;
  title: string;
  description: string;
  href: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface RecognitionItem {
  id: string;
  number: string;
  title: string;
  description: string;
  source: string;
}

export interface CustomerStory {
  id: string;
  category: string;
  title: string;
  summary: string;
  fullStory: string;
  image: string;
  imageAlt: string;
}

export interface Capability {
  id: string;
  number: string;
  title: string;
  description: string;
  href: string;
}

export interface FeatureBanner {
  eyebrow: string;
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
  image: string;
  imageAlt: string;
}

export interface Insight {
  id: string;
  category: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
}

export interface ExpertiseQuote {
  id: string;
  quote: string;
  name: string;
  role: string;
  socialUrl?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  logoAlt: string;
}

export interface CareerCard {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  label: string;
  items: FAQItem[];
}

export interface FooterColumn {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}