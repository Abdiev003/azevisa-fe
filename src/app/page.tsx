import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Apply for Azerbaijan eVisa Online – Fast & Secure",
  description:
    "Get your Azerbaijan eVisa in 3 hours. Official online application for tourist, business and transit visas. Simple form, secure payment, instant confirmation.",
  keywords: [
    "Azerbaijan eVisa",
    "ASAN Visa",
    "Azerbaijan visa online",
    "apply for Azerbaijan visa",
    "Azerbaijan tourist visa online",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Apply for Azerbaijan eVisa Online – Fast & Secure",
    description:
      "Get your Azerbaijan eVisa in 3 hours. Simple online application for tourist, business and transit visas.",
  },
  twitter: {
    title: "Apply for Azerbaijan eVisa Online – Fast & Secure",
    description:
      "Get your Azerbaijan eVisa in 3 hours. Simple online application for tourist, business and transit visas.",
  },
};

export default function Home() {
  return <div>Home</div>;
}
