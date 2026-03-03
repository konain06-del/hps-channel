import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { getPostBySlug, getPublishedPosts } from "@/lib/blog/db";
import { siteConfig } from "@/lib/data/site";
import { Prose } from "@/components/Prose";

export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Post Not Found" };

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      url: `${siteConfig.url}/blogs/${post.slug}`,
      siteName: siteConfig.name,
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      ...(post.coverImage ? { images: [{ url: post.coverImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const allPosts = await getPublishedPosts();
  const related = allPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    ...(post.coverImage ? { image: post.coverImage } : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blogs/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ---- Article header ---- */}
      <article className="bg-white">
        <header className="border-b border-border-light py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            {/* Back link */}
            <Link
              href="/blogs"
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-light transition-colors hover:text-hydra-600"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Blog
            </Link>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-hydra-50 px-3 py-1 text-xs font-medium text-hydra-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="mt-4 text-lg leading-relaxed text-slate-light">
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-light">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(
                  post.publishedAt || post.createdAt
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime} min read
              </span>
            </div>
          </div>
        </header>

        {/* ---- Cover image ---- */}
        {post.coverImage && (
          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full rounded-2xl border border-border-light object-cover"
              style={{ maxHeight: 480 }}
            />
          </div>
        )}

        {/* ---- Body ---- */}
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 md:py-12">
          <Prose content={post.content} className="mx-auto" />
        </div>
      </article>

      {/* ---- Related posts ---- */}
      {related.length > 0 && (
        <section className="bg-white py-16 md:py-20 border-t border-border-light">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-xl font-bold text-navy">
              More from the Blog
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/blogs/${p.slug}`}
                  className="group rounded-xl border border-border-light p-5 transition-all duration-200 hover:border-hydra-300 hover:shadow-md"
                >
                  <h3 className="mb-1.5 text-sm font-semibold text-navy transition-colors group-hover:text-hydra-600">
                    {p.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-light line-clamp-2">
                    {p.excerpt}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-light">
                    <Calendar className="h-3 w-3" />
                    {new Date(
                      p.publishedAt || p.createdAt
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                    <span className="text-hydra-400">&#183;</span>
                    <Clock className="h-3 w-3" />
                    {p.readingTime} min
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
