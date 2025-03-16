'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/types/blog';
import { toast } from 'react-hot-toast';

interface QueryConfig {
  page: number;
  postsPerPage: number;
  tags?: string[];
}

export function useBlogQuery() {
  const [loading, setLoading] = useState(false);

  const fetchPosts = async ({ page, postsPerPage, tags }: QueryConfig): Promise<BlogPost[]> => {
    try {
      setLoading(true);
      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          profiles (
            id,
            username,
            avatar_url,
            full_name,
            updated_at
          )
        `)
        .eq('published', true)
        .order('created_at', { ascending: false })
        .range((page - 1) * postsPerPage, page * postsPerPage - 1);

      if (tags && tags.length > 0) {
        query = query.contains('tags', tags);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return (data || []) as BlogPost[];
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load blog posts');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchPosts
  };
}
