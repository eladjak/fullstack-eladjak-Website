'use client';

import { motion } from "framer-motion";
import { Sparkles, Bot, Wand2, BrainCircuit } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollAnimate } from "@/components/ui/scroll-animate";
import { useTranslations } from "next-intl";
import dynamic from 'next/dynamic';

const CodeOptimizer = dynamic(() => import('@/components/code/code-optimizer'), {
  ssr: false
});

const CollaborativeEditor = dynamic(() => import('@/components/code/collaborative-editor'), {
  ssr: false
});

export default function AIToolsPage() {
  const t = useTranslations('aiToolsPage');

  const cards = [
    {
      icon: Sparkles,
      titleKey: 'contentGeneration.title' as const,
      descKey: 'contentGeneration.description' as const,
      delay: 0.05,
    },
    {
      icon: Bot,
      titleKey: 'smartChat.title' as const,
      descKey: 'smartChat.description' as const,
      delay: 0.1,
    },
    {
      icon: Wand2,
      titleKey: 'codeEnhancement.title' as const,
      descKey: 'codeEnhancement.description' as const,
      delay: 0.15,
    },
    {
      icon: BrainCircuit,
      titleKey: 'aiAnalytics.title' as const,
      descKey: 'aiAnalytics.description' as const,
      delay: 0.2,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-16">
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
            <p className="mt-4 text-xl text-muted-foreground">
              {t('subtitle')}
            </p>
          </motion.div>
        </ScrollAnimate>

        <div className="space-y-8 lg:space-y-12">
          <CodeOptimizer />
          <CollaborativeEditor
            roomId="demo-room"
            language="typescript"
            initialCode="// Start coding here..."
          />
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <ScrollAnimate key={card.titleKey} delay={card.delay}>
                <Card className="h-full bg-gradient-to-br from-card/50 to-card hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-primary" />
                      <h2 className="text-2xl font-semibold">{t(card.titleKey)}</h2>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t(card.descKey)}
                    </p>
                  </CardContent>
                </Card>
              </ScrollAnimate>
            );
          })}
        </div>
      </div>
    </div>
  );
}
