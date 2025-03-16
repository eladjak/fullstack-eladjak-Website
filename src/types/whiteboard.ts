import type { Editor, TLStore } from '@tldraw/tldraw'

export interface WhiteboardStore extends Editor {
  mergeRemoteChanges?: (changes: any) => void;
  store: TLStore;
}

export interface WhiteboardState {
  store: WhiteboardStore | null;
  setStore: (store: WhiteboardStore) => void;
  handleStoreChange: (state: any) => void;
}

export interface WhiteboardProps {
  darkMode?: boolean;
}

export interface WhiteboardCanvasProps {
  onMount: (editor: WhiteboardStore) => void;
  onChange: (state: any) => void;
}
