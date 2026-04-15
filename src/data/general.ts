import { fetcher } from "@/lib/fetcher";

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  category_display: string;
}

export interface Region {
  id: number;
  name: string;
  slug: string;
  countries_count: number;
  order: number;
}

export interface CountryItem {
  id: number;
  name: string;
  slug: string;
  iso_code_2: string;
  iso_code_3: string;
  phone_code: string;
  flag_emoji: string;
  region_name: string;
  available_purposes: {
    id: number;
    name: string;
    slug: string;
    purpose_type: string;
    icon: string;
  }[];
}

export interface CountryListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CountryItem[];
}

export const COUNTRY_PAGE_SIZE = 9;

export const getContactFAQ = async (): Promise<FAQItem[]> => {
  try {
    const res = await fetcher("/pages/faq/?category=contact");
    return res;
  } catch (error) {
    console.error("Error fetching contact FAQ:", error);
    return [];
  }
};

export const getHomeFAQ = async (): Promise<FAQItem[]> => {
  try {
    const res = await fetcher("/pages/faq/?category=general");
    return res;
  } catch (error) {
    console.error("Error fetching home FAQ:", error);
    return [];
  }
};

export const getRegions = async (): Promise<Region[]> => {
  try {
    const res = await fetcher("/countries/regions/");
    return res;
  } catch (error) {
    console.error("Error fetching regions:", error);
    return [];
  }
};

export const getCountries = async (params?: {
  page?: number;
  search?: string;
  region?: string;
}): Promise<CountryListResponse> => {
  try {
    const q = new URLSearchParams();
    if (params?.page && params.page > 1) q.set("page", String(params.page));
    if (params?.search) q.set("search", params.search);
    if (params?.region) q.set("region__slug", params.region);
    const qs = q.toString();
    const res = await fetcher(`/countries/${qs ? `?${qs}` : ""}`);
    return res;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return { count: 0, next: null, previous: null, results: [] };
  }
};
