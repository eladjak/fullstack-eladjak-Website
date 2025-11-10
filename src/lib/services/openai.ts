'use client';

import { OpenAI } from 'openai';

// Note: This should be moved to a server-side Edge Function for production
// For now, we'll use environment variable but this is NOT secure for client-side
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true
});

export interface BlogPostContent {
  title: string;
  description: string;
  content: string;
  tags: string[];
}

export async function generateBlogContent(topic: string): Promise<BlogPostContent> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a professional blog writer specializing in technology and development."
      },
      {
        role: "user",
        content: `Write a blog post about ${topic}. Include a title, description, and content.`
      }
    ],
  });

  const response = completion.choices[0].message?.content;
  if (!response) throw new Error('No response from OpenAI');

  // Parse the response into blog post format
  const [title, ...contentArr] = response.split('\n\n');
  const description = contentArr[0];
  const content = contentArr.slice(1).join('\n\n');

  return {
    title: title.replace('Title: ', ''),
    description,
    content,
    tags: ['AI-Generated', topic]
  };
}
