'use client';

export interface CodeReviewResult {
  suggestions: string[];
  improvements: {
    performance: string[];
    security: string[];
    style: string[];
  };
  score: number;
}

export interface ContentAnalysis {
  toxic: boolean;
  severe_toxic: boolean;
  threat: boolean;
  profanity: boolean;
  identity_attack: boolean;
  insult: boolean;
}

export interface BlogPostContent {
  title: string;
  description: string;
  content: string;
  tags: string[];
}

export async function reviewCode(code: string): Promise<CodeReviewResult> {
  const response = await fetch('/api/ai/review-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to review code');
  }

  return response.json();
}

export async function analyzeContent(text: string): Promise<ContentAnalysis> {
  const response = await fetch('/api/ai/moderate-content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to analyze content');
  }

  return response.json();
}

export async function generateBlogContent(topic: string): Promise<BlogPostContent> {
  const response = await fetch('/api/ai/generate-blog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ topic }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate blog content');
  }

  return response.json();
}
