import { NextRequest, NextResponse } from 'next/server';
import { Perspective } from 'perspective-api-client';

export interface ContentAnalysis {
  toxic: boolean;
  severe_toxic: boolean;
  threat: boolean;
  profanity: boolean;
  identity_attack: boolean;
  insult: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Invalid text input' },
        { status: 400 }
      );
    }

    if (!process.env.PERSPECTIVE_API_KEY) {
      // Return safe defaults if API key is not configured
      return NextResponse.json({
        toxic: false,
        severe_toxic: false,
        threat: false,
        profanity: false,
        identity_attack: false,
        insult: false
      });
    }

    const perspective = new Perspective({
      apiKey: process.env.PERSPECTIVE_API_KEY
    });

    const result = await perspective.analyze(text, {
      attributes: [
        'TOXICITY',
        'SEVERE_TOXICITY',
        'THREAT',
        'PROFANITY',
        'IDENTITY_ATTACK',
        'INSULT'
      ]
    });

    const analysis: ContentAnalysis = {
      toxic: result.attributeScores.TOXICITY.summaryScore.value > 0.7,
      severe_toxic: result.attributeScores.SEVERE_TOXICITY.summaryScore.value > 0.7,
      threat: result.attributeScores.THREAT.summaryScore.value > 0.7,
      profanity: result.attributeScores.PROFANITY.summaryScore.value > 0.7,
      identity_attack: result.attributeScores.IDENTITY_ATTACK.summaryScore.value > 0.7,
      insult: result.attributeScores.INSULT.summaryScore.value > 0.7
    };

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Content analysis error:', error);
    // Return safe defaults on error
    return NextResponse.json({
      toxic: false,
      severe_toxic: false,
      threat: false,
      profanity: false,
      identity_attack: false,
      insult: false
    });
  }
}
