'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';
import { analyzeContent } from '@/lib/services/content-moderation';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'react-hot-toast';
import type { Tables } from '@/lib/supabase.types';

type Comment = Tables<'comments'>;

interface CommentFormProps {
  postId: string;
  parentId?: string;
  onSuccess: () => void;
  onCancel?: () => void;
  post?: {
    author_id: string;
    title: string;
    slug: string;
  };
}

export default function CommentForm({ postId, parentId, onSuccess, onCancel, post }: CommentFormProps) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);

      // Analyze content before submission
      const analysis = await analyzeContent(content);
      
      if (analysis.toxic || analysis.severe_toxic || analysis.threat) {
        toast.error('Your comment contains inappropriate content. Please revise and try again.');
        return;
      }
      const { error } = await supabase
        .from('comments')
        .insert([{
          content,
          post_id: postId,
          parent_id: parentId,
          author_id: user.id,
          is_approved: false
        }]);

      if (error) throw error;

      // Create notification for post author if it's a top-level comment
      if (!parentId && post) {
        const { error: notifError } = await supabase
          .from('notifications')
          .insert([{
            user_id: post.author_id,
            title: 'New Comment',
            message: `Someone commented on your post: "${post.title}"`,
            type: 'comment',
            link: `/blog/${post.slug}`,
          }]);

        if (notifError) console.error('Error creating notification:', notifError);
      }

      // Create notification for parent comment author if it's a reply
      if (parentId) {
        const { data: parentComment } = await supabase
          .from('comments')
          .select('author_id')
          .eq('id', parentId)
          .single();

        if (parentComment) {
          const { error: notifError } = await supabase
            .from('notifications')
            .insert([{
              user_id: parentComment.author_id,
              title: 'New Reply',
              message: 'Someone replied to your comment',
              type: 'reply',
              link: post?.slug ? `/blog/${post.slug}` : undefined,
            }]);

          if (notifError) console.error('Error creating notification:', notifError);
        }
      }

      setContent('');
      toast.success('Comment submitted for approval');
      onSuccess();
    } catch (error) {
      console.error('Error posting comment:', error);
      toast.error('Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ACCESSIBILITY FIX: Added Label component for screen reader support */}
      <div className="space-y-2">
        <Label htmlFor="comment-content" required>
          Write a comment
        </Label>
        <Textarea
          id="comment-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts..."
          required
          rows={3}
          helperText="Your comment will be reviewed before posting"
        />
      </div>
      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={loading || !content.trim()}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              Posting...
            </>
          ) : (
            'Post Comment'
          )}
        </Button>
      </div>
    </form>
  );
}
