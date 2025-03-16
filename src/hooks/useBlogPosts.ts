'use client';

import { useEffect } from 'react';
import { usePostCache } from './blog/usePostCache';
import { useBlogQuery } from './blog/useBlogQuery';

interface UseBlogPostsProps {
  page: number;
  selectedTags: string[];
  postsPerPage: number;
}

export function useBlogPosts({ page, selectedTags, postsPerPage }: UseBlogPostsProps) {
  const { posts, setPosts, getCachedPosts, setCachedPosts } = usePostCache();
  const { loading, fetchPosts } = useBlogQuery();

  useEffect(() => {
    const loadPosts = async () => {
      const cacheKey = `${page}_${selectedTags.sort().join('_')}_${postsPerPage}`;
      
      // Try cache first
      const cached = getCachedPosts(cacheKey);
      if (cached) {
        if ('stale' in cached) {
          setPosts(cached.data);
          // Refresh in background
          const freshData = await fetchPosts({ page, postsPerPage, tags: selectedTags });
          setPosts(freshData);
          setCachedPosts(cacheKey, freshData);
        } else {
          setPosts(cached);
        }
        return;
      }

      // No cache or expired, fetch fresh
      const data = await fetchPosts({ page, postsPerPage, tags: selectedTags });
      setPosts(data);
      setCachedPosts(cacheKey, data);
    };

    loadPosts();
  }, [page, selectedTags, postsPerPage]);

  return { posts, loading, setPosts };
}
