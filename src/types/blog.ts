import type { Tables } from '@/lib/supabase.types';

export interface MetaTag {
  id: string;
  post_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface BlogPost extends Tables<'blog_posts'> {
  profiles: Tables<'profiles'> | null;
  meta_tags?: MetaTag;
}
