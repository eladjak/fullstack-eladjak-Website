'use client';

import { Tldraw, useEditor } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import { useWhiteboardStore } from '@/hooks/useWhiteboardStore';
import type { WhiteboardStore, WhiteboardProps, WhiteboardCanvasProps } from '@/types/whiteboard';
import { useEffect, useState } from 'react';

const WhiteboardCanvas = ({ onMount, onChange }: WhiteboardCanvasProps): null => {
  const editor = useEditor();

  useEffect(() => {
    if (editor) {
      onMount(editor as WhiteboardStore);
      editor.on('change', onChange);
      
      return () => {
        editor.off('change', onChange);
      };
    }
  }, [editor, onMount, onChange]);

  return null;
};

export default function Whiteboard({ darkMode = true }: WhiteboardProps) {
  const [mounted, setMounted] = useState(false);
  const { setStore, handleStoreChange } = useWhiteboardStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="h-screen w-full">
      <Tldraw
        inferDarkMode={darkMode}
      >
        <WhiteboardCanvas 
          onMount={setStore}
          onChange={handleStoreChange}
        />
      </Tldraw>
    </div>
  );
}
