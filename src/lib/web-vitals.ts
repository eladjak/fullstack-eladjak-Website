import { onCLS, onFCP, onLCP, onTTFB, onINP, type Metric } from 'web-vitals';

// Send to analytics endpoint
function sendToAnalytics(metric: Metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });
  }

  // Send to analytics service (e.g., Google Analytics, PostHog, etc.)
  // Example with Google Analytics:
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Example with PostHog:
  if (typeof window !== 'undefined' && (window as any).posthog) {
    (window as any).posthog.capture('web_vitals', {
      metric_name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });
  }

  // Send to custom analytics endpoint
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  });

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics/web-vitals', body);
  } else {
    fetch('/api/analytics/web-vitals', {
      body,
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(console.error);
  }
}

export function reportWebVitals() {
  try {
    // Core Web Vitals
    onCLS(sendToAnalytics); // Cumulative Layout Shift
    onLCP(sendToAnalytics); // Largest Contentful Paint
    onINP(sendToAnalytics); // Interaction to Next Paint (replaces deprecated FID)

    // Additional metrics
    onFCP(sendToAnalytics); // First Contentful Paint
    onTTFB(sendToAnalytics); // Time to First Byte
  } catch (error) {
    console.error('[Web Vitals] Error:', error);
  }
}

// Utility to get Web Vitals thresholds
export const WEB_VITALS_THRESHOLDS = {
  // Core Web Vitals (Google's standards)
  CLS: { good: 0.1, needsImprovement: 0.25 },
  LCP: { good: 2500, needsImprovement: 4000 },
  INP: { good: 200, needsImprovement: 500 },

  // Other metrics
  FCP: { good: 1800, needsImprovement: 3000 },
  TTFB: { good: 800, needsImprovement: 1800 },
};

// Get rating based on thresholds
export function getRating(metricName: keyof typeof WEB_VITALS_THRESHOLDS, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = WEB_VITALS_THRESHOLDS[metricName];
  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.needsImprovement) return 'needs-improvement';
  return 'poor';
}
