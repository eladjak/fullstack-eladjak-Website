// Server-side only - DO NOT import this file in client components
// Use @/lib/services/client/ai-service instead for client-side code

export interface ContentAnalysis {
  toxic: boolean;
  severe_toxic: boolean;
  threat: boolean;
  profanity: boolean;
  identity_attack: boolean;
  insult: boolean;
}

const SAFE_DEFAULTS: ContentAnalysis = {
  toxic: false,
  severe_toxic: false,
  threat: false,
  profanity: false,
  identity_attack: false,
  insult: false,
};

const ATTRIBUTES = [
  'TOXICITY',
  'SEVERE_TOXICITY',
  'THREAT',
  'PROFANITY',
  'IDENTITY_ATTACK',
  'INSULT',
] as const;

export async function analyzeContent(text: string): Promise<ContentAnalysis> {
  if (!process.env.PERSPECTIVE_API_KEY) {
    return SAFE_DEFAULTS;
  }

  try {
    const url = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${process.env.PERSPECTIVE_API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        comment: { text },
        requestedAttributes: Object.fromEntries(ATTRIBUTES.map(a => [a, {}])),
      }),
    });

    if (!response.ok) {
      console.error('Perspective API error:', response.status);
      return SAFE_DEFAULTS;
    }

    const result = await response.json();

    return {
      toxic: result.attributeScores.TOXICITY.summaryScore.value > 0.7,
      severe_toxic: result.attributeScores.SEVERE_TOXICITY.summaryScore.value > 0.7,
      threat: result.attributeScores.THREAT.summaryScore.value > 0.7,
      profanity: result.attributeScores.PROFANITY.summaryScore.value > 0.7,
      identity_attack: result.attributeScores.IDENTITY_ATTACK.summaryScore.value > 0.7,
      insult: result.attributeScores.INSULT.summaryScore.value > 0.7,
    };
  } catch (error) {
    console.error('Content analysis error:', error);
    return SAFE_DEFAULTS;
  }
}
