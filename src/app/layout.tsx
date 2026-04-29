import type { Metadata, Viewport } from "next";
import { Manrope, Host_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { cookies } from "next/headers";
import { Toaster } from "sonner";
import "./globals.css";
import { CookieConsent } from "@/components/cookie-consent";
import { WhatsAppBubble } from "@/components/whatsapp-bubble";
import { Header } from "@/layouts/header";
import { Footer } from "@/layouts/footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://azevisa.az";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-2KJ01HMNJN";

export const viewport: Viewport = {
  themeColor: "#004E34",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Apply for Azerbaijan eVisa - Fast, Secure & Official",
    template: "%s | azEvisa",
  },
  description:
    "Apply for your Azerbaijan electronic visa (eVisa) online. Tourist, business and transit visas issued within 3 hours. Secure, official and hassle-free.",
  applicationName: "azEvisa",
  keywords: [
    "Azerbaijan eVisa",
    "ASAN Visa",
    "Azerbaijan visa online",
    "eVisa Azerbaijan",
    "apply Azerbaijan visa",
    "Azerbaijan tourist visa",
    "Azerbaijan business visa",
    "Azerbaijan transit visa",
    "Baku visa",
  ],
  authors: [{ name: "azEvisa", url: SITE_URL }],
  creator: "azEvisa",
  publisher: "azEvisa",
  category: "travel",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      az: "/",
      ru: "/",
      "x-default": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["az_AZ", "ru_RU"],
    url: SITE_URL,
    siteName: "azEvisa",
    title: "Apply for Azerbaijan eVisa - Fast, Secure & Official",
    description:
      "Apply for your Azerbaijan electronic visa online. Tourist, business and transit visas approved within 3 hours.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "azEvisa - Azerbaijan Electronic Visa Service",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@azevisa",
    creator: "@azevisa",
    title: "Apply for Azerbaijan eVisa - Fast, Secure & Official",
    description:
      "Apply for your Azerbaijan eVisa online. Tourist, business and transit visas approved within 3 hours.",
    images: ["/og-image.png"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: "azEvisa",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE_URL}/og-image.png`,
  description:
    "Official independent portal for expedited electronic visa services for the Republic of Azerbaijan.",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@azevisa.az",
      availableLanguage: ["English", "Azerbaijani", "Russian"],
      areaServed: "Worldwide",
    },
  ],
  sameAs: [
    "https://wa.me/994109992017",
    // Add real social profiles when available (Facebook, X/Twitter, Instagram, LinkedIn)
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  name: "azEvisa",
  alternateName: "Azerbaijan eVisa Service",
  url: SITE_URL,
  description:
    "Fast & secure Azerbaijan eVisa application. Apply online for tourist, business and transit visas.",
  inLanguage: ["en", "az", "ru"],
  publisher: { "@id": `${SITE_URL}#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}#service`,
  name: "Azerbaijan eVisa Application Service",
  serviceType: "Electronic Visa Processing",
  provider: { "@id": `${SITE_URL}#organization` },
  areaServed: {
    "@type": "Country",
    name: "Azerbaijan",
  },
  audience: {
    "@type": "Audience",
    audienceType: "International travellers",
  },
  description:
    "Online Azerbaijan electronic visa application service for tourist, business and transit visas with fast processing.",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "20",
    highPrice: "150",
    offerCount: "3",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const store = await cookies();
  const locale = store.get("locale")?.value ?? "en";

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${hostGrotesk.variable} h-full antialiased`}
    >
      <body className="flex flex-col min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <NextIntlClientProvider>
          <Header locale={locale} />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppBubble />
          <CookieConsent gaId={GA_ID} />
          <Toaster position="top-right" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
