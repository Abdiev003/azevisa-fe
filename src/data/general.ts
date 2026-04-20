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

export interface VisaPurpose {
  id: number;
  name: string;
  slug: string;
  purpose_type: "tourism" | "business" | "transit" | "student" | "work";
  description: string;
  icon: string;
  is_active: boolean;
  order: number;
}

export const getVisaPurposes = async (): Promise<VisaPurpose[]> => {
  try {
    const res = await fetcher("/countries/visa-purposes/");
    return Array.isArray(res) ? res : (res?.results ?? []);
  } catch (error) {
    console.error("Error fetching visa purposes:", error);
    return [];
  }
};

export interface VisaTypePrice {
  id: number;
  visa_purpose: {
    id: number;
    name: string;
    slug: string;
    purpose_type: string;
    icon: string;
  };
  government_fee: string;
  service_fee: string;
  total_price: string;
  currency: string;
}

export interface VisaType {
  id: number;
  name: string;
  slug: string;
  speed_type: "standard" | "urgent" | "super_rush";
  description: string;
  processing_time_text: string;
  processing_hours_min: number;
  processing_hours_max: number;
  validity_days: number;
  max_stay_days: number;
  is_active: boolean;
  prices: VisaTypePrice[];
}

export const getVisaTypes = async (): Promise<VisaType[]> => {
  try {
    const res = await fetcher("/countries/visa-types/");
    return Array.isArray(res) ? res : (res?.results ?? []);
  } catch (error) {
    console.error("Error fetching visa types:", error);
    return [];
  }
};

export interface VisaRequirement {
  id: number;
  visa_purpose: {
    id: number;
    name: string;
    slug: string;
    purpose_type: string;
    icon: string;
  };
  title: string;
  description: string;
  documents_required: string;
  additional_notes: string;
}

export const getVisaRequirements = async (params?: {
  country?: string;
  purpose?: string;
}): Promise<VisaRequirement[]> => {
  try {
    const q = new URLSearchParams();
    if (params?.country) q.set("country", params.country);
    if (params?.purpose) q.set("purpose", params.purpose);
    const qs = q.toString();
    const res = await fetcher(`/countries/visa-requirements/${qs ? `?${qs}` : ""}`);
    return Array.isArray(res) ? res : [];
  } catch (error) {
    console.error("Error fetching visa requirements:", error);
    return [];
  }
};

const MAX_PAGES = 50;

export const getAllCountries = async (): Promise<CountryItem[]> => {
  const results: CountryItem[] = [];
  const seen = new Set<number>();

  for (let page = 1; page <= MAX_PAGES; page++) {
    const response = await getCountries({ page });

    for (const country of response.results) {
      if (!seen.has(country.id)) {
        seen.add(country.id);
        results.push(country);
      }
    }

    if (!response.next || response.results.length === 0) {
      break;
    }
  }

  return results;
};
