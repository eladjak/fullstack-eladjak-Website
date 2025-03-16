declare module 'perspective-api-client' {
  export interface PerspectiveConfig {
    apiKey: string;
  }

  export interface AnalyzeOptions {
    attributes: string[];
  }

  export interface AnalysisResult {
    attributeScores: {
      [key: string]: {
        summaryScore: {
          value: number;
        };
      };
    };
  }

  export class Perspective {
    constructor(config: PerspectiveConfig);
    analyze(text: string, options: AnalyzeOptions): Promise<AnalysisResult>;
  }
}
