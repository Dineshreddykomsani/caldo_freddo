import { Industry, Product, Service } from './types';

const DEFAULT_API_BASE_URL = 'https://caldo-freddo-1.onrender.com/api';

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL
).replace(/\/+$/, '');
console.log("ENV =", import.meta.env.VITE_API_BASE_URL);
console.log("API_BASE_URL =", API_BASE_URL);

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
  errors?: Record<string, unknown>;
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
  });
  const payload = (await response.json()) as ApiEnvelope<T>;

  if (!response.ok || !payload.success) {
    throw new Error(payload.message || 'API request failed.');
  }

  return payload.data;
}

export type CompanyContact = {
  companyName?: string;
  phone: string;
  email: string;
  whatsapp?: string;
  address: string;
  mapEmbedUrl?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
};

export type CallbackPayload = {
  name?: string;
  full_name: string;
  gccCountry?: string;
  phone: string;
  email?: string;
  service: string;
  message?: string;
};

export type QuotePayload = {
  name?: string;
  full_name: string;
  company?: string;
  company_name?: string;
  email: string;
  phone: string;
  service: string;
  location?: string;
  requirements?: string;
  project_details: string;
};

export type ContactPayload = {
  name: string;
  company?: string;
  email: string;
  phone: string;
  product?: string;
  query: string;
};

export type Testimonial = {
  id: number;
  quote: string;
  author: string;
  company: string;
  location: string;
  rating: number;
  tag: string;
};

export type Partner = {
  id: number;
  name: string;
};

export const api = {
  getCompany: () => request<CompanyContact>('/company/'),
  getServices: () => request<Service[]>('/services/'),
  getProducts: () => request<Product[]>('/products/'),
  getIndustries: () => request<Industry[]>('/industries/'),
  getTestimonials: () => request<Testimonial[]>('/testimonials/'),
  getPartners: () => request<Partner[]>('/partners/'),
  createCallback: (payload: CallbackPayload) =>
    request('/callback/', { method: 'POST', body: JSON.stringify(payload) }),
  createQuote: (payload: QuotePayload) =>
    request('/quote/', { method: 'POST', body: JSON.stringify(payload) }),
  createContact: (payload: ContactPayload) =>
    request('/contact/', { method: 'POST', body: JSON.stringify(payload) }),
};
