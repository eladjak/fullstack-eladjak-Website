'use client';

import { motion } from "framer-motion";
import { Sparkles, Bot, Wand2, BrainCircuit } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import dynamic from 'next/dynamic';

const CodeOptimizer = dynamic(() => import('@/components/code/code-optimizer'), {
  ssr: false
});

const CollaborativeEditor = dynamic(() => import('@/components/code/collaborative-editor'), {
  ssr: false
});

export default function AIToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
            AI Tools & Services
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Explore our suite of AI-powered tools to enhance your workflow
          </p>
        </motion.div>

        <div className="space-y-8 lg:space-y-12">
          <CodeOptimizer />
          <CollaborativeEditor 
            roomId="demo-room"
            language="typescript"
            initialCode="// Start coding here..."
          />
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full bg-gradient-to-br from-card/50 to-card hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">Content Generation</h2>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Generate high-quality content for your blog posts, social media, and marketing materials using advanced AI models.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full bg-gradient-to-br from-card/50 to-card hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Bot className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">Smart Chat Assistant</h2>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get instant answers to your questions and receive intelligent suggestions based on your context.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-full bg-gradient-to-br from-card/50 to-card hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Wand2 className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">Code Enhancement</h2>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Automatically improve your code quality, fix bugs, and get intelligent refactoring suggestions.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="h-full bg-gradient-to-br from-card/50 to-card hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BrainCircuit className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">AI Analytics</h2>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get deep insights into your data with AI-powered analytics and visualization tools.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
