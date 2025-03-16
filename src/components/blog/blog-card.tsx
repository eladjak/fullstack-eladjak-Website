'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { Tables } from '@/lib/supabase.types';

type BlogPost = Tables<'blog_posts'> & {
  profiles: Tables<'profiles'> | null;
};

interface BlogCardProps {
  post: BlogPost;
}

import { useState } from 'react';
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';

export default function BlogCard({ post: initialPost }: BlogCardProps) {
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
            <img
              src={post.profiles?.avatar_url || 'https://via.placeholder.com/32'}
              alt={post.profiles?.username || 'Author'}
              className="h-8 w-8 rounded-full"
            />
            <span>{post.profiles?.username}</span>
            <span>•</span>
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
        <div className="flex flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
