'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface CacheConfig {
  key: string;
  ttl?: number; // Time to live in seconds
  staleTime?: number; // Time before data is considered stale
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  lastFetched: number;
}

export function useCache<T>({ key, ttl = 3600, staleTime = 300 }: CacheConfig) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  const getCachedData = (): CacheEntry<T> | null => {
    try {
      const cached = localStorage.getItem(`cache_${key}`);
      if (!cached) return null;
      return JSON.parse(cached);
    } catch (error) {
      console.error('Error reading from cache:', error);
      return null;
    }
  };

  const setCachedData = (data: T) => {
    try {
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        lastFetched: Date.now(),
      };
      localStorage.setItem(`cache_${key}`, JSON.stringify(entry));
    } catch (error) {
      console.error('Error writing to cache:', error);
    }
  };

  const isStale = (entry: CacheEntry<T>): boolean => {
    const now = Date.now();
    const age = now - entry.timestamp;
    return age > ttl * 1000;
  };

  const needsRefresh = (entry: CacheEntry<T>): boolean => {
    const now = Date.now();
    const timeSinceLastFetch = now - entry.lastFetched;
    return timeSinceLastFetch > staleTime * 1000;
  };

  return {
    data,
    setData,
    loading,
    setLoading,
    getCachedData,
    setCachedData,
    isStale,
    needsRefresh,
  };
}
