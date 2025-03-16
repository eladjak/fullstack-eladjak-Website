'use client';

import { useState } from 'react';
import { Editor as MonacoEditor } from '@monaco-editor/react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { reviewCode } from '@/lib/services/code-review';

interface CodeOptimizerProps {
  initialCode?: string;
  language?: string;
}

export default function CodeOptimizer({ initialCode = '', language = 'typescript' }: CodeOptimizerProps) {
  const [code, setCode] = useState(initialCode);
  const [optimizedCode, setOptimizedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [improvements, setImprovements] = useState<string[]>([]);

  const optimizeCode = async () => {
    setLoading(true);
    try {
      // For static export, return dummy improvements
      const dummyResult = {
        suggestions: [
          '// Suggested optimization 1',
          '// Suggested optimization 2'
        ],
        improvements: {
          performance: [
            'Example performance improvement 1',
            'Example performance improvement 2'
          ]
        }
      };
      
      const optimized = dummyResult.suggestions.reduce((acc, suggestion) => {
        return acc + '\n' + suggestion;
      }, code);
      
      setOptimizedCode(optimized);
      setImprovements(dummyResult.improvements.performance);
    } catch (error) {
      console.error('Error optimizing code:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between bg-card">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <Code2 className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Original Code</h3>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <MonacoEditor
            height="400px"
            defaultLanguage={language}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              automaticLayout: true,
            }}
          />
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between bg-card">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Optimized Code</h3>
            </div>
            <Button onClick={optimizeCode} disabled={loading}>
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>
              ) : (
                <>
                  Optimize
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <MonacoEditor
              height="400px"
              defaultLanguage={language}
              value={optimizedCode}
              theme="vs-dark"
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                automaticLayout: true,
              }}
            />
          </CardContent>
        </Card>

        {improvements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold">Performance Improvements</h4>
            <div className="space-y-2">
              {improvements.map((improvement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-lg bg-secondary/50 p-3"
                >
                  {improvement}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
