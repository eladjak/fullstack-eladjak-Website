import { LoadingPage } from '@/components/ui/loading-spinner';

/**
 * Preserved global loading UI. It intentionally lives outside `src/app` so it
 * cannot become an App Router loading boundary for every route.
 */
export function RouteLoadingFallback() {
  return <LoadingPage label="טוען..." />;
}
