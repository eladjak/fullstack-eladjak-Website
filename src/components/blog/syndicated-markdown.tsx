import React from 'react';

/** Render the supported, non-executable Markdown subset as React elements. */
function inline(text: string): React.ReactNode[] {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const i = match.index;
    out.push(text.slice(last, i));
    if (match[1] && match[2]) {
      const href = match[2];
      const safe = /^\/(?!\/)/.test(href) || /^https?:\/\//i.test(href);
      out.push(safe ? <a key={i} href={href}>{match[1]}</a> : match[1]);
    } else if (match[3]) out.push(<strong key={i}>{match[3]}</strong>);
    else out.push(<code key={i}>{match[4]}</code>);
    last = i + match[0].length;
  }
  out.push(text.slice(last));
  return out;
}

export function SyndicatedMarkdown({ content }: { content: string }) {
  const lines = content.split('\n');
  const nodes: React.ReactNode[] = [];
  let fence: string[] | null = null;
  let language = '';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? '';
    if (line.startsWith('```')) {
      if (fence) {
        nodes.push(<pre key={i}><code className={language ? `language-${language}` : undefined}>{fence.join('\n')}</code></pre>);
        fence = null;
      } else { fence = []; language = line.slice(3).trim().replace(/[^a-zA-Z0-9_-]/g, ''); }
      continue;
    }
    if (fence) { fence.push(line); continue; }
    if (!line.trim()) continue;
    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = Math.min(6, Math.max(2, heading[1]!.length));
      nodes.push(React.createElement(`h${level}`, { key: i }, inline(heading[2]!)));
    } else if (/^---+$/.test(line.trim())) nodes.push(<hr key={i} />);
    else nodes.push(<p key={i}>{inline(line)}</p>);
  }
  if (fence) nodes.push(<pre key="unclosed"><code>{fence.join('\n')}</code></pre>);
  return <div>{nodes}</div>;
}
