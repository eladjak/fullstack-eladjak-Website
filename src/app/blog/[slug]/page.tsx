import { notFound } from 'next/navigation';
import Image from 'next/image';
import { StructuredData, structuredDataGenerators } from '@/components/seo/structured-data';
import { getAllMDXSlugs, getAllMDXPosts, getMDXPostBySlug } from '@/lib/mdx';
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

  return {
    title: `${post.frontmatter.title} | Blog`,
    description: post.frontmatter.description,
    alternates: {
      canonical: `${siteUrl}/blog/${slug}`,
    },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author || "Elad Ya'akobovitch"],
      tags: post.frontmatter.tags,
      images: post.frontmatter.featured_image
        ? [{ url: post.frontmatter.featured_image, width: 1200, height: 630, alt: post.frontmatter.title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
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
      <article className="container mx-auto px-4 py-12 max-w-4xl transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/5">
        {/* Back Link (i18n) */}
        <BlogPostBackLink />

        {/* Header (locale-aware) */}
        <BlogPostLocalizedHeader
          frontmatter={post.frontmatter}
          shareUrl={`${siteUrl}/blog/${slug}`}
          readingTime={post.readingTime}
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
          <MDXRenderer content={post.content} />
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
