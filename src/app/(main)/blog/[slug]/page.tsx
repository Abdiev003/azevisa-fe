import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { BLOG_POSTS, formatDate } from "@/data/blog";
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from "@/components/icons";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const t = await getTranslations("Blog");

  const related = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && p.category === post.category,
  ).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "AzEvisa",
      url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://azevisa.online",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* ── Cover / Hero ─────────────────────────── */}
      <div className={`${post.coverColor} px-4 pt-14 pb-16 lg:px-8`}>
        <div className="max-w-3xl mx-auto">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeftIcon />
            {t("backToBlog")}
          </Link>

          {/* Category badge */}
          <span className="inline-block bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>

          <h1 className="mb-4 text-3xl font-bold leading-tight text-white lg:text-4xl">
            {post.title}
          </h1>

          <p className="mb-6 text-sm leading-relaxed text-white/70">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/60">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[9px] font-bold text-white">
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <span>
                {post.author} · {post.authorRole}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon />
              {formatDate(post.date)}
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon />
              {post.readTime} {t("minRead")}
            </div>
          </div>
        </div>
      </div>

      {/* ── Article body ─────────────────────────── */}
      <section className="px-4 py-12 bg-white lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-gray-200 text-[#6F7A72]"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Content sections */}
          <div className="flex flex-col gap-8">
            {post.content.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl font-bold text-[#004E34] mb-3">
                  {section.heading}
                </h2>
                <p className="text-sm text-[#1F2937] leading-relaxed">
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 p-6 bg-[#004E34]/5 border border-[#004E34]/10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-[#004E34] text-base mb-1">
                {t("ctaTitle")}
              </p>
              <p className="text-xs text-[#6F7A72]">{t("ctaSubtitle")}</p>
            </div>
            <Link
              href="/visa-types"
              className="shrink-0 px-6 py-2.5 bg-[#004E34] text-white text-sm font-semibold rounded-lg hover:bg-[#003322] transition-colors"
            >
              {t("ctaButton")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Related posts ────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-[#F8F9FA] px-4 py-12 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-[#1F2937] mb-6">
              {t("relatedPosts")}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {related.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#004E34]/20 transition-all"
                >
                  <div className={`${rp.coverColor} h-24`} />
                  <div className="p-4">
                    <p className="text-xs font-bold text-[#1F2937] group-hover:text-[#004E34] transition-colors leading-snug line-clamp-3">
                      {rp.title}
                    </p>
                    <p className="text-[11px] text-[#94A3B8] mt-2">
                      {rp.readTime} {t("minRead")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
