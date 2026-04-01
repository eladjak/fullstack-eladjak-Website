'use client';

import { useState } from 'react';
import { Share2, Linkedin, MessageCircle, Link } from 'lucide-react';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';

interface SocialShareProps {
  url: string;
  title: string;
}

export function SocialShare({ url, title }: SocialShareProps) {
  const t = useTranslations('blog.share');
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      key: 'twitter',
      label: t('twitter'),
      icon: Share2,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      key: 'linkedin',
      label: t('linkedin'),
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      key: 'whatsapp',
      label: t('whatsapp'),
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success(t('copied'));
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 my-4">
      {shareLinks.map(({ key, label, icon: Icon, href }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm
            bg-white/5 backdrop-blur border border-white/10
            text-muted-foreground hover:text-foreground hover:bg-white/10
            transition-colors duration-150"
        >
          <Icon className="h-3.5 w-3.5" />
          <span>{label}</span>
        </a>
      ))}

      <button
        type="button"
        onClick={handleCopyLink}
        aria-label={t('copyLink')}
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm
          bg-white/5 backdrop-blur border border-white/10
          text-muted-foreground hover:text-foreground hover:bg-white/10
          transition-colors duration-150"
      >
        <Link className="h-3.5 w-3.5" />
        <span>{copied ? t('copied') : t('copyLink')}</span>
      </button>
    </div>
  );
}
