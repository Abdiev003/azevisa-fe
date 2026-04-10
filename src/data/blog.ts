export type BlogCategory =
  | "Travel Tips"
  | "Visa Guide"
  | "News"
  | "Azerbaijan"
  | "FAQ";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: string;
  authorRole: string;
  date: string; // ISO
  readTime: number; // minutes
  featured?: boolean;
  coverColor: string; // tw bg class for placeholder
  tags: string[];
  content: Section[];
}

export interface Section {
  heading: string;
  body: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-apply-azerbaijan-evisa",
    title: "How to Apply for an Azerbaijan eVisa: A Step-by-Step Guide",
    excerpt:
      "Everything you need to know about applying for the Azerbaijan electronic visa — documents, fees, processing times and common pitfalls to avoid.",
    category: "Visa Guide",
    author: "Leyla Mammadova",
    authorRole: "Visa Specialist",
    date: "2026-03-28",
    readTime: 6,
    featured: true,
    coverColor: "bg-[#004E34]",
    tags: ["eVisa", "Application", "Step-by-step"],
    content: [
      {
        heading: "What is the Azerbaijan eVisa?",
        body: "The Azerbaijan ASAN Visa (eVisa) is an electronic travel authorisation that allows citizens of eligible countries to enter Azerbaijan for tourism, business or transit purposes. The entire process is online — no embassy visit required.",
      },
      {
        heading: "Documents You'll Need",
        body: "You will need a valid passport (minimum 6 months validity beyond your intended stay), a digital passport photo (3.5 × 4.5 cm, white background), a hotel booking or proof of accommodation, and a valid credit or debit card for payment.",
      },
      {
        heading: "Step 1 — Fill in the Application Form",
        body: "Visit the official eVisa portal and complete the online form with your personal details exactly as they appear in your passport. Double-check your name, date of birth and passport number before submitting.",
      },
      {
        heading: "Step 2 — Upload Documents & Pay",
        body: "Upload your passport photo and select a processing speed. Standard processing takes 3–5 business days ($20). Urgent processing is guaranteed within 3 hours ($50). Pay securely by card.",
      },
      {
        heading: "Step 3 — Receive Your eVisa",
        body: "Once approved your eVisa will be emailed to you as a PDF. Print it out or save it to your phone. You must present it at the port of entry alongside your passport.",
      },
      {
        heading: "Common Mistakes to Avoid",
        body: "The most common rejection reasons are: passport validity shorter than 6 months, blurry or incorrect photo, and typos in personal data. Review everything carefully before submitting.",
      },
    ],
  },
  {
    slug: "top-places-to-visit-baku",
    title: "Top 10 Places to Visit in Baku, Azerbaijan",
    excerpt:
      "From the ancient walls of the Old City to the flame-shaped skyscrapers of the modern skyline — discover the best of Baku before your trip.",
    category: "Travel Tips",
    author: "Nigar Hasanova",
    authorRole: "Travel Writer",
    date: "2026-03-15",
    readTime: 8,
    featured: true,
    coverColor: "bg-[#0f2235]",
    tags: ["Baku", "Tourism", "Travel"],
    content: [
      {
        heading: "1. Old City (İçərişəhər)",
        body: "A UNESCO World Heritage Site, the walled Old City is home to the iconic Maiden Tower, the Palace of the Shirvanshahs and dozens of medieval caravanserais. Expect cobblestone alleys, carpet shops and authentic Azerbaijani cuisine.",
      },
      {
        heading: "2. Flame Towers",
        body: "Baku's most recognisable landmark — three soaring skyscrapers shaped like flames that light up the night sky with a spectacular LED display.",
      },
      {
        heading: "3. Heydar Aliyev Center",
        body: "Zaha Hadid's masterpiece of flowing curves houses cultural exhibitions and is one of the most photographed buildings in the world.",
      },
      {
        heading: "4. Nizami Street",
        body: "Baku's main pedestrian boulevard lined with luxury boutiques, cafés and beautiful 19th-century architecture.",
      },
      {
        heading: "5. Gobustan National Park",
        body: "A short drive from Baku, Gobustan features 6,000-year-old rock carvings and the world-famous mud volcanoes.",
      },
    ],
  },
  {
    slug: "azerbaijan-evisa-processing-times-2026",
    title: "Azerbaijan eVisa Processing Times Explained (2026)",
    excerpt:
      "Standard, urgent or super-rush — which processing tier is right for your trip? We break down the real-world timelines and when to upgrade.",
    category: "Visa Guide",
    author: "Leyla Mammadova",
    authorRole: "Visa Specialist",
    date: "2026-02-20",
    readTime: 4,
    featured: false,
    coverColor: "bg-[#1a3a2a]",
    tags: ["Processing Time", "eVisa", "Planning"],
    content: [
      {
        heading: "Standard Processing (3–5 Business Days)",
        body: "For travellers who plan ahead, standard processing at $20 is the most economical choice. Apply at least one week before departure to give yourself a comfortable buffer.",
      },
      {
        heading: "Urgent Processing (3 Hours)",
        body: "For last-minute travellers or spontaneous trips, the urgent tier ($50) guarantees a decision within 3 hours during business hours. Available 24/7.",
      },
      {
        heading: "Super-Rush Processing (Immediate)",
        body: "In exceptional circumstances the super-rush tier ($80) delivers an almost instant decision. Ideal when you need to leave today.",
      },
    ],
  },
  {
    slug: "business-visa-vs-tourism-visa-azerbaijan",
    title: "Business eVisa vs Tourism eVisa: What's the Difference?",
    excerpt:
      "Not sure which visa category to apply for? This guide compares the two most popular Azerbaijan eVisa types so you can make the right choice.",
    category: "FAQ",
    author: "Rustam Aliyev",
    authorRole: "Immigration Consultant",
    date: "2026-02-05",
    readTime: 5,
    featured: false,
    coverColor: "bg-[#2d1f4e]",
    tags: ["Business Visa", "Tourism Visa", "Comparison"],
    content: [
      {
        heading: "Purpose of Visit",
        body: "The Tourism eVisa is for leisure travel — sightseeing, visiting family or attending cultural events. The Business eVisa is for professional activities: conferences, meetings, negotiations or signing contracts.",
      },
      {
        heading: "Entry Type",
        body: "Tourism eVisas are typically single-entry. Business eVisas grant multiple-entry privileges, allowing you to leave and re-enter Azerbaijan within the validity period.",
      },
      {
        heading: "Required Documents",
        body: "Tourism visa requires a hotel booking. Business visa requires a formal invitation letter from an Azerbaijani company or organisation, a passport scan and company credentials.",
      },
      {
        heading: "Cost Comparison",
        body: "Standard tourism starts at $20. Standard business starts at $30, reflecting the additional administrative requirements.",
      },
    ],
  },
  {
    slug: "azerbaijan-travel-tips-2026",
    title: "10 Essential Azerbaijan Travel Tips for 2026",
    excerpt:
      "Currency, customs, SIM cards, safety and more — everything first-time visitors need to know before landing in Baku.",
    category: "Travel Tips",
    author: "Nigar Hasanova",
    authorRole: "Travel Writer",
    date: "2026-01-18",
    readTime: 7,
    featured: false,
    coverColor: "bg-[#7c3d1a]",
    tags: ["Travel Tips", "Azerbaijan", "First Time"],
    content: [
      {
        heading: "Currency & Payments",
        body: "The local currency is the Azerbaijani Manat (AZN). Credit cards are accepted in most Baku hotels and restaurants. Always carry some cash for markets and taxis.",
      },
      {
        heading: "SIM Card & Internet",
        body: "Buy a local SIM card at the airport from Azercell or Bakcell. Data packages are cheap and coverage is excellent across Baku and major cities.",
      },
      {
        heading: "Getting Around",
        body: "Baku has a clean and affordable metro system. Bolt and Uber also operate in the city. For trips outside Baku, hire a taxi or join a group tour.",
      },
    ],
  },
  {
    slug: "new-evisa-rules-2026",
    title: "Azerbaijan eVisa Rule Changes for 2026",
    excerpt:
      "The Azerbaijani government has updated its eVisa programme for 2026. Here's what changed and what it means for your application.",
    category: "News",
    author: "Rustam Aliyev",
    authorRole: "Immigration Consultant",
    date: "2026-01-02",
    readTime: 3,
    featured: false,
    coverColor: "bg-[#1e3a5f]",
    tags: ["News", "2026", "Regulation"],
    content: [
      {
        heading: "Expanded Eligible Countries List",
        body: "As of January 2026, three new countries have been added to the eligible nationalities list, bringing the total to 73 countries.",
      },
      {
        heading: "Updated Photo Requirements",
        body: "The digital photo specification has been updated. The minimum resolution is now 600 × 800 pixels. Photos taken more than 6 months ago will be rejected.",
      },
    ],
  },
];

export const CATEGORIES: BlogCategory[] = [
  "Travel Tips",
  "Visa Guide",
  "News",
  "Azerbaijan",
  "FAQ",
];

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
