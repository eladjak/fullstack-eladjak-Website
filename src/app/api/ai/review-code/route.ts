import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';

// Lazy initialization - only create clients when API key is available
const getOpenAI = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

const getSupabase = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
};

export interface CodeReviewResult {
  suggestions: string[];
  improvements: {
    performance: string[];
    security: string[];
    style: string[];
  };
  score: number;
}

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Invalid code input' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert code reviewer specializing in:
            - Performance optimization and algorithmic efficiency
            - Security best practices and vulnerability detection
            - Clean code principles and design patterns
            - Type safety and error handling
            - Modern JavaScript/TypeScript features
            - React hooks and component lifecycle
            - State management patterns
            - Testing strategies
            Provide detailed, actionable feedback with code examples.`
        },
        {
          role: "user",
          content: `Review this code and suggest improvements:\n\n${code}`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const review = completion.choices[0].message?.content;
    if (!review) {
      return NextResponse.json(
        { error: 'No review generated' },
        { status: 500 }
      );
    }

    // Parse the review into structured feedback
    const result: CodeReviewResult = {
      suggestions: [],
      improvements: {
        performance: [],
        security: [],
        style: []
      },
      score: 0
    };

    // Extract suggestions and improvements from the review
    const lines = review.split('\n');
    let currentCategory: keyof typeof result.improvements | null = null;

    for (const line of lines) {
      if (line.toLowerCase().includes('performance:')) {
        currentCategory = 'performance';
      } else if (line.toLowerCase().includes('security:')) {
        currentCategory = 'security';
      } else if (line.toLowerCase().includes('style:')) {
        currentCategory = 'style';
      } else if (line.trim().startsWith('-') && currentCategory) {
        result.improvements[currentCategory].push(line.trim().slice(2));
      } else if (line.trim().startsWith('•')) {
        result.suggestions.push(line.trim().slice(2));
      }
    }

    // Calculate score based on number and severity of issues
    const totalIssues = Object.values(result.improvements).flat().length;
    result.score = Math.max(0, 100 - (totalIssues * 5));

    // Store analytics event (only if Supabase is configured)
    const supabase = getSupabase();
    if (supabase) {
      await supabase.from('analytics_events').insert([
        {
          event_type: 'code_review',
          page_url: '/code-review',
          metadata: {
            code_length: code.length,
            score: result.score,
            improvement_counts: {
              performance: result.improvements.performance.length,
              security: result.improvements.security.length,
              style: result.improvements.style.length
            }
          }
        }
      ]);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Code review error:', error);
    return NextResponse.json(
      { error: 'Failed to review code' },
      { status: 500 }
    );
  }
}
