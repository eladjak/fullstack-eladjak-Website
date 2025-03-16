'use client';

import { supabase } from './supabase';
import { generateBlogContent, type BlogPostContent } from './services/openai';
import type { Tables } from './supabase.types';

type BlogPost = Tables<'blog_posts'>;

export const generateBlogPost = async (topic: string): Promise<BlogPostContent> => {
  try {
    return await generateBlogContent(topic);
  } catch (error) {
    console.error('Error generating blog post:', error);
    throw error;
  }
};

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export const publishGeneratedPost = async (userId: string, post: BlogPostContent): Promise<BlogPost> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        ...post,
        author_id: userId,
        published: true,
        created_at: new Date().toISOString(),
        slug: generateSlug(post.title),
        reading_time: Math.ceil(post.content.split(' ').length / 200) // Estimate reading time
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error publishing post:', error);
    throw error;
  }
};
