'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface AnalyticsEvent {
  event_type: string;
  page_url: string;
  component_id?: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export const useAnalytics = (componentId?: string) => {
  const trackEvent = async (
    eventType: string,
    metadata?: Record<string, any>
  ) => {
    try {
      const event: AnalyticsEvent = {
        event_type: eventType,
        page_url: window.location.pathname,
        component_id: componentId,
        metadata,
        timestamp: new Date().toISOString()
      };

      await supabase
        .from('analytics_events')
        .insert([event]);

    } catch (error) {
      console.error('Analytics error:', error);
    }
  };

  useEffect(() => {
    if (componentId) {
      trackEvent('component_mount');
      return () => {
        trackEvent('component_unmount');
      };
    }
  }, [componentId]);

  return { trackEvent };
};
