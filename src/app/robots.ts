import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://azevisa.az";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/payment/checkout",
          "/payment/success",
          "/payment/cancel",
          "/_next/",
        ],
      },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "Applebot",
          "Applebot-Extended",
          "Bingbot",
          "DuckDuckBot",
          "YandexBot",
          "Amazonbot",
          "CCBot",
          "Meta-ExternalAgent",
        ],
        allow: "/",
        disallow: [
          "/api/",
          "/payment/checkout",
          "/payment/success",
          "/payment/cancel",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
