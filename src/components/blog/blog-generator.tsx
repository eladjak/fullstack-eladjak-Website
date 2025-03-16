'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { generateBlogPost, publishGeneratedPost } from '@/lib/blog-generator';
import { useAuth } from '@/lib/auth';
import { toast } from 'react-hot-toast';

export default function BlogGenerator() {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const { user } = useAuth();

  const handleGenerate = async () => {
    if (!user) {
      toast.error('Please sign in to generate posts');
      return;
    }

    try {
      setLoading(true);
      const post = await generateBlogPost(topic);
      await publishGeneratedPost(user.id, post);
      toast.success('Blog post generated and published!');
      setTopic('');
    } catch (error) {
      console.error('Error generating post:', error);
      toast.error('Failed to generate blog post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic for AI generation..."
          className="flex-1 rounded-md border border-gray-300 px-3 py-2"
        />
        <Button
          onClick={handleGenerate}
          disabled={loading || !topic}
          className="flex items-center space-x-2"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          <span>Generate Post</span>
        </Button>
      </div>
    </div>
  );
}
