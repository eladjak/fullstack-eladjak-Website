'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { WhiteboardStore, WhiteboardState } from '@/types/whiteboard';

export function useWhiteboardStore(): WhiteboardState {
  const [store, setStore] = useState<WhiteboardStore | null>(null);

  useEffect(() => {
    if (!store) return;

    const channel = supabase.channel('whiteboard')
      .on('broadcast', { event: 'update' }, ({ payload }) => {
        if (store?.mergeRemoteChanges && payload.store) {
          store.mergeRemoteChanges(payload.store);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [store]);

  const handleStoreChange = useCallback((state: any) => {
    if (!store) return;
    
    supabase.channel('whiteboard').send({
      type: 'broadcast',
      event: 'update',
      payload: { store: state }
    });
  }, [store]);

  return {
    store,
    setStore,
    handleStoreChange
  };
}
