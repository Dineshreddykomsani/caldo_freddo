export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  iconName: string;
  image: string;
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  iconName: string;
  bgImage: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  iconName: string;
}

export interface Statistic {
  value: string;
  label: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  rating: number;
}

export interface Product {
  slNo: number;
  name: string;
  category: string;
  manufacturerName?: string;
  manufacturerUrl?: string;
  isOwnProduct?: boolean;
  isOwnService?: boolean;
  competitors?: { name: string; url: string }[];
  description?: string;
  image?: string;
}
