'use client';

import dynamic from 'next/dynamic';
import { useMetaTags } from '@/hooks/useMetaTags';

const Whiteboard = dynamic(
  () => import('@/components/whiteboard/whiteboard'),
  { ssr: false }
);

export default function WhiteboardPage() {
  useMetaTags({
    title: 'Collaborative Whiteboard | Portfolio',
    description: 'Real-time collaborative whiteboard for brainstorming and design',
    type: 'tool'
  });

  return <Whiteboard darkMode={true} />;
}
