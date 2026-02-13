import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

export interface BlogPostContent {
  title: string;
  description: string;
  content: string;
  tags: string[];
}

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();

    if (!topic || typeof topic !== 'string') {
      return NextResponse.json(
        { error: 'Invalid topic input' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

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
    if (!response) {
      return NextResponse.json(
        { error: 'No response from OpenAI' },
        { status: 500 }
      );
    }

    // Parse the response into blog post format
    const [title, ...contentArr] = response.split('\n\n');
    const description = contentArr[0];
    const content = contentArr.slice(1).join('\n\n');

    const blogPost: BlogPostContent = {
      title: title.replace('Title: ', ''),
      description,
      content,
      tags: ['AI-Generated', topic]
    };

    return NextResponse.json(blogPost);
  } catch (error) {
    console.error('Blog generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate blog content' },
      { status: 500 }
    );
  }
}
