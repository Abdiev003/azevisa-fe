import type { Metadata } from "next";
import { Manrope } from "next/font/google";
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
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://azevisa.online";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Apply for Azerbaijan eVisa – Fast, Secure & Official",
    template: "%s | AzEvisa",
  },
  description:
    "Apply for your Azerbaijan electronic visa (eVisa) online. Tourist, business and transit visas issued within 3 hours. Secure, official and hassle-free.",
  keywords: [
    "Azerbaijan eVisa",
    "ASAN Visa",
    "Azerbaijan visa online",
    "eVisa Azerbaijan",
    "apply Azerbaijan visa",
    "Azerbaijan tourist visa",
    "Azerbaijan business visa",
  ],
  authors: [{ name: "AzEvisa", url: SITE_URL }],
  creator: "AzEvisa",
  publisher: "AzEvisa",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AzEvisa",
    title: "Apply for Azerbaijan eVisa – Fast, Secure & Official",
    description:
      "Apply for your Azerbaijan electronic visa online. Tourist, business and transit visas approved within 3 hours.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AzEvisa – Azerbaijan Electronic Visa Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply for Azerbaijan eVisa – Fast, Secure & Official",
    description:
      "Apply for your Azerbaijan eVisa online. Tourist, business and transit visas approved within 3 hours.",
    images: ["/og-image.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AzEvisa",
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  description:
    "Official independent portal for expedited electronic visa services for the Republic of Azerbaijan.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "support@azevisa.online",
    availableLanguage: ["English", "Azerbaijani", "Russian"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AzEvisa",
  url: SITE_URL,
  description:
    "Fast & secure Azerbaijan eVisa application. Apply online for tourist, business and transit visas.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const GA_ID = "G-2KJ01HMNJN";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const store = await cookies();
  const locale = store.get("locale")?.value ?? "en";

  return (
    <html lang={locale} className={`${manrope.variable} h-full antialiased`}>
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
