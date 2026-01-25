import { createClient } from "@supabase/supabase-js";
// Note: @extractus/article-extractor has been removed to reduce bundle size
// If meta tag extraction is needed, consider using cheerio or a lightweight alternative

export { createClient };

export interface MetaTagsResponse {
  title: string;
  description: string;
  image: string;
  url: string;
  author?: string;
  reading_time?: number;
  published_date?: string;
  last_modified?: string;
}

export interface DenoRequest extends Request {
  method: string;
  headers: Headers;
  json(): Promise<any>;
}

declare global {
  interface Window {
    Deno: {
      env: {
        get(key: string): string | undefined;
      };
      serve(handler: (req: DenoRequest) => Promise<Response>): {
        finished: Promise<void>;
      };
    }
  }
}
