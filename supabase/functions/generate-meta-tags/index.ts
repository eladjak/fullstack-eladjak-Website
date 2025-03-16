import { createClient, extract, type DenoRequest } from './types';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

const handler = async (req: DenoRequest): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = window.Deno.env.get('SUPABASE_URL');
    const supabaseKey = window.Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing required environment variables: SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY');
    }

    // Initialize Supabase client with service role key
    const supabaseClient = createClient(
      supabaseUrl,
      supabaseKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        }
      }
    );

    // Get user ID from auth header for logging
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { postId } = await req.json();
    if (!postId) {
      throw new Error('Post ID is required');
    }

    // Get blog post content with author info
    const { data: post, error: postError } = await supabaseClient
      .from('blog_posts')
      .select(`
        *,
        profiles (
          username,
          avatar_url,
          full_name
        )
      `)
      .eq('id', postId)
      .single();

    if (postError || !post) {
      throw new Error('Failed to fetch blog post');
    }

    // Extract article data and metadata
    const article = await extract(post.content);
    
    // Generate meta description with fallbacks
    const description = article?.description || 
                       post.description || 
                       `${post.content.replace(/<[^>]*>/g, '').slice(0, 150)}...`;

    // Find first image in content or use fallbacks
    const image = article?.image || 
                 post.profiles?.avatar_url || 
                 'https://images.unsplash.com/photo-1499750310107-5fef28a66643';

    // Generate reading time estimate
    const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed of 200 words per minute

    // Update post with meta information
    const { error: updateError } = await supabaseClient
      .from('blog_posts')
      .update({
        meta_tags: {
          title: post.title,
          description,
          image,
          url: `/blog/${post.slug}`,
          author: post.profiles?.full_name || post.profiles?.username,
          reading_time: readingTime,
          published_date: post.created_at,
          last_modified: new Date().toISOString()
        },
        reading_time: readingTime
      })
      .eq('id', postId);

    if (updateError) {
      throw updateError;
    }

    // Log successful meta tag generation
    console.info(`Generated meta tags for post ${postId} - ${post.title}`);

    return new Response(
      JSON.stringify({
        status: 'success',
        meta: {
          title: post.title,
          description,
          image,
          url: `/blog/${post.slug}`,
          author: post.profiles?.full_name || post.profiles?.username,
          reading_time: readingTime,
          published_date: post.created_at,
          last_modified: new Date().toISOString()
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error: unknown) {
    console.error('Error generating meta tags:', error);
    return new Response(
      JSON.stringify({
        status: 'error',
        message: error instanceof Error ? error.message : 'An unknown error occurred'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
};

await window.Deno.serve(handler).finished;
