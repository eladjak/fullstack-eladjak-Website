import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { TagBadge } from '@/components/ui/tag-badge';
import { StructuredData, structuredDataGenerators } from '@/components/seo/structured-data';
import { getAllMDXSlugs, getMDXPostBySlug } from '@/lib/mdx';
import { MDXRenderer } from '@/components/blog/mdx-renderer';
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
  const post = getMDXPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
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
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-8 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {post.frontmatter.title}
          </h1>

          {post.frontmatter.description && (
            <p className="text-xl text-muted-foreground">
              {post.frontmatter.description}
            </p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {/* Author */}
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.frontmatter.author || "Elad Ya'akobovitch"}</span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.frontmatter.date}>
                {format(new Date(post.frontmatter.date), 'MMM dd, yyyy')}
              </time>
            </div>

            {/* Reading Time */}
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          {/* Tags */}
          {post.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} variant="default" showIcon={true} />
              ))}
            </div>
          )}
        </header>

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

        {/* Divider */}
        <hr className="my-12" />

        {/* Post Footer */}
        <div className="flex justify-between items-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            All Posts
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            Get in touch
          </Link>
        </div>
      </article>
    </>
  );
}
