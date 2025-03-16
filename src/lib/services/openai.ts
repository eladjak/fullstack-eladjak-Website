'use client';

import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: 'dummy-key', // Using dummy key for static export
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
