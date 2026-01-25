import { notFound } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/types/blog';
import { format } from 'date-fns';
import { Calendar, Clock, User } from 'lucide-react';
import CommentList from '@/components/blog/comment-list';
import CommentForm from '@/components/blog/comment-form';
import { TagBadge } from '@/components/ui/tag-badge';
import { Metadata } from 'next';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      profiles:author_id (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !data) {
    return null;
  }

  return data as BlogPost;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.description || undefined,
    openGraph: {
      title: post.title,
      description: post.description || undefined,
      type: 'article',
      publishedTime: post.created_at,
      authors: post.profiles?.full_name ? [post.profiles.full_name] : undefined,
      tags: post.tags || undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <header className="mb-8 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">{post.title}</h1>

        {post.description && (
          <p className="text-xl text-muted-foreground">{post.description}</p>
        )}

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {/* Author */}
          {post.profiles && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.profiles.full_name || post.profiles.username}</span>
            </div>
          )}

          {/* Date */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.created_at}>
              {format(new Date(post.created_at), 'MMM dd, yyyy')}
            </time>
          </div>

          {/* Reading Time */}
          {post.reading_time && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.reading_time} min read</span>
            </div>
          )}
        </div>

        {/* Tags - CONSISTENCY FIX: Using TagBadge component */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} variant="default" showIcon={true} />
            ))}
          </div>
        )}
      </header>

      {/* Featured Image - PERFORMANCE FIX: Using Next.js Image */}
      {post.featured_image && (
        <div className="mb-8 overflow-hidden rounded-lg relative w-full aspect-video">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* Divider */}
      <hr className="my-12" />

      {/* Comments Section */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold">Comments</h2>

        <CommentForm
          postId={post.id}
          onSuccess={() => {
            // Comment submitted successfully - CommentList will update via realtime
          }}
          post={{
            author_id: post.author_id,
            title: post.title,
            slug: post.slug,
          }}
        />

        <CommentList postId={post.id} />
      </section>
    </article>
  );
}
