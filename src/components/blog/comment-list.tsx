'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';
import { ArrowUp, MessageCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import CommentForm from './comment-form';
import type { Tables } from '@/lib/supabase.types';

type Comment = Tables<'comments'> & {
  profiles: Tables<'profiles'> | null;
  _count?: { votes: number };
  replies?: Comment[];
};

interface CommentListProps {
  postId: string;
  parentId?: string;
  level?: number;
}

export default function CommentList({ postId, parentId = null, level = 0 }: CommentListProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [userVotes, setUserVotes] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadComments();
    if (user) {
      loadUserVotes();
    }

    // Subscribe to new comments
    const commentsChannel = supabase
      .channel('comments')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `post_id=eq.${postId}${parentId ? ` AND parent_id=eq.${parentId}` : ' AND parent_id=is.null'}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setComments(prev => [...prev, payload.new as Comment]);
          } else if (payload.eventType === 'DELETE') {
            setComments(prev => prev.filter(c => c.id !== payload.old.id));
          } else if (payload.eventType === 'UPDATE') {
            setComments(prev => prev.map(c => c.id === payload.new.id ? { ...c, ...payload.new } : c));
          }
        }
      )
      .subscribe();

    // Subscribe to vote changes
    const votesChannel = supabase
      .channel('comment_votes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comment_votes'
        },
        () => {
          // Reload comments to get updated vote counts
          loadComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(commentsChannel);
      supabase.removeChannel(votesChannel);
    };
  }, [postId, parentId, user]);

  const loadComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          profiles (
            username,
            avatar_url,
            id,
            full_name,
            updated_at
          ),
          votes:comment_votes(count)
        `)
        .eq('post_id', postId)
        .eq('parent_id', parentId)
        .eq('is_approved', true)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error loading comments:', error);
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const loadUserVotes = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('comment_votes')
        .select('comment_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setUserVotes(new Set(data.map(vote => vote.comment_id)));
    } catch (error) {
      console.error('Error loading user votes:', error);
    }
  };

  const handleVote = async (commentId: string) => {
    if (!user) {
      toast.error('Please sign in to vote');
      return;
    }

    try {
      if (userVotes.has(commentId)) {
        const { error } = await supabase
          .from('comment_votes')
          .delete()
          .eq('comment_id', commentId)
          .eq('user_id', user.id);

        if (error) throw error;
        setUserVotes(prev => {
          const next = new Set(prev);
          next.delete(commentId);
          return next;
        });
      } else {
        const { error } = await supabase
          .from('comment_votes')
          .insert([{ comment_id: commentId, user_id: user.id }]);

        if (error) throw error;
        setUserVotes(prev => new Set([...prev, commentId]));
      }
      await loadComments();
    } catch (error) {
      console.error('Error voting:', error);
      toast.error('Failed to register vote');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${level > 0 ? 'ml-8' : ''}`}>
      {comments.map((comment) => (
        <div key={comment.id} className="rounded-lg border p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <img
                src={comment.profiles?.avatar_url || 'https://via.placeholder.com/32'}
                alt={comment.profiles?.username || 'User'}
                className="h-8 w-8 rounded-full"
              />
              <span className="font-medium">{comment.profiles?.username}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleVote(comment.id)}
                className={userVotes.has(comment.id) ? 'bg-primary text-primary-foreground' : ''}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <span className="text-sm">{comment._count?.votes || 0}</span>
            </div>
          </div>
          <p className="mt-2 text-gray-700">{comment.content}</p>
          <div className="mt-2 flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Reply
            </Button>
          </div>
          {replyingTo === comment.id && (
            <div className="mt-4">
              <CommentForm
                postId={postId}
                parentId={comment.id}
                onSuccess={() => {
                  setReplyingTo(null);
                  loadComments();
                }}
                onCancel={() => setReplyingTo(null)}
              />
            </div>
          )}
          <CommentList postId={postId} parentId={comment.id} level={level + 1} />
        </div>
      ))}
      {level === 0 && (
        <div className="mt-6">
          <CommentForm postId={postId} onSuccess={loadComments} />
        </div>
      )}
    </div>
  );
}
