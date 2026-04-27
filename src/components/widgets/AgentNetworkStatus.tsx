'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

type Status = 'green' | 'yellow' | 'red' | 'unknown';

interface HealthData {
  total: number;
  healthy: number;
  status: Status;
  fetchedAt: string;
  fallback?: boolean;
}

const HUB_URL = 'https://hub.eladjak.com/health';
const POLL_MS = 60_000;
const TIMEOUT_MS = 5_000;
const ASSUMED_TOTAL = 13;

async function fetchHealth(): Promise<HealthData> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(HUB_URL, {
      signal: controller.signal,
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json: unknown = await res.json();
    // The hub /health response shape may vary — try a few common keys defensively.
    const data = json as Record<string, unknown>;

    // Try common shapes:
    // { agents: { total, healthy } } | { total, healthy } | { services: [{healthy}, ...] }
    let total: number | undefined;
    let healthy: number | undefined;

    if (data && typeof data === 'object') {
      if (
        'agents' in data &&
        data.agents &&
        typeof data.agents === 'object'
      ) {
        const a = data.agents as Record<string, unknown>;
        if (typeof a.total === 'number') total = a.total;
        if (typeof a.healthy === 'number') healthy = a.healthy;
      }
      if (typeof data.total === 'number' && total === undefined) total = data.total;
      if (typeof data.healthy === 'number' && healthy === undefined)
        healthy = data.healthy;
      if (Array.isArray(data.services)) {
        const services = data.services as Array<Record<string, unknown>>;
        if (total === undefined) total = services.length;
        if (healthy === undefined)
          healthy = services.filter(
            (s) =>
              s.healthy === true ||
              s.status === 'ok' ||
              s.status === 'healthy' ||
              s.status === 'up'
          ).length;
      }
    }

    if (total === undefined || healthy === undefined) {
      // Endpoint reachable but unrecognized shape — be honest: status unknown.
      return {
        total: ASSUMED_TOTAL,
        healthy: 0,
        status: 'unknown',
        fetchedAt: new Date().toISOString(),
        fallback: true,
      };
    }

    let status: Status = 'green';
    if (healthy === 0) status = 'red';
    else if (healthy < total) status = 'yellow';

    return {
      total,
      healthy,
      status,
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    clearTimeout(timeoutId);
    // CORS/network/timeout — be honest: we don't know.
    return {
      total: ASSUMED_TOTAL,
      healthy: 0,
      status: 'unknown',
      fetchedAt: new Date().toISOString(),
      fallback: true,
    };
  }
}

const STATUS_COLOR: Record<Status, string> = {
  green: 'bg-emerald-500',
  yellow: 'bg-amber-500',
  red: 'bg-rose-500',
  unknown: 'bg-zinc-400',
};

function statusLabel(d: HealthData): string {
  if (d.fallback || d.status === 'unknown') return 'סטטוס רשת לא זמין';
  if (d.status === 'red') return 'השרת בתחזוקה';
  return `${d.healthy}/${d.total} סוכנים פעילים`;
}

export function AgentNetworkStatus() {
  const [data, setData] = useState<HealthData | null>(null);
  const [showTip, setShowTip] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      const next = await fetchHealth();
      if (mounted) setData(next);
    };

    const startPolling = () => {
      if (intervalRef.current) return;
      intervalRef.current = setInterval(run, POLL_MS);
    };
    const stopPolling = () => {
      if (!intervalRef.current) return;
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };

    run();
    startPolling();

    // Pause polling when tab is hidden — saves the hub from useless 60s pings.
    const onVisibilityChange = () => {
      if (typeof document === 'undefined') return;
      if (document.visibilityState === 'hidden') {
        stopPolling();
      } else {
        run();
        startPolling();
      }
    };
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', onVisibilityChange);
    }

    return () => {
      mounted = false;
      stopPolling();
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', onVisibilityChange);
      }
    };
  }, []);

  const status: Status = data?.status ?? 'unknown';
  const label = data ? statusLabel(data) : 'בודק רשת סוכנים…';
  const ts = data
    ? new Date(data.fetchedAt).toLocaleTimeString('he-IL', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : '—';

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
      onFocus={() => setShowTip(true)}
      onBlur={() => setShowTip(false)}
    >
      <Link
        href="/guide"
        className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-card/40 px-3 py-1.5 text-xs text-muted-foreground transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label={`סטטוס רשת הסוכנים: ${label}. לחצו למידע נוסף.`}
      >
        <span className="relative flex size-2.5">
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-60 motion-safe:animate-ping ${STATUS_COLOR[status]}`}
            aria-hidden="true"
          />
          <span
            className={`relative inline-flex size-2.5 rounded-full ${STATUS_COLOR[status]}`}
            aria-hidden="true"
          />
        </span>
        <span className="font-medium tabular-nums">{label}</span>
      </Link>

      {showTip && (
        <div
          role="tooltip"
          className="pointer-events-none absolute bottom-full mb-2 end-0 z-50 w-56 rounded-md border border-border/50 bg-popover px-3 py-2 text-[11px] leading-snug text-popover-foreground shadow-lg"
        >
          <div className="font-medium text-foreground">רשת הסוכנים של אלעד</div>
          <div className="mt-0.5 text-muted-foreground">
            עודכן: <span className="tabular-nums">{ts}</span>
          </div>
          <div className="mt-1 text-muted-foreground/80">
            לחצו &quot;מה זה?&quot; למדריכים.
          </div>
        </div>
      )}
    </div>
  );
}

export default AgentNetworkStatus;
