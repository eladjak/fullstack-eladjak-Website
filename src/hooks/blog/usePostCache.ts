'use client';

import { useState } from 'react';
import type { BlogPost } from '@/types/blog';

interface CacheConfig {
  ttl?: number;
  staleTime?: number;
}

export function usePostCache({ ttl = 3600, staleTime = 300 }: CacheConfig = {}) {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const getCachedPosts = (key: string) => {
    try {
      const cached = localStorage.getItem(`blog_${key}`);
      if (!cached) return null;
      const { data, timestamp } = JSON.parse(cached);
      const age = Date.now() - timestamp;
      
      if (age < ttl * 1000) {
        return data as BlogPost[];
      }
      
      if (age < (ttl + staleTime) * 1000) {
        return { data: data as BlogPost[], stale: true };
      }
      
      return null;
    } catch (error) {
      console.error('Cache read error:', error);
      return null;
    }
  };

  const setCachedPosts = (key: string, data: BlogPost[]) => {
    try {
      localStorage.setItem(`blog_${key}`, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Cache write error:', error);
    }
  };

  return {
    posts,
    setPosts,
    getCachedPosts,
    setCachedPosts
  };
}
