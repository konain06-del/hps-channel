import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { getPublishedPosts } from "@/lib/blog/db";
import { siteConfig } from "@/lib/data/site";
import { AuroraBackground } from "@/components/graphics/AuroraBackground";
import { NoiseOverlay } from "@/components/graphics/NoiseOverlay";
import { GradientOrb } from "@/components/graphics/GradientOrb";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: `Pool care tips, maintenance guides, and industry insights from ${siteConfig.name}.`,
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: `Pool care tips, maintenance guides, and industry insights from ${siteConfig.name}.`,
  },
};

export default async function BlogsPage() {
  const posts = await getPublishedPosts();

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Blog | ${siteConfig.name}`,
    description: `Pool care tips, maintenance guides, and industry insights from ${siteConfig.name}.`,
    url: `${siteConfig.url}/blogs`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${siteConfig.url}/blogs/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-hydra-50/60 to-white py-24 md:py-32">
        <AuroraBackground className="opacity-60" />
        <NoiseOverlay />
        <GradientOrb className="top-[-10%] left-[-8%]" size="lg" />
        <GradientOrb className="right-[-6%] bottom-[10%]" size="md" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-[3.4rem]">
              Pool Care <span className="text-hydra-500">Insights</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-light sm:text-xl">
              Tips, guides, and industry knowledge to help you maintain a
              crystal-clear pool year-round.
            </p>
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="bg-white py-16 md:py-24 border-t border-border-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="py-20 text-center">
              <BookOpen className="mx-auto mb-4 h-10 w-10 text-hydra-300" />
              <p className="text-base font-medium text-slate">
                No posts yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blogs/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border-light bg-white transition-all duration-200 hover:border-hydra-300 hover:shadow-lg hover:shadow-hydra-100/40"
                >
                  {post.coverImage && (
                    <div className="aspect-[16/9] overflow-hidden bg-hydra-50">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-5">
                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="mb-2.5 flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-hydra-50 px-2.5 py-0.5 text-[11px] font-medium text-hydra-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <h2 className="mb-2 text-lg font-semibold text-navy transition-colors group-hover:text-hydra-600">
                      {post.title}
                    </h2>
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-light">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-slate-light">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(
                            post.publishedAt || post.createdAt
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readingTime} min read
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-semibold text-hydra-600 transition-colors group-hover:text-hydra-700">
                        Read
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
