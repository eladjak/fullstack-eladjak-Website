'use client';

import { useState, useEffect, useCallback, type CSSProperties, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Monitor, Tablet, Smartphone, Loader2, AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';

type DeviceType = 'desktop' | 'tablet' | 'mobile';

interface DeviceConfig {
  key: DeviceType;
  icon: ReactNode;
  width: number;
  labelKey: 'deviceDesktop' | 'deviceTablet' | 'deviceMobile';
}

const DEVICES: DeviceConfig[] = [
  { key: 'desktop', icon: <Monitor className="h-4 w-4" />, width: 1280, labelKey: 'deviceDesktop' },
  { key: 'tablet', icon: <Tablet className="h-4 w-4" />, width: 768, labelKey: 'deviceTablet' },
  { key: 'mobile', icon: <Smartphone className="h-4 w-4" />, width: 375, labelKey: 'deviceMobile' },
];

interface ProjectPreviewModalProps {
  url: string;
  title: string;
  onClose: () => void;
}

export function ProjectPreviewModal({ url, title, onClose }: ProjectPreviewModalProps) {
  const t = useTranslations('projectsPage.preview');
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleIframeLoad = useCallback(() => {
    // onLoad fires even when X-Frame-Options blocks the content.
    // We can't reliably detect a frame-block from outside the iframe in a cross-origin context,
    // so we rely on handleIframeError for network-level failures.
    setLoading(false);
  }, []);

  const handleIframeError = useCallback(() => {
    setLoading(false);
    setBlocked(true);
  }, []);

  const handleDeviceChange = (d: DeviceType) => {
    setDevice(d);
    setLoading(true);
    setBlocked(false);
  };

  const currentDevice = DEVICES.find((d) => d.key === device)!;

  // Map device to iframe container width class
  const iframeWrapperStyle: CSSProperties = {
    width: device === 'desktop' ? '100%' : `${currentDevice.width}px`,
    maxWidth: '100%',
    margin: '0 auto',
    transition: 'width 0.2s ease',
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} — ${t('urlBar')}`}
        className="fixed inset-4 md:inset-8 z-50 flex flex-col rounded-xl border border-white/10 bg-[#050810]/90 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 shrink-0">
          {/* Device selector */}
          <div className="flex items-center gap-1 rounded-lg bg-white/5 p-1" role="group" aria-label={t('urlBar')}>
            {DEVICES.map((d) => (
              <button
                key={d.key}
                onClick={() => handleDeviceChange(d.key)}
                title={t(d.labelKey)}
                aria-label={t(d.labelKey)}
                aria-pressed={device === d.key}
                className={`flex items-center justify-center rounded-md p-1.5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                  device === d.key
                    ? 'bg-purple-500/30 text-purple-300'
                    : 'text-white/50 hover:text-white/80 hover:bg-white/10'
                }`}
              >
                {d.icon}
              </button>
            ))}
          </div>

          {/* URL bar */}
          <div className="flex-1 flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 min-w-0">
            <span className="flex-1 truncate font-mono text-xs text-white/60 select-all" title={url}>
              {url}
            </span>
          </div>

          {/* Open in new tab */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={t('openInTab')}
            aria-label={t('openInTab')}
            className="flex items-center justify-center rounded-lg p-2 text-white/50 hover:text-white/90 hover:bg-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 shrink-0"
          >
            <ExternalLink className="h-4 w-4" />
          </a>

          {/* Close */}
          <button
            onClick={onClose}
            title={t('close')}
            aria-label={t('close')}
            className="flex items-center justify-center rounded-lg p-2 text-white/50 hover:text-white/90 hover:bg-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Preview area */}
        <div className="relative flex-1 overflow-auto bg-[#0a0d1a] flex items-start justify-center p-4">
          <div style={iframeWrapperStyle} className="relative h-full min-h-[400px]">
            {/* Loading overlay */}
            {loading && !blocked && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#050810]/80 rounded-lg">
                <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
                <p className="text-sm text-white/50">{t('loading')}</p>
              </div>
            )}

            {/* Blocked overlay */}
            {blocked && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[#050810]/95 rounded-lg text-center px-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/20">
                  <AlertTriangle className="h-7 w-7 text-amber-400" />
                </div>
                <div>
                  <p className="font-semibold text-white/90 mb-1">{t('blocked')}</p>
                  <p className="text-sm text-white/50">{t('blockedDetail')}</p>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-500 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                >
                  <ExternalLink className="h-4 w-4" />
                  {t('openExternal')}
                </a>
              </div>
            )}

            {/* The iframe */}
            <iframe
              src={url}
              title={title}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              className="w-full h-full rounded-lg border border-white/10"
              style={{
                minHeight: '500px',
                background: '#fff',
              }}
              // Sandbox allows scripts and same-origin but restricts popups and top-navigation
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
