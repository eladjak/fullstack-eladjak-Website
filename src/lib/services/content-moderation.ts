'use client';

import { Perspective, type AnalysisResult } from 'perspective-api-client';

const perspective = new Perspective({
  apiKey: process.env.NEXT_PUBLIC_PERSPECTIVE_API_KEY || 'dummy_key'
});

export interface ContentAnalysis {
  toxic: boolean;
  severe_toxic: boolean;
  threat: boolean;
  profanity: boolean;
  identity_attack: boolean;
  insult: boolean;
}

export async function analyzeContent(text: string): Promise<ContentAnalysis> {
  try {
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

    return {
      toxic: result.attributeScores.TOXICITY.summaryScore.value > 0.7,
      severe_toxic: result.attributeScores.SEVERE_TOXICITY.summaryScore.value > 0.7,
      threat: result.attributeScores.THREAT.summaryScore.value > 0.7,
      profanity: result.attributeScores.PROFANITY.summaryScore.value > 0.7,
      identity_attack: result.attributeScores.IDENTITY_ATTACK.summaryScore.value > 0.7,
      insult: result.attributeScores.INSULT.summaryScore.value > 0.7
    };
  } catch (error) {
    console.error('Content analysis error:', error);
    return {
      toxic: false,
      severe_toxic: false,
      threat: false,
      profanity: false,
      identity_attack: false,
      insult: false
    };
  }
}
