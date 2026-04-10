import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getBlogs, PAGE_SIZE, type ApiBlogCategory } from "@/data/blog";
import { BlogList } from "@/components/blog/blog-list";

export const metadata: Metadata = {
  title: "Travel & Visa Blog – Azerbaijan eVisa Tips & Guides",
  description:
    "Expert guides, travel tips and the latest news about Azerbaijan eVisa and travel. Everything you need for a smooth journey to Azerbaijan.",
  keywords: [
    "Azerbaijan travel blog",
    "Azerbaijan visa guide",
    "Azerbaijan eVisa tips",
    "travel to Azerbaijan",
    "Baku travel tips",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    url: "/blog",
    type: "website",
    title: "Travel & Visa Blog – Azerbaijan eVisa Tips & Guides",
    description:
      "Expert guides, travel tips and the latest news about Azerbaijan eVisa and travel.",
  },
  twitter: {
    title: "Travel & Visa Blog – Azerbaijan eVisa Tips & Guides",
    description:
      "Expert guides, travel tips and the latest news about Azerbaijan eVisa and travel.",
  },
};

interface PageProps {
  searchParams: Promise<{ page?: string; search?: string; category?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const t = await getTranslations("Blog");
  const { page: pageParam, search, category } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const data = await getBlogs({ page: currentPage, search, category });
  const totalPages = Math.ceil(data.count / PAGE_SIZE);

  // Collect unique categories from results for filter buttons
  const categories: ApiBlogCategory[] = [];
  const seen = new Set<string>();
  for (const post of data.results) {
    if (post.category && !seen.has(post.category.slug)) {
      seen.add(post.category.slug);
      categories.push(post.category);
    }
  }

  return (
    <main>
      {/* ── Hero ─────────────────────────────────── */}
      <section className="bg-[#F8F9FA] px-4 pt-14 pb-10 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold text-[#004E34] uppercase tracking-widest mb-3">
            {t("hero.badge")}
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#004E34] mb-3">
            {t("hero.title")}
          </h1>
          <p className="text-[#6F7A72] text-sm leading-relaxed max-w-xl">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* ── Posts ────────────────────────────────── */}
      <section className="bg-[#F8F9FA] px-4 pb-20 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <BlogList
            posts={data.results}
            categories={categories}
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={data.count}
            currentSearch={search ?? ""}
            currentCategory={category ?? ""}
            readLabel={t("readMore")}
            readTimeLabel={t("minRead")}
          />
        </div>
      </section>
    </main>
  );
}
