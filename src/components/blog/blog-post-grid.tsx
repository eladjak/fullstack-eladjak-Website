'use client';

import { motion } from 'framer-motion';
import BlogCard from './blog-card';
import type { BlogPost } from '@/types/blog';

interface BlogPostGridProps {
  posts: BlogPost[];
}

export default function BlogPostGrid({ posts }: BlogPostGridProps) {
  return (
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
  );
}
