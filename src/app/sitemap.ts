import type { MetadataRoute } from "next";
import { getBlogs } from "@/data/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://azevisa.az";

export const revalidate = 3600; // refresh every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/apply`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/visa-types`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/visa-requirements`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/eligible-countries`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/check-status`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact-us`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms-of-service`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/cookie-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/refund-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Pull every blog post (paginate). Fail-safe: if API down, just skip blog entries.
  const blogRoutes: MetadataRoute.Sitemap = [];
  try {
    let page = 1;
    // hard-cap iterations to avoid runaway loops
    while (page < 50) {
      const data = await getBlogs({ page });
      for (const post of data.results) {
        blogRoutes.push({
          url: `${SITE_URL}/blog/${post.slug}`,
          lastModified: new Date(post.published_at),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
      if (!data.next) break;
      page += 1;
    }
  } catch (err) {
    console.error("[sitemap] failed to fetch blog posts:", err);
  }

  return [...staticRoutes, ...blogRoutes];
}
