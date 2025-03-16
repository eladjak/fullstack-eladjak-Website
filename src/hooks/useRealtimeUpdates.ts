'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';
import type { RealtimeChannel } from '@supabase/supabase-js';
import type { RealtimeConfig } from '@/types/realtime';
import type { Tables } from '@/lib/supabase.types';

type ValidTables = 'blog_posts' | 'projects' | 'comments' | 'notifications' | 'profiles';

export function useRealtimeUpdates<T extends ValidTables>(config: RealtimeConfig<T>) {
  useEffect(() => {
    let channel: RealtimeChannel;

    const setupSubscription = () => {
      const tableName = String(config.table);
      channel = supabase
        .channel(`${tableName}-changes`)
        .on(
          'postgres_changes' as const,
          {
            event: '*',
            schema: 'public',
            table: tableName,
            filter: config.filter
          },
          (payload: any) => {
            switch (payload.eventType) {
              case 'INSERT':
                config.onInsert?.(payload.new);
                if (config.toastMessages?.insert) {
                  toast.success(config.toastMessages.insert);
                }
                break;
              case 'UPDATE':
                config.onUpdate?.(payload.new);
                if (config.toastMessages?.update) {
                  toast.success(config.toastMessages.update);
                }
                break;
              case 'DELETE':
                config.onDelete?.(payload.old);
                if (config.toastMessages?.delete) {
                  toast.success(config.toastMessages.delete);
                }
                break;
            }
          }
        )
        .subscribe((status) => {
          if (status !== 'SUBSCRIBED') {
            console.error('Failed to subscribe:', status);
          }
        });
    };

    setupSubscription();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [config]);
}
