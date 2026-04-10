export interface ProcessingTier {
  label: string;
  price: string;
  time: string;
  highlighted?: boolean;
}

export interface FeaturedVisa {
  id: string;
  name: string;
  badge?: string;
  /** path inside /public */
  image?: string;
  /** tailwind bg class used as fallback when no image */
  imageBg: string;
  description: string;
  details: {
    validity: string;
    maxStay: string;
    entryType: string;
  };
  requirements: string[];
  fees: ProcessingTier[];
  applyLabel: string;
}

export interface SecondaryVisa {
  id: string;
  name: string;
  description: string;
  priceLabel: string;
  price: string;
}

export interface ComparisonRow {
  id: string;
  name: string;
  validity: string;
  maxStay: string;
  priceRange: string;
  processingTime: string;
}

export const FEATURED_VISAS: FeaturedVisa[] = [
  {
    id: "tourism",
    name: "Tourism eVisa",
    badge: "MOST POPULAR",
    image:
      "/AB6AXuC1CHP2C3Iv0QwVQWoVH9139-WbguvSO32lucaHyBovTtiWXTh27SfgsWe7RB9CrCQGfhT8GDftNt_60iXSKXTYOlmspNRaCNlANlau0Xp.png",
    imageBg: "bg-[#1a3a2a]",
    description:
      "Perfect for sightseeing, visiting family, or attending cultural events in Azerbaijan. This single-entry visa is the fastest way to explore the historic Old City of Baku.",
    details: {
      validity: "90 Days",
      maxStay: "30 Days",
      entryType: "Single Entry",
    },
    requirements: [
      "Valid Passport (6+ months)",
      "Digital Photo (3.5x4.5cm)",
      "Proof of Stay (Hotel Booking)",
    ],
    fees: [
      { label: "STANDARD", price: "$20", time: "3-5 days" },
      { label: "URGENT", price: "$50", time: "3 Hours", highlighted: true },
      { label: "SUPER RUSH", price: "$80", time: "Immediate" },
    ],
    applyLabel: "Apply for Tourism Visa",
  },
  {
    id: "business",
    name: "Business eVisa",
    image: undefined,
    imageBg: "bg-[#0f2235]",
    description:
      "Designed for professionals attending conferences, meetings, or negotiating trade deals. Efficiently handles all corporate travel requirements.",
    details: {
      validity: "90 Days",
      maxStay: "30 Days",
      entryType: "Multiple Entry",
    },
    requirements: [
      "Business Invitation Letter",
      "Passport Scan",
      "Company Credentials",
    ],
    fees: [
      { label: "STANDARD", price: "$30", time: "3-5 days" },
      { label: "URGENT", price: "$60", time: "3 Hours" },
      { label: "RUSH", price: "$90", time: "Immediate" },
    ],
    applyLabel: "Apply for Business Visa",
  },
];

export const SECONDARY_VISAS: SecondaryVisa[] = [
  {
    id: "transit",
    name: "Transit eVisa",
    description:
      "Short-term entry for travelers passing through Azerbaijan to a third destination.",
    priceLabel: "Starting at",
    price: "$15",
  },
  {
    id: "student",
    name: "Student eVisa",
    description:
      "For international students enrolled in recognized Azerbaijani educational institutions.",
    priceLabel: "Standard Fee",
    price: "$40",
  },
  {
    id: "work",
    name: "Work Permit",
    description:
      "Official authorization for foreign nationals to engage in professional employment.",
    priceLabel: "Processing Fee",
    price: "$120",
  },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    id: "tourism",
    name: "Tourism eVisa",
    validity: "90 Days",
    maxStay: "30 Days",
    priceRange: "$20 – $80",
    processingTime: "3 Hours – 5 Days",
  },
  {
    id: "business",
    name: "Business eVisa",
    validity: "90 Days",
    maxStay: "30 Days",
    priceRange: "$30 – $90",
    processingTime: "3 Hours – 5 Days",
  },
  {
    id: "transit",
    name: "Transit eVisa",
    validity: "30 Days",
    maxStay: "5 Days",
    priceRange: "$15 – $40",
    processingTime: "1 – 3 Days",
  },
  {
    id: "student",
    name: "Student eVisa",
    validity: "Program Length",
    maxStay: "90+ Days",
    priceRange: "$40 – $100",
    processingTime: "7 – 15 Days",
  },
  {
    id: "work",
    name: "Work Permit",
    validity: "1 Year (Renewable)",
    maxStay: "Contract Length",
    priceRange: "$120 – $300",
    processingTime: "15 – 30 Days",
  },
];
