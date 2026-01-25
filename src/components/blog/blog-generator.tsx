'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
      {/* ACCESSIBILITY FIX: Added Label for input field */}
      <div className="space-y-2">
        <Label htmlFor="blog-topic-input" required>
          Enter Topic for AI Generation
        </Label>
        <div className="flex items-center space-x-4">
          <Input
            id="blog-topic-input"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Web Performance Optimization"
            helperText="AI will generate a comprehensive blog post on this topic"
          />
          <Button
            onClick={handleGenerate}
            disabled={loading || !topic.trim()}
            className="flex items-center space-x-2 shrink-0"
            aria-busy={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>Generate Post</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
