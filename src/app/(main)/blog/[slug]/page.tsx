import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getBlogPost, formatDate } from "@/data/blog";
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from "@/components/icons";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author_name }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.published_at,
      authors: [post.author_name],
      tags: post.tags,
      ...(post.featured_image ? { images: [post.featured_image] } : {}),
    },
    twitter: {
      card: post.featured_image ? "summary_large_image" : "summary",
      title: post.title,
      description: post.excerpt,
      ...(post.featured_image ? { images: [post.featured_image] } : {}),
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const t = await getTranslations("Blog");

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: {
      "@type": "Person",
      name: post.author_name,
    },
    publisher: {
      "@type": "Organization",
      name: "AzEvisa",
      url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://azevisa.az",
    },
    ...(post.featured_image ? { image: post.featured_image } : {}),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* ── Cover / Hero ─────────────────────────── */}
      <div className="bg-[#004E34] px-4 pt-14 pb-16 lg:px-8">
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
          {post.category && (
            <span className="inline-block bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              {post.category.name}
            </span>
          )}

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
                {post.author_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <span>{post.author_name}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon />
              {formatDate(post.published_at)}
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon />
              {post.reading_time_minutes} {t("minRead")}
            </div>
          </div>
        </div>
      </div>

      {/* ── Featured image ───────────────────────── */}
      {post.featured_image && (
        <div className="max-w-3xl mx-auto px-4 lg:px-8 -mt-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.featured_image}
            alt={post.featured_image_alt ?? post.title}
            className="w-full rounded-2xl shadow-lg object-cover max-h-80"
          />
        </div>
      )}

      {/* ── Article body ─────────────────────────── */}
      <section className="px-4 py-12 bg-white lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Tags */}
          {post.tags.length > 0 && (
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
          )}

          {/* Content (HTML from API) */}
          {post.content && (
            <div
              className="prose prose-sm max-w-none text-[#1F2937] prose-headings:text-[#004E34] prose-headings:font-bold prose-a:text-[#004E34]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}

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
    </main>
  );
}
