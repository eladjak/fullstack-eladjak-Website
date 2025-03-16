'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';

type SupabaseEvent = 'INSERT' | 'UPDATE' | 'DELETE' | '*';

interface SubscriptionConfig {
  channel: string;
  schema?: string;
  table: string;
  filter?: string;
  event?: SupabaseEvent;
}

type PostgresChangesListener<T> = (
  payload: RealtimePostgresChangesPayload<T>
) => void;

function useRealtimeChannel<T>(config: SubscriptionConfig, onEvent: PostgresChangesListener<T>) {
  const channelRef = useRef<RealtimeChannel | null>(null);

  const cleanup = useCallback(() => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }
  }, []);

  return { channelRef, cleanup };
}

function setupRealtimeChannel<T>(
  channel: RealtimeChannel,
  config: {
    event: SupabaseEvent;
    schema: string;
    table: string;
    filter?: string;
  },
  onEvent: PostgresChangesListener<T>
): RealtimeChannel {
  return channel.on(
    'postgres_changes' as any, // Type assertion needed for Supabase types
    {
      event: config.event,
      schema: config.schema,
      table: config.table,
      filter: config.filter,
    },
    (payload: RealtimePostgresChangesPayload<T>) => {
      onEvent(payload);
    }
  );
}

export function useRealtimeSubscription<T>(
  config: SubscriptionConfig,
  onEvent: PostgresChangesListener<T>
) {
  const { channelRef, cleanup } = useRealtimeChannel(config, onEvent);

  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'error'>('disconnected');
  const retryCount = useRef(0);
  const maxRetries = 5;

  useEffect(() => {
    const setupChannel = () => {
      try {
        cleanup();

        const channel = supabase.channel(`realtime:${config.table}:${config.event || '*'}`);
        let reconnectTimer: ReturnType<typeof setTimeout>;
        
        channelRef.current = setupRealtimeChannel(
          channel,
          {
            event: config.event || '*',
            schema: config.schema || 'public',
            table: config.table,
            filter: config.filter,
          },
          onEvent
        );

        const handleReconnect = () => {
          if (retryCount.current < maxRetries) {
            retryCount.current++;
            const delay = Math.min(1000 * Math.pow(2, retryCount.current), 30000);
            reconnectTimer = setTimeout(setupChannel, delay);
          } else {
            setConnectionStatus('error');
          }
        };

        channelRef.current.subscribe(async (status) => {
          if (status === 'SUBSCRIBED') {
            setConnectionStatus('connected');
            retryCount.current = 0;
            
            // Set up presence
            await channel.track({
              online_at: new Date().toISOString(),
              user_id: Math.random().toString()
            });
          } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
            setConnectionStatus('disconnected');
            handleReconnect();
          }
        });

        return () => {
          clearTimeout(reconnectTimer);
        };
      } catch (error) {
        console.error('Error setting up realtime subscription:', error);
        setConnectionStatus('error');
      }
    };

    setupChannel();

    return cleanup;
  }, [
    config.channel,
    config.table,
    config.filter,
    config.event,
    config.schema,
    onEvent,
    cleanup
  ]);
}
