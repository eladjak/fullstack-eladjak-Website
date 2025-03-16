'use client';

import { useEffect, useState } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Code2, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';

interface CollaborativeEditorProps {
  roomId: string;
  language?: string;
  initialCode?: string;
}

export default function CollaborativeEditor({
  roomId,
  language = 'typescript',
  initialCode = ''
}: CollaborativeEditorProps) {
  const [copied, setCopied] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<number>(1);
  const { user } = useAuth();
  const [editorInstance, setEditorInstance] = useState<any>(null);

  useEffect(() => {
    if (!editorInstance) return;

    const doc = new Y.Doc();
    const provider = new WebsocketProvider(
      'wss://demos.yjs.dev',
      `code-${roomId}`,
      doc
    );

    const type = doc.getText('monaco');
    const binding = new MonacoBinding(
      type,
      editorInstance.getModel(),
      new Set([editorInstance]),
      provider.awareness
    );

    provider.awareness.setLocalStateField('user', {
      name: user?.email || 'Anonymous',
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    });

    provider.awareness.on('change', () => {
      const states = Array.from(provider.awareness.getStates().values());
      setOnlineUsers(states.length);
    });

    return () => {
      binding.destroy();
      provider.destroy();
      doc.destroy();
    };
  }, [editorInstance, roomId, user]);

  const handleCopy = async () => {
    if (!editorInstance) return;
    const code = editorInstance.getValue();
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between bg-card">
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <Code2 className="h-5 w-5" />
          <span className="text-sm font-medium">{language.toUpperCase()}</span>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{onlineUsers} online</span>
          </div>
        </div>
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
      </CardHeader>
      <CardContent className="p-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="h-[600px]"
        >
          <Editor
            defaultLanguage={language}
            defaultValue={initialCode}
            theme="vs-dark"
            options={{
              fontSize: 14,
              lineNumbers: 'on',
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on',
              suggestOnTriggerCharacters: true,
              quickSuggestions: true,
            }}
            onMount={(editor) => setEditorInstance(editor)}
          />
        </motion.div>
      </CardContent>
    </Card>
  );
}
