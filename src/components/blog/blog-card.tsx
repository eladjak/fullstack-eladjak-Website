'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { memo, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { TagBadge } from '@/components/ui/tag-badge';
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';
import type { Tables } from '@/lib/supabase.types';

type BlogPost = Tables<'blog_posts'> & {
  profiles: Tables<'profiles'> | null;
};

interface BlogCardProps {
  post: BlogPost;
}

/**
 * PERFORMANCE OPTIMIZATIONS:
 * - Added React.memo to prevent unnecessary re-renders
 * - Replaced <img> with Next.js Image for optimization
 * - Using TagBadge component for consistency
 */
const BlogCard = memo(({ post: initialPost }: BlogCardProps) => {
  const [post, setPost] = useState(initialPost);

  useRealtimeUpdates({
    table: 'blog_posts',
    filter: `id=eq.${initialPost.id}`,
    onUpdate: (updatedPost) => {
      setPost((prev) => ({
        ...prev,
        ...updatedPost
      }));
    }
  });

  // Generate avatar URL with fallback to UI Avatars
  const avatarUrl = post.profiles?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(post.profiles?.username || 'User')}&size=32&background=8B5CF6&color=fff`;

  return (
    <Card className="group overflow-hidden transition-all duration-500 hover:shadow-xl hover:translate-y-[-4px]">
      <CardHeader>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold hover:text-primary">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            {/* PERFORMANCE FIX: Next.js Image instead of <img> */}
            <Image
              src={avatarUrl}
              alt={post.profiles?.username || 'Author'}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
              loading="lazy"
            />
            <span>{post.profiles?.username}</span>
            <span aria-hidden="true">•</span>
            <time dateTime={post.created_at}>
              {format(new Date(post.created_at || ''), 'MMM d, yyyy')}
            </time>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{post.description}</p>
      </CardContent>
      <CardFooter>
        {/* CONSISTENCY FIX: Using TagBadge component */}
        <div className="flex flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <TagBadge key={tag} tag={tag} variant="default" showIcon={false} />
          ))}
        </div>
      </CardFooter>
    </Card>
  );
});
BlogCard.displayName = 'BlogCard';

export default BlogCard;
