import { notFound } from 'next/navigation';
import Image from 'next/image';
import { StructuredData, structuredDataGenerators } from '@/components/seo/structured-data';
import { cookies } from 'next/headers';
import readingTime from 'reading-time';
import { getAllMDXSlugs, getAllMDXPosts, getMDXPostBySlug, localizeMDXContent } from '@/lib/mdx';
import { MDXRenderer } from '@/components/blog/mdx-renderer';
import { BlogPostBackLink, BlogPostFooter } from '@/components/blog/blog-post-nav';
import { RelatedPosts } from '@/components/blog/related-posts';
import { ReadingProgressBar } from '@/components/blog/reading-progress';
import { BlogPostLocalizedHeader } from '@/components/blog/blog-post-localized-header';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Body varies by NEXT_LOCALE cookie (bilingual posts) — render per-request, never
// serve a cached wrong-language body. generateStaticParams still pre-lists slugs.
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const slugs = getAllMDXSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getMDXPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fullstack-eladjak.co.il';

  // Wave-13: Resolve locale from cookies (next-intl). Default 'he' for Israeli site.
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as 'he' | 'en') || 'he';

  const title = locale === 'he' && post.frontmatter.titleHe ? post.frontmatter.titleHe : post.frontmatter.title;
  const description = locale === 'he' && post.frontmatter.descriptionHe ? post.frontmatter.descriptionHe : post.frontmatter.description;
  const blogLabel = locale === 'he' ? 'בלוג' : 'Blog';

  return {
    title: `${title} | ${blogLabel}`,
    description,
    alternates: {
      canonical: `${siteUrl}/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author || "Elad Ya'akobovitch"],
      tags: post.frontmatter.tags,
      locale: locale === 'he' ? 'he_IL' : 'en_US',
      images: post.frontmatter.featured_image
        ? [{ url: post.frontmatter.featured_image, width: 1200, height: 630, alt: title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.frontmatter.featured_image ? [post.frontmatter.featured_image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fullstack-eladjak.co.il';
  const post = getMDXPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Locale-aware body: bilingual posts carry both languages; show only the active one.
  const cookieStore = await cookies();
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as 'he' | 'en') || 'he';
  const localizedContent = localizeMDXContent(post.content, locale);
  // Reading time on the active-locale half (post.readingTime counts the full bilingual body).
  const localizedReadingTime = Math.ceil(readingTime(localizedContent).minutes);

  // Get related posts based on shared tags
  const allPosts = getAllMDXPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      slug: p.slug,
      sharedTags: p.frontmatter.tags.filter((tag) =>
        post.frontmatter.tags.includes(tag)
      ).length,
      frontmatter: p.frontmatter,
      readingTime: p.readingTime,
    }))
    .filter((p) => p.sharedTags > 0)
    .sort((a, b) => b.sharedTags - a.sharedTags)
    .slice(0, 3)
    .map(({ slug: s, frontmatter, readingTime: rt }) => ({ slug: s, frontmatter, readingTime: rt }));

  return (
    <>
      <ReadingProgressBar />
      <StructuredData
        data={structuredDataGenerators.article(
          post.frontmatter.title,
          post.frontmatter.description,
          post.frontmatter.date,
          post.frontmatter.author || "Elad Ya'akobovitch",
          post.frontmatter.featured_image || undefined,
          post.frontmatter.date
        )}
      />
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Link (i18n) */}
        <BlogPostBackLink />

        {/* Header (locale-aware) */}
        <BlogPostLocalizedHeader
          frontmatter={post.frontmatter}
          shareUrl={`${siteUrl}/blog/${slug}`}
          readingTime={localizedReadingTime}
        />

        {/* Featured Image */}
        {post.frontmatter.featured_image && (
          <div className="mb-8 overflow-hidden rounded-lg relative w-full aspect-video">
            <Image
              src={post.frontmatter.featured_image}
              alt={post.frontmatter.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        )}

        {/* MDX Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <MDXRenderer content={localizedContent} />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <>
            <hr className="my-12" />
            <RelatedPosts posts={relatedPosts} />
          </>
        )}

        {/* Divider */}
        <hr className="my-12" />

        {/* Post Footer (i18n) */}
        <BlogPostFooter />
      </article>
    </>
  );
}
