'use client';

import { motion } from 'framer-motion';
import { Brain, Bot, Link, Zap, Code, Cpu, Sparkles, Layers, Settings } from 'lucide-react';
import { ScrollAnimate } from '@/components/ui/scroll-animate';
import { useTranslations } from 'next-intl';
import DemoPlayground from '@/components/ai/demo-playground';

const toolIcons = [Brain, Bot, Link, Zap, Code, Cpu] as const;

const toolKeys = [
  'claude',
  'openai',
  'langchain',
  'supabaseAi',
  'vercelAiSdk',
  'huggingFace',
] as const;

const toolTags: Record<string, string[]> = {
  claude: ['reasoning', 'code', 'analysis'],
  openai: ['gpt4', 'dalle', 'whisper'],
  langchain: ['chains', 'agents', 'rag'],
  supabaseAi: ['vectors', 'embeddings', 'pgvector'],
  vercelAiSdk: ['streaming', 'edge', 'react'],
  huggingFace: ['models', 'transformers', 'nlp'],
};

const highlightIcons = [Sparkles, Layers, Settings] as const;
const highlightKeys = ['codeGeneration', 'aiFeatures', 'automation'] as const;

export default function AIToolsPage() {
  const t = useTranslations('aiToolsPage');

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <ScrollAnimate>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
              {t('title')}
            </h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>
        </ScrollAnimate>

        {/* AI Tool Cards Grid */}
        <section className="mb-20" aria-label={t('toolsSection')}>
          <ScrollAnimate>
            <h2 className="text-3xl font-bold text-center mb-10">
              {t('toolsSection')}
            </h2>
          </ScrollAnimate>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {toolKeys.map((key, index) => {
              const Icon = toolIcons[index];
              const tags = toolTags[key];
              return (
                <ScrollAnimate key={key} delay={index * 0.05}>
                  <motion.div
                    initial={{ opacity: 0.85 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.15 }}
                    className="h-full rounded-xl border border-border/50 bg-card p-6 flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-semibold">
                        {t(`tools.${key}.title`)}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">
                      {t(`tools.${key}.description`)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </ScrollAnimate>
              );
            })}
          </div>
        </section>

        {/* How I Use AI Section */}
        <section className="mb-20" aria-label={t('howIUseAi')}>
          <ScrollAnimate>
            <h2 className="text-3xl font-bold text-center mb-10">
              {t('howIUseAi')}
            </h2>
          </ScrollAnimate>
          <div className="grid gap-6 sm:grid-cols-3">
            {highlightKeys.map((key, index) => {
              const Icon = highlightIcons[index];
              return (
                <ScrollAnimate key={key} delay={index * 0.05}>
                  <motion.div
                    initial={{ opacity: 0.85 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.15 }}
                    className="rounded-xl border border-border/50 bg-card p-6 text-center"
                  >
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {t(`highlights.${key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`highlights.${key}.description`)}
                    </p>
                  </motion.div>
                </ScrollAnimate>
              );
            })}
          </div>
        </section>

        {/* Interactive Demo Playground */}
        <section aria-label={t('demoSection')}>
          <ScrollAnimate>
            <h2 className="text-3xl font-bold text-center mb-10">
              {t('demoSection')}
            </h2>
          </ScrollAnimate>
          <ScrollAnimate delay={0.05}>
            <DemoPlayground />
          </ScrollAnimate>
        </section>
      </div>
    </div>
  );
}
