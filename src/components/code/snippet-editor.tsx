'use client';

import { useState } from 'react';
import { Editor as MonacoEditor } from '@monaco-editor/react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { reviewCode, type CodeReviewResult } from '@/lib/services/code-review';

interface SnippetEditorProps {
  initialCode?: string;
  language?: string;
}

export default function SnippetEditor({ initialCode = '', language = 'typescript' }: SnippetEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [reviewResult, setReviewResult] = useState<CodeReviewResult | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);

  const improveCode = async () => {
    setLoading(true);
    try {
      const result = await reviewCode(code);
      setReviewResult(result);
      setSuggestions(result.suggestions);
    } catch (error) {
      console.error('Error improving code:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between bg-card">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">{language.toUpperCase()}</span>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopy}
              className="h-8 w-8"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={improveCode}
              className="h-8 w-8"
              disabled={loading}
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
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
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              automaticLayout: true,
              suggestOnTriggerCharacters: true,
              quickSuggestions: true,
            }}
          />
        </motion.div>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 space-y-2"
          >
            <h4 className="text-sm font-medium">AI Suggestions</h4>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-2 rounded-md cursor-pointer transition-colors ${
                    index === activeSuggestion
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                  onClick={() => {
                    setActiveSuggestion(index);
                    setCode(code + '\n' + suggestion);
                  }}
                >
                  {suggestion}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
