import { createClient } from '@supabase/supabase-js'
import type { Database } from './supabase.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'Cache-Control': 'max-age=3600'
    }
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Enhanced cache helper with stale-while-revalidate
export const withCache = async <T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 3600,
  staleTime: number = 300 // Time before data is considered stale (5 minutes)
): Promise<T> => {
  const cacheKey = `supabase_cache_${key}`;
  const now = Date.now();

  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      const age = now - timestamp;

      // Return cached data immediately if within TTL
      if (age < ttl * 1000) {
        return data as T;
      }

      // If data is stale but not expired, return cached data and refresh in background
      if (age < (ttl + staleTime) * 1000) {
        // Background refresh
        fetcher().then(newData => {
          localStorage.setItem(cacheKey, JSON.stringify({
            data: newData,
            timestamp: now
          }));
        }).catch(console.error);

        return data as T;
      }
    }

    // No cache or expired cache, fetch fresh data
    const data = await fetcher();
    localStorage.setItem(cacheKey, JSON.stringify({
      data,
      timestamp: now
    }));

    return data;
  } catch (error) {
    console.error('Cache error:', error);
    // On cache error, bypass cache and fetch directly
    return await fetcher();
  }
}

// Cache invalidation helper
export const invalidateCache = (pattern?: string) => {
  try {
    if (pattern) {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('supabase_cache_') && key.includes(pattern)) {
          localStorage.removeItem(key);
        }
      });
    } else {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('supabase_cache_')) {
          localStorage.removeItem(key);
        }
      });
    }
  } catch (error) {
    console.error('Error invalidating cache:', error);
  }
}

