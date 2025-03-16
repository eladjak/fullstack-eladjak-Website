'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { BlogPost } from '@/types/blog';
import { useRealtimeSubscription } from '@/hooks/useRealtimeSubscription';
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import BlogFilters from '@/components/blog/blog-filters';
import { Loader2 } from 'lucide-react';
import BlogCard from '@/components/blog/blog-card';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { useMetaTags } from '@/hooks/useMetaTags';
import { supabase } from '@/lib/supabase';

export default function BlogPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const postsPerPage = 9;

  const { posts, loading, setPosts } = useBlogPosts({ page, selectedTags, postsPerPage });

  useEffect(() => {
    const generateMetaTags = async () => {
      try {
        const postIds = posts.map(post => post.id);
        for (const postId of postIds) {
          await supabase.functions.invoke('generate-meta-tags', {
            body: { postId }
          });
        }
      } catch (error) {
        console.error('Error generating meta tags:', error);
      }
    };

    if (posts.length > 0) {
      generateMetaTags();
    }
  }, [posts]);

  useRealtimeSubscription<BlogPost>(
    {
      channel: 'blog_posts',
      table: 'blog_posts',
      filter: 'published=eq.true'
    },
    (payload: RealtimePostgresChangesPayload<BlogPost>) => {
      if (payload.eventType === 'INSERT') {
        setPosts(prev => [...prev, payload.new]);
      } else if (payload.eventType === 'DELETE') {
        setPosts(prev => prev.filter(p => p.id !== payload.old.id));
      } else if (payload.eventType === 'UPDATE') {
        setPosts(prev => prev.map(p => p.id === payload.new.id ? { ...p, ...payload.new } : p));
      }
    }
  );

  const allTags = Array.from(
    new Set(
      posts.flatMap(post => post.tags || [])
    )
  ).sort();

  useMetaTags({
    title: 'Blog | Portfolio',
    description: 'Explore my thoughts, stories and ideas about software development, technology, and more.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
    type: 'blog'
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Thoughts, stories and ideas.
        </p>
        
        <BlogFilters
          tags={allTags}
          selected={selectedTags}
          onChange={tags => {
            setSelectedTags(tags);
            setPage(1);
          }}
        />
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
      )}

      {posts.length === postsPerPage && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setPage(p => p + 1)}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
