'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';
import { Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Message {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  profiles?: {
    username: string;
    avatar_url: string;
  };
}

export default function ChatWindow() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMessages();

    const channel = supabase
      .channel('chat')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages(prev => [...prev, newMessage]);
          scrollToBottom();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          profiles (username, avatar_url)
        `)
        .order('created_at', { ascending: true })
        .limit(50);

      if (error) throw error;
      setMessages(data || []);
      scrollToBottom();
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newMessage.trim()) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            content: newMessage,
            user_id: user.id
          }
        ]);

      if (error) throw error;
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[600px] flex-col rounded-lg border bg-card">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex items-start space-x-3 ${
                message.user_id === user?.id ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              {/* PERFORMANCE FIX: Next.js Image instead of <img> */}
              <Image
                src={message.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(message.profiles?.username || 'User')}&size=40&background=8B5CF6&color=fff`}
                alt={message.profiles?.username || 'User'}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
                loading="lazy"
              />
              <div
                className={`rounded-lg px-4 py-2 max-w-[70%] ${
                  message.user_id === user?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm font-medium mb-1">
                  {message.profiles?.username || 'Anonymous'}
                </p>
                <p className="text-sm">{message.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      {/* ACCESSIBILITY FIX: Added Label for screen readers */}
      <form onSubmit={sendMessage} className="border-t p-4">
        <div className="flex space-x-2 items-end">
          <div className="flex-1">
            <Label htmlFor="message-input" className="sr-only">
              Message
            </Label>
            <Input
              id="message-input"
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
            />
          </div>
          <Button
            type="submit"
            size="icon"
            disabled={loading || !newMessage.trim()}
            aria-label="Send message"
            aria-busy={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
